
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery , keepPreviousData } from '@tanstack/react-query';
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
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
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" />
      {isSuccess && totalPages > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="→"
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="←"
          containerClassName={css.pagination}
          activeClassName={css.active}
          marginPagesDisplayed={1}
          renderOnZeroPageCount={null}
          forcePage={Math.min(currentPage - 1, totalPages - 1)}

        />)}
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="There was an error, please try again..." />}
      {isSuccess && data.results.length === 0 && toast.error("No movies found for your request.")}

      {isSuccess && data.results.length > 0 && (
      
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}
        {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}







