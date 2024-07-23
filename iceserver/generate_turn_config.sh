#!/bin/bash

REALM=${REALM:-localhost}
USER=${USER:-username:password}
ENVIRONMENT=${ENVIRONMENT:-dev}
CERTS_PATH=${CERTS_PATH:-/certs}
FULLCHAIN_PATH=${FULLCHAIN_PATH:-/certs/fullchain.pem}
PRIVKEY_PATH=${PRIVKEY_PATH:-/certs/privkey.pem}

cat <<EOF > /etc/turnserver.conf
listening-port=3478
tls-listening-port=5349
fingerprint
lt-cred-mech
realm=$REALM
user=$USER
EOF

if [ "$ENVIRONMENT" = "prod" ]; then
    echo "Using production certificates"
    cat <<EOF >> /etc/turnserver.conf
cert=$FULLCHAIN_PATH
pkey=$PRIVKEY_PATH
EOF
else
    echo "Running in development mode, no SSL"
fi