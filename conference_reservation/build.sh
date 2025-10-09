#!/bin/bash
set -e

echo "🚀 Collecting static files..."
python3 manage.py collectstatic --noinput

echo "✅ Build complete."
