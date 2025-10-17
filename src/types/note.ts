


export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string;
}

export interface NewNoteData {
  text: string;
  title: string;
  content: string;
  tags: string[];
}

export interface NoteUpdateData {
   id: string;
  title?: string;
  content?: string;
  tags?: string;
}

export interface NoteTag {
  id: string;
  name: string;
}