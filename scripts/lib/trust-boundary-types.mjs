import path from "node:path";

import ts from "typescript";

import { declarationName, normalizeRepoPath } from "./trust-boundary-ast.mjs";

export function typeDeclarationKey(sourceFile, name) {
  return `${normalizeRepoPath(sourceFile.fileName)}#${name}`;
}

export function createTypeDeclarationIndex(sourceFiles) {
  const sourceByPath = new Map(
    sourceFiles.map((sourceFile) => [normalizeRepoPath(sourceFile.fileName), sourceFile]),
  );
  const declarations = new Map();
  const imports = new Map();
  const namespaceImports = new Map();
  const reexports = new Map();
  const starReexports = new Map();
  for (const sourceFile of sourceFiles) {
    const importMap = new Map();
    const namespaceImportMap = new Map();
    const reexportMap = new Map();
    const starModules = [];
    for (const statement of sourceFile.statements) {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteralLike(statement.moduleSpecifier) &&
        statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings)
      ) {
        for (const element of statement.importClause.namedBindings.elements) {
          importMap.set(element.name.text, {
            importedName: element.propertyName?.text ?? element.name.text,
            moduleSpecifier: statement.moduleSpecifier.text,
            node: element,
          });
        }
      }
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteralLike(statement.moduleSpecifier) &&
        statement.importClause?.namedBindings &&
        ts.isNamespaceImport(statement.importClause.namedBindings)
      ) {
        namespaceImportMap.set(statement.importClause.namedBindings.name.text, {
          moduleSpecifier: statement.moduleSpecifier.text,
          node: statement.importClause.namedBindings,
        });
      }
      if (
        ts.isExportDeclaration(statement) &&
        statement.moduleSpecifier &&
        ts.isStringLiteralLike(statement.moduleSpecifier)
      ) {
        if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
          for (const element of statement.exportClause.elements) {
            reexportMap.set(element.name.text, {
              importedName: element.propertyName?.text ?? element.name.text,
              moduleSpecifier: statement.moduleSpecifier.text,
              node: element,
            });
          }
        } else {
          starModules.push(statement.moduleSpecifier.text);
        }
      }
    }
    const sourcePath = normalizeRepoPath(sourceFile.fileName);
    imports.set(sourcePath, importMap);
    namespaceImports.set(sourcePath, namespaceImportMap);
    reexports.set(sourcePath, reexportMap);
    starReexports.set(sourcePath, starModules);
    const visit = (node) => {
      if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        const key = typeDeclarationKey(sourceFile, node.name.text);
        const entries = declarations.get(key) ?? [];
        entries.push({ node, sourceFile });
        declarations.set(key, entries);
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }

  const resolveModule = (sourceFile, moduleSpecifier) => {
    if (!moduleSpecifier.startsWith(".")) return null;
    const sourcePath = normalizeRepoPath(sourceFile.fileName);
    const joined = path.posix.normalize(
      path.posix.join(path.posix.dirname(sourcePath), moduleSpecifier),
    );
    const stem = joined.replace(/\.(?:[cm]?js|tsx?)$/u, "");
    for (const candidate of [`${stem}.ts`, `${stem}.tsx`, `${stem}/index.ts`]) {
      const resolved = sourceByPath.get(candidate);
      if (resolved) return resolved;
    }
    return null;
  };

  const cache = new Map();
  const resolveSymbol = (sourceFile, name, stack = []) => {
    const localKey = typeDeclarationKey(sourceFile, name);
    if (cache.has(localKey)) return cache.get(localKey);
    if (stack.includes(localKey)) {
      return {
        identity: localKey,
        declarations: [],
        members: [],
        diagnostics: [
          {
            code: "cyclic_type_alias",
            message: `cyclic type alias resolution at ${localKey}`,
            node: sourceFile,
            sourceFile,
          },
        ],
      };
    }
    const localDeclarations = declarations.get(localKey) ?? [];
    if (localDeclarations.length > 1) {
      const result = {
        identity: localKey,
        declarations: localDeclarations,
        members: [],
        diagnostics: localDeclarations.map((entry) => ({
          code: "ambiguous_type_declaration",
          message: `ambiguous duplicate type declaration ${localKey}`,
          node: entry.node,
          sourceFile: entry.sourceFile,
        })),
      };
      cache.set(localKey, result);
      return result;
    }
    if (localDeclarations.length === 0) {
      const sourcePath = normalizeRepoPath(sourceFile.fileName);
      const imported = imports.get(sourcePath)?.get(name) ?? reexports.get(sourcePath)?.get(name);
      if (!imported && (starReexports.get(sourcePath)?.length ?? 0) === 0) {
        return {
          identity: localKey,
          declarations: [],
          members: [],
          diagnostics: [
            {
              code: "unresolved_type_reference",
              message: `cannot resolve type ${name} from ${sourceFile.fileName}`,
              node: sourceFile,
              sourceFile,
            },
          ],
        };
      }
      if (!imported) {
        const candidates = (starReexports.get(sourcePath) ?? [])
          .map((moduleSpecifier) => resolveModule(sourceFile, moduleSpecifier))
          .filter(Boolean)
          .map((targetFile) => resolveSymbol(targetFile, name, [...stack, localKey]))
          .filter((resolution) => resolution.declarations.length > 0);
        if (candidates.length === 1) return candidates[0];
        return {
          identity: localKey,
          declarations: [],
          members: [],
          diagnostics: [
            {
              code: candidates.length > 1 ? "ambiguous_star_reexport" : "unresolved_type_reference",
              message: `cannot uniquely resolve re-exported type ${name} from ${sourceFile.fileName}`,
              node: sourceFile,
              sourceFile,
            },
          ],
        };
      }
      const targetFile = resolveModule(sourceFile, imported.moduleSpecifier);
      if (!targetFile) {
        return {
          identity: localKey,
          declarations: [],
          members: [],
          diagnostics: [
            {
              code: "unresolved_imported_type",
              message: `cannot resolve imported type ${name} from ${imported.moduleSpecifier}`,
              node: imported.node,
              sourceFile,
            },
          ],
        };
      }
      return resolveSymbol(targetFile, imported.importedName, [...stack, localKey]);
    }

    const declaration = localDeclarations[0];
    const nextStack = [...stack, localKey];
    const resolvedParts = [];
    const resolveTypeNode = (typeNode) => {
      if (ts.isParenthesizedTypeNode(typeNode)) return resolveTypeNode(typeNode.type);
      if (ts.isTypeLiteralNode(typeNode)) {
        return {
          declarations: [],
          members: [...typeNode.members].map((member) => ({ member, sourceFile })),
          diagnostics: [],
        };
      }
      if (ts.isTypeReferenceNode(typeNode)) {
        if (ts.isIdentifier(typeNode.typeName)) {
          return resolveSymbol(sourceFile, typeNode.typeName.text, nextStack);
        }
        if (ts.isQualifiedName(typeNode.typeName) && ts.isIdentifier(typeNode.typeName.left)) {
          const sourcePath = normalizeRepoPath(sourceFile.fileName);
          const imported = namespaceImports.get(sourcePath)?.get(typeNode.typeName.left.text);
          const targetFile = imported ? resolveModule(sourceFile, imported.moduleSpecifier) : null;
          if (targetFile) {
            return resolveSymbol(targetFile, typeNode.typeName.right.text, nextStack);
          }
          return {
            declarations: [],
            members: [],
            diagnostics: [
              {
                code: "unresolved_namespace_type",
                message: `cannot resolve namespace type ${typeNode.typeName.getText()} from ${sourceFile.fileName}`,
                node: typeNode,
                sourceFile,
              },
            ],
          };
        }
      }
      if (ts.isIntersectionTypeNode(typeNode)) {
        const parts = typeNode.types.map((candidate) => resolveTypeNode(candidate));
        return {
          declarations: parts.flatMap((part) => part.declarations ?? []),
          members: parts.flatMap((part) => part.members ?? []),
          diagnostics: parts.flatMap((part) => part.diagnostics ?? []),
        };
      }
      return {
        declarations: [],
        members: [],
        diagnostics: [
          {
            code: "unsupported_type_alias",
            message: `cannot structurally resolve ${localKey} through ${typeNode.getText()}`,
            node: typeNode,
            sourceFile,
          },
        ],
      };
    };

    if (ts.isInterfaceDeclaration(declaration.node)) {
      for (const heritage of declaration.node.heritageClauses ?? []) {
        if (heritage.token !== ts.SyntaxKind.ExtendsKeyword) continue;
        for (const heritageType of heritage.types) {
          if (ts.isIdentifier(heritageType.expression)) {
            resolvedParts.push(resolveSymbol(sourceFile, heritageType.expression.text, nextStack));
          } else {
            resolvedParts.push({
              declarations: [],
              members: [],
              diagnostics: [
                {
                  code: "unsupported_interface_heritage",
                  message: `cannot resolve interface heritage ${heritageType.expression.getText()}`,
                  node: heritageType,
                  sourceFile,
                },
              ],
            });
          }
        }
      }
      resolvedParts.push({
        declarations: [declaration],
        members: [...declaration.node.members].map((member) => ({ member, sourceFile })),
        diagnostics: [],
      });
    } else {
      resolvedParts.push(resolveTypeNode(declaration.node.type), {
        declarations: [declaration],
        members: [],
        diagnostics: [],
      });
    }
    const result = {
      identity: localKey,
      declarations: resolvedParts.flatMap((part) => part.declarations ?? []),
      members: resolvedParts.flatMap((part) => part.members ?? []),
      diagnostics: resolvedParts.flatMap((part) => part.diagnostics ?? []),
    };
    cache.set(localKey, result);
    return result;
  };

  const canonical = (pathSuffix, name) => {
    const canonicalPath = pathSuffix.startsWith("/")
      ? `packages/agentplane/src${pathSuffix}`
      : normalizeRepoPath(pathSuffix);
    const matches = sourceFiles.filter(
      (sourceFile) => normalizeRepoPath(sourceFile.fileName) === canonicalPath,
    );
    if (matches.length !== 1) return null;
    return resolveSymbol(matches[0], name);
  };

  const resolveTypeNode = (sourceFile, typeNode) => {
    if (!typeNode) return { declarations: [], members: [], diagnostics: [] };
    if (ts.isParenthesizedTypeNode(typeNode)) return resolveTypeNode(sourceFile, typeNode.type);
    if (ts.isTypeLiteralNode(typeNode)) {
      return {
        declarations: [],
        members: [...typeNode.members].map((member) => ({ member, sourceFile })),
        diagnostics: [],
      };
    }
    if (ts.isTypeReferenceNode(typeNode)) {
      if (ts.isIdentifier(typeNode.typeName)) {
        return resolveSymbol(sourceFile, typeNode.typeName.text);
      }
      if (ts.isQualifiedName(typeNode.typeName) && ts.isIdentifier(typeNode.typeName.left)) {
        const sourcePath = normalizeRepoPath(sourceFile.fileName);
        const imported = namespaceImports.get(sourcePath)?.get(typeNode.typeName.left.text);
        const targetFile = imported ? resolveModule(sourceFile, imported.moduleSpecifier) : null;
        if (targetFile) return resolveSymbol(targetFile, typeNode.typeName.right.text);
      }
    }
    if (ts.isIntersectionTypeNode(typeNode) || ts.isUnionTypeNode(typeNode)) {
      const parts = typeNode.types.map((candidate) => resolveTypeNode(sourceFile, candidate));
      return {
        declarations: parts.flatMap((part) => part.declarations ?? []),
        members: parts.flatMap((part) => part.members ?? []),
        diagnostics: parts.flatMap((part) => part.diagnostics ?? []),
      };
    }
    return { declarations: [], members: [], diagnostics: [] };
  };

  return {
    canonical,
    declarations,
    imports,
    namespaceImports,
    reexports,
    resolveModule,
    resolveSymbol,
    resolveTypeNode,
    sourceByPath,
  };
}

function resolutionDeclarationKeys(resolution) {
  return new Set(
    (resolution?.declarations ?? []).map((entry) =>
      typeDeclarationKey(entry.sourceFile, entry.node.name.text),
    ),
  );
}

function typeNodeReferencesResolution(typeIndex, sourceFile, typeNode, target) {
  if (!typeNode || !target) return false;
  if (ts.isTypeLiteralNode(typeNode) || ts.isFunctionTypeNode(typeNode)) return false;
  if (ts.isTypeReferenceNode(typeNode)) {
    const resolved = typeIndex.resolveTypeNode(sourceFile, typeNode);
    const targetKeys = resolutionDeclarationKeys(target);
    if (
      resolved.identity === target.identity ||
      [...resolutionDeclarationKeys(resolved)].some((key) => targetKeys.has(key))
    ) {
      return true;
    }
  }
  let matched = false;
  ts.forEachChild(typeNode, (child) => {
    if (!matched && ts.isTypeNode(child)) {
      matched = typeNodeReferencesResolution(typeIndex, sourceFile, child, target);
    }
  });
  return matched;
}

function directFunctionName(node) {
  const declared = declarationName(node);
  if (declared) return declared;
  if (ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) {
    return node.parent.name.text;
  }
  return null;
}

function observedFunctionKey(sourceFile, name) {
  return `${normalizeRepoPath(sourceFile.fileName)}#${name}`;
}

export function createObservedBoundaryModel(sourceFiles, typeIndex) {
  const targets = {
    evidence: typeIndex.canonical("/runner/types/invocation.ts", "RunnerResultEvidence"),
    manifest: typeIndex.canonical("/runner/types/invocation.ts", "RunnerResultManifest"),
    metrics: typeIndex.canonical("/runner/types/invocation.ts", "RunnerExecutionMetrics"),
    result: typeIndex.canonical("/runner/types/invocation.ts", "RunnerResult"),
  };
  const functionKinds = new Map();
  const functionNodes = new Map();
  const directKindsForType = (sourceFile, typeNode) =>
    new Set(
      Object.entries(targets)
        .filter(([, target]) =>
          typeNodeReferencesResolution(typeIndex, sourceFile, typeNode, target),
        )
        .map(([kind]) => kind),
    );
  const functionSignatureForType = (sourceFile, typeNode, seen = new Set()) => {
    if (!typeNode) return null;
    if (ts.isParenthesizedTypeNode(typeNode)) {
      return functionSignatureForType(sourceFile, typeNode.type, seen);
    }
    if (ts.isFunctionTypeNode(typeNode)) return { node: typeNode, sourceFile };
    const resolution = typeIndex.resolveTypeNode(sourceFile, typeNode);
    for (const declaration of resolution.declarations ?? []) {
      const key = typeDeclarationKey(declaration.sourceFile, declaration.node.name.text);
      if (seen.has(key) || !ts.isTypeAliasDeclaration(declaration.node)) continue;
      seen.add(key);
      const signature = functionSignatureForType(
        declaration.sourceFile,
        declaration.node.type,
        seen,
      );
      if (signature) return signature;
    }
    return null;
  };
  const contextualSignature = (sourceFile, functionNode) => {
    const parent = functionNode.parent;
    if (ts.isVariableDeclaration(parent) && parent.initializer === functionNode && parent.type) {
      return functionSignatureForType(sourceFile, parent.type);
    }
    return null;
  };
  const functionReturnType = (sourceFile, functionNode) => {
    if (functionNode.type) return { sourceFile, type: functionNode.type };
    const contextual = contextualSignature(sourceFile, functionNode);
    return contextual ? { sourceFile: contextual.sourceFile, type: contextual.node.type } : null;
  };
  const parameterType = (sourceFile, functionNode, parameter, index) => {
    if (parameter.type) return { sourceFile, type: parameter.type };
    const contextual = contextualSignature(sourceFile, functionNode);
    const contextualParameter = contextual?.node.parameters[index];
    return contextualParameter?.type
      ? { sourceFile: contextual.sourceFile, type: contextualParameter.type }
      : null;
  };
  for (const sourceFile of sourceFiles) {
    const visit = (node) => {
      if (ts.isFunctionLike(node) && node.body) {
        const name = directFunctionName(node);
        if (name) {
          const key = observedFunctionKey(sourceFile, name);
          functionNodes.set(key, node);
          const returnType = functionReturnType(sourceFile, node);
          functionKinds.set(
            key,
            returnType ? directKindsForType(returnType.sourceFile, returnType.type) : new Set(),
          );
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  const resolveFunctionKey = (sourceFile, name) => {
    const localKey = observedFunctionKey(sourceFile, name);
    if (functionNodes.has(localKey)) return localKey;
    const imported = typeIndex.imports.get(normalizeRepoPath(sourceFile.fileName))?.get(name);
    if (!imported) return null;
    const targetFile = typeIndex.resolveModule(sourceFile, imported.moduleSpecifier);
    return targetFile ? observedFunctionKey(targetFile, imported.importedName) : null;
  };
  const kindsForType = (sourceFile, typeNode) => {
    const kinds = directKindsForType(sourceFile, typeNode);
    if (typeNode && ts.isTypeLiteralNode(typeNode)) return kinds;
    const visit = (node) => {
      if (ts.isTypeQueryNode(node) && ts.isIdentifier(node.exprName)) {
        const functionKey = resolveFunctionKey(sourceFile, node.exprName.text);
        for (const kind of functionKinds.get(functionKey) ?? []) kinds.add(kind);
      }
      ts.forEachChild(node, visit);
    };
    if (typeNode) visit(typeNode);
    return kinds;
  };
  const kindsForFunction = (sourceFile, functionNode) => {
    const name = directFunctionName(functionNode);
    if (name) {
      return new Set(functionKinds.get(observedFunctionKey(sourceFile, name)));
    }
    const returnType = functionReturnType(sourceFile, functionNode);
    return returnType ? kindsForType(returnType.sourceFile, returnType.type) : new Set();
  };
  return {
    functionKinds,
    kindsForFunction,
    kindsForType,
    parameterType,
    targets,
    typeIndex,
  };
}
