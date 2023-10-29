import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private readonly cookies: CookieService) {
  }

  public getUid(): bigint {
    return BigInt(this.cookies.get('uid'));
  }
}
