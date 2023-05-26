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
      catalog: []
    }
  }

  async loadRequiredQuantityProduct(limit, skip) {
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
    const productsOnPage = 10;
    const pagesCount = Math.ceil(Number(json.result.count) / productsOnPage);
    this.setState({
      ...this.getState(),
      productsCount: json.result.count,
      pagesCount
    }, 'Загружено общее количество товаров');
  }
  
  async loadCurrentProduct(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentProduct: json.result
    }, 'Загружен текущий товар')
    
  }
}

export default Catalog;
