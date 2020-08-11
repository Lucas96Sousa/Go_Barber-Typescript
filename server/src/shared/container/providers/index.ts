import { container } from 'tsyringe';

import IStorageProvider from './StoragedProviders/models/IstorageProvider';
import DiskStorageProvider from './StoragedProviders/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
