# Architecture

## Frontend

Framework: React
Language: TypeScript
Bundler: Vite

Libraries:
- react-markdown for preview (or better alternative)
- axios for HTTP
- React MUI for styling
- redux toolkit for state management

## Backend

Framework: Express
Language: TypeScript

## Rendering

Markdown preview rendered client-side.

PDF generation performed server-side.

## Data Flow

Browser
   |
   v
React App
   |
POST /api/pdf/generate-file
   |
Express Server
   |
PDF returned as a Buffer