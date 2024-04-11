# https://docs.docker.com/reference/dockerfile/

# https://hub.docker.com/_/node/
FROM node:14

WORKDIR /app

EXPOSE 8080

COPY startupservice.sh /usr/local/sbin/startupservice.sh
RUN chmod +x /usr/local/sbin/startupservice.sh
CMD /usr/local/sbin/startupservice.sh
