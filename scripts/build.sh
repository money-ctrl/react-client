#!/bin/sh

APP_VERSION="$(git rev-parse --short HEAD)" \
  vite build
