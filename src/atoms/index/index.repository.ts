import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { DailyReport } from './data/index.models';

@injectable()
export class IndexRepository {
  messageList: DailyReport[];

  constructor() {
    this.messageList = [];
  }

  public save(userId: string, message: string, verified: boolean, confident: boolean): Observable<DailyReport> {
    const report = { userId, message, verified, confident, timestamp: new Date() };
    this.messageList.push(report);
    return of(report);
  }
}
