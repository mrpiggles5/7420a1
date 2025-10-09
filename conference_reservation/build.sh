#!/bin/bash
set -e

echo "🚀 Running migrations..."
python3 manage.py migrate --noinput

echo "📦 Collecting static files..."
python3 manage.py collectstatic --noinput

echo "✅ Build complete."
