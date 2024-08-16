# Project Name

## Overview

This project is a full-stack application built with modern web technologies. The front end is powered by Next.js, while the back end is also built on Next.js, Prisma, and SQLite. The application leverages Zod for validation, JWT for authentication, and Prisma for ORM.

## Technologies

### Front End

- **Next.js 14:** The React framework for production with hybrid static & server rendering, and TypeScript support.
- **TypeScript:** A strongly typed programming language that builds on JavaScript.
- **Material UI:** Used for responsive and modern UI components.
- **React Hook Form:** Simplifies form handling and validation in React.
- **Server Actions:** Enhances Next.js by allowing direct interaction with server-side logic.
- **Revalidate Tag (Next.js Cache):** Enables cache invalidation for better performance and up-to-date data.
- **TanStack Query (React Query):** Manages server-state and API requests efficiently.
- **Zod Validation:** Schema-based validation for form data.
- **JWT Token-Based Authentication:** Ensures secure user authentication and authorization.

### Backend

- **Next.js 14:** Also used on the backend to handle server-side logic and API routes.
- **Prisma:** A next-generation ORM that helps manage database interactions.
- **SQLite3:** A lightweight SQL database engine used for development.
- **TypeScript:** Ensures type safety throughout the backend codebase.
- **Zod Validation:** Ensures the correctness of data structures and API requests.
- **JWT Token-Based Authentication:** Implements JSON Web Token (JWT) for secure authentication.

## Instructions

### Environment Setup

1. **Create Environment Variables:**
   - Create a `.env.local` file in the root directory, next to the `package.json` file.
   - Add the following environment variables to the `.env.local` file:

     ```bash
     DATABASE_URL="file:./dev.db"
     SALT_ROUND=10
     SECRET_KEY="uQy+MLBV0iwVASPOXP91hk/UWhvVGgLyFpm8txHtdvw="
     EXP_1D="1d"
     NEXT_PUBLIC_BACKEND_API_URL="http://localhost:3000/api/v1"
     ```

### Installation

2. **Install Dependencies:**
   - Run the following command in the terminal to install all required dependencies:

     ```bash
     npm install
     ```

### Running the Application

3. **Start the Development Server:**
   - Use the following command to start the development server:

     ```bash
     npm run dev
     ```

## Additional Information

- **API URL:** Ensure that the backend server is running on `http://localhost:3000` for the front end to communicate effectively with the API.
- **SQLite3 Database:** The application uses SQLite3 as the database engine, making it lightweight and easy to set up. Prisma is configured to interact with this database.

## Notes

- Ensure all necessary ports are open and that no other service is running on the port used by this application.
- This application is structured to be modular and easily extensible, making it a great starting point for larger projects.

---

Feel free to contribute and extend this project further!
