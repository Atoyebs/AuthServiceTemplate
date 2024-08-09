#!/bin/bash

# Set variables
IMAGE_NAME="kf-auth-service"
RETRY_LIMIT=3
RETRY_DELAY=5  # in seconds
DOCKERFILE_PATH="./Dockerfile"
USE_TERMINAL_NOTIFIER=false


# Function to check if the OS is macOS
check_mac_os() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Operating system is macOS."
    return 0
  else
    echo "Operating system is NOT macOS."
    return 1
  fi
}

# Function to check if terminal-notifier is installed
check_terminal_notifier() {
  if command -v terminal-notifier >/dev/null 2>&1; then
    echo "terminal-notifier is installed."
    return 0
  else
    echo "terminal-notifier is not installed."
    echo "Please install terminal-notifier using the following command:"
    echo "  brew install terminal-notifier"
    return 1
  fi
}

# Function to build the Docker image
build_image() {
  echo "Building Docker image: $IMAGE_NAME"

  # Attempt to build the image
  docker build -t $IMAGE_NAME -f $DOCKERFILE_PATH . > logs/docker_build_$(date +"%Y%m%d_%H%M").log 2>&1
  return $?
}

# Function to handle build retries
retry_build() {
  local attempt=1
  while [ $attempt -le $RETRY_LIMIT ]; do
    build_image
    build_status=$?

    if [ $build_status -eq 0 ]; then
      echo "Docker image built successfully on attempt $attempt."
      return 0
    else
      echo "Attempt $attempt failed. Retrying in $RETRY_DELAY seconds..."
      sleep $RETRY_DELAY
      attempt=$((attempt + 1))
    fi
  done

  echo "Failed to build Docker image after $RETRY_LIMIT attempts."
  return 1
}

# Main script logic
echo "Starting Docker image build process..."

# Check if OS is macOS and terminal-notifier is installed
if check_mac_os && check_terminal_notifier; then
  USE_TERMINAL_NOTIFIER=true
fi

# Proceed with building the Docker image
retry_build
final_status=$?

if [ $final_status -ne 0 ]; then
  echo "Build process failed. Please check the error messages and try again."
  # Send failure notification if conditions are met
  if [ "$USE_TERMINAL_NOTIFIER" = true ]; then
    terminal-notifier -title "Kasefile Auth Server Build Failure!" -message "Image build failed! Please check logs"
  fi
  exit 1
else
  echo "Docker image '$IMAGE_NAME' built successfully."
  # Send success notification if conditions are met
  if [ "$USE_TERMINAL_NOTIFIER" = true ]; then
    terminal-notifier -title "Kasefile Auth Server Build Success!" -message "Image build completed successfully!"
  fi
  exit 0
fi
