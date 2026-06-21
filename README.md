# Users & Resources REST API

## Опис проекту

REST API на Node.js + Express + TypeScript без використання бази даних.
Дані зберігаються лише в оперативній пам’яті.

Проект реалізує CRUD-операції для двох сутностей:

* Users
* Resources

API підтримує:

* CRUD
* DTO
* Validation middleware
* Centralized error handler
* Logging middleware
* Pagination
* Sorting
* PATCH
* Swagger UI
* ESLint

---

# Технології

* Node.js
* Express
* TypeScript
* Swagger UI
* ESLint

---

# Запуск проекту

## Встановлення залежностей

```bash
npm install
```

---

## Запуск dev-сервера

```bash
npm run dev
```

---

## TypeScript build

```bash
npx tsc
```

---

## ESLint перевірка

```bash
npx eslint src --ext .ts
```

---

# Swagger

Swagger документація доступна за адресою:

```text
http://localhost:3000/api-docs
```

---

# Структура проекту

my-lab2/
│
├── dist/
├── node_modules/
├── src/
│   ├── controllers/
│   ├── dtos/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── index.ts
│   └── swagger.ts
│
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json

---

# Сутності

## Users

Поля:

* id
* name
* email

---

## Resources

Поля:

* id
* title
* author
* type
* rating
* comment

---

# API Endpoints

## Users

### GET all users

```http
GET /api/users
```

---

### GET user by id

```http
GET /api/users/:id
```

---

### POST create user

```http
POST /api/users
```

Body:

```json
{
  "name": "Ivan",
  "email": "ivan@gmail.com"
}
```

---

### PUT update user

```http
PUT /api/users/:id
```

---

### DELETE user

```http
DELETE /api/users/:id
```

---

# Resources

### GET all resources

```http
GET /api/resources
```

---

### GET resource by id

```http
GET /api/resources/:id
```

---

### POST create resource

```http
POST /api/resources
```

Body:

```json
{
  "title": "React Book",
  "author": "Petro",
  "type": "Book",
  "rating": 5,
  "comment": "Nice"
}
```

---

### PUT update resource

```http
PUT /api/resources/:id
```

---

### PATCH update resource

```http
PATCH /api/resources/:id
```

Body:

```json
{
  "rating": 3
}
```

---

### DELETE resource

```http
DELETE /api/resources/:id
```

---

# Pagination

Приклад:

```http
GET /api/resources?page=1&pageSize=2
```

---

# Sorting

Приклад:

```http
GET /api/resources?sortBy=rating&sortDir=desc
```

---

# Validation

Реалізована серверна валідація:

* required fields
* allowed values
* range validation
* length validation

При помилці API повертає:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": []
  }
}
```

---

# Logging

Кожен HTTP-запит логуються у форматі:

```text
GET /api/resources 200 2ms
```

---

# Error Handling

Реалізований centralized error handler middleware.

Підтримуються статуси:

* 200 OK
* 201 Created
* 204 No Content
* 400 Bad Request
* 404 Not Found
* 409 Conflict
* 500 Internal Server Error

---

# Дані

База даних не використовується.

Дані зберігаються лише в оперативній пам’яті та зникають після перезапуску сервера.