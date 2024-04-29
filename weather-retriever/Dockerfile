FROM python:3.11-slim as development

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python3" ]
CMD ["api.py"]