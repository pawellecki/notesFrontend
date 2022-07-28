import { Component, mapArray } from 'solid-js';
import Link from '@suid/material/Link';
import TableCell from '@suid/material/TableCell';
import TableRow from '@suid/material/TableRow';
import Table from '../../components/Table/Table';
import { notesPreview } from '../../../globalStore';

const cols = ['title', 'tags'];

const TableExample: Component = () => (
  <div>
    {notesPreview().length && (
      <Table cols={cols}>
        {mapArray(
          () => notesPreview(),
          (row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/notes/${row._id}`}>{row.title}</Link>
              </TableCell>
              <TableCell align="right">
                <Link href={`/notes/${row._id}`}>
                  {row.tags.join(', ')}js, react
                </Link>
              </TableCell>
            </TableRow>
          )
        )}
      </Table>
    )}
  </div>
);

export default TableExample;
