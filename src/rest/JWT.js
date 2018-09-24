import { Base64 } from 'js-base64';

const jwtDecode = t => {
  let token = {};
  try {
    token.raw = t;
    token.header = JSON.parse(Base64.decode(t.split('.')[0]));
    token.payload = JSON.parse(Base64.decode(t.split('.')[1])) || {};
  } catch (e) {
    console.error(e);
  }
  return token;
};

const JWT = (function() {
  let JWT_TOKEN = '';

  function token(__token) {
    if (!!__token) {
      JWT_TOKEN = __token;
      if (localStorage) {
        localStorage.setItem('token', __token);
      }
    } else {
      if (localStorage && !JWT_TOKEN) {
        JWT_TOKEN = localStorage.getItem('token') || '';
      }
      return JWT_TOKEN;
    }
  }

  function clear() {
    JWT_TOKEN = '';
    if (localStorage) {
      localStorage.removeItem('token');
    }
  }

  function data() {
    return jwtDecode(JWT_TOKEN);
  }

  return { token, clear, data };
})();
export default JWT;
