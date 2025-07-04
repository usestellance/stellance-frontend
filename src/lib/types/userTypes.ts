export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  country?: string;
  phone_number?: string;
  wallet_address?: string;
  is_active?: boolean;
  role?: string;
  otp?: string;
}

export interface ILoginResponse {
  status_code: number;
  message: string;
  data: {
    access_token: string;
    email_verified: boolean;
    profile_complete: boolean;
    user: IUser;
  };
}
export interface IUpdateUserResponse {
  status_code: number;
  message: string;
  data: IUser;
}
