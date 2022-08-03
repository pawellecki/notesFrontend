import { createSignal } from 'solid-js';
import { NotePreview, LoggedInUser, User } from './globalTypes';

export const [isLoggedIn, setIsLoggedIn] = createSignal(false);

export const [notesPreview, setNotesPreview] = createSignal<NotePreview[]>([]);

export const [loggedInUser, setLoggedInUser] = createSignal<LoggedInUser>();

export const [users, setUsers] = createSignal<User[]>([]);
