# Concevoir des composants testés unitairement avec React

## BBL présenté par [Vincent Vieira](mailto:vincent.vieira@carbon-it.com)

### Prérequis

Afin d'avoir une expérience optimale avec ce kata, il est nécessaire _a minima_ de :

- Connaître [l'approche composant et ce qu'elle apporte](https://medium.com/the-s-curve/why-component-driven-design-drives-great-software-products-7cace364e815)
- Connaître [les fonctionnalités Javascript/Typescript permettant de développer avec React](https://dev.to/nsebhastian/javascript-basics-before-you-learn-react-38en)
- Conceptualiser correctement les mots-clé [_async/await_](https://javascript.info/async-await)

### Le kata "Tic Tac Toe"

Il s'agit de l'exercice utilisé en tant que [tutoriel pour React](https://reactjs.org/tutorial/tutorial.html). Dans ce kata, il s'agit d'implémenter un jeu de morpion au tour à tour au sein du navigateur. Au-delà des règles du morpion, il est nécessaire que l'application soit capable de :
- Afficher la grille de jeu et la position des différents pions
- Afficher l'historique des mouvements et permettre de naviguer vers un état de jeu spécifique
- Afficher qui est le prochain joueur ou le gagnant s'il existe

### A propos du BBL
Le projet utilisé dans le tutoriel React n'utilise que JavaScript. L'idée de ce BBL est de partir dans les meilleures conditions possibles et donc, avec une version légèrement améliorée qui utilise Typescript avec quelques types supplémentaires par rapport au projet initial.

**Quel est l'intérêt de TypeScript ?**
TypeScript est un langage qui permet d'offrir l'ensemble des fonctionnalités présentes dans les versions récentes de JavaScript, tout en offrant un système de typage à la compilation (appelé *static type checking*). Un typage fort permet de, notamment :
- Profiter d'une autocomplétion et de fonctionnalités de navigation au sein des environnements de développement intégrés (IDE)
- Eviter les bugs les plus courants et les plus impactants lorsque l'on écrit du JavaScript en vérifiant que le code est structurellement valide
- Rendre le code plus lisible en donnant un sens sémantique aux valeurs utilisées de par leur association à un type spécifique

#### Utilisation de Typescript
##### Créer des types permettant de représenter les propriétés ou état du composant
Que ce soit avec un composant de type *classe* ou *fonction*, il est nécessaire de typer les propriétés d'entrée ou l'état du composant.

- *Qu'est-ce qu'un alias de type ?* [C'est un nom qui réfère à un type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) qui peut-être :
  - Une ou plusieurs valeurs sous forme de litéral
  - Une union de types
  - Une intersection de types
  
  **Un alias de type peut être générique.** Cela permet donc une grande flexibilité dans sa déclaration.

- *Est-il préférable d'utiliser les interfaces ou les alias de type afin de décrire le type des propriétés d'entrée ou l'état d'un composant ?*
  [Cela dépend](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/types_or_interfaces).

#### Découpler les différents fichiers
Par module, par feature ?
Externaliser la logique métier, avec les hooks + factorisation des types
Smart or dumbs components

#### Donner du sens au code
Renaming

#### Tester
##### Bonnes pratiques

##### Enzyme ou testing-library ?
