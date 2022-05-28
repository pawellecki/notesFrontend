import { Component } from 'solid-js';
import MuiButton from '@suid/material/Button';

type Props = {
  children: string;
};

const Button: Component<Props> = ({ children }) => (
  <MuiButton>{children}</MuiButton>
);
export default Button;
