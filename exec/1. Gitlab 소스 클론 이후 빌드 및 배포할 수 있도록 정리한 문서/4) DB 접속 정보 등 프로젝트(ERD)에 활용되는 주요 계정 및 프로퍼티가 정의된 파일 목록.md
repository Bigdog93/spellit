
### 📖 A. ERD

![Untitled](https://user-images.githubusercontent.com/72541544/229737321-5d437bea-f896-475b-a919-0c0b3debdad9.png)



&nbsp;

&nbsp;


### 📖 B. mysql  

✔ `mysql` 도커 컨테이너 접속

```bash

docker exec -it j8d201_mysql /bin/bash

```

![bash](https://user-images.githubusercontent.com/72541544/229697289-bf437f9e-9528-4945-85f7-80b63ecd3e03.png)

&nbsp;


**✔ mysql 접속**


```bash

# mysql 접속

mysql -u root -p

  

# 패스워드 입력

ssafy

```

![%EC%A0%91%EC%86%8D](https://user-images.githubusercontent.com/72541544/229697288-e6971d65-1161-4370-8446-b8f8f8b24541.png)


&nbsp;


**✔ mysql workbench 설정**


![workbench](https://user-images.githubusercontent.com/72541544/229697285-2c12201b-171c-4d22-8d44-2c92799c9320.png)


  

- `Hostname` : j8d201.p.ssafy.io

- `Port` : 3305

- `Username` : root

- `password` : ssafy


&nbsp;



**✔ springboot application.yml 수정**

`application.yml`에서 database 수정

`url`, `username` 수정

  
![%EC%88%98%EC%A0%95](https://user-images.githubusercontent.com/72541544/229697286-fbfd4d34-daab-43be-83fd-e6e59e3b770b.png)
  

&nbsp;

&nbsp;

