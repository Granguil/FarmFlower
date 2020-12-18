import React from 'react';
import logo from './logo.svg';
import {useEffect} from 'react';
import { Counter } from './features/counter/Counter';
import {Farm} from './features/farm/Farm';
import './App.css';
import { selectAvocatNumber, selectAvocatField, selectCarotteNumber,selectCarotteField, chrono, selectCarotteTime, selectAvocatTime, selectCarotteCounter, selectAvocatCounter, selectPlayedTime } from './features/farm/farmSlice';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(chrono())
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <span>Temps de Jeu : {useSelector(selectPlayedTime)}</span>
        <Farm name="carotte" number={useSelector(selectCarotteNumber)} fields={useSelector(selectCarotteField)} time={useSelector(selectCarotteTime)} counter={useSelector(selectCarotteCounter)}/>
        <Farm name="avocat" number={useSelector(selectAvocatNumber)} fields={useSelector(selectAvocatField)} time={useSelector(selectAvocatTime)} counter={useSelector(selectAvocatCounter)}/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
