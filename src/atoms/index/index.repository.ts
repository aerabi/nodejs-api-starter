import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { DailyReport } from './data/index.models';

@injectable()
export class IndexRepository {
  messageList: DailyReport[];

  constructor() {
    this.messageList = [];
  }

  public save(userId: string, message: string): Observable<DailyReport> {
    const report = {
      timestamp: new Date(),
      userId,
      message,
    };
    this.messageList.push(report);
    return of(report);
  }

  public getById(userId: string): Observable<DailyReport[]> {
    return of(this.messageList.filter((report) => report.userId === userId));
  }
}
