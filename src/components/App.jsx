import { useEffect, useState } from "react";
import DisplayEntries from "./DisplayEntries";
import Navbar from "./Navbar";
import Create from "./Create";
import Loading from "./Loading";

function App() {
  const [posts, setPosts] = useState([]);

  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  const limitedURL = "https://jsonplaceholder.typicode.com/posts?_limit=9";

  const [loading, setLoading] = useState(true);

  const isLoading = (loadState) => setLoading(loadState);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(limitedURL);
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        await new Promise((res) => setTimeout(res, 1500));

        const importanceAdded = data.map((entry) => ({
          ...entry,
          important: false,
        }));
        setPosts(importanceAdded);
      } catch (error) {
        console.error(`Fetch error: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, []);

  const addEntry = (entry) => {
    setPosts((prevPosts) => [...prevPosts, entry]);
  };

  const deleteEntry = async (id) => {
    isLoading(true);
    try {
      await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(`Delete failed: ${error}`);
    } finally {
      isLoading(false);
    }
  };

  const [showCreate, setShowCreate] = useState(false);

  const toggleShowCreate = () => {
    setShowCreate((prevShowCreate) => !prevShowCreate);
  };

  const toggleImportant = (id) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) =>
        post.id === id ? { ...post, important: !post.important } : post
      );
    });
  };

  const [showImportant, setShowImportant] = useState(false);

  const toggleShowImportant = () => {
    setShowImportant((prevShowImportant) => !prevShowImportant);
  };

  const importantEntries = posts.filter((post) => post.important);

  const [edit, setEdit] = useState(false);
  const [editedEntry, setEditedEntry] = useState(null);
  const editing = (id) => {
    const entry = posts.find((post) => post.id === id);
    setEditedEntry(entry);
    setEdit(true);
    setShowCreate(true);
  };

  const notEditing = () => {
    setEdit(false);
  };

  const updateEntry = (editedEntry) => {
    setPosts((prevPosts) => {
      const updated = prevPosts.map((post) =>
        post.id === editedEntry.id ? editedEntry : post
      );
      console.log(`Updated entries: ${updated}`);
      return updated;
    });
  };

  return (
    <>
      <Navbar
        showImportant={showImportant}
        toggleShowImportant={toggleShowImportant}
        showCreate={showCreate}
        toggleShowCreate={toggleShowCreate}
        notEditing={notEditing}
      />
      {console.log(`loading state is ${loading}`)}
      {loading ? (
        <Loading />
      ) : showCreate ? (
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
    </>
  );
}

export default App;
