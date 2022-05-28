import { Component, JSX, mapArray } from 'solid-js';
import TableContainer from '@suid/material/TableContainer';
import Paper from '@suid/material/Paper';
import MuiTable from '@suid/material/Table';
import TableHead from '@suid/material/TableHead';
import TableBody from '@suid/material/TableBody';
import TableRow from '@suid/material/TableRow';
import TableCell from '@suid/material/TableCell';

type Props = {
  cols: string[];
  children: JSX.Element;
};

const Table: Component<Props> = ({ cols, children }) => (
  <TableContainer component={Paper}>
    <MuiTable>
      <TableHead>
        <TableRow>
          {mapArray(
            () => cols,
            (col) => (
              <TableCell>{col}</TableCell>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </MuiTable>
  </TableContainer>
);

export default Table;
