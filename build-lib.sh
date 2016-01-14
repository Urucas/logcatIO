#!/bin/bash
rm -rf ./build
rm logcatio-1.0.1.aar
./gradlew aR
cp ./lib/build/outputs/aar/lib-release.aar ./logcatio-1.0.1.aar
