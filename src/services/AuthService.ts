import firebase from 'firebase/compat/app'
import type { ResponseData } from '@/@types'

class AuthService {
  login(email: string, password: string): Promise<ResponseData> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('user', JSON.stringify({
          email: email
        }));
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        alert(error.message)
        return Promise.reject({ code: false, msg: '' })
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username: string, email: string, password: string): Promise<ResponseData> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res)
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        alert(error.message)
        return Promise.reject({ code: false, msg: '' })
      });
  }
}

export default new AuthService();