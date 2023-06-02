import StoreModule from "../module";
import { getCookie } from "../../utils";

class UserState extends StoreModule {

  initState() {
    return {
      isLogin: !!getCookie('token'),
      id: getCookie('token'),
      user: {},
      waiting: false,
      error: null
    }
  }
  async login(data) {
    try {
      this.setState({
        ...this.getState(),
        waiting: true
      }, 'Ожидание логина');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-credentials': true,
          'access-control-expose-headers': 'X-Token',
        },
        body: JSON.stringify({ ...data, remember: true })
      }
      await fetch('api/v1/users/sign', options)
      this.setState({
        ...this.getState(),
        waiting: false,
        isLogin: true
      }, 'Логин пользователя')
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: e.message
      }, 'Произошла ошибка')
    }
  }

  async getUserInfo() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true
      }, 'Ожидание данных пользователя');

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-credentials': true,
          'X-Token': getCookie('token'),
        },
      }
      const response = await fetch(`api/v1/users/self`, options)
      const json = await response.json()
      this.setState({
        ...this.getState(),
        user: json.result,
        waiting: false,
      }, 'Загружены данные пользователя')
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error:  e.message,
      }, 'Произошла ошибка')
    }
  }

  async logout() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true
      }, 'Ожидание удаления данных пользователя');
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': getCookie('token')
        },
      }
      const response = await fetch('api/v1/users/sign', options)
      if (response.ok) {
        this.setState({
          ...this.getState(),
          waiting: false,
          user: {},
        }, 'Удалены данные пользователя')
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error:  e.message
      }, 'Произошла ошибка')
    }
  }
}

export default UserState;
