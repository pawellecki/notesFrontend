import { Component } from 'solid-js';
import { Routes, Route } from 'solid-app-router';
import { Toaster } from 'solid-toast';
import styles from './App.module.css';
import Tinder from './pages/tinder';
import Notes from './pages/notes/Notes';
import NewNote from './pages/newNote/NewNote';
import EditNote from './pages/editNote/EditNote';
import Auth from './pages/auth/Auth';
import { isLoggedIn } from '../globalStore';

const App: Component = () => (
  <div class={styles.App}>
    <div>heeeeeeeeader</div>
    <div>sidebar</div>
    <Toaster />

    {isLoggedIn() && (
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/tinder" element={<Tinder />} />
        {/* <Route path="/:userId/notes" element={<UpdateNote />} /> */}
        <Route path="/notes/new" element={<NewNote />} />
        <Route path="/notes/:id" element={<EditNote />} />
      </Routes>
    )}

    {!isLoggedIn() && (
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    )}

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
  </div>
);

export default App;
