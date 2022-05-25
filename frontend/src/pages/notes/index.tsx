import type { Component } from 'solid-js';
import Table from '@suid/material/Table';
import TableBody from '@suid/material/TableBody';
import TableCell from '@suid/material/TableCell';
import TableContainer from '@suid/material/TableContainer';
import TableHead from '@suid/material/TableHead';
import TableRow from '@suid/material/TableRow';

const rows = [
  { title: 'ehe', tags: ['js', 'frontend'] },
  { title: 'nope', tags: ['node', 'backend'] },
];

const Notes: Component = () => {
  return (
    <div>
      all notes
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};

export default Notes;
