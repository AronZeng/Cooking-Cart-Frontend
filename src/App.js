import logo from './logo.svg';
import './App.css';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const auth = useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {auth}
        </a>
      </header>
    </div>
  );
}

export default App;
