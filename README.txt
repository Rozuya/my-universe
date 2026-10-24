UN PETIT UNIVERS POUR ANDREA — GUIDE DU PROJET
================================================

CONTENU
- index.html : accueil
- histoire.html : chronologie basée sur les faits fournis
- lettre.html : enveloppe interactive et lettre complète
- confidences.html : sept panneaux indépendants, textes éditables et sauvegarde locale
- son-espace.html : éditeur de message, aperçu Canvas, brouillon local, copie et téléchargement PNG
- css/style.css : identité visuelle responsive et animations
- js/script.js : navigation mobile et étoiles décoratives
- js/lettre.js : ouverture et fermeture de la lettre
- js/confidences.js : panneaux et sauvegarde locale
- js/espace-andrea.js : brouillon, copie et image PNG

OUVRIR LE SITE
1. Extrais l'archive ZIP dans un dossier.
2. Double-clique sur index.html pour ouvrir l'accueil dans un navigateur récent.
3. Utilise le menu pour naviguer entre les cinq pages.

Le site est conçu sans serveur et sans installation. La navigation, la lettre, les panneaux et le Canvas fonctionnent normalement en local dans les navigateurs modernes. La sauvegarde localStorage et la copie dans le presse-papiers peuvent être restreintes par certains navigateurs en mode fichier local. Si la sauvegarde ne fonctionne pas, ouvre le dossier avec un petit serveur local ou utilise l'hébergement statique HTTPS décrit ci-dessous.

MÉTHODE SIMPLE POUR TESTER AVEC UN SERVEUR LOCAL (FACULTATIF)
- Si Python est déjà installé, ouvre un terminal dans le dossier andrea-univers et lance :
  python -m http.server 8000
- Puis ouvre http://localhost:8000 dans ton navigateur.
- Aucun paquet ou framework n'est requis. Si Python n'est pas installé, ne l'installe pas juste pour cela : le double-clic suffit pour consulter la plupart du site.

HÉBERGEMENT STATIQUE
Le projet peut être déployé sur un hébergement statique comme GitHub Pages. Place le contenu du dossier à la racine du dépôt et active Pages sur la branche/dossier approprié. L'adresse exacte dépendra de ton dépôt. Une URL publique signifie que les pages et leurs textes par défaut peuvent être consultés par toute personne qui possède le lien ou trouve le site.

MODIFIER LES TEXTES
- Histoire et lettre : ouvre les fichiers histoire.html et lettre.html dans un éditeur de texte et modifie les paragraphes concernés. Ne change pas la signature finale obligatoire : « Yaya, ton meilleur ami ».
- Confidences : les textes de départ sont dans confidences.html. Les panneaux 1 à 6 sont éditables directement dans la page et les modifications sont enregistrées dans le stockage local du navigateur. Le panneau 7 permet d'ajouter un titre et un texte.
- Accueil : modifie les textes de index.html.
- Style : css/style.css contient les couleurs, espacements, typographies et animations.

ESPACE D'ANDREA
- Le titre est facultatif. Le texte est requis pour générer une image.
- « Créer une image à m'envoyer » dessine un PNG avec Canvas dans le navigateur.
- « Télécharger l'image PNG » télécharge le fichier. Le site ne l'envoie pas sur Discord.
- « Copier le texte » copie le titre et le message, si le navigateur autorise la copie.
- « Enregistrer un brouillon » conserve titre et message dans le localStorage de cet appareil et de ce navigateur.
- Le bouton d'effacement demande confirmation.
- Le brouillon n'est pas synchronisé entre appareils et n'est pas transmis à Yaya.

CONFIDENTIALITÉ — À LIRE
- Un site statique accessible publiquement n'est pas automatiquement privé.
- Les confidences écrites ou modifiées dans le navigateur sont enregistrées localement ; elles ne sont pas automatiquement synchronisées avec Yaya.
- Les données locales peuvent être perdues si les données du navigateur sont effacées, si le profil du navigateur change ou si le stockage est bloqué.
- Ce projet ne comporte aucun code d'envoi de confidences vers un serveur, aucun compte et aucune collecte cachée.
- Une véritable protection par mot de passe nécessite une authentification ou un hébergement qui protège effectivement l'accès. Une URL difficile à deviner n'est pas une protection suffisante.
- Une image créée pour Andrea peut contenir des informations personnelles. Elle doit choisir ce qu'elle souhaite partager avant de l'envoyer.
- Évite de déployer publiquement des confidences sensibles si tu ne souhaites pas qu'elles soient visibles par d'autres personnes.

RESSOURCES EXTERNES
Le site fonctionne sans images distantes : les étoiles et la lune sont dessinées en CSS. Les polices Google sont chargées depuis une ressource externe si Internet est disponible ; des polices système de secours sont prévues si elles ne le sont pas. Le site reste utilisable sans ces polices.

LIMITES CONNUES
- Les navigateurs peuvent restreindre localStorage ou le presse-papiers lorsque les pages sont ouvertes directement en file://. Utilise localhost ou HTTPS si tu rencontres ce cas.
- La génération PNG produit une image verticale adaptée à la longueur du message. Pour un texte extrêmement long, le fichier peut devenir très haut et moins pratique à partager ; il vaut mieux alors raccourcir le texte. L'interface avertit lorsque l'image devient très longue.
- Aucun message n'est envoyé automatiquement sur Discord.
- Le projet ne dispose pas de test automatisé de rendu dans un vrai navigateur graphique dans cet environnement ; les contrôles de structure et de syntaxe sont décrits dans le compte rendu de livraison.
