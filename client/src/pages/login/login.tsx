import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth';
import { useMutation } from '@apollo/client';
import { SIGN_IN_USER_MUTATION } from '../../apollo-graphql/mutations/auth';

export function LoginPage() {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const {signIn} = useContext(AuthContext);

  const [signInUser] = useMutation(SIGN_IN_USER_MUTATION, {
    onCompleted: (res): void => {
      const { user, token } = res.signInUser;
      signIn(user, token, () => {
        navigate('/', { replace: true });
      });
    },
    onError: (err): void => {
      console.log(err.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserCredentials({ ...userCredentials, [e.target.id]: e.target.value });

  const handleSubmit = () => signInUser({ variables: userCredentials });

  return (
    <div>
      <label htmlFor='email'>Email:</label>
      <input type='text' name='email' id='email' onChange={handleChange} />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        name='password'
        id='password'
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
