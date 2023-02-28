#!/bin/bash

TMPDIR="/usr/src/app/tmp/"
if [ -d "$TMPDIR" ]; then rm -rf "$TMPDIR"; fi

rm -f /myapp/tmp/pids/server.pid

rake db:create db:migrate db:seed

rails server -b 0.0.0.0