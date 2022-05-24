import type { Component } from 'solid-js';
import { Routes, Route } from 'solid-app-router';
import logo from './logo.svg';
import styles from './App.module.css';
import Tinder from './pages/tinder';
import Notes from './pages/notes';
import Note from './pages/note';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div>heeeeeeeeader</div>
      <div>sidebar</div>
      <Routes>
        <Route path="/tinder" element={<Tinder />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<Note />} />
      </Routes>
    </div>
  );
};

export default App;
