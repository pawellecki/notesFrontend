import { Component, createSignal } from 'solid-js';
import { createForm } from '@felte/solid';
import toast from 'solid-toast';
import TextEditor from '../../components/TextEditor/TextEditor';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { loggedInUser } from '../../../globalStore';
import { TextEditorContentWithPreview } from '../../../globalTypes';
import { setNotesPreview } from '../../../globalStore';

type FormValues = {
  title: string;
};

const NewNote: Component = () => {
  const [isLoading, setIsLoading] = createSignal(false);
  const [editorContent, setEditorContent] =
    createSignal<TextEditorContentWithPreview>({
      content: {},
      contentPreview: '',
    });

  const { form } = createForm({
    onSubmit: async (values: FormValues) => {
      setIsLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + loggedInUser()?.token,
          },
          body: JSON.stringify({
            title: values.title,
            content: JSON.stringify(editorContent().content),
            contentPreview: editorContent().contentPreview,
            tags: [],
            creatorId: loggedInUser()?.userId,
          }),
        });
        const { message, newNote } = await response.json();
        const { content, ...newNoteWithoutContent } = newNote;

        if (!response.ok) {
          setIsLoading(false);
          return toast.error(message);
        }

        setNotesPreview((prev) => [newNoteWithoutContent, ...prev]);
        toast.success('Saved');
      } catch (err) {
        toast.error(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <p>new note</p>
      <form
        use:form
        style={{
          display: 'flex',
          'flex-direction': 'column',
          width: '300px',
        }}
      >
        <Input label="Title" name="title" />
        <TextEditor
          onChange={(content, contentPreview) =>
            setEditorContent({ content, contentPreview })
          }
        />
        <Button type="submit" isLoading={isLoading()}>
          sub new
        </Button>
      </form>
    </div>
  );
};

export default NewNote;
