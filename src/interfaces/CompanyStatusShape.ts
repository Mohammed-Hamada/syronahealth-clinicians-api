import UserEngagements from './UserEngagements';
import UserHealthConditions from './UserHealthConditions';
import UserInterests from './UserInterests';

interface CompanyStatusShape {
  companyEmployees: Array<
    UserEngagements & UserHealthConditions & UserInterests
  >;
  companyEmployeesCount: number;
}

export default CompanyStatusShape;
