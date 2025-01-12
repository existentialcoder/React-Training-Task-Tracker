# Prerequisites
- [Python 3](https://www.python.org/downloads/)
- [pip3](https://pypi.org/project/pip/)
- [virtual env](https://docs.python.org/3/library/venv.html)

# Steps to run locally
- Start the server using pre-written script.
- Give permissions prior to that.
- Navigate to the [script](./start_server.sh) to know more
	```shell
	# Give permissions
	sudo chmod +x
	./start_server.sh
	```
# Setup DB
- Create a superuser for the DB with `username` and `password`
	```shell
	python3 manage.py createsuperuser   
	```
- Navigate to `http://localhost:8000/admin`, login with the credentials and add entries to the `tasks` table

# Testing API
APIs that are hosted under `/api` can be tested either using Postman or with the React client 
