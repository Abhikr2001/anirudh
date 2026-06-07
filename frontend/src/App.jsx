import React, { useState, useEffect } from 'react';
import ProjectSelector from './components/ProjectSelector';
import SuiteSelector from './components/SuiteSelector';
import ExecutionControl from './components/ExecutionControl';
import ExecutionHistory from './components/ExecutionHistory';
import { projects } from './config/projectSuites';

function App() {
  const [project, setProject] = useState('');
  const [suite, setSuite] = useState('');
  const [status, setStatus] = useState('IDLE');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('executionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleRun = async () => {
    setStatus('RUNNING');
    setOutput('Initializing tests...');

    const projectData = projects.find(p => p.value === project);
    const projectLabel = projectData ? projectData.label : project;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/run-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project, suite })
      });

      const data = await response.json();
      
      setStatus(data.status); // PASSED or FAILED
      setOutput(data.output || data.error || data.message);

      // Add to history
      const newHistoryItem = {
        project,
        projectLabel,
        suite,
        status: data.status,
        timestamp: new Date().toLocaleString()
      };

      const updatedHistory = [newHistoryItem, ...history.slice(0, 49)]; // Store up to 50
      setHistory(updatedHistory);
      localStorage.setItem('executionHistory', JSON.stringify(updatedHistory));

    } catch (error) {
      setStatus('FAILED');
      setOutput(`Error connecting to backend: ${error.message}`);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('executionHistory');
  };

  return (
    <div className="container">
      <header>
        <h1>Banking QA Automation Portal</h1>
        <p>Reliable test execution management for banking solutions.</p>
      </header>

      <main className="dashboard">
        <div className="controls-section card">
          <ProjectSelector 
            selectedProject={project} 
            onSelect={(val) => { setProject(val); setSuite(''); }} 
          />
          <SuiteSelector 
            selectedSuite={suite} 
            onSelect={setSuite} 
            disabled={!project} 
          />
        </div>

        <ExecutionControl 
          status={status} 
          output={output} 
          onRun={handleRun} 
          disabled={!project || !suite} 
        />

        <ExecutionHistory 
          history={history} 
          onClear={clearHistory} 
        />
      </main>

      <footer>
        <p>&copy; 2024 Playwright Automation Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
