import { useEffect, useState, useRef } from "react";
import DisplayEntries from "./DisplayEntries";
import Navbar from "./Navbar";
import Create from "./Create";
import Loading from "./Loading";

function App() {
  const [posts, setPosts] = useState([]);

  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  const limitedURL = "https://jsonplaceholder.typicode.com/posts?_limit=9";

  // Loading state allows the app to display a loading screen when fetching
  const [loading, setLoading] = useState(true);

  // Modify the loading state depending on whether we're starting a fetch or are done fetching
  const isLoading = (loadState) => setLoading(loadState);

  // Fetch journal entries from the API when App.jsx mounts
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(limitedURL);
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const journalEntries = await response.json();

        // Add the important attribute for filtering
        const importanceAdded = journalEntries.map((entry) => ({
          ...entry,
          important: false,
        }));
        setPosts(importanceAdded);
      } catch (error) {
        console.error(`Fetch error: ${error}`);
      } finally {
        // Turn off isLoading
        isLoading(false);
      }
    };

    fetcher();
  }, []);

  // nextId starts at 10 because the API returns entries with IDs 1–9 when using "?_limit=9"
  const nextId = useRef(10);

  const addEntry = (entry) => {
    // Assign a valid ID to each new entry (whole numbers between 1-100) and an important attribute for filtering
    const newEntry = { ...entry, id: nextId.current, important: false };
    // Increment nextId so that the next entry gets an ID of 11, then 12, 13, etc.
    nextId.current += 1;
    // Add the new entry to the journal
    setPosts((prevPosts) => [...prevPosts, newEntry]);
  };

  const deleteEntry = async (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Unable to delete: ${response.status}`);
      }


    } catch (error) {
      console.error(`Delete failed: ${error}`);
    }
  };

  // State for determining whether the entry creation component should be rendered
  const [showCreate, setShowCreate] = useState(false);

  const toggleShowCreate = () => {
    setShowCreate((prevShowCreate) => !prevShowCreate);
  };

  // Toggle an entry's important status
  const toggleImportant = (id) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) =>
        // Once the entry is identified using the ID, flip its important value. Leave other entries as they are
        post.id === id ? { ...post, important: !post.important } : post
      );
    });
  };

  // State for determining whether all entries should be rendered or just the ones marked as important
  const [showImportant, setShowImportant] = useState(false);

  const toggleShowImportant = () => {
    setShowImportant((prevShowImportant) => !prevShowImportant);
  };

  // List of entries that have been marked as important
  const importantEntries = posts.filter((post) => post.important);

  // State for determining whether the entry creation form should be configured for editing or creating
  const [edit, setEdit] = useState(false);

  // State for holding an entry during editing
  const [editedEntry, setEditedEntry] = useState(null);

  const editing = (id) => {
    // Find the entry to be edited based on its ID
    const entry = posts.find((post) => post.id === id);
    // Once the entry has been found, we update editedEntry to that entry
    setEditedEntry(entry);
    // Set edit to true so that the Create component knows that it should edit, not create
    setEdit(true);
    // Signal that the Create component should be rendered
    setShowCreate(true);
  };

  // Sets edit back to false so that the entry creation form is ready to create a new entry
  const notEditing = () => {
    setEdit(false);
  };

  const updateEntry = (editedEntry) => {
    setPosts((prevPosts) =>
      // Once we find the entry we're trying to update, we replace the old version with the updated one
      prevPosts.map((post) => (post.id === editedEntry.id ? editedEntry : post))
    );
  };

  return (
    <div className="main-container">
      <Navbar
        showImportant={showImportant}
        toggleShowImportant={toggleShowImportant}
        showCreate={showCreate}
        toggleShowCreate={toggleShowCreate}
        notEditing={notEditing}
      />
      {loading ? (
        <Loading /> // If loading is true, show the loading screen
      ) : showCreate ? ( // If loading is NOT true, check if we should show the entry creation form
        <Create
          url={baseURL}
          addEntry={addEntry}
          toggleShowCreate={toggleShowCreate}
          edit={edit}
          editedEntry={editedEntry}
          notEditing={notEditing}
          updateEntry={updateEntry}
          isLoading={isLoading}
        />
      ) : (
        // If we should NOT show the entry creation screen, show the list of entries
        <DisplayEntries
          importantEntries={importantEntries}
          posts={posts}
          changeImportant={toggleImportant}
          deleteEntry={deleteEntry}
          showImportant={showImportant}
          editing={editing}
          notEditing={notEditing}
        />
      )}
    </div>
  );
}

export default App;
