import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IMailProvider } from '../IMailProvider';

@injectable()
class MailProviderOffice365 implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      auth: {
        user: process.env.OFFICE365_MAIL_USER,
        pass: process.env.OFFICE365_MAIL_PASS,
      },
      secure: false,
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path, 'utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    try {
      await this.client.sendMail({
        to,
        from: `Rentx <${process.env.OFFICE365_MAIL_USER}>`,
        subject,
        html: templateHTML,
      });
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new AppError('Error sending email!');
    }
  }
}

export { MailProviderOffice365 };
