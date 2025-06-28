# User Manager

A simple Vue 3 + Vite application for managing users, with full unit test coverage using Vitest and @vue/test-utils.

## Features
- Display a list of users in a styled table
- View user details in a modal
- Delete users from the table
- Responsive and modern UI
- Unit tests for all core functionality

## Getting Started

### Install dependencies
```sh
npm install
```

### Run the development server
```sh
npm run dev
```

### Run unit tests
```sh
npm run test
```
This will launch the Vitest UI. You can also run tests in the terminal with:
```sh
npx vitest run
```

## Project Structure
- `src/components/UserTable.vue` — User table component
- `src/components/UserModal.vue` — User details modal
- `src/components/UserTable.spec.ts` — Unit tests for UserTable
- `src/components/UserModal.spec.ts` — Unit tests for UserModal

## Tech Stack
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [@vue/test-utils](https://test-utils.vuejs.org/)
