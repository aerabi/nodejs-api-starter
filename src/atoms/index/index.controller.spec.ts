import {iocContainer} from "../../ioc";
import {IndexController} from "./index.controller";

describe('IndexController', () => {
  it('constructor', () => {
     const controller = iocContainer.get(IndexController);
     expect(controller).toBeTruthy();
  });
});
