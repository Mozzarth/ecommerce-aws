FROM mysql:8.0.23


LABEL mail="moisescaicedo15@gmail.com"
LABEL name="Moises David Caicedo Corena"

ENV MYSQL_USER=uPrueba
ENV MYSQL_PASSWORD=YOUR_PASS
ENV MYSQL_DATABASE=muncher
ENV MYSQL_ROOT_PASSWORD=YOUR_PASS_ROOT
# ENV MYSQL_RANDOM_ROOT_PASSWORD=YES
COPY ./scripts/ /docker-entrypoint-initdb.d

EXPOSE 3306:3306