import http from './http';

http
  .rest({
    name: 'api',
    baseURL: `/api`,
  })
  .rest({
    name: 'longApi',
    baseURL: `/api/long/path/to/rest`,
    interceptors: [
      //сначала выполняются дополнительные интерсепторы, а потом дефолтные
      {
        request: function(req) {
          console.log(req);
          return req;
        },
        response: function(response) {
          console.log(response.config);
          return response;
        },
      },
    ],
  });

export default http;
