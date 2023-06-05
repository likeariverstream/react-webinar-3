import StoreModule from '../module';
import {getCookie} from '../../utils';

class UserState extends StoreModule {

  initState() {
    return {
      profile: {},
      waiting: false,
      error: null,
    }
  }

  async getUserInfo() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
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
      const response = await fetch('api/v1/users/self', options)
      const json = await response.json()
      if (!json.error) {
        this.setState({
          ...this.getState(),
          profile: json.result,
          waiting: false,

        }, 'Загружены данные пользователя')
      } else {

        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error,
        }, 'Произошла ошибка при получении данных пользователя')
      }
    } catch (e) {
      console.warn(e)
    }
  }

}

export default UserState;
