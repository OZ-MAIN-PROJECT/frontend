name: Bug Report
description: 발생한 버그를 신고하고 수정할 작업을 생성합니다.
title: "[Fix] 버그 설명"
labels: [bug]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        ## 버그 설명
        어떤 문제가 발생했는지 간단히 설명해주세요.

  - type: textarea
    id: steps
    attributes:
      label: 재현 방법
      description: 버그를 재현하는 단계별 방법을 작성해주세요.
      placeholder: |
        1. 로그인 페이지로 이동
        2. 이메일 입력 후 로그인 버튼 클릭
        3. 오류 발생
    validations:
      required: true

  - type: input
    id: expected
    attributes:
      label: 기대 동작
      description: 원래 기대했던 정상 동작을 적어주세요.
      placeholder: 예: 로그인 후 대시보드로 이동해야 함
    validations:
      required: false

  - type: textarea
    id: env
    attributes:
      label: 환경 정보
      description: 브라우저, 기기, OS 등 환경 정보를 적어주세요.
      placeholder: 예: Chrome 121 / macOS Sonoma
    validations:
      required: false

  - type: textarea
    id: screenshot
    attributes:
      label: 스크린샷 (선택)
      description: 스크린샷이나 에러 메시지를 첨부해주세요.
      placeholder: 이미지나 에러 로그 붙여넣기
    validations:
      required: false
