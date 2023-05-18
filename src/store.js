/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.isOpenBasket = false;
    this.state.basket = []
    this.state.cost = 0
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
   * Добавление новой записи
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
      basket: [...this.state.basket, this.state.list.find(item => item.code === code)],
      cost: this.state.basket.reduce((acc, item) => acc + item.price, 0)
    })
  };

}

export default Store;
