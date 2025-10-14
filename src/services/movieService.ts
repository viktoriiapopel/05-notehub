import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Movie } from "../types/movie";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!TMDB_BEARER_TOKEN) {
  console.warn("TMDB Bearer token not found. Set VITE_TMDB_TOKEN in your .env");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
});


export interface TMDBSearchResponse<T = Movie> {
page: number;
results: T[];
total_pages: number;
total_results: number;
}



export interface FetchMoviesParams {
query: string;
page?: number;
includeAdult?: boolean;
year?: number;
language?: string;
signal?: AbortSignal;
}


export async function fetchMovies(query: string, page: number = 1): Promise<TMDBSearchResponse<Movie>> {
  try {
   const response = await axiosInstance.get<TMDBSearchResponse<Movie>>(
  "/search/movie",
  { params: { query,page } }
);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(error.response?.data?.status_message || "Failed to fetch movies");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
}




console.log("TOKEN in build:", TMDB_BEARER_TOKEN?.slice(0, 10));
