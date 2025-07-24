# To-Do API Project

This project is a backend service for a "To-Do List" application, developed using Node.js, Express, and MongoDB. The API supports basic CRUD (Create, Read, Update, Delete) operations and is documented with Swagger.

## ✨ Features

- Create new to-do tasks.
- List all existing tasks.
- Get the details of a specific task by its ID.
- Update a task's text or status (`Backlog`, `In progress`, `Done`).
- Delete a task from the database.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Documentation:** Swagger (swagger-ui-express, swagger-jsdoc)
- **Other:** CORS

## 🚀 Installation and Setup

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/gamzeaydinnn/to-do-app.git](https://github.com/gamzeaydinnn/to-do-app.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd to-do app
    ```

3.  **Install the necessary packages:**
    ```bash
    npm install
    ```

4.  **Start the application:**
    ```bash
    node index.js
    ```
   

Once the application is started, the server will be running at `http://localhost:3000`.

## 📚 API Documentation

All API endpoints are interactively documented with Swagger UI. This allows you to view and test the API directly from your browser.

To view the documentation, visit the following URL:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### API Endpoints

| Method   | Route (Endpoint) | Description                                  |
| :------- | :--------------- | :------------------------------------------- |
| `POST`   | `/todos`         | Creates a new task.                          |
| `GET`    | `/todos`         | Retrieves a list of all tasks.               |
| `GET`    | `/todos/{id}`    | Retrieves a single task by its ID.           |
| `PUT`    | `/todos/{id}`    | Updates an existing task by its ID.          |
| `DELETE` | `/todos/{id}`    | Deletes a task by its ID.                    |
