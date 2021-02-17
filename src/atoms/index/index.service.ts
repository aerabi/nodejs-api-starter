import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { TypingDNAReactiveClient } from 'typingdnaclient-rxjs';
import { DailyReport, MessageCreationRequest } from './data/index.models';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
      .pipe(mergeMap((response) => this.repository.save(userId, request.message, response.result, response.highConfidence)));
  }
}
