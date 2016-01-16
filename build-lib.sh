#!/bin/bash
VERSION=$(./gradlew -q Version)
echo "Project Version: ${VERSION}"
RELEASE_NAME=$"./logcatio-${VERSION}.aar"
if [ -f $RELEASE_NAME ]; then
  rm $RELEASE_NAME 
fi
MAVEN_FILE="maven-metadata.xml"
if [ -f $MAVEN_FILE ]; then
  rm "maven-metadata.xml"
fi
if [ -d "./build" ]; then
  rm -rf ./build
fi
echo "building release"
./gradlew assembleRelease
cp ./logcatio/build/outputs/aar/logcatio-release.aar $RELEASE_NAME
echo "generating pom"
./gradlew createPom
exit 0
