![Logo](https://www.oblicuastudio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FsystemProComputer.8f9657d0.png&w=1920&q=75)

# System Pro Computer



## 🤖 Introdution

SystemProComputer is an online store specialized in selling electronic products focused on the gaming world and high-performance computing. We are dedicated to providing a complete experience for tech enthusiasts, offering components, peripherals, and systems designed to meet the demands of modern gaming and professional use.


## ⚙️ Tech Stack
- [Next.js](https://nextjs.org/) is a powerful React framework that enables the development of fast, scalable web applications with features like server-side rendering, static site generation, and API routes for building full-stack applications.
- [TailwindCSS](https://tailwindcss.com/) is a utility-first CSS framework that allows developers to design custom user interfaces by applying low-level utility classes directly in HTML, streamlining the design process.
- [TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers, making it ideal for building large-scale applications.
- [bcrypt.js](https://www.npmjs.com/package/bcrypt) is a password-hashing function designed to securely store user passwords by making them resistant to brute-force and rainbow table attacks. It works by applying a cryptographic hashing algorithm combined with a salt, which ensures that even identical passwords produce different hash values. One of bcrypt’s key features is its configurable cost factor, allowing developers to increase computational difficulty as hardware improves, making it a reliable and future-proof choice for password security in modern applications.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a library used to create and verify JSON Web Tokens (JWTs), a compact and secure way of transmitting information between parties as a JSON object. Commonly used in authentication systems, JWTs allow a server to verify a user's identity without maintaining session state. The token is signed using a secret or a public/private key pair, ensuring the data hasn’t been tampered with. This makes jsonwebtoken a popular choice for implementing stateless authentication in modern web applications, especially with frameworks like Node.js and Express.
- [Mercado pago SDK](https://www.mercadopago.com.ar/developers/es/docs/sdks-library/client-side/mp-js-v2) is the official SDK provided by Mercado Pago for integrating their payment platform into web and mobile applications. It allows developers to easily implement features such as payment processing, subscriptions, and checkout flows using Mercado Pago’s infrastructure. The library supports multiple payment methods, including credit cards, bank transfers, and local payment options across Latin America. With secure API communication and clear documentation, mercadopago enables businesses to manage transactions, handle notifications, and offer a seamless and localized payment experience to their users.
- [Prisma](https://www.prisma.io/) is a modern, open-source ORM (Object-Relational Mapping) for Node.js and TypeScript. It is designed to work with SQL databases such as PostgreSQL, MySQL, SQLite, and SQL Server, making it easier to interact with your application’s database.
- [PostgreSQL](https://www.postgresql.org/) is a powerful and open-source relational database management system known for its reliability, data integrity, and advanced features. It supports complex queries and transactions, adheres to SQL standards, and is fully ACID-compliant, making it a trusted choice for developers and companies building scalable and secure applications. Its flexibility allows it to handle both traditional relational data and more modern formats like JSON, making it suitable for a wide range of use cases—from small web apps to enterprise-level systems.


## 🛠 Run Locally

Clone the project

```bash
  git clone https://github.com/German2005-png/systemProComputer.git
```

Go to the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Set up the environment variables

Create a .env file based on .env.example and add the necessary:
```bash
  DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
  secretJWT="Enter your Secret Key"
  NEXT_PUBLIC_PUBLIC_KEY=your_public_key_here
  ACCESS_TOKEN_MERCADO_PAGO=your_access_token_here
```

Generate Prisma Client

```bash
  npx prisma generate
```

Apply the database schema (optional if not already migrated)

```bash
  npx prisma migrate dev --name init
```

Start the server
```bash
  npm run dev
```


## Authors

- [@GermanDev](https://github.com/German2005-png)