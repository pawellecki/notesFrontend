import { Component, mapArray } from 'solid-js';
import TableCell from '@suid/material/TableCell';
import TableRow from '@suid/material/TableRow';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { allNotes } from '../../../globalStore';

const cols = ['title', 'tags'];

const Notes: Component = () => {
  return (
    <div>
      <Button>sd</Button>
      all notes
      <Table cols={cols}>
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
      </Table>
    </div>
  );
};

export default Notes;
