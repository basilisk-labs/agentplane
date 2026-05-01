import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { inspect } from "node:util";

const EXAMPLE_ROUTES = [
  ["config.json", "config.schema.json"],
  ["pr-meta.json", "pr-meta.schema.json"],
  ["task-handoff.json", "task-handoff.schema.json"],
  ["task-readme-frontmatter.json", "task-readme-frontmatter.schema.json"],
  ["tasks.json", "tasks-export.schema.json"],
];

const repoRoot = process.cwd();
const examplesDir = path.join(repoRoot, "packages", "spec", "examples");
const generatedSchemasDir = path.join(repoRoot, "packages", "core", "schemas");

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to parse ${path.relative(repoRoot, filePath)}: ${error.message}`);
  }
}

function jsonPath(parent, key) {
  if (typeof key === "number") return `${parent}[${key}]`;
  if (/^[A-Za-z_$][\w$]*$/u.test(key)) return `${parent}.${key}`;
  return `${parent}[${JSON.stringify(key)}]`;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function valueType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (Number.isInteger(value)) return "integer";
  return typeof value;
}

function matchesType(value, expected) {
  if (expected === "null") return value === null;
  if (expected === "array") return Array.isArray(value);
  if (expected === "object") return isObject(value);
  if (expected === "integer") return Number.isInteger(value);
  if (expected === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === expected;
}

function formatExpected(values) {
  return values.map((value) => inspect(value, { breakLength: Infinity })).join(" | ");
}

function validateSchema(schema, value, location, errors) {
  if (schema === true) return;
  if (schema === false) {
    errors.push(`${location}: schema explicitly rejects this value`);
    return;
  }
  if (!isObject(schema)) {
    errors.push(`${location}: unsupported schema node ${inspect(schema)}`);
    return;
  }

  if (Array.isArray(schema.anyOf)) {
    const branchErrors = [];
    for (const branch of schema.anyOf) {
      const nextErrors = [];
      validateSchema(branch, value, location, nextErrors);
      if (nextErrors.length === 0) return;
      branchErrors.push(nextErrors);
    }
    errors.push(`${location}: did not match any allowed schema branch`);
    if (branchErrors[0]?.[0]) errors.push(`  first branch: ${branchErrors[0][0]}`);
    return;
  }

  if (Object.hasOwn(schema, "const") && value !== schema.const) {
    errors.push(`${location}: expected const ${inspect(schema.const)}, got ${inspect(value)}`);
    return;
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(
      `${location}: expected one of ${formatExpected(schema.enum)}, got ${inspect(value)}`,
    );
    return;
  }

  if (Object.hasOwn(schema, "type")) {
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!expectedTypes.some((type) => matchesType(value, type))) {
      errors.push(
        `${location}: expected ${expectedTypes.join(" | ")}, got ${valueType(value)} (${inspect(value)})`,
      );
      return;
    }
  }

  if (typeof value === "string") {
    if (typeof schema.minLength === "number" && value.length < schema.minLength) {
      errors.push(`${location}: expected string length >= ${schema.minLength}`);
    }
    if (schema.format === "date-time" && Number.isNaN(Date.parse(value))) {
      errors.push(`${location}: expected date-time string, got ${inspect(value)}`);
    }
  }

  if (typeof value === "number") {
    if (typeof schema.minimum === "number" && value < schema.minimum) {
      errors.push(`${location}: expected number >= ${schema.minimum}`);
    }
    if (typeof schema.maximum === "number" && value > schema.maximum) {
      errors.push(`${location}: expected number <= ${schema.maximum}`);
    }
  }

  if (Array.isArray(value)) {
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(`${location}: expected at least ${schema.minItems} item(s)`);
    }
    if (schema.items) {
      for (const [index, item] of value.entries()) {
        validateSchema(schema.items, item, jsonPath(location, index), errors);
      }
    }
  }

  if (isObject(value)) {
    const properties = isObject(schema.properties) ? schema.properties : {};
    for (const requiredKey of Array.isArray(schema.required) ? schema.required : []) {
      if (!Object.hasOwn(value, requiredKey)) {
        errors.push(`${jsonPath(location, requiredKey)}: missing required field`);
      }
    }
    for (const [key, item] of Object.entries(value)) {
      if (Object.hasOwn(properties, key)) {
        validateSchema(properties[key], item, jsonPath(location, key), errors);
        continue;
      }
      if (schema.additionalProperties === false) {
        errors.push(`${jsonPath(location, key)}: unexpected field`);
      } else if (isObject(schema.additionalProperties)) {
        validateSchema(schema.additionalProperties, item, jsonPath(location, key), errors);
      }
    }
  }
}

function verifyRouteCoverage() {
  const exampleNames = readdirSync(examplesDir)
    .filter((name) => name.endsWith(".json"))
    .toSorted();
  const routedNames = EXAMPLE_ROUTES.map(([exampleName]) => exampleName).toSorted();
  const missingRoutes = exampleNames.filter((name) => !routedNames.includes(name));
  const staleRoutes = routedNames.filter((name) => !exampleNames.includes(name));
  if (missingRoutes.length > 0 || staleRoutes.length > 0) {
    throw new Error(
      [
        "Spec example route table is out of date.",
        missingRoutes.length > 0 ? `Missing routes: ${missingRoutes.join(", ")}` : null,
        staleRoutes.length > 0 ? `Stale routes: ${staleRoutes.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
}

function main() {
  verifyRouteCoverage();
  const failures = [];

  for (const [exampleName, schemaName] of EXAMPLE_ROUTES) {
    const examplePath = path.join(examplesDir, exampleName);
    const schemaPath = path.join(generatedSchemasDir, schemaName);
    const schema = readJson(schemaPath);
    const value = readJson(examplePath);
    const errors = [];
    validateSchema(schema, value, "$", errors);
    if (errors.length > 0) {
      failures.push(
        `${path.relative(repoRoot, examplePath)} failed ${path.relative(repoRoot, schemaPath)}:\n` +
          errors.map((error) => `  - ${error}`).join("\n"),
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(`spec example validation failed\n${failures.join("\n")}`);
  }

  process.stdout.write(
    `spec examples OK (${EXAMPLE_ROUTES.length} examples validated against packages/core/schemas)\n`,
  );
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
