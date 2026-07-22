import ts from "typescript";

import { expressionPath, propertyName } from "./trust-boundary-ast.mjs";

export function expressionIsTainted(
  node,
  taintedNames,
  taintedPaths,
  constants,
  jsonIsSource,
  jsonParserNames = new Set(),
) {
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
      jsonParserNames,
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
      jsonParserNames,
    );
  }
  if (ts.isCallExpression(node)) {
    if (
      jsonIsSource &&
      (node.expression.getText() === "JSON.parse" ||
        (ts.isIdentifier(node.expression) && jsonParserNames.has(node.expression.text)))
    ) {
      return true;
    }
    return node.arguments.some((argument) =>
      expressionIsTainted(
        argument,
        taintedNames,
        taintedPaths,
        constants,
        jsonIsSource,
        jsonParserNames,
      ),
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
          jsonParserNames,
        );
      }
      if (ts.isPropertyAssignment(property)) {
        return expressionIsTainted(
          property.initializer,
          taintedNames,
          taintedPaths,
          constants,
          jsonIsSource,
          jsonParserNames,
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
      expressionIsTainted(
        child,
        taintedNames,
        taintedPaths,
        constants,
        jsonIsSource,
        jsonParserNames,
      )
    ) {
      tainted = true;
    }
  });
  return tainted;
}

export function expressionIsDirectlyTainted(
  node,
  taintedNames,
  taintedPaths,
  constants,
  jsonIsSource,
  jsonParserNames = new Set(),
) {
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
      jsonParserNames,
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
      jsonParserNames,
    );
  }
  if (ts.isCallExpression(node)) {
    if (
      jsonIsSource &&
      (node.expression.getText() === "JSON.parse" ||
        (ts.isIdentifier(node.expression) && jsonParserNames.has(node.expression.text)))
    ) {
      return true;
    }
    return node.arguments.some((argument) =>
      expressionIsTainted(
        argument,
        taintedNames,
        taintedPaths,
        constants,
        jsonIsSource,
        jsonParserNames,
      ),
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
          jsonParserNames,
        ),
    );
  }
  return false;
}

export function expressionHasManifestSource(node, manifestNames, manifestPaths, constants) {
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

export function bindingIdentifiers(name) {
  if (ts.isIdentifier(name)) return [name.text];
  if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    return name.elements.flatMap((element) =>
      ts.isBindingElement(element) ? bindingIdentifiers(element.name) : [],
    );
  }
  return [];
}

export function collectJsonParserNames(sourceFile, functionNode) {
  const names = new Set();
  let changed = true;
  for (let pass = 0; pass < 12 && changed; pass += 1) {
    changed = false;
    const visit = (node) => {
      if (node !== functionNode && ts.isFunctionLike(node)) return;
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer &&
        (node.initializer.getText() === "JSON.parse" ||
          (ts.isIdentifier(node.initializer) && names.has(node.initializer.text))) &&
        !names.has(node.name.text)
      ) {
        names.add(node.name.text);
        changed = true;
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return names;
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

export function propagateTaint(
  functionNode,
  initialNames,
  taintedPaths,
  constants,
  jsonIsSource,
  jsonParserNames = new Set(),
) {
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
        expressionIsTainted(
          node.initializer,
          taintedNames,
          taintedPaths,
          constants,
          jsonIsSource,
          jsonParserNames,
        )
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
        expressionIsTainted(
          node.right,
          taintedNames,
          taintedPaths,
          constants,
          jsonIsSource,
          jsonParserNames,
        )
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

function isDirectUntrustedInputType(typeNode) {
  if (!typeNode) return false;
  if (
    typeNode.kind === ts.SyntaxKind.UnknownKeyword ||
    typeNode.kind === ts.SyntaxKind.AnyKeyword
  ) {
    return true;
  }
  return /^Record\s*<\s*string\s*,\s*(?:unknown|any)\s*>$/u.test(typeNode.getText());
}

export function isUntrustedInputType(model, sourceFile, typeNode, seen = new Set()) {
  if (!typeNode) return false;
  if (isDirectUntrustedInputType(typeNode)) return true;
  const resolution = model.typeIndex.resolveTypeNode(sourceFile, typeNode);
  for (const declaration of resolution.declarations ?? []) {
    if (!ts.isTypeAliasDeclaration(declaration.node)) continue;
    const key = `${declaration.sourceFile.fileName}#${declaration.node.name.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (isUntrustedInputType(model, declaration.sourceFile, declaration.node.type, seen)) {
      return true;
    }
  }
  return false;
}

export function collectManifestTypedPaths(model, sourceFile, typeNode, prefix, seen = new Set()) {
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
