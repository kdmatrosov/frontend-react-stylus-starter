# Starter over create-react-app v2

## Table of Contents
1. [Install](#install)
1. [List of commands](#list-of-commands)
1. [Work with styles](#work-with-styles)
1. [Structure](#structure)
1. [rest](#rest)

## Install
```bash
npm i
```
## List of commands

|`npm run <script>`|Описание|
|------------------|-----------|
|`start`| Запускает приложение на `localhost`, порт по умолчанию ```3000```|
|`build`| Собирает ```production bundle``` в папке `build`|
|`test`| Запускает тесты на ```jest```|
|`prettier`| Прогоняет все js-файлы в папке ```src``` по правилам, описанным в `.prettierrc`|
|`prettier-watch`| Включает вотчер за изменениями js-файлов в папке ```src```. После 500мс без изменения к файлу применяются `.prettierrc` правила|
|`dev`| Одновременно запускает `start` и `prettier-watch`|

## Work with styles

**Обязательно** к прочтению:
* В webpack прописаны правила для `CSS`, `SASS`, `Stylus`
* Отдельно есть правила для написания с `CSS Modules` и без
* Если вы хотите, что стили *были модульными*, то имя файла должно соответствовать шаблону **name.module.(css|scss|sass|styl)**

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
  baseURL: `/api/long/path/to/rest`,
  interceptors: [ //сначала выполняются дополнительные интерсепторы, а потом дефолтные
    {
      request: function(req) {
        console.log(req);
        return req;
      },
      response: function(response) {
        console.log(response.config);
        return response;
      }
    },
    ...
  ]
});
```
*Использование*
```js
import http from './rest';
...
http.longApi.get('/example').then(()=>({})).catch(()=>({}));
// вызовет метод GET по юрлу /api/long/path/to/rest/example
```
