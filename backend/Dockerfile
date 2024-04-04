FROM python:3.11-alpine3.17

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app

RUN pip3 install -r requirements.txt 

CMD cd station88back \
    && python3 manage.py migrate \
    && python3 manage.py collectstatic --noinput\
    && python3 manage.py runserver 0.0.0.0:8000
