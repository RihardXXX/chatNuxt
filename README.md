## Nuxt.js стартовый шаблон

### Обычный запуск
#### Устанавливаем зависимости

```
npm install
```
#### Добавляем `env` переменные в `.env` файл

```
SERVER_API_URL - ссылка на контейнер с api для серверной части (напр: http://backend:8000)
CLIENT_API_URL - ссылка на api на клиенте (напр: https://site.com)
SENTRY_DSN - ключ Sentry для проекта для логирования ошибок (для локальной разработки нет необходимости)
```

#### Запускаем проект в `dev` режиме

```
npm run dev
```
#### Запускаем проект в `prod` режиме

```
npm run build && npm run start
```

### Для запуска `https://` сервера

#### Устанавливаем `mkcert` 

https://github.com/FiloSottile/mkcert

#### Генерируем `ssl` сертификат и ключ для `localhost`

```
mkcert localhost
```

#### Прописываем необходимые `env` переменные
```
HTTPS_CERT - путь до сертификата ./ssl/localhost.pem
HTTPS_KEY - путь до ключа ./ssl/localhost-key.pem
```
