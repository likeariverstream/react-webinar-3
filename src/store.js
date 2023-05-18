/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.isOpenBasket = false;
    this.state.basket = [];
    this.state.totalCost = 0;
    this.state.totalCount = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Установка состояния модального окна корзины
   */
  toggleOpeningBasket(payload) {
    this.setState({
      ...this.state,
      isOpenBasket: payload
    })
  };

  /**
   * Добавление записи по коду
   * @param code
   */
  addItemToBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.some(item => item.code === code) 
        ? this.state.basket.map(item => item.code === code ? {...item, count: item.count + 1} : item)
        : [...this.state.basket, {...this.state.list.find(item => item.code === code), count: 1}],
      totalCost: this.state.totalCost + this.state.list.find(item => item.code === code).price,
      totalCount: this.state.totalCount + 1
    })
  };
  
    /**
   * Удаление записи по коду
   * @param code
   */
  deleteItemFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.map(item => item.code === code ? {...item, count: item.count - 1} : item),
      totalCost: this.state.totalCost - this.state.list.find(item => item.code === code).price,
      totalCount: this.state.totalCount - 1
    })
  };

}

export default Store;
