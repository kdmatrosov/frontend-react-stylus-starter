import http from './http';

http
  .rest({
    name: 'api',
    baseURL: `/api`,
  });

export default http;
