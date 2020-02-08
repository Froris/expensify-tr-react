import { firebase, googleAuthProovider } from '../firebase/firebase';

// login и logout не помещены в startLogin/Logout
// что бы пользователи всегда могли видеть актуальную информацию
// при посещении страницы 

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    // Указываем авторизацию через попап
    // в метод signWithPopup передаем какую систему используем
    return firebase.auth().signInWithPopup(googleAuthProovider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
