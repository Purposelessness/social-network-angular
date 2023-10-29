import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuthInfo, UserInfo} from '../types/user-info';
import {CLIENTS} from '../consts/clients';

@Injectable({
  providedIn: 'root',
})
export class UserInfoProviderService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getUserAuthInfo(uid?: bigint): Observable<UserAuthInfo> {
    const uri = uid == null ? CLIENTS.API_PROXY.GET_USER_SELF_INFO() : CLIENTS.API_PROXY.GET_USER_INFO(uid);
    return this.httpClient.get<UserAuthInfo>(uri, {
      withCredentials: true,
    });
  }

  public getAllUsers(): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(CLIENTS.USER_REPOSITORY.GET_ALL_USERS(), {
      withCredentials: true,
    });
  }

  public getUsersInfo(uids: bigint[]): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(CLIENTS.USER_REPOSITORY.GET_USERS_INFO(uids), {
      withCredentials: true,
    });
  }

  public getUserInfo(uid: bigint): Observable<UserInfo> {
    return new Observable<UserInfo>((observer) => {
      const response = this.httpClient.get<UserInfo[]>(CLIENTS.USER_REPOSITORY.GET_USERS_INFO([uid]), {
        withCredentials: true,
      });
      response.subscribe({
        next: (userInfo) => observer.next(userInfo[0]),
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      });
    });
  }

  public getFriends(uid: bigint): Observable<bigint[]> {
    type Response = {
      uid: bigint,
      ids: bigint[],
    }
    return new Observable<bigint[]>((observer) => {
      const response = this.httpClient.get<Response>(CLIENTS.USER_TO_FRIEND_REPOSITORY.GET_FRIENDS(uid), {
        withCredentials: true,
      });
      response.subscribe({
        next: (r) => observer.next(r.ids),
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      });
    });
  }

  public getNewsListIds(uids: bigint): Observable<bigint[]> {
    type Response = {
      uid: bigint,
      ids: bigint[],
    }
    return new Observable<bigint[]>((observer) => {
      const response = this.httpClient.get<Response>(CLIENTS.USER_TO_NEWS_REPOSITORY.GET_NEWS_LIST(uids), {
        withCredentials: true,
      });
      response.subscribe({
        next: (r) => observer.next(r.ids),
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      });
    });
  }
}
