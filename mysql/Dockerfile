FROM mysql

ENV MYSQL_ROOT_PASSWORD letmein
ENV MYSQL_DATABASE media
ENV MYSQL_USER pengli
ENV MYSQL_PASSWORD password


COPY ./schema.sql /docker-entrypoint-initdb.d/



