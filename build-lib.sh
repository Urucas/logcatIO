#!/bin/bash
generate_pom() {
XML="<metadata>
    <groupId>com.urucas</groupId>
    <artifactId>logcatio</artifactId>
    <version>$1</version>
    <versioning>
      <versions>
        <version>$1</version>
      </versions>
      <lastUpdated>$2</lastUpdated>
    </versioning>
  </metadata>"
  echo $XML
}
TIMESTAMP=$(date +%s)
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
POM=$(generate_pom $VERSION $TIMESTAMP)
echo -n $POM >> maven-metadata.xml

