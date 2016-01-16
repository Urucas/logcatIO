#!/bin/bash
VERSION=$(./gradlew -q Version)
echo "Project version: ${VERSION}"
RELEASE_NAME=$"./logcatio-${VERSION}.aar"
if [ ! -f $RELEASE_NAME ]; then
  echo "buiild release $RELEASE_NAME not found!"
  exit 1
fi
MAVEN_FILE="maven-metadata.xml"
if [ ! -f $MAVEN_FILE ]; then
  echo "buiild maven $MAVEN_FILE not found!"
  exit 1
fi
git checkout gh-pages
RELEASE_FOLDER=$"com/urucas/logcatio/${VERSION}/"
if [ ! -d $RELEASE_FOLDER ]; then
  mkdir $RELEASE_FOLDER
fi
RELEASE_PATH=$"${RELEASE_FOLDER}logcatio-${VERSION}.aar"
mv  $RELEASE_NAME $RELEASE_PATH
MAVEN_PATH=$"com/urucas/logcatio/$MAVEN_FILE"
mv $MAVEN_FILE $MAVEN_PATH
git add $RELEASE_PATH
git add $MAVEN_PATH
git ci $RELEASE_PATH $MAVEN_PATH -m "update release"
git push origin gh-pages
git checkout master
