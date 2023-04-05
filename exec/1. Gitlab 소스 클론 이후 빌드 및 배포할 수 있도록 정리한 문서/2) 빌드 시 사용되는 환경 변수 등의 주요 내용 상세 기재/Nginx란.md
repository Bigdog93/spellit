# 📚 1. Nginx 정의

### 📖 A. **왜? Nginx을 사용할까?**

**✔ 정적인 리소스를 Serve해주는 것**

ex) User로부터 요청이 들어왔을 때

-   image, CSS 같은 정적인 리소스(Static Content)에 대한 request들은 Nginx에 맡긴다.
-   동적으로 계산되거나 전달되어야 하는 것들은 NodeJS같은 애플리케이션 서버에게 맡긴다.
-   데이터베이스에 대한 request들을 위해서 DB서버를 사용한다.

&nbsp;

**✔ Reverse Proxy Server로서 Request와 Response를 중개해주는 것**

`Reverse Proxy Server` : Request와 Response를 중개하는 Proxy서버로 동작하게 할 수 있다. (추가로 더 강력한 보안이나 가속화 기능등을 추가적으로 적용할 수 있다.)


&nbsp;

&nbsp;

### 📖 B. Nginx와 관련된 개념들

**✔ Reverse Proxy**



유저들의 컴퓨터가 인터넷에 접속하기 전에, 하나의 Proxy

어떤 서버에 request를 보낼지 중개인인 Proxy 서버를 세워서 효율적이면서 좀더 안전하게 Request와 Response를 관리하기 위함에 있다.

중요한 행동을 하거나 데이터를 가지고 있는 서버에 도달하기 전, 하나의 레이어가 생김으로서 보안적으로도 더욱 강해질 수 있다.

&nbsp;

> **✏ 결국 Nginx는?** 서버들 앞에 중개 대리인(Proxy)를 하나 두어서, Request와 Response를 릴레이 해주는 것이다. `Nginx`는 이러한 `proxy`로 세워두고 사용하는 것이다.


&nbsp;

**✔ UpStream vs DownStream**

`DownStream` : 물이 흘러 내려가서 받는 곳, **데이터를 보내는 쪽에서 흘러나가는 흐름**

`UpStream` : 윗쪽에서 물을 흘러 내려보내는 곳, **데이터를 받는 쪽에서의 받는 흐름**

&nbsp;

### 📖 C. nginx.conf

**✔ nginx.conf**

**Nginx와 그 모듈들이 동작하는 방식은 ConfigurationFile에 의해서 결정된다.**

`nginx.conf` 위치는 총 3개이다.

-   `/etc/ngin`
-   `/usr/local/nginx/conf`
-   `/usr/local/etc/nginx.`

find 명령어로 찾을 때는

```bash
sudo find / -name nginx.conf
```

&nbsp;



**✔ work_processes**

nginx의 실행가능한 worker 프로세스의 수를 지정해줄 수 있다.

-   master 프로세스
-   work 프로세스

로 구성된다.

auto로 설정할 시, `최적값` 은 `cpu core`에서부터 하드드라이브 등 여러가지 요소에 의해 결정된다.

```bash
worker_processes auto;
```

&nbsp;

**✔ worker_rllimit_nofile**

Woker process들에서 최대로 열린 파일들의 수를 제한할 수 있다.

```bash
worker_rlimit_nofile 65535;
```

```bash
worker_processes auto;
worker_rlimit_nofile 65535;

events {
	worker_connections 65534;
	use epoll;
	multi_accept on;
}
```

-   `event 블록` : connection processing에 관한 설정 값들을 정의한 곳
-   `worker_connections` : events 블록 내에서 설정하는 worker connections를 설정할 때는 proxy 서버를 통해 연결된 커넥션들을 포함한 클라이언트들의 모든 커넥션들의 숫자를 고려 (worker_rlimit_nofile 크기를 넘으면 안됨)
-   `use epoll` : connection processing method를 정한다. 표준 선택
-   `multi_accept on` : 모든 새로운 커넥션을 한 번에 다 허용할 수 있다. (off일 경우, worker 프로세스는 한번에 하나의 커넥션만을 허용한다.)

&nbsp;

&nbsp;


# 📚 2. Nginx Http 블록

> 여러가지 설정들을 하는 곳

### 📖 A. Upstream

upstream서버에 대해서 설정하기 위한 것

**인자로 설정할 upstream 서버의 이름을 넣어주면 된다.**

-   서버들은 TCP이든 UNIX 도메인 소켓이든 모두 listen 할 수 있다.

ex)

```bash
upstream backend {
	server 127.0.0.1:3000;
	keepalive 32;
}
```

-   backend 이름으로 내부의 nodeJS의 3000 port 서버로 연결
-   `keepalive` : proxy 서버로부터, 다시 로컬의 nodejs서버로 연결될 때, 접속이 다시 생성됨으로 인한 비효율을 막기 위해서이다.

> **✏ keepalive란?** 원래 http는 데이터 전송을 받기 위해 서버에 접속해서 받은 다음, connection을 끊어버린다. 예외적으로 `keepalive`를 사용시 `connection`을 유지하도록 일정시간을 인자값으로 주는 것 (동시 접속자 수를 대비해 서버의 Capacity를 고려해야 한다.)

&nbsp;


### 📖 B. types

request MIME 타입들에 대해 파일이름을 매칭시켜준다.

대소문자는 구분하지 않는다.

[](https://github.com/nginx/nginx/blob/master/conf/mime.types)[https://github.com/nginx/nginx/blob/master/conf/mime.types](https://github.com/nginx/nginx/blob/master/conf/mime.types)

include와 default_type ~ gzip은 추후 정리

&nbsp;

&nbsp;


# 📚 3. server 블록

```bash
server {
	listen 80;
	server_name domain2.com www.domain2.com;
	access_log logs/domain2.access.log main;

	# serve static files
	location ~ ^/(images|javascript|js|css|flash|media|static)/ {
		root  /var/www/virtual/big.server.com/htdocs;
		expires 30d;
	}

	location / {
		proxy_pass  <http://127.0.0.1:8080>;
	}
}
```

### 📖 A. **Location**

`ngx_http_core_module`에 정의되어 있는 중요한 지시어

-   request URI에 따른 설정을 하는 곳
-   URI에 대한 매칭은 텍스트 값을 prefix로 하여서 매칭하거나, 주어진 정규식을 이용해서 매칭할 수 있다.

`정규식 패턴에 사용되는 기호`

| = | 패턴과 정확하게 일치 할 때 사용. URI 검색시 가장 우선순위가 높다. (”=/test” ⇒ “$host/test”) | | --- | --- | | ~ | 대소문자를 구별하여 정규표현식과 일치할 때 사용 | | ~* | 대소문자를 구별하지 않고 정규표현식과 일치할 때 사용 | | ^~ | 지정한 패턴으로 시작할 때 사용 | | | 아무 기호도 없이 텍스트를 사용하면, prefix로 사용해서 해당 텍스트로 시작하는 URI를 찾는다. | | @name | 이름을 붙여서, location 블럭을 정의한다. 내부 요청에 의해서만 접근할 수 있다.

location { try_files $uri @mylabel; }

location @mylabel {return 404 “Not Found”} |

ex)

```bash
location ~ ^/(images|javascript|js|css|flash|media|static)/ {
	root /api-server/public;
	expires max;
	add_header Cache-Control public;
}
```

-   `root /api-server/public;` : URL의 루트에 `/api-server/public` 을 붙여준다.
-   expires, add_header을 이용해 파일의 헤더를 수정


&nbsp;

**✔ root**

```bash
location / { 
	root /data/www;
}
```

-   root : route를 다 찾아보고(request URI가 `/` ) 마지막으로 없으면 `/data/www` 를 URI에 붙여주어서 index.html 파일로 연결시켜준다.

```bash
location / { 
	root /data/www;
}
location /images/ {
	root /data;
}
```

-   요청할 때 들어온 URI에 `/data/images/파일` 을 붙여 해당 파일을 연결시켜준다.
-   해당 파일이 없다면 404 error를 발생시킨다.
-   `/images/` 가 매칭되지 않는 모든 URI는 전부 첫 번째 location 키워드로 정의했던, `/data/wwww/` 를 URI에 붙여서 접근한다.

&nbsp;

&nbsp;

### 📖 A. **Header 정보 세팅**

**✔ 헤더정보 추가**

`add_header` 지시어를 이용해 expires 커스텀한 헤더정보를 추가할 수 있다.

&nbsp;

✔ **allow and deny**

```bash
server {
		listen 80;
		server_name .internal.io;
		
		location /private {
				allow 182.16.100.0/8;
				deny all;
		}
}
```

-   `182.16.100.0` 만 접근 허락
-   나머지는 deny(무시)
-   해당하지 않는 ip에서 접근할 경우 `403 forbidden`을 return 해준다.

&nbsp;

**✔ server_name**

`ngx_http_core_module`에 정의된 `server_name` : 가상 서버의 이름을 정할 때 사용한다.

```bash
server {
		server_name example.com www.example.com;
}
```

-   `example.com`와 [`www.example.com`](http://www.example.com)으로 접근가능

```bash
server {
	server_name .example.com;
}
```

-   이와 같이 `.` 을 사용할 시, `[test.example.com](<http://test.example.com>)` 와 같이 단순한 example.com도 사용할 수 있다.
-   정규식을 server_name에 사용할 수도 있다. (`~` 을 앞에 붙여준다.)

&nbsp;


**✔ listen**

-   ip를 위한 address와 port 번호를 설정
-   UNIX 도메인을 위한 path를 설정할 수도 있다.

`IPv4 주소`

```bash
listen 127.0.0.1:8000;
listen localhost:3000;
listen 127.0.0.1;
listen 443; # for https
listen *:8000;
```

`IPv6 주소`

```bash
listen [::]:8000;
listen [::1];
```

&nbsp;

**✔ SSL 관련 설정**

```bash
server {
	ssl_certificate cert/example.com.chained.crt;
	ssl_certificate_key private/example.com.key;
	ssl_session_timeout 60;
}
```

인증서와 `private key`와 `timeout`을 설정해 줄 수 있다.

&nbsp;

&nbsp;

### 📖 B. rewrite 하는 방법

**✔ return**

return을 사용할 시 processing을 멈추고, code가 주어지면 해당 코드와 함께 client에게 return해준다.

```bash
return code
return code URL
return URL
```

```bash
server {
	listen 80;
	listen 443 ssl;
	server_name www.oldDomain.com;
	return 301 $scheme://www.newDomain.com$request_uri;
}
```

-   `$scheme 변수` : http인지 https인지를 나타낸다.
-   `$request_uri` : 주소 뒤에 변수들이 붙어있는 request URI를 의미한다. (ex `[www.oldDomain.com/test?score=88](<http://www.oldDomain.com/test?score=88>)` 에서 `.com` 뒷부분을 의미한다.
-   `301` : `Moved Permanently`, 영원히 이동 (3xx로 code를 return하려면 url을 인자로 꼭 넣어야 한다.)
    -   1xx, 2xx, 4xx, 5xx code로 return 하는 경우라면 url은 꼭 필요하지 않다.
-   respose의 body에 text를 전달할 수도 있다.

```bash
return 401 "token이 expire되어서 접근이 제한되었다."
```

```bash
server {
	listen 80;
	server_name .test.com;
	location / {
	return 301 https://$host$request_uri;
	}
}
```

-   http로 들어오는 url을 모두 https로 이동
-   301코드와 함께 심플하게 할 수 있다.

&nbsp;

**✔ rewrite**

```bash
rewrite 정규식 변경될 url <옵션할 flag>
```

`rewrite` : server, location, if블록에서 사용가능하다.

`flag` : last, break, redirect, permanent (permanent : 301코드와 함께, 영원히 redirect시키는 flag)

```bash
listen 80;
server_name .test.com;
server {
	location / {
		rewrite ^ https://test.com$request_uri permanent;
	}
}
```

-   http로 들어온 request를 https로 보내주고 있다.

⇒ return문을 사용하는 것이 정규식을 사용하는 rewrite보다 효율적이다.

&nbsp;

&nbsp;

### 📖 C. proxy_pass

`[<http://backend/card>](<http://backend/card>)` upstream 서버인 backend로 보내주었다.

```bash
upstream backend {
	server 127.0.0.1:3000;
	keepalive 32;
}
server {
	listen 80;
	server_name test.com;
	location /care {
		proxy_pass <http://backend/care>
		proxy_http_version 1.1;
		proxy_set_header Connection "";
	}
}

```

`ngx_http_proxy_module`에 정의되어 있다.

nginx가 proxy로서 동작할 때, request를 중계받는 서버의 protocol과 address 긜고 location에 매핑될 URI를 설정한다.

-   `protocol` : http 혹인 https인지를 정해준다.
-   `address` : domain name이나 ip주소와 port를 정해주면 된다.

```bash
proxy_set_header X-Real-IP $remote_addr;
- 실제 접속자의 IP를 X-Real-IP 헤더에 입혀서 전송.
- remote_addr : 요청한 클라이언트 주소 
- X-Forwarded-For와 동일하게 Client IP를 확인하기 위해 사용하는 헤더값을 말한다.

proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
- 프록시나 로드 밸랜서를 통해 들어온 요청에서 클라이언트 원 IP 주소를 확인하기 위해 사용하는 헤더값
- 프록시 헤더값을 변조할 수 있음
- X-Forwarded-For 만 사용할 경우 변조의 위험이 있으므로,   X-Real-IP를 같이 사용 해준다.

proxy_set_header Host $http_host; 
- HTTP Request 의 Host 헤더값
- http 요청이 들어 왔을 시 호스트 명

proxy_set_header X-NginX-Proxy true;
- nginx proxy 를 썼다는 뜻. 안써도 무방. 표준 X

proxy_redirect off;
- 백엔드 서버에 의해 촉발된 리다이렉션에 대해 로케이션 HTTP 헤더에 나타나는 URL을 재작성합니다.
- off : 리다이렉션은 설정 된 그대로 전달
```

&nbsp;

**✔ proxy_set_header**

```bash
upstream backend {
	server 127.0.0.1:3000;
	keepalive 32;
}
server {
	listen 80;
	server_name test.com;
	location /care {
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header Connection "";
		proxy_http_version 1.1;

		proxy_pass <http://backend/care>
	}
}
```

nginx가 proxy로 중계할 때, 중계받은 nodejs와 같은 서버에 request header를 다시 재정의해서 전달할 때 사용한다.

-   `host` : `$host`
-   Connection : upstream 서버를 사용하기 위한 설정, 필요하지 않을시 사용하지 않아도 된다.

`X 관련 설정`

-   `X-Forwarded-For` : 프록시 환경에서, HTTP Server에 요청한 client의 IP를 식별하기 위한 헤더 (or `X-Real-IP`)
-   `X-Forwarded-Proto` : 클라이언트가 프록시에 접속할 때, 사용했던 프로토콜(HTTP or HTTPS)이 무엇인지 확인하는 헤더

&nbsp;

**✔ try_files**

인자로 해당 파일을 찾을 수 있는 몇 개의 path들을 넣을 수 있다.

먼저 정의된 path부터 해당 파일이 있는지 찾아서, request 요청을 처리하는데 사용

```bash
location /images/ {
	try_files $uri /images/default.gif;
}
```

-   request 할 때 들어온, uri 경로에서 찾는다.
-   없으면, `/imaefs/default.gif` 로 redirect 해준다.
-   `$uri` : 현재 request로 들어온 요청위치

```bash
location / {
	try_files $uri $uri/index.html $uri.html =404;
}
```

-   `=404` : code를 마지막 path 뒤에 붙여서 사용
-   uri 경로를 먼저 찾고 없으면, 그 하위의 `index.html`을 찾은 다음, 없으면 `$uri.html`을 404코드와 함께 redirect할 수 있다.

```bash
location {
	try_files $uri @lastone;

}

location @lastone {
	return 404 "Not Found"
}
```

-   try_files에서 `@lastone` 을 붙여서 최종 redirection 위치로 설정을 추가

&nbsp;

&nbsp;

# 📚 4. 정리

```bash
server {
	listen 8080;
	root /data/up1;
	
	location / {
	}
} 
```

-   들어오는 request들은 모두 `/data/up1` 을 URI에 붙여준다.

&nbsp;


> **💡 참고** `~` 로 시작해서 정규표현식을 기술해야 한다.

&nbsp;


```bash
server {
	location / {
		proxy_pass <http://localhost:3000>;
	}

	location ~ W.(gif|jpg|png)$ {
		root /data/images;
	}
}
```

-   request 중 나머지 `/` 로 시작되는 URI들은 proxy_pass라는 키워드를 이용해서 proxy서버로서 localhost의 3000번 포트로 연결시켜준다.
-   위는, 내부 네트워크의 nodejs가 3000 port를 listen하고 있고 그곳으로 연결시킬 수 있다.
-   이와 같이 설정을 바꾸었다면, nginx를 reload시켜주어야 한다.

&nbsp;

&nbsp;

# 📚 5. Nginx에서 URL에 따른 변수들

```
<http://example.com/score/index?type=number&id=68>
```

`$host` : [example.com](http://example.com) 서버의 IP나 도메인을 가리킨다.

`$uri` : /score/index, 호스트명과 파라미터는 제외

`$args` : type=number&id=68 (type변수만 알고 싶을 때는, `$args_type` 으로 접근)

`$server_addr` : 서버주소

`$server_name` : 서버네임

`$server_port` : 서버의 포트

&nbsp;


> **💡 참고** nginx에서 사용되는 변수


&nbsp;

&nbsp;


# 📚 6. 실행과 정지 및 Reload

nginx가 있는 폴더에서 실행하기

```
nginx -s <stop이나 quite 같은 시그널 키워드>
```

-   `stop` : fast shutdown
-   `quit` : graceful shutdown
-   `reload` : reloading the configuration file
-   `reopen` : reopening the log files

ex) configuration file을 변경하고 나서, 적용시키기 위해 reload하기 위해서는

&nbsp;


```
nginx -s reload
```

하면 된다.


&nbsp;

**✔️ Log나 ErrorLog 파일의 위치**

`access.log` : Nginx의 Log파일, 위치 : `/usr/local/nginx/logs`

`error.log` : ErrorLog 파일, 위치 : `/var/log/nginx`


&nbsp;


**✔ nginx stop, update, status**

nginx 멈추기 : `sudo systemctl stop nginx` nginx update : `sudo systemctl restart nginx` nginx 상태보기 : `systemctl status nginx`


&nbsp;

---

참고

- https://developer88.tistory.com/299

