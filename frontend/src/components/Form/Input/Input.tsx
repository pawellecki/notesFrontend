import { Component } from 'solid-js';
import TextField from '@suid/material/TextField';

type Props = {
  label: string;
  name: string;
  type?: 'text' | 'password';
};

const Input: Component<Props> = ({ label, name, type = 'text' }) => (
  <TextField label={label} variant="standard" name={name} type={type} />
);
export default Input;
