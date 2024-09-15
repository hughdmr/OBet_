FROM --platform=linux/amd64 python:3.12

WORKDIR /usr/src/app

# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get install -y google-chrome-stable

# set display port to avoid crash
ENV DISPLAY=:99

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "fastapi", "run", "./ScrapperAPI.py"]

EXPOSE 8000