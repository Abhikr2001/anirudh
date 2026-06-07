import React from 'react';

const ExecutionPanel = ({ status, output, onRun, disabled }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'Running': return '#3b82f6';
      case 'Passed': return '#10b981';
      case 'Failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="execution-panel">
      <div className="panel-header">
        <h3>Execution Control</h3>
        <span className="status-badge" style={{ backgroundColor: getStatusColor() }}>
          {status}
        </span>
      </div>
      
      <button 
        className="run-button" 
        onClick={onRun} 
        disabled={disabled || status === 'Running'}
      >
        {status === 'Running' ? 'Executing...' : 'Run Tests'}
      </button>

      {output && (
        <div className="output-container">
          <h4>Execution Output</h4>
          <pre className="output-log">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default ExecutionPanel;
