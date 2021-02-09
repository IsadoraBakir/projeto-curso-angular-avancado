import { Endereco } from './endereco';

export class Supplier {
    id: string;
    name: string;
    document: string;
    active: boolean;
    supplierType: number;
    address: Endereco;
}

