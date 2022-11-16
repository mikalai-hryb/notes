[PWA](https://habr.com/ru/post/418923/)

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
fetch
The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

«AJAX» (аббревиатура от Asynchronous JavaScript And XML)

A Promise is an object representing the eventual completion or failure of an asynchronous operation.
Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

Guarantees

* Callbacks added with then() will never be invoked before the completion of the current run of the JavaScript event loop.
* These callbacks will be invoked even if they were added after the success or failure of the asynchronous operation that the promise represents.
* Multiple callbacks may be added by calling then() several times. They will be invoked one after another, in the order in which they were inserted.


Куки (cookies) — это хранящиеся на компьютерах и гаджетах небольшие файлы, c помощью которых сайт запоминает информацию о посещениях пользователя.

Сами по себе куки не опасны — это обычные текстовые файлы. Они не могут запускать какие-либо процессы на компьютере и каким-то образом влиять на работу операционной системы.

В то же время куки, в частности, умеют запоминать:

в какое время и с какого устройства человек заходил на страницу;
предпочтения пользователей (например, язык, валюта или размер шрифта);
товары, которые просматривались или добавлялись в корзину, даже если пользователь временно вышел из интернет-магазина;
текст, который мы вводили на сайте раньше;
IP-адрес и местоположение пользователя;
дату и время посещения сайта;
версию операционной системы и браузера;
клики и переходы.
