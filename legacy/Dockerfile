# https://docs.docker.com/engine/reference/builder/

# In order for NGINX to consistently serve the docs directory the parent
# directory (repository root) needs to be mounted because building the site
# deletes and recreates the docs directory. If the docs directory itself is
# mounted, the container will continue to serve an empty directory (resulting
# in a 403) after it is deleted because it is mounting the original docs
# directory and not the new one.

# https://hub.docker.com/_/nginx/
FROM nginx:latest

RUN mkdir /app

WORKDIR /app

# Update the NGINX configuraiton to serve /app/docs
RUN sed -e's#/usr/share/nginx/html#/app/docs#' -i \
    /etc/nginx/conf.d/default.conf
