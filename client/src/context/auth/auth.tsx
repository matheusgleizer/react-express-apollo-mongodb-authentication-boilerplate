import { createContext, useState, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface AuthContextType {
  user: any;
  signIn: (user: string, token: string, callback: VoidFunction) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [_, setCookie, removeCookies] = useCookies(['auth-token']);

  const signIn = (newUser: Object, token: String, callback: VoidFunction) => {
    console.log(newUser)
    setUser(newUser);
    setCookie('auth-token', token);
    callback();
  };

  const signOut = () => {
    setUser(null);
    removeCookies('auth-token');
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthStatus = () => {
  const {signOut, user} = useContext(AuthContext);

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      <>
        Welcome {user.displayName}!{' '}
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      </>
    </p>
  );
};

export function RequireAuth({ children }: { children: JSX.Element }) {
  const {user} = useContext(AuthContext);
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
