import ts from "typescript";

import {
  collectStringConstants,
  declarationName,
  expressionPath,
  nearestSymbol,
  propertyName,
  resolvedPropertyField,
} from "./trust-boundary-ast.mjs";
import { createObservedBoundaryModel } from "./trust-boundary-types.mjs";

const OBSERVED_DIRECT_FIELDS = new Set(["status", "exit_code", "timeout_reason", "artifacts"]);
const OBSERVED_NESTED_FIELDS = new Map([
  [
    "metrics",
    new Set(["duration_ms", "stdout_bytes", "stderr_bytes", "output_last_message_bytes"]),
  ],
  ["evidence", new Set(["evidence_paths", "changed_paths", "files_changed_count", "tests_run"])],
]);

function functionName(node) {
  return declarationName(node) ?? nearestSymbol(node);
}

function expressionIsTainted(node, taintedNames, taintedPaths, constants, jsonIsSource) {
  if (!node) return false;
  if (ts.isIdentifier(node)) return taintedNames.has(node.text);
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    return expressionIsTainted(
      node.expression,
      taintedNames,
      taintedPaths,
      constants,
      jsonIsSource,
    );
  }
  const candidatePath = expressionPath(node, constants);
  if (candidatePath && taintedPaths.has(candidatePath)) return true;
  if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    return expressionIsTainted(
      node.expression,
      taintedNames,
      taintedPaths,
      constants,
      jsonIsSource,
    );
  }
  if (ts.isCallExpression(node)) {
    if (jsonIsSource && node.expression.getText() === "JSON.parse") return true;
    return node.arguments.some((argument) =>
      expressionIsTainted(argument, taintedNames, taintedPaths, constants, jsonIsSource),
    );
  }
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties.some((property) => {
      if (ts.isSpreadAssignment(property)) {
        return expressionIsTainted(
          property.expression,
          taintedNames,
          taintedPaths,
          constants,
          jsonIsSource,
        );
      }
      if (ts.isPropertyAssignment(property)) {
        return expressionIsTainted(
          property.initializer,
          taintedNames,
          taintedPaths,
          constants,
          jsonIsSource,
        );
      }
      return ts.isShorthandPropertyAssignment(property) && taintedNames.has(property.name.text);
    });
  }
  let tainted = false;
  ts.forEachChild(node, (child) => {
    if (
      !tainted &&
      ts.isExpression(child) &&
      expressionIsTainted(child, taintedNames, taintedPaths, constants, jsonIsSource)
    ) {
      tainted = true;
    }
  });
  return tainted;
}

function expressionIsDirectlyTainted(node, taintedNames, taintedPaths, constants, jsonIsSource) {
  if (!node) return false;
  if (ts.isIdentifier(node)) return taintedNames.has(node.text);
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    return expressionIsDirectlyTainted(
      node.expression,
      taintedNames,
      taintedPaths,
      constants,
      jsonIsSource,
    );
  }
  const candidatePath = expressionPath(node, constants);
  if (candidatePath && taintedPaths.has(candidatePath)) return true;
  if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    return expressionIsDirectlyTainted(
      node.expression,
      taintedNames,
      taintedPaths,
      constants,
      jsonIsSource,
    );
  }
  if (ts.isCallExpression(node)) {
    if (jsonIsSource && node.expression.getText() === "JSON.parse") return true;
    return node.arguments.some((argument) =>
      expressionIsTainted(argument, taintedNames, taintedPaths, constants, jsonIsSource),
    );
  }
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties.some(
      (property) =>
        ts.isSpreadAssignment(property) &&
        expressionIsDirectlyTainted(
          property.expression,
          taintedNames,
          taintedPaths,
          constants,
          jsonIsSource,
        ),
    );
  }
  return false;
}

function expressionHasManifestSource(node, manifestNames, manifestPaths, constants) {
  const candidatePath = expressionPath(node, constants);
  if (candidatePath) {
    if (
      [...manifestPaths].some(
        (sourcePath) => candidatePath === sourcePath || candidatePath.startsWith(`${sourcePath}.`),
      )
    ) {
      return true;
    }
    const root = candidatePath.split(".")[0];
    if ([...manifestPaths].some((sourcePath) => sourcePath.startsWith(`${root}.`))) {
      return false;
    }
  }
  return expressionIsTainted(node, manifestNames, manifestPaths, constants, false);
}

function bindingIdentifiers(name) {
  if (ts.isIdentifier(name)) return [name.text];
  if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    return name.elements.flatMap((element) =>
      ts.isBindingElement(element) ? bindingIdentifiers(element.name) : [],
    );
  }
  return [];
}

function markTaintedBindingPath(name, sourcePath, taintedPaths, markBinding) {
  if (ts.isIdentifier(name)) {
    if (
      taintedPaths.has(sourcePath) ||
      [...taintedPaths].some((candidate) => candidate.startsWith(`${sourcePath}.`))
    ) {
      markBinding(name);
    }
    return;
  }
  if (!ts.isObjectBindingPattern(name)) return;
  for (const element of name.elements) {
    if (!ts.isBindingElement(element)) continue;
    const key = element.propertyName ?? element.name;
    if (!ts.isIdentifier(key) && !ts.isStringLiteralLike(key)) continue;
    markTaintedBindingPath(element.name, `${sourcePath}.${key.text}`, taintedPaths, markBinding);
  }
}

function propagateTaint(functionNode, initialNames, taintedPaths, constants, jsonIsSource) {
  const taintedNames = new Set(initialNames);
  let changed = true;
  for (let pass = 0; pass < 12 && changed; pass += 1) {
    changed = false;
    const markBinding = (name) => {
      for (const identifier of bindingIdentifiers(name)) {
        if (!taintedNames.has(identifier)) {
          taintedNames.add(identifier);
          changed = true;
        }
      }
    };
    const visit = (node) => {
      if (node !== functionNode && ts.isFunctionLike(node)) return;
      if (
        ts.isVariableDeclaration(node) &&
        node.initializer &&
        expressionIsTainted(node.initializer, taintedNames, taintedPaths, constants, jsonIsSource)
      ) {
        markBinding(node.name);
      }
      if (ts.isVariableDeclaration(node) && node.initializer) {
        const sourcePath = expressionPath(node.initializer, constants);
        if (sourcePath) {
          markTaintedBindingPath(node.name, sourcePath, taintedPaths, markBinding);
        }
      }
      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        expressionIsTainted(node.right, taintedNames, taintedPaths, constants, jsonIsSource)
      ) {
        if (ts.isIdentifier(node.left)) markBinding(node.left);
        if (ts.isObjectLiteralExpression(node.left) || ts.isArrayLiteralExpression(node.left)) {
          for (const identifier of node.left.getText().matchAll(/[A-Za-z_$][\w$]*/gu)) {
            if (!taintedNames.has(identifier[0])) {
              taintedNames.add(identifier[0]);
              changed = true;
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(functionNode.body);
  }
  return taintedNames;
}

function isUntrustedInputType(typeNode) {
  if (!typeNode) return false;
  if (
    typeNode.kind === ts.SyntaxKind.UnknownKeyword ||
    typeNode.kind === ts.SyntaxKind.AnyKeyword
  ) {
    return true;
  }
  return /^Record\s*<\s*string\s*,\s*(?:unknown|any)\s*>$/u.test(typeNode.getText());
}

function collectManifestTypedPaths(model, sourceFile, typeNode, prefix, seen = new Set()) {
  const paths = new Set();
  if (!typeNode || seen.has(typeNode)) return paths;
  seen.add(typeNode);
  const kinds = model.kindsForType(sourceFile, typeNode);
  if (kinds.has("manifest")) {
    paths.add(prefix);
    return paths;
  }
  const resolved = model.typeIndex.resolveTypeNode(sourceFile, typeNode);
  for (const { member, sourceFile: memberSourceFile } of resolved.members) {
    if (!ts.isPropertySignature(member) || !member.type) continue;
    const name = propertyName(member);
    if (!name) continue;
    for (const nested of collectManifestTypedPaths(
      model,
      memberSourceFile,
      member.type,
      `${prefix}.${name}`,
      seen,
    )) {
      paths.add(nested);
    }
  }
  return paths;
}

function observedFieldsForKinds(kinds) {
  const fields = new Set();
  if (kinds.has("manifest")) {
    for (const field of OBSERVED_DIRECT_FIELDS) fields.add(field);
    for (const field of OBSERVED_NESTED_FIELDS.keys()) fields.add(field);
  }
  if (kinds.has("metrics")) {
    for (const field of OBSERVED_NESTED_FIELDS.get("metrics") ?? []) fields.add(field);
  }
  if (kinds.has("evidence")) {
    for (const field of OBSERVED_NESTED_FIELDS.get("evidence") ?? []) fields.add(field);
  }
  return fields;
}

function objectLiteralIsResultSink(node, sourceFile, functionKinds, model) {
  let current = node.parent;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current)) {
    current = current.parent;
  }
  if (ts.isReturnStatement(current)) return functionKinds.has("result");
  if (ts.isArrowFunction(current) && current.body === node) return functionKinds.has("result");
  if (ts.isVariableDeclaration(current) && current.initializer === node) {
    return model.kindsForType(sourceFile, current.type).has("result");
  }
  return false;
}

function declaredPropertyField(node, constants) {
  const direct = propertyName(node);
  if (direct) return direct;
  if (node.name && ts.isComputedPropertyName(node.name)) {
    if (ts.isStringLiteralLike(node.name.expression)) return node.name.expression.text;
    if (ts.isIdentifier(node.name.expression))
      return constants.get(node.name.expression.text) ?? null;
  }
  return null;
}

function objectLiteralParserFields(node, sourceFile, functionKinds, model) {
  let current = node.parent;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current)) {
    current = current.parent;
  }
  if (ts.isReturnStatement(current)) return observedFieldsForKinds(functionKinds);
  if (ts.isArrowFunction(current) && current.body === node)
    return observedFieldsForKinds(functionKinds);
  if (ts.isVariableDeclaration(current) && current.initializer === node) {
    return observedFieldsForKinds(model.kindsForType(sourceFile, current.type));
  }
  return new Set();
}

function parserValueIsAccepted(field, value, parserNames, constants) {
  const directOnly = field === "artifacts" || field === "metrics" || field === "evidence";
  const predicate = directOnly ? expressionIsDirectlyTainted : expressionIsTainted;
  return predicate(value, parserNames, new Set(), constants, true);
}

function rootExpressionName(node) {
  let current = node;
  while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
    current = current.expression;
  }
  return ts.isIdentifier(current) ? current.text : "";
}

function analyzeObservedFunctionDataflow(sourceFile, functionNode, model) {
  const constants = collectStringConstants(sourceFile);
  const functionKinds = model.kindsForType(sourceFile, functionNode.type);
  const parserInitial = new Set();
  const manifestInitial = new Set();
  const manifestPaths = new Set();
  for (const parameter of functionNode.parameters ?? []) {
    if (!ts.isIdentifier(parameter.name)) continue;
    if (isUntrustedInputType(parameter.type)) parserInitial.add(parameter.name.text);
    const parameterKinds = model.kindsForType(sourceFile, parameter.type);
    if (parameterKinds.has("manifest") && !ts.isTypeLiteralNode(parameter.type)) {
      manifestInitial.add(parameter.name.text);
    }
    for (const sourcePath of collectManifestTypedPaths(
      model,
      sourceFile,
      parameter.type,
      parameter.name.text,
    )) {
      manifestPaths.add(sourcePath);
    }
  }
  const parserNames = propagateTaint(functionNode, parserInitial, new Set(), constants, true);
  const manifestNames = propagateTaint(
    functionNode,
    manifestInitial,
    manifestPaths,
    constants,
    false,
  );
  const parserSinkFieldsByName = new Map();
  const collectParserSinks = (node) => {
    if (node !== functionNode && ts.isFunctionLike(node)) return;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.type) {
      const fields = observedFieldsForKinds(model.kindsForType(sourceFile, node.type));
      if (fields.size > 0) parserSinkFieldsByName.set(node.name.text, fields);
    }
    ts.forEachChild(node, collectParserSinks);
  };
  collectParserSinks(functionNode.body);
  const parser = new Map();
  const override = new Map();
  const visit = (node) => {
    if (node !== functionNode && ts.isFunctionLike(node)) return;
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      (ts.isPropertyAccessExpression(node.left) || ts.isElementAccessExpression(node.left))
    ) {
      const targetName = rootExpressionName(node.left);
      const field = resolvedPropertyField(node.left, constants);
      const sinkFields = parserSinkFieldsByName.get(targetName) ?? new Set();
      if (
        field &&
        sinkFields.has(field) &&
        parserValueIsAccepted(field, node.right, parserNames, constants) &&
        !parser.has(field)
      ) {
        parser.set(field, node);
      }
    }
    if (ts.isObjectLiteralExpression(node)) {
      const sinkFields = objectLiteralParserFields(node, sourceFile, functionKinds, model);
      for (const property of node.properties) {
        if (
          sinkFields.size > 0 &&
          ts.isSpreadAssignment(property) &&
          expressionIsDirectlyTainted(
            property.expression,
            parserNames,
            new Set(),
            constants,
            true,
          ) &&
          !parser.has("spread")
        ) {
          parser.set("spread", property);
          continue;
        }
        if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property))
          continue;
        const field = declaredPropertyField(property, constants);
        const value = ts.isPropertyAssignment(property) ? property.initializer : property.name;
        if (
          field &&
          sinkFields.has(field) &&
          parserValueIsAccepted(field, value, parserNames, constants) &&
          !parser.has(field)
        ) {
          parser.set(field, property);
        }
      }
    }
    if (
      ts.isObjectLiteralExpression(node) &&
      objectLiteralIsResultSink(node, sourceFile, functionKinds, model)
    ) {
      for (const property of node.properties) {
        if (
          ts.isSpreadAssignment(property) &&
          expressionHasManifestSource(
            property.expression,
            manifestNames,
            manifestPaths,
            constants,
          ) &&
          !override.has("spread")
        ) {
          override.set("spread", property);
          continue;
        }
        if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property))
          continue;
        const field = declaredPropertyField(property, constants);
        const value = ts.isPropertyAssignment(property) ? property.initializer : property.name;
        if (
          field &&
          (OBSERVED_DIRECT_FIELDS.has(field) || OBSERVED_NESTED_FIELDS.has(field)) &&
          expressionHasManifestSource(value, manifestNames, manifestPaths, constants) &&
          !override.has(field)
        ) {
          override.set(field, property);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(functionNode.body);
  return { override, parser };
}

function resolutionViolations(ruleId, typeName, resolution, makeViolation) {
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

export function collectAgentWritableObservedFields(sourceFiles, typeIndex, makeViolation) {
  const ruleId = "trust.no-agent-writable-observed-fields";
  const root = typeIndex.canonical("/runner/types/invocation.ts", "RunnerResultManifest");
  const boundaryModel = createObservedBoundaryModel(sourceFiles, typeIndex);
  const violations = resolutionViolations(ruleId, "RunnerResultManifest", root, makeViolation);
  for (const { member, sourceFile: memberSourceFile } of root?.members ?? []) {
    if (!ts.isPropertySignature(member)) continue;
    const name = propertyName(member);
    if (!name) continue;
    if (OBSERVED_DIRECT_FIELDS.has(name)) {
      violations.push(
        makeViolation(
          ruleId,
          memberSourceFile,
          member,
          `type:RunnerResultManifest.${name}`,
          `agent-writable RunnerResultManifest exposes observed field ${name}`,
        ),
      );
      continue;
    }
    const nestedFields = OBSERVED_NESTED_FIELDS.get(name);
    if (!nestedFields) continue;
    const nested = typeIndex.resolveTypeNode(memberSourceFile, member.type);
    if (nested.members.length === 0 || nested.diagnostics.length > 0) {
      violations.push(
        makeViolation(
          ruleId,
          memberSourceFile,
          member,
          `type:RunnerResultManifest.${name}`,
          `agent-writable RunnerResultManifest exposes uninspectable observed container ${name}`,
        ),
      );
      continue;
    }
    for (const { member: nestedMember, sourceFile: nestedSourceFile } of nested.members) {
      if (!ts.isPropertySignature(nestedMember)) continue;
      const nestedName = propertyName(nestedMember);
      if (!nestedName || !nestedFields.has(nestedName)) continue;
      violations.push(
        makeViolation(
          ruleId,
          nestedSourceFile,
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
        const dataflow = analyzeObservedFunctionDataflow(sourceFile, node, boundaryModel);
        for (const [field, fieldNode] of dataflow.parser) {
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
        for (const [field, fieldNode] of dataflow.override) {
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
