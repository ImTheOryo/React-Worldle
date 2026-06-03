# Un Jour, Un Pays 🌍✈️

Un projet frontend complet inspiré du concept "Un Jour Un Film", mais revisité avec des la géographie au niveau mondiale. Chaque jour, le joueur est mis au défi de deviner un pays mystère en s'aidant des indices fournis par les métadonnées de ses tentatives précédentes (région, monnaie, langues, etc.). Le joueur a aussi la possibilité d'accéder aux défis des jours précédents.

## Membres de l'équipe et rôles

* **Camille Pinault** - Fullstack Developer: Création de l'historique, Interface, Règles du jeu

* **Enory D'Huysser** - Fullstack Developer: Logique de jeu, Gestion des champs initiaux, SearchBox


## Univers sélectionné

L'univers choisi pour ce projet est la **Géographie et le Voyage**.
L'interface utilisateur a été pensée pour être épurée et moderne, s'inspirant des codes visuels d'un tableau de bord d'aviation ou d'une agence de voyage (utilisation de tons bleu ciel, gris ardoise, et beaucoup d'espace blanc). Cet univers permet d'exploiter des métadonnées riches et culturellement intéressantes.

## API utilisée

Les données exploitées dans ce jeu proviennent de l'API publique **REST Countries (v3.1)**.

* **Lien de la documentation :** <https://restcountries.com/>

**Pourquoi ce choix ?**
Cette API est robuste, gratuite et ne nécessite pas de clé d'authentification. Elle expose des métadonnées extrêmement complètes pour tous les pays du monde (Nom officiel, Région, Sous-région, Monnaies, Langues parlées, Statut d'indépendance, etc.), ce qui est idéal pour alimenter notre système de comparaison champ par champ en temps réel. **Aucune donnée n'est mockée**, tous les appels sont effectués en conditions réelles.

## Guide d'installation et de lancement

Ce projet est construit avec React, Vite et TypeScript. Suivez ces étapes pour lancer l'application en environnement de développement local.

### Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 16 ou supérieure) installé sur votre machine.

### 1. Cloner le dépôt

Ouvrez votre terminal et clonez le dépôt Git du projet :

```text
git clone https://github.com/ImTheOryo/React-Worldle.git
cd ./React-Wordle
```

### 2. Installer les dépendances

Installez les paquets nécessaires via NPM :

```text
npm install
```

### 3. Lancer le serveur de développement

Démarrez l'environnement local avec Vite :

```text
npm run dev
```

### 4. Jouer

Ouvrez votre navigateur et accédez à l'URL locale indiquée dans le terminal (généralement http://localhost:5173).