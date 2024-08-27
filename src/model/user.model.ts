export class RegisterUserRequest {
  email: string;
  name: string;
  password: string;
}

export class UserResponse {
  email: string;
  name: string;
  token?: string;
}

export class LoginUserRequest {
  email: string;
  password: string;
}

export class UpdateUserRequest {
  name?: string;
  password?: string;
}
