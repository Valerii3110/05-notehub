// types/note.ts

export type NoteTag = 'work' | 'personal' | 'study';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

// Дані для створення нотатки (бекенд сам додасть id, createdAt, updatedAt)
export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

// Дані для оновлення нотатки (id беремо з URL/params)
export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: NoteTag;
}
