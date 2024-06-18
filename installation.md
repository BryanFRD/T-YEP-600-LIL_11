# Guide d'installation pour les développeurs

Ce guide couvre l'installation et la configuration nécessaires pour travailler sur ce projet, y compris la configuration de **Husky**, les **hooks de commit**, la **validation des noms de branches**, et les **hooks pre-commit** et **pre-push**.

## Prérequis

Node.js et npm installés. :link: [Node](https://nodejs.org/fr/download/package-manager)

Git installé. :link: [Git](https://www.git-scm.com/downloads)


## Installation des dépendances

Clonez le dépôt et accédez au dossier du projet.

```
git clone <url>
```

Exécutez l'installation à la racine du projet pour installer les dépendances, y compris Husky et les outils de validation.


#### A la racine du projet
```
npm install
```
#### Dans frontend
```
cd frontend && npm install
```
#### Dans backend
```
cd backend && npm install
```

## Configuration de Husky

Husky est utilisé pour gérer les hooks Git dans ce projet. Pour initialiser Husky et installer les hooks, exécutez à la racine:

```
npm run prepare 
```

Cela configurera Husky et ajoutera les hooks spécifiés dans le dossier .husky/.

## Infos

### Hooks de commit

#### Pre-commit
Le hook pre-commit est configuré pour s'exécuter avant chaque commit. Il exécute des scripts de linting dans les dossiers **frontend et backend**. Pour voir ou modifier ce comportement, consultez le fichier `.husky/pre-commit`.

#### Commit-msg
Le hook *commit-msg* est utilisé pour valider le message de commit selon les **conventions définies**. La configuration est définie dans `commitlint.config.js`. Pour plus d'informations, consultez le fichier `.husky/commit-msg`.

#### Validation du nom de la branche
La validation du nom de la branche est effectuée à l'aide de *validate-branch-name* lors du *hook pre-push*. Cela garantit que les noms de branches suivent les conventions définies dans `.validate-branch-namerc.json`. Pour plus de détails, consultez le fichier `.husky/pre-push`.

#### Pre-push
Le hook pre-push est configuré pour s'exécuter avant chaque push vers le dépôt distant. Il vérifie s'il y a des modifications non commitées et valide le nom de la branche. Pour personnaliser ce comportement, référez-vous au fichier `.husky/pre-push`.