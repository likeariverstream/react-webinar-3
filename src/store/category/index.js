import StoreModule from "../module";
import { createTree, createFlatArray } from "../../utils";
/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  async loadCategories() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Ожидание загрузки категорий');

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const defaultCategory = [
      {
        value: '',
        title: 'Все'
      }
    ];

    const tree = createTree(json.result.items);
    const items = createFlatArray(tree);
    const categories = [
      ...defaultCategory,
      ...items.map(item => ({value: item._id, title: `${item.prefix}${item.title}`}))
    ];

    this.setState({
      ...this.getState(),
      categories,
      waiting: false
    }, 'Загружен список категорий из АПИ');
  }

}

export default CategoryState;
