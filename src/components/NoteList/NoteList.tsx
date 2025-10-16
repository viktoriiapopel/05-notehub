import css from "./NoteList.module.css";
import { useEffect, useState } from "react";
import { fetchNotes, deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";

interface NoteListProps {
  onDelete?: (id: string) => void;
}

export default function NoteList({ onDelete }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const { notes } = await fetchNotes({ page, query });
        setNotes(notes);
      } catch {
        setError("Не вдалося завантажити нотатки 😢");
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [page, query]);

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes(prev => prev.filter(note => note.id !== id));
    onDelete?.(id);
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p className={css.error}>{error}</p>;

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {note.tags?.length ? (
              <span className={css.tag}>{note.tags.join(", ")}</span>
            ) : null}
            <button
              onClick={() => handleDelete(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}




