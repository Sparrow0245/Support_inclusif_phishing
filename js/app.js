// Logique applicative principale du parcours interactif
document.addEventListener("DOMContentLoaded", () => {
    // État de l'application en cours
    let progressState = loadProgressState(appLessonsData);
    let currentLessonId = null;
    let currentActivityIndex = 0;

    // Éléments du DOM - Vues
    const viewHome = document.getElementById("view-home");
    const viewLesson = document.getElementById("view-lesson");
    const lessonsListContainer = document.getElementById("lessons-list-container");

    // Éléments du DOM - Leçon / Activité
    const btnBackHome = document.getElementById("btn-back-home");
    const progressIndicator = document.getElementById("progress-indicator");
    const lessonTitleEl = document.getElementById("lesson-title");
    const activitySubtitleEl = document.getElementById("activity-subtitle");
    const activityInstructionEl = document.getElementById("activity-instruction");
    const msgSenderEl = document.getElementById("msg-sender");
    const msgSubjectEl = document.getElementById("msg-subject");
    const activityQuestionEl = document.getElementById("activity-question");
    const optionsContainer = document.getElementById("options-container");
    const btnSubmitAnswer = document.getElementById("btn-submit-answer");
    const feedbackContainer = document.getElementById("feedback-container");
    const helpContainer = document.getElementById("help-container");

    // Initialisation de l'application
    function initApp() {
        renderHomeView();
        setupEventListeners();
    }

    // Affichage de la vue Accueil
    function renderHomeView() {
        viewHome.classList.add("active");
        viewLesson.classList.remove("active");
        viewLesson.hidden = true;
        viewHome.hidden = false;

        lessonsListContainer.innerHTML = "";

        // Vérifier s'il y a une reprise possible
        let hasStarted = false;
        appLessonsData.forEach(lesson => {
            const state = progressState[lesson.lessonId];
            if (state.status === "in-progress" || state.status === "completed") {
                hasStarted = true;
            }
        });

        // Affichage optionnel d'une bannière de reprise si l'utilisateur a déjà progressé
        if (hasStarted) {
            const resumeBanner = document.createElement("div");
            resumeBanner.className = "resume-banner";
            resumeBanner.innerHTML = `
                <div>
                    <strong>Reprise de parcours :</strong> Vous avez des leçons en cours.
                </div>
                <button id="btn-reset-progress" class="btn btn-danger-outline">Réinitialiser toute la progression</button>
            `;
            lessonsListContainer.appendChild(resumeBanner);

            document.getElementById("btn-reset-progress").addEventListener("click", () => {
                if (confirm("Voulez-vous vraiment réinitialiser toute votre progression ?")) {
                    progressState = clearProgressState(appLessonsData);
                    renderHomeView();
                }
            });
        }

        // Construction des cartes de leçons
        appLessonsData.forEach(lesson => {
            const state = progressState[lesson.lessonId];
            const card = document.createElement("div");
            card.className = "card";

            let badgeClass = "badge-todo";
            let badgeText = "À débuter";
            if (state.status === "in-progress") {
                badgeClass = "badge-progress";
                badgeText = "En cours";
            } else if (state.status === "completed") {
                badgeClass = "badge-completed";
                badgeText = "Terminée";
            }

            card.innerHTML = `
                <h3>${lesson.lessonTitle}</h3>
                <p>Nombre d'activités : ${lesson.activities.length}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <span class="badge ${badgeClass}">${badgeText}</span>
                    <button class="btn btn-primary btn-start-lesson" data-lesson-id="${lesson.lessonId}">
                        ${state.status === "todo" ? "Commencer" : "Continuer"}
                    </button>
                </div>
            `;
            lessonsListContainer.appendChild(card);
        });

        // Écouteurs sur les boutons de leçons
        document.querySelectorAll(".btn-start-lesson").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const lessonId = e.target.getAttribute("data-lesson-id");
                startLesson(lessonId);
            });
        });

        document.getElementById("home-title").focus();
    }

    // Démarrer ou reprendre une leçon
    function startLesson(lessonId) {
        currentLessonId = lessonId;
        const state = progressState[lessonId];
        currentActivityIndex = state.currentActivityIndex || 0;

        viewHome.classList.remove("active");
        viewHome.hidden = true;
        viewLesson.classList.add("active");
        viewLesson.hidden = false;

        renderActivity();
    }

    // Afficher l'activité courante
    function renderActivity() {
        const lesson = appLessonsData.find(l => l.lessonId === currentLessonId);
        const activity = lesson.activities[currentActivityIndex];

        lessonTitleEl.textContent = lesson.lessonTitle;
        activitySubtitleEl.textContent = `Activité ${currentActivityIndex + 1} : ${activity.title}`;
        activityInstructionEl.textContent = activity.instruction;
        
        msgSenderEl.textContent = activity.sender;
        msgSubjectEl.textContent = activity.subject;
        activityQuestionEl.textContent = activity.question;

        progressIndicator.textContent = `${lesson.lessonTitle} — Activité ${currentActivityIndex + 1}/${lesson.activities.length}`;

        // Construction des options de réponse
        optionsContainer.innerHTML = "";
        activity.options.forEach((opt, index) => {
            const label = document.createElement("label");
            label.className = "option-label";
            label.innerHTML = `
                <input type="radio" name="quiz-option" value="${opt.id}" id="${opt.id}">
                <span>${opt.text}</span>
            `;
            optionsContainer.appendChild(label);
        });

        // Réinitialisation des feedbacks et aides
        feedbackContainer.hidden = true;
        feedbackContainer.className = "feedback-container";
        feedbackContainer.innerHTML = "";
        
        helpContainer.hidden = true;
        helpContainer.innerHTML = "";

        btnSubmitAnswer.textContent = "Valider ma réponse";
        btnSubmitAnswer.disabled = false;

        lessonTitleEl.focus();
    }

    // Gestion de la validation de la réponse
    function handleValidateAnswer() {
        const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
        if (!selectedOption) {
            alert("Veuillez sélectionner une réponse avant de valider.");
            return;
        }

        const lesson = appLessonsData.find(l => l.lessonId === currentLessonId);
        const activity = lesson.activities[currentActivityIndex];
        const userChoice = selectedOption.value;
        const isCorrect = (userChoice === activity.correctOption);

        feedbackContainer.hidden = false;
        if (isCorrect) {
            feedbackContainer.className = "feedback-container success";
            feedbackContainer.innerHTML = `
                <p><strong>✔ Bonne réponse !</strong> ${activity.feedbackCorrect}</p>
            `;
            
            // Mise à jour de la progression
            const state = progressState[currentLessonId];
            state.status = "in-progress";
            if (!state.completedActivities.includes(activity.id)) {
                state.completedActivities.push(activity.id);
            }

            if (currentActivityIndex < lesson.activities.length - 1) {
                state.currentActivityIndex = currentActivityIndex + 1;
                btnSubmitAnswer.textContent = "Activité suivante →";
            } else {
                state.status = "completed";
                state.currentActivityIndex = lesson.activities.length - 1;
                btnSubmitAnswer.textContent = "Terminer la leçon →";
            }
            saveProgressState(progressState);

            // Changer l'action du bouton pour passer à la suite
            btnSubmitAnswer.onclick = () => {
                if (currentActivityIndex < lesson.activities.length - 1) {
                    currentActivityIndex++;
                    renderActivity();
                    btnSubmitAnswer.onclick = handleValidateAnswer;
                } else {
                    currentLessonId = null;
                    renderHomeView();
                    btnSubmitAnswer.onclick = handleValidateAnswer;
                }
            };

        } else {
            feedbackContainer.className = "feedback-container error";
            feedbackContainer.innerHTML = `
                <p><strong>✖ Réponse incorrecte.</strong> ${activity.feedbackError}</p>
                <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button id="btn-show-hint" class="btn btn-secondary">💡 Demander un indice</button>
                    <button id="btn-show-explanation" class="btn btn-secondary">ℹ Voir l'explication</button>
                </div>
            `;

            // Gestion de l'affichage de l'indice
            document.getElementById("btn-show-hint").addEventListener("click", () => {
                helpContainer.hidden = false;
                helpContainer.className = "help-box hint-box";
                helpContainer.innerHTML = `
                    <h4>Indice pédagogique :</h4>
                    <p>${activity.hint}</p>
                `;
                helpContainer.focus();
            });

            // Gestion de l'affichage de l'explication détaillée
            document.getElementById("btn-show-explanation").addEventListener("click", () => {
                helpContainer.hidden = false;
                helpContainer.className = "help-box explanation-box";
                helpContainer.innerHTML = `
                    <h4>Explication détaillée du piège :</h4>
                    <p>${activity.explanation}</p>
                `;
                helpContainer.focus();
            });
        }

        feedbackContainer.focus();
    }

    // Écouteurs globaux
    function setupEventListeners() {
        btnSubmitAnswer.addEventListener("click", handleValidateAnswer);

        btnBackHome.addEventListener("click", () => {
            currentLessonId = null;
            renderHomeView();
        });
    }

    // Lancement initial
    initApp();
});
