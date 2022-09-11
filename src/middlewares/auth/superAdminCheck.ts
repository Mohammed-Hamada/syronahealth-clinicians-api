import { Auth0Permissions } from '../../enums';
import jwtAuthzCheck from './jwtAuthz';

const superAdminCheck = jwtAuthzCheck([
  Auth0Permissions.CREATE_EMPLOYEES,
  Auth0Permissions.UPDATE_EMPLOYEE,
  Auth0Permissions.CREATE_EMPLOYER,
  Auth0Permissions.READ_COMPANIES,
  Auth0Permissions.READ_USERS_ENGAGEMENTS,
  Auth0Permissions.READ_USERS_INTERESTS,
  Auth0Permissions.READ_USERS_HEALTH_CONDITIONS,
  Auth0Permissions.CREATE_ORGANIZATION,
  Auth0Permissions.DOWNLOAD_REPORTS,
  Auth0Permissions.GENERATE_REPORTS,
  Auth0Permissions.OPEN_ADMIN_VIEW,
  Auth0Permissions.SENT_INVITATIONS,
]);

export default superAdminCheck;
