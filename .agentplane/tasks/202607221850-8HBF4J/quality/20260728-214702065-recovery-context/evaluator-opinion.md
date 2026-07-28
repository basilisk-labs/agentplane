# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- Замороженный actual_diff не содержит изменений реализации: в нём есть только обновление README задачи, поэтому невозможно проверить поведение на evaluated_sha 20327772b02ab86f325009e4edcd4c313edc9d49.

## Evidence
- .agentplane/tasks/202607221850-8HBF4J/quality/20260728-214702065-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221850-8HBF4J/README.md
- .agentplane/tasks/202607221850-8HBF4J/quality/20260728-214702065-recovery-context/evaluator-observed-checks.json

## Missing Tests
- Замороженные исполняемые свидетельства для матрицы отказов каждого механического этапа и возобновления после каждой durable-фазы.
- Замороженный stale-result сценарий, доказывающий привязку семантического результата к журналу и запрет повторного использования завершённых механических фаз для другого результата.
- Замороженные сценарии повторного evaluator rework до episode/token/no-progress лимитов с сохранением общего бюджета и cursor.

## Hidden Assumptions
- Предполагается, что metadata-only evaluator-diff.patch репрезентативен для изменений реализации на evaluated_sha.
- Предполагается, что текстовая заметка TESTER достаточна вместо verification_records или runner_history с проверяемыми результатами команд.

## Residual Risks
- Повторно подготовить и заморозить work order с полным diff реализации для evaluated_sha 20327772b02ab86f325009e4edcd4c313edc9d49 и исполняемыми результатами обязательных отрицательных, retry/recovery, stale-result и повторных semantic-rework сценариев.
