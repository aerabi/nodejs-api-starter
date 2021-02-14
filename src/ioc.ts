import {Container, decorate, injectable, interfaces} from "inversify";
import {Controller} from "tsoa";
import {buildProviderModule, fluentProvide} from "inversify-binding-decorators";

export const provideSingleton = <T>(identifier: interfaces.ServiceIdentifier<T>) =>
    fluentProvide(identifier).inSingletonScope().done();

export const iocContainer = new Container();
decorate(injectable(), Controller);
iocContainer.load(buildProviderModule());
