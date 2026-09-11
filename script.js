(() => {
  "use strict";
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
      category: "Secretaria Municipal",
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
      category: "Secretaria Municipal",
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
      category: "Secretaria Municipal",
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
      category: "Ensino Médio",
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
      category: "Educação Técnica e Profissional",
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
      category: "Educação Superior",
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
    loginEmail: document.querySelector("#login-email"),
    loginPassword: document.querySelector("#login-password"),
    loginSubmit: document.querySelector("#login-submit"),
    loginError: document.querySelector("#login-error"),
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
    toastRegion: document.querySelector("#toast-region")
  };

  let supabaseClient = null;
  let currentSession = null;
  let currentProfile = null;
  let reports = [];
  let editingId = null;
  let deleteId = null;

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
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
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

  function showLoginError(message = "") {
    elements.loginError.textContent = message;
    elements.loginError.hidden = !message;
  }

  function showAuth(message = "") {
    currentSession = null;
    currentProfile = null;
    elements.appShell.hidden = true;
    elements.authView.hidden = false;
    showLoginError(message);
    elements.loginPassword.value = "";
  }

  function showApp() {
    elements.authView.hidden = true;
    elements.appShell.hidden = false;
  }

  async function loadProfile(userId) {
    const { data, error } = await supabaseClient
      .from("pme_usuarios")
      .select("user_id,nome,role,institution_id,active")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Seu usuário ainda não foi vinculado a uma instituição.");
    if (!data.active) throw new Error("Este acesso está desativado. Procure a coordenação do PME.");
    if (!["admin", "instituicao"].includes(data.role)) throw new Error("Perfil de acesso inválido.");
    return data;
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
    elements.accountName.textContent = currentProfile.nome || currentSession.user.email || "Usuário";
    elements.accountRole.textContent = currentProfile.role === "admin" ? "Administração PME" : "Acesso institucional";
    elements.exportData.hidden = currentProfile.role !== "admin";
    elements.archiveDescription.textContent = currentProfile.role === "admin"
      ? "Consulte os relatórios enviados por todas as instituições."
      : "Consulte e atualize os relatórios da sua instituição.";
    populateInstitutionsForProfile();
    renderInstitution();
  }

  async function startAuthenticatedSession(session) {
    currentSession = session;
    try {
      currentProfile = await loadProfile(session.user.id);
      applyProfileToInterface();
      showApp();
      elements.referenceDate.value = today();
      updatePrintDate();
      setSaveState("Conectando ao banco…", true);
      await loadReports();
      setSaveState("Pronto para salvar");
    } catch (error) {
      console.error(error);
      await supabaseClient.auth.signOut();
      showAuth(error.message || "Não foi possível validar seu acesso.");
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    showLoginError();
    elements.loginSubmit.disabled = true;
    elements.loginSubmit.textContent = "Entrando…";

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: elements.loginEmail.value.trim(),
        password: elements.loginPassword.value
      });
      if (error) throw error;
      if (!data.session) throw new Error("Não foi possível iniciar a sessão.");
      await startAuthenticatedSession(data.session);
    } catch (error) {
      console.error(error);
      showLoginError("E-mail ou senha inválidos, ou acesso ainda não autorizado.");
    } finally {
      elements.loginSubmit.disabled = false;
      elements.loginSubmit.textContent = "Entrar";
    }
  }

  async function handleLogout() {
    elements.logoutButton.disabled = true;
    try {
      await supabaseClient.auth.signOut();
    } finally {
      reports = [];
      editingId = null;
      elements.reportCount.textContent = "0";
      elements.logoutButton.disabled = false;
      showAuth();
    }
  }

  async function loadReports() {
    const { data, error } = await supabaseClient
      .from("pme_relatorios")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    reports = data || [];
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
    elements.saveReport.disabled = busy || !currentSession;
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

  function buildResponseRows(reportId) {
    const institution = getInstitution();
    const fields = collectFields();
    return institution.fields.map((field, index) => ({
      report_id: reportId,
      institution_id: institution.id,
      field_id: field.id,
      field_group: field.group || null,
      question: field.label,
      answer: fields[field.id] || "",
      sort_order: index + 1
    }));
  }

  async function saveCurrentReport() {
    if (!currentSession || !currentProfile) {
      toast("Sua sessão expirou. Entre novamente.", "error");
      showAuth("Sua sessão expirou. Entre novamente.");
      return;
    }

    const institution = getInstitution();
    if (currentProfile.role !== "admin" && institution.id !== currentProfile.institution_id) {
      toast("Você não tem permissão para salvar dados de outra instituição.", "error");
      return;
    }

    const progress = progressState();
    const metadata = {
      institution_id: institution.id,
      institution_name: institution.name,
      institution_category: institution.category,
      responsible: elements.responsible.value.trim(),
      reference_date: elements.referenceDate.value || today(),
      status: progress.status,
      completed_fields: progress.completed,
      total_fields: progress.total
    };

    setSaveState("Salvando no banco…", true);

    try {
      if (editingId) {
        const { data, error } = await supabaseClient
          .from("pme_relatorios")
          .update(metadata)
          .eq("id", editingId)
          .select()
          .single();
        if (error) throw error;
        if (!data) throw new Error("Relatório não encontrado.");
      } else {
        const { data, error } = await supabaseClient
          .from("pme_relatorios")
          .insert({ ...metadata, created_by: currentSession.user.id })
          .select()
          .single();
        if (error) throw error;
        editingId = data.id;
      }

      const responseRows = buildResponseRows(editingId);
      const { error: responseError } = await supabaseClient
        .from("pme_respostas")
        .upsert(responseRows, { onConflict: "report_id,field_id" });
      if (responseError) throw responseError;

      const now = new Date().toISOString();
      elements.reportStatusBadge.textContent = progress.status;
      elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar alterações';
      setSaveState(`Sincronizado · ${formatDateTime(now)}`);
      toast("Relatório salvo com segurança.");
      await loadReports();
    } catch (error) {
      console.error(error);
      setSaveState("Não foi possível sincronizar");
      toast("Não foi possível salvar. Verifique sua conexão ou permissão de acesso.", "error");
    }
  }

  async function editReport(id, printAfter = false) {
    const report = reports.find((item) => String(item.id) === String(id));
    if (!report) return;

    try {
      const { data: answers, error } = await supabaseClient
        .from("pme_respostas")
        .select("field_id,answer")
        .eq("report_id", id);
      if (error) throw error;

      const fields = Object.fromEntries((answers || []).map((item) => [item.field_id, item.answer || ""]));
      editingId = report.id;
      elements.institutionSelect.value = report.institution_id;
      elements.referenceDate.value = report.reference_date || today();
      elements.responsible.value = report.responsible || "";
      elements.reportStatusBadge.textContent = report.status || "Em preenchimento";
      elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar alterações';
      setSaveState(`Última sincronização · ${formatDateTime(report.updated_at)}`);
      renderInstitution(fields);
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
      const { error } = await supabaseClient.from("pme_relatorios").delete().eq("id", id);
      if (error) throw error;
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
      const { data: answers, error } = await supabaseClient
        .from("pme_respostas")
        .select("*")
        .order("report_id", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;

      const reportMap = new Map(reports.map((report) => [String(report.id), report]));
      const header = [
        "relatorio_id", "instituicao", "categoria", "responsavel", "data_referencia",
        "status", "grupo", "ordem", "campo_id", "pergunta", "resposta", "ultima_atualizacao"
      ];

      const rows = (answers || []).map((answer) => {
        const report = reportMap.get(String(answer.report_id)) || {};
        return [
          answer.report_id, report.institution_name || "", report.institution_category || "",
          report.responsible || "", report.reference_date || "", report.status || "",
          answer.field_group || "", answer.sort_order || "", answer.field_id || "",
          answer.question || "", answer.answer || "", report.updated_at || ""
        ];
      });

      const csv = "\uFEFF" + [header, ...rows].map((row) => row.map(csvEscape).join(";")).join("\r\n");
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

    elements.institutionSelect.addEventListener("change", () => {
      if (currentProfile?.role !== "admin") return;
      editingId = null;
      elements.reportStatusBadge.textContent = "Novo relatório";
      elements.saveReport.innerHTML = '<span aria-hidden="true">✓</span> Salvar relatório';
      setSaveState("Ainda não salvo");
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

    if (!isSupabaseConfigured()) {
      elements.loginSubmit.disabled = true;
      showAuth("Configure a Project URL e a chave publishable no início do script.js.");
      return;
    }

    try {
      supabaseClient = createSupabaseClient();
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;

      supabaseClient.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") showAuth();
      });

      if (data.session) await startAuthenticatedSession(data.session);
      else showAuth();
    } catch (error) {
      console.error(error);
      showAuth("Não foi possível conectar ao serviço de autenticação.");
    }
  }

  initialize();
})();
