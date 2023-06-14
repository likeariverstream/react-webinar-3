import translate from "./translate";

export default class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.currentLanguage = localStorage.getItem('language') || this.config.defaultLanguage;
    this.listeners = []
  }

  setLang(language) {
    console.log(this.config)
    this.currentLanguage = language;
    window.localStorage.setItem('language', language);
    this.services.api.setHeader(this.config.languageHeader, language);
    this.listeners.forEach(listener => listener());
  }

  t(text, plural) {
    return translate(this.currentLanguage, text, plural);
  }

  get lang() {
    return this.currentLanguage;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}
