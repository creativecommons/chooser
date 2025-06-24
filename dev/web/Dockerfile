# https://docs.docker.com/engine/reference/builder/

# https://hub.docker.com/_/httpd
FROM httpd:2.4

# Update Apache2 configuration

# Set ServerName to prevent warning
RUN sed -e's/^#ServerName.*/ServerName static/' -i'' \
    /usr/local/apache2/conf/httpd.conf

# Enable mod_rewrite
# https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html
RUN sed -e's/^#LoadModule rewrite/LoadModule rewrite/' -i'' \
    /usr/local/apache2/conf/httpd.conf

# Include site configuration
RUN echo 'Include conf/config/site.conf' \
    | tee -a /usr/local/apache2/conf/httpd.conf
