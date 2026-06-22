# Лабораторна робота №3

## Тема

SQLite: реляційна модель, схема даних, CRUD-запити, підключення SQLite у бекенді.

## Опис проєкту

Проєкт реалізовано на Node.js, Express та TypeScript.

У лабораторній роботі дані зберігаються в SQLite, а не в масивах у пам'яті.

## Запуск проєкту

Встановлення залежностей:

```bash
npm install
```

Запуск у режимі розробки:

```bash
npm run dev
```

Збірка проєкту:

```bash
npm run build
```

Запуск seed:

```bash
npm run seed
```

## База даних

Файл бази даних:

```text
data/app.db
```

### Таблиці

#### Users

* id (PK)
* name
* email (UNIQUE)
* createdAt

#### Resources

* id (PK)
* title
* author
* type
* rating
* comment
* createdAt

#### Reviews

* id (PK)
* resourceId (FK → Resources.id)
* userId (FK → Users.id)
* text
* rating
* createdAt

### Зв'язки

Users (1) → (N) Reviews

Resources (1) → (N) Reviews

Увімкнено:

```sql
PRAGMA foreign_keys = ON;
```

## Обмеження

### NOT NULL

Використовується для обов'язкових полів:

* name
* email
* title
* author
* type
* rating
* text

### UNIQUE

```sql
email TEXT NOT NULL UNIQUE
```

### CHECK

```sql
CHECK(rating >= 1 AND rating <= 5)
```

## Індекс

Для прискорення пошуку відгуків за ресурсом:

```sql
CREATE INDEX IF NOT EXISTS idx_reviews_resourceId
ON Reviews(resourceId);
```

Індекс використовується під час пошуку відгуків за resourceId.

## API Endpoints

### Users

* GET /api/users
* GET /api/users/:id
* POST /api/users
* PUT /api/users/:id
* DELETE /api/users/:id

### Resources

* GET /api/resources
* GET /api/resources/:id
* POST /api/resources
* PUT /api/resources/:id
* PATCH /api/resources/:id
* DELETE /api/resources/:id

### Reviews

* GET /api/reviews
* GET /api/reviews/:id
* POST /api/reviews
* PATCH /api/reviews/:id
* DELETE /api/reviews/:id

## JOIN Endpoint

```http
GET /api/resources/with-reviews
```

Повертає ресурси разом із відгуками та користувачами.

## Endpoint статистики

```http
GET /api/resources/stats
```

Повертає:

* середній рейтинг ресурсів;
* загальну кількість ресурсів.

## Приклади запитів

Отримати всі ресурси:

```http
GET /api/resources
```

Отримати ресурси з пагінацією:

```http
GET /api/resources?page=1&pageSize=5
```

Отримати ресурси з відгуками:

```http
GET /api/resources/with-reviews
```

Отримати статистику:

```http
GET /api/resources/stats
```

## Формат помилок

```json
{
  "code": "NOT_FOUND",
  "message": "Resource not found"
}
```

## Логування

При запуску застосунку виводяться повідомлення:

```text
SQLite connected
Migration applied: 001_init_users.sql
Migration applied: 002_init_resources.sql
Migration applied: 003_init_reviews.sql
Migration applied: 004_add_indexes.sql
Server started
```

