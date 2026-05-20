const TYPE_PRIORITY = ['creators', 'solvers', 'protectors', 'communicators'];

const RESULT_CONFIG = {
  creators: {
    title: 'Creador',
    accent: 'creators',
    symbols: '🖌️ 📱 📚 👨‍🍳',
    intro: 'Tu impulso dominante es crear algo que antes no existía.',
    summary:
      'Aportas visión, atmósfera y una manera distinta de ver lo cotidiano. Tu imaginación no es adorno: puede abrir caminos para otros.',
  },
  solvers: {
    title: 'Solucionador',
    accent: 'solvers',
    symbols: '🧮 🤖 💻',
    intro: 'Tu fuerza aparece cuando todo necesita orden, lógica y dirección.',
    summary:
      'Lees sistemas, encuentras patrones y conviertes el caos en procesos concretos. Cuando el resto duda, tú ves cómo hacerlo posible.',
  },
  protectors: {
    title: 'Protector',
    accent: 'protectors',
    symbols: '🩺 📜 🥼',
    intro: 'Tu centro está en cuidar, sostener y defender lo valioso.',
    summary:
      'Tiendes a notar necesidades que otros pasan por alto. Tu presencia genera seguridad, cercanía y una forma muy práctica de amor.',
  },
  communicators: {
    title: 'Comunicador',
    accent: 'communicators',
    symbols: '🎤 🚩 📸',
    intro: 'Tu don dominante es conectar ideas, personas y propósito.',
    summary:
      'Tienes facilidad para abrir conversaciones, movilizar a otros y poner en palabras lo que importa. Donde hay distancia, sueles construir puente.',
  },
};

const state = {
  userName: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  scores: createEmptyScores(),
  activeView: 'intro',
};

const elements = {
  introForm: document.querySelector('#intro-form'),
  nameInput: document.querySelector('#name-input'),
  lastNameInput: document.querySelector('#last-name-input'),
  questionTitle: document.querySelector('#question-title'),
  questionHelper: document.querySelector('#question-helper'),
  answersContainer: document.querySelector('#answers-container'),
  progressLabel: document.querySelector('#progress-label'),
  progressBar: document.querySelector('#progress-bar'),
  resultPanel: document.querySelector('#result-panel'),
  resultTitle: document.querySelector('#result-title'),
  resultCopy: document.querySelector('#result-copy'),
  resultSummary: document.querySelector('#result-summary'),
  resultSymbols: document.querySelector('#result-symbols'),
  retryButton: document.querySelector('#retry-button'),
  restartButton: document.querySelector('#restart-button'),
  errorCopy: document.querySelector('#error-copy'),
  views: Array.from(document.querySelectorAll('.view')),
};

elements.introForm.addEventListener('submit', handleStart);
elements.retryButton.addEventListener('click', handleRetry);
elements.restartButton.addEventListener('click', resetExperience);
elements.nameInput.addEventListener('input', clearValidationMessage);
elements.lastNameInput.addEventListener('input', clearValidationMessage);

async function handleStart(event) {
  event.preventDefault();

  const firstName = elements.nameInput.value.trim();
  const lastName = elements.lastNameInput.value.trim();
  const nextName = validateFullName(firstName, lastName);

  if (!nextName) {
    return;
  }

  state.userName = nextName;
  state.currentQuestionIndex = 0;
  state.answers = [];
  state.scores = createEmptyScores();

  await loadQuestions();
}

async function handleRetry() {
  await loadQuestions();
}

async function loadQuestions() {
  setView('loading');

  try {
    const response = await fetch('./data/questions.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`No se pudo leer el archivo de preguntas (${response.status}).`);
    }

    const questions = await response.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('El archivo de preguntas no tiene el formato esperado.');
    }

    state.questions = prepareQuestions(questions);
    renderQuestion();
  } catch (error) {
    renderError(error instanceof Error ? error.message : 'Ocurrió un error inesperado.');
  }
}

function renderQuestion() {
  const question = state.questions[state.currentQuestionIndex];

  if (!question) {
    renderResult();
    return;
  }

  setView('question');

  const totalQuestions = state.questions.length;
  const questionNumber = state.currentQuestionIndex + 1;

  elements.progressLabel.textContent = `Pregunta ${questionNumber} de ${totalQuestions}`;
  elements.progressBar.style.width = `${(questionNumber / totalQuestions) * 100}%`;
  elements.questionTitle.textContent = question.question;
  elements.questionHelper.textContent = `${state.userName}, elige la opción que más se parece a ti.`;
  elements.answersContainer.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    const label = document.createElement('span');
    const value = document.createElement('span');

    button.type = 'button';
    button.className = 'answer-button';

    label.className = 'answer-label';
    label.textContent = `Opción ${index + 1}`;
    value.className = 'answer-value';
    value.textContent = answer.value;

    button.append(label, value);
    button.addEventListener('click', () => handleAnswer(answer));
    elements.answersContainer.append(button);
  });

  const firstAnswer = elements.answersContainer.querySelector('button');
  firstAnswer?.focus();
}

function handleAnswer(answer) {
  state.answers.push(answer);

  if (TYPE_PRIORITY.includes(answer.type)) {
    state.scores[answer.type] += 1;
  }

  state.currentQuestionIndex += 1;
  renderQuestion();
}

function renderResult() {
  const winner = determineWinner();
  const config = RESULT_CONFIG[winner];
  const userName = state.userName || 'Tu resultado';

  elements.resultPanel.dataset.tone = config.accent;
  elements.resultTitle.textContent = `${userName}, tu perfil dominante es ${config.title}`;
  elements.resultCopy.textContent = config.intro;
  elements.resultSummary.textContent = config.summary;
  elements.resultSymbols.textContent = config.symbols;

  setView('result');
  triggerCelebration(config.accent);
  elements.restartButton.focus();
}

function renderError(message) {
  elements.errorCopy.textContent = `${message} Usa un servidor local como Live Server o npx serve .`;
  setView('error');
  elements.retryButton.focus();
}

function determineWinner() {
  return TYPE_PRIORITY.reduce((currentWinner, type) => {
    if (state.scores[type] > state.scores[currentWinner]) {
      return type;
    }

    return currentWinner;
  }, TYPE_PRIORITY[0]);
}

function setView(nextView) {
  state.activeView = nextView;

  elements.views.forEach((view) => {
    const isActive = view.dataset.view === nextView;
    view.hidden = !isActive;
    view.classList.toggle('view-active', isActive);
  });
}

function resetExperience() {
  state.currentQuestionIndex = 0;
  state.answers = [];
  state.scores = createEmptyScores();
  state.questions = [];
  setView('intro');
  elements.introForm.reset();
  clearValidationMessage({ currentTarget: elements.nameInput });
  clearValidationMessage({ currentTarget: elements.lastNameInput });
  elements.nameInput.focus();
}

function triggerCelebration(tone) {
  if (typeof window.confetti !== 'function') {
    return;
  }

  const palette = {
    creators: ['#ff5031', '#ff7b4b', '#f6f4ef'],
    solvers: ['#3a9eff', '#76b9ff', '#f6f4ef'],
    protectors: ['#ffd34d', '#fff0a0', '#f6f4ef'],
    communicators: ['#54d189', '#8bf0b4', '#f6f4ef'],
  };

  window.confetti({
    particleCount: 140,
    spread: 75,
    origin: { y: 0.62 },
    colors: palette[tone] || palette.creators,
    scalar: 0.9,
  });
}

function createEmptyScores() {
  return {
    creators: 0,
    solvers: 0,
    protectors: 0,
    communicators: 0,
  };
}

function validateFullName(firstName, lastName) {
  const firstNameMessage = validateNamePart(firstName, 3, 'nombre');
  const lastNameMessage = validateNamePart(lastName, 4, 'apellido');

  elements.nameInput.setCustomValidity(firstNameMessage);
  elements.lastNameInput.setCustomValidity(lastNameMessage);

  if (firstNameMessage) {
    elements.nameInput.reportValidity();
    elements.nameInput.focus();
    return '';
  }

  if (lastNameMessage) {
    elements.lastNameInput.reportValidity();
    elements.lastNameInput.focus();
    return '';
  }

  return `${firstName} ${lastName}`;
}

function validateNamePart(value, minLetters, label) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `Debes escribir tu ${label}.`;
  }

  if (!hasOnlyNameCharacters(trimmedValue)) {
    return `El ${label} solo puede contener letras, espacios, guiones o apostrofes.`;
  }

  if (countLetters(trimmedValue) < minLetters) {
    return `El ${label} debe tener al menos ${minLetters} letras.`;
  }

  return '';
}

function hasOnlyNameCharacters(value) {
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(value);
}

function countLetters(value) {
  return Array.from(value).filter((character) => /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(character)).length;
}

function clearValidationMessage(event) {
  event.currentTarget.setCustomValidity('');
}

function prepareQuestions(questions) {
  return shuffleArray(
    questions.map((question) => ({
      ...question,
      answers: shuffleArray([...question.answers]),
    })),
  );
}

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}