import StoreModule from '../module';
import { getCookie, deleteCookie } from '../../utils';

class SessionState extends StoreModule {

  initState() {
    return {
      isLogin: !!getCookie('token'),
      user: {},
      waiting: false,
      error: null,
      generalError: null
    }
  }
  async login(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
      generalError: null
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
    try {
      const response = await fetch('api/v1/users/sign', options)
      const json = await response.json()
      if (!json.error) {
        
        this.setState({
          ...this.getState(),
          waiting: false,
          isLogin: true,
        }, 'Логин пользователя')
        
      } else {
        const {data} = json.error
        const {issues} = data
        const generalError = issues.find(issue => issue.path.length === 0).message;
        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error,
          generalError
        }, 'Произошла ошибка при логине')
      }
    } catch (error) {
      console.warn(error)
    }
  }

  async checkAccess() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null
    }, 'Ожидание данных пользователя');

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-credentials': true,
        'X-Token': getCookie('token'),
      },
    }
    try {
      const response = await fetch(`api/v1/users/self?fields=_id,email, username`, options)
      const json = await response.json()
      console.log(json)
      if (!json.error) {
        this.setState({
          ...this.getState(),
          user: json.result,
          waiting: false,

        }, 'Загружены данные пользователя')
      } else {
        this.setState({
          ...this.getState(),
          waiting: false,
          isLogin: false,
          error: json.error,
        }, 'Произошла ошибка при получении данных пользователя')
        deleteCookie('token')
      }
    } catch (e) {
      console.warn(e)
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null
    }, 'Ожидание удаления данных пользователя');
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': getCookie('token')
      },
    }
    try {
      const response = await fetch(`api/v1/users/sign/`, options)
      const json = await response.json()
      if (!json.error) {
        this.setState({
          ...this.getState(),
          waiting: false,
          user: {},
          isLogin: false
        }, 'Удалены данные пользователя')
        deleteCookie('token')
      } else {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error
        }, 'Произошла ошибка при удалении данных пользователя')
      }
    } catch (e) {
      console.warn(e)
    }
  }
}

export default SessionState;
