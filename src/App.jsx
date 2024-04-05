import './App.css';
import HeroBanner from './components/HeroBanner/HeroBanner';
import Timer from './components/Timer/Timer';

function App() {
  return (
    <div className="page-container">
      <HeroBanner />
      <Timer />
    </div>
  );
}

export default App