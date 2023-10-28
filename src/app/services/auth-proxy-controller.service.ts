import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CLIENTS} from '../consts/clients';

interface RegisterRequest {
  name: string;
  birthDate: string;
  email: string;
  login: string;
  password: string;
}

interface LoginRequest {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthProxyControllerService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public register(request: RegisterRequest) {
    return this.httpClient.post(CLIENTS.API_PROXY.REGISTER(), request);
  }

  public login(request: LoginRequest) {
    return this.httpClient.post(CLIENTS.API_PROXY.LOGIN(), request, {
      withCredentials: true,
    });
  }
}
