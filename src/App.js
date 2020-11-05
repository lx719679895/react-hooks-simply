import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UseState from './pages/useState';
import UseEffect from './pages/useEffect';
import UseRef from './pages/useRef';
import UseContext from './pages/useContext';
import UseReducer from './pages/useReducer';
import UseMemo from './pages/useMemo';

function App() {
  return (
    <Router>
      <ul>
        <li><Link to='/useState'>useState</Link></li>
        <li><Link to='/useEffect'>useEffect</Link></li>
        <li><Link to='/useRef'>useRef</Link></li>
        <li><Link to='/useContext'>useContext</Link></li>
        <li><Link to='/useReducer'>useReducer</Link></li>
        <li><Link to='/useMemo'>useMemo</Link></li>
        {/* <li><Link to='/custom-hooks'>自定义Hook</Link></li> */}
      </ul>
      <Route path="/useState"><UseState/></Route>
      <Route path="/useEffect"><UseEffect/></Route>
      <Route path="/useRef"><UseRef/></Route>
      <Route path="/useContext"><UseContext/></Route>
      <Route path="/useReducer"><UseReducer/></Route>
      <Route path="/useMemo"><UseMemo/></Route>
    </Router>
  );
}

export default App;
