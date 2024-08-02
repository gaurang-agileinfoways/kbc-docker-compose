import { Injectable } from '@nestjs/common';
import { CustomError } from '../exceptions';
import { MailOptions } from 'src/common/interfaces/common.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}
  createSendEmailCommand = (options: MailOptions) => {
    return options;
  };

  /**
   * Send an email using AWS SES and.
   * @param {object} options - Email configuration options.
   * @param {string} options.to - The recipient's email address.
   * @param {string} options.subject - The email subject.
   * @param {string} options.html - The HTML content of the email.
   * @param {function} callback - Callback function to handle the result of sending the email
   */
  async sendMail(options) {
    try {
      // Create an instance of AWS SES with your API version, region, and credentials.
      return options;
    } catch (error) {
      throw CustomError.UnknownError(error.message || 'Something went wrong');
    }
  }
  /**
   * Send an email with a common function.
   * @param {string} email - This user email address.
   * @param {string} subject - The email subject.
   * @param {any} htmlTemplate - The HTML content of the email.
   */
  async sendMailCommFunc(
    email: string,
    subject: string,
    htmlTemplate: any,
    text: string,
  ) {
    // Prepare the email configuration options.
    const mailOptions: MailOptions = {
      to: email.toLowerCase(),
      subject: subject,
      html: htmlTemplate,
      text,
    };
    return this.sendMail(mailOptions);
  }
}
