import { createSignal } from 'solid-js';
import { Note } from './globalTypes';

export const [isLoggedIn, setIsLoggedIn] = createSignal(false);

export const [loggedInUser, setLoggedInUser] = createSignal();

export const [allNotes, setAllNotes] = createSignal<Note[]>([]);
