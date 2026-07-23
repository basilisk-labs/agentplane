import ts from "typescript";

import { normalizeRepoPath, propertyName } from "./trust-boundary-ast.mjs";

function resolveObjectPath(sourceFile, typeNode, pathSegments, typeIndex) {
  if (!typeNode) return null;
  let resolvedType = typeNode;
  let resolvedSourceFile = sourceFile;
  if (
    ts.isTypeReferenceNode(resolvedType) &&
    ts.isIdentifier(resolvedType.typeName) &&
    resolvedType.typeName.text === "Promise" &&
    resolvedType.typeArguments?.length === 1
  ) {
    resolvedType = resolvedType.typeArguments[0];
  }
  for (const segment of pathSegments) {
    const resolution = typeIndex.resolveTypeNode(resolvedSourceFile, resolvedType);
    const candidates = resolution.members.filter(
      ({ member }) => ts.isPropertySignature(member) && propertyName(member) === segment,
    );
    if (candidates.length !== 1 || !candidates[0].member.type) return null;
    resolvedType = candidates[0].member.type;
    resolvedSourceFile = candidates[0].sourceFile;
  }
  return { sourceFile: resolvedSourceFile, typeNode: resolvedType };
}

function functionReturnType(sourceFile, typeNode, typeIndex, seen = new Set()) {
  if (!typeNode) return null;
  if (ts.isParenthesizedTypeNode(typeNode)) {
    return functionReturnType(sourceFile, typeNode.type, typeIndex, seen);
  }
  if (ts.isFunctionTypeNode(typeNode)) return { sourceFile, typeNode: typeNode.type };
  const resolution = typeIndex.resolveTypeNode(sourceFile, typeNode);
  for (const declaration of resolution.declarations ?? []) {
    if (!ts.isTypeAliasDeclaration(declaration.node)) continue;
    const key = `${normalizeRepoPath(declaration.sourceFile.fileName)}#${declaration.node.name.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const resolved = functionReturnType(
      declaration.sourceFile,
      declaration.node.type,
      typeIndex,
      seen,
    );
    if (resolved) return resolved;
  }
  return null;
}

function contextualArrowReturnTypes(sourceFile, arrow, typeIndex) {
  const candidates = [];
  if (arrow.type) candidates.push({ sourceFile, typeNode: arrow.type });
  let expression = arrow;
  let current = arrow.parent;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    if (ts.isAsExpression(current) || ts.isSatisfiesExpression(current)) {
      const contextual = functionReturnType(sourceFile, current.type, typeIndex);
      if (contextual) candidates.push(contextual);
    }
    expression = current;
    current = current.parent;
  }
  if (ts.isVariableDeclaration(current) && current.initializer === expression) {
    const contextual = functionReturnType(sourceFile, current.type, typeIndex);
    if (contextual) candidates.push(contextual);
  }
  return candidates;
}

function expectedObjectTypes(sourceFile, node, typeIndex) {
  const candidates = [];
  const pathSegments = [];
  let expression = node;
  let current = node.parent;
  while (current) {
    if (ts.isParenthesizedExpression(current)) {
      expression = current;
      current = current.parent;
      continue;
    }
    if (ts.isAsExpression(current) || ts.isSatisfiesExpression(current)) {
      const resolved = resolveObjectPath(sourceFile, current.type, pathSegments, typeIndex);
      if (resolved) candidates.push(resolved);
      expression = current;
      current = current.parent;
      continue;
    }
    if (
      ts.isPropertyAssignment(current) &&
      current.initializer === expression &&
      ts.isObjectLiteralExpression(current.parent)
    ) {
      const name = propertyName(current);
      if (!name) return candidates;
      pathSegments.unshift(name);
      expression = current.parent;
      current = expression.parent;
      continue;
    }
    let contexts = [];
    if (ts.isVariableDeclaration(current) && current.initializer === expression) {
      contexts = [{ sourceFile, typeNode: current.type }];
    } else if (ts.isReturnStatement(current)) {
      let owner = current.parent;
      while (owner && !ts.isFunctionLike(owner)) owner = owner.parent;
      contexts = [{ sourceFile, typeNode: owner?.type }];
    } else if (ts.isArrowFunction(current) && current.body === expression) {
      contexts = contextualArrowReturnTypes(sourceFile, current, typeIndex);
    }
    for (const context of contexts) {
      const resolved = resolveObjectPath(
        context.sourceFile,
        context.typeNode,
        pathSegments,
        typeIndex,
      );
      if (resolved) candidates.push(resolved);
    }
    return candidates;
  }
  return candidates;
}

function typeMatchesResolution(typeIndex, sourceFile, typeNode, target) {
  if (!typeNode || !target) return false;
  const resolution = typeIndex.resolveTypeNode(sourceFile, typeNode);
  if (resolution.identity === target.identity) return true;
  const targetKeys = new Set(
    target.declarations.map(
      (entry) => `${normalizeRepoPath(entry.sourceFile.fileName)}#${entry.node.name.text}`,
    ),
  );
  return resolution.declarations.some((entry) =>
    targetKeys.has(`${normalizeRepoPath(entry.sourceFile.fileName)}#${entry.node.name.text}`),
  );
}

export function objectContextMatchesType(sourceFile, node, typeIndex, target) {
  return expectedObjectTypes(sourceFile, node, typeIndex).some((expected) =>
    typeMatchesResolution(typeIndex, expected.sourceFile, expected.typeNode, target),
  );
}
