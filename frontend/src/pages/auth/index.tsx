import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { createForm } from '@felte/solid';
import toast from 'solid-toast';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { isLoggedIn, setIsLoggedIn } from '../../../globalStore';
import CircularProgress from '@suid/material/CircularProgress';
const Auth: Component = () => {
  const [isLoading, setIsLoading] = createSignal(false);

  // @ts-ignore
  const { form } = createForm({
    onSubmit: async (values) => {
      if (isLoggedIn()) {
        return;
      } else {
        try {
          setIsLoading(true);

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

          if (responseData.user) {
            toast.success('aaaa');
            setIsLoggedIn(true);
          }
        } catch (err) {
          toast.error(err.message || 'Something went wrong');
          setIsLoading(false);
        }
      }

      setIsLoading(true);
    },
  });

  return (
    <>
      {isLoading() && <CircularProgress />}
      {!isLoading() && (
        <div style={{ display: 'flex', 'justify-content': 'center' }}>
          <form
            use:form
            style={{
              display: 'flex',
              'flex-direction': 'column',
              width: '300px',
            }}
          >
            <Input label="Name" name="name" />
            <Input label="Email" name="email" />
            <Input label="Password" name="password" type="password" />
            <Button type="submit">Sign In</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Auth;
