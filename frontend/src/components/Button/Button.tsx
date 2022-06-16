import { Component } from 'solid-js';
import MuiButton from '@suid/material/Button';

type Props = {
  children: string;
  type?: 'button' | 'submit';
};

const Button: Component<Props> = ({ type = 'button', children }) => (
  <MuiButton type={type}>{children}</MuiButton>
);
export default Button;
