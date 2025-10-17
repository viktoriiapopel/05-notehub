
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery , keepPreviousData, useQueryClient } from '@tanstack/react-query';
import css from "./App.module.css";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";


export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  console.log(" data from query:", data);

  const notes: Note[] = data?.notes ?? [];
const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        
        <SearchBox value={search} onChange={setSearch} />

        
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        
        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Не вдалося завантажити нотатки 😢" />}


     
      {notes.length > 0 && <NoteList notes={notes} />}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["notes"] });
            }}
          />
        </Modal>
      )}
    </div>
  );
}








