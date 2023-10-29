import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {Chat, Message} from '../types/chat';
import {Observable, Subscriber} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CLIENTS} from '../consts/clients';

type AddMessageRequest = {
  chatId: string;
  authorId: string;
  text: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatProviderService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly socket: Socket,
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

  public addMessageToChat(chatId: bigint, message: AddMessageRequest): Observable<void> {
    return this.httpClient.post<void>(CLIENTS.CHAT_REPOSITORY.ADD_MESSAGE_TO_CHAT(chatId), message, {
      withCredentials: true,
    });
  }

  public getMessageStream(): Observable<Message> {
    return this.socket.fromEvent<Message>('message');
  }
}
