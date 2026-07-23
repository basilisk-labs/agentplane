import ts from "typescript";

import {
  collectStringConstants,
  declarationName,
  expressionPath,
  nearestSymbol,
  propertyName,
  resolvedPropertyField,
} from "./trust-boundary-ast.mjs";
import {
  bindingIdentifiers,
  collectJsonParserNames,
  collectManifestTypedPaths,
  expressionHasManifestSource,
  expressionIsDirectlyTainted,
  expressionIsTainted,
  isUntrustedInputType,
  propagateTaint,
} from "./trust-boundary-observed-taint.mjs";
import { createObservedBoundaryModel } from "./trust-boundary-types.mjs";

const OBSERVED_DIRECT_FIELDS = new Set(["status", "exit_code", "timeout_reason", "artifacts"]);
const OBSERVED_NESTED_FIELDS = new Map([
  [
    "metrics",
    new Set(["duration_ms", "stdout_bytes", "stderr_bytes", "output_last_message_bytes"]),
  ],
  ["evidence", new Set(["evidence_paths", "changed_paths", "files_changed_count", "tests_run"])],
]);
const OBSERVED_NESTED_LEAF_FIELDS = new Set(
  [...OBSERVED_NESTED_FIELDS.values()].flatMap((fields) => [...fields]),
);

function functionName(node) {
  return declarationName(node) ?? nearestSymbol(node);
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

function unwrapExpressionParent(node) {
  let expression = node;
  let current = node.parent;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isNonNullExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    expression = current;
    current = current.parent;
  }
  return { expression, parent: current };
}

function expressionIsResultSink(node, sourceFile, functionKinds, model, resultSinkNames) {
  const { expression, parent: current } = unwrapExpressionParent(node);
  if (ts.isReturnStatement(current)) return functionKinds.has("result");
  if (ts.isArrowFunction(current) && current.body === expression)
    return functionKinds.has("result");
  if (ts.isVariableDeclaration(current) && current.initializer === expression) {
    return (
      model.kindsForType(sourceFile, current.type).has("result") ||
      (ts.isIdentifier(current.name) && resultSinkNames.has(current.name.text))
    );
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

function expressionParserFields(node, sourceFile, functionKinds, model, parserSinkFieldsByName) {
  const { expression, parent: current } = unwrapExpressionParent(node);
  if (ts.isReturnStatement(current)) return observedFieldsForKinds(functionKinds);
  if (ts.isArrowFunction(current) && current.body === expression)
    return observedFieldsForKinds(functionKinds);
  if (ts.isVariableDeclaration(current) && current.initializer === expression) {
    const explicit = observedFieldsForKinds(model.kindsForType(sourceFile, current.type));
    if (explicit.size > 0) return explicit;
    if (ts.isIdentifier(current.name)) {
      return parserSinkFieldsByName.get(current.name.text) ?? new Set();
    }
  }
  return new Set();
}

function parserValueIsAccepted(value, parserNames, constants, jsonParserNames, directOnly = false) {
  const predicate = directOnly ? expressionIsDirectlyTainted : expressionIsTainted;
  return predicate(value, parserNames, new Set(), constants, true, jsonParserNames);
}

function parserObservedPaths(field, value, parserNames, constants, jsonParserNames) {
  if (OBSERVED_NESTED_LEAF_FIELDS.has(field)) {
    return parserValueIsAccepted(value, parserNames, constants, jsonParserNames) ? [field] : [];
  }
  if (OBSERVED_DIRECT_FIELDS.has(field) && field !== "artifacts") {
    return parserValueIsAccepted(value, parserNames, constants, jsonParserNames) ? [field] : [];
  }
  if (field === "artifacts") {
    return parserValueIsAccepted(value, parserNames, constants, jsonParserNames) ? [field] : [];
  }
  const nestedFields = OBSERVED_NESTED_FIELDS.get(field);
  if (!nestedFields) return [];
  if (!ts.isObjectLiteralExpression(value)) {
    return parserValueIsAccepted(value, parserNames, constants, jsonParserNames, true)
      ? [field]
      : [];
  }
  const paths = [];
  for (const property of value.properties) {
    if (
      ts.isSpreadAssignment(property) &&
      parserValueIsAccepted(property.expression, parserNames, constants, jsonParserNames, true)
    ) {
      paths.push(field);
      continue;
    }
    if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) {
      continue;
    }
    const nestedField = declaredPropertyField(property, constants);
    if (!nestedField || !nestedFields.has(nestedField)) continue;
    const nestedValue = ts.isPropertyAssignment(property) ? property.initializer : property.name;
    if (parserValueIsAccepted(nestedValue, parserNames, constants, jsonParserNames)) {
      paths.push(`${field}.${nestedField}`);
    }
  }
  return paths;
}

function observedTargetPath(node, constants) {
  const path = expressionPath(node, constants);
  if (!path) return null;
  const [, field, nestedField] = path.split(".");
  if (!field) return null;
  if (OBSERVED_DIRECT_FIELDS.has(field)) return field;
  const nested = OBSERVED_NESTED_FIELDS.get(field);
  return nestedField && nested?.has(nestedField) ? `${field}.${nestedField}` : null;
}

function manifestObservedPaths(source, manifestNames, manifestPaths, constants) {
  if (ts.isObjectLiteralExpression(source)) {
    const paths = [];
    for (const property of source.properties) {
      if (
        ts.isSpreadAssignment(property) &&
        expressionHasManifestSource(property.expression, manifestNames, manifestPaths, constants)
      ) {
        paths.push("spread");
        continue;
      }
      if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) {
        continue;
      }
      const field = declaredPropertyField(property, constants);
      const value = ts.isPropertyAssignment(property) ? property.initializer : property.name;
      if (
        field &&
        (OBSERVED_DIRECT_FIELDS.has(field) || OBSERVED_NESTED_FIELDS.has(field)) &&
        expressionHasManifestSource(value, manifestNames, manifestPaths, constants)
      ) {
        paths.push(field);
      }
    }
    return paths;
  }
  const sourcePath = expressionPath(source, constants);
  if (sourcePath && (manifestNames.has(sourcePath) || manifestPaths.has(sourcePath))) {
    return ["assign"];
  }
  if (!sourcePath && expressionHasManifestSource(source, manifestNames, manifestPaths, constants)) {
    return ["assign"];
  }
  return [];
}

function returnedIdentifier(node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isNonNullExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    current = current.expression;
  }
  return ts.isIdentifier(current) ? current.text : null;
}

function collectReturnedSinkNames(functionNode, enabled) {
  const names = new Set();
  if (!enabled) return names;
  const visit = (node) => {
    if (node !== functionNode && ts.isFunctionLike(node)) return;
    if (ts.isReturnStatement(node) && node.expression) {
      const name = returnedIdentifier(node.expression);
      if (name) names.add(name);
    }
    ts.forEachChild(node, visit);
  };
  if (functionNode.body) visit(functionNode.body);
  return names;
}

function rootExpressionName(node) {
  let current = node;
  while (!ts.isIdentifier(current)) {
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isNonNullExpression(current) ||
      ts.isSatisfiesExpression(current)
    ) {
      current = current.expression;
      continue;
    }
    return "";
  }
  return current.text;
}

function analyzeObservedFunctionDataflow(sourceFile, functionNode, model) {
  const constants = collectStringConstants(sourceFile);
  const functionKinds = model.kindsForFunction(sourceFile, functionNode);
  const jsonParserNames = collectJsonParserNames(sourceFile, functionNode);
  const parserInitial = new Set();
  const manifestInitial = new Set();
  const manifestPaths = new Set();
  for (const [index, parameter] of (functionNode.parameters ?? []).entries()) {
    const effectiveType = model.parameterType(sourceFile, functionNode, parameter, index);
    if (
      effectiveType &&
      isUntrustedInputType(model, effectiveType.sourceFile, effectiveType.type)
    ) {
      for (const name of bindingIdentifiers(parameter.name)) parserInitial.add(name);
    }
    const parameterKinds = effectiveType
      ? model.kindsForType(effectiveType.sourceFile, effectiveType.type)
      : new Set();
    if (parameterKinds.has("manifest")) {
      for (const name of bindingIdentifiers(parameter.name)) manifestInitial.add(name);
    }
    if (effectiveType && ts.isIdentifier(parameter.name)) {
      for (const sourcePath of collectManifestTypedPaths(
        model,
        effectiveType.sourceFile,
        effectiveType.type,
        parameter.name.text,
      )) {
        manifestPaths.add(sourcePath);
      }
    }
  }
  const parserNames = propagateTaint(
    functionNode,
    parserInitial,
    new Set(),
    constants,
    true,
    jsonParserNames,
  );
  const manifestNames = propagateTaint(
    functionNode,
    manifestInitial,
    manifestPaths,
    constants,
    false,
  );
  const returnedParserNames = collectReturnedSinkNames(
    functionNode,
    observedFieldsForKinds(functionKinds).size > 0,
  );
  const resultSinkNames = collectReturnedSinkNames(functionNode, functionKinds.has("result"));
  const parserSinkFieldsByName = new Map();
  for (const name of returnedParserNames) {
    parserSinkFieldsByName.set(name, observedFieldsForKinds(functionKinds));
  }
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
      if (field && sinkFields.has(field)) {
        for (const observedPath of parserObservedPaths(
          field,
          node.right,
          parserNames,
          constants,
          jsonParserNames,
        )) {
          if (!parser.has(observedPath)) parser.set(observedPath, node);
        }
      }
      if (resultSinkNames.has(targetName)) {
        const targetPath = observedTargetPath(node.left, constants);
        if (
          targetPath &&
          parserValueIsAccepted(node.right, parserNames, constants, jsonParserNames) &&
          !parser.has(targetPath)
        ) {
          parser.set(targetPath, node);
        }
      }
    }
    if (ts.isObjectLiteralExpression(node)) {
      const sinkFields = expressionParserFields(
        node,
        sourceFile,
        functionKinds,
        model,
        parserSinkFieldsByName,
      );
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
            jsonParserNames,
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
        if (field && sinkFields.has(field)) {
          for (const observedPath of parserObservedPaths(
            field,
            value,
            parserNames,
            constants,
            jsonParserNames,
          )) {
            if (!parser.has(observedPath)) parser.set(observedPath, property);
          }
        }
      }
    }
    if (
      ts.isObjectLiteralExpression(node) &&
      expressionIsResultSink(node, sourceFile, functionKinds, model, resultSinkNames)
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
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === "Object" &&
      node.expression.name.text === "assign"
    ) {
      const receiverName = node.arguments[0] ? rootExpressionName(node.arguments[0]) : "";
      const writesResult =
        resultSinkNames.has(receiverName) ||
        expressionIsResultSink(node, sourceFile, functionKinds, model, resultSinkNames);
      const assignedObservedPaths = writesResult
        ? node.arguments
            .slice(1)
            .flatMap((argument) =>
              manifestObservedPaths(argument, manifestNames, manifestPaths, constants),
            )
        : [];
      if (assignedObservedPaths.length > 0 && !override.has("assign")) {
        override.set("assign", node);
      }
      const parserFields = expressionParserFields(
        node,
        sourceFile,
        functionKinds,
        model,
        parserSinkFieldsByName,
      );
      if (
        parserFields.size > 0 &&
        node.arguments.some((argument) =>
          expressionIsDirectlyTainted(
            argument,
            parserNames,
            new Set(),
            constants,
            true,
            jsonParserNames,
          ),
        ) &&
        !parser.has("assign")
      ) {
        parser.set("assign", node);
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
