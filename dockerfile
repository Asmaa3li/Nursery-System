# Use the official Node.js image from the Docker Hub
FROM node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm install -g nodemon


# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm" , "run" , "startDev"]

# Command to run your application
# FROM node:alpine
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install 
# COPY . .
# EXPOSE 3001
