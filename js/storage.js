// Gestion robuste et versionnée du localStorage pour le suivi de la progression
const STORAGE_KEY = "phishing_learning_progress_v1";

function getInitialProgress(lessonsData) {
    const progress = {};
    lessonsData.forEach(lesson => {
        progress[lesson.lessonId] = {
            status: "todo", // "todo" | "in-progress" | "completed"
            currentActivityIndex: 0,
            completedActivities: []
        };
    });
    return progress;
}

function loadProgressState(lessonsData) {
    try {
        const rawData = localStorage.getItem(STORAGE_KEY);
        if (!rawData) {
            return getInitialProgress(lessonsData);
        }
        const parsedData = JSON.parse(rawData);
        
        // Vérification basique de l'intégrité de la structure
        lessonsData.forEach(lesson => {
            if (!parsedData[lesson.lessonId]) {
                parsedData[lesson.lessonId] = {
                    status: "todo",
                    currentActivityIndex: 0,
                    completedActivities: []
                };
            }
        });
        return parsedData;
    } catch (error) {
        console.error("Erreur lors du chargement du localStorage, réinitialisation :", error);
        return getInitialProgress(lessonsData);
    }
}

function saveProgressState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde dans le localStorage :", error);
    }
}

function clearProgressState(lessonsData) {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return getInitialProgress(lessonsData);
    } catch (error) {
        console.error("Erreur lors de la réinitialisation :", error);
        return getInitialProgress(lessonsData);
    }
}
