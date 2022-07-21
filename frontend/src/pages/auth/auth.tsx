import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { createForm } from '@felte/solid';
import toast from 'solid-toast';
import CircularProgress from '@suid/material/CircularProgress';
import Box from '@suid/material/Box';
import Typography from '@suid/material/Typography';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import {
  setIsLoggedIn,
  setLoggedInUser,
  setNotesPreview,
} from '../../../globalStore';

type formValues = {
  email: string;
  password: string;
  name?: string;
};

const Auth: Component = () => {
  const [isLoginView, setIsLoginView] = createSignal(true);
  const [isLoading, setIsLoading] = createSignal(false);

  const { form } = createForm({
    onSubmit: async (values: formValues) => {
      setIsLoading(true);

      if (isLoginView()) {
        try {
          const response = await fetch(
            'http://localhost:5000/api/users/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            }
          );
          const responseData = await response.json();

          if (!response.ok) {
            setIsLoading(false);
            return toast.error(responseData.message);
          }

          const { userId, email, token, notesPreview } = responseData;

          setLoggedInUser({
            token,
            userId,
            email,
          });

          setNotesPreview(notesPreview);
          setIsLoggedIn(true);
        } catch (err) {
          setIsLoading(false);

          toast.error(err.message || 'Something went wrong');
        }
      } else {
        try {
          const response = await fetch(
            'http://localhost:5000/api/users/signup',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
              }),
            }
          );

          const responseData = await response.json();

          setIsLoading(false);

          if (!response.ok) {
            return toast.error(responseData.message);
          }

          setIsLoggedIn(true);
        } catch (err) {
          toast.error(err.message || 'Something went wrong');
          setIsLoading(false);
        }
      }

      setIsLoading(true);
    },
  });

  const loginInputs = (
    <>
      <Input label="Email" name="email" />
      <Input label="Password" name="password" type="password" />
    </>
  );

  const registerInputs = (
    <>
      <Input label="Name" name="name" />
      <Input label="Email" name="email" />
      <Input label="Password" name="password" type="password" />
    </>
  );

  return (
    <>
      <div style={{ display: 'flex', 'justify-content': 'center' }}>
        <form
          use:form
          style={{
            display: 'flex',
            'flex-direction': 'column',
            width: '300px',
          }}
        >
          {isLoginView() && loginInputs}
          {!isLoginView() && registerInputs}
          <Button type="submit" isLoading={isLoading()}>
            {isLoginView() && 'Log in'}
            {!isLoginView() && 'Register'}
          </Button>
        </form>
      </div>
      <Box>
        <Typography>
          {isLoginView() && "Don't have an account?"}
          {!isLoginView() && 'Already have an account?'}
        </Typography>
        <Button
          onClick={() => setIsLoginView((prev) => !prev)}
          isDisabled={isLoading()}
        >
          {isLoginView() && 'Sign up'}
          {!isLoginView() && 'Log in'}
        </Button>
      </Box>
    </>
  );
};

export default Auth;
