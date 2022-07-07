import { createSignal } from 'solid-js';
import { NotePreview, User } from './globalTypes';

export const [isLoggedIn, setIsLoggedIn] = createSignal(false);

export const [loggedInUser, setLoggedInUser] = createSignal<User>();

export const [notesPreview, setNotesPreview] = createSignal<NotePreview[]>([]);
