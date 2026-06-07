import React from 'react';

const ExecutionControl = ({ status, output, onRun, disabled }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'RUNNING': return '#3b82f6';
      case 'PASSED': return '#10b981';
      case 'FAILED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="execution-control">
      <div className="panel-header">
        <h3>Execution Control</h3>
        <span className="status-badge" style={{ backgroundColor: getStatusColor() }}>
          {status}
        </span>
      </div>
      
      <button 
        className="run-button" 
        onClick={onRun} 
        disabled={disabled || status === 'RUNNING'}
      >
        {status === 'RUNNING' ? 'Executing...' : 'Run Tests'}
      </button>

      <div className="output-container">
        <h4>Execution Output</h4>
        <pre className="output-log" style={{ color: output ? '#10b981' : '#475569' }}>
          {output || 'Terminal idle. Select a project and run tests...'}
        </pre>
      </div>
    </div>
  );
};

export default ExecutionControl;
