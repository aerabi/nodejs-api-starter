import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { TypingDNAReactiveClient } from 'typingdnaclient-rxjs';
import { DailyReport, MessageCreationRequest } from './data/index.models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IndexRepository } from './index.repository';
import { flatMap } from 'rxjs-pipe-ext/lib';

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
      .verify(userId, request.typingPattern0)
      .pipe(tap((response) => console.log({ userId, message: request.message, response })))
      .pipe(
        flatMap((response) => {
          if (!response.success) {
            // if verification is not successful, try auto to save the pattern
            return this.typingDnaClient.auto(userId, request.typingPattern0).pipe(flatMap((_) => this.repository.save(userId, request.message)));
          }
          return this.repository.save(userId, request.message, response);
        }),
      );
  }

  public getById(userId: string): Observable<DailyReport[]> {
    return this.repository.getById(userId);
  }
}
