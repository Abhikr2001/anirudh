const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const { projects, suites } = require('./config/projectSuites');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory flag to prevent simultaneous executions
let isRunning = false;

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// 3. Health check route
app.get('/', (req, res) => {
  res.json({
    message: "Playwright Test Portal Backend is running",
    status: "Healthy"
  });
});

// 4. API to run tests
app.post('/api/run-test', (req, res) => {
  const { project, suite } = req.body;

  // 15. Check if already running
  if (isRunning) {
    return res.status(429).json({
      status: 'error',
      message: 'Another test execution is already in progress. Please wait.'
    });
  }

  // 6. Whitelist validation
  if (!projects.includes(project)) {
    return res.status(400).json({ status: 'error', message: 'Invalid project value provided.' });
  }
  if (!suites.includes(suite)) {
    return res.status(400).json({ status: 'error', message: 'Invalid suite value provided.' });
  }

  isRunning = true;
  
  // 13. Construct command - construction is internal and uses validated values
  const automationPath = path.join(__dirname, '..', 'automation');
  const testPath = `tests/${project}`;
  const grepPattern = `@${suite}`;
  
  console.log(`\n[BACKEND] Triggering execution: ${project} - ${suite}`);
  console.log(`[BACKEND] Command: npx playwright test ${testPath} --grep ${grepPattern}`);

  // 10. Execute using spawn safely
  const child = spawn('npx', ['playwright', 'test', testPath, '--grep', grepPattern], {
    cwd: automationPath,
    shell: true // Required for npx on Windows
  });

  let output = '';
  let errorOutput = '';

  child.stdout.on('data', (data) => {
    const chunk = data.toString();
    output += chunk;
    process.stdout.write(chunk); // 17. Print to terminal
  });

  child.stderr.on('data', (data) => {
    const chunk = data.toString();
    errorOutput += chunk;
    process.stderr.write(chunk); // 17. Print to terminal
  });

  child.on('close', (code) => {
    isRunning = false; // Reset flag
    const status = code === 0 ? 'PASSED' : 'FAILED';
    
    console.log(`[BACKEND] Execution finished with status: ${status}\n`);

    // 14. Return JSON response
    res.json({
      status,
      project,
      suite,
      command: `npx playwright test ${testPath} --grep ${grepPattern}`,
      output,
      error: errorOutput || (code !== 0 ? 'Process exited with error code' : ''),
      exitCode: code
    });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
