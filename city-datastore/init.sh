#!/bin/bash

#wget -O "current.city.list.json.gz" "https://bulk.openweathermap.org/sample/current.city.list.json.gz" 

#gunzip -f "current.city.list.json"

mongoimport --db locations --collection cities --type json --file "./data/current.city.json" --jsonArray