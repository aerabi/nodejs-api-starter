import 'reflect-metadata';

import { injectable } from 'inversify';
import { TypingDNAReactiveClient } from 'typingdnaclient-rxjs';
import { MessageCreationRequest } from './data/index.models';
import { Observable } from 'rxjs';

@injectable()
export class IndexService {
  typingDnaClient: TypingDNAReactiveClient;

  constructor() {
    const apiKey = process.env.TYPING_DNA_API_KEY || 'apiKey';
    const apiSecret = process.env.TYPING_DNA_API_SECRET || 'apiSecret';
    this.typingDnaClient = new TypingDNAReactiveClient(apiKey, apiSecret);
  }

  public createMessage(userId: string, request: MessageCreationRequest): Observable<any> {
    return this.typingDnaClient.auto(userId, request.typingPattern0);
  }
}
