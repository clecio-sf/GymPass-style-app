# GymPass-Style App

This project was developed during the **Node.js Training Program** by [Rocketseat](https://www.rocketseat.com.br/), with the goal of putting into practice fundamental concepts of modern back-end development using the JavaScript/TypeScript ecosystem.

The application simulates a **GymPass-style system**, enabling gym management, user check-ins, and secure authentication. It was designed following best practices of software architecture, including functional requirements, business rules, and non-functional requirements.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Functional Requirements (FR)](#functional-requirements-fr)
- [Business Rules (BR)](#business-rules-br)
- [Non-Functional Requirements (NFR)](#non-functional-requirements-nfr)
- [API Endpoints](#api-endpoints)
- [Environment Configuration](#environment-configuration)
- [Run Migrations and Start the Server](#run-migrations-and-start-the-server)



---

## Technologies Used

- Node.js
- TypeScript
- PostgreSQL
- JWT (JSON Web Token)
- Prisma ORM
- Zod (schema validation)
- Fastify

---

## Functional Requirements (FR)

| Code  | Description                                                              |
|-------|--------------------------------------------------------------------------|
| FR-01 | Users must be able to register                                           |
| FR-02 | Users must be able to authenticate                                       |
| FR-03 | Authenticated users must be able to retrieve their profile               |
| FR-04 | Users must be able to view their total number of check-ins               |
| FR-05 | Users must be able to view their check-in history                        |
| FR-06 | Users must be able to search for nearby gyms (within 10 km)              |
| FR-07 | Users must be able to search gyms by name                                |
| FR-08 | Users must be able to perform check-ins at a gym                         |
| FR-09 | Check-ins must be able to be validated                                   |
| FR-10 | Gyms must be able to be registered                                       |

---

## Business Rules (BR)

| Code  | Description                                                                 |
|-------|-----------------------------------------------------------------------------|
| BR-01 | Users cannot register with duplicate email addresses                        |
| BR-02 | Users cannot check in more than once on the same day                        |
| BR-03 | Users can only check in if they are within 100 meters of the gym            |
| BR-04 | Check-ins can only be validated within 20 minutes of their creation         |
| BR-05 | Only administrators can validate check-ins                                  |
| BR-06 | Only administrators can register new gyms                                   |

---

## Non-Functional Requirements (NFR)

| Code   | Description                                                               |
|--------|---------------------------------------------------------------------------|
| NFR-01 | User passwords must be stored in an encrypted format                      |
| NFR-02 | Data must be persisted in a PostgreSQL database                           |
| NFR-03 | All data listings must be paginated, with 20 items per page               |
| NFR-04 | Users must be authenticated using JWT (JSON Web Token)                    |

---
## API Endpoints


```markdown
| Method | Route                            | Description                    | Auth Required |
|--------|----------------------------------|--------------------------------|---------------|
| POST   | `/users`                         | User registration              | No            |
| POST   | `/sessions`                      | User login                     | No            |
| GET    | `/me`                            | Get current user profile       | Yes           |
| GET    | `/check-ins/metrics`             | Get user check-in count        | Yes           |
| GET    | `/check-ins/history`             | Get user check-in history      | Yes           |
| POST   | `/gyms`                          | Register a new gym             | Yes (Admin)   |
| GET    | `/gyms/search`                   | Search gyms by name            | Yes           |
| GET    | `/gyms/nearby`                   | Search gyms nearby             | Yes           |
| POST   | `/gyms/:gymId/check-ins`         | Perform check-in at a gym      | Yes           |
| PATCH  | `/check-ins/:checkInId/validate` | Validate a user check-in       | Yes (Admin)   |
````

## Installation

````bash

git clone https://github.com/your-username/gympass-app.git

cd gympass-app

npm install

````
## Environment Configuration

Create a `.env` file in the root of the project and set the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gympass"

JWT_SECRET="your_jwt_secret"
```
## Run Migrations and Start the Server

```bash
npx prisma migrate dev

npm run start:dev
```


