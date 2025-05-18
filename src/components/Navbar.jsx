import styles from "../assets/css/Navbar.module.css";
import { Plus, ArrowLeft, Star, House } from "lucide-react";

function Navbar({
  showImportant,
  toggleShowImportant,
  showCreate,
  toggleShowCreate,
  notEditing,
}) {
  return (
    <nav>
      {showCreate ? (
        <div></div>
      ) : (
        <button onClick={toggleShowImportant}>
          {showImportant ? (
            <>
              <House size={18} />
              all entries
            </>
          ) : (
            <>
              <Star size={18} /> important entries
            </>
          )}
        </button>
      )}
      <span className={styles.logo}>
        <img src='src/assets/images/logo.png' />
        <h1>unwritten pages_</h1>
      </span>
      <button
        onClick={() => {
          toggleShowCreate();
          notEditing();
        }}
      >
        {showCreate ? (
          <>
            <ArrowLeft size={18} /> Cancel
          </>
        ) : (
          <>
            <Plus size={18} /> Create Entry
          </>
        )}
      </button>
    </nav>
  );
}

export default Navbar;
