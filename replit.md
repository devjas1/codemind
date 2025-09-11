# Overview

This is a full-stack web application built with React and Express that appears to be designed as a dashboard interface for a machine learning CLI tool called "Gemma-Phi2-CLI". The application provides a user interface for managing an intelligent document assistant that combines EmbeddingGemma-300m for text embeddings, FAISS for vector storage, and Phi-2 for text generation. The project uses a modern tech stack with TypeScript, Vite for frontend bundling, Drizzle ORM for database operations, and a comprehensive UI component library based on Radix UI and shadcn/ui.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built as a Single Page Application (SPA) using React with TypeScript. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized production builds. The UI is constructed using a comprehensive component library based on Radix UI primitives and styled with Tailwind CSS, following the shadcn/ui design system. State management is handled through React Query (TanStack Query) for server state and React's built-in state management for local component state.

The application follows a modular component structure with clearly separated concerns:
- Pages for top-level route components
- Reusable UI components in a dedicated components directory
- Custom hooks for shared logic
- Centralized styling with CSS variables for theming

## Backend Architecture
The backend uses Express.js with TypeScript in ESM module format. The server implements a RESTful API architecture with middleware for request logging, JSON parsing, and error handling. The application uses a modular route structure that can be extended with API endpoints prefixed with `/api`. The server integrates with Vite in development mode for seamless full-stack development experience.

The storage layer is abstracted through an interface-based approach, currently implementing an in-memory storage solution but designed to be easily swapped for persistent storage solutions. The storage interface provides basic CRUD operations for user management.

## Database Design
The application uses Drizzle ORM with PostgreSQL as the database. The schema is defined using Drizzle's TypeScript-first approach with type-safe database operations. The current schema includes a users table with fields for ID (UUID), username, and password. The database configuration supports migrations and uses environment variables for connection strings.

## Authentication and Session Management
The application includes basic user management structures but does not implement full authentication in the current state. The foundation is laid for session-based authentication with the inclusion of connect-pg-simple for PostgreSQL session storage.

## Development and Build Process
The project uses a monorepo structure with shared types and schemas between frontend and backend. TypeScript configuration is set up for strict type checking across the entire codebase. The build process creates optimized bundles for both client and server code, with the server being bundled using esbuild for production deployment.

The development workflow includes:
- Hot module replacement for frontend development
- Automatic server restart for backend changes
- Type checking across the entire codebase
- Database migration support through Drizzle Kit

# External Dependencies

## UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives for building the component library
- **Tailwind CSS**: Utility-first CSS framework for styling with custom design tokens
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **Class Variance Authority**: Utility for creating variant-based component APIs

## Data Management
- **TanStack React Query**: Server state management with caching, synchronization, and background updates
- **React Hook Form**: Form state management with validation support
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries
- **Zod**: TypeScript-first schema validation library

## Database and ORM
- **Drizzle ORM**: TypeScript-first ORM with type-safe database operations
- **Drizzle Zod**: Integration between Drizzle ORM and Zod for schema validation
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless environments
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **esbuild**: Fast JavaScript bundler for server-side code
- **tsx**: TypeScript execution environment for development
- **@replit/vite-plugin-runtime-error-modal**: Replit-specific development enhancement
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

## Routing and Navigation
- **Wouter**: Lightweight client-side routing library for React

## Additional Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **embla-carousel-react**: Carousel component for React applications
- **cmdk**: Command palette component for React