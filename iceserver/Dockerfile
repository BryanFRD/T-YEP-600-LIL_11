FROM debian:latest

RUN apt-get update && apt-get install -y \
    coturn \
    sudo \
    && rm -rf /var/lib/apt/lists/*

COPY generate_turn_config.sh /usr/local/bin/generate_turn_config.sh

RUN chmod +x /usr/local/bin/generate_turn_config.sh

EXPOSE 3478 5349

RUN ./usr/local/bin/generate_turn_config.sh

CMD ["turnserver", "-c", "/etc/turnserver.conf"]
