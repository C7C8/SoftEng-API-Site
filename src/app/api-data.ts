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
  term: string;
  year: number;
  team: string;
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
