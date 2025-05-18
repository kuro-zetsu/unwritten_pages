import Entry from "./Entry";
import styles from "../assets/css/DisplayEntries.module.css";

function DisplayEntries({
  posts,
  changeImportant,
  deleteEntry,
  showImportant,
  importantEntries,
  editing,
}) {
  return (
    <div className={styles["entries-page"]}>
      <h1>{showImportant ? "pinned thoughts" : "my journal"}</h1>
      <hr />
      <div className={styles.entries}>
        {showImportant
          ? // If important is true, display only important entries
            importantEntries
              .slice()
              .reverse()
              .map((post) => (
                <div key={post.id} className={styles.entry}>
                  <Entry
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    important={post.important}
                    changeImportant={changeImportant}
                    deleteEntry={deleteEntry}
                    edit={editing}
                  />
                </div>
              ))
          : // Otherwise, display all journal entries
            posts
              .slice()
              .reverse()
              .map((post) => (
                <div key={post.id} className={styles.entry}>
                  <Entry
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    important={post.important}
                    changeImportant={changeImportant}
                    deleteEntry={deleteEntry}
                    edit={editing}
                  />
                </div>
              ))}
      </div>
    </div>
  );
}

export default DisplayEntries;
