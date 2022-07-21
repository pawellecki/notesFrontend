import type { Component } from 'solid-js';
import { onMount, createEffect } from 'solid-js';
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
  content?: string;
  onChange?: (content: object, contentPreview: string) => void;
  hasTestContent?: boolean;
};

const TextEditor: Component<Props> = (props) => {
  let newQuill: any;

  onMount(() => {
    newQuill = new Quill('#quill', options);

    if (props.hasTestContent) {
      newQuill.setContents(testContent);
    }
    newQuill.on('text-change', function (delta, oldDelta, source) {
      props.onChange &&
        props.onChange(newQuill.getContents(), newQuill.getText(0, 100));
    });
  });

  createEffect(() => {
    const isFetchedContent = typeof props.content === 'string';
    const isQuillSet = newQuill.getContents().ops.length === 1;

    if (props.content && isFetchedContent && isQuillSet) {
      newQuill.setContents(JSON.parse(props.content), 'api');
    }
  });

  return (
    <Box sx={{ border: '2px solid blue' }}>
      <div id="toolbar"></div>
      <div id="quill"></div>
    </Box>
  );
};

export default TextEditor;
