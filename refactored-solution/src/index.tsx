import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game/Game';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <Game />
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
