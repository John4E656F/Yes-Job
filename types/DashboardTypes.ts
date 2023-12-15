import { CompanyTypes, UsersTypes } from '.';

export interface CompanyFormProps {
  companyData: CompanyTypes;
  userData: UsersTypes;
}

export interface SettingsNavbarProps {
  text: string;
  link: string;
}
