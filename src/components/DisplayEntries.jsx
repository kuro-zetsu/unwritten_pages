import Entry from "./Entry";
import styles from "../assets/css/DisplayEntries.module.css";
import { Star } from "lucide-react";

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
        {showImportant ? (
          // If important is true, display only important entries
          importantEntries.length ? ( // If there are important entries to display, display them
            importantEntries
              .slice()
              .reverse()
              .map((post) => (
                <Entry
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  important={post.important}
                  changeImportant={changeImportant}
                  deleteEntry={deleteEntry}
                  edit={editing}
                />
              ))
          ) : (
            // If there are no important entries to display, let the user know how to mark an entry as important
            <>
              <div></div>
              <div className={styles["no-entries"]}>
                <p>
                  Not a single thought has been pinned to the wall. Click the{" "}
                  <Star size={15} color='rgb(11, 255, 255)' /> on any entry to
                  spotlight your favourites.
                </p>
              </div>
            </>
          )
        ) : (
          // Otherwise, display all journal entries
          posts
            .slice()
            .reverse()
            .map((post) => (
              <Entry
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                important={post.important}
                changeImportant={changeImportant}
                deleteEntry={deleteEntry}
                edit={editing}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default DisplayEntries;
