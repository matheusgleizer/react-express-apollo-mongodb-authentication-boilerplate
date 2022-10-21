import Header from '../header/header';
import { AuthStatus } from '../../context/auth/auth';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      <Header />
      <AuthStatus />

      <ul>
        <li>
          <Link to='/'>Public Page</Link>
        </li>
        <li>
          <Link to='/protected'>Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
