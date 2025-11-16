import { Navigate } from 'react-router-dom';
import auth from './auth-helper';

export default function PrivateRoute({ children }) {
  return auth.isAuthenticated() ? children : <Navigate to="/signin" replace />;
}
