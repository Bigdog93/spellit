# 📚 1. 동작과정

> **💡 참고** nginx가 실행되고 있지 않은 상태에서 실행한다. nginx가 실행되고 있는 상태라면 letsenscrypt 인증서를 발급 받을 수 없다.

### 📖 A. openvidu letsenscrpt 인증서를 발급받기


![%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%B0%9C%EA%B8%89](https://user-images.githubusercontent.com/72541544/229950939-46eaa48e-b4e4-4e05-99d3-0faed9964a75.png)


-   `letsenscrypt`으로 부터 요청해서 인증서를 발급해온다.
-   `letsenscrypt` 의 default port 80, 443
-   개인적인 생각으로 `letsensrypt` 는 openvidu 사용하기 위한 인증 발급 곳이다. (로그인와 같은 것)

&nbsp;

### 📖 B. 이제 nginx port를 위해 80, 443을 변경

![port%EB%B3%80%EA%B2%BD](https://user-images.githubusercontent.com/72541544/229950940-ba933b61-2bfc-4bde-904b-989f8cd87d69.png)


-   port를 80, 443에서 8442, 8443으로 변경한다. (openvidu `.env` 에서 port를 변경한다.)


![%EB%B3%80%EA%B2%BD](https://user-images.githubusercontent.com/72541544/229950934-3672e85b-b679-41ef-9929-ba7ea58f014e.png)

&nbsp;

### 📖 C. nginx.conf를 실행

이제 openvidu port가 8442, 8443으로 변경되었기 때문에, nginx 80, 443 port로 접근할 수 있다.


![port](https://user-images.githubusercontent.com/72541544/229950944-02455f7f-d7c4-4c91-b9bf-32f33a25957c.png)
![port_%EC%A0%91%EA%B7%BC](https://user-images.githubusercontent.com/72541544/229950945-2a60997b-f005-4052-abed-a2a9fc237365.png)