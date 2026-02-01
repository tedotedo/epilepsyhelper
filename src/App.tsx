import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import SeizureDiary from './pages/SeizureDiary';
import CarePlan from './pages/CarePlan';
import CareTeam from './pages/CareTeam';
import Emergency from './pages/Emergency';
import Resources from './pages/Resources';
import Procedures from './pages/Procedures';
import About from './pages/About';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="seizure-diary" element={<SeizureDiary />} />
          <Route path="care-plan" element={<CarePlan />} />
          <Route path="care-team" element={<CareTeam />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="resources" element={<Resources />} />
          <Route path="procedures" element={<Procedures />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
