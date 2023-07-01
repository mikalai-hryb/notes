# HTTP Headers

https://code.tutsplus.com/ru/tutorials/http-headers-for-dummies--net-8039

HTTP Request
Request Line
HTTP Headers

HTTP Response
Status Line
HTTP Headers
Content

## Request Line

method  path           protocol
GET     /accout/login  HTTP/1.1 or h2 or h3

User-Agent - предоставляет информацию о версии браузера и операционной системе, которую вы используете

Host
Accept
Host: localhost
Accept-Language
Accept-Encoding
Accept-Charset
Keep-Alive
Connection
Referer
Content-Type
Content-Length

## Methods

* GET - используемый для извлечения html, изображений, JavaScript, CSS
* POST - отправка данных на сервер
* HEAD - получение информации заголовка
  * «Когда вы отправляете запрос HEAD, это означает, что вас интересуют только код ответа и HTTP headers,  а не сам документ».
  * С помощью этого метода браузер может проверить, был ли документ изменён для целей caching. Он также может проверить, существует ли документ вообще.
* PUT

## Response status

protocol status code
HTTP/1.1 200 OK

## Status codes

Коды статуса HTTP
2xx используются для успешных запросов.
3xx для перенаправления.
4xx используются, если возникла проблема с запросом.
5xx используются, если возникла проблема с сервером.

## Заголовки HTTP в запросах HTTP

Host - куда отправлен запрос - на какое доменное имя
User-Agent - Имя и версия браузера, операционная система (десктом или мобилка)
Accept-Language - настройки языка по умолчанию. q - relative quality factor ( from 0 to 1(default))
Accept-Encoding - кодировка, которую поймёт браузер
If-Modified-Since - содержит дату, применяется для GET and HEAD, если документ был изменен с этой даты, то сервер отсылает информации и 200 ответ, если документ не был изменён, то сервер отправляет ответ без боди и с 304 статусом.
