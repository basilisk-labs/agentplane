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

function controlSiblingOrdinal(node, sourceFile, signature) {
  if (!node.parent) return 1;
  let ordinal = 0;
  let selected = 0;
  ts.forEachChild(node.parent, (candidate) => {
    if (candidate.kind !== node.kind) return;
    const candidateSignature = ts.isIfStatement(candidate)
      ? sha256(normalizedNodeText(sourceFile, candidate.expression)).slice(0, 12)
      : "";
    if (candidateSignature !== signature) return;
    ordinal += 1;
    if (candidate === node) selected = ordinal;
  });
  return selected || 1;
}

function structuralAncestorHierarchy(sourceFile, node) {
  const segments = [];
  const includeControlFlow = ts.isCallExpression(node);
  let child = node;
  let current = node.parent;
  while (current && !ts.isSourceFile(current)) {
    if (includeControlFlow && ts.isIfStatement(current)) {
      const branch =
        current.thenStatement === child
          ? "then"
          : current.elseStatement === child
            ? "else"
            : "condition";
      const condition = sha256(normalizedNodeText(sourceFile, current.expression)).slice(0, 12);
      segments.unshift(
        `IfStatement:${branch}:${condition}:${String(
          controlSiblingOrdinal(current, sourceFile, condition),
        )}`,
      );
    } else if (isHierarchyNode(current)) {
      const kind = ts.SyntaxKind[current.kind] ?? String(current.kind);
      const name = hierarchyNodeName(current);
      segments.unshift(
        `${kind}:${name || "anonymous"}:${String(hierarchySiblingOrdinal(current))}`,
      );
    }
    child = current;
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
  const hierarchy = structuralAncestorHierarchy(sourceFile, node);
  return `ast:${hierarchy}:${kind}:${sha256(normalized).slice(0, 12)}:${String(
    selectedOrdinal || 1,
  )}`;
}

export function staticStringValue(node, constants = new Map()) {
  if (!node) return null;
  if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    return staticStringValue(node.expression, constants);
  }
  if (ts.isIdentifier(node)) return constants.get(node.text) ?? null;
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = staticStringValue(node.left, constants);
    const right = staticStringValue(node.right, constants);
    return left !== null && right !== null ? `${left}${right}` : null;
  }
  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === "join" &&
    ts.isArrayLiteralExpression(node.expression.expression)
  ) {
    const separator =
      node.arguments.length === 0 ? "," : staticStringValue(node.arguments[0], constants);
    if (separator === null) return null;
    const values = node.expression.expression.elements.map((element) =>
      ts.isSpreadElement(element) ? null : staticStringValue(element, constants),
    );
    return values.every((value) => value !== null) ? values.join(separator) : null;
  }
  return null;
}

export function collectStringConstants(node) {
  const constants = new Map();
  const declarations = [];
  const visit = (candidate) => {
    if (
      ts.isVariableDeclaration(candidate) &&
      ts.isIdentifier(candidate.name) &&
      candidate.initializer
    ) {
      declarations.push(candidate);
    }
    ts.forEachChild(candidate, visit);
  };
  visit(node);
  let changed = true;
  for (let pass = 0; pass < declarations.length && changed; pass += 1) {
    changed = false;
    for (const declaration of declarations) {
      const value = staticStringValue(declaration.initializer, constants);
      if (value !== null && constants.get(declaration.name.text) !== value) {
        constants.set(declaration.name.text, value);
        changed = true;
      }
    }
  }
  return constants;
}

export function resolvedPropertyField(node, constants) {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (!ts.isElementAccessExpression(node) || !node.argumentExpression) return null;
  return staticStringValue(node.argumentExpression, constants);
}

export function expressionPath(node, constants) {
  if (ts.isIdentifier(node)) return node.text;
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    return expressionPath(node.expression, constants);
  }
  if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    const parentPath = expressionPath(node.expression, constants);
    const field = resolvedPropertyField(node, constants);
    return parentPath && field ? `${parentPath}.${field}` : null;
  }
  return null;
}
