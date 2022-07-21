import { Component, mapArray } from 'solid-js';
import Link from '@suid/material/Link';
import Grid from '@suid/material/Grid';
import Button from '@suid/material/Button';
import TableCell from '@suid/material/TableCell';
import TableRow from '@suid/material/TableRow';
import Table from '../../components/Table/Table';
import { notesPreview } from '../../../globalStore';
import TextEditor from '../../components/TextEditor/TextEditor';
import Typography from '@suid/material/Typography';

const cols = ['title', 'tags'];

const deleteNote = (id: string) => {
  console.log('iddd', id);
};

const Notes: Component = () => {
  return (
    <div>
      all notes
      <Link href="/notes/new">Create note</Link>
      {!notesPreview().length && (
        <div>
          This is an example note
          <TextEditor hasTestContent />
        </div>
      )}
      {notesPreview().length && (
        <Grid container spacing={4}>
          {/* <Table cols={cols}> */}
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
                  >
                    X
                  </Button>
                </div>
              </Grid>
              // <TableRow
              //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              // >
              //   <TableCell component="th" scope="row">
              //     <Link href={`/notes/${row._id}`}>{row.title}</Link>
              //   </TableCell>
              //   <TableCell align="right">
              //     <Link href={`/notes/${row._id}`}>
              //       {row.tags.join(', ')}js, react
              //     </Link>
              //   </TableCell>
              // </TableRow>
            )
          )}
          {/* </Table> */}
        </Grid>
      )}
    </div>
  );
};

export default Notes;
