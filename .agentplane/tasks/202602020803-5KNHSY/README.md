---
id: "202602020803-5KNHSY"
title: "Add GitHub Actions trusted publishing workflow"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "release"
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
  hash: "4c81d24df85e1cc179f2f8152e21b1bc6ab1c6c2"
  message: "🏗️ 5KNHSY add npm trusted publishing workflow and release notes"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add GitHub Actions trusted publishing workflow, update release docs, and normalize npm repository URLs for publish."
  -
    author: "ORCHESTRATOR"
    body: "verified: not run (workflow/doc/metadata changes only) | details: pre-commit hooks ran format/lint/test-fast as part of commit."
  -
    author: "ORCHESTRATOR"
    body: "verified: not run (workflow/doc/metadata changes only) | details: pre-commit hooks ran format/lint/test-fast as part of commit."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:42.869Z"
doc_updated_by: "agentplane"
description: "Add npm trusted publisher workflow for GitHub Actions, update release docs, and clean package repository URLs for publish."
---
## Summary

Add GitHub Actions trusted publishing workflow, normalize npm repository URLs, and document trusted publishing steps.

## Scope

Add .github/workflows/publish.yml, update release-and-publishing doc, and normalize repository URLs in package metadata.

## Risks

Trusted publishing requires correct npm org permissions and matching workflow filename; incorrect setup can block publishing.

## Verify Steps

Not run (workflow/doc changes only).

## Rollback Plan

Revert the commit for 202602020803-5KNHSY.

## Plan


## Verification
