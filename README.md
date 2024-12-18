# Star Wars API Documentation

This project provides a RESTful API for retrieving information about various resources in the Star Wars universe, such as films, planets, species, vehicles, and starships. The API is implemented using Node.js with Express and follows the OpenAPI Specification for documentation.

## Features

- Retrieve a paginated list of Star Wars resources.
- Fetch details about specific resources by ID.
- Filter resources using query parameters like `name`, `title` and `model` (where applicable).
- API documentation is provided in the `docs` folder following OpenAPI Specification.
- Fully containerized using Docker for easy deployment.

## Installation and Setup

### Prerequisites

- Docker and Docker Compose
- Node.js (optional for local development without Docker)

### Steps to Run the Application

1. Clone the repository:

   ```bash
   git clone
   cd star-wars-api
   ```

2. Install dependencies (only for local development):

   ```bash
   npm install
   ```

3. Setup environment variables:

   ```bash
   cp .env.local .env
   ```

4. Start the application in development mode:

   ```bash
   npm run dev
   ```

5. Start the application using Docker

6. ```bash
   docker-compose up --build
   ```

7. Accces the API at
   http://localhost:3000

# Api Documentation

Access the API at http://localhost:3000/api-docs.

# Project structure

`src/` Contains the application source code

`routes/` Defines the API routes for various resources

`controllers/` Contains the logic for handling API requests and responses.

`services/` Includes business logic for data retrieval and processing.

`middleware/` Middleware for handling caching, resource types, and more.

```bash
.
├── src/
│   ├── routes/           # API route definitions
│   ├── controllers/      # Request and response handlers
│   ├── services/         # Business logic and data processing
│   ├── middleware/       # Middleware for caching, resource handling, etc.
│   └── ...
├── docs/
│   ├── openapi.yaml      # Main OpenAPI file
│   ├── films.yaml        # Films API documentation
│   ├── planets.yaml      # Planets API documentation
│   └── ...
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Dockerfile for the application
├── .env.local            # Environment variable template
├── README.md             # Project documentation
└── ...

```

# Scripts

- `npm run dev` Start the application in development mode.
- `npm start` Start the application in production mode.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run test`: Run tests (if tests are implemented).
