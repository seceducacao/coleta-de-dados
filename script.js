(() => {
  "use strict";

  /*
   * SUPABASE
   * Use somente a Project URL e a chave publishable (sb_publishable_...).
   * Nunca coloque sb_secret_, service_role ou senhas de usuários neste arquivo.
   */
  const SUPABASE_CONFIG = {
    url: "https://eohjotlqohffywwjntbi.supabase.co",
    anonKey: "sb_publishable_gARItAfGqd-qKFnblrtoQQ__sP14kVU"
  };

  const OTHER_RELEVANT = "Outros dados estatísticos que a instituição considere relevantes para compor o diagnóstico educacional do município";

  const institutions = [
    {
      id: "saude",
      name: "Secretaria Municipal de Saúde",
      shortName: "Saúde",
      fields: [
        { id: "populacao_total", label: "Total da população do município atendida pela saúde", compact: true, placeholder: "Informe o total" },
        { id: "faixa_etaria", label: "Quantitativo da população discriminado por faixa etária (idade) atendida pela saúde", placeholder: "Ex.: 0–5 anos: 320\n6–14 anos: 610\n15–17 anos: 205" },
        { id: "outros", label: OTHER_RELEVANT, placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "assistencia-social",
      name: "Secretaria Municipal de Assistência Social",
      shortName: "Assistência Social",
      fields: [
        { id: "familias_baixa_renda", label: "Total de famílias no perfil de Baixa Renda, cadastradas no Cadastro Único", compact: true, placeholder: "Informe o total" },
        { id: "criancas_faixa_etaria", label: "Quantitativo de crianças e adolescentes, discriminado por faixa etária (idade), no perfil de baixa renda cadastrado no Cadastro Único", placeholder: "Informe as faixas etárias e seus quantitativos" },
        { id: "escolarizacao", label: "Quantitativo de escolarização das pessoas no perfil de baixa renda cadastrado no Cadastro Único", placeholder: "Informe níveis de escolarização e quantitativos" },
        { id: "outros", label: OTHER_RELEVANT, placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "fazenda",
      name: "Secretaria Municipal de Fazenda",
      shortName: "Fazenda",
      fields: [
        { id: "aplicacao_minima", group: "Financiamento da Educação Municipal — últimos 3 anos", label: "Aplicação mínima e orçamento da educação", placeholder: "Informe os dados de cada um dos três anos" },
        { id: "valor_total_educacao", group: "Financiamento da Educação Municipal — últimos 3 anos", label: "Valor total aplicado em educação", placeholder: "Ano / valor aplicado" },
        { id: "percentual_25", group: "Financiamento da Educação Municipal — últimos 3 anos", label: "Percentual de aplicação dos 25% constitucionais", placeholder: "Ano / percentual" },
        { id: "fundeb_recebido", group: "Fundeb — últimos 3 anos", label: "Valor total recebido do Fundeb", placeholder: "Ano / valor recebido" },
        { id: "fundeb_remuneracao", group: "Fundeb — últimos 3 anos", label: "Percentual destinado à remuneração dos profissionais da educação básica (mínimo 70%)", placeholder: "Ano / percentual" },
        { id: "fundeb_manutencao", group: "Fundeb — últimos 3 anos", label: "Percentual destinado às demais despesas de manutenção e desenvolvimento do ensino (até 30%)", placeholder: "Ano / percentual" },
        { id: "valor_aluno_ano", group: "Fundeb — últimos 3 anos", label: "Valor aluno/ano recebido", placeholder: "Ano / valor por aluno" },
        { id: "complementacoes", group: "Fundeb — últimos 3 anos", label: "Recebimento de complementações da União (VAAT ou VAAR). Quanto?", placeholder: "Informe o tipo, o ano e o valor" },
        { id: "salario_educacao", group: "Programas Federais Complementares", label: "Salário-Educação: valor recebido, aplicação e contrapartida", placeholder: "Detalhe valores e aplicação" },
        { id: "pnae", group: "Programas Federais Complementares", label: "PNAE (Merenda Escolar): valor por aluno, número de atendidos e contrapartida municipal", placeholder: "Detalhe valores, atendidos e contrapartida" },
        { id: "pnate", group: "Programas Federais Complementares", label: "PNATE (Transporte Escolar): valor recebido, número de alunos atendidos, veículos e rotas", placeholder: "Detalhe valor, alunos, veículos e rotas" },
        { id: "outros", group: "Programas Federais Complementares", label: OTHER_RELEVANT, placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "coronel-coimbra",
      name: "Escola Estadual Coronel Coimbra",
      shortName: "Coronel Coimbra",
      fields: [
        { id: "identificacao", group: "Ensino Médio", label: "Nome completo da escola, INEP e endereço completo", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Médio", label: "Número de alunos matriculados por ano de escolaridade", placeholder: "Ano de escolaridade / número de alunos" },
        { id: "professores", group: "Ensino Médio", label: "Número de professores, nomes e suas formações", placeholder: "Nome / formação" },
        { id: "rendimento", group: "Ensino Médio", label: "Indicadores de rendimento (aprovação, abandono etc.)", placeholder: "Indicador / índice" },
        { id: "distorcao", group: "Ensino Médio", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Médio", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Médio", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar", compact: true, placeholder: "Informe o total" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar", compact: true, placeholder: "Informe o total" },
        { id: "outros", group: "Informações complementares", label: OTHER_RELEVANT, placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "mestra-aurora",
      name: "Escola Estadual Mestra Aurora",
      shortName: "Mestra Aurora",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-mercadinho",
      name: "Escola Municipal Santo Antônio do Mercadinho",
      shortName: "Mercadinho",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-monte-belo",
      name: "Escola Municipal Antonia Pereira Rocha",
      shortName: "Monte Belo",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-abadia",
      name: "Escola Municipal da Abadia",
      shortName: "Abadia",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-santana",
      name: "Escola Municipal da Santana",
      shortName: "Santana",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-estiva",
      name: "Escola Municipal Nucleo da Estiva",
      shortName: "Estiva",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "Escola-emei",
      name: "Escola Municipal Prefeito José Lemos",
      shortName: "EMEI",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-creche",
      name: "Escola Municipal Mestra Zefina",
      shortName: "Mestra Zefina",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "escola-donacina",
      name: "Escola Municipal Dona Cina",
      shortName: "Dona Cina",
      fields: [
        { id: "identificacao", group: "Ensino Fundamental", label: "Nome completo das escolas, endereço, INEP, dentre outros dados", placeholder: "Informe a identificação completa" },
        { id: "matriculas", group: "Ensino Fundamental", label: "Número de alunos matriculados por ano", placeholder: "Ano / número de alunos" },
        { id: "professores", group: "Ensino Fundamental", label: "Número de professores por rede e sua formação", placeholder: "Rede / quantidade / formação" },
        { id: "distorcao", group: "Ensino Fundamental", label: "Distorção idade-série", compact: true, placeholder: "Informe o índice" },
        { id: "aprovacao", group: "Ensino Fundamental", label: "Índice de aprovação", compact: true, placeholder: "Informe o índice" },
        { id: "abandono", group: "Ensino Fundamental", label: "Índice de abandono", compact: true, placeholder: "Informe o índice" },
        { id: "media_turma", group: "Ensino Fundamental", label: "Número médio de alunos por turma", compact: true, placeholder: "Informe a média" },
        { id: "ee_forma", group: "Educação Especial", label: "Forma de atendimento aos alunos público-alvo da educação especial (inclusão em classes comuns, salas de AEE, salas multifuncionais etc.)", placeholder: "Descreva as formas de atendimento" },
        { id: "ee_alunos", group: "Educação Especial", label: "Número de alunos atendidos por tipo de atendimento", placeholder: "Tipo de atendimento / número de alunos" },
        { id: "ee_profissionais", group: "Educação Especial", label: "Profissionais envolvidos no atendimento educacional especializado: número e formação", placeholder: "Profissional / quantidade / formação" },
        { id: "transporte", group: "Atendimento", label: "Número de alunos atendidos por transporte escolar (dados da secretaria, prestação de contas, programa de informações e dados do transporte escolar e contratos de terceirização)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "merenda", group: "Atendimento", label: "Número de alunos atendidos pela merenda escolar (dados da secretaria e prestação de contas PNAE)", placeholder: "Informe o total e as fontes utilizadas" },
        { id: "nove_anos", group: "Organização do ensino", label: "O ensino fundamental de 9 anos já está implantado? Desde quando? (legislação de organização e funcionamento do ensino fundamental, estadual ou municipal)", placeholder: "Informe a situação, a data e a legislação" },
        { id: "municipalizacao", group: "Organização do ensino", label: "Municipalização: quando ocorreu? Quais etapas foram absorvidas?", placeholder: "Informe a data e as etapas" },
        { id: "outros", group: "Informações complementares", label: "Outros dados estatísticos que a instituição considere", placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "ifnmg",
      name: "Instituto Federal Norte de Minas Gerais – Polo Avançado – Polo Carbonita/MG",
      shortName: "IFNMG",
      fields: [
        { id: "matriculas", label: "Número de matrículas por curso e por turma", placeholder: "Curso / turma / matrículas" },
        { id: "faixa_etaria", label: "Quantitativo de estudantes por faixa etária", placeholder: "Faixa etária / quantitativo" },
        { id: "concluintes_evasoes", label: "Número de concluintes e de evasões, quando disponível", placeholder: "Curso / concluintes / evasões" },
        { id: "equipe", label: "Quantitativo de docentes e técnicos administrativos", placeholder: "Função / quantitativo" },
        { id: "educacao_especial", label: "Informações sobre atendimento a estudantes público-alvo da educação especial, quando houver", placeholder: "Descreva o atendimento e os quantitativos" },
        { id: "cursos_tecnicos", label: "Cursos técnicos e profissionalizantes existentes", placeholder: "Liste os cursos" },
        { id: "instituicoes", label: "Nome completo das instituições que ofertam esses cursos", placeholder: "Liste as instituições" },
        { id: "expansao", label: "Intenção de expansão: há previsão de novos cursos, convênios ou parcerias?", placeholder: "Descreva as previsões existentes" },
        { id: "outros", label: OTHER_RELEVANT, placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    },
    {
      id: "cruzeiro-do-sul",
      name: "Faculdade Cruzeiro do Sul – Educação a Distância (EAD) Virtual – Polo Carbonita/MG",
      shortName: "Cruzeiro do Sul",
      fields: [
        { id: "identificacao", group: "Educação Superior", label: "Nome da instituição de nível superior, endereço, contato, dentre outros dados", placeholder: "Informe a identificação e os contatos" },
        { id: "cursos", group: "Educação Superior", label: "Cursos oferecidos, turmas e número de alunos atendidos", placeholder: "Curso / turma / alunos atendidos" },
        { id: "outros", group: "Educação Superior", label: OTHER_RELEVANT, placeholder: "Inclua informações complementares, fontes e observações" }
      ]
    }
  ];
  const elements = {
    authView: document.querySelector("#auth-view"),
    appShell: document.querySelector("#app-shell"),
    loginForm: document.querySelector("#login-form"),
    loginUsername: document.querySelector("#login-username"),
    loginPassword: document.querySelector("#login-password"),
    loginSubmit: document.querySelector("#login-submit"),
    loginError: document.querySelector("#login-error"),
    loginHelp: document.querySelector("#login-help"),
    accountName: document.querySelector("#account-name"),
    accountRole: document.querySelector("#account-role"),
    logoutButton: document.querySelector("#logout-button"),
    institutionPanelTitle: document.querySelector("#institution-panel-title"),
    archiveDescription: document.querySelector("#archive-description"),
    editorTab: document.querySelector("#editor-tab"),
    archiveTab: document.querySelector("#archive-tab"),
    editorView: document.querySelector("#editor-view"),
    archiveView: document.querySelector("#archive-view"),
    institutionSelect: document.querySelector("#institution-select"),
    institutionCategory: document.querySelector("#institution-category"),
    institutionShortName: document.querySelector("#institution-short-name"),
    paperInstitution: document.querySelector("#paper-institution"),
    paperCategory: document.querySelector("#paper-category"),
    printInstitution: document.querySelector("#print-institution"),
    printDate: document.querySelector("#print-date"),
    dynamicFields: document.querySelector("#dynamic-fields"),
    referenceDate: document.querySelector("#reference-date"),
    responsible: document.querySelector("#responsible"),
    progressText: document.querySelector("#progress-text"),
    progressTrack: document.querySelector("#progress-track"),
    progressBar: document.querySelector("#progress-bar"),
    reportStatusBadge: document.querySelector("#report-status-badge"),
    saveStatus: document.querySelector("#save-status"),
    saveReport: document.querySelector("#save-report"),
    reportCount: document.querySelector("#report-count"),
    reportSearch: document.querySelector("#report-search"),
    archiveContent: document.querySelector("#archive-content"),
    exportData: document.querySelector("#export-data"),
    deleteDialog: document.querySelector("#delete-dialog"),
    deleteDescription: document.querySelector("#delete-description"),
    confirmDelete: document.querySelector("#confirm-delete"),
    toastRegion: document.querySelector("#toast-region"),
    attachmentInput: document.querySelector("#attachment-input"),
    attachmentDropzone: document.querySelector("#attachment-dropzone"),
    attachmentList: document.querySelector("#attachment-list"),
    attachmentCount: document.querySelector("#attachment-count")
  };

  const SESSION_STORAGE_KEY = "pme_custom_session_token";

  let supabaseClient = null;
  let sessionToken = null;
  let currentProfile = null;
  let reports = [];
  let editingId = null;
  let deleteId = null;
  let pendingAttachments = [];
  let reportAttachments = [];

  const ATTACHMENT_MAX_SIZE = 10 * 1024 * 1024;
  const ATTACHMENT_MAX_FILES = 10;
  const ATTACHMENT_ALLOWED_TYPES = new Set(["application/pdf", "image/png", "image/jpeg"]);

  function isSupabaseConfigured() {
    const url = SUPABASE_CONFIG.url.trim();
    const key = SUPABASE_CONFIG.anonKey.trim();
    return /^https:\/\/.+\.supabase\.co$/i.test(url)
      && key.length > 30
      && !url.includes("COLE_AQUI")
      && !key.includes("COLE_AQUI");
  }

  function createSupabaseClient() {
    if (!isSupabaseConfigured()) return null;
    if (!window.supabase?.createClient) throw new Error("Biblioteca do Supabase não foi carregada.");
    return window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  }

  function getInstitution(id = elements.institutionSelect.value) {
    return institutions.find((institution) => institution.id === id) || institutions[0];
  }

  function today() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function formatDate(value) {
    if (!value) return "Sem data";
    const [year, month, day] = value.slice(0, 10).split("-");
    return `${day}/${month}/${year}`;
  }

  function formatDateTime(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[character]));
  }

  function normalizeUsername(value = "") {
    return String(value)
      .trim()
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  }

  function showLoginError(message = "", kind = "credentials") {
    elements.loginError.textContent = message;
    elements.loginError.hidden = !message;
    elements.loginError.dataset.kind = kind;
  }

  function setLoginHelp(message = "") {
    if (elements.loginHelp) elements.loginHelp.textContent = message;
  }

  function clearLocalSession() {
    sessionToken = null;
    currentProfile = null;
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }

  function showAuth(message = "") {
    clearLocalSession();
    elements.appShell.hidden = true;
    elements.authView.hidden = false;
    showLoginError(message);
    elements.loginPassword.value = "";
    window.setTimeout(() => elements.loginUsername.focus(), 50);
  }

  function showApp() {
    elements.authView.hidden = true;
    elements.appShell.hidden = false;
  }

  function normalizeRpcPayload(data) {
    let value = data;

    // Algumas funções PostgreSQL podem retornar uma única linha como array.
    if (Array.isArray(value) && value.length === 1) value = value[0];

    // Se a função retornar JSON como texto, converte automaticamente.
    if (typeof value === "string") {
      const trimmed = value.trim();
      if ((trimmed.startsWith("{") && trimmed.endsWith("}")) ||
          (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        try {
          value = JSON.parse(trimmed);
          if (Array.isArray(value) && value.length === 1) value = value[0];
        } catch (_) {
          // Mantém o texto original se não for JSON válido.
        }
      }
    }

    return value;
  }

  async function rpc(name, params = {}) {
    if (!supabaseClient) throw new Error("Cliente Supabase não inicializado.");

    const { data, error } = await supabaseClient.rpc(name, params);
    if (error) {
      const enhanced = new Error(error.message || `Falha ao executar ${name}.`);
      enhanced.code = error.code;
      enhanced.details = error.details;
      enhanced.hint = error.hint;
      enhanced.rpcName = name;
      enhanced.original = error;
      throw enhanced;
    }

    return normalizeRpcPayload(data);
  }

  function extractSessionToken(payload) {
    return payload?.token || payload?.session_token || payload?.access_token || null;
  }

  function profileFromPayload(payload) {
    const normalized = normalizeRpcPayload(payload);
    const profile = normalized?.user || normalized?.profile || normalized?.usuario || normalized;

    if (!profile?.username || !profile?.role) {
      const error = new Error("A função de autenticação respondeu, mas o perfil retornado é incompatível com o sistema.");
      error.code = "INVALID_PROFILE_PAYLOAD";
      throw error;
    }

    const active = profile.active ?? profile.ativo ?? true;
    if (!active) throw new Error("Este acesso está desativado. Procure a coordenação do PME.");

    return {
      ...profile,
      active,
      institution_id: profile.institution_id ?? profile.instituicao_id ?? null,
      nome: profile.nome ?? profile.name ?? profile.username
    };
  }

  function friendlyLoginError(error) {
    const code = String(error?.code || "");
    const message = String(error?.message || "");
    const details = String(error?.details || "");
    const hint = String(error?.hint || "");
    const combined = `${message} ${details} ${hint}`.toLowerCase();

    if (/failed to fetch|network|load failed|fetch/.test(combined)) {
      return {
        kind: "network",
        message: "Não foi possível conectar ao banco de dados. Verifique sua internet e tente novamente."
      };
    }

    if (/could not find the function|schema cache|pgrst202|function .* does not exist/.test(combined)) {
      return {
        kind: "config",
        message: "A função de login do Supabase não está disponível. Execute o arquivo supabase_fix.sql no SQL Editor."
      };
    }

    if (/permission denied|42501|not authorized|insufficient privilege/.test(`${code} ${combined}`)) {
      return {
        kind: "config",
        message: "O Supabase bloqueou a função de login por permissão. Execute o arquivo supabase_fix.sql no SQL Editor."
      };
    }

    if (/crypt|pgcrypto|gen_salt/.test(combined)) {
      return {
        kind: "config",
        message: "O recurso de criptografia do banco não está disponível. Execute o arquivo supabase_fix.sql no SQL Editor."
      };
    }

    if (code === "INVALID_PROFILE_PAYLOAD" || /perfil retornado é incompatível|não foi possível iniciar a sessão/.test(combined)) {
      return {
        kind: "config",
        message: "O login foi processado, mas o retorno da função pme_login não está no formato esperado pelo sistema."
      };
    }

    if (/usuário ou senha|usuario ou senha|credenciais inválidas|credenciais invalidas/i.test(message)) {
      return { kind: "credentials", message: "Usuário ou senha inválidos." };
    }

    return {
      kind: "config",
      message: error?.message ? `Erro no banco: ${error.message}` : "Não foi possível concluir o login."
    };
  }

  function populateInstitutionsForProfile() {
    const allowed = currentProfile?.role === "admin"
      ? institutions
      : institutions.filter((institution) => institution.id === currentProfile?.institution_id);

    if (!allowed.length) throw new Error("A instituição vinculada ao usuário não existe na configuração do sistema.");

    elements.institutionSelect.innerHTML = allowed
      .map((institution) => `<option value="${institution.id}">${escapeHtml(institution.name)}</option>`)
      .join("");

    elements.institutionSelect.disabled = currentProfile.role !== "admin";
    elements.institutionPanelTitle.textContent = currentProfile.role === "admin"
      ? "Escolha quem enviará os dados"
      : "Dados da sua instituição";

    if (currentProfile.role !== "admin") elements.institutionSelect.value = currentProfile.institution_id;
  }

  function applyProfileToInterface() {
    elements.accountName.textContent = currentProfile.nome || currentProfile.username || "Usuário";
    elements.accountRole.textContent = currentProfile.role === "admin" ? "Administração PME" : "Acesso institucional";
    elements.exportData.hidden = currentProfile.role !== "admin";
    elements.archiveDescription.textContent = currentProfile.role === "admin"
      ? "Consulte os relatórios enviados por todas as instituições."
      : "Consulte e atualize os relatórios da sua instituição.";
    populateInstitutionsForProfile();
    renderInstitution();
  }

  async function startCustomSession(token, profilePayload = null) {
    sessionToken = token;
    try {
      const payload = normalizeRpcPayload(profilePayload || await rpc("pme_validar_sessao", { p_token: token }));
      currentProfile = profileFromPayload(payload);

      // Só persiste a sessão depois que token e perfil foram realmente validados.
      sessionStorage.setItem(SESSION_STORAGE_KEY, token);
      applyProfileToInterface();
      showApp();
      elements.referenceDate.value = today();
      updatePrintDate();
      setSaveState("Conectando ao banco…", true);
      await loadReports();
      setSaveState("Pronto para salvar");
    } catch (error) {
      console.error("[PME] Falha ao iniciar sessão:", error);
      showAuth("Sua sessão expirou ou não é mais válida. Entre novamente.");
      throw error;
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    showLoginError();
    setLoginHelp("Validando acesso…");
    elements.loginSubmit.disabled = true;
    elements.loginSubmit.textContent = "Entrando…";

    try {
      const username = normalizeUsername(elements.loginUsername.value);
      const password = elements.loginPassword.value;

      if (!/^[a-z0-9._-]{3,40}$/.test(username)) {
        showLoginError("Informe um usuário válido.", "credentials");
        return;
      }
      if (!password) {
        showLoginError("Informe a senha.", "credentials");
        return;
      }

      elements.loginUsername.value = username;

      const rawResult = await rpc("pme_login", {
        p_username: username,
        p_password: password
      });
      const result = normalizeRpcPayload(rawResult);
      const token = extractSessionToken(result);

      if (!token) {
        // Funções podem sinalizar falha sem lançar erro.
        const explicitError = result?.error || result?.message || result?.mensagem;
        if (explicitError) {
          const loginError = new Error(String(explicitError));
          loginError.code = result?.code || "LOGIN_REJECTED";
          throw loginError;
        }
        const loginError = new Error("Não foi possível iniciar a sessão: token ausente no retorno de pme_login.");
        loginError.code = "INVALID_PROFILE_PAYLOAD";
        throw loginError;
      }

      await startCustomSession(token, result);
      elements.loginPassword.value = "";
      setLoginHelp("Acesso validado com segurança.");
    } catch (error) {
      console.error("[PME] Erro de autenticação:", {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        rpc: error?.rpcName,
        original: error?.original
      });

      const friendly = friendlyLoginError(error);
      showLoginError(friendly.message, friendly.kind);
      setLoginHelp("Confira os dados e tente novamente.");
    } finally {
      elements.loginSubmit.disabled = false;
      elements.loginSubmit.textContent = "Entrar";
    }
  }

  async function handleLogout() {
    elements.logoutButton.disabled = true;
    const token = sessionToken;
    try {
      if (token) await rpc("pme_logout", { p_token: token });
    } catch (error) {
      console.warn("Não foi possível encerrar a sessão no servidor.", error);
    } finally {
      reports = [];
      editingId = null;
      elements.reportCount.textContent = "0";
      elements.logoutButton.disabled = false;
      showAuth();
    }
  }

  async function loadReports() {
    if (!sessionToken) throw new Error("Sessão inválida.");
    const data = await rpc("pme_listar_relatorios", { p_token: sessionToken });
    reports = Array.isArray(data) ? data : [];
    elements.reportCount.textContent = reports.length;
    renderArchive();
  }

  function renderInstitution(fields = {}) {
    const institution = getInstitution();
    elements.institutionCategory.textContent = institution.category;
    elements.institutionShortName.textContent = institution.shortName;
    if (elements.paperInstitution) elements.paperInstitution.textContent = institution.name;
    elements.paperCategory.textContent = institution.category;
    elements.printInstitution.textContent = institution.name;

    let lastGroup = "";
    elements.dynamicFields.innerHTML = institution.fields.map((field, index) => {
      const showGroup = Boolean(field.group && field.group !== lastGroup);
      if (field.group) lastGroup = field.group;
      const value = fields[field.id] || "";
      const control = field.compact
        ? `<input type="text" data-field-id="${field.id}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder || "")}">`
        : `<textarea data-field-id="${field.id}" rows="3" placeholder="${escapeHtml(field.placeholder || "")}">${escapeHtml(value)}</textarea>`;

      return `${showGroup ? `<div class="field-group"><span>${escapeHtml(field.group)}</span></div>` : ""}<div class="field-wrap"><label class="report-field"><span class="field-index">${String(index + 1).padStart(2, "0")}</span><span class="field-content"><strong>${escapeHtml(field.label)}</strong>${control}</span></label></div>`;
    }).join("");

    updateProgress();
  }


  function formatBytes(bytes = 0) {
    const value = Number(bytes) || 0;
    if (value < 1024) return `${value} B`;
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
    return `${(value / (1024 * 1024)).toFixed(1)} MB`;
  }

  function attachmentTypeLabel(mimeType = "", fileName = "") {
    if (mimeType === "application/pdf" || /\.pdf$/i.test(fileName)) return "PDF";
    return "IMG";
  }

  function attachmentKey(file) {
    return `${file.name}::${file.size}::${file.lastModified}`;
  }

  function isAllowedAttachment(file) {
    const extensionOk = /\.(pdf|png|jpe?g)$/i.test(file.name || "");
    return ATTACHMENT_ALLOWED_TYPES.has(file.type) && extensionOk;
  }

  function renderAttachments() {
    if (!elements.attachmentList || !elements.attachmentCount) return;

    const total = reportAttachments.length + pendingAttachments.length;
    elements.attachmentCount.textContent = `${total} ${total === 1 ? "arquivo" : "arquivos"}`;

    const savedRows = reportAttachments.map((item) => `
      <div class="attachment-row">
        <span class="attachment-type" aria-hidden="true">${attachmentTypeLabel(item.mime_type, item.file_name)}</span>
        <div class="attachment-main">
          <span class="attachment-name" title="${escapeHtml(item.file_name)}">${escapeHtml(item.file_name)}</span>
          <span class="attachment-meta">
            <span>${formatBytes(item.file_size)}</span>
            <span>·</span>
            <span>Anexado</span>
          </span>
        </div>
        <div class="attachment-actions print-hidden">
          <button class="button ghost attachment-action download" type="button" data-attachment-action="download" data-attachment-id="${item.id}" title="Baixar arquivo" aria-label="Baixar ${escapeHtml(item.file_name)}">⇩</button>
          <button class="button ghost attachment-action remove" type="button" data-attachment-action="remove-saved" data-attachment-id="${item.id}" title="Remover arquivo" aria-label="Remover ${escapeHtml(item.file_name)}">⌫</button>
        </div>
      </div>
    `);

    const pendingRows = pendingAttachments.map((item) => `
      <div class="attachment-row">
        <span class="attachment-type" aria-hidden="true">${attachmentTypeLabel(item.file.type, item.file.name)}</span>
        <div class="attachment-main">
          <span class="attachment-name" title="${escapeHtml(item.file.name)}">${escapeHtml(item.file.name)}</span>
          <span class="attachment-meta">
            <span>${formatBytes(item.file.size)}</span>
            <span>·</span>
            <span class="attachment-pending">Será enviado ao salvar</span>
          </span>
        </div>
        <div class="attachment-actions print-hidden">
          <button class="button ghost attachment-action remove" type="button" data-attachment-action="remove-pending" data-attachment-key="${escapeHtml(item.key)}" title="Remover arquivo" aria-label="Remover ${escapeHtml(item.file.name)}">⌫</button>
        </div>
      </div>
    `);

    elements.attachmentList.innerHTML = [...savedRows, ...pendingRows].join("")
      || '<div class="attachment-empty">Nenhum documento anexado.</div>';
  }

  function clearAttachments() {
    pendingAttachments = [];
    reportAttachments = [];
    if (elements.attachmentInput) elements.attachmentInput.value = "";
    renderAttachments();
  }

  function addPendingFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const existingKeys = new Set(pendingAttachments.map((item) => item.key));
    const existingSaved = new Set(reportAttachments.map((item) => `${item.file_name}::${item.file_size}`));
    let added = 0;

    for (const file of files) {
      if (reportAttachments.length + pendingAttachments.length >= ATTACHMENT_MAX_FILES) {
        toast(`O limite é de ${ATTACHMENT_MAX_FILES} arquivos por relatório.`, "error");
        break;
      }

      if (!isAllowedAttachment(file)) {
        toast(`“${file.name}” não é um PDF, PNG ou JPEG válido.`, "error");
        continue;
      }

      if (file.size > ATTACHMENT_MAX_SIZE) {
        toast(`“${file.name}” ultrapassa o limite de 10 MB.`, "error");
        continue;
      }

      const key = attachmentKey(file);
      if (existingKeys.has(key) || existingSaved.has(`${file.name}::${file.size}`)) {
        toast(`“${file.name}” já está na lista.`, "error");
        continue;
      }

      pendingAttachments.push({ key, file });
      existingKeys.add(key);
      added += 1;
    }

    if (elements.attachmentInput) elements.attachmentInput.value = "";
    renderAttachments();
    if (added) toast(`${added} ${added === 1 ? "arquivo adicionado" : "arquivos adicionados"}. Salve o relatório para enviar.`);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error(`Não foi possível ler o arquivo ${file.name}.`));
      reader.onload = () => {
        const result = String(reader.result || "");
        const commaIndex = result.indexOf(",");
        resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
      };
      reader.readAsDataURL(file);
    });
  }

  async function loadAttachments(reportId) {
    if (!reportId || !sessionToken) {
      reportAttachments = [];
      renderAttachments();
      return;
    }

    const data = await rpc("pme_listar_anexos", {
      p_token: sessionToken,
      p_report_id: Number(reportId)
    });

    reportAttachments = Array.isArray(data) ? data : [];
    renderAttachments();
  }

  async function uploadPendingAttachments(reportId) {
    if (!pendingAttachments.length) return { uploaded: 0, failed: 0 };

    const queue = [...pendingAttachments];
    let uploaded = 0;
    let failed = 0;

    for (const item of queue) {
      try {
        const base64 = await fileToBase64(item.file);
        await rpc("pme_anexar_arquivo", {
          p_token: sessionToken,
          p_report_id: Number(reportId),
          p_file_name: item.file.name,
          p_mime_type: item.file.type,
          p_file_size: item.file.size,
          p_base64: base64
        });
        pendingAttachments = pendingAttachments.filter((pending) => pending.key !== item.key);
        uploaded += 1;
      } catch (error) {
        failed += 1;
        console.error("[PME] Falha ao anexar arquivo:", item.file.name, error);
      }
    }

    await loadAttachments(reportId);
    return { uploaded, failed };
  }

  function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return new Blob([bytes], { type: mimeType || "application/octet-stream" });
  }

  async function downloadAttachment(id) {
    try {
      const data = await rpc("pme_baixar_anexo", {
        p_token: sessionToken,
        p_attachment_id: Number(id)
      });

      if (!data?.data_base64) throw new Error("Arquivo sem conteúdo.");

      const blob = base64ToBlob(data.data_base64, data.mime_type);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.file_name || "anexo";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
      toast("Não foi possível baixar este anexo.", "error");
    }
  }

  async function removeSavedAttachment(id) {
    try {
      await rpc("pme_excluir_anexo", {
        p_token: sessionToken,
        p_attachment_id: Number(id)
      });
      reportAttachments = reportAttachments.filter((item) => String(item.id) !== String(id));
      renderAttachments();
      toast("Anexo removido.");
    } catch (error) {
      console.error(error);
      toast("Não foi possível remover este anexo.", "error");
    }
  }

  function collectFields() {
    return [...elements.dynamicFields.querySelectorAll("[data-field-id]")].reduce((result, field) => {
      result[field.dataset.fieldId] = field.value;
      return result;
    }, {});
  }

  function progressState() {
    const institution = getInstitution();
    const fields = collectFields();
    const completed = institution.fields.filter((field) => fields[field.id] && fields[field.id].trim()).length;
    const total = institution.fields.length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage, status: completed === total && total > 0 ? "Concluído" : "Em preenchimento" };
  }

  function updateProgress() {
    const progress = progressState();
    elements.progressText.textContent = `${progress.completed} de ${progress.total}`;
    elements.progressBar.style.width = `${progress.percentage}%`;
    elements.progressTrack.setAttribute("aria-valuenow", String(progress.percentage));
  }

  function setSaveState(text, busy = false) {
    elements.saveStatus.textContent = text;
    elements.saveReport.disabled = busy || !sessionToken;
  }

  function resetForm(keepInstitution = true) {
    editingId = null;
    if (currentProfile.role === "admin") {
      const selected = keepInstitution ? elements.institutionSelect.value : institutions[0].id;
      elements.institutionSelect.value = selected;
    } else {
      elements.institutionSelect.value = currentProfile.institution_id;
    }
    elements.referenceDate.value = today();
    elements.responsible.value = "";
    elements.reportStatusBadge.textContent = "Novo relatório";
    elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar relatório';
    setSaveState("Ainda não salvo");
    clearAttachments();
    renderInstitution();
    updatePrintDate();
    showView("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showView(view) {
    const editor = view === "editor";
    elements.editorView.hidden = !editor;
    elements.archiveView.hidden = editor;
    elements.editorView.classList.toggle("hidden", !editor);
    elements.archiveView.classList.toggle("hidden", editor);
    elements.editorTab.classList.toggle("active", editor);
    elements.archiveTab.classList.toggle("active", !editor);
    elements.editorTab.toggleAttribute("aria-current", editor);
    elements.archiveTab.toggleAttribute("aria-current", !editor);
    if (!editor) renderArchive();
  }

  function updatePrintDate() {
    elements.printDate.textContent = `Data de referência: ${formatDate(elements.referenceDate.value)}`;
  }

  function buildResponsePayload() {
    const institution = getInstitution();
    const fields = collectFields();
    return institution.fields.map((field, index) => ({
      field_id: field.id,
      field_group: field.group || null,
      question: field.label,
      answer: fields[field.id] || "",
      sort_order: index + 1
    }));
  }

  async function saveCurrentReport() {
    if (!sessionToken || !currentProfile) {
      showAuth("Sua sessão expirou. Entre novamente.");
      return;
    }

    const institution = getInstitution();
    if (currentProfile.role !== "admin" && institution.id !== currentProfile.institution_id) {
      toast("Você não tem permissão para salvar dados de outra instituição.", "error");
      return;
    }

    setSaveState("Salvando no banco…", true);

    try {
      const result = await rpc("pme_salvar_relatorio", {
        p_token: sessionToken,
        p_report_id: editingId ? Number(editingId) : null,
        p_institution_id: institution.id,
        p_responsible: elements.responsible.value.trim(),
        p_reference_date: elements.referenceDate.value || today(),
        p_respostas: buildResponsePayload()
      });

      editingId = result?.id ?? editingId;
      elements.reportStatusBadge.textContent = result?.status || progressState().status;
      elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar alterações';

      let attachmentResult = { uploaded: 0, failed: 0 };
      if (editingId && pendingAttachments.length) {
        setSaveState("Enviando anexos…", true);
        attachmentResult = await uploadPendingAttachments(editingId);
      } else if (editingId) {
        await loadAttachments(editingId);
      }

      setSaveState(`Sincronizado · ${formatDateTime(result?.updated_at || new Date().toISOString())}`);
      if (attachmentResult.failed) {
        toast(`Relatório salvo, mas ${attachmentResult.failed} anexo(s) não puderam ser enviados.`, "error");
      } else if (attachmentResult.uploaded) {
        toast(`Relatório salvo e ${attachmentResult.uploaded} anexo(s) enviado(s).`);
      } else {
        toast("Relatório salvo com segurança.");
      }
      await loadReports();
    } catch (error) {
      console.error(error);
      const message = String(error?.message || "");
      if (/sess[aã]o|expirad/i.test(message)) {
        showAuth("Sua sessão expirou. Entre novamente.");
        return;
      }
      setSaveState("Não foi possível sincronizar");
      toast("Não foi possível salvar. Verifique sua conexão ou permissão de acesso.", "error");
    }
  }

  async function editReport(id, printAfter = false) {
    const report = reports.find((item) => String(item.id) === String(id));
    if (!report) return;

    try {
      const answers = await rpc("pme_carregar_respostas", {
        p_token: sessionToken,
        p_report_id: Number(id)
      });

      const fields = Object.fromEntries((answers || []).map((item) => [item.field_id, item.answer || ""]));
      editingId = report.id;
      elements.institutionSelect.value = report.institution_id;
      elements.referenceDate.value = report.reference_date || today();
      elements.responsible.value = report.responsible || "";
      elements.reportStatusBadge.textContent = report.status || "Em preenchimento";
      elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar alterações';
      setSaveState(`Última sincronização · ${formatDateTime(report.updated_at)}`);
      pendingAttachments = [];
      renderInstitution(fields);
      await loadAttachments(report.id);
      updatePrintDate();
      showView("editor");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (printAfter) window.setTimeout(() => window.print(), 120);
    } catch (error) {
      console.error(error);
      toast("Não foi possível carregar as respostas deste relatório.", "error");
    }
  }

  function requestDelete(id) {
    const report = reports.find((item) => String(item.id) === String(id));
    if (!report) return;
    deleteId = id;
    elements.deleteDescription.textContent = `O relatório de “${report.institution_name}” será removido permanentemente. Esta ação não pode ser desfeita.`;
    if (typeof elements.deleteDialog.showModal === "function") elements.deleteDialog.showModal();
    else if (window.confirm(elements.deleteDescription.textContent)) deleteReport(id);
  }

  async function deleteReport(id) {
    try {
      try {
        const attachments = await rpc("pme_listar_anexos", {
          p_token: sessionToken,
          p_report_id: Number(id)
        });
        for (const attachment of (attachments || [])) {
          await rpc("pme_excluir_anexo", {
            p_token: sessionToken,
            p_attachment_id: Number(attachment.id)
          });
        }
      } catch (attachmentError) {
        console.warn("[PME] Não foi possível limpar anexos antes de excluir o relatório.", attachmentError);
      }

      await rpc("pme_excluir_relatorio", {
        p_token: sessionToken,
        p_report_id: Number(id)
      });
      if (String(editingId) === String(id)) resetForm();
      await loadReports();
      toast("Relatório excluído.");
    } catch (error) {
      console.error(error);
      toast("Não foi possível excluir o relatório.", "error");
    }
  }

  function renderArchive() {
    const query = elements.reportSearch.value.trim().toLocaleLowerCase("pt-BR");
    const filtered = reports.filter((report) =>
      `${report.institution_name || ""} ${report.responsible || ""} ${report.institution_category || ""}`
        .toLocaleLowerCase("pt-BR")
        .includes(query)
    );

    if (!filtered.length) {
      elements.archiveContent.innerHTML = `<div class="archive-state"><div class="empty-icon">▤</div><h2>${query ? "Nenhum resultado encontrado" : "Nenhum relatório salvo"}</h2><p>${query ? "Tente buscar usando outro termo." : "Comece preenchendo o primeiro levantamento institucional."}</p>${query ? "" : '<button class="button primary" data-action="new">＋ Criar relatório</button>'}</div>`;
      return;
    }

    elements.archiveContent.innerHTML = `<div class="report-list">${filtered.map((report) => {
      const status = report.status || "Em preenchimento";
      const completed = Number(report.completed_fields || 0);
      const total = Number(report.total_fields || 0);
      return `<article class="report-card"><div class="report-card-icon" aria-hidden="true">▤</div><div class="report-card-main"><div class="report-card-title"><h2>${escapeHtml(report.institution_name || "Instituição")}</h2><span class="badge">${completed}/${total} campos</span></div><p>${escapeHtml(report.institution_category || "")} · ${escapeHtml(status)}</p><div class="report-card-meta"><span>▣ ${formatDate(report.reference_date)}</span>${report.responsible ? `<span>● ${escapeHtml(report.responsible)}</span>` : ""}</div></div><div class="report-card-actions"><button class="button secondary" data-action="edit" data-id="${report.id}">Editar</button><button class="button ghost" data-action="print" data-id="${report.id}" aria-label="Imprimir relatório">⎙</button><button class="button ghost danger-ghost" data-action="delete" data-id="${report.id}" aria-label="Excluir relatório">⌫</button></div></article>`;
    }).join("")}</div>`;
  }

  function csvEscape(value) {
    const text = String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    return `"${text.replace(/"/g, '""')}"`;
  }

  async function exportCsv() {
    if (currentProfile?.role !== "admin") {
      toast("A exportação consolidada é exclusiva da administração do PME.", "error");
      return;
    }

    elements.exportData.disabled = true;
    try {
      const rows = await rpc("pme_exportar_base", { p_token: sessionToken });
      const header = [
        "relatorio_id", "instituicao_id", "instituicao", "categoria", "responsavel",
        "data_referencia", "status", "campos_preenchidos", "total_campos",
        "percentual_preenchimento", "grupo", "ordem", "campo_id", "pergunta",
        "resposta", "relatorio_criado_em", "relatorio_atualizado_em", "resposta_atualizada_em"
      ];

      const dataRows = (rows || []).map((row) => header.map((column) => row[column] ?? ""));
      const csv = "\uFEFF" + [header, ...dataRows].map((row) => row.map(csvEscape).join(";")).join("\r\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pme-carbonita-${today()}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast("Base consolidada exportada para Excel/Power BI.");
    } catch (error) {
      console.error(error);
      toast("Não foi possível exportar a base.", "error");
    } finally {
      elements.exportData.disabled = false;
    }
  }

  function toast(message, type = "success") {
    const item = document.createElement("div");
    item.className = `toast ${type}`;
    item.textContent = message;
    elements.toastRegion.appendChild(item);
    window.setTimeout(() => item.remove(), 3500);
  }

  function bindEvents() {
    elements.loginForm.addEventListener("submit", handleLogin);
    elements.logoutButton.addEventListener("click", handleLogout);
    elements.editorTab.addEventListener("click", () => showView("editor"));
    elements.archiveTab.addEventListener("click", () => showView("archive"));
    document.querySelector("#new-report-archive").addEventListener("click", () => resetForm());
    document.querySelector("#print-report").addEventListener("click", () => window.print());
    elements.saveReport.addEventListener("click", saveCurrentReport);
    elements.exportData.addEventListener("click", exportCsv);
    elements.referenceDate.addEventListener("change", updatePrintDate);
    elements.dynamicFields.addEventListener("input", updateProgress);
    elements.reportSearch.addEventListener("input", renderArchive);

    elements.attachmentInput.addEventListener("change", (event) => addPendingFiles(event.target.files));

    ["dragenter", "dragover"].forEach((eventName) => {
      elements.attachmentDropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        elements.attachmentDropzone.classList.add("is-dragging");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      elements.attachmentDropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        elements.attachmentDropzone.classList.remove("is-dragging");
      });
    });

    elements.attachmentDropzone.addEventListener("drop", (event) => {
      addPendingFiles(event.dataTransfer?.files);
    });

    elements.attachmentList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-attachment-action]");
      if (!button) return;

      const action = button.dataset.attachmentAction;
      if (action === "remove-pending") {
        pendingAttachments = pendingAttachments.filter((item) => item.key !== button.dataset.attachmentKey);
        renderAttachments();
        return;
      }

      if (action === "download") downloadAttachment(button.dataset.attachmentId);
      if (action === "remove-saved") removeSavedAttachment(button.dataset.attachmentId);
    });


    elements.institutionSelect.addEventListener("change", () => {
      if (currentProfile?.role !== "admin") return;
      editingId = null;
      elements.reportStatusBadge.textContent = "Novo relatório";
      elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar relatório';
      setSaveState("Ainda não salvo");
      clearAttachments();
      renderInstitution();
    });

    elements.archiveContent.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const id = button.dataset.id;
      if (button.dataset.action === "new") resetForm();
      if (button.dataset.action === "edit") editReport(id);
      if (button.dataset.action === "print") editReport(id, true);
      if (button.dataset.action === "delete") requestDelete(id);
    });

    elements.confirmDelete.addEventListener("click", () => {
      if (deleteId) deleteReport(deleteId);
      deleteId = null;
    });

    window.addEventListener("beforeprint", () => {
      document.querySelectorAll("#report-paper textarea").forEach((textarea) => {
        textarea.dataset.previousHeight = textarea.style.height;
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    });

    window.addEventListener("afterprint", () => {
      document.querySelectorAll("#report-paper textarea").forEach((textarea) => {
        textarea.style.height = textarea.dataset.previousHeight || "";
        delete textarea.dataset.previousHeight;
      });
    });
  }

  async function initialize() {
    bindEvents();
    elements.referenceDate.value = today();
    renderAttachments();

    if (!isSupabaseConfigured()) {
      elements.loginSubmit.disabled = true;
      showAuth("Configure a Project URL e a chave publishable no início do script.js.");
      return;
    }

    try {
      supabaseClient = createSupabaseClient();
      setLoginHelp("Conexão com o Supabase configurada.");
      const storedToken = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedToken) {
        try {
          await startCustomSession(storedToken);
        } catch (_) {
          // startCustomSession já limpa e retorna à tela de login.
        }
      } else {
        showAuth();
        setLoginHelp("A autenticação é validada diretamente no banco de dados do PME.");
      }
    } catch (error) {
      console.error("[PME] Erro de inicialização:", error);
      showAuth("Não foi possível conectar ao banco de dados.");
      setLoginHelp("Verifique a configuração do Supabase e a sua conexão.");
    }
  }

  initialize();
})();
