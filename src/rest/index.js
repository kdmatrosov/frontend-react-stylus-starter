import http from './http';

http.rest({
  name: 'api',
  baseURL: `/api`,
}).rest({
  name: 'longApi',
  baseURL: `/api/long/path/to/rest`
});

export default http;
