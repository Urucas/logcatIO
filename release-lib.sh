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
echo $RELEASE_PATH
exit 1
mv  $RELEASE_NAME $RELEASE_PATH
exit 1
git ci com/urucas/logcatio/1.0.1/logcatio-1.0.1.aar -m "update release"
git push origin gh-pages
git checkout master
