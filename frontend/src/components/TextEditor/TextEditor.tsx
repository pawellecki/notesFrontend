import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
import Quill from 'quill';
import Box from '@suid/material/Box';
import '../../../node_modules/quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import { options, testContent } from './const';

// hljs.configure({d
//   // optionally configure hljs
//   languages: ['javascript', 'ruby', 'python'],
// });

type Props = {
  onChange?: (content: object, contentPreview: string) => void;
  hasTestContent?: boolean;
};

const TextEditor: Component<Props> = ({ onChange, hasTestContent }) => {
  let newQuill;
  onMount(() => {
    newQuill = new Quill('#quill', options);

    if (hasTestContent) {
      newQuill.setContents(testContent);
    }
    // setTimeout(() => {
    //  quill = new Quill('#quill', options);
    // return setQuill(newQuill);
    // setQuill(newQuill);

    newQuill.on('text-change', function (delta, oldDelta, source) {
      onChange(newQuill.getContents(), newQuill.getText(0, 100));
      // if (source == 'api') {
      // } else if (source == 'user') {
      //   console.log('A user action triggered this change.');
      // }
    });
  });

  // setTimeout(() => {
  //   const options = {
  //   const editor = new Quill('#quill', options);
  // }, 0);

  return (
    <Box sx={{ border: '2px solid blue' }}>
      <div id="toolbar"></div>
      <div id="quill"></div>
    </Box>
  );
};

export default TextEditor;
