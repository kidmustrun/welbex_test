# welbex

## Установка зависимостей
```
npm install
```

### Запуск frontend
```
npm run serve
```

### Запуск backend (в отдельном терминале)
```
node server.js
```

### В корне проекта также находится дамп базы данных, конфигурация бд прописана в server/config/db.config.js
### Также можно добавить тестовых данных через postman/insomnia по url http://localhost:8080/api/info после запуска backend
#### Формат данных: 
```
{
	"title": "example",
	"quantity": 5,
	"distance": 70
}
```
