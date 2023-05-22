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
   * Добавление записи по объекту
   * @param code
   */
  addItemToBasket(item) {
    this.setState({
      ...this.state,
      basket: this.state.basket.some(i => i.code === item.code) ? this.state.basket.reduce((acc, cur) => {
        if (cur.code === item.code) {
          return [...acc, {...cur, count: cur.count + 1}]
        }
        return [...acc, cur];
      }, []) : [...this.state.basket, {...item, count: 1}],
      totalCost: this.state.totalCost + item.price,
      totalCount: this.state.basket.some(i => i.code === item.code) ? this.state.totalCount : this.state.totalCount + 1
    })
  };

  /**
 * Удаление записи по коду
 * @param code
 */
  deleteItemsFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code),
      totalCost: this.state.basket.reduce((acc, item) => {
        if (item.code !== code) {
          return acc + item.count * item.price;
        }
        return acc;
      }, 0),
      totalCount: this.state.basket.reduce((acc, cur) => {
        if (cur.code !== code) {
          return acc + 1;
        }
        return acc;
      }, 0)
    })
  };

}

export default Store;
