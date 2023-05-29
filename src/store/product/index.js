import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
    }
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

export default Product;
