#!/bin/bash

TMPDIR="/usr/src/app/tmp/"
if [ -d "$TMPDIR" ]; then rm -rf "$TMPDIR"; fi

# NOTE: this will ignore any seed data
rake db:create

rails server -b 0.0.0.0