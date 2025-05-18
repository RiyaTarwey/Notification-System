# Use the official Node.js image.
FROM node:22

# Create and set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Compile TypeScript to JavaScript (if using TypeScript).
RUN npm run build

# Expose port 4000 (as per your app).
EXPOSE 4000

# Start the application.
CMD [ "npm", "run","dev" ]
