import axios from 'axios';
import JWT from './JWT';

function popRequest(req) {
  let index = http.pendingRequests.findIndex(function(elem) {
    return req === elem;
  });
  if (index === -1) {
    console.error('There is no such request');
    return;
  }
  http.pendingRequests.splice(index, 1);
}

const default_interceptors = [
  {
    request: function(req) {
      req.cancelToken = cancelToken;
      const token = JWT.token();
      if (!!token && req.headers.Authorization !== null) {
        req.headers = { ...req.headers, Authorization: `Bearer ${token}` };
      }
      http.pendingRequests.push(req);
      return req;
    },
    response: function(response) {
      popRequest(response.config);
      return response.data;
    },
    error: function(error) {
      popRequest(error.config);
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        JWT.clear();
        if (window.location.pathname !== '/login') {
          window.location = '/login';
        }
      }
      console.error('http error', { error });
      if (axios.isCancel(error)) {
        error.isCancel = true;
      }
      return Promise.reject((error.response && error.response.data) || error);
    },
  },
];
const cancelCreator = axios.CancelToken;
let flushFunc,
  cancelToken = new cancelCreator(c => {
    flushFunc = c;
  });

//Basic global ultimate object
const http = {
  rest: RestCreator,
  pendingRequests: [],
  url_api: '',
  ws: window.location.host + '/',
  flush() {
    flushFunc();
    http.pendingRequests = [];
    cancelToken = new cancelCreator(c => {
      flushFunc = c;
    });
  },
};

function RestCreator(settings) {
  if (['pendingRequests', 'rest', 'url', 'ws'].includes(settings.name)) {
    return this;
  }

  let service = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });

  service.defaults.baseURL = http.url_api + (settings.baseURL || '');

  if (!Array.isArray(settings.interceptors)) {
    settings.interceptors = [];
  }
  [...settings.interceptors, ...default_interceptors].forEach(inter => {
    service.interceptors.request.use(inter.request);
    service.interceptors.response.use(inter.response, inter.error);
  });
  this[settings.name] = service;
  return this;
}

export default http;
