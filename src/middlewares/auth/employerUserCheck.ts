import jwtAuthz from 'express-jwt-authz';

const employerUserCheck = jwtAuthz([], { customScopeKey: 'permissions' });

export default employerUserCheck;
