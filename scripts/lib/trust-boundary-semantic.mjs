import ts from "typescript";

import {
  collectStringConstants,
  nearestSymbol,
  propertyName,
  sha256,
  staticStringValue,
} from "./trust-boundary-ast.mjs";

function semanticStringProjection(node, constants) {
  const exact = staticStringValue(node, constants);
  if (exact !== null) return exact;
  if (ts.isTemplateExpression(node)) {
    let value = node.head.text;
    for (const span of node.templateSpans) {
      value += staticStringValue(span.expression, constants) ?? " __DYNAMIC__ ";
      value += span.literal.text;
    }
    return value;
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = semanticStringProjection(node.left, constants);
    const right = semanticStringProjection(node.right, constants);
    if (left === null && right === null) return null;
    return `${left ?? " __DYNAMIC__ "}${right ?? " __DYNAMIC__ "}`;
  }
  return null;
}

function isFoldableStringExpression(node) {
  return (
    ts.isStringLiteralLike(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node) ||
    (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) ||
    (ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "join")
  );
}

function containsPassVerdict(value) {
  return typeof value === "string" && /--verdict\s+pass(?=\s|$)/u.test(value);
}

function childExpressionContainsPassVerdict(node, constants) {
  let found = false;
  ts.forEachChild(node, (child) => {
    if (
      !found &&
      ts.isExpression(child) &&
      containsPassVerdict(semanticStringProjection(child, constants))
    ) {
      found = true;
    }
  });
  return found;
}

export function collectAutomaticVerdicts(sourceFiles, textFiles, makeViolation, makeTextViolation) {
  const ruleId = "trust.no-automatic-semantic-verdict";
  const violations = [];
  for (const sourceFile of sourceFiles) {
    if (sourceFile.fileName.endsWith(".spec.ts")) continue;
    const constants = collectStringConstants(sourceFile);
    const visit = (node) => {
      if (isFoldableStringExpression(node)) {
        const evaluated = semanticStringProjection(node, constants);
        if (
          containsPassVerdict(evaluated) &&
          !childExpressionContainsPassVerdict(node, constants)
        ) {
          const digest = sha256(node.getText(sourceFile).replaceAll(/\s+/g, " ")).slice(0, 12);
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
      if (ts.isPropertyAssignment(node) && propertyName(node) === "verdict") {
        const verdict = staticStringValue(node.initializer, constants);
        if (
          verdict === "pass" &&
          /(?:route|template|bootstrap|ingest|quality-review)/u.test(sourceFile.fileName)
        ) {
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
