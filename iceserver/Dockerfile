FROM coturn/coturn:latest

COPY turnserver.conf /etc/turnserver.conf

EXPOSE 3478
EXPOSE 3478/udp
EXPOSE 5349
EXPOSE 5349/udp

CMD ["turnserver", "-c", "/etc/turnserver.conf", "--log-file=/var/log/turnserver/turnserver.log", "--lt-cred-mech"]