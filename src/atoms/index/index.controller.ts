import { Body, Controller, Get, Path, Post, Route, SuccessResponse } from 'tsoa';
import { DailyReport, MessageCreationRequest } from './data/index.models';
import { inject, injectable } from 'inversify';
import { IndexService } from './index.service';
import { tap } from 'rxjs/operators';

@Route('')
@injectable()
export class IndexController extends Controller {
  constructor(@inject(IndexService) private service: IndexService) {
    super();
  }

  @SuccessResponse('201', 'Created')
  @Post('user/{userId}/msg')
  public async createMessage(@Path() userId: string, @Body() requestBody: MessageCreationRequest): Promise<DailyReport> {
    return this.service
      .createMessage(userId, requestBody)
      .pipe(tap((_) => this.setStatus(201)))
      .toPromise();
  }

  @Get('user/{userId}')
  public async getById(@Path() userId: string): Promise<DailyReport[]> {
    return this.service.getById(userId).toPromise();
  }
}
