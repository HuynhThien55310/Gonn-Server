export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?:  boolean;
}

export interface User {
  uid: string;
  email:    string;
  photoURL: string;
  roles:    Roles;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  disabled: boolean;
}
