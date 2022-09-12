import { Auth0Permissions } from '../../enums';
import jwtAuthzCheck from './jwtAuthz';

const employerUserCheck = jwtAuthzCheck([
  Auth0Permissions.READ_USERS_ENGAGEMENTS,
  Auth0Permissions.READ_USERS_HEALTH_CONDITIONS,
  Auth0Permissions.READ_USERS_INTERESTS,
]);

export default employerUserCheck;
