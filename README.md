# **unwritten pages_**

unwritten pages_ is a minimalist journaling web app built with React, focused on clarity, simplicity, and deliberate UI/UX decisions. The project emphasizes clean component architecture, predictable state management, and thoughtful user experience design.

> This project was built as a solo full-stack frontend exercise to strengthen my skills in modern React development, UI state handling, and clean code structure.

![demo](src/assets/images/demo.gif)

## **Features**

- `Create Journal Entries` – Write and save personal notes and reflections.

- `Edit & Delete Entries` – Full CRUD functionality.

- `Mark as Important` – Star meaningful entries for quick access.

- `Filtered Views` – Toggle between all entries and important ones.

- `Optimistic UI Updates` – Immediate UI feedback while syncing data.

- `Mock API Integration` – JSONPlaceholder used to simulate real backend workflows.

## **Technical Highlights**

- Modular component architecture for clarity and maintainability

- Centralized state handling for predictable UI updates

- Clean separation of UI, logic, and API layers

- Responsive layout using CSS Modules

- Emphasis on readability, accessibility, and minimal visual noise

## **Tech Stack**

- `Frontend:` React, Vite
- `Styling:` CSS Modules
- `API:` JSONPlaceholder (mock REST API)

## **Project Goals**

- Build a production-style React application from scratch

- Practice real-world CRUD patterns

- Improve UI clarity and design restraint

- Implement predictable state and UI synchronization-

## **Setup & Installation**

### Prerequisites

- [Node.js](https://nodejs.org) (v14+)

- [npm](https://www.npmjs.com)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Moringa-SDF-PT10/journal-reagan-nyauma.git
   ```

2. Navigate to the project folder:

   ```bash
   cd journal-reagan-nyauma
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the app

Start the development server:

```bash
npm run dev
```

Then open http://localhost:5173

## **Screenshots**

- Default state of the app, with placeholder entries fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts?_limit=9):

  ![Default state](src/assets/images/default.png)

- Form for creating journal entries:

  ![Entry creation form](src/assets/images/create.png)

- Loading the list of journal entries after creating/editing an entry:

  ![Create/Edit loading screen](src/assets/images/createloading.png)

- Updated journal after creating a new entry:

  ![Updated list](src/assets/images/added.png)

- Form for editing an existing journal entry:

  ![Entry editing form](src/assets/images/edit.png)

- UI change after some entries are marked as important:

  ![Marked as important](src/assets/images/marked.png)

- Filtered journal showing just the important entries:

  ![Important entries](src/assets/images/important.png)

- Loading screen for when app loads, page is refreshed, or an entry is deleted:

  ![Home loading screen](src/assets/images/initial-and-on-delete.png)


## **Possible Future Improvements**

- Real backend integration (Flask)

- Authentication and user accounts

- Markdown editor support

- Cloud-based persistent storage

- Mobile-first layout improvements