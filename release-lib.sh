#!/bin/bash
echo "Project version"
VERSION=$(./gradlew -q Version)
echo $VERSION
RELEASE_NAME=$"./logcatio-${VERSION}.aar"
if [ ! -f $RELEASE_NAME ]; then
  exit 1
  echo "buiild release $RELEASE_NAME not found!"
fi
git checkout gh-pages
RELEASE_FOLDER=$"com/urucas/logcatio/${VERSION}/"
if [ ! -d $RELEASE_FOLDER ]; then
  mkdir $RELEASE_FOLDER
fi
RELEASE_PATH=$"${RELEASE_FOLDER}logcatio-${VERSION}.aar"
mv  $RELEASE_NAME $RELEASE_PATH
git add $RELEASE_PATH
git ci $RELEASE_PATH -m "update release"
git push origin gh-pages
git checkout master
