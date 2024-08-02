import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsArrayLength(
  len: number,
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'isArrayLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [len],
      validator: {
        validate(value: any, args) {
          return Array.isArray(value) && value.length === args.constraints[0];
        },
        defaultMessage(args) {
          return `${args.property} must be an array with exactly ${args.constraints[0]} elements`;
        },
      },
    });
  };
}
