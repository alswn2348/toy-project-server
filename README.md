<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# nestjs-board-app

## 생성 cli

```bash

#모듈
$ nest g module {Name}

#컨트롤러
$ nest g controller {Name} --no-spec
--no-spec : 테스트를위한 코드 생성하지 않음

#서비스
$ nest g service {Name} --no-spec

#pipe 필요한 모듈 class-validator , class-transformer
$ npm install class-validator class-transformer --save

```
## 유용한 모듈(라이브러리)
```bash

#pipe 관련 모듈 class-validator , class-transformer
$ npm install class-validator class-transformer --save
```

## typeORM 관련 모듈(라이브러리)
```bash
#typeORM 관련 모듈 pg, typeorm, @nestjs/typeorm
$ npm install pg typeorm @nestjs/typeorm --save

```
## typeORM 연결하기
1. typeORM 설정파일 생성
2. typeORM 설정파일 작성
3. 루트 Module에서 Import 합니다.
## 도커
```bash
// 도커 이미지 생성

# docker build -t <이미지 이름> .
$ docker build -t welcome-to-docker .

// 도커 컨테이너 생성

# docker run --name <컨테이너 이름> -d -p <호스트 포트>:<컨테이너 포트> <사용할 이미지>
$ docker run --name docker-exercise-container -d -p 8000:8000 welcome-to-docker

--name : 없으면 랜덤 생성
-d : detached 백그라운드 실행
-p : 포트 매핑
```

## aws

```bash

// aws ec2 접속하기
$ chmod 700 {키파일}
$ ssh -i {키파일} ubuntu@{ip 주소}

$ cd nest-sever-prod
$ git pull

//pm2 무중단 배포
$ npm run pm2:start:prod
```
`test`