import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './context/auth/auth';
import { Layout } from './components/layout/layout';
import { LoginPage } from './pages/login/login';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<PublicPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/protected'
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
