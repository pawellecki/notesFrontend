import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Routes, Route } from 'solid-app-router';
import styles from './App.module.css';
import Tinder from './pages/tinder';
import Notes from './pages/notes';
import NewNote from './pages/newNote';
import UpdateNote from './pages/updateNote';
import Auth from './pages/auth';

const App: Component = () => {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  const login = () => setIsLoggedIn(true);

  const logout = () => setIsLoggedIn(false);
  console.log('is in', isLoggedIn());
  return (
    <div class={styles.App}>
      <div>heeeeeeeeader</div>
      <div>sidebar</div>
      <Routes>
        {isLoggedIn() ? (
          <>
            {/* <Route path="/">
  <Users /> user/pages/users
</Route> */}
            {/* <Route path="/:userId/places">
  <UserPlaces />
</Route> */}
            {/* <Route path="/places/new">
  <NewPlace />
</Route> */}
            {/* <Route path="/places/:placeId">
  <UpdatePlace />
</Route> */}
            <Route path="/" element={<Notes />} />
            <Route path="/tinder" element={<Tinder />} />
            <Route path="/:userId/notes" element={<UpdateNote />} />
            <Route path="/notes/new" element={<NewNote />} />
            <Route path="/notes/:id" element={<UpdateNote />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
