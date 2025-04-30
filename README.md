# 프로젝트 개요
써쓔 – 감정을 기록하는 소비 가계부

## ✏️ 프로젝트 소개
"써쓔"은 단순히 돈을 쓰는 기록을 넘어, 감정 기반 소비 습관을 시각화하고 공유할 수 있는 소셜 가계부 웹 서비스입니다.
사용자는 자신의 지출을 감정과 함께 기록하고, 월별 통계 및 리포트를 통해 소비 패턴을 분석할 수 있으며, 커뮤니티에서 다른 사용자들과 소비 경험 및 절약 팁을 공유할 수 있습니다.


## 📦 기술 스택

- **Vite** + **TypeScript** + **TailwindCSS**
- **라이브러리**
    - 상태 관리: [Zustand](https://github.com/pmndrs/zustand)
    - HTTP 클라이언트: [Axios](https://axios-http.com/)
- **개발 환경 도구**
    - 코드 포매터: [Prettier](https://prettier.io/)
    - 린터: [ESLint](https://eslint.org/)

---

## 📁 폴더 구조

```markdown
src/ 

├── assets/ # 이미지, 아이콘, 폰트 등 

├── components/
│ ├── common/ # 공통 UI 컴포넌트 (Button, Input, Modal) 

│ └── layout/ # 공통 레이아웃 요소 (Header, Footer, Sidebar) 

├── pages/ 

│ └── Expenses/

│ ├── Expenses.tsx # Expenses 페이지 

│ └── components/ # Expenses 전용 컴포넌트 모음 

│ └── ExpenseList.tsx 

├── hooks/ # 커스텀 훅 (useModal, useAuth 등) 

├── stores/ # Zustand 스토어 

├── apis/ # Axios 요청 모듈 

├── utils/ # 공통 유틸리티 함수 

├── router/ # react-router-dom 라우터 설정 

├── styles/ # Tailwind 설정 및 전역 스타일 

├── constants/ # 상수 

└── types/ # 타입 정의
```

---

## ✨ 코딩 컨벤션

- **변수명**: `camelCase` (명사)
- **함수명**: `camelCase` (동사)
- **컴포넌트명**: `PascalCase` (명사)
- **타입명**: `PascalCase` (명사)
- **API 데이터**: 백엔드에서 받아온 데이터도 `camelCase`로 변환하여 사용

---

## 🌿 Git 브랜치 전략

### 브랜치 네이밍 규칙

| 브랜치 종류 | 설명 | 예시 |
| --- | --- | --- |
| **main** | 메인 브랜치 | `main` |
| **develop** | 개발 브랜치 | `develop` |
| **feature** | 기능 개발 브랜치 | `feature/login` |
| **hotfix** | 긴급 수정 브랜치 | `hotfix-1.1.4` |
| **release** | 배포 준비 브랜치 | `release-1.1` |
| **chore** | 환경설정 | `chore` |

---

## 📝 Git 커밋 컨벤션

- **커밋 메시지 포맷 :** 타입: 커밋 내용
- **커밋 타입**

| 타입 | 설명 |
| --- | --- |
| **feat** | 새로운 기능 추가 |
| **fix** | 버그 수정 |
| **refactor** | 리팩토링 |
| **design** | CSS, UI 수정 |
| **style** | 코드 포맷팅, 세미콜론 수정 등 |
| **test** | 테스트 코드 추가 및 수정 |
| **chore** | 기타 설정 파일 수정 등 |
| **init** | 프로젝트 초기 세팅 |
| **rename** | 파일, 폴더명 수정 |
| **remove** | 파일 삭제 |

## ✅ Pull Request 템플릿

### 제목 - [타입] 로그라인

```markdown
## 변경 사항
- ex) 로그인 시, 구글 소셜 로그인 기능을 추가했습니다.

## 반영 브랜치
- ex) feat/login -> develop

## 관련 이슈
- #번호 (있으면)

## 참고 사항
- 추가로 공유하고 싶은 내용
```

## ✅ Issue 템플릿

### 제목 - [타입] 로그라인

```markdown
## 개요
- 해야 할 일 설명

## 작업 상세
- [ ] 세부 작업1
- [ ] 세부 작업2
```