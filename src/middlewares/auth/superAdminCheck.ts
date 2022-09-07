import jwtAuthz from 'express-jwt-authz';

const superAdminCheck = jwtAuthz([], { customScopeKey: 'permissions' });

export default superAdminCheck;
