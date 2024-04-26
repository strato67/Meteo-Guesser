FROM mongo

COPY current.city.list.json /data/current.city.json
COPY init.sh /docker-entrypoint-initdb.d/init.sh

RUN chmod +x /docker-entrypoint-initdb.d/init.sh


