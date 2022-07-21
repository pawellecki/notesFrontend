import { Component } from 'solid-js';
import TextField from '@suid/material/TextField';

type Props = {
  label: string;
  name?: string;
  type?: 'text' | 'password';
  value?: string;
  onChange?: (value: string) => void;
};

const Input: Component<Props> = (props) => {
  const { label, name, type = 'text', onChange } = props;

  return (
    <TextField
      label={label}
      variant="standard"
      name={name}
      type={type}
      value={props.value}
      onChange={(e) => onChange && onChange(e.currentTarget.value)}
    />
  );
};

export default Input;
