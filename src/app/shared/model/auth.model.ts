export interface LoginResponseDTO {
    token: string;
    expiration: Date;
    user: dtoUser;
    userRoles: string[];
  }

  export interface dtoUser {
    rawPassword: string;
    fullName: string;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: null;
    geolvl: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
  }