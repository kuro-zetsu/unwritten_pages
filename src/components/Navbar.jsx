import styles from "../assets/css/Navbar.module.css";
import { Plus, ArrowLeft, Star, House } from "lucide-react";
import logo from '../assets/images/logo.png'

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
        <button className={styles.navigator} onClick={toggleShowImportant}>
          {/* Switch between showing all journal entries and showing just those marked as important */}
          {showImportant ? (
            <>
              <House size={18} />
              my journal
            </>
          ) : (
            <>
              <Star size={18} />
              pinned thoughts
            </>
          )}
        </button>
      )}
      <span className={styles.logo}>
        <img src={logo} />
        <h1>unwritten pages_</h1>
      </span>
      <button
        className={styles.navigator}
        onClick={() => {
          toggleShowCreate(); // Show/hide the entry creation form
          notEditing(); // The form is configured for creation, NOT editing
        }}
      >
        {showCreate ? (
          <>
            <ArrowLeft size={18} /> cancel
          </>
        ) : (
          <>
            <Plus size={18} /> create entry
          </>
        )}
      </button>
    </nav>
  );
}

export default Navbar;
