export const LANGUAGES = {
  es: "Español",
  en: "English",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
};

export const DEFAULT_LANGUAGE = "es";
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

export function getMessages(lang) {
  try {
    return require(`@/messages/${lang}.json`);
  } catch (error) {
    console.warn(`Language ${lang} not found, using default`);
    return require(`@/messages/${DEFAULT_LANGUAGE}.json`);
  }
}

export function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}
