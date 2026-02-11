---
id: "202602111218-81PVMA"
title: "Regression test: init hooks leaves clean tree"
result_summary: "Added regression test preventing uncommitted hook-shim leftovers after init."
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602111218-MP2X12"
tags:
  - "testing"
  - "cli"
  - "init"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "4b33684599e4c0b0c7adb75598a09797ccefd35b"
  message: "✅ MP2X12 task: stage init hook shim in install commit"
comments:
  -
    author: "TESTER"
    body: "Verified: regression covers init --hooks flow, asserts clean tracked tree, and verifies shim is present in the install commit."
events:
  -
    type: "status"
    at: "2026-02-11T12:21:21.607Z"
    author: "TESTER"
    from: "TODO"
    to: "DONE"
    note: "Verified: regression covers init --hooks flow, asserts clean tracked tree, and verifies shim is present in the install commit."
doc_version: 2
doc_updated_at: "2026-02-11T12:21:21.607Z"
doc_updated_by: "TESTER"
description: "Add regression coverage that init --yes --hooks true leaves clean git status and includes shim in install commit."
id_source: "generated"
---
