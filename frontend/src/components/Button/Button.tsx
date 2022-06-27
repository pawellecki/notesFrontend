import { Component, JSXElement } from 'solid-js';
import MuiButton from '@suid/material/Button';
import CircularProgress from '@suid/material/CircularProgress';

type Props = {
  children: JSXElement;
  type?: 'button' | 'submit';
  isLoading?: any;
  isDisabled?: any;
  onClick?: () => void;
};

const Button: Component<Props> = (props) => {
  const { children, type = 'button', onClick } = props;

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={props.isLoading || props.isDisabled}
    >
      {props.isLoading && <CircularProgress size={15} />}
      {children}
    </MuiButton>
  );
};

export default Button;
