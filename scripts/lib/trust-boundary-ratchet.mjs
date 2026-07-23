import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import ts from "typescript";

import {
  lineAndColumn,
  nearestFunctionSymbol,
  nearestSymbol,
  normalizeRepoPath,
  propertyName,
  structuralNodeIdentity,
} from "./trust-boundary-ast.mjs";
import { ruleById } from "./trust-boundary-baseline.mjs";
import { objectContextMatchesType } from "./trust-boundary-context.mjs";
import { collectAgentWritableObservedFields } from "./trust-boundary-observed.mjs";
import { collectImplicitDangerSandboxes } from "./trust-boundary-sandbox.mjs";
import { collectAutomaticVerdicts } from "./trust-boundary-semantic.mjs";
import { createTypeDeclarationIndex } from "./trust-boundary-types.mjs";

export {
  baselineViolationEntry,
  readTrustBoundaryReferenceBaseline,
  TRUST_BOUNDARY_RULES,
  trustBoundaryOriginDigest,
  validateTrustBoundaryBaseline,
} from "./trust-boundary-baseline.mjs";

const SOURCE_ROOTS = ["packages/agentplane/src", "packages/agentplane/assets"];
const TEXT_EXTENSIONS = new Set([".json", ".md"]);
const DURABLE_FIELD_NAMES = new Set([
  "routeDecision",
  "workOrder",
  "episodeInput",
  "operationPayload",
]);
const DUPLICATE_TASK_FIELDS = ["frontmatter", "doc", "sections", "comments", "events"];
const SHELL_COMMANDS = new Set(["sh", "bash", "zsh"]);
const SHELL_FLAGS = new Set(["-c", "-lc"]);

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

function makeViolation(ruleId, sourceFile, node, locator, message) {
  const rule = ruleById(ruleId);
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
  const rule = ruleById(ruleId);
  if (!rule) throw new Error(`Unknown trust-boundary rule: ${ruleId}`);
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

function resolutionViolations(ruleId, typeName, resolution) {
  return (resolution?.diagnostics ?? []).map((diagnostic) =>
    makeViolation(
      ruleId,
      diagnostic.sourceFile,
      diagnostic.node,
      `resolution:${typeName}:${diagnostic.code}`,
      `${typeName} type resolution failed closed: ${diagnostic.message}`,
    ),
  );
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

function declarationMemberNames(resolution) {
  return new Set(
    (resolution?.members ?? []).map(({ member }) => propertyName(member)).filter(Boolean),
  );
}

function collectUntypedDurableBoundaries(sourceFiles, typeIndex) {
  const ruleId = "trust.no-untyped-durable-route-workorder";
  const violations = [];
  const contract = typeIndex.canonical(
    "/commands/task/agent-work-context-contract.ts",
    "AgentWorkContextContract",
  );
  violations.push(...resolutionViolations(ruleId, "AgentWorkContextContract", contract));
  if (contract?.declarations.length > 0) {
    const memberNames = declarationMemberNames(contract);
    if (
      memberNames.size > 0 &&
      [...memberNames].every((name) => name === "kind" || name === "version")
    ) {
      const declaration = contract.declarations.at(-1);
      violations.push(
        makeViolation(
          ruleId,
          declaration.sourceFile,
          declaration.node,
          "contract:AgentWorkContextContract:nominal-only",
          "AgentWorkContextContract is nominal metadata without a typed durable work-order payload",
        ),
      );
    }
  }
  const taskBrief = typeIndex.canonical("/commands/task/brief-model.ts", "TaskBrief");
  violations.push(...resolutionViolations(ruleId, "TaskBrief", taskBrief));
  if (taskBrief?.declarations.length > 0) {
    const memberNames = declarationMemberNames(taskBrief);
    const duplicatedDurableFields = [
      "task",
      "workflow",
      "route",
      "next_action",
      "execution_packet",
    ].filter((name) => memberNames.has(name));
    if (memberNames.has("contract") && duplicatedDurableFields.length >= 2) {
      const declaration = taskBrief.declarations.at(-1);
      violations.push(
        makeViolation(
          ruleId,
          declaration.sourceFile,
          declaration.node,
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
    if (ts.isPropertyAssignment(property) && propertyName(property) === name)
      return property.initializer;
  }
  return null;
}

function shellInvocationNames(sourceFile) {
  const names = new Set(["spawn", "spawnSync", "execFile", "execFileSync"]);
  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteralLike(statement.moduleSpecifier) ||
      !["child_process", "node:child_process"].includes(statement.moduleSpecifier.text) ||
      !statement.importClause?.namedBindings
    ) {
      continue;
    }
    if (ts.isNamedImports(statement.importClause.namedBindings)) {
      for (const element of statement.importClause.namedBindings.elements) {
        const importedName = element.propertyName?.text ?? element.name.text;
        if (["spawn", "spawnSync", "execFile", "execFileSync"].includes(importedName)) {
          names.add(element.name.text);
        }
      }
    } else if (ts.isNamespaceImport(statement.importClause.namedBindings)) {
      for (const name of ["spawn", "spawnSync", "execFile", "execFileSync"]) {
        names.add(`${statement.importClause.namedBindings.name.text}.${name}`);
      }
    }
  }
  return names;
}

function isShellInvocation(node, invocationNames) {
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
  if (!invocationNames.has(callee)) return false;
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
    const invocationNames = shellInvocationNames(sourceFile);
    const visit = (node) => {
      if (isShellInvocation(node, invocationNames)) {
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

function collectDuplicateRunnerTaskRepresentations(sourceFiles, typeIndex) {
  const ruleId = "trust.no-duplicate-runner-task-representation";
  const declaration = typeIndex.canonical("/runner/types/context.ts", "RunnerTaskContext");
  const violations = resolutionViolations(ruleId, "RunnerTaskContext", declaration);
  if (declaration) {
    const members = declaration.members.filter(({ member }) => ts.isPropertySignature(member));
    const byName = new Map(members.map((entry) => [propertyName(entry.member), entry]));
    const data = byName.get("data");
    if (data?.member.type?.getText().includes("TaskData")) {
      for (const name of DUPLICATE_TASK_FIELDS) {
        const entry = byName.get(name);
        if (!entry) continue;
        violations.push(
          makeViolation(
            ruleId,
            entry.sourceFile,
            entry.member,
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
        if (
          /\/runner\//u.test(sourceFile.fileName) &&
          byName.has("data") &&
          objectContextMatchesType(sourceFile, node, typeIndex, declaration)
        ) {
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
  const typeIndex = createTypeDeclarationIndex(sourceFiles);
  return [
    ...collectAutomaticVerdicts(sourceFiles, textFiles, makeViolation, makeTextViolation),
    ...collectAgentWritableObservedFields(sourceFiles, typeIndex, makeViolation),
    ...collectImplicitDangerSandboxes(sourceFiles, typeIndex, makeViolation),
    ...collectUntypedDurableBoundaries(sourceFiles, typeIndex),
    ...collectRenderedCommandOrchestration(sourceFiles),
    ...collectDuplicateRunnerTaskRepresentations(sourceFiles, typeIndex),
  ].toSorted((left, right) => left.violation_id.localeCompare(right.violation_id));
}
