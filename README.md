# 블로그

GitHub Pages 기본 빌드로 돌아가는 Jekyll 블로그입니다. 따로 설치할 것 없이 저장소에 올리면 됩니다.

## 배포하기

1. GitHub에서 `아이디.github.io` 이름으로 새 저장소를 만듭니다.
2. 이 폴더의 파일을 전부 저장소에 올립니다. 웹에서 Add file → Upload files로 끌어다 놓아도 되고, 터미널에서는 아래처럼 올립니다.

   ```bash
   cd blog
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/아이디/아이디.github.io.git
   git push -u origin main
   ```

3. 저장소의 Settings → Pages에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 고르고 저장합니다.
4. 1~2분 뒤 `https://아이디.github.io`로 들어가 봅니다. 안 열리면 Actions 탭에서 빌드가 실패했는지 확인하세요.

## 내 정보로 바꾸기

- `_config.yml`: 블로그 이름(`title`), 주소(`url`), 이름과 한 줄 소개(`author.name`, `author.bio`), GitHub 아이디, 사이드바 활동 이력(`timeline`)
- 프로필 사진: `assets/img/avatar.png`로 올리고 `_config.yml`의 `author.avatar`에 `/assets/img/avatar.png`라고 적습니다. 비워 두면 이름 첫 글자가 나옵니다.
- `about.md`: 소개 페이지
- `_data/categories.yml`: 카테고리 이름과 설명. `slug`는 글 주소에 쓰이니 되도록 그대로 두세요.
- `assets/css/main.css` 맨 위: 글자색, 링크색 같은 색 설정

## 글 쓰기

`_templates`에 카테고리별 양식이 있습니다. 하나를 `_posts`로 복사해서 `2026-11-10-my-post.md`처럼 날짜를 붙인 이름으로 저장하고 내용을 채운 뒤 올리면 됩니다.

```yaml
---
title: "글 제목"
categories: [ctf]   # dev, ctf, bugbounty, tech, paper, award 중 하나
tags: [pwnable]
---
```

- 파일 이름 앞의 날짜가 없으면 글이 보이지 않습니다.
- 이미지는 `assets/img/` 아래에 넣고 `![설명](/assets/img/파일.png)`로 넣습니다.
- 소제목(`##`, `###`)이 두 개 이상이면 넓은 화면에서 오른쪽에 목차가 생깁니다. 끄려면 `toc: false`를 추가합니다.
- 글 맨 위에 `pin: true`를 넣으면 홈 맨 위에 고정되고 핀 표시가 붙습니다.
- 글 맨 위에 `image: /assets/img/파일.png`를 넣으면 목록 카드 오른쪽에 썸네일이 나옵니다.
- 목록에 보이는 요약은 본문 첫 부분에서 자동으로 가져옵니다. 직접 정하려면 `description: "요약"`을 넣으세요.

## 기능

- 검색: 사이드바 검색 칸, 오른쪽 위 돋보기, `/` 키
- 태그: 사이드바에 글이 많은 태그부터 12개가 나오고, 전체 목록은 `/tags/`에 있습니다.
- 스크롤을 내리면 오른쪽 아래에 맨 위로 버튼이 나옵니다.
- 화면 모드: 처음에는 기기 설정을 따르고, 오른쪽 위 달/해 버튼으로 밝은 화면과 어두운 화면을 바꿀 수 있습니다. 고른 모드는 다음에 들어와도 유지됩니다.
- 코드 블록에 마우스를 올리면 복사 버튼이 나옵니다.
- RSS(`/feed.xml`)와 사이트맵이 자동으로 만들어집니다.
- 댓글을 쓰려면 [giscus.app](https://giscus.app)에서 값을 받아 `_config.yml`의 `giscus`에 넣고 `enabled: true`로 바꾸세요.
