# Daily Expense Sharing App

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **Daily Expense Sharing App** is a web application designed to help users manage and split expenses among friends or family members. It allows users to create and track shared expenses, ensuring transparency and fairness in financial interactions.

## Features

- **User Registration and Authentication**: Users can sign up, log in, and manage their profiles.
- **Expense Management**: Create, update, and delete expenses with detailed descriptions and amounts.
- **Expense Splitting**: Split expenses using various methods: equal, exact amounts, or percentage splits.
- **Balance Sheet**: View a summary of owed and paid amounts between users.
- **Responsive Design**: The application is designed to be mobile-friendly.

## Technologies Used

- **Frontend**: 
  - React.js
  - HTML5, CSS3, JavaScript
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (using Mongoose for object modeling)
- **Version Control**: Git

## Installation

To get started with the Daily Expense Sharing App, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Daily-expense-sharing-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Daily-expense-sharing-app
   ```

3. **Install dependencies**:
   For both the frontend and backend:
   ```bash
   npm install
   ```

4. **Set up the environment**:
   Create a `.env` file in the root directory and add the necessary environment variables. Example:
   ```
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   PORT=5000
   ```

5. **Run the application**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:5000`.

## Usage

- **Register**: Create a user
- **Create an Expense**: After creating, you can create a new expense by providing the necessary details.
- **View Balance Sheet**: Check the balance sheet to see how much you owe or are owed.

## API Endpoints

The following API endpoints are available:

### User Endpoints
- **POST** `/api/user`: Create a new user
- **GET** `/api/user/:userId`: Retrieve user details

### Expense Endpoints
- **POST** `/api/expense`: Add a new expense
- **GET** `/api/expense/:expenseId`: Retrieve expense details
- **GET** `/api/expense/balance-sheet/:userId`: Retrieve the balance sheet for a user


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to fork the repository and submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
