import { Component, mapArray } from 'solid-js';
import TableCell from '@suid/material/TableCell';
import TableRow from '@suid/material/TableRow';
import { Table, Button } from '../../components';

const rows = [
  { title: 'ehe', tags: ['js', 'frontend'] },
  { title: 'nope', tags: ['node', 'backend'] },
];

const Notes: Component = () => {
  return (
    <div>
      <Button>sd</Button>
      all notes
      <Table />
    </div>
  );
};

export default Notes;
