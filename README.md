## Description
This project is a full-stack web application using the MERN (MongoDB, Express, React, and Node.js) stack. It allows user to do manage leads.

## Technologies Used
- MongoDB: NoSQL database for storing user data
- Express: Node.js framework for building APIs
- React: Frontend JavaScript library for building user interfaces
  - ContextApi(for State Management)
  - JWT(for Auth)
- Node.js: JavaScript runtime for server-side code
  - Zod(for Data Validation)
  - .env
  - Dynamic Routing

## Prerequisites
- [Node.js] (https://nodejs.org/): Download and install the latest version.
- [MongoDB] (https://www.mongodb.com/try/download/community): Download and install MongoDB.
- [Git] (https://git-scm.com/): Version control system to clone the repository.

## Installation

### 1. Clone the repository:

1. git clone 
2. cd Lead-Management-Tool
3. cd backend
4. npm install
5. cd ../frontend
6. npm install


## .env 

MONGO_URI = "mongodb+srv://yjain301000:cizjom-7xupdi-jeSrix@cluster0.416ns.mongodb.net/lead_management"
JWT_SECRET = "123454dsdadada"
PORT = 3000

## Running The Project

1. To Run frontend
  - cd /frontend
  - npm run dev
2. To Run backend
   - cd /backend
   - node server.js



