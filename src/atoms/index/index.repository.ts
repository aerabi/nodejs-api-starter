import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { DailyReport } from './data/index.models';
import { VerifyResponse } from 'typingdnaclient-rxjs/lib/types';

@injectable()
export class IndexRepository {
  messageList: DailyReport[];

  constructor() {
    this.messageList = [];
  }

  public save(userId: string, message: string, response?: VerifyResponse): Observable<DailyReport> {
    const report = {
      timestamp: new Date(),
      userId,
      message,
      score: response?.score,
      confidence: response?.confidence,
      netScore: response?.netScore,
      comparedPatterns: response?.comparedSamples,
    };
    this.messageList.push(report);
    return of(report);
  }

  public getById(userId: string): Observable<DailyReport[]> {
    return of(this.messageList.filter((report) => report.userId === userId));
  }
}
