import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { TypingDNAReactiveClient } from 'typingdnaclient-rxjs';
import { DailyReport, MessageCreationRequest } from './data/index.models';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IndexRepository } from './index.repository';

@injectable()
export class IndexService {
  typingDnaClient: TypingDNAReactiveClient;

  constructor(@inject(IndexRepository) private repository: IndexRepository) {
    const apiKey = process.env.TYPING_DNA_API_KEY || 'apiKey';
    const apiSecret = process.env.TYPING_DNA_API_SECRET || 'apiSecret';
    this.typingDnaClient = new TypingDNAReactiveClient(apiKey, apiSecret);
  }

  public createMessage(userId: string, request: MessageCreationRequest): Observable<DailyReport> {
    return this.typingDnaClient
      .auto(userId, request.typingPattern0)
      .pipe(tap((response) => console.log({ userId, message: request.message, response })))
      .pipe(
        mergeMap((response) => {
          if (response.messageCode !== 1) {
            return this.repository.save(userId, request.message, undefined, undefined);
          }
          return this.repository.save(userId, request.message, response.result, response.highConfidence);
        }),
      );
  }

  public getById(userId: string): Observable<DailyReport[]> {
    return this.repository.getById(userId);
  }
}
