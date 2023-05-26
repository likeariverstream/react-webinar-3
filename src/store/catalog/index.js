import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pagesCount: null,
      productsLimit: 10,
      currentPage: 1,
      skip: 10
    }
  }

  getCurrentPage(pageId = 1) {
    const currentPage = Number(pageId);
    this.setState({
      ...this.getState(),
      currentPage
    }, 'Получена текущая страница')
  }
  
  setSkip(pageId = 1) {
    const currentPage = Number(pageId);
    const productsLimit = this.getState().productsLimit;
    const skip = currentPage * productsLimit - productsLimit;
    this.setState({
      ...this.getState(),
      skip
    }, `Пропуск установлен на ${skip}`)
  }

  async loadRequiredQuantityProduct() {
    const limit = this.getState().productsLimit;
    const skip = this.getState().skip;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`)
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getPagesCount() {
    const response = await fetch('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count')
    const json = await response.json();
    const productsLimit = this.getState().productsLimit;
    const pagesCount = Math.ceil(Number(json.result.count) / productsLimit);
    this.setState({
      ...this.getState(),
      pagesCount
    }, 'Загружено общее количество товаров');
  }
  
  async loadCurrentProduct(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentProduct: json.result
    }, 'Загружен текущий товар');
    
  }
}

export default Catalog;
