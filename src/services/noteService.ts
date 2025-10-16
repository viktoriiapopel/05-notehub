import axiosInstance from "../api/axiosInstance";
import type { Note, NewNoteData, NoteUpdateData } from "../types/note";

//
// Інтерфейси для HTTP-рівня
//
export interface FetchNotesParams {
  page?: number;
  query?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  totalPages: number;
}

//
// API функції
//

// Отримати нотатки (із пагінацією + пошуком)
export const fetchNotes = async (
  { page = 1, query = "" }: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const res = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: { page, query },
  });
  return res.data;
};

// Створити нову нотатку
export const createNote = async (
  newNoteData: NewNoteData
): Promise<Note> => {
  const res = await axiosInstance.post<Note>("/notes", newNoteData);
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

// Видалити нотатку
export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axiosInstance.delete<Note>(`/notes/${noteId}`);
  return res.data;
};












