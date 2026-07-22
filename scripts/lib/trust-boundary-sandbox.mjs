import ts from "typescript";

import {
  collectStringConstants,
  expressionPath,
  nearestSymbol,
  propertyName,
} from "./trust-boundary-ast.mjs";

function enclosingIfBranch(statement) {
  let current = statement;
  while (current.parent && ts.isBlock(current.parent)) current = current.parent;
  const parent = current.parent;
  if (!parent || !ts.isIfStatement(parent)) return null;
  if (parent.thenStatement === current) return { condition: parent.expression, whenTrue: true };
  if (parent.elseStatement === current) return { condition: parent.expression, whenTrue: false };
  return null;
}

function containingFunction(node) {
  let current = node.parent;
  while (current) {
    if (ts.isFunctionLike(current)) return current;
    current = current.parent;
  }
  return null;
}

function authorityBinding(functionNode, name) {
  for (const parameter of functionNode?.parameters ?? []) {
    if (ts.isIdentifier(parameter.name) && parameter.name.text === name) {
      return { initializer: null, type: parameter.type };
    }
  }
  let found = null;
  const visit = (node) => {
    if (found || (node !== functionNode && ts.isFunctionLike(node))) return;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      found = { initializer: node.initializer ?? null, type: node.type };
      return;
    }
    ts.forEachChild(node, visit);
  };
  if (functionNode?.body) visit(functionNode.body);
  return found;
}

function booleanAuthorityPath(typeIndex, sourceFile, typeNode, pathSegments) {
  let currentType = typeNode;
  let currentSourceFile = sourceFile;
  for (const segment of pathSegments) {
    const resolution = typeIndex.resolveTypeNode(currentSourceFile, currentType);
    const candidates = resolution.members.filter(
      ({ member }) => ts.isPropertySignature(member) && propertyName(member) === segment,
    );
    if (candidates.length !== 1) return false;
    currentType = candidates[0].member.type;
    currentSourceFile = candidates[0].sourceFile;
  }
  return currentType?.kind === ts.SyntaxKind.BooleanKeyword;
}

function expressionHasAuthorityProvenance(sourceFile, expression, typeIndex, seen = new Set()) {
  const constants = collectStringConstants(sourceFile);
  const renderedPath = expressionPath(expression, constants);
  if (!renderedPath) return false;
  const [root, ...segments] = renderedPath.split(".");
  const functionNode = containingFunction(expression);
  const binding = authorityBinding(functionNode, root);
  if (!binding || seen.has(root)) return false;
  seen.add(root);
  if (segments.length === 0 && binding.initializer) {
    return expressionHasAuthorityProvenance(sourceFile, binding.initializer, typeIndex, seen);
  }
  if (!binding.type || segments.length === 0) return false;
  const semanticPath = `${binding.type.getText()} ${root} ${segments.join(" ")}`;
  const explicitAuthority = /(?:authorit|approval|permission|grant)/iu.test(semanticPath);
  const dangerScope = /(?:danger|sandbox|full[_-]?access)/iu.test(semanticPath);
  const positiveGrant = /(?:approved|authorized|allowed|granted|permit)/iu.test(semanticPath);
  return (
    explicitAuthority &&
    dangerScope &&
    positiveGrant &&
    booleanAuthorityPath(typeIndex, sourceFile, binding.type, segments)
  );
}

function conditionAuthorizesDanger(sourceFile, condition, dangerWhenTrue, typeIndex) {
  if (ts.isParenthesizedExpression(condition)) {
    return conditionAuthorizesDanger(sourceFile, condition.expression, dangerWhenTrue, typeIndex);
  }
  if (
    ts.isPrefixUnaryExpression(condition) &&
    condition.operator === ts.SyntaxKind.ExclamationToken
  ) {
    return conditionAuthorizesDanger(sourceFile, condition.operand, !dangerWhenTrue, typeIndex);
  }
  if (
    ts.isCallExpression(condition) &&
    ts.isIdentifier(condition.expression) &&
    condition.expression.text === "Boolean" &&
    condition.arguments.length === 1
  ) {
    return conditionAuthorizesDanger(sourceFile, condition.arguments[0], dangerWhenTrue, typeIndex);
  }
  if (ts.isBinaryExpression(condition)) {
    const operator = condition.operatorToken.kind;
    const booleanSide =
      condition.right.kind === ts.SyntaxKind.TrueKeyword ||
      condition.right.kind === ts.SyntaxKind.FalseKeyword
        ? condition.right
        : condition.left.kind === ts.SyntaxKind.TrueKeyword ||
            condition.left.kind === ts.SyntaxKind.FalseKeyword
          ? condition.left
          : null;
    const valueSide = booleanSide === condition.right ? condition.left : condition.right;
    if (booleanSide) {
      const literalValue = booleanSide.kind === ts.SyntaxKind.TrueKeyword;
      const equality =
        operator === ts.SyntaxKind.EqualsEqualsToken ||
        operator === ts.SyntaxKind.EqualsEqualsEqualsToken;
      const inequality =
        operator === ts.SyntaxKind.ExclamationEqualsToken ||
        operator === ts.SyntaxKind.ExclamationEqualsEqualsToken;
      if (equality || inequality) {
        const requiredValue = inequality ? !dangerWhenTrue : dangerWhenTrue;
        return (
          requiredValue === literalValue &&
          expressionHasAuthorityProvenance(sourceFile, valueSide, typeIndex)
        );
      }
    }
  }
  return dangerWhenTrue && expressionHasAuthorityProvenance(sourceFile, condition, typeIndex);
}

function statementAlwaysExits(statement) {
  if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) return true;
  return ts.isBlock(statement) && statement.statements.some((child) => statementAlwaysExits(child));
}

function precedingGuardAuthorizesDanger(sourceFile, returnStatement, typeIndex) {
  const block = returnStatement.parent;
  if (!ts.isBlock(block)) return false;
  const index = block.statements.indexOf(returnStatement);
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const statement = block.statements[cursor];
    if (!ts.isIfStatement(statement) || statement.elseStatement) continue;
    if (!statementAlwaysExits(statement.thenStatement)) continue;
    return conditionAuthorizesDanger(sourceFile, statement.expression, false, typeIndex);
  }
  return false;
}

function dangerLiteralIsVocabulary(node) {
  let current = node.parent;
  while (current && !ts.isStatement(current)) {
    if (ts.isArrayLiteralExpression(current)) {
      const setExpression = current.parent;
      const declaration = setExpression?.parent;
      return Boolean(
        ts.isNewExpression(setExpression) &&
        setExpression.expression.getText() === "Set" &&
        ts.isVariableDeclaration(declaration) &&
        ts.isIdentifier(declaration.name) &&
        /(?:sandbox.*values|allowed.*sandbox)/iu.test(declaration.name.text),
      );
    }
    current = current.parent;
  }
  return false;
}

function isImplicitDangerLiteral(sourceFile, node, typeIndex) {
  if (!ts.isStringLiteralLike(node) || node.text !== "danger-full-access") return false;
  if (dangerLiteralIsVocabulary(node)) return false;
  let parent = node.parent;
  while (
    ts.isParenthesizedExpression(parent) ||
    ts.isAsExpression(parent) ||
    ts.isSatisfiesExpression(parent)
  ) {
    parent = parent.parent;
  }
  if (ts.isBinaryExpression(parent) && parent.right === node) return true;
  if (ts.isParameter(parent) && parent.initializer === node) return true;
  if (ts.isConditionalExpression(parent)) {
    return !conditionAuthorizesDanger(
      sourceFile,
      parent.condition,
      parent.whenTrue === node,
      typeIndex,
    );
  }
  if (!ts.isReturnStatement(parent)) return true;
  const branch = enclosingIfBranch(parent);
  if (branch) {
    return !conditionAuthorizesDanger(sourceFile, branch.condition, branch.whenTrue, typeIndex);
  }
  return !precedingGuardAuthorizesDanger(sourceFile, parent, typeIndex);
}

export function collectImplicitDangerSandboxes(sourceFiles, typeIndex, makeViolation) {
  const ruleId = "trust.no-implicit-danger-sandbox";
  const violations = [];
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (isImplicitDangerLiteral(sourceFile, node, typeIndex)) {
        violations.push(
          makeViolation(
            ruleId,
            sourceFile,
            node,
            `fallback:${nearestSymbol(node)}:danger-full-access`,
            "danger-full-access is reachable without typed explicit authority",
          ),
        );
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  return violations;
}
