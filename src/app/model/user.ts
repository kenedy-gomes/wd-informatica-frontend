import { Address } from "./Address";

export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    dataNascimento: string;
    sexo: string;
    address: Address; 
}