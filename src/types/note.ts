export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export interface NoteUpdateData {
  id: string;
  title?: string;
  content?: string;
  tag?: string;
}

export interface NoteTag {
  id: string;
  name: string;
}
