import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import { store } from './store';
import { authenticate } from './store/session/authSlice';
import Report from './screens/Report/Report';
import User from './screens/User/User';

function RequireAuth({ children, requiredRole }) {
  const auth = store.getState().auth;
  const location = useLocation();

  if (!auth.authenticated) {
    store.dispatch(authenticate());
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (requiredRole) {
    if (auth.me.role !== requiredRole) {
      return <Navigate to='/' replace />;
    }
  }

  return children;
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <>
                <Home />
              </>
            </RequireAuth>
          }
        />
        <Route
          path='/reports'
          element={
            <RequireAuth requiredRole='admin'>
              <>
                <Report />
              </>
            </RequireAuth>
          }
        />
        <Route
          path='/user/:id'
          element={
            <RequireAuth>
              <>
                <User />
              </>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
