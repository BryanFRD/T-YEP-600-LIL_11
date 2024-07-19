FROM coturn/coturn:latest

COPY --chmod=755 generate_turn_config.sh /usr/local/bin/generate_turn_config.sh

EXPOSE 3478
EXPOSE 5349

CMD /usr/local/bin/generate_turn_config.sh && turnserver -c /etc/turnserver.conf
