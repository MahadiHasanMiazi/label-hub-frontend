export interface ICurrentUser {
  dob: string;
  email: string;
  full_name: string;
  gender: string;
  id: number;
  institution_name: string;
  phone_number: string;
  qualification: string;
  role: number;
  status: number;
  validated_data_count: number;
  assigned_data_count: number;
}
export interface IUpdateData {
  dob: string;
  gender: string;
  institution_name: string;
  phone_number: string;
  qualification: string;
}
export interface IPassData {
  old_password?: string;
  new_password: string;
  confirm_password: string;
}
