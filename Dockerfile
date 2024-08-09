# Use the same base image as specified in your docker-compose file
FROM node:20.16.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the local application code to the container
COPY . /app

# Set environment variables (Note: these will need to be set at runtime)
#NEXT_SERVER_WEBSITE_DOMAIN
#NEXT_SERVER_API_DOMAIN

#NEXT_SERVER_API_BASE_PATH
#NEXT_SERVER_SUPERTOKENS_API_BASE_PATH
#NEXT_SERVER_WEBSITE_BASE_PATH
#NEXT_SERVER_WEBSITE_VERIFICATION_PAGE_PATH

#SUPERTOKENS_NETWORK_ALIAS
#NEXT_SERVER_SUPERTOKENS_CONNECTION_URI
#NEXT_SERVER_SUPERTOKENS_CORE
#NEXT_SERVER_SUPERTOKENS_APP_ID

#NEXT_SERVER_CORS_ALLOWED_ORIGINS
#NEXT_SERVER_DEFAULT_ORIGIN

#NEXT_SERVER_NATS_SERVER_URL
#NEXT_SERVER_NATS_AUTH_TOPIC

# Install dependencies
RUN npm install

# Define the command to run your application
CMD ["npm", "run", "start"]
