
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery , keepPreviousData } from '@tanstack/react-query';
import css from "./App.module.css";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";


export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Відкладене значення (затримка 500 мс)
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.results ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* 🔍 Пошук */}
        <SearchBox value={search} onChange={setSearch} />

        {/* Пагінація (тільки якщо >1 сторінка) */}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        {/* Кнопка створення нотатки */}
        <button className={css.button}>Create note +</button>
      </header>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка при завантаженні 😢</p>}

      {/* Рендеримо список тільки якщо є нотатки */}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}







