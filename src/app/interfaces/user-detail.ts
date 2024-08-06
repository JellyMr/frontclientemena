export interface UserDetail {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: string;
  twoFactorEnabled: true;
  accessFailedCount: 0;
}
