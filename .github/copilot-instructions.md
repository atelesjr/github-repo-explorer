# GitHub Repo Explorer - Copilot Instructions

## Project Context

This is a Front-End technical challenge for Desbravador Software.

The application is a client-side React application that consumes the GitHub REST API to:

- Search for GitHub users.
- Display user details.
- Display the user's repositories.
- Sort repositories by different criteria.
- Display repository details.
- Provide an external link to the repository on GitHub.

## Technology Stack

Use the existing project stack:

- React 19
- TypeScript
- Vite
- React Compiler
- React Router
- Axios
- Bootstrap 5
- Vitest
- React Testing Library

Do not introduce additional libraries unless there is a clear technical reason.

Prefer native React capabilities and the existing dependencies.

## Architecture

Follow a clean, modular and maintainable architecture.

Use clear separation of responsibilities between:

- Pages
- Components
- Hooks
- API/services
- Types
- Utilities
- Routing

Keep business logic out of presentational components whenever practical.

API communication must be isolated from UI components.

Components should focus primarily on rendering and user interaction.

Pages should compose components and coordinate page-level behavior.

Hooks should encapsulate reusable stateful behavior.

Services should encapsulate external API communication.

## SOLID Principles

Apply SOLID principles pragmatically.

### Single Responsibility Principle

Each module, component, hook and service should have one clear responsibility.

Avoid large components that handle:

- API communication
- state management
- business rules
- sorting
- formatting
- rendering

all at the same time.

### Open/Closed Principle

Prefer extensible implementations over modifying existing code unnecessarily.

For example, repository sorting should be designed so that new sorting strategies can be added without rewriting the repository list component.

### Liskov Substitution Principle

When abstraction or polymorphism is introduced, implementations must remain compatible with the expected contract.

Do not introduce inheritance merely to satisfy SOLID.

### Interface Segregation Principle

Prefer small, focused TypeScript interfaces and types.

Do not create large types that force unrelated consumers to depend on unnecessary properties.

### Dependency Inversion Principle

Keep UI components independent from concrete API implementations whenever practical.

Components should depend on abstractions such as hooks or service functions rather than directly calling Axios.

## React Principles

Prefer functional components and React hooks.

Avoid class components.

Prefer composition over inheritance.

Keep components small and focused.

Avoid unnecessary prop drilling.

Do not introduce global state management unless the application actually requires it.

Use local state when state is local to a component or page.

Use custom hooks when stateful logic is reusable or when extracting complex behavior improves readability.

Do not use useMemo, useCallback or React.memo without a meaningful reason.

The project uses React Compiler, so avoid manual memoization by default.

## TypeScript

Use strict TypeScript.

Avoid `any`.

Prefer explicit domain types.

Use type aliases or interfaces according to the problem being modeled.

Do not duplicate API types throughout the application.

Keep GitHub API models centralized.

Use type narrowing instead of unsafe type assertions.

Avoid unnecessary type assertions such as:

const user = data as User;

Prefer properly typed API responses.

## API and Axios

All GitHub API communication must be centralized in the API/service layer.

Do not call Axios directly from presentational components.

Use a configured Axios instance for GitHub API requests.

Handle:

- Loading states
- API errors
- Empty results
- Invalid users
- Network failures
- GitHub API rate limiting when appropriate

Do not expose secrets or credentials in client-side code.

Never hardcode authentication tokens.

## Routing

Use React Router for application routing.

Routes should represent application resources clearly.

Expected routes include:

/ - User search
/users/:username - User details and repositories
/users/:username/repos/:repoName - Repository details

Use route parameters rather than duplicating pages for individual users or repositories.

Handle invalid routes with an appropriate Not Found experience.

## Components

Prefer reusable components when reuse is meaningful.

Do not create abstractions simply to reduce the number of lines in a file.

A component should have a clear purpose.

Avoid components with excessive responsibilities or excessive numbers of props.

Prefer composition when a component contains multiple configurable parts.

## Styling

Use Bootstrap 5 as the primary responsive layout system.

Follow responsive and accessible design practices.

Avoid introducing another CSS framework.

Use semantic HTML.

Prefer Bootstrap utility classes for component styling. Inline styles are allowed only for local, exact values when Bootstrap has no equivalent utility, such as `style={{ height: '100px' }}` on a component-specific layout element.

Keep custom CSS focused on application-specific styling that Bootstrap does not provide.

# Bootstrap Styling Rules

## 1. Core Rule

Use Bootstrap utility classes directly in the component JSX/TSX.

**Do NOT create custom CSS classes for component styling.**

**Do NOT use inline styles when an equivalent Bootstrap utility exists.**

**Do NOT create component-specific CSS files.**

Do NOT create:

- `.css` files
- `.scss` files
- `.module.css` files
- `.module.scss` files

for individual components.

Styling must remain colocated with the component through Bootstrap classes.

---

## 2. Bootstrap Classes

Prefer Bootstrap classes directly in `className`.

When an exact value is not available, use an inline style only for that local value. Do not create a global CSS rule or a component-specific CSS file for it.

### Correct

```tsx
<div className="d-flex align-items-center justify-content-between gap-3 p-3 rounded-3 shadow-sm">
	...
</div>
```

For icon sizes, use Bootstrap utilities such as `fs-1` through `fs-6` directly in `className`.

## Accessibility

Follow basic WCAG principles.

Use semantic HTML elements.

All interactive controls must be keyboard accessible.

Images must have meaningful alt text when appropriate.

Form controls must have associated labels.

Do not use color as the only way to communicate information.

Buttons should be buttons and links should be links.

## Testing

Use Vitest and React Testing Library.

Tests should focus primarily on behavior rather than implementation details.

Prioritize testing:

- User search
- Loading states
- Error states
- Repository sorting
- Navigation
- Repository details
- Important user interactions

Avoid testing implementation details such as internal state variables.

Mock external GitHub API calls in unit/component tests.

Do not make real GitHub API requests during automated tests.

## Error Handling

Never silently ignore errors.

Provide useful feedback to the user.

Avoid exposing technical implementation details to end users.

Keep error handling close to the appropriate responsibility boundary.

## Performance

Avoid unnecessary API requests.

Do not fetch data that is not required by the current page.

Avoid unnecessary component re-renders.

Prefer simple solutions before introducing performance abstractions.

Use pagination or API limits where appropriate.

Do not sacrifice readability for micro-optimizations.

## Security

Never expose credentials, tokens or secrets.

Validate and safely handle user-provided input.

Do not construct unsafe HTML from GitHub API content.

Avoid dangerouslySetInnerHTML unless there is a compelling and reviewed reason.

External links should use appropriate security attributes when opening a new tab.

## Code Quality

Follow the existing ESLint configuration.

Use meaningful names.

Prefer small functions.

Avoid deeply nested conditionals.

Prefer early returns where they improve readability.

Avoid duplicated business logic.

Do not leave dead code, unused imports or commented-out implementations.

Do not add dependencies without justification.

## Before Implementing Changes

Before creating or modifying code:

1. Inspect the existing project structure.
2. Identify the appropriate layer for the change.
3. Reuse existing components, hooks, services and types when appropriate.
4. Avoid creating duplicate abstractions.
5. Consider whether the change affects routing, API contracts or tests.

## When Implementing Changes

When implementing a feature:

1. Explain the architectural decision briefly.
2. Implement the smallest maintainable solution.
3. Keep responsibilities separated.
4. Add or update tests when behavior changes.
5. Run linting and tests when possible.
6. Ensure TypeScript compilation succeeds.

## Important

Do not over-engineer this application.

SOLID principles should be applied pragmatically.

Do not introduce design patterns, abstractions, state-management libraries or additional dependencies merely to demonstrate knowledge.

Prefer:

simple + explicit + maintainable

over:

complex + abstract + over-engineered.
