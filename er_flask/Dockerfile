FROM python:3.8.16


# project directory 생성
WORKDIR /er
COPY . /er

# 이것 안하면 portaudio 설치 안된다.
RUN echo "Acquire::Check-Valid-Until \"false\";\nAcquire::Check-Date \"false\";" | cat > /etc/apt/apt.conf.d/10no--check-valid-until
RUN apt-get update
# RUN apt-get -y upgrade

# 이것 안하면 portaudio 설치 안된다.
RUN apt-get install -y portaudio19-dev
RUN pip install pip==23.0.1
# RUN pip install scikit-learn
RUN pip install -r requirements2.txt

# port 5000번
EXPOSE 5000

CMD ["python", "app.py"]