export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum Status {
  UNAUTHENTICATED = 'unauthenticated',
  ACTIVE = 'active',
  BANNED = 'banned',
}

export interface UserAuthInfo {
  uid: bigint;
  role: Role;
  status: Status;
}

export interface UserInfo {
  id: bigint;
  name: string;
  email: string;
  birthDate: string;
  imageUri: string;
}
