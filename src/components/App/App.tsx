
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery , keepPreviousData } from '@tanstack/react-query';
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";
import ReactPaginate from "react-paginate";

export default function App() {
 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData
    });
  
  const handleSubmit = (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }
    setQuery(query);
    setCurrentPage(1)
  };

  const totalPages = data?.total_pages ?? 0;


  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{<button className={css.button}>Create note +</button>
}
      </header>
      <NoteList />
</div>

  );
}







