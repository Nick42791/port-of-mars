# port-of-mars

[![Build Status](https://travis-ci.com/virtualcommons/port-of-mars.svg?token=Axd1f7q98op1tRxrKi92&branch=master)](https://travis-ci.com/virtualcommons/port-of-mars)

## Setup

To create a development environment for your client and server run

```bash
./build.sh build dev
```

This creates a `docker-compose.yml` file and builds the `client` and `server` docker images.

Now run

```
docker-compose up -d
```

and you should have a working development environment.
