import StoreModule from "../module";
import ru from "../../translations/ru"
import en from "../../translations/en"

class Language extends StoreModule {
    initState() {
        return {
          translations: ru,
          current: 'ru'
        }
      }
    
    changeEn(){
      this.setState({
        ...this.getState(),
        translations: en,
        current: 'en'
      }, 'Выбран английский язык');
    }
    changeRu(){
      this.setState({
        ...this.getState(),
        translations: ru,
        current: 'ru'
      }, 'Выбран русский язык');
    }

}

export default Language;
