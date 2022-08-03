import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import toast from 'solid-toast';
import Modal from '@suid/material/Modal';
import Box from '@suid/material/Box';
import Switch from '@suid/material/Switch';
import Paper from '@suid/material/Paper';
import { loggedInUser } from '../../../globalStore';
import { users, setUsers } from '../../../globalStore';
import Typography from '@suid/material/Typography';

type Props = {
  isOpen: boolean;
  noteId: string;
  onClose: () => void;
};

const ModalShareNote: Component<Props> = (props) => {
  const [isLoading, setIsLoading] = createSignal(false);

  const { noteId, onClose } = props;

  const toggleShareWithUser = (targetuserId: string) => {
    console.log('targetuserId', targetuserId);
    console.log('noteId', noteId);
  };

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
        <Typography>Chosen users will edit this note with you</Typography>
        <For each={users()}>
          {(user) => (
            <>
              {loggedInUser()?.userId !== user.id && (
                <Box>
                  {user.name} {user.email}
                  <Switch onChange={() => toggleShareWithUser(user.id)} />
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
