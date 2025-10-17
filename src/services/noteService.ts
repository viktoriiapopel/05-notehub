
import type { Note, NoteUpdateData } from "../types/note";
import axios from "axios";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});


export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  query?: string;
}

export interface FetchNotesResponse {
   notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalNotes: number;
}



export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<FetchNotesResponse> => {
  const res = await api.get("/notes", { params: { page, perPage, search } });
  return res.data;
};

export const updateNote = async (
  id: string,
  updateData: NoteUpdateData
): Promise<Note> => {
  const res = await api.patch(`/notes/${id}`, updateData);
  return res.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

export async function createNote(noteData: {
  title: string;
  content: string;
  tag: string;
}) {
  const response = await api.post("/notes", noteData); {
   
    return response.data;
  }
}









