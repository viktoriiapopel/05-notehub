import axiosInstance from "../api/axiosInstance";
import type { Note, NewNoteData, NoteUpdateData } from "../types/note";
import axios from "axios";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});
//
// Інтерфейси для HTTP-рівня
//
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  query?: string;
}

export interface FetchNotesResponse {
   notes: Note[];
  page: number;
  perPage: number;
  total_pages: number;
  total_notes: number;
}

//
// API функції
//

// Отримати нотатки (із пагінацією + пошуком)
// export const fetchNotes = async (
//   { page = 1, perPage = 12, query = "" }: FetchNotesParams
// ): Promise<FetchNotesResponse> => {
//   const res = await axiosInstance.get<FetchNotesResponse>("/notes", {
//     params: { page, query, perPage },
//   });
//   return res.data;
// };
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
}) => {
  const res = await api.get(`/notes`, { params: { page, perPage, search } });
  return res.data;
};

// Створити нову нотатку
// export const createNote = async (
//   newNoteData: NewNoteData
// ): Promise<Note> => {
//   const res = await axiosInstance.post<Note>("/notes", newNoteData);
//   return res.data;
// };

export const createNote = async (data: NewNoteData) => {
  const res = await api.post(`/notes`, data);
  return res.data;
}; 
// Оновити нотатку
export const updateNote = async (
  noteId: string,
  updateData: NoteUpdateData
): Promise<Note> => {
  const res = await axiosInstance.patch<Note>(`/notes/${noteId}`, updateData);
  return res.data;
};

// // Видалити нотатку
// export const deleteNote = async (noteId: string): Promise<Note> => {
//   const res = await axiosInstance.delete<Note>(`/notes/${noteId}`);
//   return res.data;
// };

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};










