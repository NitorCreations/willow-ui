#!/bin/sh
cd $(dirname $(readlink -f $0))

if [ -z "$ARTIFACT_SERVICE_URL" ]; then
    ARTIFACT_SERVICE_URL="https://oss.sonatype.org/service/local/artifact/maven/redirect"
fi

if [ -z "$VERSION" ]; then
    VERSION="LATEST"
fi

SERVER_ARTIFACT="r=public&g=com.nitorcreations&a=willow-servers&c=uber&v=$VERSION"
DEPLOYER_ARTIFACT="r=public&g=com.nitorcreations&a=willow-deployer&p=sh&v=$VERSION"

if ! [ -r willow-servers-$VERSION.jar -a -x deployer.sh ]; then
    echo "artifacts missing downloading them..."
    curl -s -o willow-servers-$VERSION.jar -L "$ARTIFACT_SERVICE_URL?$SERVER_ARTIFACT" & 
    curl -s -o deployer.sh -L "$ARTIFACT_SERVICE_URL?$DEPLOYER_ARTIFACT" &
    wait
    chmod 755 deployer.sh
fi

exec ./deployer.sh start test file:./backend.properties?BUILD=$VERSION
