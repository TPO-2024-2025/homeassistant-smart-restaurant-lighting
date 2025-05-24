import React from "react";
import "./App.css";
import { Gauge, Home, Sparkles, Store } from "lucide-react";

function App() {
  return (
    <div className="container">
      <h1>Restaurant Lighting Control Panel</h1>
      <div className="grid">
        <a href="https://s04.duckdns.org/" target="_blank" rel="noopener noreferrer">
          <div className="card">
            <Gauge size={48} className="icon"/>
            <h2>Lighting Dashboard</h2>
            <p>Control and monitor lights throughout the restaurant.</p>
          </div>
        </a>
        <a href="https://miag676.github.io/Tpo-SceneGenerator/" target="_blank" rel="noopener noreferrer">
          <div className="card">
            <Sparkles size={48} className="icon"/>
            <h2>Scene Generator</h2>
            <p>Create custom lighting scenes for different restaurant moods.</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;
