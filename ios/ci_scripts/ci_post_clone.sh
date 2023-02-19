#!/bin/sh

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
brew install node
brew link node

brew install yarn

yarn
pod install

echo "PACKAGE_NAME=$PACKAGE_NAME" > .env
echo "DYNAMIC_URL_SIGNUP=$DYNAMIC_URL_SIGNUP" >> .env
echo "GLEAP_TOKEN=$GLEAP_TOKEN" >> .env
echo "API_URL=$API_URL" >> .env