import './App.css';
import Home from './components/Home/index';
import Nav from './components/Navigation/index';

function App() {
  return (
    <div className="App">
      {/* render navigation */}
      <Nav />
      {/* render home page */}
      <Home />
    </div>
  );
}

export default App;
