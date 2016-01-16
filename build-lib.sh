#!/bin/bash
VERSION=$(./gradlew -q Version)
echo "Project Version: ${$VERSION}"
RELEASE_NAME=$"./logcatio-${VERSION}.aar"
if [ -f $RELEASE_NAME ]; then
  rm $RELEASE_NAME 
fi
rm -rf ./build
echo "building release"
./gradlew assembleRelease
cp ./lib/build/outputs/aar/logcatio-release.aar $RELEASE_NAME
echo "generating pom"
./gradlew createPom
