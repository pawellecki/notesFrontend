import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import toast from 'solid-toast';
import Modal from '@suid/material/Modal';
import Box from '@suid/material/Box';
import Switch from '@suid/material/Switch';
import Paper from '@suid/material/Paper';
import { loggedInUser } from '../../../globalStore';
import { users, notesPreview, setNotesPreview } from '../../../globalStore';
import Typography from '@suid/material/Typography';

type Props = {
  isOpen: boolean;
  noteId: string;
  sharedWith: string[];
  setSharedWith: (ids: string[]) => void;
  onClose: () => void;
};

const ModalShareNote: Component<Props> = (props) => {
  const [isLoading, setIsLoading] = createSignal();

  const { noteId, setSharedWith, onClose } = props;

  const updateGlobalNotesPreview = (sharedWith: string[]) => {
    const updatedNoteIndex = notesPreview().findIndex(
      (preview) => preview._id === noteId
    );
    const updatedNote = { ...notesPreview()[updatedNoteIndex], sharedWith };
    let updatedNotesPreview = [...notesPreview()];

    updatedNotesPreview[updatedNoteIndex] = updatedNote;
    setNotesPreview(updatedNotesPreview);
  };

  const toggleShareWithUser = async (targetUserId: string) => {
    setIsLoading('true');

    const body = {
      targetUserId,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${noteId}/share`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const { sharedWith } = await response.json(); //?

      setIsLoading();

      if (!response.ok) {
        return toast.error('Something went wrong');
      }

      updateGlobalNotesPreview(sharedWith);
      setSharedWith(sharedWith);
      toast.success('saved');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
      setIsLoading();
    }
  };
  // TODO zamrozic liste users kiedy sherujemy
  return (
    <Modal
      open={props.isOpen}
      onClose={onClose}
      style={{
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      }}
    >
      <Paper style={{ width: '400px', height: '400px' }}>
        <Typography>Share with users</Typography>
        <For each={users()}>
          {(user) => (
            <>
              {loggedInUser()?.userId !== user.id && (
                <Box>
                  {user.name} {user.email}
                  <Switch
                    checked={props.sharedWith.includes(user.id)}
                    onChange={() => toggleShareWithUser(user.id)}
                    disabled={!!isLoading()}
                  />
                </Box>
              )}
            </>
          )}
        </For>
      </Paper>
    </Modal>
  );
};

export default ModalShareNote;
