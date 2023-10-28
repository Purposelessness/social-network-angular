import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../types/user-info';
import {CLIENTS} from '../consts/clients';

@Injectable({
  providedIn: 'root',
})
export class UserInfoProviderService {
  constructor(private readonly httpClient: HttpClient) {
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
}
