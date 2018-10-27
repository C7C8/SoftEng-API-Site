export class API {
  id: string;
  name: string;
  version: string;
  size: number;
  contact: string;
  gradle: string;
  description: string;
  image: string;
  updated: Date;
  team: string;
  creator: string;
  history: string[];
}

export class Class {
  term: string;
  year: number;
  apis: API[];
}

export class APIData {
  count: number;
  totalCount: number;
  size: number;
  totalSize: number;
  classes: Class[];
}

export class PyAPISubmission {
  action: string;
  id?: string;
  info: {
    name?: string;
    version?: string;
    description?: string;
    contact?: string;
    jar?: string;
    image?: string;
    term?: string;
    year?: number;
    team?: string;
  };
}

export class User {
  username: string;
  admin: boolean;
}

export class UserChange {
  username: string;
  new_username?: string;
  new_password?: string;
  set_admin?: boolean;
}

export class PyAPIResponse {
  status: string;
  message: string;
  access_token?: string;
  admin?: boolean;
  id?: string;
  users?: User[];
}
