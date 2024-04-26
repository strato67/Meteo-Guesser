FROM mongo

RUN apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

RUN wget http://bulk.openweathermap.org/sample/current.city.list.json.gz \
  && gunzip current.city.list.json.gz \
  && mv current.city.list.json /data/current.city.list.json

COPY init.sh /docker-entrypoint-initdb.d/init.sh

RUN chmod +x /docker-entrypoint-initdb.d/init.sh


