import type { Component } from 'solid-js';
import TextEditor from '../../components/TextEditor/TextEditor';

const NewNote: Component = () => {
  const submit = (contents: string) => {
    console.log('con', contents);
  };

  return (
    <div>
      <p>new note</p>
      <TextEditor submit={submit} />
    </div>
  );
};

export default NewNote;
