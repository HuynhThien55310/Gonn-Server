export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?:  boolean;
}

export class User {
  uid: string;
  email:    string;
  photoURL: string;
  roles:    Roles;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;

  constructor(authData) {
    this.email    = authData.email;
    this.photoURL = authData.photoURL;
    this.roles    = { reader: true };
  }
}
