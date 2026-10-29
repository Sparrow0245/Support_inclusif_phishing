// Contenus pédagogiques du parcours "Phishing : déjouer le piège"
const appLessonsData = [
    {
        lessonId: "lesson-1",
        lessonTitle: "Leçon 1 : Repérer les indices de base",
        activities: [
            {
                id: "l1-a1",
                title: "L'expéditeur et le ton du message",
                instruction: "Examinez attentivement le message ci-dessous.",
                sender: "service-securite@banque-info-alerte.com",
                subject: "URGENT : Blocage imminente de votre compte",
                question: "Ce message présente-t-il des indices suspects ?",
                options: [
                    { id: "opt-1", text: "Oui, l'adresse d'expéditeur et l'urgence sont suspectes." },
                    { id: "opt-2", text: "Non, le message provient d'un service de sécurité officiel." }
                ],
                correctOption: "opt-1",
                feedbackCorrect: "Excellente analyse ! L'adresse d'expéditeur utilise un nom de domaine non officiel et le ton alarmiste vise à vous faire paniquer.",
                feedbackError: "Attention, ne vous fiez pas au titre officiel affiché.",
                hint: "Regardez bien l'adresse e-mail après l'arobase (@) et le niveau d'urgence.",
                explanation: "Les attaquants créent souvent un sentiment d'urgence artificielle ('Blocage imminent') pour inciter à agir sans réfléchir, et utilisent des domaines e-mail trompeurs qui ne correspondent pas au site officiel."
            },
            {
                id: "l1-a2",
                title: "L'absence de fautes garantit-elle la sécurité ?",
                instruction: "Réfléchissez à l'évolution des techniques d'hameçonnage.",
                sender: "contact@livraison-colis.fr",
                subject: "Mise à jour de vos préférences de livraison",
                question: "Un e-mail parfaitement rédigé, sans aucune faute d'orthographe, est-il obligatoirement légitime ?",
                options: [
                    { id: "opt-1", text: "Oui, les piratages contiennent toujours des fautes grossières." },
                    { id: "opt-2", text: "Non, les attaquants utilisent désormais des outils modernes pour rédiger des messages parfaits." }
                ],
                correctOption: "opt-2",
                feedbackCorrect: "Exactement. L'absence de fautes n'est plus une garantie de sécurité.",
                feedbackError: "C'est une idée reçue fréquente mais dangereuse.",
                hint: "Pensez aux générateurs de texte et correcteurs automatiques actuels.",
                explanation: "Aujourd'hui, de nombreux e-mails de phishing sont rédigés dans un français impeccable. Il faut donc analyser l'ensemble des indices (expéditeur, contexte, liens) et pas uniquement la grammaire."
            }
        ]
    },
    {
        lessonId: "lesson-2",
        lessonTitle: "Leçon 2 : Analyser les liens et comparer",
        activities: [
            {
                id: "l2-a1",
                title: "Décortiquer la structure d'une URL",
                instruction: "On vous invite à vous connecter sur le lien suivant : http://www.ma-banque.com.connexion-securisee-check.net/login",
                sender: "alerte@ma-banque.com",
                subject: "Validation de votre nouveau bénéficiaire",
                question: "Quel est le véritable nom de domaine de destination de ce lien ?",
                options: [
                    { id: "opt-1", text: "ma-banque.com" },
                    { id: "opt-2", text: "connexion-securisee-check.net" },
                    { id: "opt-3", text: "ma-banque.com.connexion-securisee-check.net" }
                ],
                correctOption: "opt-2",
                feedbackCorrect: "Bravo ! Le vrai domaine est toujours situé juste avant le premier slash ('/') et l'extension (.net), indépendamment des sous-domaines placés devant.",
                feedbackError: "Ne vous laissez pas tromper par les mots placés au début du lien.",
                hint: "Cherchez la fin de l'adresse juste avant le premier '/'. Le vrai domaine est le mot situé immédiatement à gauche de l'extension (.com, .net, .fr...).",
                explanation: "Dans une URL, les sous-domaines se lisent de droite à gauche avant le slash. Ici, 'ma-banque.com' est un faux sous-domaine créé sur le site frauduleux 'connexion-securisee-check.net'."
            }
        ]
    },
    {
        lessonId: "lesson-3",
        lessonTitle: "Leçon 3 : Adopter la réaction autonome",
        activities: [
            {
                id: "l3-a1",
                title: "Conduite à tenir face à un doute",
                instruction: "Vous recevez un message affirmant que votre carte vitale doit être renouvelée immédiatement sous peine de suspension de vos droits.",
                sender: "renouvellement@assurance-maladie-support.fr",
                subject: "Action requise : Carte Vitale",
                question: "Quelle est la meilleure réaction à adopter ?",
                options: [
                    { id: "opt-1", text: "Cliquer rapidement sur le lien pour vérifier l'information." },
                    { id: "opt-2", text: "Ne pas cliquer, et me connecter directement sur mon compte Ameli via l'application ou le site officiel habituel." },
                    { id: "opt-3", text: "Répondre au message pour demander des explications." }
                ],
                correctOption: "opt-2",
                feedbackCorrect: "Excellente réaction ! C'est la règle d'or : passer toujours par un canal officiel indépendant.",
                feedbackError: "Prudence : interagir directement avec un message douteux comporte des risques.",
                hint: "Réfléchissez à la façon la plus sûre de contacter un organisme sans utiliser les accès fournis dans le message suspect.",
                explanation: "En cas de doute, ne cliquez jamais sur les liens et ne répondez pas. Allez de vous-même sur le site officiel (enregistré dans vos favoris ou via une recherche autonome) ou contactez l'organisme par votre canal habituel."
            }
        ]
    }
];
