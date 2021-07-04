import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { DailyReport } from './data/index.models';
import { Observable, of } from 'rxjs';
import { IndexRepository } from './index.repository';

@injectable()
export class IndexService {
  constructor(@inject(IndexRepository) private repository: IndexRepository) {}

  public getById(userId: string): Observable<DailyReport[]> {
    return this.repository.getById(userId);
  }

  public createMessage(...params: any[]): Observable<DailyReport> {
    const report: DailyReport = {
      message: '',
      timestamp: undefined,
      userId: '',
    };
    return of(report);
  }
}
