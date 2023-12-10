FROM python:3.11-alpine3.17

WORKDIR /app

COPY . /app

RUN pip3 install -r requirements.txt 

CMD python3 manage.py migrate \
    && python3 manage.py collectstatic \
    && python3 manage.py runserver 0.0.0.0:8000
