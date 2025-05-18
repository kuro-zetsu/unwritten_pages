# **unwritten pages_**

unwritten pages_ is a minimalist journaling app built with React — a quiet space for your thoughts, ideas, and little sparks of inspiration. Create entries, edit or delete what you’ve outgrown, and pin the ones that stick with you.

![demo](src/assets/images/demo.gif)

## **Features**

- `New Entries` – Write whatever’s on your mind.

- `Edit Mode` – Change your mind? You can update any entry.

- `Delete` – Let go of what you don’t need.

- `Mark as Important` – Star your favourite thoughts.

- `Filter View` – See everything or just the important stuff.

- `Mock API` – Powered by JSONPlaceholder for safe, demo-friendly functionality.

## **Tech Stack**

- React
- Vite
- CSS Modules
- JSONPlaceholder (for mock API)

## **Getting Started**

### What you'll need

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

Then open http://localhost:5173 in your browser and start writing!

---

## **Notes**

- This app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock API. Because it’s a demo service:
  - Changes like edits and deletions won’t persist after a page refresh
  - Some actions (like PUT or DELETE) might respond as if they worked — but they don’t really save

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
