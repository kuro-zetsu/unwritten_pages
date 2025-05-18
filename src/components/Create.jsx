import { useEffect, useState } from "react";
import styles from "../assets/css/Create.module.css";

function Create({
  url,
  addEntry,
  toggleShowCreate,
  edit,
  editedEntry,
  notEditing,
  updateEntry,
  isLoading,
}) {
  // Initialize newEntry with a template that has user-editable attributes of an entry
  const [newEntry, setNewEntry] = useState({
    title: "",
    body: "",
  });

  // If we're editing, and there's actually something to edit, indirectly populate the title and body fields of the form
  useEffect(() => {
    if (edit && editedEntry) {
      setNewEntry({
        title: editedEntry.title,
        body: editedEntry.body,
      });
    } else {
      setNewEntry({
        title: "",
        body: "",
      });
    }
  }, [edit, editedEntry]); // Listen for changes in both for consistent, predictable behaviour

  // Update newEntry as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEntry((prevNewEntry) => ({
      ...prevNewEntry,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    isLoading(true); // Show loading screen

    try {
      const entryToSend = edit
        ? // If we're editing, merge changes into the existing entry (preserves id and important)
          { ...editedEntry, ...newEntry }
        : // If we're creating a new entry, use what's in newEntry
          { ...newEntry };

      const response = await fetch(edit ? `${url}/${editedEntry.id}` : url, {
        method: edit ? "PUT" : "POST", // Change method based on whether we're editing or creating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryToSend),
      });

      if (!response.ok)
        throw new Error(`Failed to ${edit ? "edit" : "create"} entry`);

      if (edit) {
        // JSONPlaceholder doesn't behave well with PUT/PATCH, so update state to simulate successful PUT
        updateEntry(entryToSend);
      } else {
        // POST seems to work, so we receive the entry and add it to our list of journal entries
        const createdEntry = await response.json();
        addEntry(createdEntry);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toggleShowCreate(); // Once we've edited/created our entry, stop showing the form
      notEditing(); // Reset edit state so Create form switches back to 'create' mode
      isLoading(false); // Once we're done with fetching, we exit the loading screen
    }
  };

  return (
    <div className={styles.create}>
      <h1>Your Thoughts, Your Words</h1>
      <form className={styles["creation-form"]} onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          value={newEntry.title}
          placeholder='Title'
          onChange={handleChange}
          required
        />
        <textarea
          name='body'
          value={newEntry.body}
          placeholder='This space is yours — begin wherever you like...'
          onChange={handleChange}
          required
        />
        <button type='submit'>{edit ? "Update" : "Add Entry"}</button>
      </form>
    </div>
  );
}

export default Create;
