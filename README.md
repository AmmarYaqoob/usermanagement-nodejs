# User Management API (Node.js + Express)

This is a simple and scalable **User Management System** built with Node.js using the **MVC pattern** along with a **service layer**. The system supports authentication features and CRUD operations for users, including role management.

## 🚀 Features

- ✅ User Registration (Signup)
- ✅ User Login with Email & Password
- ✅ Forgot Password
- ✅ Role-Based User Management
- ✅ Full CRUD Operations for Users
- ✅ RESTful API Architecture
- ✅ Clean code structure using MVC + Service Layer

## 📁 Project Structure

```
project-root/
│
├── src/
│   ├── config/           # Config files (e.g., DB config, env)
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── repositories/     # DB layer (data access)
│   ├── models/           # Mongoose/Sequelize models (if used)
│   ├── routes/           # API route definitions
│   ├── middlewares/      # Middleware for auth, validation, etc.
│   ├── validations/      # Joi or express-validator schemas
│   ├── utils/            # Utility/helper functions
│   ├── app.js            # Express app setup
│   └── server.js         # Application entry point
├── .env                  # Environment variables
└── package.json
```

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MySQL**
- **JWT** for authentication
- **bcrypt** for password hashing
- **nodemailer** (for sending email links) This feature is not implemented yet
- **dotenv** for configuration

## 🔐 Authentication Flows

### 1. Signup
- User registers using email and password.

### 2. Login
- JWT Token is issued on successful login.

> 📧 You’ll need to integrate your own email service in the appropriate utility file.

## 🔄 User Management

- Create, Read, Update, Delete (CRUD) operations for users.
- Assign and manage roles per user.

## 🧪 API Endpoints (Examples)

| Method | Endpoint                 | Description               |
|--------|--------------------------|---------------------------|
| POST   | `/api/auth/signup`       | Register new user         |
| POST   | `/api/auth/login`        | User login                |
| POST   | `/api/auth/forgot`       | Forgot password           |
| GET    | `/api/users`             | List all users            |
| GET    | `/api/users/:id`         | Get user by ID            |
| POST   | `/api/users`             | Create a new user         |
| PUT    | `/api/users/:id`         | Update user by ID         |
| DELETE | `/api/users/:id`         | Delete user by ID         |

## 🔧 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/AmmarYaqoob/usermanagement-nodejs.git
cd usermanagement-nodejs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file at root and add:

```
PORT=3333
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10
DATABASE=usermanagement
DB_USER=root
DB_PASS=password
HOST=localhost
DIALECT=mysql
DB_PORT=3306
SERVERURL=http://localhost:3333/
```

### 4. Run the application
```bash
npm start
```

## 🙋‍♂️ Contributing

Feel free to fork this repo, submit pull requests, or suggest improvements via issues!


## 💡 Future Improvements

- Add Swagger documentation
- Email service integration (SendGrid, Mailgun, etc.)
- 2FA authentication
- Pagination & filtering for user listing

## 🙌 Acknowledgement

Built with ❤️ using Node.js & Express.