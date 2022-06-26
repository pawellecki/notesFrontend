import { Component, JSXElement } from 'solid-js';

import Quill from 'quill';
import Box from '@suid/material/Box';
import '../../../node_modules/quill/dist/quill.snow.css';
import hljs from 'highlight.js';

setTimeout(() => {}, 0);

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
];

// hljs.configure({
//   // optionally configure hljs
//   languages: ['javascript', 'ruby', 'python'],
// });

setTimeout(() => {
  const options = {
    // debug: 'info',
    modules: {
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      toolbar: toolbarOptions,
    },
    // placeholder: 'Compose an epic...',
    // readOnly: true,
    theme: 'snow',
  };
  const editor = new Quill('#quill', options);
}, 0);

const TextEditor: Component<Props> = () => (
  <Box sx={{ border: '2px solid blue' }}>
    {/* <div id="editorjs">fff</div> */}
    <div id="toolbar"></div>
    <div id="quill"></div>
  </Box>
);

export default TextEditor;
