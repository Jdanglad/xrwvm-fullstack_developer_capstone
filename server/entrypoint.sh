
echo "Making migrations and migrating database. "
python manage.py makemigrations --noinput
python manage.py migrate --run-syncdb --noinput
python manage.py collectstatic --noinput
exec "$@"
