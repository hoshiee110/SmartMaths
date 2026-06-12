// ===== LANGUAGE SYSTEM =====
const translations = {
    en: {
        loginSubtitle: 'Learn Graphs Interactively',
        changeLanguageBtn: 'Change Language',
        loginBtn: 'Login',
        menuTitle: 'Choose Topic',
        difficultyLabel: 'Choose Difficulty:',
        diffEasy: 'Easy',
        diffMedium: 'Medium',
        diffHard: 'Hard',
        topicLinear: 'Linear Graph',
        topicQuadratic: 'Quadratic Graph',
        topicExponential: 'Exponential Graph',
        topicTrigonometric: 'Trigonometric Graph',
        guessGraphLabel: 'Guess The Graph',
        aiTutorLabel: 'AI Tutor',
        statsLabel: 'Statistics',
        logoutBtn: 'Logout',
        backLabel: 'Back',
        hintTitle: 'Hint',
        backFromHintBtn: 'Back to Question',
        aiTutorTitle: 'AI Tutor',
        aiTutorSubtitle: 'Ask anything about Mathematics!',
        suggestedLabel: 'Suggested Questions:',
        sendBtn: 'Send',
        guessGraphTitle: 'Guess The Graph Shape',
        level2Title: 'Level 2',
        level2Text1: 'Congratulations! You unlocked a new level.',
        level2Text2: 'Continue to more challenging topics!',
        level2BackBtn: 'Back to Menu',
        successTitle: 'Congratulations!',
        successText: 'You completed this topic successfully!',
        successBackBtn: 'Back to Menu',
        statsTitle: 'Your Statistics',
        statsBackBtn: 'Back to Menu',
        submitBtn: 'Submit Answer',
        hintBtn: 'Hint',
        scoreLabel: 'Score:',
        questionCounter: 'Question:',
    },
    ms: {
        loginSubtitle: 'Belajar Graf Dengan Interaktif',
        changeLanguageBtn: 'Tukar Bahasa',
        loginBtn: 'Log Masuk',
        menuTitle: 'Pilih Topik',
        difficultyLabel: 'Pilih Kesulitan:',
        diffEasy: 'Mudah',
        diffMedium: 'Sederhana',
        diffHard: 'Sukar',
        topicLinear: 'Graf Linear',
        topicQuadratic: 'Graf Kuadratik',
        topicExponential: 'Graf Eksponen',
        topicTrigonometric: 'Graf Trigonometrik',
        guessGraphLabel: 'Teka Graf',
        aiTutorLabel: 'AI Tutor',
        statsLabel: 'Statistik',
        logoutBtn: 'Keluar',
        backLabel: 'Kembali',
        hintTitle: 'Hint',
        backFromHintBtn: 'Kembali ke Soalan',
        aiTutorTitle: 'AI Tutor',
        aiTutorSubtitle: 'Tanya apa saja tentang Matematik!',
        suggestedLabel: 'Soalan Dicadangkan:',
        sendBtn: 'Hantar',
        guessGraphTitle: 'Teka Bentuk Graf',
        level2Title: 'Level 2',
        level2Text1: 'Tahniah! Anda berjaya unlock level baru.',
        level2Text2: 'Lanjutkan ke topik yang lebih mencabar!',
        level2BackBtn: 'Kembali ke Menu',
        successTitle: 'Tahniah!',
        successText: 'Anda berjaya menyelesaikan topik ini.',
        successBackBtn: 'Kembali ke Menu',
        statsTitle: 'Statistik Anda',
        statsBackBtn: 'Kembali ke Menu',
        submitBtn: 'Hantar Jawapan',
        hintBtn: 'Hint',
        scoreLabel: 'Markah:',
        questionCounter: 'Soalan:',
    }
};

// ===== STATE MANAGEMENT =====
const state = {
    language: null,
    studentName: '',
    currentTopic: null,
    currentDifficulty: 'easy',
    score: 0,
    currentQuestionIndex: 0,
    questions: [],
    usedHint: false,
    stats: {
        totalAttempts: 0,
        totalCorrect: 0,
        topicPerformance: {},
    }
};

// ===== UTILITY FUNCTIONS =====
function t(key) {
    return translations[state.language]?.[key] || key;
}

function updateUI() {
    const elements = {
        loginSubtitle: 'loginSubtitle',
        changeLanguageBtn: 'changeLanguageBtn',
        loginBtn: 'loginBtn',
        menuTitle: 'menuTitle',
        difficultyLabel: 'difficultyLabel',
        diffEasy: 'diffEasy',
        diffMedium: 'diffMedium',
        diffHard: 'diffHard',
        topicLinear: 'topicLinear',
        topicQuadratic: 'topicQuadratic',
        topicExponential: 'topicExponential',
        topicTrigonometric: 'topicTrigonometric',
        guessGraphLabel: 'guessGraphLabel',
        aiTutorLabel: 'aiTutorLabel',
        statsLabel: 'statsLabel',
        logoutBtn: 'logoutBtn',
        aiTutorTitle: 'aiTutorTitle',
        aiTutorSubtitle: 'aiTutorSubtitle',
        suggestedLabel: 'suggestedLabel',
        sendBtn: 'sendBtn',
        guessGraphTitle: 'guessGraphTitle',
        level2Title: 'level2Title',
        level2Text1: 'level2Text1',
        level2Text2: 'level2Text2',
        level2BackBtn: 'level2BackBtn',
        successTitle: 'successTitle',
        successText: 'successText',
        successBackBtn: 'successBackBtn',
        statsTitle: 'statsTitle',
        hintTitle: 'hintTitle',
    };

    for (const [id, key] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = t(key);
    }

    // Update buttons with multiple elements
    document.querySelectorAll('[id*="Btn"]').forEach(btn => {
        const id = btn.id;
        const key = id.replace('Btn', '');
        if (translations[state.language]?.[id]) {
            btn.textContent = t(id);
        }
    });
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const page = document.getElementById(pageName);
    if (page) {
        page.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function setLanguage(lang) {
    if (lang === null) {
        showPage('languageSelector');
        return;
    }
    state.language = lang;
    updateUI();
    showPage('login');
}

// ===== AUTHENTICATION =====
function startGame(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('studentName').value.trim();
    if (!name) {
        showFeedback('Please enter your name', 'error', 'login');
        return;
    }

    state.studentName = name;
    loadStats();
    showPage('menu');
    updateScore();
}

function logout() {
    if (confirm(t('Are you sure you want to logout?'))) {
        state.studentName = '';
        state.currentTopic = null;
        state.score = 0;
        state.currentQuestionIndex = 0;
        showPage('languageSelector');
        document.getElementById('studentName').value = '';
    }
}

// ===== TOPIC & DIFFICULTY MANAGEMENT =====
function setDifficulty(difficulty) {
    state.currentDifficulty = difficulty;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
}

function startTopic(topic) {
    state.currentTopic = topic;
    state.currentQuestionIndex = 0;
    state.usedHint = false;
    state.questions = generateQuestions(topic, state.currentDifficulty);
    displayQuestion();
    showPage('questionContainer');
}

// ===== QUESTION GENERATION =====
function generateQuestions(topic, difficulty) {
    const questions = [];
    const count = 5;

    for (let i = 0; i < count; i++) {
        let question = {};

        switch (topic) {
            case 'linear':
                question = generateLinearQuestion(difficulty);
                break;
            case 'quadratic':
                question = generateQuadraticQuestion(difficulty);
                break;
            case 'exponential':
                question = generateExponentialQuestion(difficulty);
                break;
            case 'trigonometric':
                question = generateTrigonometricQuestion(difficulty);
                break;
        }

        questions.push(question);
    }

    return questions;
}

function generateLinearQuestion(difficulty) {
    let m, c, x;

    if (difficulty === 'easy') {
        m = Math.floor(Math.random() * 5) + 1;
        c = Math.floor(Math.random() * 10) - 5;
        x = Math.floor(Math.random() * 5);
    } else if (difficulty === 'medium') {
        m = Math.floor(Math.random() * 10) - 5;
        c = Math.floor(Math.random() * 20) - 10;
        x = Math.floor(Math.random() * 10) - 5;
    } else {
        m = (Math.random() * 10 - 5).toFixed(1);
        c = (Math.random() * 20 - 10).toFixed(1);
        x = (Math.random() * 10 - 5).toFixed(1);
    }

    const y = parseFloat(m) * parseFloat(x) + parseFloat(c);
    const answer = y.toFixed(1);

    return {
        type: 'linear',
        question: `${state.language === 'en' ? 'Find y when x = ' : 'Cari y apabila x = '}${x} ${state.language === 'en' ? 'for the equation y = ' : 'untuk persamaan y = '}${m}x + ${c}`,
        answer: answer,
        hint: `${state.language === 'en' ? 'Substitute x = ' : 'Gantikan x = '}${x} ${state.language === 'en' ? 'into the equation' : 'ke dalam persamaan'}`,
    };
}

function generateQuadraticQuestion(difficulty) {
    let a, b, c, x;

    if (difficulty === 'easy') {
        a = 1;
        b = Math.floor(Math.random() * 6) - 3;
        c = Math.floor(Math.random() * 6) - 3;
        x = Math.floor(Math.random() * 5);
    } else if (difficulty === 'medium') {
        a = Math.floor(Math.random() * 3) + 1;
        b = Math.floor(Math.random() * 10) - 5;
        c = Math.floor(Math.random() * 10) - 5;
        x = Math.floor(Math.random() * 6) - 3;
    } else {
        a = (Math.random() * 3 + 0.5).toFixed(1);
        b = (Math.random() * 10 - 5).toFixed(1);
        c = (Math.random() * 10 - 5).toFixed(1);
        x = (Math.random() * 6 - 3).toFixed(1);
    }

    const y = parseFloat(a) * parseFloat(x) ** 2 + parseFloat(b) * parseFloat(x) + parseFloat(c);
    const answer = y.toFixed(1);

    return {
        type: 'quadratic',
        question: `${state.language === 'en' ? 'Find y when x = ' : 'Cari y apabila x = '}${x} ${state.language === 'en' ? 'for the equation y = ' : 'untuk persamaan y = '}${a}x² + ${b}x + ${c}`,
        answer: answer,
        hint: `${state.language === 'en' ? 'Use the quadratic formula or substitute x = ' : 'Gunakan formula kuadratik atau gantikan x = '}${x}`,
    };
}

function generateExponentialQuestion(difficulty) {
    let base, exponent, answer;

    if (difficulty === 'easy') {
        base = Math.floor(Math.random() * 3) + 2;
        exponent = Math.floor(Math.random() * 4);
        answer = Math.pow(base, exponent);
    } else if (difficulty === 'medium') {
        base = Math.floor(Math.random() * 5) + 2;
        exponent = Math.floor(Math.random() * 6) - 2;
        answer = Math.pow(base, exponent).toFixed(2);
    } else {
        base = (Math.random() * 3 + 1).toFixed(1);
        exponent = Math.floor(Math.random() * 6) - 2;
        answer = Math.pow(base, exponent).toFixed(3);
    }

    return {
        type: 'exponential',
        question: `${state.language === 'en' ? 'Calculate: ' : 'Hitungkan: '}${base}^${exponent}`,
        answer: answer.toString(),
        hint: `${state.language === 'en' ? 'Remember: ' : 'Ingat: '}${base} ${state.language === 'en' ? 'multiplied by itself ' : 'didarab dengan dirinya sendiri '}${exponent} ${state.language === 'en' ? 'times' : 'kali'}`,
    };
}

function generateTrigonometricQuestion(difficulty) {
    const angles = [0, 30, 45, 60, 90];
    const functions = ['sin', 'cos', 'tan'];
    const angle = angles[Math.floor(Math.random() * angles.length)];
    const func = functions[Math.floor(Math.random() * functions.length)];

    let answer;
    const rad = (angle * Math.PI) / 180;

    switch (func) {
        case 'sin':
            answer = Math.sin(rad).toFixed(3);
            break;
        case 'cos':
            answer = Math.cos(rad).toFixed(3);
            break;
        case 'tan':
            answer = Math.tan(rad).toFixed(3);
            break;
    }

    return {
        type: 'trigonometric',
        question: `${state.language === 'en' ? 'Find the value of ' : 'Cari nilai dari '}${func}(${angle}°)`,
        answer: answer,
        hint: `${state.language === 'en' ? 'Use trigonometric tables or a calculator' : 'Gunakan jadual trigonometri atau kalkulator'}`,
    };
}

// ===== QUESTION DISPLAY & SUBMISSION =====
function displayQuestion() {
    if (state.currentQuestionIndex >= state.questions.length) {
        endTopic();
        return;
    }

    const question = state.questions[state.currentQuestionIndex];
    const questionContent = document.getElementById('questionContent');
    const counter = document.getElementById('questionCounter');
    const progress = (((state.currentQuestionIndex + 1) / state.questions.length) * 100);

    questionContent.innerHTML = `<h3>${question.question}</h3>`;
    counter.textContent = `${state.currentQuestionIndex + 1}/${state.questions.length}`;
    document.getElementById('progressFill').style.width = progress + '%';

    document.getElementById('answerInput').value = '';
    document.getElementById('feedbackMessage').innerHTML = '';
    document.getElementById('feedbackMessage').classList.remove('show');
    state.usedHint = false;

    document.getElementById('answerInput').focus();
}

function submitAnswer(event) {
    if (event) event.preventDefault();

    const userAnswer = document.getElementById('answerInput').value.trim();
    const question = state.questions[state.currentQuestionIndex];

    if (!userAnswer) {
        showFeedback(state.language === 'en' ? 'Please enter an answer' : 'Sila masukkan jawapan', 'error', 'questionContainer');
        return;
    }

    const isCorrect = checkAnswer(userAnswer, question.answer);

    state.stats.totalAttempts++;

    if (isCorrect) {
        state.score += 20;
        state.stats.totalCorrect++;
        showFeedback(
            state.language === 'en' ? 'Correct! Great job! 🎉' : 'Betul! Kerja bagus! 🎉',
            'success',
            'questionContainer'
        );
        updateScore();
        setTimeout(() => {
            state.currentQuestionIndex++;
            displayQuestion();
        }, 1500);
    } else {
        showFeedback(
            `${state.language === 'en' ? 'Incorrect. The correct answer is: ' : 'Tidak betul. Jawapan yang betul adalah: '}${question.answer}`,
            'error',
            'questionContainer'
        );
    }
}

function checkAnswer(userAnswer, correctAnswer) {
    const user = parseFloat(userAnswer);
    const correct = parseFloat(correctAnswer);

    if (isNaN(user) || isNaN(correct)) {
        return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    }

    return Math.abs(user - correct) < 0.1;
}

function showHint() {
    if (state.usedHint) {
        showFeedback(
            state.language === 'en' ? 'You already used the hint for this question' : 'Anda sudah menggunakan hint untuk soalan ini',
            'info',
            'questionContainer'
        );
        return;
    }

    state.usedHint = true;
    const hint = state.questions[state.currentQuestionIndex].hint;
    document.getElementById('hintContent').innerHTML = `<p>${hint}</p>`;
    showPage('hintPage');
}

function backToQuestion() {
    showPage('questionContainer');
}

function updateScore() {
    document.getElementById('score').textContent = state.score;
}

// ===== GAME MODE =====
function startGuessGraphGame() {
    state.currentQuestionIndex = 0;
    displayGameQuestion();
    showPage('guessTheGraph');
}

function displayGameQuestion() {
    const gameTypes = ['linear', 'quadratic', 'exponential', 'trigonometric'];
    const randomType = gameTypes[Math.floor(Math.random() * gameTypes.length)];

    const canvas = document.getElementById('gameChart');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    drawGraph(canvas, randomType);
    displayGameOptions(gameTypes.filter(t => t !== randomType).slice(0, 3).concat(randomType).sort(() => Math.random() - 0.5));

    document.getElementById('gameCounter').textContent = `${state.currentQuestionIndex + 1}/5`;
    const progress = (((state.currentQuestionIndex + 1) / 5) * 100);
    document.getElementById('gameProgressFill').style.width = progress + '%';

    window.currentGraphType = randomType;
}

function drawGraph(canvas, type) {
    const ctx = canvas.getContext('2d');
    canvas.width = 350;
    canvas.height = 300;

    // Destroy existing chart if it exists
    if (window.currentChart) {
        window.currentChart.destroy();
    }

    const data = generateGraphData(type);

    window.currentChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: type,
                data: data,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                showLine: true,
                tension: type === 'quadratic' ? 0.4 : type === 'trigonometric' ? 0.5 : 0,
                fill: false,
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: true, min: -5, max: 5 },
                y: { display: true, min: -5, max: 5 }
            }
        }
    });
}

function generateGraphData(type) {
    const data = [];
    for (let x = -5; x <= 5; x += 0.5) {
        let y;
        switch (type) {
            case 'linear':
                y = 2 * x + 1;
                break;
            case 'quadratic':
                y = 0.5 * x * x;
                break;
            case 'exponential':
                y = Math.pow(1.5, x) - 3;
                break;
            case 'trigonometric':
                y = 2 * Math.sin(x);
                break;
        }
        data.push({ x, y });
    }
    return data;
}

function displayGameOptions(options) {
    const container = document.getElementById('graphOptions');
    container.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn graph-option';
        btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
        btn.onclick = () => submitGraphGuess(opt, btn);
        container.appendChild(btn);
    });
}

function submitGraphGuess(guessed, button) {
    const isCorrect = guessed === window.currentGraphType;

    if (isCorrect) {
        state.score += 20;
        button.classList.add('selected');
        showFeedback(
            state.language === 'en' ? 'Correct! 🎉' : 'Betul! 🎉',
            'success',
            'guessTheGraph'
        );
        state.currentQuestionIndex++;

        if (state.currentQuestionIndex < 5) {
            setTimeout(() => {
                displayGameQuestion();
                document.getElementById('gameMessage').innerHTML = '';
                document.getElementById('gameMessage').classList.remove('show');
            }, 1500);
        } else {
            setTimeout(() => {
                endTopic();
            }, 1500);
        }
    } else {
        showFeedback(
            state.language === 'en' ? `Incorrect. The answer is ${window.currentGraphType}` : `Tidak betul. Jawapannya adalah ${window.currentGraphType}`,
            'error',
            'guessTheGraph'
        );
    }

    updateScore();
}

// ===== TOPIC COMPLETION =====
function endTopic() {
    const performance = (state.score / 100) * 100;
    document.getElementById('finalScore').textContent = Math.round(performance);

    let performanceMessage = '';
    if (performance >= 80) {
        performanceMessage = state.language === 'en' ? 'Excellent performance!' : 'Prestasi cemerlang!';
    } else if (performance >= 60) {
        performanceMessage = state.language === 'en' ? 'Good job!' : 'Kerja bagus!';
    } else {
        performanceMessage = state.language === 'en' ? 'Keep practicing!' : 'Terus berlatih!';
    }

    document.getElementById('performanceText').textContent = performanceMessage;
    saveStats();
    showPage('success');
}

// ===== FEEDBACK =====
function showFeedback(message, type, pageId) {
    const feedbackEl = document.getElementById('gameMessage') || document.getElementById('feedbackMessage');
    if (!feedbackEl) return;

    feedbackEl.textContent = message;
    feedbackEl.className = `feedback-message show ${type}`;
    feedbackEl.style.display = 'block';
}

function goBack() {
    if (confirm(state.language === 'en' ? 'Exit this topic?' : 'Keluar dari topik ini?')) {
        showPage('menu');
    }
}

// ===== STATISTICS =====
function saveStats() {
    if (!state.stats.topicPerformance) {
        state.stats.topicPerformance = {};
    }
    state.stats.topicPerformance[state.currentTopic] = {
        score: state.score,
        attempts: state.stats.totalAttempts,
        correct: state.stats.totalCorrect,
        date: new Date().toLocaleDateString(state.language === 'en' ? 'en-US' : 'ms-MY')
    };
    localStorage.setItem(`stats_${state.studentName}`, JSON.stringify(state.stats));
}

function loadStats() {
    const saved = localStorage.getItem(`stats_${state.studentName}`);
    if (saved) {
        state.stats = JSON.parse(saved);
        state.score = state.stats.score || 0;
    }
}

function displayStats() {
    const statsContent = document.getElementById('statsContent');
    let html = '';

    if (!state.stats.topicPerformance || Object.keys(state.stats.topicPerformance).length === 0) {
        html = `<p>${state.language === 'en' ? 'No statistics yet' : 'Belum ada statistik'}</p>`;
    } else {
        for (const [topic, data] of Object.entries(state.stats.topicPerformance)) {
            html += `
                <div class="stat-item">
                    <div class="stat-label">${topic}</div>
                    <div class="stat-value">${data.score}%</div>
                    <div class="stat-label">${state.language === 'en' ? 'Correct: ' : 'Betul: '}${data.correct}/${data.attempts}</div>
                    <div class="stat-label">${data.date}</div>
                </div>
            `;
        }
    }

    statsContent.innerHTML = html;
}

// ===== AI TUTOR =====
function sendQuestion(event) {
    if (event) event.preventDefault();

    const userQuestion = document.getElementById('userQuestion').value.trim();
    if (!userQuestion) return;

    addChatMessage(userQuestion, 'user');
    document.getElementById('userQuestion').value = '';

    setTimeout(() => {
        const response = generateAIResponse(userQuestion);
        addChatMessage(response, 'assistant');
    }, 500);
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}`;
    messageEl.textContent = message;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(question) {
    const responses = {
        linear: state.language === 'en' ? 'Linear graphs are straight lines with constant slopes. The equation is y = mx + c' : 'Graf linear adalah garis lurus dengan cerun tetap. Persamaannya adalah y = mx + c',
        quadratic: state.language === 'en' ? 'Quadratic graphs form a parabola. They have the form y = ax² + bx + c' : 'Graf kuadratik membentuk parabola. Mereka mempunyai bentuk y = ax² + bx + c',
        exponential: state.language === 'en' ? 'Exponential graphs grow or decay at an increasing rate. The equation is y = a × b^x' : 'Graf eksponen berkembang atau merosot pada kadar yang meningkat. Persamaannya ialah y = a × b^x',
        trigonometric: state.language === 'en' ? 'Trigonometric graphs are periodic, repeating at regular intervals. Common functions are sin, cos, and tan' : 'Graf trigonometrik adalah berkala, berulang pada selang waktu yang tetap. Fungsi biasa ialah sin, cos, dan tan',
    };

    for (const [key, value] of Object.entries(responses)) {
        if (question.toLowerCase().includes(key)) {
            return value;
        }
    }

    return state.language === 'en' ? 'Great question! Keep learning and practicing to improve your math skills.' : 'Soalan yang hebat! Terus belajar dan berlatih untuk meningkatkan kemahiran matematik anda.';
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Set up difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => setDifficulty(btn.dataset.difficulty));
    });

    // Set up guess the graph game
    const guessGraphPage = document.getElementById('guessTheGraph');
    if (guessGraphPage) {
        const observer = new MutationObserver(() => {
            if (guessGraphPage.classList.contains('active')) {
                startGuessGraphGame();
            }
        });

        observer.observe(guessGraphPage, { attributes: true, attributeFilter: ['class'] });
    }

    // Display stats when stats page is shown
    const statsPage = document.getElementById('stats');
    if (statsPage) {
        const observer = new MutationObserver(() => {
            if (statsPage.classList.contains('active')) {
                displayStats();
            }
        });

        observer.observe(statsPage, { attributes: true, attributeFilter: ['class'] });
    }
});

// Form submission prevention
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});
