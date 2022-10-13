export interface IGender {
  value: string;
  label: string;
}
export interface IRole {
  value: number;
  label: string;
}
export interface ICurrentUser {
  dob: any;
  email: string;
  full_name: string;
  gender: string;
  institution_name: string;
  phone_number: string;
  qualification: string;
  role: number;
  password: string;
  status?: number;
}

export interface IUserStatus {
  value: number;
  label: string;
}