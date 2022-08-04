interface CompanyShape
{
  id?: number;
  name?: string;
  uniqueCode?: string;
  allowedEmployees?: number | null;
  coins?: number;
  registeredEmployees?: number;
  timestamp?: Date;
  updated?: Date;
}

export default CompanyShape;
