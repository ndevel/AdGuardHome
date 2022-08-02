import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { initReactI18n } from 'react-i18next/hooks';
import langDetect from 'i18next-browser-languagedetector';

import { LANGUAGES, BASE_LOCALE } from './helpers/twosky';

import en from './__locales/en.json';

const resources = {
    en: {
        translation: en,
    },
};

const availableLanguages = Object.keys(LANGUAGES);

i18n
    .use(langDetect)
    .use(initReactI18n)
    .use(reactI18nextModule)
    .init({
        resources,
        lowerCaseLng: true,
        fallbackLng: BASE_LOCALE,
        keySeparator: false,
        nsSeparator: false,
        returnEmptyString: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
        },
        whitelist: availableLanguages,
    }, () => {
        if (!availableLanguages.includes(i18n.language)) {
            i18n.changeLanguage(BASE_LOCALE);
        }
    });

export default i18n;
