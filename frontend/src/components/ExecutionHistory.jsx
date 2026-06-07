import React from 'react';

const ExecutionHistory = ({ history, onClear }) => {
  return (
    <div className="history-panel card">
      <div className="panel-header">
        <h3>Execution History</h3>
        <button className="clear-button" onClick={onClear}>Clear History</button>
      </div>
      
      {history.length === 0 ? (
        <p className="no-history">No recent executions found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Suite</th>
                <th>Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.projectLabel || item.project}</td>
                  <td>{item.suite.charAt(0).toUpperCase() + item.suite.slice(1)}</td>
                  <td>
                    <span className={`status-text ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExecutionHistory;
