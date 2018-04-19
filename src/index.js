import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';


const MaterialApp = () => (
    <MuiThemeProvider>
        <App store={store}/>
    </MuiThemeProvider>
);

ReactDOM.render(<MaterialApp/>, document.getElementById('root'));
registerServiceWorker();


