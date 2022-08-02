interface ValidateUser {
  /**
   * This is the type of process.
   ** `'add'` for add user process,
   ** `'update'` for update user process
   */
  type: 'add' | 'update';
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
  db?: string;
  /**
   * Date of birth for the user
   */
  dob?: string | Date;
  /**
   * The amount of coins the user has - coins are accumulated by using
   * the app and can be used for discounts on purchases through the app
   */
  coins?: number;
  /**
   * Used to indicate whether the account belongs to a Syrona employee
   */
  is_staff?: boolean;
  /**
   * Used to indicate whether the account has superuser permissions
   */
  is_superuser?: boolean;
  /**
   * Set to `true` if the user deletes the account, default to `false`
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
  agree_to_terms?: boolean;
  /**
   * This is set to `true` when the user agree to privacy policy for Syronahealth
   */
  agree_to_privacy?: boolean;
  /**
   * This is set to `true` when the user agree to share his data with Syronahealth team
   */
  allow_data_sharing?: boolean;
}

export default ValidateUser;
