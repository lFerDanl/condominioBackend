export class CreateAuthDto {
  email: string;
  password: string;
  rol: string;  //  admin, etc.
}

export class LoginAuthDto {
  email: string;
  password: string;
}

export class RegisterAuthDto {
  email: string;
  password: string;
}