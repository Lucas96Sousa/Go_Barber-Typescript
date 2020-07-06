import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { user } from '../hooks/auth';

const Routes: React.FC = () => {
  return <AuthRoutes />;
};

export default Routes;
