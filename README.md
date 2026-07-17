Mini SaaS Dashboard

A full-stack SaaS project management dashboard built with React, Node.js, Express, PostgreSQL, and Docker.

The application allows users to create an account, authenticate using JWT, and manage projects through a responsive dashboard interface.

⸻

Features

Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Logout functionality
- Password hashing with bcrypt

Project Management

- Create projects
- Update projects
- Delete projects
- View projects
- Search projects
- Filter projects by status

Dashboard

- Total projects statistics
- Active projects count
- On-hold projects count
- Total budget calculation

User Experience

- Responsive UI
- Form validation
- Error notifications
- Success notifications
- Loading states
- Delete confirmation modal

⸻

Tech Stack

Frontend

- React
- React Router
- Axios
- React Hook Form
- Tailwind CSS
- React Icons

Backend

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- bcrypt

DevOps

- Docker
- Docker Compose

⸻

Project Structure

mini-saas-dashboard/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── config/
│ │ └── server.js
│ │
│ ├── Dockerfile
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── routes/
│ │
│ ├── Dockerfile
│ ├── package.json
│ └── .env
│
├── docker-compose.yml
└── README.md

⸻

Running the Application with Docker

Requirements

Install:

- Docker
- Docker Compose

No need to install:

- Node.js
- npm
- PostgreSQL

Docker will run all services.

⸻

Environment Configuration

Create:

backend/.env

Copy exact variables in .emv

PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=saas_dashboard
DB_USER=admin
DB_PASSWORD=password
JWT_SECRET=my_super_secret_key
FRONTEND_URL=http://localhost:3000

Create:

frontend/.env

Copy exact variables in .emv

REACT_APP_API_URL=http://localhost:5000/api

⸻

Start Application

From the project root:

docker compose up --build

Docker starts:

Service Container Port
React Frontend mini-saas-frontend 3000
Express Backend mini-saas-backend 5000
PostgreSQL. Database mini-saas-postgres 5433

⸻

## Database Seeding

Start the containers:

after running the containers run seed command for sample data

docker exec -it mini-saas-backend npm run seed

Access Application

⸻

Frontend:

http://localhost:3000

Backend:

http://localhost:5000

Database:

localhost:5433

⸻

Stop Application

Stop containers:

docker compose down

⸻

Reset Database

Remove containers and database data:

docker compose down -v

Start again:

docker compose up --build

⸻

Application Architecture

                 Browser
                    |
                    |
          React Frontend Container
               Port 3000
                    |
                    |
          Express Backend Container
               Port 5000
                    |
                    |
        PostgreSQL Database Container
               Port 5432

Docker Compose creates a private network between services.

The backend connects to PostgreSQL using:

DB_HOST=postgres

because containers communicate using service names.

⸻

Authentication Flow

1. User registers an account.
2. Password is encrypted using bcrypt.
3. User logs in with email and password.
4. Backend validates credentials.
5. Backend generates a JWT token.
6. Frontend stores: token and user information in local storage.
7. Protected requests send:

Authorization: Bearer <token>

⸻

API Endpoints

Authentication

Register

POST /api/auth/register

Request:

{
"name": "Admin",
"email": "admin@example.com",
"password": "password"
}

⸻

Login

POST /api/auth/login

Request:

{
"email": "admin@example.com",
"password": "password"
}

Response:

{
"token": "jwt_token",
"user": {
"id": 1,
"name": "Admin",
"email": "admin@example.com"
}
}

⸻

Project API

All project routes require JWT authentication.

Header:

Authorization: Bearer TOKEN

⸻

Get Projects

GET /api/projects

⸻

Create Project

POST /api/projects

Example:

{
"name": "Website Redesign",
"description": "New company website",
"status": "ACTIVE",
"budget": 5000
}

⸻

Update Project

PUT /api/projects/:id

⸻

Delete Project

DELETE /api/projects/:id

⸻

Useful Docker Commands

View containers:

docker ps

View logs:

docker compose logs backend

View all logs:

docker compose logs

Rebuild images:

docker compose build

Restart services:

docker compose restart

⸻

Development Workflow

The complete application can be started using:

docker compose up --build

This starts the frontend, backend, and database without requiring local installations.

⸻

Running Without Docker

If you prefer to run the application locally, install the required dependencies first.

Requirements

Install:

- Node.js (v18 or higher)(used node v20.18.3 for this project)
- npm
- PostgreSQL (v16 recommended)(i used 17.5)

⸻

Database Setup

1. Start PostgreSQL locally.
2. Create a database:

CREATE DATABASE saas_dashboard;

3. Create a database user:

CREATE USER admin WITH PASSWORD 'password';

4. Grant permissions:

GRANT ALL PRIVILEGES ON DATABASE saas_dashboard TO admin;

⸻

Backend Setup

Open a terminal:

cd backend

Install dependencies:

npm install

Create environment file:

touch .env

Add:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=saas_dashboard
DB_USER=admin
DB_PASSWORD=password
JWT_SECRET=my_super_secret_key
FRONTEND_URL=http://localhost:3000

Start backend:

npm run server

Backend will run on:

http://localhost:5000

## Database Seeding

The project includes a seed script to add sample project data.

Run:

```bash
cd backend
npm run seed


⸻

Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Create environment file:

touch .env

Add:

REACT_APP_API_URL=http://localhost:5000/api

Start frontend:

npm start

Frontend will run on:

http://localhost:3000

⸻

Running Both Services

You should have three processes running:

Terminal 1:

cd backend
npm run server

Terminal 2:

cd frontend
npm start

Terminal 3:

PostgreSQL database running locally.

⸻

Development URLs

Frontend:

http://localhost:3000

Backend:

http://localhost:5000

Database:

localhost:5432

Future Improvements if needed

- Refresh token authentication
- Role-based permissions
- Automated tests
- CI/CD pipeline
- Production deployment
- Nginx production frontend container
- Cloud hosting setup
```
