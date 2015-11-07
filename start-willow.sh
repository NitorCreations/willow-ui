#!/bin/sh

if [ -z "$BUILD" ]; then
  BUILD=$(curl -s https://bob.nitorio.us/jenkins/job/willow-integrationtests/api/xml/?xpath=/mavenModuleSet/lastSuccessfulBuild/number | awk -F'<|>' '{ print $3 }')
fi

if ! [ -r willow-servers-$BUILD.jar -a -x deployer.sh ]; then
  ARTIFACT_PATH=$(curl -s "https://bob.nitorio.us/jenkins/job/willow-integrationtests/$BUILD/com.nitorcreations\$willow-servers/api/xml?xpath=/mavenBuild/artifact\[contains(relativePath/text(),'uber.jar')\]/relativePath" | awk -F'<|>' '{ print $3 }')
  DEPLOYER_ARTIFACT_PATH=$(curl -s "https://bob.nitorio.us/jenkins/job/willow-integrationtests/$BUILD/com.nitorcreations\$willow-deployer/api/xml?xpath=/mavenBuild/artifact\[contains(relativePath/text(),'.sh')\]/relativePath" | awk -F'<|>' '{ print $3 }')
  curl -s -o willow-servers-$BUILD.jar "https://bob.nitorio.us/jenkins/job/willow-integrationtests/$BUILD/com.nitorcreations\$willow-servers/artifact/$ARTIFACT_PATH" &
  curl -s -o deployer.sh "https://bob.nitorio.us/jenkins/job/willow-integrationtests/$BUILD/com.nitorcreations\$willow-deployer/artifact/$DEPLOYER_ARTIFACT_PATH" &
  wait
  chmod 755 deployer.sh
fi
./deployer.sh start test file:./backend.properties?BUILD=$BUILD
