import { createHash } from "node:crypto";
import path from "node:path";

import ts from "typescript";

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeRepoPath(value) {
  return value.split(path.sep).join("/");
}

export function declarationName(node) {
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

export function nearestSymbol(node) {
  let current = node;
  while (current) {
    const name = declarationName(current);
    if (name) return name;
    current = current.parent;
  }
  return "module";
}

export function nearestFunctionSymbol(node) {
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

export function propertyName(node) {
  const name = node?.name;
  if (name && (ts.isIdentifier(name) || ts.isStringLiteral(name))) return name.text;
  return null;
}

export function lineAndColumn(sourceFile, node) {
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

function hierarchyNodeName(node) {
  const declared = declarationName(node);
  if (declared) return declared;
  if (
    (ts.isMethodDeclaration(node) ||
      ts.isPropertyDeclaration(node) ||
      ts.isPropertySignature(node) ||
      ts.isModuleDeclaration(node)) &&
    node.name
  ) {
    return node.name.getText();
  }
  if (ts.isConstructorDeclaration(node)) return "constructor";
  return "";
}

function hierarchySiblingOrdinal(node) {
  if (!node.parent) return 1;
  const name = hierarchyNodeName(node);
  let ordinal = 0;
  let selected = 0;
  ts.forEachChild(node.parent, (candidate) => {
    if (candidate.kind === node.kind && hierarchyNodeName(candidate) === name) {
      ordinal += 1;
      if (candidate === node) selected = ordinal;
    }
  });
  return selected || 1;
}

function isHierarchyNode(node) {
  return (
    ts.isFunctionLike(node) ||
    ts.isClassDeclaration(node) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isTypeAliasDeclaration(node) ||
    ts.isModuleDeclaration(node) ||
    ts.isVariableDeclaration(node)
  );
}

function structuralAncestorHierarchy(node) {
  const segments = [];
  let current = node.parent;
  while (current && !ts.isSourceFile(current)) {
    if (isHierarchyNode(current)) {
      const kind = ts.SyntaxKind[current.kind] ?? String(current.kind);
      const name = hierarchyNodeName(current);
      segments.unshift(
        `${kind}:${name || "anonymous"}:${String(hierarchySiblingOrdinal(current))}`,
      );
    }
    current = current.parent;
  }
  return segments.join("/") || "module";
}

export function structuralNodeIdentity(sourceFile, node) {
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
  const hierarchy = structuralAncestorHierarchy(node);
  return `ast:${hierarchy}:${kind}:${sha256(normalized).slice(0, 12)}:${String(
    selectedOrdinal || 1,
  )}`;
}

export function collectStringConstants(node) {
  const constants = new Map();
  const visit = (candidate) => {
    if (
      ts.isVariableDeclaration(candidate) &&
      ts.isIdentifier(candidate.name) &&
      candidate.initializer &&
      ts.isStringLiteralLike(candidate.initializer)
    ) {
      constants.set(candidate.name.text, candidate.initializer.text);
    }
    ts.forEachChild(candidate, visit);
  };
  visit(node);
  return constants;
}

export function resolvedPropertyField(node, constants) {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (!ts.isElementAccessExpression(node) || !node.argumentExpression) return null;
  if (ts.isStringLiteralLike(node.argumentExpression)) return node.argumentExpression.text;
  if (ts.isIdentifier(node.argumentExpression)) {
    return constants.get(node.argumentExpression.text) ?? null;
  }
  return null;
}

export function expressionPath(node, constants) {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) {
    return expressionPath(node.expression, constants);
  }
  if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    const parentPath = expressionPath(node.expression, constants);
    const field = resolvedPropertyField(node, constants);
    return parentPath && field ? `${parentPath}.${field}` : null;
  }
  return null;
}
