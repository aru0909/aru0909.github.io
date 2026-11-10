---
title: 소개
permalink: /about/
---

이화여대 사이버보안학과 최지수입니다.

웹 보안이랑 DevSecOps 쪽을 공부하고 있고, 요즘은 R AI 보안과 하드웨어 보안에도 관심이 있어요. 공부한 거, 대회 나간 거 여기에 정리합니다.

. 혼자 공부하는 것보다 직접 만들어 보면서 배우는 편이라 해커톤과 프로젝트에 자주 참여한다. 이 블로그에는 그 과정에서 배운 것들을 정리한다.

프로젝트
ASRA: AI Secret Risk Analyzer

E-업그라운더 해커톤 · 2026 · 공동 창업자, 기획 -최우수상 수상

AI 코딩 도구를 쓰다 보면 API 키나 DB 비밀번호 같은 민감 정보가 코드와 Git 저장소에 그대로 들어가는 일이 생긴다. ASRA는 GitHub 저장소와 연동해서 이런 노출을 찾아내고, 위험도에 따라 우선순위까지 매겨 주는 서비스이다.

개발 과정 안에 보안을 넣는 DevSecOps 관점으로 아이디어를 발전시켰다.
스타트업과 SaaS 기업을 대상으로 한 B2B 모델을 구상하고, 실제 기업에 필요한 솔루션인지 검토했다.
해커톤에서 최우수상을 수상

Secret Detection Risk Scoring DevSecOps

RISC-V PMP 설정 오류 자동 탐지

이화여자대학교 · 2026.09 ~ 진행 중

RISC-V의 물리 메모리 보호 기능(PMP)은 메모리 영역이 겹치거나 항목 우선순위가 꼬이면 의도와 다른 접근 권한이 적용될 수 있다. 이런 불일치를 자동으로 찾아내는 연구를 하고 있다.

TOR, NAPOT, NA4 주소 방식과 우선순위 규칙을 분석했다.
Python으로 PMP 설정 분석기를 만들어 영역 중첩과 권한 오류를 찾는다.
영역 경계에서 R/W/X 접근 테스트를 자동으로 만든다.
Spike bare-metal 환경에서 실제 결과를 확인하고 분석기 예측과 비교한다.
경계 중심 테스트와 무작위 테스트 중 어느 쪽이 오류를 더 잘 찾는지 비교하고 있다.

RISC-V PMP Python Spike Hardware Security

웹 보안 학습 플랫폼

스프린트 캠프 · 2026 · 프로젝트 리드

SQL Injection, XSS 같은 웹 보안 기초를 공부한 뒤, 같은 입문자를 위한 실습 플랫폼을 기획했다. 취약점을 AI가 설명해 주고 퀴즈로 복습하는 구성이다.

물건 도깨비

업스테이지 해커톤 · 2026

영수증을 찍으면 산 물건을 기억해 두었다가 잊지 않게 알려 주는 서비스. n8n과 OCR을 공부하면서 참여했다.

활동
기간	활동
2026.11 ~	Frontier
2026	HSPACE x RAS LAB 1기, Model R&D팀
2026	GDGoC Ewha, AI Core Member
2026	ECC(Ewha Computer Club), FW 프로젝트팀(웹 프론트엔드)
2026	KISIA 사이버 가디언즈 보안캠프 멘토
2026	이화여자대학교 사이버보안학과 학생회
2026	SW 봉사단

보안캠프에서는 중학생들의 보안 실습을 돕고, 보안 쪽 진로를 고민하는 학생들과 이야기를 나눴다. SW 봉사단에서는 학생들의 코딩 실습 수업을 보조했고, 학생회에서는 학과 행사를 준비하고 카드뉴스를 만들었다.

수상
2026 E-업그라운더 해커톤 최우수상 (ASRA)
기술
보안: Web Security, Secret Detection, DevSecOps
개발: Python
연락처
Email: aru0909@ewha.ac.kr
GitHub: aru0909
Portfolio: jisoo-choi-portfolio
