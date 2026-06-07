import React from 'react';
import { suites } from '../config/projectSuites';

const SuiteSelector = ({ selectedSuite, onSelect, disabled }) => {
  return (
    <div className="selector-group">
      <label htmlFor="suite-select">Select Test Suite</label>
      <select 
        id="suite-select" 
        value={selectedSuite} 
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
      >
        <option value="">-- Choose a Suite --</option>
        {suites.map(suite => (
          <option key={suite} value={suite}>
            {suite.charAt(0).toUpperCase() + suite.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SuiteSelector;
