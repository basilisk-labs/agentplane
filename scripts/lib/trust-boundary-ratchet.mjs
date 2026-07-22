import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import ts from "typescript";

export const TRUST_BOUNDARY_RULES = [
  {
    id: "trust.no-automatic-semantic-verdict",
    rf_owners: ["RF-00"],
    owner_task_ids: ["202607221846-YGWMA2"],
    description: "Routers and templates must not manufacture a semantic pass verdict.",
  },
  {
    id: "trust.no-agent-writable-observed-fields",
    rf_owners: ["RF-01a", "RF-01b"],
    owner_task_ids: ["202607221846-4CE7EG", "202607221846-Y89CFB"],
    description:
      "Agent-writable results must not define or override observed process, Git, check, or artifact facts.",
  },
  {
    id: "trust.no-implicit-danger-sandbox",
    rf_owners: ["RF-03"],
    owner_task_ids: ["202607221846-9XC1H0"],
    description: "A missing sandbox choice must not fall back to danger-full-access.",
  },
  {
    id: "trust.no-untyped-durable-route-workorder",
    rf_owners: ["RF-05a", "RF-05b"],
    owner_task_ids: ["202607221848-T9B3PS", "202607221848-VC4VVS"],
    description: "Durable route and work-order payloads require typed, validated contracts.",
  },
  {
    id: "trust.no-rendered-command-orchestration",
    rf_owners: ["RF-06b", "RF-09", "RF-25"],
    owner_task_ids: ["202607221848-VBV9B1", "202607221850-DRWR0V", "202607221854-PGPR3J"],
    description:
      "Rendered command strings and AgentPlane subprocesses must not be the internal orchestration protocol.",
  },
  {
    id: "trust.no-duplicate-runner-task-representation",
    rf_owners: ["RF-21"],
    owner_task_ids: ["202607221850-9C9WBP"],
    description:
      "Serialized runner task input must not carry TaskData beside duplicate task projections.",
  },
];

const RULE_BY_ID = new Map(TRUST_BOUNDARY_RULES.map((rule) => [rule.id, rule]));
const SOURCE_ROOTS = ["packages/agentplane/src", "packages/agentplane/assets"];
const TEXT_EXTENSIONS = new Set([".json", ".md"]);
const DURABLE_FIELD_NAMES = new Set([
  "routeDecision",
  "workOrder",
  "episodeInput",
  "operationPayload",
]);
const OBSERVED_DIRECT_FIELDS = new Set(["status", "exit_code", "timeout_reason", "artifacts"]);
const OBSERVED_NESTED_FIELDS = new Map([
  [
    "metrics",
    new Set(["duration_ms", "stdout_bytes", "stderr_bytes", "output_last_message_bytes"]),
  ],
  ["evidence", new Set(["evidence_paths", "changed_paths", "files_changed_count", "tests_run"])],
]);
const DUPLICATE_TASK_FIELDS = ["frontmatter", "doc", "sections", "comments", "events"];
const SHELL_COMMANDS = new Set(["sh", "bash", "zsh"]);
const SHELL_FLAGS = new Set(["-c", "-lc"]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeRepoPath(value) {
  return value.split(path.sep).join("/");
}

function listFiles(root, relativeDir) {
  const absoluteRoot = path.join(root, relativeDir);
  const out = [];
  const pending = [absoluteRoot];
  while (pending.length > 0) {
    const current = pending.pop();
    if (!current) continue;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === "dist" || entry.name.startsWith(".")) {
        continue;
      }
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(absolute);
      if (entry.isFile()) out.push(absolute);
    }
  }
  return out;
}

function declarationName(node) {
  if (
    (ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isClassDeclaration(node)) &&
    node.name &&
    ts.isIdentifier(node.name)
  ) {
    return node.name.text;
  }
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) return node.name.text;
  return null;
}

function nearestSymbol(node) {
  let current = node;
  while (current) {
    const name = declarationName(current);
    if (name) return name;
    current = current.parent;
  }
  return "module";
}

function nearestFunctionSymbol(node) {
  let current = node;
  while (current) {
    if (ts.isFunctionLike(current)) {
      const directName = declarationName(current);
      if (directName) return directName;
      if (ts.isVariableDeclaration(current.parent) && ts.isIdentifier(current.parent.name)) {
        return current.parent.name.text;
      }
    }
    current = current.parent;
  }
  return "module";
}

function propertyName(node) {
  const name = node?.name;
  if (name && (ts.isIdentifier(name) || ts.isStringLiteral(name))) return name.text;
  return null;
}

function lineAndColumn(sourceFile, node) {
  const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return { line: position.line + 1, column: position.character + 1 };
}

function normalizedNodeText(sourceFile, node) {
  return node.getText(sourceFile).replaceAll(/\s+/g, " ").trim();
}

function structuralContainer(node) {
  let current = node.parent;
  while (current) {
    if (
      ts.isFunctionLike(current) ||
      ts.isClassDeclaration(current) ||
      ts.isInterfaceDeclaration(current) ||
      ts.isTypeAliasDeclaration(current) ||
      ts.isSourceFile(current)
    ) {
      return current;
    }
    current = current.parent;
  }
  return node.getSourceFile();
}

function structuralNodeIdentity(sourceFile, node) {
  const container = structuralContainer(node);
  const normalized = normalizedNodeText(sourceFile, node);
  let ordinal = 0;
  let selectedOrdinal = 0;
  const visit = (candidate) => {
    if (candidate.kind === node.kind && normalizedNodeText(sourceFile, candidate) === normalized) {
      ordinal += 1;
      if (candidate === node) selectedOrdinal = ordinal;
    }
    if (selectedOrdinal === 0) ts.forEachChild(candidate, visit);
  };
  visit(container);
  const kind = ts.SyntaxKind[node.kind] ?? String(node.kind);
  return `ast:${kind}:${sha256(normalized).slice(0, 12)}:${String(selectedOrdinal || 1)}`;
}

function makeViolation(ruleId, sourceFile, node, locator, message) {
  const rule = RULE_BY_ID.get(ruleId);
  if (!rule) throw new Error(`Unknown trust-boundary rule: ${ruleId}`);
  const filePath = normalizeRepoPath(sourceFile.fileName);
  const position = lineAndColumn(sourceFile, node);
  const stableLocator = `${locator}:${structuralNodeIdentity(sourceFile, node)}`;
  return {
    violation_id: `${ruleId}:${filePath}:${stableLocator}`,
    rule_id: ruleId,
    rf_owners: rule.rf_owners,
    owner_task_ids: rule.owner_task_ids,
    path: filePath,
    locator: stableLocator,
    line: position.line,
    column: position.column,
    message,
  };
}

function makeTextViolation(ruleId, filePath, line, locator, message) {
  const rule = RULE_BY_ID.get(ruleId);
  return {
    violation_id: `${ruleId}:${filePath}:${locator}`,
    rule_id: ruleId,
    rf_owners: rule.rf_owners,
    owner_task_ids: rule.owner_task_ids,
    path: filePath,
    locator,
    line,
    column: 1,
    message,
  };
}

function collectDeclarations(sourceFiles) {
  const declarations = new Map();
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        const existing = declarations.get(node.name.text);
        if (
          !existing ||
          membersForDeclaration(node).length > membersForDeclaration(existing.node).length
        ) {
          declarations.set(node.name.text, { node, sourceFile });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return declarations;
}

function membersForDeclaration(node) {
  if (ts.isInterfaceDeclaration(node)) return [...node.members];
  return ts.isTypeLiteralNode(node.type) ? [...node.type.members] : [];
}

function typeReferenceName(typeNode) {
  if (!typeNode) return null;
  if (ts.isTypeReferenceNode(typeNode)) return typeNode.typeName.getText();
  return null;
}

function collectAutomaticVerdicts(sourceFiles, textFiles) {
  const ruleId = "trust.no-automatic-semantic-verdict";
  const violations = [];
  for (const sourceFile of sourceFiles) {
    if (sourceFile.fileName.endsWith(".spec.ts")) continue;
    const visit = (node) => {
      if (
        ts.isStringLiteralLike(node) ||
        ts.isNoSubstitutionTemplateLiteral(node) ||
        ts.isTemplateExpression(node)
      ) {
        const rendered = node.getText(sourceFile);
        if (/--verdict\s+pass(?=\s|["'`])/u.test(rendered)) {
          const digest = sha256(rendered.replaceAll(/\s+/g, " ")).slice(0, 12);
          violations.push(
            makeViolation(
              ruleId,
              sourceFile,
              node,
              `literal:${nearestSymbol(node)}:${digest}`,
              "fixed --verdict pass command manufactures a semantic verdict",
            ),
          );
        }
      }
      if (
        ts.isPropertyAssignment(node) &&
        propertyName(node) === "verdict" &&
        /(?:route|template|bootstrap|ingest|quality-review)/u.test(sourceFile.fileName)
      ) {
        const initializer = node.initializer;
        if (ts.isStringLiteralLike(initializer) && initializer.text === "pass") {
          violations.push(
            makeViolation(
              ruleId,
              sourceFile,
              node,
              `property:${nearestSymbol(node)}:verdict-pass`,
              "verdict: pass is emitted by production routing/template code",
            ),
          );
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  for (const { filePath, text } of textFiles) {
    const occurrences = new Map();
    for (const [index, line] of text.split("\n").entries()) {
      if (!/--verdict\s+pass(?=\s|["'`])/u.test(line)) continue;
      const normalized = line.trim().replaceAll(/\s+/g, " ");
      const digest = sha256(normalized).slice(0, 12);
      const ordinal = (occurrences.get(digest) ?? 0) + 1;
      occurrences.set(digest, ordinal);
      violations.push(
        makeTextViolation(
          ruleId,
          filePath,
          index + 1,
          `text:${digest}:${String(ordinal)}`,
          "fixed --verdict pass command appears in an agent-facing template",
        ),
      );
    }
  }
  return violations;
}

function functionName(node) {
  return declarationName(node) ?? nearestSymbol(node);
}

function propertyAccessSegments(node) {
  const segments = [];
  let current = node;
  while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
    if (ts.isPropertyAccessExpression(current)) segments.unshift(current.name.text);
    if (
      ts.isElementAccessExpression(current) &&
      ts.isStringLiteralLike(current.argumentExpression)
    ) {
      segments.unshift(current.argumentExpression.text);
    }
    current = current.expression;
  }
  if (ts.isIdentifier(current)) segments.unshift(current.text);
  return segments;
}

function observedParserFields(sourceFile, node) {
  const name = functionName(node);
  if (!/\/runner\/.*result-manifest/iu.test(sourceFile.fileName)) return [];
  const manifestParser = /(?:read|parse|decode|normalize).*?(?:manifest|result|envelope)/iu.test(
    name,
  );
  const metricsParser = /(?:normalize|parse|decode).*metrics/iu.test(name);
  const evidenceParser = /(?:normalize|parse|decode).*evidence/iu.test(name);
  if (!manifestParser && !metricsParser && !evidenceParser) return [];
  const fields = new Map();
  const visit = (candidate) => {
    if (ts.isPropertyAccessExpression(candidate) || ts.isElementAccessExpression(candidate)) {
      const segments = propertyAccessSegments(candidate);
      const field = segments.at(-1);
      if (
        field &&
        ((manifestParser &&
          (OBSERVED_DIRECT_FIELDS.has(field) || OBSERVED_NESTED_FIELDS.has(field))) ||
          (metricsParser && OBSERVED_NESTED_FIELDS.get("metrics")?.has(field)) ||
          (evidenceParser && OBSERVED_NESTED_FIELDS.get("evidence")?.has(field))) &&
        !fields.has(field)
      ) {
        fields.set(field, candidate);
      }
    }
    ts.forEachChild(candidate, visit);
  };
  if (node.body) visit(node.body);
  return [...fields.entries()];
}

function observedManifestOverrideFields(node) {
  if (!node.body) return [];
  const name = functionName(node);
  const mergeLikeName = /(?:apply|merge).*manifest/iu.test(name);
  if (!mergeLikeName) return [];
  const fields = new Map();
  const manifestAliases = new Set(["manifest"]);
  for (const parameter of node.parameters ?? []) {
    if (ts.isIdentifier(parameter.name) && /manifest/iu.test(parameter.name.text)) {
      manifestAliases.add(parameter.name.text);
    }
  }
  const flowsFromManifest = (candidate) => {
    if (ts.isIdentifier(candidate)) return manifestAliases.has(candidate.text);
    if (!ts.isPropertyAccessExpression(candidate) && !ts.isElementAccessExpression(candidate)) {
      return false;
    }
    const segments = propertyAccessSegments(candidate);
    return (
      segments.some((segment) => segment.toLowerCase() === "manifest") ||
      manifestAliases.has(segments[0])
    );
  };
  const visit = (candidate) => {
    if (ts.isVariableDeclaration(candidate) && candidate.initializer) {
      if (ts.isIdentifier(candidate.name) && flowsFromManifest(candidate.initializer)) {
        manifestAliases.add(candidate.name.text);
      }
      if (ts.isObjectBindingPattern(candidate.name) && flowsFromManifest(candidate.initializer)) {
        for (const element of candidate.name.elements) {
          const field = element.propertyName?.getText() ?? element.name.getText();
          if (
            (OBSERVED_DIRECT_FIELDS.has(field) || OBSERVED_NESTED_FIELDS.has(field)) &&
            !fields.has(field)
          ) {
            fields.set(field, element);
          }
        }
      }
    }
    if (ts.isPropertyAccessExpression(candidate) || ts.isElementAccessExpression(candidate)) {
      const segments = propertyAccessSegments(candidate);
      const field = segments.at(-1);
      if (
        flowsFromManifest(candidate) &&
        field &&
        (OBSERVED_DIRECT_FIELDS.has(field) || OBSERVED_NESTED_FIELDS.has(field)) &&
        !fields.has(field)
      ) {
        fields.set(field, candidate);
      }
    }
    ts.forEachChild(candidate, visit);
  };
  visit(node.body);
  return [...fields.entries()];
}

function collectAgentWritableObservedFields(sourceFiles, declarations) {
  const ruleId = "trust.no-agent-writable-observed-fields";
  const root = declarations.get("RunnerResultManifest");
  const violations = [];
  for (const member of root ? membersForDeclaration(root.node) : []) {
    if (!ts.isPropertySignature(member)) continue;
    const name = propertyName(member);
    if (!name) continue;
    if (OBSERVED_DIRECT_FIELDS.has(name)) {
      violations.push(
        makeViolation(
          ruleId,
          root.sourceFile,
          member,
          `type:RunnerResultManifest.${name}`,
          `agent-writable RunnerResultManifest exposes observed field ${name}`,
        ),
      );
      continue;
    }
    const nestedFields = OBSERVED_NESTED_FIELDS.get(name);
    if (!nestedFields) continue;
    const nested = declarations.get(typeReferenceName(member.type));
    if (!nested) {
      violations.push(
        makeViolation(
          ruleId,
          root.sourceFile,
          member,
          `type:RunnerResultManifest.${name}`,
          `agent-writable RunnerResultManifest exposes uninspectable observed container ${name}`,
        ),
      );
      continue;
    }
    for (const nestedMember of membersForDeclaration(nested.node)) {
      if (!ts.isPropertySignature(nestedMember)) continue;
      const nestedName = propertyName(nestedMember);
      if (!nestedName || !nestedFields.has(nestedName)) continue;
      violations.push(
        makeViolation(
          ruleId,
          nested.sourceFile,
          nestedMember,
          `type:RunnerResultManifest.${name}.${nestedName}`,
          `agent-writable RunnerResultManifest exposes observed field ${name}.${nestedName}`,
        ),
      );
    }
  }
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (ts.isFunctionLike(node) && node.body) {
        for (const [field, fieldNode] of observedParserFields(sourceFile, node)) {
          violations.push(
            makeViolation(
              ruleId,
              sourceFile,
              fieldNode,
              `parser:${functionName(node)}.${field}`,
              `agent-writable parser accepts observed field ${field}`,
            ),
          );
        }
        for (const [field, fieldNode] of observedManifestOverrideFields(node)) {
          violations.push(
            makeViolation(
              ruleId,
              sourceFile,
              fieldNode,
              `override:${functionName(node)}.${field}`,
              `agent-writable manifest overrides observed result field ${field}`,
            ),
          );
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return violations;
}

function isEmptyStringLiteral(value) {
  return value === '""' || value === "''" || value === "``";
}

function missingComparisonPolarity(condition) {
  if (!ts.isBinaryExpression(condition)) return null;
  const operator = condition.operatorToken.kind;
  const left = condition.left.getText();
  const right = condition.right.getText();
  const comparesMissingValue =
    [left, right].some((value) => value === "null" || value === "undefined") ||
    [left, right].some(
      (value) =>
        /^typeof\s+/u.test(value) ||
        value === '"undefined"' ||
        value === "'undefined'" ||
        isEmptyStringLiteral(value),
    );
  const comparesEmptyLength =
    (left.endsWith(".length") && right === "0") || (right.endsWith(".length") && left === "0");
  if (!comparesMissingValue && !comparesEmptyLength) {
    const rendered = condition.getText().replaceAll(/\s+/g, "");
    if (/\.length(?:<=0|<1)$|^(?:0>=|1>).*\.length$/u.test(rendered)) return true;
    if (/\.length(?:>0|>=1)$|^(?:0<|1<=).*\.length$/u.test(rendered)) return false;
    return null;
  }
  if (
    operator === ts.SyntaxKind.EqualsEqualsToken ||
    operator === ts.SyntaxKind.EqualsEqualsEqualsToken
  ) {
    return true;
  }
  if (
    operator === ts.SyntaxKind.ExclamationEqualsToken ||
    operator === ts.SyntaxKind.ExclamationEqualsEqualsToken
  ) {
    return false;
  }
  return null;
}

function conditionSelectsMissingInput(condition, whenTrue) {
  if (ts.isParenthesizedExpression(condition)) {
    return conditionSelectsMissingInput(condition.expression, whenTrue);
  }
  if (
    ts.isPrefixUnaryExpression(condition) &&
    condition.operator === ts.SyntaxKind.ExclamationToken
  ) {
    return (
      whenTrue &&
      (ts.isIdentifier(condition.operand) ||
        ts.isPropertyAccessExpression(condition.operand) ||
        ts.isCallExpression(condition.operand))
    );
  }
  if (ts.isIdentifier(condition) || ts.isPropertyAccessExpression(condition)) {
    return !whenTrue;
  }
  if (
    ts.isCallExpression(condition) &&
    ts.isPropertyAccessExpression(condition.expression) &&
    condition.expression.name.text === "trim"
  ) {
    return !whenTrue;
  }
  const missingWhenTrue = missingComparisonPolarity(condition);
  return missingWhenTrue === null ? false : missingWhenTrue === whenTrue;
}

function enclosingIfBranch(statement) {
  let current = statement;
  while (current.parent && ts.isBlock(current.parent)) current = current.parent;
  const parent = current.parent;
  if (!parent || !ts.isIfStatement(parent)) return null;
  if (parent.thenStatement === current) return { condition: parent.expression, whenTrue: true };
  if (parent.elseStatement === current) return { condition: parent.expression, whenTrue: false };
  return null;
}

function isImplicitDangerLiteral(node) {
  if (!ts.isStringLiteralLike(node) || node.text !== "danger-full-access") return false;
  const parent = node.parent;
  if (ts.isBinaryExpression(parent) && parent.right === node) {
    return (
      parent.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken ||
      parent.operatorToken.kind === ts.SyntaxKind.BarBarToken
    );
  }
  if (ts.isParameter(parent) && parent.initializer === node) return true;
  if (ts.isConditionalExpression(parent)) {
    return conditionSelectsMissingInput(parent.condition, parent.whenTrue === node);
  }
  if (!ts.isReturnStatement(parent)) return false;
  const branch = enclosingIfBranch(parent);
  return branch ? conditionSelectsMissingInput(branch.condition, branch.whenTrue) : false;
}

function collectImplicitDangerSandboxes(sourceFiles) {
  const ruleId = "trust.no-implicit-danger-sandbox";
  const violations = [];
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (isImplicitDangerLiteral(node)) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `fallback:${nearestSymbol(node)}:danger-full-access`,
            "missing sandbox input falls back to danger-full-access",
          ),
        );
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return violations;
}

function normalizedFieldName(name) {
  return name.replaceAll(/[_-]([a-z])/g, (_match, letter) => letter.toUpperCase());
}

function untypedBoundaryType(typeNode) {
  if (!typeNode) return false;
  if (
    typeNode.kind === ts.SyntaxKind.AnyKeyword ||
    typeNode.kind === ts.SyntaxKind.UnknownKeyword
  ) {
    return true;
  }
  return /^Record\s*<\s*string\s*,\s*(?:unknown|any)\s*>$/u.test(typeNode.getText());
}

function rootExpressionName(node) {
  let current = node;
  while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
    current = current.expression;
  }
  return ts.isIdentifier(current) ? current.text : "";
}

function terminalExpressionName(node) {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
    return node.argumentExpression.text;
  }
  if (ts.isIdentifier(node)) return node.text;
  return "";
}

function containsInlineDurableShape(typeNode) {
  if (ts.isTypeLiteralNode(typeNode)) return true;
  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.some((candidate) => containsInlineDurableShape(candidate));
  }
  return untypedBoundaryType(typeNode);
}

function declarationMemberNames(declaration) {
  return new Set(
    membersForDeclaration(declaration)
      .map((member) => propertyName(member))
      .filter(Boolean),
  );
}

function collectUntypedDurableBoundaries(sourceFiles, declarations) {
  const ruleId = "trust.no-untyped-durable-route-workorder";
  const violations = [];
  const contract = declarations.get("AgentWorkContextContract");
  if (contract) {
    const memberNames = declarationMemberNames(contract.node);
    if (
      memberNames.size > 0 &&
      [...memberNames].every((name) => name === "kind" || name === "version")
    ) {
      violations.push(
        makeViolation(
          ruleId,
          contract.sourceFile,
          contract.node,
          "contract:AgentWorkContextContract:nominal-only",
          "AgentWorkContextContract is nominal metadata without a typed durable work-order payload",
        ),
      );
    }
  }
  const taskBrief = declarations.get("TaskBrief");
  if (taskBrief) {
    const memberNames = declarationMemberNames(taskBrief.node);
    const duplicatedDurableFields = [
      "task",
      "workflow",
      "route",
      "next_action",
      "execution_packet",
    ].filter((name) => memberNames.has(name));
    if (memberNames.has("contract") && duplicatedDurableFields.length >= 2) {
      violations.push(
        makeViolation(
          ruleId,
          taskBrief.sourceFile,
          taskBrief.node,
          "contract:TaskBrief:duplicated-durable-shape",
          `TaskBrief duplicates durable fields outside AgentWorkContextContract: ${duplicatedDurableFields.join(", ")}`,
        ),
      );
    }
  }
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (ts.isPropertySignature(node)) {
        const name = propertyName(node);
        if (
          name &&
          DURABLE_FIELD_NAMES.has(normalizedFieldName(name)) &&
          untypedBoundaryType(node.type)
        ) {
          violations.push(
            makeViolation(
              ruleId,
              sourceFile,
              node,
              `type:${nearestSymbol(node)}.${name}`,
              `durable ${name} payload uses ${node.type.getText()} instead of a validated contract`,
            ),
          );
        }
      }
      if (
        ts.isAsExpression(node) &&
        ts.isAsExpression(node.expression) &&
        untypedBoundaryType(node.type) &&
        node.expression.type.kind === ts.SyntaxKind.UnknownKeyword
      ) {
        const name = rootExpressionName(node.expression.expression);
        if (DURABLE_FIELD_NAMES.has(normalizedFieldName(name))) {
          violations.push(
            makeViolation(
              ruleId,
              sourceFile,
              node,
              `cast:${nearestSymbol(node)}:${name}`,
              `durable ${name} payload crosses the boundary through an unchecked double cast`,
            ),
          );
        }
      }
      if (
        ts.isAsExpression(node) &&
        normalizedFieldName(terminalExpressionName(node.expression)) === "routeDecision" &&
        containsInlineDurableShape(node.type)
      ) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `assertion:${nearestSymbol(node)}:route-decision-inline-shape`,
            "route_decision is decoded through an inline bootstrap assertion instead of a shared contract",
          ),
        );
      }
      if (
        (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
        /route_decision\.(?:oracle|executionPacket|nextAction|workspace|approval)\./u.test(
          node.text,
        )
      ) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `bootstrap:${nearestSymbol(node)}:route-decision-projection`,
            "runner bootstrap duplicates route_decision field paths instead of consuming a typed work order",
          ),
        );
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return violations;
}

function literalText(node) {
  return node && ts.isStringLiteralLike(node) ? node.text : null;
}

function propertyInitializer(object, name) {
  for (const property of object.properties) {
    if (ts.isPropertyAssignment(property) && propertyName(property) === name) {
      return property.initializer;
    }
  }
  return null;
}

function isShellInvocation(node) {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression.getText();
  if (
    callee === "startProcess" &&
    node.arguments[0] &&
    ts.isObjectLiteralExpression(node.arguments[0])
  ) {
    const object = node.arguments[0];
    const command = literalText(propertyInitializer(object, "command"));
    const args = propertyInitializer(object, "args");
    return Boolean(
      command &&
      SHELL_COMMANDS.has(command) &&
      args &&
      ts.isArrayLiteralExpression(args) &&
      args.elements.some((element) => SHELL_FLAGS.has(literalText(element))),
    );
  }
  if (!["spawn", "spawnSync", "execFile", "execFileSync"].includes(callee)) return false;
  const command = literalText(node.arguments[0]);
  const args = node.arguments[1];
  return Boolean(
    command &&
    SHELL_COMMANDS.has(command) &&
    args &&
    ts.isArrayLiteralExpression(args) &&
    args.elements.some((element) => SHELL_FLAGS.has(literalText(element))),
  );
}

function functionContainsText(node, text) {
  return node.body?.getText().includes(text) ?? false;
}

function collectRenderedCommandOrchestration(sourceFiles) {
  const ruleId = "trust.no-rendered-command-orchestration";
  const violations = [];
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (isShellInvocation(node)) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `shell:${nearestSymbol(node)}`,
            "internal orchestration executes a rendered command through a shell",
          ),
        );
      }
      if (
        ts.isFunctionDeclaration(node) &&
        (node.name?.text === "exactArgvFor" ||
          (functionContainsText(node, "for (const char of trimmed)") &&
            functionContainsText(node, "args.push")))
      ) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            "parser:exactArgvFor",
            "route orchestration reparses a rendered command string into argv",
          ),
        );
      }
      if (
        (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) &&
        functionContainsText(node, "next_action.command") &&
        functionContainsText(node, ".split(/\\s+")
      ) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `parser:${nearestSymbol(node)}:next-action-command`,
            "internal dispatch tokenizes next_action.command instead of consuming a typed operation",
          ),
        );
      }
      if (
        (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) &&
        functionContainsText(node, "currentAgentplaneCommand") &&
        functionContainsText(node, "execFile")
      ) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `subprocess:${nearestSymbol(node)}`,
            "supervisor orchestration re-enters AgentPlane through a subprocess",
          ),
        );
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return violations;
}

function collectDuplicateRunnerTaskRepresentations(sourceFiles, declarations) {
  const ruleId = "trust.no-duplicate-runner-task-representation";
  const declaration = declarations.get("RunnerTaskContext");
  const violations = [];
  if (declaration) {
    const members = membersForDeclaration(declaration.node).filter((member) =>
      ts.isPropertySignature(member),
    );
    const byName = new Map(members.map((member) => [propertyName(member), member]));
    const data = byName.get("data");
    if (data?.type?.getText().includes("TaskData")) {
      for (const name of DUPLICATE_TASK_FIELDS) {
        const member = byName.get(name);
        if (!member) continue;
        violations.push(
          makeViolation(
            ruleId,
            declaration.sourceFile,
            member,
            `type:RunnerTaskContext.data+${name}`,
            `RunnerTaskContext serializes TaskData beside duplicate ${name} projection`,
          ),
        );
      }
    }
  }
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const byName = new Map(
          node.properties.map((property) => [propertyName(property), property]),
        );
        const isTaskBuilderObject =
          (ts.isPropertyAssignment(node.parent) && propertyName(node.parent) === "task") ||
          /(?:assemble|build|compose).*task.*(?:context|envelope)/iu.test(
            nearestFunctionSymbol(node),
          );
        if (isTaskBuilderObject && byName.has("data")) {
          for (const name of DUPLICATE_TASK_FIELDS) {
            const property = byName.get(name);
            if (!property) continue;
            violations.push(
              makeViolation(
                ruleId,
                sourceFile,
                property,
                `builder:${nearestFunctionSymbol(node)}.data+${name}`,
                `runner task builder emits TaskData beside duplicate ${name} projection`,
              ),
            );
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return violations;
}

export function collectTrustBoundaryViolations(root) {
  const sourceFiles = [];
  const textFiles = [];
  for (const sourceRoot of SOURCE_ROOTS) {
    for (const absolutePath of listFiles(root, sourceRoot)) {
      const relativePath = normalizeRepoPath(path.relative(root, absolutePath));
      if (absolutePath.endsWith(".test.ts") || absolutePath.endsWith(".d.ts")) continue;
      if (absolutePath.endsWith(".ts")) {
        sourceFiles.push(
          ts.createSourceFile(
            relativePath,
            readFileSync(absolutePath, "utf8"),
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS,
          ),
        );
      } else if (TEXT_EXTENSIONS.has(path.extname(absolutePath))) {
        textFiles.push({ filePath: relativePath, text: readFileSync(absolutePath, "utf8") });
      }
    }
  }
  const declarations = collectDeclarations(sourceFiles);
  return [
    ...collectAutomaticVerdicts(sourceFiles, textFiles),
    ...collectAgentWritableObservedFields(sourceFiles, declarations),
    ...collectImplicitDangerSandboxes(sourceFiles),
    ...collectUntypedDurableBoundaries(sourceFiles, declarations),
    ...collectRenderedCommandOrchestration(sourceFiles),
    ...collectDuplicateRunnerTaskRepresentations(sourceFiles, declarations),
  ].toSorted((left, right) => left.violation_id.localeCompare(right.violation_id));
}

export function trustBoundaryOriginDigest(violationIds) {
  return sha256(`${[...violationIds].toSorted().join("\n")}\n`);
}

function sameStringArray(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function validateTrustBoundaryBaseline({
  baseline,
  baseBaseline = null,
  violations,
  expectedOriginDigest,
  expectedCapturedFromCommit,
}) {
  const errors = [];
  if (baseline?.schema_version !== 1) errors.push("baseline schema_version must be 1");
  if (baseline?.baseline_id !== "agentplane.trust-boundary.v0.7") {
    errors.push("baseline_id must be agentplane.trust-boundary.v0.7");
  }
  if (expectedCapturedFromCommit && baseline?.captured_from_commit !== expectedCapturedFromCommit) {
    errors.push(
      `captured_from_commit must remain ${expectedCapturedFromCommit}; received ${String(
        baseline?.captured_from_commit,
      )}`,
    );
  }
  const baselineRules = Array.isArray(baseline?.rules) ? baseline.rules : [];
  for (const rule of TRUST_BOUNDARY_RULES) {
    const entry = baselineRules.find((candidate) => candidate?.id === rule.id);
    if (!entry) {
      errors.push(`baseline is missing rule metadata for ${rule.id}`);
      continue;
    }
    if (!sameStringArray(entry.rf_owners, rule.rf_owners)) {
      errors.push(`${rule.id} rf_owners do not match the canonical registry`);
    }
    if (!sameStringArray(entry.owner_task_ids, rule.owner_task_ids)) {
      errors.push(`${rule.id} owner_task_ids do not match the canonical registry`);
    }
  }
  const originIds = Array.isArray(baseline?.origin?.violation_ids)
    ? baseline.origin.violation_ids
    : [];
  const uniqueOriginIds = new Set();
  for (const violationId of originIds) {
    if (uniqueOriginIds.has(violationId)) {
      errors.push(`duplicate origin violation_id: ${String(violationId)}`);
    }
    uniqueOriginIds.add(violationId);
  }
  const originDigest = trustBoundaryOriginDigest(originIds);
  if (baseline?.origin?.violation_ids_sha256 !== originDigest) {
    errors.push("origin.violation_ids_sha256 does not match origin.violation_ids");
  }
  if (expectedOriginDigest && originDigest !== expectedOriginDigest) {
    errors.push(
      `baseline origin changed: expected digest ${expectedOriginDigest}, received ${originDigest}`,
    );
  }
  const entries = Array.isArray(baseline?.violations) ? baseline.violations : [];
  const currentById = new Map();
  const currentIds = new Set();
  for (const violation of violations) {
    if (currentIds.has(violation.violation_id)) {
      errors.push(`duplicate collected violation_id: ${violation.violation_id}`);
    }
    currentIds.add(violation.violation_id);
    currentById.set(violation.violation_id, violation);
  }
  const baselineIds = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.violation_id !== "string") {
      errors.push("baseline contains a violation without violation_id");
      continue;
    }
    if (baselineIds.has(entry.violation_id))
      errors.push(`duplicate baseline entry: ${entry.violation_id}`);
    baselineIds.add(entry.violation_id);
    if (!originIds.includes(entry.violation_id)) {
      errors.push(
        `baseline growth is forbidden: ${entry.violation_id} is not in the reviewed origin`,
      );
    }
    const rule = RULE_BY_ID.get(entry.rule_id);
    if (!rule) {
      errors.push(
        `baseline entry ${entry.violation_id} has unknown rule_id ${String(entry.rule_id)}`,
      );
    } else if (
      !sameStringArray(entry.rf_owners, rule.rf_owners) ||
      !sameStringArray(entry.owner_task_ids, rule.owner_task_ids)
    ) {
      errors.push(`baseline entry ${entry.violation_id} has stale RF ownership`);
    }
    const collected = currentById.get(entry.violation_id);
    if (collected) {
      const exactFields = [
        ["rule_id", entry.rule_id, collected.rule_id],
        ["path", entry.path, collected.path],
        ["locator", entry.locator, collected.locator],
        ["rationale", entry.rationale, collected.message],
      ];
      for (const [field, actual, expected] of exactFields) {
        if (actual !== expected) {
          errors.push(
            `baseline entry ${entry.violation_id} ${field} does not match the collected violation`,
          );
        }
      }
      if (!sameStringArray(entry.rf_owners, collected.rf_owners)) {
        errors.push(
          `baseline entry ${entry.violation_id} rf_owners do not match the collected violation`,
        );
      }
      if (!sameStringArray(entry.owner_task_ids, collected.owner_task_ids)) {
        errors.push(
          `baseline entry ${entry.violation_id} owner_task_ids do not match the collected violation`,
        );
      }
    }
  }
  if (baseBaseline !== null) {
    if (baseBaseline?.schema_version !== 1) {
      errors.push("base baseline schema_version must be 1");
    }
    if (baseBaseline?.baseline_id !== "agentplane.trust-boundary.v0.7") {
      errors.push("base baseline_id must be agentplane.trust-boundary.v0.7");
    }
    const baseEntries = Array.isArray(baseBaseline?.violations) ? baseBaseline.violations : [];
    const baseIds = new Set();
    for (const entry of baseEntries) {
      if (!entry || typeof entry.violation_id !== "string") {
        errors.push("base baseline contains a violation without violation_id");
        continue;
      }
      if (baseIds.has(entry.violation_id)) {
        errors.push(`duplicate base baseline entry: ${entry.violation_id}`);
      }
      baseIds.add(entry.violation_id);
    }
    for (const entry of entries) {
      if (entry?.violation_id && !baseIds.has(entry.violation_id)) {
        errors.push(
          `baseline reactivation or growth is forbidden relative to the checked-out base: ${entry.violation_id}`,
        );
      }
    }
  }
  for (const violation of violations) {
    if (!baselineIds.has(violation.violation_id)) {
      errors.push(
        `new violation ${violation.rule_id} at ${violation.path}:${String(violation.line)} (${violation.locator})`,
      );
    }
  }
  for (const entry of entries) {
    if (entry?.violation_id && !currentIds.has(entry.violation_id)) {
      errors.push(
        `resolved violation remains in baseline; remove it to shrink debt: ${entry.violation_id}`,
      );
    }
  }
  return errors;
}

export function baselineViolationEntry(violation) {
  return {
    violation_id: violation.violation_id,
    rule_id: violation.rule_id,
    rf_owners: violation.rf_owners,
    owner_task_ids: violation.owner_task_ids,
    path: violation.path,
    locator: violation.locator,
    rationale: violation.message,
  };
}
