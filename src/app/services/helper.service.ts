import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Role} from '../types/user-info';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private readonly cookies: CookieService) {
  }

  public getUid(): bigint {
    return BigInt(this.cookies.get('uid'));
  }

  public getRole(): Role {
    return this.cookies.get('role') as Role;
  }
}
