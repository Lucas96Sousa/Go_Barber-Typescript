import { container } from 'tsyringe';

// import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IStorageProvider from './StoragedProviders/models/IstorageProvider';
import DiskStorageProvider from './StoragedProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
