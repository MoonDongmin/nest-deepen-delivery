# 어떤 이미지를 사용할지(지금은 alpine의 최신 버전을 사용, 개발페이지)
FROM node:alpine AS development

# 가상환경의 디렉터리 설정
WORKDIR /usr/src/app

# package.json 복사해오기(설정한 디렉터리에 package 복사)
COPY package*.json ./

# pnpm-lock.yaml
COPY pnpm-lock.yaml ./

# pnpm 설치하기
RUN npm i -g pnpm

# Dependency 설치하기
RUN pnpm i

# 나머지 파일/폴더 복사해오기
COPY . .

# 커맨드 실행
CMD ["pnpm", "start:dev","gateway"]
