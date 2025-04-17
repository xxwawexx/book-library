# 📚 Book Library API

A simple Fastify + TypeScript + Prisma REST API for managing books and authors, built as an exercise project.

----

## ⚙️ Requirements

Before starting, make sure you have the following installed:

| Requirement            | Minimum Version   | Recommended/Notes                   |
|------------------------|------------------|-------------------------------------|
| **Node.js**            | 18.20.2          | (Tested with 18.20.2, LTS preferred)|
| **Docker**             | 20.x or later    | For running PostgreSQL locally      |
| **Docker Compose**     | 1.29+ or 2.x     | For managing the database container |

----

## 🚀 Features

- CRUD operations for **Books** and **Authors**
- Full **OpenAPI/Swagger documentation**
- Prisma ORM with **PostgreSQL**
- Strict typing with **TypeScript** and input validation using **Zod**
- Full test coverage with **tap**
- Runs with Dockerized database for easy setup

----

## 🏁 Quick Start

### 1. **Clone the repo**

```bash
git clone https://github.com/yourusername/book-library-api.git
cd book-library-api
```

----

### 2. **Start the PostgreSQL database with Docker Compose**

```bash
docker compose up -d
```

- This will create a Postgres 16 container with:
  - **User:** `booklibrary`
  - **Password:** `adminpass`
  - **Database:** `booklibrary`
  - **Port:** `5432`

----

### 3. **Set up your environment variables**

Update the `.env` file in the root directory if needed:

```dotenv
DATABASE_URL="postgresql://booklibrary:adminpass@localhost:5432/booklibrary"
```

----

### 4. **Install dependencies**

```bash
npm install
```

----

### 5. **Run database migrations**

Generate the tables according to the Prisma schema.

```bash
npx prisma migrate dev
```

*Or, if the DB is fresh and you want to re-push the schema:*

```bash
npx prisma db push
```

----

### 6. **Start the API server (🚀)**

```bash
npm run dev
```

The server will run at: [http://localhost:3000](http://localhost:3000)

----

### 7. **Explore API docs**

- **Swagger UI:**  
  [http://localhost:3000/docs](http://localhost:3000/docs)

----

## 🧪 Running Tests

This project uses `tap` for API integration tests. To run all tests:

```bash
npm test
```

- **Note:** Ensure your database is running and the test tables are migrated before testing.
- Tests are run against the database pointed to by `DATABASE_URL`.
- **Preferably use a separate test database in CI.**

----

## 🗂️ Project Structure

```project-structure
src/
  modules/
    book/
    author/
  plugins/
  utils/
tests/
  *.test.ts
.env
docker-compose.yml
```

----

## 📝 Endpoints

See [Swagger UI](http://localhost:3000/docs) for interactive documentation and testing.
