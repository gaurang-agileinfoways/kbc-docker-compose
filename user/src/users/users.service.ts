import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  AuthExceptions,
  CustomError,
  TypeExceptions,
} from 'src/common/helpers/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Brackets, Repository } from 'typeorm';
import { CommonListDto, LoginDto } from 'src/common/dto/common.dto';
import { Role } from 'src/common/constants/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private myLogger: LoggerService,
    private configService: ConfigService,
  ) {
    this.myLogger.setContext(UsersService.name);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // Check duplicate user
      if (await this.getUserByEmail(createUserDto.email)) {
        throw TypeExceptions.UserAlreadyExists();
      }

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.password = hash;

      await this.userRepo.insert(createUserDto);
      return {};
    } catch (error) {
      if (error?.response?.error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async createInitialUser(): Promise<void> {
    try {
      const user = await this.getUserByEmail(
        this.configService.get('database.initialUser.email'),
      );

      if (user) {
        this.myLogger.customLog('Initial user already loaded.');
      } else {
        const params: CreateUserDto = {
          firstName: this.configService.get('database.initialUser.firstName'),
          lastName: this.configService.get('database.initialUser.lastName'),
          email: this.configService.get('database.initialUser.email'),
          password: '',
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(
          this.configService.get('database.initialUser.password'),
          salt,
        );
        params.password = hash;
        await this.userRepo.insert({ ...params, role: Role.ADMIN });
        this.myLogger.log('Initial user loaded successfully.');
      }
    } catch (error) {
      this.myLogger.error(error?.message || error);
      throw CustomError.UnknownError(
        error?.message || 'Something went wrong, Please try again later!',
      );
    }
  }

  async login(params: LoginDto): Promise<any> {
    try {
      const user = await this.checkUserStatus(params.email);

      if (!bcrypt.compareSync(params.password, user.password)) {
        throw AuthExceptions.InvalidIdPassword();
      }

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isActive: user.isActive,
      };
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async getAllUsers(body: CommonListDto) {
    try {
      const limit = body.limit ? Number(body.limit) : 10;
      const page = body.page ? Number(body.page) : 1;
      const skip = (page - 1) * limit;
      const { search, sortOrder, sortBy } = body;

      // Build the query
      const query = this.userRepo
        .createQueryBuilder('user')
        .where('user.role != :adminRole', { adminRole: Role.ADMIN });

      // Search stage
      if (search) {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(
              'CONCAT(user.firstName, " ", user.lastName) LIKE :search',
              { search: `%${search}%` },
            )
              .orWhere('user.email LIKE :search', { search: `%${search}%` })
              .orWhere('user.phoneNumber LIKE :search', {
                search: `%${search}%`,
              });
          }),
        );
      }

      // Sort stage
      const sortField = sortBy?.trim() || 'created_at';
      const sortDirection = sortOrder?.trim() === 'asc' ? 'ASC' : 'DESC';
      query.orderBy(`user.${sortField}`, sortDirection);

      // Project stage
      query.select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.phoneNumber',
      ]);

      // Facet stage (Pagination)
      const [users, totalRecords] = await query
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      // Format the users to include the concatenated name
      const formattedUsers = users.map((user) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
      }));

      return {
        users: formattedUsers,
        totalRecords,
      };
    } catch (error) {
      throw CustomError.UnknownError(
        error?.message || 'Something went wrong, Please try again later!',
      );
    }
  }

  async getUserById(id: number): Promise<any> {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async getSelectedUsers(body: string[]) {
    try {
      const users = await this.userRepo
        .createQueryBuilder('user')
        .where('user.id IN (:...ids)', { ids: body })
        .orderBy('user.id', 'ASC')
        .getMany();

      return users;
    } catch (error) {}
  }

  async checkUserStatus(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email: email } });

      if (!user) {
        throw AuthExceptions.AccountNotexist();
      }

      if (!user.isActive) {
        throw AuthExceptions.AccountNotActive();
      }

      return user;
    } catch (error) {
      throw CustomError.UnknownError(
        error?.message || 'Something went wrong, Please try again later!',
      );
    }
  }
}
