(() => {
  "use strict";
  const SUPABASE_CONFIG = {
    url: "https://eohjotlqohffywwjntbi.supabase.co",
    anonKey: "sb_publishable_gARItAfGqd-qKFnblrtoQQ__sP14kVU"
  };

  const OTHER_RELEVANT = "Outros dados estatísticos que a instituição considere relevantes para compor o diagnóstico educacional do município";

  const DIAGNOSTIC_SCHOOL_IDS = new Set([
    "escola-mercadinho",
    "escola-monte-belo",
    "escola-abadia",
    "escola-santana",
    "escola-estiva",
    "escola-emei",
    "escola-creche",
    "escola-donacina"
  ]);

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
      category: "Ensino Fundamental",
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
      name: "Escola Municipal Antônia Pereira Rocha",
      shortName: "Antônia Pereira Rocha",
      category: "Ensino Fundamental",
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
      category: "Ensino Fundamental",
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
      category: "Ensino Fundamental",
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
      name: "Escola Municipal Núcleo da Estiva",
      shortName: "Núcleo da Estiva",
      category: "Ensino Fundamental",
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
      id: "escola-emei",
      name: "Escola Municipal Prefeito José Lemos",
      shortName: "Prefeito José Lemos",
      category: "Ensino Fundamental",
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
      category: "Ensino Fundamental",
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
      category: "Ensino Fundamental",
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
    diagnosticTab: document.querySelector("#diagnostic-tab"),
    diagnosticView: document.querySelector("#diagnostic-view"),
    diagnosticInstitutionSelect: document.querySelector("#diagnostic-institution-select"),
    diagnosticSchoolControl: document.querySelector("#diagnostic-school-control"),
    diagnosticTitle: document.querySelector("#diagnostic-title"),
    diagnosticDescription: document.querySelector("#diagnostic-description"),
    diagnosticPrivacyNote: document.querySelector("#diagnostic-privacy-note"),
    diagnosticContent: document.querySelector("#diagnostic-content"),
    printDiagnostic: document.querySelector("#print-diagnostic"),
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
  let currentDiagnosticData = null;

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
    if (!window.supabase?.createClient) throw new Error("O Bando de dados não foi carregada.");
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

  
    if (Array.isArray(value) && value.length === 1) value = value[0];

    if (typeof value === "string") {
      const trimmed = value.trim();
      if ((trimmed.startsWith("{") && trimmed.endsWith("}")) ||
          (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        try {
          value = JSON.parse(trimmed);
          if (Array.isArray(value) && value.length === 1) value = value[0];
        } catch (_) {
        }
      }
    }

    return value;
  }

  async function rpc(name, params = {}) {
    if (!supabaseClient) throw new Error("Banco de dados não inicializado.");

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
      const error = new Error("O perfil é incompatível com o sistema.");
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
        message: "Não foi possível conectar ao banco de dados. Verifique sua internet e tente novamente!"
      };
    }

    if (/could not find the function|schema cache|pgrst202|function .* does not exist/.test(combined)) {
      return {
        kind: "config",
        message: "Erro ao fazer o login!"
      };
    }

    if (/permission denied|42501|not authorized|insufficient privilege/.test(`${code} ${combined}`)) {
      return {
        kind: "config",
        message: "O Banco de dados bloqueou o acesso!"
      };
    }

    if (/crypt|pgcrypto|gen_salt/.test(combined)) {
      return {
        kind: "config",
        message: "O Banco de dados não está disponivel!"
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

  function diagnosticAllowedInstitutions() {
    if (!currentProfile) return [];
    if (currentProfile.role === "admin") {
      return institutions.filter((institution) => DIAGNOSTIC_SCHOOL_IDS.has(institution.id));
    }
    return institutions.filter(
      (institution) => institution.id === currentProfile.institution_id
        && DIAGNOSTIC_SCHOOL_IDS.has(institution.id)
    );
  }

  function populateDiagnosticInstitutions() {
    const allowed = diagnosticAllowedInstitutions();
    const enabled = allowed.length > 0;
    const isAdmin = currentProfile?.role === "admin";

    elements.diagnosticTab.hidden = !enabled;

    if (!enabled) {
      elements.diagnosticInstitutionSelect.innerHTML = "";
      elements.diagnosticSchoolControl.hidden = true;
      elements.diagnosticContent.innerHTML = '<div class="diagnostic-empty">Este acesso não possui diagnóstico de Educação Especial vinculado.</div>';
      return;
    }

    elements.diagnosticInstitutionSelect.innerHTML = allowed
      .map((institution) => `<option value="${institution.id}">${escapeHtml(institution.name)}</option>`)
      .join("");

    if (isAdmin) {
      elements.diagnosticSchoolControl.hidden = false;
      elements.diagnosticInstitutionSelect.disabled = false;
      elements.diagnosticTitle.textContent = "Diagnóstico por escola";
    } else {
      elements.diagnosticInstitutionSelect.value = currentProfile.institution_id;
      elements.diagnosticInstitutionSelect.disabled = true;
      elements.diagnosticSchoolControl.hidden = true;
      elements.diagnosticTitle.textContent = "Diagnóstico da sua escola";
      elements.diagnosticDescription.textContent = "Consulta exclusiva dos dados de Educação Especial vinculados à sua instituição.";
      elements.diagnosticPrivacyNote.textContent = "Acesso privado: somente sua escola e a administração do PME podem visualizar estes dados.";
    }
  }

  function normalizeDiagnosticStatus(value = "") {
    return String(value)
      .trim()
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function diagnosticStatusBadge(value) {
    const raw = String(value || "").trim();
    const normalized = normalizeDiagnosticStatus(raw);
    let kind = "neutral";
    let label = raw || "Sem registro";

    if (normalized.startsWith("sim")) kind = "yes";
    else if (normalized.includes("constr")) {
      kind = "building";
      label = "Em construção";
    } else if (normalized.startsWith("nao") || normalized.startsWith("não")) {
      kind = "no";
    }

    return `<span class="diagnostic-status ${kind}">${escapeHtml(label)}</span>`;
  }

  function diagnosticMetric(label, value, helper = "") {
    return `<article class="diagnostic-metric">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${helper ? `<small>${escapeHtml(helper)}</small>` : ""}
    </article>`;
  }

  function diagnosticTextKey(value = "") {
    return String(value)
      .trim()
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
  }

  function normalizeNameKey(value = "") {
    return diagnosticTextKey(value)
      .replace(/[.,;:!?()[\]{}"'`´’]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  const PORTUGUESE_NAME_PARTICLES = new Set([
    "da", "das", "de", "do", "dos", "e"
  ]);

  const PROFESSOR_CANONICAL_NAMES = new Map([
    ["terezinha amaral", "Terezinha do Amaral"],
    ["terezinha do amaral", "Terezinha do Amaral"],
    ["andrea santos", "Andréia de Fátima Santos"],
    ["andreia de fatima santos", "Andréia de Fátima Santos"],
    ["elisangela oliveira", "Elisangela Oliveira"],
    ["lisangela oliveira", "Elisangela Oliveira"]
  ]);

  function titleCasePersonName(value = "") {
    const source = String(value || "").trim().replace(/\s+/g, " ");
    if (!source) return "";

    return source
      .toLocaleLowerCase("pt-BR")
      .split(" ")
      .map((word, index) => {
        if (!word) return word;

        const match = word.match(/^([^A-Za-zÀ-ÿ]*)([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*)([^A-Za-zÀ-ÿ]*)$/);
        if (!match) return word;
        const [, prefix, cleanRaw, suffix] = match;
        const clean = cleanRaw.replace(/’/g, "'");

        if (index > 0 && PORTUGUESE_NAME_PARTICLES.has(clean)) {
          return `${prefix}${clean}${suffix}`;
        }

        const formatted = clean
          .split(/([-'])/)
          .map((part) => {
            if (part === "-" || part === "'") return part;
            if (!part) return part;
            return part.charAt(0).toLocaleUpperCase("pt-BR") + part.slice(1);
          })
          .join("");

        return `${prefix}${formatted}${suffix}`;
      })
      .join(" ");
  }

  function sentenceCaseDiagnosticDescription(value = "") {
    const source = String(value || "").trim().replace(/\s+/g, " ");
    if (!source || source === "—") return source;

    const lowered = source.toLocaleLowerCase("pt-BR");
    return lowered.charAt(0).toLocaleUpperCase("pt-BR") + lowered.slice(1);
  }

  function canonicalProfessorName(value = "") {
    const raw = String(value || "").trim();
    if (!raw) return "";

    const key = normalizeNameKey(raw);
    const canonical = PROFESSOR_CANONICAL_NAMES.get(key);
    if (canonical) return canonical;

    return titleCasePersonName(raw.replace(/[.]+$/g, ""));
  }

  function diagnosticSeriesRank(value = "") {
    const normalized = diagnosticTextKey(value);
    const fundamental = normalized.match(/\b([1-9])\s*[º°o]?\s*ano\s+fundamental/);
    if (fundamental) return Number(fundamental[1]) * 100;

    if (normalized.includes("bercario")) {
      if (normalized.includes("0 a 1")) return 1000;
      if (normalized.includes("1 a 2")) return 1010;
      if (/\b(ii|ll|2)\b/.test(normalized)) return 1010;
      if (/\b(i|1)\b/.test(normalized)) return 1000;
      return 1005;
    }

    if (normalized.includes("maternal")) {
      if (normalized.includes("1 a 2")) return 1010;
      if (normalized.includes("2 a 3")) return 1020;
      if (normalized.includes("3 a 4")) return 1030;
      if (/\b(i|1)\b/.test(normalized)) return 1010;
      if (/\b(ii|ll|2)\b/.test(normalized)) return 1020;
      if (/\b(iii|lll|3)\b/.test(normalized)) return 1030;
      return 1090;
    }

    if (/\b1\s*[º°o]?\s*periodo\b/.test(normalized)) return 1110;
    if (/\b2\s*[º°o]?\s*periodo\b/.test(normalized)) return 1120;

    return 9999;
  }

  function diagnosticProfessorName(student = {}) {
    const raw = String(student.professor_ee_nome || "").trim();
    const normalized = diagnosticTextKey(raw);

    const semProfessor = !raw
      || normalized === "nao"
      || normalized === "nao possui"
      || normalized === "nao possui professor"
      || normalized === "sem professor"
      || normalized === "sem professor de educacao especial"
      || normalized === "sem professor de apoio"
      || normalized === "n/a";

    return semProfessor ? "Sem professor de apoio" : canonicalProfessorName(raw);
  }

  function diagnosticHasSupportTeacher(student = {}) {
    const flag = diagnosticTextKey(student.tem_professor_ee || "");
    const professor = diagnosticProfessorName(student);

    if (
      flag === "nao"
      || flag.startsWith("nao ")
      || flag === "n/a"
      || flag === "sem professor"
      || flag === "sem professor de apoio"
    ) {
      return false;
    }

    return professor !== "Sem professor de apoio";
  }

  function splitDiagnosticStudents(students = []) {
    return students.reduce((result, student) => {
      if (diagnosticHasSupportTeacher(student)) {
        result.withSupport.push(student);
      } else {
        result.inclusive.push(student);
      }
      return result;
    }, { withSupport: [], inclusive: [] });
  }

  function groupDiagnosticStudents(students = []) {
    const sorted = [...students].sort((a, b) => {
      const seriesDifference = diagnosticSeriesRank(a.serie) - diagnosticSeriesRank(b.serie);
      if (seriesDifference !== 0) return seriesDifference;

      const seriesName = String(a.serie || "").localeCompare(String(b.serie || ""), "pt-BR", { sensitivity: "base" });
      if (seriesName !== 0) return seriesName;

      const professorA = diagnosticProfessorName(a);
      const professorB = diagnosticProfessorName(b);
      const professorDifference = professorA === "Sem professor de apoio"
        ? 1
        : professorB === "Sem professor de apoio"
          ? -1
          : professorA.localeCompare(professorB, "pt-BR", { sensitivity: "base" });

      if (professorDifference !== 0) return professorDifference;

      return titleCasePersonName(a.nome_aluno || "").localeCompare(titleCasePersonName(b.nome_aluno || ""), "pt-BR", { sensitivity: "base" });
    });

    const seriesGroups = [];

    for (const student of sorted) {
      const seriesLabel = diagnosticCanonicalSeries(student.serie);
      const seriesKey = diagnosticTextKey(seriesLabel);

      let seriesGroup = seriesGroups.find((group) => group.key === seriesKey);
      if (!seriesGroup) {
        seriesGroup = {
          key: seriesKey,
          label: seriesLabel,
          rank: diagnosticSeriesRank(seriesLabel),
          professors: []
        };
        seriesGroups.push(seriesGroup);
      }

      const professorLabel = diagnosticProfessorName(student);
      const professorKey = normalizeNameKey(professorLabel);

      let professorGroup = seriesGroup.professors.find((group) => group.key === professorKey);
      if (!professorGroup) {
        professorGroup = {
          key: professorKey,
          label: professorLabel,
          students: []
        };
        seriesGroup.professors.push(professorGroup);
      }

      professorGroup.students.push(student);
    }

    return seriesGroups;
  }

  function diagnosticStudentRows(students = []) {
    return students.map((student) => `
      <tr>
        <td class="student-name">${escapeHtml(titleCasePersonName(student.nome_aluno || ""))}</td>
        <td>${diagnosticStatusBadge(student.laudo)}</td>
        <td>${escapeHtml(student.cid || "—")}</td>
        <td class="diagnostic-description">${escapeHtml(sentenceCaseDiagnosticDescription(student.descricao_laudo || "—"))}</td>
        <td>${escapeHtml(student.serie || "—")}</td>
        <td>${diagnosticStatusBadge(student.pei)}</td>
        <td>${diagnosticStatusBadge(student.pdi)}</td>
        <td>${diagnosticStatusBadge(student.pai)}</td>
        <td>${diagnosticStatusBadge(student.estudo_caso)}</td>
      </tr>
    `).join("");
  }


  function diagnosticStudentSummaryMeta(student = {}) {
    const items = [
      { label: diagnosticSeriesFieldLabel(), value: diagnosticCanonicalSeries(student.serie) || "—" },
      { label: "CID", value: student.cid || "—" }
    ];

    return items.map((item) => `
      <div class="student-meta-chip">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>
    `).join("");
  }

  function diagnosticStudentPlans(student = {}) {
    const items = [
      { label: "PEI", value: student.pei },
      { label: "PDI", value: student.pdi },
      { label: "PAI", value: student.pai },
      { label: "Estudo de caso", value: student.estudo_caso }
    ];

    return items.map((item) => `
      <div class="student-plan-item">
        <span>${escapeHtml(item.label)}</span>
        ${diagnosticStatusBadge(item.value)}
      </div>
    `).join("");
  }

  function diagnosticStudentCard(student = {}) {
    const anchor = String(student.__pmeDiagnosticAnchor || "");
    return `
      <article class="diagnostic-student-card"${anchor ? ` id="${escapeHtml(anchor)}"` : ""}>
        <header class="student-card-header">
          <div class="student-card-title">
            <span class="eyebrow">Aluno</span>
            <h5>${escapeHtml(titleCasePersonName(student.nome_aluno || ""))}</h5>
          </div>
          <div class="student-card-flags">
            <div class="student-inline-status">
              <span>Laudo</span>
              ${diagnosticStatusBadge(student.laudo)}
            </div>
          </div>
        </header>

        <div class="student-card-meta">
          ${diagnosticStudentSummaryMeta(student)}
        </div>

        <section class="student-card-description">
          <span>Descrição do laudo</span>
          <p>${escapeHtml(sentenceCaseDiagnosticDescription(student.descricao_laudo || "—"))}</p>
        </section>

        <section class="student-card-plans">
          ${diagnosticStudentPlans(student)}
        </section>
      </article>
    `;
  }

  function diagnosticStudentCards(students = []) {
    if (!students.length) {
      return '<div class="diagnostic-empty">Nenhum estudante registrado.</div>';
    }

    return `
      <div class="diagnostic-student-grid">
        ${students.map((student) => diagnosticStudentCard(student)).join("")}
      </div>
    `;
  }

  function diagnosticStudentTable(students = []) {
    return diagnosticStudentCards(students);
  }

  function diagnosticGroupedStudentsMarkup(students = []) {
    const seriesGroups = groupDiagnosticStudents(students);

    if (!seriesGroups.length) {
      return '<div class="diagnostic-empty">Nenhum estudante registrado.</div>';
    }

    return seriesGroups.map((seriesGroup) => `
      <section class="diagnostic-series-group">
        <header class="diagnostic-series-header">
          <div>
            <span class="eyebrow">Série</span>
            <h4>${escapeHtml(seriesGroup.label)}</h4>
          </div>
          <span class="diagnostic-series-count">${seriesGroup.professors.reduce((total, professor) => total + professor.students.length, 0)} aluno(s)</span>
        </header>

        <div class="diagnostic-professor-list">
          ${seriesGroup.professors.map((professorGroup) => `
            <article class="diagnostic-professor-group">
              <header class="diagnostic-professor-header">
                <div class="diagnostic-professor-title">
                  <div>
                    <span>Professor(a) de Educação Especial</span>
                    <strong>${escapeHtml(professorGroup.label)}</strong>
                  </div>
                </div>
                <span class="diagnostic-professor-count">${professorGroup.students.length} ${professorGroup.students.length === 1 ? "aluno" : "alunos"}</span>
              </header>
              ${diagnosticStudentTable(professorGroup.students)}
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  function groupInclusiveStudentsBySeries(students = []) {
    const sorted = [...students].sort((a, b) => {
      const rankDifference = diagnosticSeriesRank(a.serie) - diagnosticSeriesRank(b.serie);
      if (rankDifference !== 0) return rankDifference;

      const seriesDifference = String(a.serie || "").localeCompare(
        String(b.serie || ""),
        "pt-BR",
        { sensitivity: "base" }
      );
      if (seriesDifference !== 0) return seriesDifference;

      return titleCasePersonName(a.nome_aluno || "").localeCompare(
        titleCasePersonName(b.nome_aluno || ""),
        "pt-BR",
        { sensitivity: "base" }
      );
    });

    const groups = [];

    for (const student of sorted) {
      const label = diagnosticCanonicalSeries(student.serie);
      const key = diagnosticTextKey(label);

      let group = groups.find((item) => item.key === key);
      if (!group) {
        group = {
          key,
          label,
          rank: diagnosticSeriesRank(label),
          students: []
        };
        groups.push(group);
      }

      group.students.push(student);
    }

    return groups;
  }

  function diagnosticInclusiveMarkup(students = []) {
    const seriesGroups = groupInclusiveStudentsBySeries(students);

    if (!seriesGroups.length) {
      return `
        <div class="inclusive-empty">
          <strong>Nenhum aluno em Educação Inclusiva</strong>
          <span>Todos os estudantes registrados nesta escola possuem professor de apoio.</span>
        </div>
      `;
    }

    return seriesGroups.map((seriesGroup) => `
      <section class="inclusive-series-group">
        <header class="inclusive-series-header">
          <div>
            <span class="eyebrow">Ano / série</span>
            <h4>${escapeHtml(seriesGroup.label)}</h4>
          </div>
          <span class="inclusive-series-count">
            ${seriesGroup.students.length}
            ${seriesGroup.students.length === 1 ? "aluno" : "alunos"}
          </span>
        </header>

        ${diagnosticStudentTable(seriesGroup.students)}
      </section>
    `).join("");
  }

  function diagnosticInitialYear(value = "") {
    const normalized = diagnosticTextKey(value);
    const match = normalized.match(/\b([1-5])\s*(?:º|°|o)?\s*ano\b/);
    return match ? Number(match[1]) : null;
  }

  const EMEI_PRESCHOOL_STAGES = [
    { key: "bercario-1", label: "Berçário I", age: "0 a 1 anos" },
    { key: "bercario-2", label: "Berçário II", age: "1 a 2 anos" },
    { key: "maternal-2", label: "Maternal II", age: "2 a 3 anos" },
    { key: "maternal-3", label: "Maternal III", age: "3 a 4 anos" },
    { key: "periodo-1", label: "1º Período", age: "4 a 5 anos" },
    { key: "periodo-2", label: "2º Período", age: "5 a 6 anos" }
  ];

  const CRECHE_PRESCHOOL_STAGES = [
    { key: "bercario-1", label: "Berçário I", age: "0 a 1 anos" },
    { key: "bercario-2", label: "Berçário II", age: "1 a 2 anos" },
    { key: "maternal-2", label: "Maternal II", age: "2 a 3 anos" }
  ];

  function diagnosticEmeiStage(value = "") {
    const normalized = diagnosticTextKey(value);

    if (/\bbercario\s*(ii|2)\b/.test(normalized) || normalized.includes("1 a 2")) return "bercario-2";
    if (/\bbercario\s*(i|1)\b/.test(normalized) || normalized.includes("0 a 1")) return "bercario-1";
    if (/\bmaternal\s*(iii|3)\b/.test(normalized) || (normalized.includes("maternal") && normalized.includes("3 a 4"))) return "maternal-3";
    if (/\bmaternal\s*(ii|2)\b/.test(normalized) || (normalized.includes("maternal") && normalized.includes("2 a 3"))) return "maternal-2";
    if (/\b2\s*(?:º|°|o)?\s*periodo\b/.test(normalized) || normalized.includes("5 a 6")) return "periodo-2";
    if (/\b1\s*(?:º|°|o)?\s*periodo\b/.test(normalized) || normalized.includes("4 a 5")) return "periodo-1";

    return null;
  }

  function diagnosticEarlyChildhoodStages(institutionId = "") {
    if (institutionId === "escola-emei") return EMEI_PRESCHOOL_STAGES;
    if (institutionId === "escola-creche") return CRECHE_PRESCHOOL_STAGES;
    return null;
  }

  function diagnosticCanonicalSeries(value = "", institutionId = elements.diagnosticInstitutionSelect?.value || "") {
    const stages = diagnosticEarlyChildhoodStages(institutionId);
    if (!stages) return String(value || "Série não informada").trim() || "Série não informada";

    const stageKey = diagnosticEmeiStage(value);
    const stage = stages.find((item) => item.key === stageKey);
    return stage?.label || String(value || "Etapa não informada").trim() || "Etapa não informada";
  }

  function diagnosticSeriesFieldLabel(institutionId = elements.diagnosticInstitutionSelect?.value || "") {
    return diagnosticEarlyChildhoodStages(institutionId) ? "Etapa" : "Série";
  }

  function diagnosticEmeiStagesMarkup(students = []) {
    const counts = Object.fromEntries(EMEI_PRESCHOOL_STAGES.map((stage) => [stage.key, 0]));

    students.forEach((student) => {
      const stage = diagnosticEmeiStage(student.serie);
      if (stage && counts[stage] !== undefined) counts[stage] += 1;
    });

    return `
      <section class="diagnostic-section initial-years-section preschool-stages-section">
        <div class="diagnostic-section-heading initial-years-heading">
          <span class="eyebrow">Educação Infantil</span>
          <h3>Alunos por etapa</h3>
          <p>Quantidade de alunos do levantamento da EMEI, organizada por período e faixa etária.</p>
        </div>
        <div class="initial-years-grid is-preschool">
          ${EMEI_PRESCHOOL_STAGES.map((stage) => `
            <article class="initial-year-card preschool-stage-card">
              <span class="initial-year-label">${escapeHtml(stage.label)}</span>
              <span class="initial-year-age">${escapeHtml(stage.age)}</span>
              <strong>${counts[stage.key]}</strong>
              <small>${counts[stage.key] === 1 ? "aluno" : "alunos"}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function diagnosticCrecheStagesMarkup(students = []) {
    const counts = Object.fromEntries(CRECHE_PRESCHOOL_STAGES.map((stage) => [stage.key, 0]));

    students.forEach((student) => {
      const stage = diagnosticEmeiStage(student.serie);
      if (stage && counts[stage] !== undefined) counts[stage] += 1;
    });

    return `
      <section class="diagnostic-section initial-years-section preschool-stages-section">
        <div class="diagnostic-section-heading initial-years-heading">
          <span class="eyebrow">Educação Infantil</span>
          <h3>Alunos por etapa</h3>
          <p>Quantidade de alunos do levantamento da Creche Mestra Zefina, organizada por etapa e faixa etária.</p>
        </div>
        <div class="initial-years-grid is-preschool is-creche">
          ${CRECHE_PRESCHOOL_STAGES.map((stage) => `
            <article class="initial-year-card preschool-stage-card">
              <span class="initial-year-label">${escapeHtml(stage.label)}</span>
              <span class="initial-year-age">${escapeHtml(stage.age)}</span>
              <strong>${counts[stage.key]}</strong>
              <small>${counts[stage.key] === 1 ? "aluno" : "alunos"}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function diagnosticInitialYearsMarkup(students = [], institutionId = "") {
    if (institutionId === "escola-emei") {
      return diagnosticEmeiStagesMarkup(students);
    }

    if (institutionId === "escola-creche") {
      return diagnosticCrecheStagesMarkup(students);
    }

    const counts = [1, 2, 3, 4, 5].reduce((result, year) => {
      result[year] = 0;
      return result;
    }, {});

    students.forEach((student) => {
      const year = diagnosticInitialYear(student.serie);
      if (year && counts[year] !== undefined) counts[year] += 1;
    });

    return `
      <section class="diagnostic-section initial-years-section">
        <div class="diagnostic-section-heading initial-years-heading">
          <span class="eyebrow">Anos iniciais</span>
          <h3>Alunos por ano</h3>
        </div>
        <div class="initial-years-grid">
          ${[1, 2, 3, 4, 5].map((year) => `
            <article class="initial-year-card">
              <span class="initial-year-label">${year}º ano</span>
              <strong>${counts[year]}</strong>
              <small>${counts[year] === 1 ? "aluno" : "alunos"}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function prepareDiagnosticStudentAnchors(students = []) {
    students.forEach((student, index) => {
      student.__pmeDiagnosticAnchor = `diagnostic-student-${index + 1}`;
    });
  }

  function diagnosticStudentJumpMarkup(students = []) {
    if (!students.length) return "";

    const options = students
      .map((student) => ({
        anchor: student.__pmeDiagnosticAnchor || "",
        name: titleCasePersonName(student.nome_aluno || "Aluno sem nome") || "Aluno sem nome",
        series: diagnosticInstrumentStudentYear(student)
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));

    return `
      <div class="diagnostic-student-jump print-hidden">
        <div class="diagnostic-student-jump-copy">
          <span class="diagnostic-student-jump-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <circle cx="11" cy="11" r="6.25"></circle>
              <path d="M15.7 15.7 20 20"></path>
            </svg>
          </span>
          <span class="eyebrow">Localizar aluno</span>
        </div>
        <label class="diagnostic-student-jump-control" for="diagnostic-student-select">
          <span>Aluno</span>
          <div class="diagnostic-student-select-shell">
            <span class="diagnostic-student-select-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <circle cx="11" cy="11" r="6.25"></circle>
                <path d="M15.7 15.7 20 20"></path>
              </svg>
            </span>
            <select id="diagnostic-student-select" aria-label="Localizar aluno no diagnóstico">
              <option value="">Selecione um aluno</option>
              ${options.map((item) => `<option value="${escapeHtml(item.anchor)}">${escapeHtml(item.name)}${item.series ? ` · ${escapeHtml(item.series)}` : ""}</option>`).join("")}
            </select>
          </div>
        </label>
      </div>
    `;
  }

  function handleDiagnosticStudentJump(event) {
    const select = event.target.closest?.("#diagnostic-student-select");
    if (!select) return;

    const anchor = select.value;
    if (!anchor) return;

    const card = document.getElementById(anchor);
    if (!card) return;

    document.querySelectorAll(".diagnostic-student-card.is-jump-target")
      .forEach((item) => item.classList.remove("is-jump-target"));

    card.classList.add("is-jump-target");
    card.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => card.classList.remove("is-jump-target"), 2200);
  }

  const INSTRUMENT_FIELDS = {
    pei: { label: "PEI", field: "pei" },
    pdi: { label: "PDI", field: "pdi" },
    pai: { label: "PAI", field: "pai" },
    estudo_caso: { label: "EC", field: "ec" }
  };

  const INSTRUMENT_STATUS_LABELS = {
    sim: "Sim",
    construcao: "Em construção",
    outros: "Não/sem registro"
  };

  function diagnosticInstrumentStatusKind(value = "") {
    const normalized = normalizeDiagnosticStatus(value);
    if (normalized.startsWith("sim")) return "sim";
    if (normalized.includes("constr")) return "construcao";
    return "outros";
  }

  function instrumentCard(title, data = {}, instrumentKey = "") {
    const statuses = [
      { key: "sim", label: "Sim", count: Number(data.sim || 0) },
      { key: "construcao", label: "Em construção", count: Number(data.construcao || 0) },
      { key: "outros", label: "Não/sem registro", count: Number(data.outros || 0) }
    ];

    return `<article class="instrument-card" data-instrument-card="${escapeHtml(instrumentKey)}">
      <strong>${escapeHtml(title)}</strong>
      <div class="instrument-stats">
        ${statuses.map((status) => `
          <button
            class="instrument-status-button"
            type="button"
            data-instrument="${escapeHtml(instrumentKey)}"
            data-instrument-status="${status.key}"
            aria-expanded="false"
            aria-controls="instrument-student-popover"
          >
            <b>${status.count}</b>
            <span>${escapeHtml(status.label)}</span>
            <span class="instrument-status-chevron" aria-hidden="true">›</span>
          </button>
        `).join("")}
      </div>
    </article>`;
  }

  function diagnosticInstrumentStudentYear(student = {}) {
    const institutionId = elements.diagnosticInstitutionSelect?.value || "";
    if (diagnosticEarlyChildhoodStages(institutionId)) {
      return diagnosticCanonicalSeries(student.serie, institutionId);
    }

    const initialYear = diagnosticInitialYear(student.serie);
    if (initialYear) return `${initialYear}º ano`;
    return String(student.serie || "Não informado").trim() || "Não informado";
  }

  function diagnosticInstrumentStudents(instrumentKey = "", statusKey = "") {
    const students = Array.isArray(currentDiagnosticData?.students) ? currentDiagnosticData.students : [];
    const config = INSTRUMENT_FIELDS[instrumentKey];
    if (!config || !INSTRUMENT_STATUS_LABELS[statusKey]) return [];

    return students
      .filter((student) => diagnosticInstrumentStatusKind(student?.[config.field]) === statusKey)
      .sort((a, b) => {
        const yearDifference = diagnosticSeriesRank(a.serie) - diagnosticSeriesRank(b.serie);
        if (yearDifference !== 0) return yearDifference;
        return titleCasePersonName(a.nome_aluno || "").localeCompare(
          titleCasePersonName(b.nome_aluno || ""),
          "pt-BR",
          { sensitivity: "base" }
        );
      });
  }

  function diagnosticInstrumentStudentCards(students = []) {
    if (!students.length) {
      return `
        <div class="instrument-popover-empty">
          <strong>Nenhum aluno nesta etapa</strong>
          <span>Não há estudantes registrados com esta situação.</span>
        </div>
      `;
    }

    return students.map((student) => `
      <article class="instrument-student-mini-card">
        <strong>${escapeHtml(titleCasePersonName(student.nome_aluno || "Aluno sem nome") || "Aluno sem nome")}</strong>
        <div class="instrument-student-mini-meta">
          <span>
            <small>${escapeHtml(diagnosticEarlyChildhoodStages(elements.diagnosticInstitutionSelect?.value || "") ? "Etapa" : "Ano inicial")}</small>
            <b>${escapeHtml(diagnosticInstrumentStudentYear(student))}</b>
          </span>
          <span>
            <small>Professora</small>
            <b>${escapeHtml(diagnosticProfessorName(student))}</b>
          </span>
        </div>
      </article>
    `).join("");
  }

  function closeDiagnosticInstrumentPopover() {
    const popover = document.querySelector("#instrument-student-popover");
    if (!popover) return;

    popover.hidden = true;
    popover.innerHTML = "";
    document.querySelectorAll(".instrument-status-button.is-active").forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-expanded", "false");
    });
  }

  function handleDiagnosticInstrumentClick(event) {
    const closeButton = event.target.closest?.("[data-close-instrument-popover]");
    if (closeButton) {
      closeDiagnosticInstrumentPopover();
      return;
    }

    const button = event.target.closest?.(".instrument-status-button");
    if (!button) return;

    const instrumentKey = button.dataset.instrument || "";
    const statusKey = button.dataset.instrumentStatus || "";
    const config = INSTRUMENT_FIELDS[instrumentKey];
    const statusLabel = INSTRUMENT_STATUS_LABELS[statusKey];
    const popover = document.querySelector("#instrument-student-popover");
    if (!config || !statusLabel || !popover) return;

    const wasActive = button.classList.contains("is-active") && !popover.hidden;
    document.querySelectorAll(".instrument-status-button.is-active").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-expanded", "false");
    });

    if (wasActive) {
      popover.hidden = true;
      popover.innerHTML = "";
      return;
    }

    const students = diagnosticInstrumentStudents(instrumentKey, statusKey);
    button.classList.add("is-active");
    button.setAttribute("aria-expanded", "true");

    popover.innerHTML = `
      <div class="instrument-popover-header">
        <div>
          <span class="eyebrow">${escapeHtml(config.label)}</span>
          <h4>${escapeHtml(statusLabel)}</h4>
          <p>${students.length} ${students.length === 1 ? "aluno" : "alunos"} nesta etapa</p>
        </div>
        <button class="instrument-popover-close" type="button" data-close-instrument-popover aria-label="Fechar lista de alunos">×</button>
      </div>
      <div class="instrument-popover-student-list">
        ${diagnosticInstrumentStudentCards(students)}
      </div>
    `;
    popover.hidden = false;
    popover.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderDiagnostic(data) {
    const school = data?.school || {};
    const summary = data?.summary || {};
    const students = Array.isArray(data?.students) ? data.students : [];
    prepareDiagnosticStudentAnchors(students);
    const separated = splitDiagnosticStudents(students);
    const studentsWithSupport = separated.withSupport;
    const inclusiveStudents = separated.inclusive;

    const uniqueProfessors = new Set(
      studentsWithSupport
        .map((student) => diagnosticProfessorName(student))
        .filter((name) => name !== "Sem professor de apoio")
        .map((name) => diagnosticTextKey(name))
    ).size;

    elements.diagnosticContent.innerHTML = `
      <header class="diagnostic-report-header">
        <div>
          <span class="eyebrow">Diagnóstico da Educação Especial</span>
          <h2>${escapeHtml(school.nome || "Escola")}</h2>
          <p>Plano Municipal de Educação 2026–2036 · Carbonita/MG</p>
        </div>
        <span class="diagnostic-source">Levantamento da Educação Especial</span>
      </header>

      <section class="diagnostic-identification">
        <div>
          <span>Responsável pela escola</span>
          <strong>${escapeHtml([school.responsavel_escola_tipo, school.responsavel_escola_nome].filter(Boolean).join(": ") || "—")}</strong>
        </div>
        <div>
          <span>Responsável pedagógico</span>
          <strong>${escapeHtml([school.responsavel_pedagogico_tipo, school.responsavel_pedagogico_nome].filter(Boolean).join(": ") || "—")}</strong>
        </div>
      </section>

      ${diagnosticInitialYearsMarkup(students, elements.diagnosticInstitutionSelect.value)}

      <section class="diagnostic-metrics">
        ${diagnosticMetric("Alunos no levantamento", Number(summary.total || students.length))}
        ${diagnosticMetric("Educação Especial", studentsWithSupport.length, "Com professor de apoio")}
        ${diagnosticMetric("Educação Inclusiva", inclusiveStudents.length, "Sem professor de apoio")}
        ${diagnosticMetric("Professores de apoio", uniqueProfessors)}
      </section>

      <section class="diagnostic-section">
        <div class="diagnostic-section-heading">
          <span class="eyebrow">Acompanhamento</span>
          <h3>Analise Individualizada</h3>
        </div>
        <div class="instrument-grid">
          ${instrumentCard("PEI", summary.pei, "pei")}
          ${instrumentCard("PDI", summary.pdi, "pdi")}
          ${instrumentCard("PAI", summary.pai, "pai")}
          ${instrumentCard("Estudo de caso", summary.estudo_caso, "estudo_caso")}
        </div>
        <div class="instrument-student-popover" id="instrument-student-popover" hidden aria-live="polite"></div>
        ${diagnosticStudentJumpMarkup(students)}
      </section>

      <section class="diagnostic-section students-section support-section">
        <div class="diagnostic-section-heading">
          <span class="eyebrow">Educação Especial</span>
        </div>

        <div class="diagnostic-student-groups">
          ${diagnosticGroupedStudentsMarkup(studentsWithSupport)}
        </div>
      </section>

      <section class="diagnostic-section inclusive-education-section">
        <div class="inclusive-section-heading">
          <div>
            <span class="eyebrow">Educação Inclusiva</span>
          </div>
          <span class="inclusive-total">
            ${inclusiveStudents.length} ${inclusiveStudents.length === 1 ? "aluno" : "alunos"}
          </span>
        </div>

        <div class="inclusive-student-groups">
          ${diagnosticInclusiveMarkup(inclusiveStudents)}
        </div>
      </section>
    `;
  }

  async function loadDiagnostic() {
    const institutionId = elements.diagnosticInstitutionSelect.value;
    if (!institutionId || !sessionToken) return;

    currentDiagnosticData = null;
    elements.diagnosticContent.innerHTML = '<div class="diagnostic-loading">Carregando diagnóstico…</div>';

    try {
      const data = await rpc("pme_diagnostico_educacao_especial", {
        p_token: sessionToken,
        p_institution_id: institutionId
      });
      currentDiagnosticData = data;
      renderDiagnostic(data);
    } catch (error) {
      console.error("[PME] Erro ao carregar diagnóstico:", error);
      elements.diagnosticContent.innerHTML = `
        <div class="diagnostic-empty">
          <strong>Não foi possível carregar o diagnóstico.</strong>
          <span>${escapeHtml(error?.message || "Verifique se o SQL do diagnóstico foi executado no Supabase.")}</span>
        </div>
      `;
    }
  }

  function printDiagnosticView() {
    document.body.classList.add("printing-diagnostic");
    window.print();
  }

  function applyProfileToInterface() {
    elements.accountName.textContent = currentProfile.nome || currentProfile.username || "Usuário";
    elements.accountRole.textContent = currentProfile.role === "admin" ? "Administração PME" : "Acesso institucional";
    elements.exportData.hidden = currentProfile.role !== "admin";
    elements.archiveDescription.textContent = currentProfile.role === "admin"
      ? "Consulte os relatórios enviados por todas as instituições."
      : "Consulte e atualize os relatórios da sua instituição.";
    populateInstitutionsForProfile();
    populateDiagnosticInstitutions();
    renderInstitution();
  }

  async function startCustomSession(token, profilePayload = null) {
    sessionToken = token;
    try {
      const payload = normalizeRpcPayload(profilePayload || await rpc("pme_validar_sessao", { p_token: token }));
      currentProfile = profileFromPayload(payload);

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
      setLoginHelp("Entre com o usuário e a senha fornecidos pela Secretaria de Educação");
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
    const archive = view === "archive";
    const diagnostic = view === "diagnostic";

    elements.editorView.hidden = !editor;
    elements.archiveView.hidden = !archive;
    elements.diagnosticView.hidden = !diagnostic;

    elements.editorView.classList.toggle("hidden", !editor);
    elements.archiveView.classList.toggle("hidden", !archive);
    elements.diagnosticView.classList.toggle("hidden", !diagnostic);

    elements.editorTab.classList.toggle("active", editor);
    elements.archiveTab.classList.toggle("active", archive);
    elements.diagnosticTab.classList.toggle("active", diagnostic);

    elements.editorTab.toggleAttribute("aria-current", editor);
    elements.archiveTab.toggleAttribute("aria-current", archive);
    elements.diagnosticTab.toggleAttribute("aria-current", diagnostic);

    if (archive) renderArchive();
    if (diagnostic) loadDiagnostic();
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
    elements.diagnosticTab.addEventListener("click", () => showView("diagnostic"));
    elements.diagnosticInstitutionSelect.addEventListener("change", loadDiagnostic);
    elements.diagnosticContent.addEventListener("change", handleDiagnosticStudentJump);
    elements.diagnosticContent.addEventListener("click", handleDiagnosticInstrumentClick);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDiagnosticInstrumentPopover();
    });
    elements.printDiagnostic.addEventListener("click", printDiagnosticView);
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
      document.body.classList.remove("printing-diagnostic");
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
        }
      } else {
        showAuth();
        setLoginHelp("Entre com o usuário e a senha fornecidos pela Secretaria de Educação");
      }
    } catch (error) {
      console.error("[PME] Erro de inicialização:", error);
      showAuth("Não foi possível conectar ao banco de dados.");
      setLoginHelp("Verifique a configuração do Supabase e a sua conexão.");
    }
  }

  initialize();
})();
