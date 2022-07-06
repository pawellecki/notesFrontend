import { Component, mapArray } from 'solid-js';
import Link from '@suid/material/Link';
import Button from '@suid/material/Button';
import TableCell from '@suid/material/TableCell';
import TableRow from '@suid/material/TableRow';
import Table from '../../components/Table/Table';
import { allNotes } from '../../../globalStore';
import TextEditor from '../../components/TextEditor/TextEditor';

const cols = ['title', 'tags'];

const Notes: Component = () => {
  return (
    <div>
      all notes
      <Link class="nav" href="/notes/new">
        Create note
      </Link>
      {!allNotes().length && (
        <div>
          This is an example note
          <TextEditor hasTestContents />
        </div>
      )}
      {/* <Table cols={cols}>
        {mapArray(
          () => allNotes(),
          (row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.tags.join(', ')}</TableCell>
            </TableRow>
          )
        )}
      </Table> */}
    </div>
  );
};

export default Notes;
