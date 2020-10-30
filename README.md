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

- *Quel est l'intérêt de TypeScript ?*

TypeScript est un langage qui permet d'offrir l'ensemble des fonctionnalités présentes dans les versions récentes de JavaScript, tout en offrant un système de typage à la compilation (appelé *static type checking*). Un typage fort permet de, notamment :
- Profiter d'une autocomplétion et de fonctionnalités de navigation au sein des environnements de développement intégrés (IDE)
- Eviter les bugs les plus courants et les plus impactants lorsque l'on écrit du JavaScript en vérifiant que le code est structurellement valide
- Rendre le code plus lisible en donnant un sens sémantique aux valeurs utilisées de par leur association à un type spécifique

#### Utilisation de Typescript
##### Créer des types permettant de représenter les propriétés ou état du composant
Que ce soit avec un composant de type *classe* ou *fonction*, il est nécessaire de typer les propriétés d'entrée ou l'état du composant.

- *Qu'est-ce qu'un alias de type ?* 
  [C'est un nom qui réfère à un type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) qui peut-être :
  - Une ou plusieurs valeurs sous forme de litéral
  - Une [union de types *discriminée*](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)
  - Une [intersection de types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)

  **Un alias de type peut être générique.** Cela permet donc une grande flexibilité dans sa déclaration.

- *Est-il préférable d'utiliser les interfaces ou les alias de type afin de décrire le type des propriétés d'entrée ou l'état d'un composant ?*
  [Cela dépend](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/types_or_interfaces).

#### Découpler les différents fichiers
Lorsque l'on réalise une application avec un framework comme React, on va chercher à avoir un maximum de *dumb components* (aussi appelés *composants présentationnels*). Un composant "idiot" est un composant n'ayant que pour rôle de gérer l'affichage de données qu'il obtient d'autres composants. Ces composants sont appelés *smart components* (ou *composants conteneurs*) car ils possèdent une intelligence dans la gestion de ces données.

- *Pourquoi décomposer ses composants correctement est important ?* [Parce que](https://www.digitalocean.com/community/tutorials/react-smart-dumb-components#benefits-of-dividing-components)

On peut même dans le cas de composants *fonction* pousser le découplage à l'extrême et n'obtenir que des composants *dumb*, l'ensemble de la logique métier pouvant être externalisée au sein de [hooks personnalisés](https://fr.reactjs.org/docs/hooks-custom.html). Un hook personnalisé est une fonction commençant par le préfixe *use*, et cette fonction peut faire appel à d'autres hooks (notamment ceux de React comme *useState* ou *useEffect*).

- *Comment organiser ses fichiers au sein d'un projet React ?* [Voici la réponse du créateur de React](https://react-file-structure.surge.sh/), ou une réponse [un peu plus détaillée](https://fr.reactjs.org/docs/faq-structure.html). Personnellement, je recommande d'organiser les composants par fonctionnalité : cela permet d'utiliser les termes métier associés au projet afin de les retrouver efficacement (*si le nommage est conforme, cf. partie suivante*).

#### Donner du sens au code
En parallèle d'un refactoring global à redécouper l'architecture composant du projet, il est nécessaire de s'interroger sur le nommage des différents composants.
Un nommage sera *a minima* intelligible, aisément recherchable et concis afin d'être efficace. **Il doit refléter l'intention du composant**, par exemple **GameStateHistory**
en ce qui concerne le composant permettant d'afficher et naviguer entre les différents états de jeu enregistrés dans l'historique d'une partie.

#### Tester
##### Enzyme ou testing-library ?
[Testing Library](https://medium.com/@boyney123/my-experience-moving-from-enzyme-to-react-testing-library-5ac65d992ce). Cette librairie demande un état d'esprit différent de celui à adopter lorsque l'on utilise Enzyme : plutôt que d'écrire des tests qui se concentrent sur l'implémentation du composant (*Enzyme*), on va écrire des tests tournés vers l'impact que l'implémentation du composant aura sur l'interface utilisateur; que ce soit dans l'affichage ou la gestion des interactions avec l'utilisateur. [Pourquoi ?](https://kentcdodds.com/blog/testing-implementation-details)

Comme dirait *Kent C. Dodds*, créateur de *testing-library* : 
> Plus vos tests reflètent la manière dont votre programme est utilisé, plus la confiance que vous leur donnerez sera importante.

##### Snapshot testing, kézako ?
Nous pouvons aussi mettre en place du *snapshot testing* pour nos composants. Afin d'[être efficient](https://kentcdodds.com/blog/effective-snapshot-testing), ce mode de test requiert d'avoir connaissance du contexte dans lequel il peut être utilisé : il majoritairement a pour but d'empêcher les régressions en stockant l'état du rendu d'un composant et le comparer avec le rendu au sein du test. 

**Si jamais le test casse, c'est qu'une modification du code a eu lieu** : soit cette modification est *légitime* et il suffit d'écraser le snapshot par la nouvelle version de celui-ci; ou alors le test vient tout simplement d'empêcher *l'apparition d'une régression* en signalant au développeur que quelque chose d'imprévu a changé au sein du composant cible.

##### Bonnes pratiques
- Nommez et structurez vos tests intelligemment : 
  - Gardez à l'esprit que Jest concatène l'ensemble des titres de vos suites de test et de vos tests dans l'ordre dans lequel vous les imbriquez. Cela a pour but de vous inciter à écrire des tests dont les descriptions seront lisibles comme des phrases, intelligibles par un humain.
  - N'hésitez pas à imbriquer vos suites de test avec `describe` pour décrire une fonctionnalité du composant que vous testez
- Prenez avantage des tests paramétrés afin de faire varier l'état initial ainsi que le comportement attendu au sein du composant testé
- Maximisez l'utilisation de tests rédigés de façon asynchrone avec `async/await` et les requêtes de type [findBy](https://testing-library.com/docs/dom-testing-library/api-queries#findby). **JavaScript est un langage permettant d'écrire une majorité de code asynchrone, alors pourquoi ne pas le faire également pour les tests ?**
- Vous pouvez effectuer des requêtes sur des éléments ayant pour parent un élément spécifique de votre composant grâce à l'utilitaire [*within*](https://testing-library.com/docs/dom-testing-library/api-helpers#within-and-getqueriesforelement-apis)
- [Evitez les erreurs communes avec *testing-library*](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library/), en faisant notamment :
  - Plutôt que d'utiliser les attributs des éléments du DOM au sein de vos `expect`ations, utilisez les [matchers fournis au sein de Jest par testing-library](https://github.com/testing-library/jest-dom#custom-matchers)
  - Utilisez `act(() => {})` avec parcimonie, lorsque cela est nécessaire afin d'encapsuler une action pouvant modifier l'état du composant à tester
  - Utilisez la variable *screen* pour effectuer les requêtes sur vos éléments
  - *testing-library* est par design conçue pour vous forcer à créer des composants [aisément accessibles](https://www.a11yproject.com/) en [restreignant les possibilités afin de les requêter](https://testing-library.com/docs/react-testing-library/cheatsheet); forcez-vous à utiliser les rôles ARIA dans le testing (et donc la conception) de vos composants
