import 'reflect-metadata';

import { Container, decorate, injectable, interfaces } from 'inversify';
import { Controller } from 'tsoa';
import { buildProviderModule, fluentProvide } from 'inversify-binding-decorators';
import { IndexController } from './atoms/index/index.controller';
import { IndexService } from './atoms/index/index.service';

export const provideSingleton = <T>(identifier: interfaces.ServiceIdentifier<T>) => fluentProvide(identifier).inSingletonScope().done();

const iocContainer = new Container();
decorate(injectable(), Controller);
iocContainer.load(buildProviderModule());

iocContainer.bind<IndexController>(IndexController).toSelf().inSingletonScope();
iocContainer.bind<IndexService>(IndexService).toSelf().inSingletonScope();

export { iocContainer };
