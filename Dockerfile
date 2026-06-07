# Use official Playwright base image with Node.js and browser dependencies pre-installed
FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# Set container working directory
WORKDIR /app

# Copy repository contents
COPY . .

# Install dependencies for Playwright automation suite
WORKDIR /app/automation
RUN npm install

# Install dependencies for Express backend
WORKDIR /app/backend
RUN npm install

# Set working directory back to backend
WORKDIR /app/backend

# Render binds to process.env.PORT, default to 5000
ENV PORT=5000
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]
