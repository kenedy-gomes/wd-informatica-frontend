import { Address } from "./Address";

export interface Update {
    id: String;
    name: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    sexo: string;
    role: string;
    avatarUrl: string;
    address: Address;
  }
  