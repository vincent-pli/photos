#!/bin/sh

if [ ! -d ~/tmp ]; then
  mkdir ~/tmp
fi

docker run -d -p 3307:3306 --name mydb -v ~/tmp:/var/lib/mysql db:v1