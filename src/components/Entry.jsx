import styles from "../assets/css/Entry.module.css";
import { Star, SquarePen, CircleX } from "lucide-react";

function Entry({
  id,
  title,
  body,
  important,
  changeImportant,
  deleteEntry,
  edit,
}) {
  return (
    <div className={styles.entry}>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className={styles.controls}>
        <SquarePen
          onClick={() => edit(id)}
          size={24}
          color='rgb(11, 255, 255)'
        />
        <Star
          onClick={() => changeImportant(id)}
          size={24}
          fill={important ? "rgb(11, 255, 255)" : "none"}
          color='rgb(11, 255, 255)'
        />
        <CircleX onClick={() => deleteEntry(id)} color='red' size={24} />
      </div>
    </div>
  );
}

export default Entry;
