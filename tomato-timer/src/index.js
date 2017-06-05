import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
