# Чат на TypeScript
## ***[Deploy](https://46dice.github.io/chat/)***

### Использованные технологии: 
1. HTML, SCSS;
2. TypeScript;
3. WebSocket;
___
### Как работает приложение
Модальные окна управляются с помощью утилитарных функций.
Если пользователь авторизован - загружается история.

#### Юзеру открывается модальное окно с регистрацией.
- Открывается первым при запуске приложения;
- Не откроется, если в куках уже есть токен;
- Токен отправляется на почтовый ящик.
- При успешной отправке токена, данное окно закрывается, и открывается следующее - "Авторизация".

#### Открытие модального окна с подтверждением токена.
- Открывается поверх окна с регистрацией;
- Если токен валидный, открывается главное окно приложения;
- Открывается WebSocket соединение. Отправляется GET запрос на сервер для получения всей истории сообщения.

#### Отправка сообщения.
- При отправке сообщения отрисовываются: Имя юзера, текст сообщения, время.

#### Смена имени.
- Открывается по клику на "Настройки";
- При смене имени отправляется PATCH-запрос для изменения имени юзера.

#### Loader.
- Реализован preloader (анимация загрузки) для отображения для пользователя о том, что идёт запрос к серверу;
- При соединении через WebSocket, preloader отображается на всю ширину и высоту экрана и закрывается собой взаимодействие пользователя с приложением, пока запрос не выполнится

#### Выход из чата.
- При выходе из чата все Cookie и LocalStorage очищаются, закрывается окно главного окна приложения.
- Открывается окно с регистрацией.



