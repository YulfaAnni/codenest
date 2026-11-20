# 📂 CodeNest - Project Structure Guide

## 🏗️ Architecture Overview

CodeNest follows a **clean, scalable, and maintainable** architecture pattern with clear separation of concerns.

```
src/
├── config/              # Configuration files
├── services/            # Business logic & API calls
├── hooks/               # Custom React hooks
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   ├── pages/          # Page components
│   └── features/       # Feature-specific components
├── utils/              # Utility functions
├── constants/          # App-wide constants
└── assets/             # Static assets (images, fonts)
```

---

## 📁 Directory Structure

### `/src/config`
**Purpose:** Application configuration files

- `firebase.config.js` - Firebase initialization and setup
- Future: API endpoints, environment configs

**Example:**
```javascript
import { db, auth } from '../config/firebase.config';
```

---

### `/src/services`
**Purpose:** Business logic and data operations (Firebase, APIs)

- `auth.service.js` - Authentication operations
- `tutorial.service.js` - Tutorial CRUD operations
- Future: `storage.service.js`, `analytics.service.js`

**Benefits:**
- ✅ Single source of truth for data operations
- ✅ Easy to test and mock
- ✅ Reusable across components

**Example:**
```javascript
import { authService, tutorialService } from '../services';

// Usage
await authService.signInWithGoogle();
await tutorialService.addTutorial(data);
```

---

### `/src/hooks`
**Purpose:** Custom React hooks for shared logic

- `useAuth.js` - Authentication state and methods
- `useTutorials.js` - Tutorial management
- `useClipboard.js` - Clipboard operations
- Future: `useDebounce.js`, `useLocalStorage.js`

**Benefits:**
- ✅ Reusable stateful logic
- ✅ Cleaner components
- ✅ Easy to test

**Example:**
```javascript
import { useAuth, useTutorials } from '../hooks';

function MyComponent() {
  const { user, signInWithGoogle } = useAuth();
  const { tutorials, addTutorial } = useTutorials();
  // ...
}
```

---

### `/src/components`
**Purpose:** React components organized by type

#### `components/ui/`
Reusable, presentational UI components

- `Button.jsx` - Button component with variants
- `Input.jsx` - Input & Textarea components
- `Modal.jsx` - Modal dialog
- `Card.jsx` - Card components
- Future: `Badge.jsx`, `Dropdown.jsx`, `Tabs.jsx`

**Usage:**
```javascript
import { Button, Input, Modal } from '../components/ui';

<Button variant="primary" icon={<PlusIcon />}>
  Add Tutorial
</Button>
```

#### `components/layout/`
Layout and structural components

- `Header.jsx` - App header with auth controls
- Future: `Sidebar.jsx`, `Footer.jsx`, `Layout.jsx`

#### `components/pages/`
Full page components

- Future: `HomePage.jsx`, `TutorialsPage.jsx`, `TutorialDetailPage.jsx`

#### `components/features/`
Feature-specific components

- Future: `TutorialCard.jsx`, `TutorialForm.jsx`, `CodeBlock.jsx`

---

### `/src/utils`
**Purpose:** Helper functions and utilities

- `markdown.utils.js` - Markdown parsing and rendering
- `helpers.utils.js` - General utilities (date formatting, copy, etc.)
- Future: `validation.utils.js`, `storage.utils.js`

**Example:**
```javascript
import { renderMarkdown, formatDate, copyToClipboard } from '../utils';

const elements = renderMarkdown(content);
const formattedDate = formatDate(new Date());
await copyToClipboard('text');
```

---

### `/src/constants`
**Purpose:** App-wide constants and configurations

- `app.constants.js` - App name, routes, defaults

**Benefits:**
- ✅ Single source of truth for constant values
- ✅ Easy to update across the app
- ✅ No magic strings/numbers

**Example:**
```javascript
import { APP_NAME, ROUTES, AUTH_PROVIDERS } from '../constants/app.constants';

console.log(APP_NAME); // 'CodeNest'
navigate(ROUTES.HOME);
```

---

### `/src/assets`
**Purpose:** Static files (images, fonts, icons)

- `codenest-logo.png` - App logo
- Future: icons, illustrations, fonts

---

## 🎯 Design Principles

### 1. **Separation of Concerns**
- Components focus on UI
- Services handle data
- Hooks manage state
- Utils provide helpers

### 2. **Single Responsibility**
- Each file has one clear purpose
- Small, focused modules
- Easy to understand and maintain

### 3. **Reusability**
- UI components are generic
- Services are app-agnostic
- Hooks can be used anywhere
- Utils are pure functions

### 4. **Scalability**
- Easy to add new features
- Clear where new code goes
- Minimal coupling between modules

### 5. **Testability**
- Services can be mocked
- Hooks can be tested independently
- Components receive props
- Utils are pure functions

---

## 📝 Naming Conventions

### Files
- **Components:** `PascalCase.jsx` (e.g., `Button.jsx`)
- **Services:** `camelCase.service.js` (e.g., `auth.service.js`)
- **Hooks:** `camelCase.js` with `use` prefix (e.g., `useAuth.js`)
- **Utils:** `camelCase.utils.js` (e.g., `markdown.utils.js`)
- **Constants:** `camelCase.constants.js` (e.g., `app.constants.js`)

### Code
- **Components:** `PascalCase` (e.g., `MyComponent`)
- **Functions:** `camelCase` (e.g., `handleClick`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `APP_NAME`)
- **Hooks:** `camelCase` with `use` prefix (e.g., `useAuth`)

---

## 🚀 Adding New Features

### Example: Adding a "Favorite Tutorials" feature

1. **Service Layer** (`services/tutorial.service.js`)
```javascript
async toggleFavorite(id, isFavorite) {
  await this.updateTutorial(id, { favorite: isFavorite });
}
```

2. **Hook** (`hooks/useTutorials.js`)
```javascript
const toggleFavorite = async (id, isFavorite) => {
  await tutorialService.toggleFavorite(id, isFavorite);
  refreshTutorials();
};
```

3. **Component** (`components/features/TutorialCard.jsx`)
```javascript
import { Star } from 'lucide-react';
import { Button } from '../ui';

<Button 
  variant="ghost"
  icon={<Star fill={isFavorite ? 'gold' : 'none'} />}
  onClick={() => onToggleFavorite(tutorial.id, !isFavorite)}
/>
```

---

## 🔍 Import Patterns

### Absolute Imports (Recommended)
```javascript
// Use index.js barrel exports
import { Button, Input } from 'components/ui';
import { useAuth, useTutorials } from 'hooks';
import { authService } from 'services';
import { APP_NAME } from 'constants/app.constants';
```

### Relative Imports
```javascript
// For specific deep imports
import Header from '../layout/Header';
import { renderMarkdown } from '../../utils/markdown.utils';
```

---

## 📦 Future Enhancements

### Planned Structure Additions:
- `/src/contexts` - React Context providers
- `/src/routes` - Routing configuration
- `/src/types` - TypeScript types/interfaces
- `/src/tests` - Test files
- `/src/styles` - Global styles, themes

---

## 🎓 Best Practices

1. **Keep components small** - Max 200-300 lines
2. **Extract reusable logic** - Move to hooks or utils
3. **Use index.js files** - For cleaner imports
4. **Document complex functions** - Add JSDoc comments
5. **Follow the structure** - Don't mix concerns
6. **Test as you go** - Write tests for services and utils
7. **Keep dependencies minimal** - Import only what you need

---

## 📚 Resources

- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Folder Structure Best Practices](https://reactjs.org/docs/faq-structure.html)

---

**Remember:** A well-organized codebase is easier to:
- ✅ Understand
- ✅ Maintain
- ✅ Test
- ✅ Scale
- ✅ Collaborate on

Happy coding! 🚀
