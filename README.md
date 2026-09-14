# GitHub Repo Explorer

A responsive Single Page Application (SPA) built with React and
TypeScript for exploring GitHub users and their public repositories.

The application consumes the GitHub REST API and provides a simple
workflow to search for a GitHub user, inspect profile information,
browse repositories, change repository ordering, and view repository
details.

## Demo

**Live demo:** https://github-repo-explorer-wine.vercel.app/

---

## Getting Started

### Prerequisites

Before running the project locally, make sure you have:

- Node.js installed
- pnpm installed

Using NVM is recommended if you work with multiple Node.js versions.

Verify the installed versions:

```bash
node --version
pnpm --version
```

### 1. Clone the repository

```bash
git clone https://github.com/atelesjr/github-repo-explorer.git
cd github-repo-explorer
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

Vite will display the local development URL in the terminal, normally:

```text
http://localhost:5173
```

Open that address in your browser.

### 4. Create a production build

```bash
pnpm build
```

### 5. Preview the production build

```bash
pnpm preview
```

### 6. Run the tests

Watch mode:

```bash
pnpm test
```

Run the complete test suite once:

```bash
pnpm test:run
```

### 7. Run linting

```bash
pnpm lint
```

### Available scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `pnpm dev`      | Starts the development server              |
| `pnpm build`    | Type-checks and creates a production build |
| `pnpm preview`  | Serves the production build locally        |
| `pnpm lint`     | Runs ESLint                                |
| `pnpm test`     | Runs Vitest in watch mode                  |
| `pnpm test:run` | Runs the test suite once                   |

---

---

## Overview

GitHub Repo Explorer was developed as a Front-End technical challenge
with a focus on clean architecture, maintainability, responsive design,
accessibility, API integration, testing, and a good user experience.

The application follows a client-side architecture where GitHub data is
retrieved through a dedicated service layer and presented through
focused React components.

The main user journey is:

```text
Home
  │
  │ Search GitHub username
  ▼
User Profile
  │
  ├── Profile information
  ├── Followers / Following
  ├── Repository list
  └── Repository sorting
          │
          │ Select repository
          ▼
Repository Details
  │
  ├── Name
  ├── Description
  ├── Stars
  ├── Language
  └── GitHub repository link
```

## Features

- Search for a GitHub user by username
- Display GitHub profile information
  - Avatar
  - Name
  - Username
  - Bio
  - Public email when available
  - Followers
  - Following
- Display the user's public repositories
- Display repository information
  - Name
  - Description
  - Stars
  - Primary language
- Sort repositories without making another API request
  - Most stars
  - Fewest stars
  - Name A-Z
  - Name Z-A
- View repository details
- Navigate between views using client-side routing
- Open the repository directly on GitHub
- Responsive layout for desktop and mobile
- Loading states
- Error states
- Empty states
- Unit and component tests

---

## Tech Stack

### Core

- React 19
- TypeScript
- Vite
- React Router
- Axios

### UI

- Bootstrap 5
- Lucide React

### Testing

- Vitest
- Testing Library
- Testing Library DOM matchers
- Testing Library User Event

### Development

- ESLint
- pnpm
- React Compiler

---

## Routes

Route Purpose

---

`/` Home page and GitHub username search
`/users/:username` GitHub user profile and repositories
`/users/:username/repos/:repoName` Repository details

The route structure keeps navigation explicit and allows repository
details to be accessed through a shareable URL.

---

## Architecture

The project uses a component-oriented architecture with a separation
between presentation, application logic, API communication, types, and
pure utilities.

```text
src/
├── components/
│   ├── layout/
│   ├── repository/
│   ├── ui/
│   └── user/
│
├── hooks/
│   ├── useRepositories.ts
│   └── useUser.ts
│
├── pages/
│   ├── HomePage.tsx
│   ├── RepositoryPage.tsx
│   └── UserPage.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   └── github/
│       ├── githubApi.ts
│       ├── repositoryService.ts
│       └── userService.ts
│
├── types/
│   ├── github.ts
│   └── repository.ts
│
├── utils/
│
├── test/
│   └── setup.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

### Responsibilities

#### Pages

Pages compose complete application screens and coordinate page-level
state.

- `HomePage`
- `UserPage`
- `RepositoryPage`

#### Components

Components are focused on presentation and specific UI responsibilities.

Examples:

- `UserProfile`
- `RepositoryList`
- `RepositoryCard`
- `RepositorySort`

#### Hooks

Hooks encapsulate data fetching and related React state.

Examples:

- `useUser`
- `useRepositories`

#### Services

The service layer owns communication with the GitHub API.

React components do not perform HTTP requests directly.

```text
Component
    │
    ▼
  Hook
    │
    ▼
 Service
    │
    ▼
  Axios
    │
    ▼
GitHub REST API
```

This keeps UI concerns separate from networking concerns and makes the
application easier to test and evolve.

#### Utils

Pure functions that do not depend on React or external services are kept
independently.

Repository sorting is an example of logic that belongs here because it
can be tested independently of the UI.

---

## GitHub REST API

The application uses GitHub's public REST API.

Main endpoints:

```text
GET /users/{username}

GET /users/{username}/repos

GET /repos/{owner}/{repo}
```

The repository endpoint supports pagination. API-specific concerns such
as retrieving the complete repository collection are kept inside the
service layer rather than being exposed to presentation components.

The application does not require a GitHub Personal Access Token for the
public data used by this challenge.

For the complete API reference, see the official GitHub REST API
documentation:

https://docs.github.com/en/rest

---

## Repository Sorting

Repositories are initially ordered by stars in descending order.

Available sorting options:

```text
Most stars
Fewest stars
Name A-Z
Name Z-A
```

Sorting is performed locally after the repositories have been loaded.

This means changing the sort option does not trigger another network
request.

The original repository collection is not mutated. The sorting operation
works with a new ordered collection.

Conceptually:

```text
GitHub API response
        │
        ▼
Repository state
        │
        ▼
Pure sorting function
        │
        ▼
Sorted repositories
        │
        ▼
RepositoryList
```

Keeping sorting as a pure operation makes the behavior predictable and
straightforward to test.

---

## Responsive Design

Bootstrap's responsive grid is used for the main layout.

### Desktop

```text
┌────────────────┬──────────────────────────────────┐
│                │                                  │
│  User Profile  │       Repository List            │
│                │                                  │
│                │  ┌──────────┐  ┌──────────┐      │
│                │  │  Repo    │  │  Repo    │      │
│                │  └──────────┘  └──────────┘      │
│                │                                  │
└────────────────┴──────────────────────────────────┘
```

### Mobile

```text
┌──────────────────────────┐
│       User Profile       │
├──────────────────────────┤
│        Repository        │
├──────────────────────────┤
│        Repository        │
├──────────────────────────┤
│        Repository        │
└──────────────────────────┘
```

On larger screens, repositories are displayed in a two-column grid. On
smaller screens, the layout changes to a single column.

---

## Accessibility

Accessibility was considered as part of the component and layout
implementation.

The application uses:

- Semantic HTML
- Meaningful heading hierarchy
- Labels associated with form controls
- Keyboard-accessible native controls
- Accessible links and buttons
- Alternative text for user avatars
- Decorative icons hidden from assistive technologies when appropriate
- Visible focus behavior provided by the UI framework
- Clear loading, error, and empty states

External repository links use:

```html
target="_blank" rel="noopener noreferrer"
```

Native form controls are preferred when they already provide the
required interaction and accessibility behavior.

---

## Loading and Error Handling

The application explicitly handles the main states that can occur during
API interaction.

### Loading

A loading state is displayed while GitHub API requests are in progress.

### User not found

A dedicated error state is displayed when the requested GitHub username
does not exist.

### Repository not found

A repository-specific error state is displayed when the requested
repository cannot be retrieved.

### Empty repositories

The UI provides an appropriate empty state when a valid GitHub user has
no public repositories.

### Network/API errors

Unexpected API or network failures are converted into user-friendly
application states instead of exposing raw implementation details.

---

## Testing

The project uses Vitest and Testing Library.

The testing strategy focuses primarily on user-visible behavior and
component responsibilities instead of implementation details.

Examples of scenarios covered include:

- Rendering GitHub user information
- Rendering repositories
- Repository sorting
- Repository detail information
- Loading states
- Error states
- Empty states
- Navigation
- External GitHub links
- Accessibility-related behavior of interactive elements

### Run tests in watch mode

```bash
pnpm test
```

### Run tests once

```bash
pnpm test:run
```

## Testing with Testing Library

Testing Library encourages tests based on how users interact with the
application rather than tests tightly coupled to internal implementation
details.

---

## Project Goals

This project was created to demonstrate practical Front-End engineering
skills, including:

- React development
- TypeScript
- REST API integration
- Client-side routing
- Component architecture
- Responsive UI development
- State management
- Error handling
- Testing
- Accessibility
- Performance awareness
- Code organization
- Maintainability

The goal is not only to satisfy the functional requirements, but to
demonstrate how those requirements can be implemented with a clear and
maintainable architecture.

---

## Author

**Agostinho Teles Jr.**

Front-End Developer focused on React, TypeScript and modern web
application architecture.

- GitHub: https://github.com/atelesjr
- Project: https://github.com/atelesjr/github-repo-explorer

---

## License

This project was developed as a technical challenge and portfolio
project.
