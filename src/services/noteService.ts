// src/services/noteService.ts
import axios, { type AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token ?? ''}`,
    'Content-Type': 'application/json',
  },
});

// Тип відповіді від API для fetchNotes
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

// Тип відповіді від бекенду
interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

// Отримати список нотаток
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<FetchNotesResponse> => {
  const res: AxiosResponse<NotesApiResponse> = await api.get('/notes', {
    params: { page, perPage, search },
  });

  return {
    notes: res.data.notes ?? [],
    totalPages: res.data.totalPages ?? 1,
    page,
  };
};

// Створити нову нотатку
export const createNote = async (payload: {
  title: string;
  content?: string;
  tag: NoteTag;
}): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post('/notes', payload);
  return res.data;
};

// Видалити нотатку
export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const res: AxiosResponse<{ id: string }> = await api.delete(`/notes/${id}`);
  return res.data;
};
