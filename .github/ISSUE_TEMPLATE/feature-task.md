name: Feature Task
description: 새로운 기능 개발을 위한 작업 이슈입니다.
title: "[Feat] 작업 내용"
labels: [feat]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        ## 개요
        작업할 기능을 간단히 설명해주세요.
  - type: textarea
    id: detail
    attributes:
      label: 작업 상세
      description: 할 일을 구체적으로 작성해주세요.
      placeholder: |
        - [ ] API 연동
        - [ ] 버튼 UI 구현
    validations:
      required: true
