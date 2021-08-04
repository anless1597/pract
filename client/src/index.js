import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import TaskStore from "./store/TaskStore";
import'./css/index.css'
import'./css/pages.css'


export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        tasks: new TaskStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

