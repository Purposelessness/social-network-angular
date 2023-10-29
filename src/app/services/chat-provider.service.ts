import {Injectable} from '@angular/core';

import {Chat} from '../types/chat';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CLIENTS} from '../consts/clients';

@Injectable({
  providedIn: 'root',
})
export class ChatProviderService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getUserChats(uid: bigint): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(CLIENTS.CHAT_REPOSITORY.GET_USER_CHATS(uid), {
      withCredentials: true,
    });
  }

  public getChats(chatIds: bigint[]): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(CLIENTS.CHAT_REPOSITORY.GET_CHATS(chatIds), {
      withCredentials: true,
    });
  }

  public createChat(members: bigint[]): Observable<bigint> {
    return this.httpClient.post<bigint>(CLIENTS.CHAT_REPOSITORY.CREATE_CHAT(), {
      members: members.map((member) => member.toString()),
    }, {
      withCredentials: true,
    });
  }
}
