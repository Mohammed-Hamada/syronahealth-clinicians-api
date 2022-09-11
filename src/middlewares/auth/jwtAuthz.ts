import { Handler } from 'express';
import jwtAuthz from 'express-jwt-authz';

const jwtAuthzCheck = (permissions: string[]): Handler => jwtAuthz(permissions, {
  checkAllScopes: true,
  customScopeKey: 'permissions',
  customUserKey: 'auth',
});

export default jwtAuthzCheck;
