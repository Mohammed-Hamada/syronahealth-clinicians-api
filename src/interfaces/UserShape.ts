interface UserShape {
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
   * The name of the user
   ** It should be added when type is `'add'`
   */
  username?: string;
  /**
   * The email of the user
   ** It should be added when type is `'add'`
   */
  email?: string;
  /**
   ** It should be added when type is `'add'`
   */
  first_name?: string;
  /**
   ** It should be added when type is `'add'`
   */
  last_name?: string;
  /**
   * This is the profile picture of the user
   */
  coins?: number;
  /**
   * Used to indicate whether the account belongs to a Syrona employee
   */
  is_staff?: boolean;
  /**
   * Used to indicate whether the account has superuser permissions
   */
  is_deleted?: boolean;
  /**
   * This is set to `true` when the user completes registration,
   * and set to `false` if the user deletes the account
   */
  is_active?: boolean;
  /**
   * Used to indicate whether the account is a corporate one
   */
  is_business?: boolean;
  /**
   * This is set to `true` when the user agree to Syronahealth terms
   */
}

export default UserShape;
