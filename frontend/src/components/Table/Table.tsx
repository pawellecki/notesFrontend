import { Component, JSX, mapArray } from 'solid-js';
import MuiTable from '@suid/material/Table';
import TableBody from '@suid/material/TableBody';
import TableCell from '@suid/material/TableCell';
import TableContainer from '@suid/material/TableContainer';
import TableHead from '@suid/material/TableHead';
import TableRow from '@suid/material/TableRow';

type Props = {};

const rows = [
  { title: 'ehe', tags: ['js', 'frontend'] },
  { title: 'nope', tags: ['node', 'backend'] },
];

const Table: Component = () => {
  return (
    <div>
      all notes
      <MuiTable>
        <TableHead>
          <TableRow>
            {/* {mapArray(
              () => cols,
              (col) => col
            )} */}
            {/* <TableCell>Dessert (100g serving)</TableCell> */}
            {/* <TableCell align="right">Calories</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {mapArray(
            () => rows,
            (row) => (
              <TableRow
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.tags.join(', ')}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </MuiTable>
    </div>
  );
};

export default Table;
