export interface Recado {
  id: string;
  description: string;
  detail: string;
  archive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  recados: Recado[];
}

export interface GetRecados {
  id: string;
  archive?: boolean;
}

export type Users = User[];
export type Reacdos = User[];
