#!/usr/bin/env bash

set -e

examplesRoot="$(cd -P "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"/examples

echo ">>> building examples from '$examplesRoot'"

for d in "$examplesRoot"/*/; do
  name="$(basename "$d")"
  echo ">>> building example '$name'"
  cd "$examplesRoot/$name"
  npm install --silent
  npx vite build
done

echo ">>> all examples built"
