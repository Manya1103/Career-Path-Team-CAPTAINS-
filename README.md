# Career-Path-Team-CAPTAINS-
# CareerPath.edu

A comprehensive career guidance platform for students after class 12th to navigate their educational and career paths through interactive roadmaps, exam information, and college details.

## Overview

CareerPath.edu provides interactive career roadmaps that help students visualize and plan their academic and career journeys. The platform offers information on various academic streams, entrance exams, popular career paths, and educational institutions to enable informed decision-making.

## Features

- **Academic Stream Exploration**: Browse detailed information about Science, Commerce, Arts, Computer Science, and Specialized educational streams
- **Interactive Career Roadmaps**: Visual flowcharts showing step-by-step career progression paths
- **Entrance Exam Information**: Details about various competitive exams including eligibility, format, important dates
- **College Directory**: Information about top colleges and institutions across different disciplines
- **Personalized Recommendations**: Find relevant career paths based on interests and academic background
- **Comprehensive Search**: Quickly find streams, roadmaps, exams, or colleges

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- ReactFlow for interactive flowchart visualization
- Wouter for client-side routing
- TanStack React Query for data fetching
- Radix UI components with shadcn/ui styling

### Backend
- Node.js with Express
- In-memory data storage with MemStorage implementation
- REST API architecture
- TypeScript for type safety

### Build Tools
- Vite for frontend development and building
- ESBuild for server-side code bundling
- TypeScript for static type checking

## Project Structure

```
CareerCompass/
├── client/                  # Frontend code
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions and constants
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main application component
│   │   ├── index.css        # Global styles
│   │   └── main.tsx         # Entry point
│   └── index.html           # HTML template
├── server/                  # Backend code
│   ├── routes.ts            # API routes definitions
│   ├── storage.ts           # Data storage implementation
│   ├── vite.ts              # Vite server setup
│   └── index.ts             # Server entry point
└── shared/                  # Shared code between client and server
    └── schema.ts            # Database schema definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CareerCompass.git
cd CareerCompass
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Main Features

### Career Roadmaps

Interactive flowcharts guide students through different career paths including:
- Engineering
- Medical
- Chartered Accountancy
- Law
- Design
- Computer Science & IT
- Data Science
- Research & Academia
- Civil Services

### Entrance Exam Information

Comprehensive details about competitive exams:
- JEE (Main & Advanced)
- NEET-UG
- CAT
- CLAT
- NIFT Entrance
- CA Foundation
- And more

### College Directory

Information about top educational institutions including:
- IITs and NITs
- Medical colleges like AIIMS
- Law universities
- Design institutes
- Management institutions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
