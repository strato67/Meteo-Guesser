#!/bin/bash

mongoimport --db locations --collection cities --type json --file "./data/current.city.list.json" --jsonArray