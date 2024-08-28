# DOT HIRING BACKEND TEST

This project is created for skill testing at DOT Malang Backend Developer

# How to Run This Project?

To run this project locally, follow these steps:

1. **Clone the Repository & Go To Directory**

```bash
git clone https://github.com/superrexy/dot-hiring-backend.git && cd dot-hiring-backend
```

2. **Run Install Library**

```bash
npm install
```

3. **Copy .env.example to .env**

```bash
cp .env.example .env
```

4. **Setup Database with Your Credentials**

   For Database Driver reference [Prisma Database Driver](https://www.prisma.io/docs/orm/overview/databases)

```env
DATABASE_URL="postgresql://postgres@localhost:5432/db_dot_hiring?schema=public"
```

5. **Run Deploy Migration & Generate Model**

```bash
npx prisma migrate deploy && npx prisma generate
```

6. **Run Project**

```bash
npm run start:dev
```

## API Documentation

> **Swagger Web**

```
http://localhost:3000/api-docs
```

> **Swagger JSON**

```
http://localhost:3000/api-docs-json
```

## Demo Testing
```
http://103.76.129.93:34343/api-docs
```
