import { Component, JSXElement } from 'solid-js';
import MuiButton from '@suid/material/Button';

type Props = {
  children: JSXElement;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button: Component<Props> = ({ children, type = 'button', onClick }) => (
  <MuiButton type={type} onClick={onClick}>
    {children}
  </MuiButton>
);
export default Button;
