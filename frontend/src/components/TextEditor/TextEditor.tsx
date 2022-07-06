import { Component, createSignal, onMount } from 'solid-js';
import Quill from 'quill';
import Box from '@suid/material/Box';
import '../../../node_modules/quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import Button from '@suid/material/Button';
import { options, testContents } from './const';

// hljs.configure({d
//   // optionally configure hljs
//   languages: ['javascript', 'ruby', 'python'],
// });

type Props = {
  hasTestContents?: boolean;
  submit?: (contents: string) => void;
};

const TextEditor: Component<Props> = ({ submit, hasTestContents }) => {
  const [quill, setQuill] = createSignal();

  onMount(() => {
    const newQuill = new Quill('#quill', options);

    if (hasTestContents) {
      newQuill.setContents(testContents);
    }
    // setTimeout(() => {
    //  quill = new Quill('#quill', options);
    // return setQuill(newQuill);
    setQuill(newQuill);
  });
  console.log('submit', submit);

  quill() &&
    quill().on('text-change', function (delta, oldDelta, source) {
      console.log('qqqq', delta);
      console.log('oldDelta', oldDelta);
      console.log('source', source);
      if (source == 'api') {
      } else if (source == 'user') {
        console.log('A user action triggered this change.');
      }
    });

  const handleSubmit = () => {
    console.log(quill().getContents());
    const stringifyContent = JSON.stringify(quill().getContents());
    submit(stringifyContent);
  };

  // setTimeout(() => {
  //   const options = {
  //   const editor = new Quill('#quill', options);
  // }, 0);

  return (
    <Box sx={{ border: '2px solid blue' }}>
      <Button onClick={handleSubmit}>save</Button>
      {/* <div id="editorjs">fff</div> */}
      <div id="toolbar"></div>
      <div id="quill"></div>
    </Box>
  );
};

export default TextEditor;
