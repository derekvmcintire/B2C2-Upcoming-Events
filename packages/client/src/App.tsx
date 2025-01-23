import "./App.css";
import "@mantine/core/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Submit from "./components/Submit";
import { MantineProvider } from "@mantine/core";

function App(): JSX.Element {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
