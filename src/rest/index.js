import http from './http';

http
  .rest({
    name: 'developer',
    baseURL: `/api/developer`,
  })
  .rest({
    name: 'signatures',
    baseURL: `/api/signatures`,
  })
  .rest({
    name: 'auth',
    baseURL: `/auth`,
  })
  .rest({
    name: 'moсk',
    baseURL: `/moсk`,
  })
  .rest({
    name: 'api',
    baseURL: `/api`,
  })
  .rest({
    name: 'core',
    baseURL: `/api/developer/core`,
  });

export default http;
