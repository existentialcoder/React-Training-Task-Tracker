# Create and activate a virtual env
python3 -m venv .venv
. .venv/bin/activate

#  Install all the dependencies
pip3 install django django-cors-headers djangorestframework

# Create DB migrations
python3 manage.py makemigrations

# Run the DB migrations
python3 manage.py migrate

# Start server on default port
python3 manage.py runserver
