export enum LanguageCode {
  EN = 'en',
  FR = 'fr',
  NL = 'nl',
}

export type Language = {
  code: LanguageCode;
  name: string;
  country: string;
};

export const languages: Language[] = [
  { code: LanguageCode.EN, name: 'English', country: 'USA' },
  { code: LanguageCode.FR, name: 'French', country: 'Belgique' },
  { code: LanguageCode.NL, name: 'Nederlands', country: 'België' },
];
