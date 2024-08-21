
import { Plan } from "./Plan";
import { User } from "./user";

export interface SolicitacaoPlano {
    id: string;
    status: string;
    solicitado: boolean;
    plan: Plan;
    user: User; 
  }

  