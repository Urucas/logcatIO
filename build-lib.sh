#!/bin/bash
VERSION=$(./gradlew -q Version)
echo "Project Version"
echo $VERSION
RELEASE_NAME=$"./logcatio-${VERSION}.aar"
if [ -f $RELEASE_NAME ]; then
  rm $RELEASE_NAME 
fi
rm -rf ./build
./gradlew aR
cp ./lib/build/outputs/aar/lib-release.aar $RELEASE_NAME
