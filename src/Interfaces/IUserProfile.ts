export interface IUpdateProfile {
	fullName: string;
	gender: string;
	birthday: string;
	educationalQualification?: string,
	institution?: string,
	mobile?: string;
	currentPassword?: string;
	password?: string;
	confirmPassword?: string;
}
