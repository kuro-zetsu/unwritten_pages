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
  const [newEntry, setNewEntry] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (edit && editedEntry) {
      setNewEntry(editedEntry);
    }
  }, [edit, editedEntry]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEntry((prevNewEntry) => ({
      ...prevNewEntry,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    isLoading(true);

    try {
      const response = await fetch(edit ? `${url}/${editedEntry.id}` : url, {
        method: edit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok && !edit)
        throw new Error(`Failed to ${edit ? "edit" : "create"} entry`);

      if (!edit) {
      const updatedEntries = await response.json();
      if (edit) {
        updateEntry({ ...newEntry, id: editedEntry.id });
      } else {
        addEntry({ ...updatedEntries, important: false });
      }}
    } catch (error) {
      console.error(error);
    } finally {
      if (edit) {
        updateEntry({ ...newEntry, id: editedEntry.id });
      }
    }
    toggleShowCreate();
    notEditing();
    isLoading(false);
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
