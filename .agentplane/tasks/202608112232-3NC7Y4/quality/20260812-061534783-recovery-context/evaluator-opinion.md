# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- Замороженный пакет не содержит детерминированных результатов проверок: declared_checks, verification_records, runner_history и runtime_evidence пусты, поэтому заявленный verification.state=ok не подтверждает критерии приёмки.

## Evidence
- .agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/d995fd167d32d456e092f97ce5ed6c3cf0243904bc61aa8bfe3a4f0db9799701.json
- .agentplane/tasks/202608112232-3NC7Y4/README.md
- .agentplane/policy/dod.core.md

## Missing Tests
- Замороженные результаты целевых проверок схем декларации и execution contract, миграций, explain/readback и межподсистемного потребления.
- Замороженные результаты E2E для localized direct, broad branch_pr, underestimated direct-to-branch_pr с сохранением работы, запрещённых external/destructive effects и misleading-language routing.
- Замороженные результаты routing, writable-scope, commit-policy, verification, evaluator, finish, recovery, compatibility, formatting, type и lint suites.
- Детерминированное сравнение before/after для числа команд, approvals, transitions, verification time, сохранения работы и recovery-command count.

## Hidden Assumptions
- Поле verification.state=ok и свободный текст note считаются достаточной заменой наблюдаемым командам, результатам, областям покрытия и сохранённым артефактам проверок.
- Изменения тестовых файлов в diff считаются доказательством того, что соответствующие тесты были выполнены и прошли.

## Residual Risks
- Предоставить новый замороженный observed-checks artifact с детерминированными командами, результатами, областями покрытия и ключевыми выводами для всех обязательных targeted, lifecycle, recovery, compatibility и E2E проверок; текущий пакет содержит только неподкреплённый статус verification.state=ok.
