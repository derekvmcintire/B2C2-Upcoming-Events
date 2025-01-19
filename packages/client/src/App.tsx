import "./App.css";
import '@mantine/core/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Submit from "./components/Submit";

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  );
}

export default App;
