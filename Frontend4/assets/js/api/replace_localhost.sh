#!/bin/bash

# Define the directory where the script will run
DIRECTORY="/home/nginx_user/www/fullstackproject/Frontend4/assets/js"

# Find all files in the directory recursively and replace '104.248.136.206' with '104.248.136.206'
find "$DIRECTORY" -type f -exec sed -i 's/104.248.136.206/104.248.136.206/g' {} +

echo "Replaced '104.248.136.206' with '104.248.136.206' in all files in $DIRECTORY."
