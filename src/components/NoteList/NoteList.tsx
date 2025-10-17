import css from "./NoteList.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
 const queryClient = useQueryClient();
const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes.length) {
    return <p className={css.empty}>Нотаток поки немає 📭</p>;
  }


  return (
    <ul className={css.list}>
      {notes.map((note) => (
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
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}



