import { Body, Controller, Path, Post, Route, SuccessResponse } from 'tsoa';
import { MessageCreationRequest } from './data/index.models';
import { inject, injectable } from 'inversify';
import { IndexService } from './index.service';

@Route('')
@injectable()
export class IndexController extends Controller {
  constructor(@inject(IndexService) private service: IndexService) {
    super();
  }

  @SuccessResponse('201', 'Created')
  @Post('user/{userId}/msg')
  public async createMessage(@Path() userId: string, @Body() requestBody: MessageCreationRequest) {
    return { userId, body: requestBody };
  }
}
