

export interface SolicitacaoPlano {
    id: string;
    status: string;
    solicitado: boolean;
    plan: {
      id: string;
      description: string;
      megas: string;
      plano: string;
      servicos: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
      data_nascimento: string;
      cpf: string;
      sexo: string;
    };
  }

  