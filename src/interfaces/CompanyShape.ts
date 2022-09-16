interface CompanyShape {
  /**
   * This is the type of process.
   ** `'add'` for add user process,
   ** `'update'` for update user process
   */
  type?: 'add' | 'update';
  /**
   * @description The id of the company
   */
  id?: number;
  /**
   * @description The name of the company
   * @type {string}
   */
  name?: string;
  /**
   * @description Unique code for the company
   */
  uniqueCode?: string;
  /**
   * @description How much employees can company accepts
   */
  allowedEmployees?: number | null;
  coins?: number;
  /**
   * @description How much employees are currently working in the company
   * @type {number}
   * @default 0
   */
  registeredEmployees?: number;
  subscriptionType?:'1' | '2';
  timestamp?: Date;
  updated?: Date;
}

export default CompanyShape;
