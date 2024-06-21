import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { MailProviderEthereal } from './implementations/MailProviderEthereal';

container.registerInstance<IMailProvider>(
  'MailProviderEthereal',
  new MailProviderEthereal(),
);
