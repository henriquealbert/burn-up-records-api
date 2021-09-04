import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  ANALISE = 'EM ANÁLISE',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
  LANCADO = 'LANÇADO',
  CORRIGIR = 'CORRIGIR'
}

registerEnumType(Status, {
  name: 'Status'
});
