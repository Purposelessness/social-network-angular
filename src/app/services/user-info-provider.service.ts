import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../types/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserInfoProviderService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getUsersInfo(uids: bigint[]): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(`http://localhost:8080/api/users-repository/?ids=${uids.join(',')}`);
  }

  public getUserInfo(uid: bigint): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`http://localhost:8080/api/users-repository/ids=${uid}`);
  }
}
