import { Component } from 'solid-js';
import MuiButton from '@suid/material/Button';

type Props = {
  children: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button: Component<Props> = ({ children, type = 'button', onClick }) => (
  <MuiButton type={type} onClick={onClick}>
    {children}
  </MuiButton>
);
export default Button;
