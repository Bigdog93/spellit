

> **✏ Jenkins pipeline 문법 종류**
> (1) Jenkins scriptive
> (2) Declarative Pipeline (주로 사용하는 것)

&nbsp;


# 📚 1. Jenkins scriptive 기반 문법


> **🥁 Directive**
> Scripted 문법 별도의 기능을 지원


&nbsp;

### 📖 A. 대표적인 Directive

`node` : Scripted 파이프라인을 실행하는 Jenkins 에이전트 최상단 선언 필요

`dir` : 명령을 수행할 디렉토리 / 폴더 정의

`stage` : 파이프라인의 각 단계, 이 단계에서 어떤 작업을 실행할지 선언하는 곳 (작업의 본문)

`git` : Git 원격 저장소에서 프로젝트 Clone

`sh` : Unix 환경에서 실행할 명령어 실행 윈도우에서는 bat

`def` : Groovy 변수 혹은 함수 선언, Javascript의 `var` 같은 존재로 이해


&nbsp;


### 📖 B. Node & Stage의 관계

```groovy
node('worker') {
    stage('Source') { // 스테이지 정의
        // 스테이지에서 수행할 코드 작성
```

- Scripted 파이프라인을 쓴다고하면 `node`는 필수로 선언
- node가 선언되었다면 이후 성격에 맞게 `stage`를 정의해서 사용하면 된다.

&nbsp;


![node stage](https://user-images.githubusercontent.com/72541544/225201780-4b40c8ea-a848-4154-8d31-ba5efeef1d80.png)



&nbsp;

&nbsp;

### 📖 C. 사용법


**✔ 정식 흐름**

```groovy
node {
    def hello = 'Hello jojoldu' // 변수선언
    stage ('clone') {
        git 'https://github.com/jojoldu/jenkins-pipeline.git' // git clone
    }
    dir ('sample') { // clone 받은 프로젝트 안의 sample 디렉토리에서 stage 실행
        stage ('sample/execute') {
            sh './execute.sh'
        }
    }
    stage ('print') {
        print(hello) // 함수 + 변수 사용
    }
}

// 함수 선언 (반환 타입이 없기 때문에 void로 선언, 있다면 def로 선언하면 됨)
void print(message) {
    echo "${message}"
}
```

- `def` 로 hello 변수 선언
- `dir`로 clone 받은 프로젝트의 `sample` 디렉토리에서 명령어 수행을 지시
- `sh` : shell 명령어 수행
- `print` : `def`로 선언한 메소드

&nbsp;


**✔ 예외 흐름**

정상적인 명령 흐름 외에, 예외 처리가 가능하다.

특정 단계에서 어떤 이유로 실패할 경우 Exception을 던진다.

java와 같이 `try/catch/finally`로 잡아 별도의 처리를 할 수도 있다.

```groovy
node {
    stage('Example') {
        try {
            sh 'exit 1'
        }
        catch (exc) {
            echo 'Something failed, I should sound the klaxons!'
            throw
        }
    }
}
```


&nbsp;


&nbsp;



# 📚 2. Jenins Directive


**✔ posts**

stage의 끝이나 파이프라인 실행의 마지막에 실행되거나 확인돼야 할 step과 조건 값을 묶는다.


```groovy
pipeline{
    agent{ label "node" }
    stages{  // 1️⃣ stages 
        stage("A"){
            steps{
                echo "========executing A========"  // 2️⃣ steps
            }
            post{
                always{
                    echo "========always========" // 2️⃣ steps
              }
                success{
                    echo "========A executed successfully========"
                }
                failure{
                    echo "========A execution failed========"
                }
            }
        }
    }
    post{   // 3️⃣  posts
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
```


- `always` : 항상 블록을 실행
- `changed` : 현재 빌드의 상태가 이번 빌드의 상태와 달라졌다면 블록의 step을 실행
- `success` : 현재 빌드가 성공했다면 블록의 step을 실행
- `failure` : 현재 빌드가 실패했다면 블록의 step을 실행
- `unstable` : 현재 빌드의 상태가 불안하다면 블록의 step을 실행

&nbsp;

&nbsp;

# 📚 3. Jenkins 환경변수



> **🥁 Jenkins Global variable**
> 
> `env` : `env` 환경변수는 `env.VARNAME` 으로 참조될 수 있다.
> `currentBuild` : 현재 빌드되고 있는 정보를 담고 있다. 보통 readonly 옵션인데 일부 writable한 옵션이 존재한다.


&nbsp;



### 📖 A. env

**✔ BUILD_ID**


```groovy
  stages {
        stage('Hello') {
            steps {
                sh "echo ${env.BUILD_ID}"
            }
        }
    }
```


- 현재 빌드의 ID 조회


![실행 결과](https://user-images.githubusercontent.com/72541544/225183964-3a27b59c-83fe-4852-be00-1e19d123da19.png)



&nbsp;

**✔ BUILD_NUMBER**

```shell
dockerImage = docker.build repository + ":$BUILD_NUMBER"
```

와 같이 사용하면 된다. (`tag`를 넣을 때 이렇게 하면 된다.)


`BUILD_NUMBER` : build ID, 완료된 빌드에 대한 레코드의 ID이다. (현재 pipeline에서 실행되는 빌드의 번호)


`BUILD_ID`와 `BUILD_NUMBER`은 같은 것이다.

![실행 결과](https://user-images.githubusercontent.com/72541544/225183964-3a27b59c-83fe-4852-be00-1e19d123da19.png)


&nbsp;


**✔ JOB_NAME**


```groovy
    stages {
        stage('Hello') {
            steps {
                sh "echo ${env.JOB_NAME}"
            }
        }
    }
```

![실행결과2](https://user-images.githubusercontent.com/72541544/225184655-21d7c94a-ccc7-44e6-985e-50ac4e37f21c.png)


- 현재 빌드중인 프로젝트의 이름으로 `foo` 또는 `foo/bar`와 같은 형식


&nbsp;

**✔ BRANCH_NAME**

```groovy
    stages {
        stage('Hello') {
            steps {
                sh "echo ${env.BRANCH_NAME}"
            }
        }
    }
```



- 현재 빌드되고 있는 브랜치명
- 현재 null만 나오고 있다.


&nbsp;


**✔ JENKINS_URL**


```groovy
    stages {
        stage('Hello') {
            steps {
                sh "echo ${env.JENKINS_URL}"
            }
        }
    }
```

- 현재 url이 나온다.

&nbsp;



![jenkins](https://user-images.githubusercontent.com/72541544/225185434-adde2560-338e-4664-955a-89bccb34ab3a.png)


&nbsp;

**✔ Jenkins URL**


![JenkinsDefaultURL](https://user-images.githubusercontent.com/72541544/225196322-c57191bb-ceac-44dc-bdb8-5bae1d0da580.png)


- `Jenkins`가 참조하는 default URL을 8000번으로 변경했다. (7777->8000)

&nbsp;

![실행결과3](https://user-images.githubusercontent.com/72541544/225196329-421c42e7-43fc-490c-b876-57b6a760a2f2.png)


- 결과로 8000번이 나온 것을 알 수 있다.

&nbsp;

**✔ BUILD_URL**

`http://server:port/jenkins/job/foo/15/`와 같은 현재 build의 URL을 알려준다.

&nbsp;


**✔ JOB_URL**


`http://server:port/jenkins/job/foo/`와 같은 job의 URL을 알려준다



&nbsp;

&nbsp;

### 📖 B. currentBuild

> 대표적인 currentBuild의 property



&nbsp;


**✔ number**

build number


&nbsp;


&nbsp;


# 📚 4. docker build 와 Dockerfile

 **✔ docker commit**
- docker container를 image로 생성
- commit 명령어를 실행하는 시점의 docker container 상태가 보존
- 현재 docker container의 상태를 백업하는 경우에 자주 사용한다.

&nbsp;

**✔ docker build**
- `Dockerfile` 이라는 단순 텍스트 파일을 사용하여 image 생성한다.
- `Dockerfile` 은 지정된 문법을 지켜야 한다.
- `Dockerfile`을 작성하고 공유하면 image의 구성을 쉽게 알 수 있다.


&nbsp;

**✔ docker build 명령어 두 가지를 사용한다.**
- `dockerfile` : 텍스트 파일이고 build시 사용될 명령어들을 모아 놓은 것
- `build` : PATH 또는 URL을 통해 지정된 다수의 파일을 갖는 경로


```shell
docker build . # .이 현재 경로를 의미한다.
```

&nbsp;




&nbsp;

-----
참고 자료
- https://jayy-h.tistory.com/43
- https://jojoldu.tistory.com/356
- https://jojoldu.tistory.com/356
- https://jojoldu.tistory.com/tag/%EC%A0%A0%ED%82%A8%EC%8A%A4?page=1