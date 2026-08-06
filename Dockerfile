FROM node:18-alpine

WORKDIR /app

# Copy package.json FIRST (so Docker caches dependencies)
COPY package*.json ./

# Install ALL dependencies (including cors)
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]