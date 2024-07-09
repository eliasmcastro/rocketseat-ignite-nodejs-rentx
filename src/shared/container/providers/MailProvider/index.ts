import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { MailProviderEthereal } from './implementations/MailProviderEthereal';
import { MailProviderOffice365 } from './implementations/MailProviderOffice365';

const mailProvider = {
  ethereal: container.resolve(MailProviderEthereal),
  office365: container.resolve(MailProviderOffice365),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
