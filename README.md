# Starter over create-react-app

## Install
```bash
npm i
```

## Start

```bash
npm start
npm run dev //with onchange
```

## Structure
* store - reducers/actions/sagas
* rest - singleton для rest. Использовать его, а не axios.
* routes - с loadable

## rest 
#### JWT - работа с токеном хранит/читает из localStorage/замыкания
#### http - возвращает объект
```js
{
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
}
```
**RestCreator** - создание нового экземпляра от axios (axios.create) c настройками по умолчанию
```js
let service = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });
```
Так же добавляет интерсептор с автоматической отправкой токена ```Bearer``` при наличии оного и разлогином на ошибку доступа

**pendingRequests** - список запросов

**url_api** - префикс для всех запросов

**flush** - отмена всех текущих запросов

#### index - добавление в http полей - мапов для запросов (можно зеркалить бэк-контроллеры)
```js
http.rest({
  name: 'api',
  baseURL: `/api`,
}).rest({
  name: 'longApi',
  baseURL: `/api/long/path/to/rest`
});
```
*Использование*
```js
import http from './rest';
...
http.longApi.get('/example').then(()=>({})).catch(()=>({}));
// вызовет метод GET по юрлу /api/long/path/to/rest/example
```
