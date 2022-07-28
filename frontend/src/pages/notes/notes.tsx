import { Component, createSignal, mapArray } from 'solid-js';
import toast from 'solid-toast';
import Link from '@suid/material/Link';
import Grid from '@suid/material/Grid';
import Button from '@suid/material/Button';
import { notesPreview, setNotesPreview } from '../../../globalStore';
import TextEditor from '../../components/TextEditor/TextEditor';
import Typography from '@suid/material/Typography';

const Notes: Component = () => {
  const [isLoading, setIsLoading] = createSignal(false);

  const deleteNote = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { id: deletedNoteId } = await response.json();

      setIsLoading(false);

      if (!response.ok) {
        return toast.error('delete error');
      }

      toast.success('note deleted');

      setNotesPreview((prev) =>
        prev.filter((note) => note._id !== deletedNoteId)
      );
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div>
      all notes
      <Link href="/notes/new">Create note</Link>
      <br />
      <br />
      <br />
      {!notesPreview().length && (
        <div>
          This is an example note
          <TextEditor hasTestContent />
        </div>
      )}
      {notesPreview().length && (
        <Grid container spacing={4}>
          {mapArray(
            () => notesPreview(),
            (row) => (
              <Grid item xs={4}>
                <div style={{ position: 'relative', height: '400px' }}>
                  <Link
                    href={`/notes/${row._id}`}
                    style={{
                      display: 'block',
                      // width: 200,
                      height: '400px',
                      border: '2px solid grey',
                    }}
                  >
                    <Typography variant="h6">{row.title}</Typography>
                    <Typography>{row.contentPreview}</Typography>
                  </Link>
                  <Button
                    onClick={() => deleteNote(row._id)}
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                    }}
                    disabled={isLoading()}
                  >
                    X
                  </Button>
                </div>
              </Grid>
            )
          )}
        </Grid>
      )}
    </div>
  );
};

export default Notes;
