#!/usr/bin/env node
import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode
      ? (__toESMCache_node ??= new WeakMap())
      : (__toESMCache_esm ??= new WeakMap());
    var cached = cache.get(mod);
    if (cached) return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to =
    isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default")
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target;
  if ((mod && typeof mod === "object") || typeof mod === "function") {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: __accessProp.bind(mod, key),
          enumerable: true,
        });
  }
  if (canCache) cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name),
    });
};
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS(function (exports) {
  var ALIAS = Symbol.for("yaml.alias");
  var DOC = Symbol.for("yaml.document");
  var MAP = Symbol.for("yaml.map");
  var PAIR = Symbol.for("yaml.pair");
  var SCALAR = Symbol.for("yaml.scalar");
  var SEQ = Symbol.for("yaml.seq");
  var NODE_TYPE = Symbol.for("yaml.node.type");
  var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
  var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
  var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
  var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
  var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
  var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
  function isCollection(node) {
    if (node && typeof node === "object")
      switch (node[NODE_TYPE]) {
        case MAP:
        case SEQ:
          return true;
      }
    return false;
  }
  function isNode(node) {
    if (node && typeof node === "object")
      switch (node[NODE_TYPE]) {
        case ALIAS:
        case MAP:
        case SCALAR:
        case SEQ:
          return true;
      }
    return false;
  }
  var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
  exports.ALIAS = ALIAS;
  exports.DOC = DOC;
  exports.MAP = MAP;
  exports.NODE_TYPE = NODE_TYPE;
  exports.PAIR = PAIR;
  exports.SCALAR = SCALAR;
  exports.SEQ = SEQ;
  exports.hasAnchor = hasAnchor;
  exports.isAlias = isAlias;
  exports.isCollection = isCollection;
  exports.isDocument = isDocument;
  exports.isMap = isMap;
  exports.isNode = isNode;
  exports.isPair = isPair;
  exports.isScalar = isScalar;
  exports.isSeq = isSeq;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/visit.js
var require_visit = __commonJS(function (exports) {
  var identity = require_identity();
  var BREAK = Symbol("break visit");
  var SKIP = Symbol("skip children");
  var REMOVE = Symbol("remove node");
  function visit(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (identity.isDocument(node)) {
      const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
      if (cd === REMOVE) node.contents = null;
    } else visit_(null, node, visitor_, Object.freeze([]));
  }
  visit.BREAK = BREAK;
  visit.SKIP = SKIP;
  visit.REMOVE = REMOVE;
  function visit_(key, node, visitor, path) {
    const ctrl = callVisitor(key, node, visitor, path);
    if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
      replaceNode(key, path, ctrl);
      return visit_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== "symbol") {
      if (identity.isCollection(node)) {
        path = Object.freeze(path.concat(node));
        for (let i = 0; i < node.items.length; ++i) {
          const ci = visit_(i, node.items[i], visitor, path);
          if (typeof ci === "number") i = ci - 1;
          else if (ci === BREAK) return BREAK;
          else if (ci === REMOVE) {
            node.items.splice(i, 1);
            i -= 1;
          }
        }
      } else if (identity.isPair(node)) {
        path = Object.freeze(path.concat(node));
        const ck = visit_("key", node.key, visitor, path);
        if (ck === BREAK) return BREAK;
        else if (ck === REMOVE) node.key = null;
        const cv = visit_("value", node.value, visitor, path);
        if (cv === BREAK) return BREAK;
        else if (cv === REMOVE) node.value = null;
      }
    }
    return ctrl;
  }
  async function visitAsync(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (identity.isDocument(node)) {
      const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
      if (cd === REMOVE) node.contents = null;
    } else await visitAsync_(null, node, visitor_, Object.freeze([]));
  }
  visitAsync.BREAK = BREAK;
  visitAsync.SKIP = SKIP;
  visitAsync.REMOVE = REMOVE;
  async function visitAsync_(key, node, visitor, path) {
    const ctrl = await callVisitor(key, node, visitor, path);
    if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
      replaceNode(key, path, ctrl);
      return visitAsync_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== "symbol") {
      if (identity.isCollection(node)) {
        path = Object.freeze(path.concat(node));
        for (let i = 0; i < node.items.length; ++i) {
          const ci = await visitAsync_(i, node.items[i], visitor, path);
          if (typeof ci === "number") i = ci - 1;
          else if (ci === BREAK) return BREAK;
          else if (ci === REMOVE) {
            node.items.splice(i, 1);
            i -= 1;
          }
        }
      } else if (identity.isPair(node)) {
        path = Object.freeze(path.concat(node));
        const ck = await visitAsync_("key", node.key, visitor, path);
        if (ck === BREAK) return BREAK;
        else if (ck === REMOVE) node.key = null;
        const cv = await visitAsync_("value", node.value, visitor, path);
        if (cv === BREAK) return BREAK;
        else if (cv === REMOVE) node.value = null;
      }
    }
    return ctrl;
  }
  function initVisitor(visitor) {
    if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
      return Object.assign(
        {
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node,
        },
        visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value,
        },
        visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection,
        },
        visitor,
      );
    }
    return visitor;
  }
  function callVisitor(key, node, visitor, path) {
    if (typeof visitor === "function") return visitor(key, node, path);
    if (identity.isMap(node)) return visitor.Map?.(key, node, path);
    if (identity.isSeq(node)) return visitor.Seq?.(key, node, path);
    if (identity.isPair(node)) return visitor.Pair?.(key, node, path);
    if (identity.isScalar(node)) return visitor.Scalar?.(key, node, path);
    if (identity.isAlias(node)) return visitor.Alias?.(key, node, path);
    return;
  }
  function replaceNode(key, path, node) {
    const parent = path[path.length - 1];
    if (identity.isCollection(parent)) {
      parent.items[key] = node;
    } else if (identity.isPair(parent)) {
      if (key === "key") parent.key = node;
      else parent.value = node;
    } else if (identity.isDocument(parent)) {
      parent.contents = node;
    } else {
      const pt = identity.isAlias(parent) ? "alias" : "scalar";
      throw new Error(`Cannot replace node with ${pt} parent`);
    }
  }
  exports.visit = visit;
  exports.visitAsync = visitAsync;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS(function (exports) {
  var identity = require_identity();
  var visit = require_visit();
  var escapeChars = {
    "!": "%21",
    ",": "%2C",
    "[": "%5B",
    "]": "%5D",
    "{": "%7B",
    "}": "%7D",
  };
  var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);

  class Directives {
    constructor(yaml, tags) {
      this.docStart = null;
      this.docEnd = false;
      this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
      this.tags = Object.assign({}, Directives.defaultTags, tags);
    }
    clone() {
      const copy = new Directives(this.yaml, this.tags);
      copy.docStart = this.docStart;
      return copy;
    }
    atDocument() {
      const res = new Directives(this.yaml, this.tags);
      switch (this.yaml.version) {
        case "1.1":
          this.atNextDocument = true;
          break;
        case "1.2":
          this.atNextDocument = false;
          this.yaml = {
            explicit: Directives.defaultYaml.explicit,
            version: "1.2",
          };
          this.tags = Object.assign({}, Directives.defaultTags);
          break;
      }
      return res;
    }
    add(line, onError) {
      if (this.atNextDocument) {
        this.yaml = { explicit: Directives.defaultYaml.explicit, version: "1.1" };
        this.tags = Object.assign({}, Directives.defaultTags);
        this.atNextDocument = false;
      }
      const parts = line.trim().split(/[ \t]+/);
      const name = parts.shift();
      switch (name) {
        case "%TAG": {
          if (parts.length !== 2) {
            onError(0, "%TAG directive should contain exactly two parts");
            if (parts.length < 2) return false;
          }
          const [handle, prefix] = parts;
          this.tags[handle] = prefix;
          return true;
        }
        case "%YAML": {
          this.yaml.explicit = true;
          if (parts.length !== 1) {
            onError(0, "%YAML directive should contain exactly one part");
            return false;
          }
          const [version] = parts;
          if (version === "1.1" || version === "1.2") {
            this.yaml.version = version;
            return true;
          } else {
            const isValid = /^\d+\.\d+$/.test(version);
            onError(6, `Unsupported YAML version ${version}`, isValid);
            return false;
          }
        }
        default:
          onError(0, `Unknown directive ${name}`, true);
          return false;
      }
    }
    tagName(source, onError) {
      if (source === "!") return "!";
      if (source[0] !== "!") {
        onError(`Not a valid tag: ${source}`);
        return null;
      }
      if (source[1] === "<") {
        const verbatim = source.slice(2, -1);
        if (verbatim === "!" || verbatim === "!!") {
          onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
          return null;
        }
        if (source[source.length - 1] !== ">") onError("Verbatim tags must end with a >");
        return verbatim;
      }
      const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
      if (!suffix) onError(`The ${source} tag has no suffix`);
      const prefix = this.tags[handle];
      if (prefix) {
        try {
          return prefix + decodeURIComponent(suffix);
        } catch (error) {
          onError(String(error));
          return null;
        }
      }
      if (handle === "!") return source;
      onError(`Could not resolve tag: ${source}`);
      return null;
    }
    tagString(tag) {
      for (const [handle, prefix] of Object.entries(this.tags)) {
        if (tag.startsWith(prefix)) return handle + escapeTagName(tag.substring(prefix.length));
      }
      return tag[0] === "!" ? tag : `!<${tag}>`;
    }
    toString(doc) {
      const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
      const tagEntries = Object.entries(this.tags);
      let tagNames;
      if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
        const tags = {};
        visit.visit(doc.contents, (_key, node) => {
          if (identity.isNode(node) && node.tag) tags[node.tag] = true;
        });
        tagNames = Object.keys(tags);
      } else tagNames = [];
      for (const [handle, prefix] of tagEntries) {
        if (handle === "!!" && prefix === "tag:yaml.org,2002:") continue;
        if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
          lines.push(`%TAG ${handle} ${prefix}`);
      }
      return lines.join(`
`);
    }
  }
  Directives.defaultYaml = { explicit: false, version: "1.2" };
  Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
  exports.Directives = Directives;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS(function (exports) {
  var identity = require_identity();
  var visit = require_visit();
  function anchorIsValid(anchor) {
    if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
      const sa = JSON.stringify(anchor);
      const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
      throw new Error(msg);
    }
    return true;
  }
  function anchorNames(root) {
    const anchors = new Set();
    visit.visit(root, {
      Value(_key, node) {
        if (node.anchor) anchors.add(node.anchor);
      },
    });
    return anchors;
  }
  function findNewAnchor(prefix, exclude) {
    for (let i = 1; ; ++i) {
      const name = `${prefix}${i}`;
      if (!exclude.has(name)) return name;
    }
  }
  function createNodeAnchors(doc, prefix) {
    const aliasObjects = [];
    const sourceObjects = new Map();
    let prevAnchors = null;
    return {
      onAnchor: (source) => {
        aliasObjects.push(source);
        prevAnchors ?? (prevAnchors = anchorNames(doc));
        const anchor = findNewAnchor(prefix, prevAnchors);
        prevAnchors.add(anchor);
        return anchor;
      },
      setAnchors: () => {
        for (const source of aliasObjects) {
          const ref = sourceObjects.get(source);
          if (
            typeof ref === "object" &&
            ref.anchor &&
            (identity.isScalar(ref.node) || identity.isCollection(ref.node))
          ) {
            ref.node.anchor = ref.anchor;
          } else {
            const error = new Error("Failed to resolve repeated object (this should not happen)");
            error.source = source;
            throw error;
          }
        }
      },
      sourceObjects,
    };
  }
  exports.anchorIsValid = anchorIsValid;
  exports.anchorNames = anchorNames;
  exports.createNodeAnchors = createNodeAnchors;
  exports.findNewAnchor = findNewAnchor;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS(function (exports) {
  function applyReviver(reviver, obj, key, val) {
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        for (let i = 0, len = val.length; i < len; ++i) {
          const v0 = val[i];
          const v1 = applyReviver(reviver, val, String(i), v0);
          if (v1 === undefined) delete val[i];
          else if (v1 !== v0) val[i] = v1;
        }
      } else if (val instanceof Map) {
        for (const k of Array.from(val.keys())) {
          const v0 = val.get(k);
          const v1 = applyReviver(reviver, val, k, v0);
          if (v1 === undefined) val.delete(k);
          else if (v1 !== v0) val.set(k, v1);
        }
      } else if (val instanceof Set) {
        for (const v0 of Array.from(val)) {
          const v1 = applyReviver(reviver, val, v0, v0);
          if (v1 === undefined) val.delete(v0);
          else if (v1 !== v0) {
            val.delete(v0);
            val.add(v1);
          }
        }
      } else {
        for (const [k, v0] of Object.entries(val)) {
          const v1 = applyReviver(reviver, val, k, v0);
          if (v1 === undefined) delete val[k];
          else if (v1 !== v0) val[k] = v1;
        }
      }
    }
    return reviver.call(obj, key, val);
  }
  exports.applyReviver = applyReviver;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS(function (exports) {
  var identity = require_identity();
  function toJS(value, arg, ctx) {
    if (Array.isArray(value)) return value.map((v, i) => toJS(v, String(i), ctx));
    if (value && typeof value.toJSON === "function") {
      if (!ctx || !identity.hasAnchor(value)) return value.toJSON(arg, ctx);
      const data = { aliasCount: 0, count: 1, res: undefined };
      ctx.anchors.set(value, data);
      ctx.onCreate = (res) => {
        data.res = res;
        delete ctx.onCreate;
      };
      const res = value.toJSON(arg, ctx);
      if (ctx.onCreate) ctx.onCreate(res);
      return res;
    }
    if (typeof value === "bigint" && !ctx?.keep) return Number(value);
    return value;
  }
  exports.toJS = toJS;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS(function (exports) {
  var applyReviver = require_applyReviver();
  var identity = require_identity();
  var toJS = require_toJS();

  class NodeBase {
    constructor(type) {
      Object.defineProperty(this, identity.NODE_TYPE, { value: type });
    }
    clone() {
      const copy = Object.create(
        Object.getPrototypeOf(this),
        Object.getOwnPropertyDescriptors(this),
      );
      if (this.range) copy.range = this.range.slice();
      return copy;
    }
    toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
      if (!identity.isDocument(doc)) throw new TypeError("A document argument is required");
      const ctx = {
        anchors: new Map(),
        doc,
        keep: true,
        mapAsMap: mapAsMap === true,
        mapKeyWarned: false,
        maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100,
      };
      const res = toJS.toJS(this, "", ctx);
      if (typeof onAnchor === "function")
        for (const { count, res } of ctx.anchors.values()) onAnchor(res, count);
      return typeof reviver === "function"
        ? applyReviver.applyReviver(reviver, { "": res }, "", res)
        : res;
    }
  }
  exports.NodeBase = NodeBase;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS(function (exports) {
  var anchors = require_anchors();
  var visit = require_visit();
  var identity = require_identity();
  var Node = require_Node();
  var toJS = require_toJS();

  class Alias extends Node.NodeBase {
    constructor(source) {
      super(identity.ALIAS);
      this.source = source;
      Object.defineProperty(this, "tag", {
        set() {
          throw new Error("Alias nodes cannot have tags");
        },
      });
    }
    resolve(doc, ctx) {
      if (ctx?.maxAliasCount === 0) throw new ReferenceError("Alias resolution is disabled");
      let nodes;
      if (ctx?.aliasResolveCache) {
        nodes = ctx.aliasResolveCache;
      } else {
        nodes = [];
        visit.visit(doc, {
          Node: (_key, node) => {
            if (identity.isAlias(node) || identity.hasAnchor(node)) nodes.push(node);
          },
        });
        if (ctx) ctx.aliasResolveCache = nodes;
      }
      let found = undefined;
      for (const node of nodes) {
        if (node === this) break;
        if (node.anchor === this.source) found = node;
      }
      return found;
    }
    toJSON(_arg, ctx) {
      if (!ctx) return { source: this.source };
      const { anchors, doc, maxAliasCount } = ctx;
      const source = this.resolve(doc, ctx);
      if (!source) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new ReferenceError(msg);
      }
      let data = anchors.get(source);
      if (!data) {
        toJS.toJS(source, null, ctx);
        data = anchors.get(source);
      }
      if (data?.res === undefined) {
        const msg = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(msg);
      }
      if (maxAliasCount >= 0) {
        data.count += 1;
        if (data.aliasCount === 0) data.aliasCount = getAliasCount(doc, source, anchors);
        if (data.count * data.aliasCount > maxAliasCount) {
          const msg = "Excessive alias count indicates a resource exhaustion attack";
          throw new ReferenceError(msg);
        }
      }
      return data.res;
    }
    toString(ctx, _onComment, _onChompKeep) {
      const src = `*${this.source}`;
      if (ctx) {
        anchors.anchorIsValid(this.source);
        if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new Error(msg);
        }
        if (ctx.implicitKey) return `${src} `;
      }
      return src;
    }
  }
  function getAliasCount(doc, node, anchors) {
    if (identity.isAlias(node)) {
      const source = node.resolve(doc);
      const anchor = anchors && source && anchors.get(source);
      return anchor ? anchor.count * anchor.aliasCount : 0;
    } else if (identity.isCollection(node)) {
      let count = 0;
      for (const item of node.items) {
        const c = getAliasCount(doc, item, anchors);
        if (c > count) count = c;
      }
      return count;
    } else if (identity.isPair(node)) {
      const kc = getAliasCount(doc, node.key, anchors);
      const vc = getAliasCount(doc, node.value, anchors);
      return Math.max(kc, vc);
    }
    return 1;
  }
  exports.Alias = Alias;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS(function (exports) {
  var identity = require_identity();
  var Node = require_Node();
  var toJS = require_toJS();
  var isScalarValue = (value) =>
    !value || (typeof value !== "function" && typeof value !== "object");

  class Scalar extends Node.NodeBase {
    constructor(value) {
      super(identity.SCALAR);
      this.value = value;
    }
    toJSON(arg, ctx) {
      return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
    }
    toString() {
      return String(this.value);
    }
  }
  Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
  Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
  Scalar.PLAIN = "PLAIN";
  Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
  Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
  exports.Scalar = Scalar;
  exports.isScalarValue = isScalarValue;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS(function (exports) {
  var Alias = require_Alias();
  var identity = require_identity();
  var Scalar = require_Scalar();
  var defaultTagPrefix = "tag:yaml.org,2002:";
  function findTagObject(value, tagName, tags) {
    if (tagName) {
      const match = tags.filter((t) => t.tag === tagName);
      const tagObj = match.find((t) => !t.format) ?? match[0];
      if (!tagObj) throw new Error(`Tag ${tagName} not found`);
      return tagObj;
    }
    return tags.find((t) => t.identify?.(value) && !t.format);
  }
  function createNode(value, tagName, ctx) {
    if (identity.isDocument(value)) value = value.contents;
    if (identity.isNode(value)) return value;
    if (identity.isPair(value)) {
      const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
      map.items.push(value);
      return map;
    }
    if (
      value instanceof String ||
      value instanceof Number ||
      value instanceof Boolean ||
      (typeof BigInt !== "undefined" && value instanceof BigInt)
    ) {
      value = value.valueOf();
    }
    const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
    let ref = undefined;
    if (aliasDuplicateObjects && value && typeof value === "object") {
      ref = sourceObjects.get(value);
      if (ref) {
        ref.anchor ?? (ref.anchor = onAnchor(value));
        return new Alias.Alias(ref.anchor);
      } else {
        ref = { anchor: null, node: null };
        sourceObjects.set(value, ref);
      }
    }
    if (tagName?.startsWith("!!")) tagName = defaultTagPrefix + tagName.slice(2);
    let tagObj = findTagObject(value, tagName, schema.tags);
    if (!tagObj) {
      if (value && typeof value.toJSON === "function") {
        value = value.toJSON();
      }
      if (!value || typeof value !== "object") {
        const node = new Scalar.Scalar(value);
        if (ref) ref.node = node;
        return node;
      }
      tagObj =
        value instanceof Map
          ? schema[identity.MAP]
          : Symbol.iterator in Object(value)
            ? schema[identity.SEQ]
            : schema[identity.MAP];
    }
    if (onTagObj) {
      onTagObj(tagObj);
      delete ctx.onTagObj;
    }
    const node = tagObj?.createNode
      ? tagObj.createNode(ctx.schema, value, ctx)
      : typeof tagObj?.nodeClass?.from === "function"
        ? tagObj.nodeClass.from(ctx.schema, value, ctx)
        : new Scalar.Scalar(value);
    if (tagName) node.tag = tagName;
    else if (!tagObj.default) node.tag = tagObj.tag;
    if (ref) ref.node = node;
    return node;
  }
  exports.createNode = createNode;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS(function (exports) {
  var createNode = require_createNode();
  var identity = require_identity();
  var Node = require_Node();
  function collectionFromPath(schema, path, value) {
    let v = value;
    for (let i = path.length - 1; i >= 0; --i) {
      const k = path[i];
      if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
        const a = [];
        a[k] = v;
        v = a;
      } else {
        v = new Map([[k, v]]);
      }
    }
    return createNode.createNode(v, undefined, {
      aliasDuplicateObjects: false,
      keepUndefined: false,
      onAnchor: () => {
        throw new Error("This should not happen, please report a bug.");
      },
      schema,
      sourceObjects: new Map(),
    });
  }
  var isEmptyPath = (path) =>
    path == null || (typeof path === "object" && !!path[Symbol.iterator]().next().done);

  class Collection extends Node.NodeBase {
    constructor(type, schema) {
      super(type);
      Object.defineProperty(this, "schema", {
        value: schema,
        configurable: true,
        enumerable: false,
        writable: true,
      });
    }
    clone(schema) {
      const copy = Object.create(
        Object.getPrototypeOf(this),
        Object.getOwnPropertyDescriptors(this),
      );
      if (schema) copy.schema = schema;
      copy.items = copy.items.map((it) =>
        identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it,
      );
      if (this.range) copy.range = this.range.slice();
      return copy;
    }
    addIn(path, value) {
      if (isEmptyPath(path)) this.add(value);
      else {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (identity.isCollection(node)) node.addIn(rest, value);
        else if (node === undefined && this.schema)
          this.set(key, collectionFromPath(this.schema, rest, value));
        else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
    }
    deleteIn(path) {
      const [key, ...rest] = path;
      if (rest.length === 0) return this.delete(key);
      const node = this.get(key, true);
      if (identity.isCollection(node)) return node.deleteIn(rest);
      else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
    getIn(path, keepScalar) {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (rest.length === 0) return !keepScalar && identity.isScalar(node) ? node.value : node;
      else return identity.isCollection(node) ? node.getIn(rest, keepScalar) : undefined;
    }
    hasAllNullValues(allowScalar) {
      return this.items.every((node) => {
        if (!identity.isPair(node)) return false;
        const n = node.value;
        return (
          n == null ||
          (allowScalar &&
            identity.isScalar(n) &&
            n.value == null &&
            !n.commentBefore &&
            !n.comment &&
            !n.tag)
        );
      });
    }
    hasIn(path) {
      const [key, ...rest] = path;
      if (rest.length === 0) return this.has(key);
      const node = this.get(key, true);
      return identity.isCollection(node) ? node.hasIn(rest) : false;
    }
    setIn(path, value) {
      const [key, ...rest] = path;
      if (rest.length === 0) {
        this.set(key, value);
      } else {
        const node = this.get(key, true);
        if (identity.isCollection(node)) node.setIn(rest, value);
        else if (node === undefined && this.schema)
          this.set(key, collectionFromPath(this.schema, rest, value));
        else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
    }
  }
  exports.Collection = Collection;
  exports.collectionFromPath = collectionFromPath;
  exports.isEmptyPath = isEmptyPath;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS(function (exports) {
  var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
  function indentComment(comment, indent) {
    if (/^\n+$/.test(comment)) return comment.substring(1);
    return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
  }
  var lineComment = (str, indent, comment) =>
    str.endsWith(`
`)
      ? indentComment(comment, indent)
      : comment.includes(`
`)
        ? `
` + indentComment(comment, indent)
        : (str.endsWith(" ") ? "" : " ") + comment;
  exports.indentComment = indentComment;
  exports.lineComment = lineComment;
  exports.stringifyComment = stringifyComment;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS(function (exports) {
  var FOLD_FLOW = "flow";
  var FOLD_BLOCK = "block";
  var FOLD_QUOTED = "quoted";
  function foldFlowLines(
    text,
    indent,
    mode = "flow",
    { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {},
  ) {
    if (!lineWidth || lineWidth < 0) return text;
    if (lineWidth < minContentWidth) minContentWidth = 0;
    const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
    if (text.length <= endStep) return text;
    const folds = [];
    const escapedFolds = {};
    let end = lineWidth - indent.length;
    if (typeof indentAtStart === "number") {
      if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0);
      else end = lineWidth - indentAtStart;
    }
    let split = undefined;
    let prev = undefined;
    let overflow = false;
    let i = -1;
    let escStart = -1;
    let escEnd = -1;
    if (mode === FOLD_BLOCK) {
      i = consumeMoreIndentedLines(text, i, indent.length);
      if (i !== -1) end = i + endStep;
    }
    for (let ch; (ch = text[(i += 1)]); ) {
      if (mode === FOLD_QUOTED && ch === "\\") {
        escStart = i;
        switch (text[i + 1]) {
          case "x":
            i += 3;
            break;
          case "u":
            i += 5;
            break;
          case "U":
            i += 9;
            break;
          default:
            i += 1;
        }
        escEnd = i;
      }
      if (
        ch ===
        `
`
      ) {
        if (mode === FOLD_BLOCK) i = consumeMoreIndentedLines(text, i, indent.length);
        end = i + indent.length + endStep;
        split = undefined;
      } else {
        if (
          ch === " " &&
          prev &&
          prev !== " " &&
          prev !==
            `
` &&
          prev !== "\t"
        ) {
          const next = text[i + 1];
          if (
            next &&
            next !== " " &&
            next !==
              `
` &&
            next !== "\t"
          )
            split = i;
        }
        if (i >= end) {
          if (split) {
            folds.push(split);
            end = split + endStep;
            split = undefined;
          } else if (mode === FOLD_QUOTED) {
            while (prev === " " || prev === "\t") {
              prev = ch;
              ch = text[(i += 1)];
              overflow = true;
            }
            const j = i > escEnd + 1 ? i - 2 : escStart - 1;
            if (escapedFolds[j]) return text;
            folds.push(j);
            escapedFolds[j] = true;
            end = j + endStep;
            split = undefined;
          } else {
            overflow = true;
          }
        }
      }
      prev = ch;
    }
    if (overflow && onOverflow) onOverflow();
    if (folds.length === 0) return text;
    if (onFold) onFold();
    let res = text.slice(0, folds[0]);
    for (let i = 0; i < folds.length; ++i) {
      const fold = folds[i];
      const end = folds[i + 1] || text.length;
      if (fold === 0)
        res = `
${indent}${text.slice(0, end)}`;
      else {
        if (mode === FOLD_QUOTED && escapedFolds[fold]) res += `${text[fold]}\\`;
        res += `
${indent}${text.slice(fold + 1, end)}`;
      }
    }
    return res;
  }
  function consumeMoreIndentedLines(text, i, indent) {
    let end = i;
    let start = i + 1;
    let ch = text[start];
    while (ch === " " || ch === "\t") {
      if (i < start + indent) {
        ch = text[++i];
      } else {
        do {
          ch = text[++i];
        } while (
          ch &&
          ch !==
            `
`
        );
        end = i;
        start = i + 1;
        ch = text[start];
      }
    }
    return end;
  }
  exports.FOLD_BLOCK = FOLD_BLOCK;
  exports.FOLD_FLOW = FOLD_FLOW;
  exports.FOLD_QUOTED = FOLD_QUOTED;
  exports.foldFlowLines = foldFlowLines;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var foldFlowLines = require_foldFlowLines();
  var getFoldOptions = (ctx, isBlock) => ({
    indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
    lineWidth: ctx.options.lineWidth,
    minContentWidth: ctx.options.minContentWidth,
  });
  var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
  function lineLengthOverLimit(str, lineWidth, indentLength) {
    if (!lineWidth || lineWidth < 0) return false;
    const limit = lineWidth - indentLength;
    const strLen = str.length;
    if (strLen <= limit) return false;
    for (let i = 0, start = 0; i < strLen; ++i) {
      if (
        str[i] ===
        `
`
      ) {
        if (i - start > limit) return true;
        start = i + 1;
        if (strLen - start <= limit) return false;
      }
    }
    return true;
  }
  function doubleQuotedString(value, ctx) {
    const json = JSON.stringify(value);
    if (ctx.options.doubleQuotedAsJSON) return json;
    const { implicitKey } = ctx;
    const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
    const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
    let str = "";
    let start = 0;
    for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
      if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
        str += json.slice(start, i) + "\\ ";
        i += 1;
        start = i;
        ch = "\\";
      }
      if (ch === "\\")
        switch (json[i + 1]) {
          case "u":
            {
              str += json.slice(start, i);
              const code = json.substr(i + 2, 4);
              switch (code) {
                case "0000":
                  str += "\\0";
                  break;
                case "0007":
                  str += "\\a";
                  break;
                case "000b":
                  str += "\\v";
                  break;
                case "001b":
                  str += "\\e";
                  break;
                case "0085":
                  str += "\\N";
                  break;
                case "00a0":
                  str += "\\_";
                  break;
                case "2028":
                  str += "\\L";
                  break;
                case "2029":
                  str += "\\P";
                  break;
                default:
                  if (code.substr(0, 2) === "00") str += "\\x" + code.substr(2);
                  else str += json.substr(i, 6);
              }
              i += 5;
              start = i + 1;
            }
            break;
          case "n":
            if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
              i += 1;
            } else {
              str +=
                json.slice(start, i) +
                `

`;
              while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                str += `
`;
                i += 2;
              }
              str += indent;
              if (json[i + 2] === " ") str += "\\";
              i += 1;
              start = i + 1;
            }
            break;
          default:
            i += 1;
        }
    }
    str = start ? str + json.slice(start) : json;
    return implicitKey
      ? str
      : foldFlowLines.foldFlowLines(
          str,
          indent,
          foldFlowLines.FOLD_QUOTED,
          getFoldOptions(ctx, false),
        );
  }
  function singleQuotedString(value, ctx) {
    if (
      ctx.options.singleQuote === false ||
      (ctx.implicitKey &&
        value.includes(`
`)) ||
      /[ \t]\n|\n[ \t]/.test(value)
    )
      return doubleQuotedString(value, ctx);
    const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
    const res =
      "'" +
      value.replace(/'/g, "''").replace(
        /\n+/g,
        `$&
${indent}`,
      ) +
      "'";
    return ctx.implicitKey
      ? res
      : foldFlowLines.foldFlowLines(
          res,
          indent,
          foldFlowLines.FOLD_FLOW,
          getFoldOptions(ctx, false),
        );
  }
  function quotedString(value, ctx) {
    const { singleQuote } = ctx.options;
    let qs;
    if (singleQuote === false) qs = doubleQuotedString;
    else {
      const hasDouble = value.includes('"');
      const hasSingle = value.includes("'");
      if (hasDouble && !hasSingle) qs = singleQuotedString;
      else if (hasSingle && !hasDouble) qs = doubleQuotedString;
      else qs = singleQuote ? singleQuotedString : doubleQuotedString;
    }
    return qs(value, ctx);
  }
  var blockEndNewlines;
  try {
    blockEndNewlines = new RegExp(
      `(^|(?<!
))
+(?!
|$)`,
      "g",
    );
  } catch {
    blockEndNewlines = /\n+(?!\n|$)/g;
  }
  function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
    const { blockQuote, commentString, lineWidth } = ctx.options;
    if (!blockQuote || /\n[\t ]+$/.test(value)) {
      return quotedString(value, ctx);
    }
    const indent =
      ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
    const literal =
      blockQuote === "literal"
        ? true
        : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED
          ? false
          : type === Scalar.Scalar.BLOCK_LITERAL
            ? true
            : !lineLengthOverLimit(value, lineWidth, indent.length);
    if (!value)
      return literal
        ? `|
`
        : `>
`;
    let chomp;
    let endStart;
    for (endStart = value.length; endStart > 0; --endStart) {
      const ch = value[endStart - 1];
      if (
        ch !==
          `
` &&
        ch !== "\t" &&
        ch !== " "
      )
        break;
    }
    let end = value.substring(endStart);
    const endNlPos = end.indexOf(`
`);
    if (endNlPos === -1) {
      chomp = "-";
    } else if (value === end || endNlPos !== end.length - 1) {
      chomp = "+";
      if (onChompKeep) onChompKeep();
    } else {
      chomp = "";
    }
    if (end) {
      value = value.slice(0, -end.length);
      if (
        end[end.length - 1] ===
        `
`
      )
        end = end.slice(0, -1);
      end = end.replace(blockEndNewlines, `$&${indent}`);
    }
    let startWithSpace = false;
    let startEnd;
    let startNlPos = -1;
    for (startEnd = 0; startEnd < value.length; ++startEnd) {
      const ch = value[startEnd];
      if (ch === " ") startWithSpace = true;
      else if (
        ch ===
        `
`
      )
        startNlPos = startEnd;
      else break;
    }
    let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
    if (start) {
      value = value.substring(start.length);
      start = start.replace(/\n+/g, `$&${indent}`);
    }
    const indentSize = indent ? "2" : "1";
    let header = (startWithSpace ? indentSize : "") + chomp;
    if (comment) {
      header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
      if (onComment) onComment();
    }
    if (!literal) {
      const foldedValue = value
        .replace(
          /\n+/g,
          `
$&`,
        )
        .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2")
        .replace(/\n+/g, `$&${indent}`);
      let literalFallback = false;
      const foldOptions = getFoldOptions(ctx, true);
      if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
        foldOptions.onOverflow = () => {
          literalFallback = true;
        };
      }
      const body = foldFlowLines.foldFlowLines(
        `${start}${foldedValue}${end}`,
        indent,
        foldFlowLines.FOLD_BLOCK,
        foldOptions,
      );
      if (!literalFallback)
        return `>${header}
${indent}${body}`;
    }
    value = value.replace(/\n+/g, `$&${indent}`);
    return `|${header}
${indent}${start}${value}${end}`;
  }
  function plainString(item, ctx, onComment, onChompKeep) {
    const { type, value } = item;
    const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
    if (
      (implicitKey &&
        value.includes(`
`)) ||
      (inFlow && /[[\]{},]/.test(value))
    ) {
      return quotedString(value, ctx);
    }
    if (
      /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(
        value,
      )
    ) {
      return implicitKey ||
        inFlow ||
        !value.includes(`
`)
        ? quotedString(value, ctx)
        : blockString(item, ctx, onComment, onChompKeep);
    }
    if (
      !implicitKey &&
      !inFlow &&
      type !== Scalar.Scalar.PLAIN &&
      value.includes(`
`)
    ) {
      return blockString(item, ctx, onComment, onChompKeep);
    }
    if (containsDocumentMarker(value)) {
      if (indent === "") {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      } else if (implicitKey && indent === indentStep) {
        return quotedString(value, ctx);
      }
    }
    const str = value.replace(
      /\n+/g,
      `$&
${indent}`,
    );
    if (actualString) {
      const test = (tag) =>
        tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
      const { compat, tags } = ctx.doc.schema;
      if (tags.some(test) || compat?.some(test)) return quotedString(value, ctx);
    }
    return implicitKey
      ? str
      : foldFlowLines.foldFlowLines(
          str,
          indent,
          foldFlowLines.FOLD_FLOW,
          getFoldOptions(ctx, false),
        );
  }
  function stringifyString(item, ctx, onComment, onChompKeep) {
    const { implicitKey, inFlow } = ctx;
    const ss =
      typeof item.value === "string"
        ? item
        : Object.assign({}, item, { value: String(item.value) });
    let { type } = item;
    if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
      if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
        type = Scalar.Scalar.QUOTE_DOUBLE;
    }
    const _stringify = (_type) => {
      switch (_type) {
        case Scalar.Scalar.BLOCK_FOLDED:
        case Scalar.Scalar.BLOCK_LITERAL:
          return implicitKey || inFlow
            ? quotedString(ss.value, ctx)
            : blockString(ss, ctx, onComment, onChompKeep);
        case Scalar.Scalar.QUOTE_DOUBLE:
          return doubleQuotedString(ss.value, ctx);
        case Scalar.Scalar.QUOTE_SINGLE:
          return singleQuotedString(ss.value, ctx);
        case Scalar.Scalar.PLAIN:
          return plainString(ss, ctx, onComment, onChompKeep);
        default:
          return null;
      }
    };
    let res = _stringify(type);
    if (res === null) {
      const { defaultKeyType, defaultStringType } = ctx.options;
      const t = (implicitKey && defaultKeyType) || defaultStringType;
      res = _stringify(t);
      if (res === null) throw new Error(`Unsupported default string type ${t}`);
    }
    return res;
  }
  exports.stringifyString = stringifyString;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS(function (exports) {
  var anchors = require_anchors();
  var identity = require_identity();
  var stringifyComment = require_stringifyComment();
  var stringifyString = require_stringifyString();
  function createStringifyContext(doc, options) {
    const opt = Object.assign(
      {
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: "true",
        verifyAliasOrder: true,
      },
      doc.schema.toStringOptions,
      options,
    );
    let inFlow;
    switch (opt.collectionStyle) {
      case "block":
        inFlow = false;
        break;
      case "flow":
        inFlow = true;
        break;
      default:
        inFlow = null;
    }
    return {
      anchors: new Set(),
      doc,
      flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
      indent: "",
      indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
      inFlow,
      options: opt,
    };
  }
  function getTagObject(tags, item) {
    if (item.tag) {
      const match = tags.filter((t) => t.tag === item.tag);
      if (match.length > 0) return match.find((t) => t.format === item.format) ?? match[0];
    }
    let tagObj = undefined;
    let obj;
    if (identity.isScalar(item)) {
      obj = item.value;
      let match = tags.filter((t) => t.identify?.(obj));
      if (match.length > 1) {
        const testMatch = match.filter((t) => t.test);
        if (testMatch.length > 0) match = testMatch;
      }
      tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
    } else {
      obj = item;
      tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
    }
    if (!tagObj) {
      const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
      throw new Error(`Tag not resolved for ${name} value`);
    }
    return tagObj;
  }
  function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
    if (!doc.directives) return "";
    const props = [];
    const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
    if (anchor && anchors.anchorIsValid(anchor)) {
      anchors$1.add(anchor);
      props.push(`&${anchor}`);
    }
    const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
    if (tag) props.push(doc.directives.tagString(tag));
    return props.join(" ");
  }
  function stringify(item, ctx, onComment, onChompKeep) {
    if (identity.isPair(item)) return item.toString(ctx, onComment, onChompKeep);
    if (identity.isAlias(item)) {
      if (ctx.doc.directives) return item.toString(ctx);
      if (ctx.resolvedAliases?.has(item)) {
        throw new TypeError(`Cannot stringify circular structure without alias nodes`);
      } else {
        if (ctx.resolvedAliases) ctx.resolvedAliases.add(item);
        else ctx.resolvedAliases = new Set([item]);
        item = item.resolve(ctx.doc);
      }
    }
    let tagObj = undefined;
    const node = identity.isNode(item)
      ? item
      : ctx.doc.createNode(item, { onTagObj: (o) => (tagObj = o) });
    tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
    const props = stringifyProps(node, tagObj, ctx);
    if (props.length > 0) ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
    const str =
      typeof tagObj.stringify === "function"
        ? tagObj.stringify(node, ctx, onComment, onChompKeep)
        : identity.isScalar(node)
          ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep)
          : node.toString(ctx, onComment, onChompKeep);
    if (!props) return str;
    return identity.isScalar(node) || str[0] === "{" || str[0] === "["
      ? `${props} ${str}`
      : `${props}
${ctx.indent}${str}`;
  }
  exports.createStringifyContext = createStringifyContext;
  exports.stringify = stringify;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS(function (exports) {
  var identity = require_identity();
  var Scalar = require_Scalar();
  var stringify = require_stringify();
  var stringifyComment = require_stringifyComment();
  function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
    const {
      allNullValues,
      doc,
      indent,
      indentStep,
      options: { commentString, indentSeq, simpleKeys },
    } = ctx;
    let keyComment = (identity.isNode(key) && key.comment) || null;
    if (simpleKeys) {
      if (keyComment) {
        throw new Error("With simple keys, key nodes cannot have comments");
      }
      if (identity.isCollection(key) || (!identity.isNode(key) && typeof key === "object")) {
        const msg = "With simple keys, collection cannot be used as a key value";
        throw new Error(msg);
      }
    }
    let explicitKey =
      !simpleKeys &&
      (!key ||
        (keyComment && value == null && !ctx.inFlow) ||
        identity.isCollection(key) ||
        (identity.isScalar(key)
          ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL
          : typeof key === "object"));
    ctx = Object.assign({}, ctx, {
      allNullValues: false,
      implicitKey: !explicitKey && (simpleKeys || !allNullValues),
      indent: indent + indentStep,
    });
    let keyCommentDone = false;
    let chompKeep = false;
    let str = stringify.stringify(
      key,
      ctx,
      () => (keyCommentDone = true),
      () => (chompKeep = true),
    );
    if (!explicitKey && !ctx.inFlow && str.length > 1024) {
      if (simpleKeys)
        throw new Error(
          "With simple keys, single line scalar must not span more than 1024 characters",
        );
      explicitKey = true;
    }
    if (ctx.inFlow) {
      if (allNullValues || value == null) {
        if (keyCommentDone && onComment) onComment();
        return str === "" ? "?" : explicitKey ? `? ${str}` : str;
      }
    } else if ((allNullValues && !simpleKeys) || (value == null && explicitKey)) {
      str = `? ${str}`;
      if (keyComment && !keyCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      } else if (chompKeep && onChompKeep) onChompKeep();
      return str;
    }
    if (keyCommentDone) keyComment = null;
    if (explicitKey) {
      if (keyComment)
        str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      str = `? ${str}
${indent}:`;
    } else {
      str = `${str}:`;
      if (keyComment)
        str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
    }
    let vsb, vcb, valueComment;
    if (identity.isNode(value)) {
      vsb = !!value.spaceBefore;
      vcb = value.commentBefore;
      valueComment = value.comment;
    } else {
      vsb = false;
      vcb = null;
      valueComment = null;
      if (value && typeof value === "object") value = doc.createNode(value);
    }
    ctx.implicitKey = false;
    if (!explicitKey && !keyComment && identity.isScalar(value)) ctx.indentAtStart = str.length + 1;
    chompKeep = false;
    if (
      !indentSeq &&
      indentStep.length >= 2 &&
      !ctx.inFlow &&
      !explicitKey &&
      identity.isSeq(value) &&
      !value.flow &&
      !value.tag &&
      !value.anchor
    ) {
      ctx.indent = ctx.indent.substring(2);
    }
    let valueCommentDone = false;
    const valueStr = stringify.stringify(
      value,
      ctx,
      () => (valueCommentDone = true),
      () => (chompKeep = true),
    );
    let ws = " ";
    if (keyComment || vsb || vcb) {
      ws = vsb
        ? `
`
        : "";
      if (vcb) {
        const cs = commentString(vcb);
        ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
      }
      if (valueStr === "" && !ctx.inFlow) {
        if (
          ws ===
            `
` &&
          valueComment
        )
          ws = `

`;
      } else {
        ws += `
${ctx.indent}`;
      }
    } else if (!explicitKey && identity.isCollection(value)) {
      const vs0 = valueStr[0];
      const nl0 = valueStr.indexOf(`
`);
      const hasNewline = nl0 !== -1;
      const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
      if (hasNewline || !flow) {
        let hasPropsLine = false;
        if (hasNewline && (vs0 === "&" || vs0 === "!")) {
          let sp0 = valueStr.indexOf(" ");
          if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
            sp0 = valueStr.indexOf(" ", sp0 + 1);
          }
          if (sp0 === -1 || nl0 < sp0) hasPropsLine = true;
        }
        if (!hasPropsLine)
          ws = `
${ctx.indent}`;
      }
    } else if (
      valueStr === "" ||
      valueStr[0] ===
        `
`
    ) {
      ws = "";
    }
    str += ws + valueStr;
    if (ctx.inFlow) {
      if (valueCommentDone && onComment) onComment();
    } else if (valueComment && !valueCommentDone) {
      str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
    } else if (chompKeep && onChompKeep) {
      onChompKeep();
    }
    return str;
  }
  exports.stringifyPair = stringifyPair;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/log.js
var require_log = __commonJS(function (exports) {
  var node_process = __require("process");
  function debug(logLevel, ...messages) {
    if (logLevel === "debug") console.log(...messages);
  }
  function warn(logLevel, warning) {
    if (logLevel === "debug" || logLevel === "warn") {
      if (typeof node_process.emitWarning === "function") node_process.emitWarning(warning);
      else console.warn(warning);
    }
  }
  exports.debug = debug;
  exports.warn = warn;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS(function (exports) {
  var identity = require_identity();
  var Scalar = require_Scalar();
  var MERGE_KEY = "<<";
  var merge = {
    identify: (value) =>
      value === MERGE_KEY || (typeof value === "symbol" && value.description === MERGE_KEY),
    default: "key",
    tag: "tag:yaml.org,2002:merge",
    test: /^<<$/,
    resolve: () =>
      Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap,
      }),
    stringify: () => MERGE_KEY,
  };
  var isMergeKey = (ctx, key) =>
    (merge.identify(key) ||
      (identity.isScalar(key) &&
        (!key.type || key.type === Scalar.Scalar.PLAIN) &&
        merge.identify(key.value))) &&
    ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
  function addMergeToJSMap(ctx, map, value) {
    const source = resolveAliasValue(ctx, value);
    if (identity.isSeq(source)) for (const it of source.items) mergeValue(ctx, map, it);
    else if (Array.isArray(source)) for (const it of source) mergeValue(ctx, map, it);
    else mergeValue(ctx, map, source);
  }
  function mergeValue(ctx, map, value) {
    const source = resolveAliasValue(ctx, value);
    if (!identity.isMap(source)) throw new Error("Merge sources must be maps or map aliases");
    const srcMap = source.toJSON(null, ctx, Map);
    for (const [key, value] of srcMap) {
      if (map instanceof Map) {
        if (!map.has(key)) map.set(key, value);
      } else if (map instanceof Set) {
        map.add(key);
      } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
        Object.defineProperty(map, key, {
          value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    }
    return map;
  }
  function resolveAliasValue(ctx, value) {
    return ctx && identity.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
  }
  exports.addMergeToJSMap = addMergeToJSMap;
  exports.isMergeKey = isMergeKey;
  exports.merge = merge;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS(function (exports) {
  var log = require_log();
  var merge = require_merge();
  var stringify = require_stringify();
  var identity = require_identity();
  var toJS = require_toJS();
  function addPairToJSMap(ctx, map, { key, value }) {
    if (identity.isNode(key) && key.addToJSMap) key.addToJSMap(ctx, map, value);
    else if (merge.isMergeKey(ctx, key)) merge.addMergeToJSMap(ctx, map, value);
    else {
      const jsKey = toJS.toJS(key, "", ctx);
      if (map instanceof Map) {
        map.set(jsKey, toJS.toJS(value, jsKey, ctx));
      } else if (map instanceof Set) {
        map.add(jsKey);
      } else {
        const stringKey = stringifyKey(key, jsKey, ctx);
        const jsValue = toJS.toJS(value, stringKey, ctx);
        if (stringKey in map)
          Object.defineProperty(map, stringKey, {
            value: jsValue,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        else map[stringKey] = jsValue;
      }
    }
    return map;
  }
  function stringifyKey(key, jsKey, ctx) {
    if (jsKey === null) return "";
    if (typeof jsKey !== "object") return String(jsKey);
    if (identity.isNode(key) && ctx?.doc) {
      const strCtx = stringify.createStringifyContext(ctx.doc, {});
      strCtx.anchors = new Set();
      for (const node of ctx.anchors.keys()) strCtx.anchors.add(node.anchor);
      strCtx.inFlow = true;
      strCtx.inStringifyKey = true;
      const strKey = key.toString(strCtx);
      if (!ctx.mapKeyWarned) {
        let jsonStr = JSON.stringify(strKey);
        if (jsonStr.length > 40) jsonStr = jsonStr.substring(0, 36) + '..."';
        log.warn(
          ctx.doc.options.logLevel,
          `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`,
        );
        ctx.mapKeyWarned = true;
      }
      return strKey;
    }
    return JSON.stringify(jsKey);
  }
  exports.addPairToJSMap = addPairToJSMap;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS(function (exports) {
  var createNode = require_createNode();
  var stringifyPair = require_stringifyPair();
  var addPairToJSMap = require_addPairToJSMap();
  var identity = require_identity();
  function createPair(key, value, ctx) {
    const k = createNode.createNode(key, undefined, ctx);
    const v = createNode.createNode(value, undefined, ctx);
    return new Pair(k, v);
  }

  class Pair {
    constructor(key, value = null) {
      Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
      this.key = key;
      this.value = value;
    }
    clone(schema) {
      let { key, value } = this;
      if (identity.isNode(key)) key = key.clone(schema);
      if (identity.isNode(value)) value = value.clone(schema);
      return new Pair(key, value);
    }
    toJSON(_, ctx) {
      const pair = ctx?.mapAsMap ? new Map() : {};
      return addPairToJSMap.addPairToJSMap(ctx, pair, this);
    }
    toString(ctx, onComment, onChompKeep) {
      return ctx?.doc
        ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep)
        : JSON.stringify(this);
    }
  }
  exports.Pair = Pair;
  exports.createPair = createPair;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS(function (exports) {
  var identity = require_identity();
  var stringify = require_stringify();
  var stringifyComment = require_stringifyComment();
  function stringifyCollection(collection, ctx, options) {
    const flow = ctx.inFlow ?? collection.flow;
    const stringify = flow ? stringifyFlowCollection : stringifyBlockCollection;
    return stringify(collection, ctx, options);
  }
  function stringifyBlockCollection(
    { comment, items },
    ctx,
    { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment },
  ) {
    const {
      indent,
      options: { commentString },
    } = ctx;
    const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
    let chompKeep = false;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      let comment = null;
      if (identity.isNode(item)) {
        if (!chompKeep && item.spaceBefore) lines.push("");
        addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
        if (item.comment) comment = item.comment;
      } else if (identity.isPair(item)) {
        const ik = identity.isNode(item.key) ? item.key : null;
        if (ik) {
          if (!chompKeep && ik.spaceBefore) lines.push("");
          addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
        }
      }
      chompKeep = false;
      let str = stringify.stringify(
        item,
        itemCtx,
        () => (comment = null),
        () => (chompKeep = true),
      );
      if (comment) str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
      if (chompKeep && comment) chompKeep = false;
      lines.push(blockItemPrefix + str);
    }
    let str;
    if (lines.length === 0) {
      str = flowChars.start + flowChars.end;
    } else {
      str = lines[0];
      for (let i = 1; i < lines.length; ++i) {
        const line = lines[i];
        str += line
          ? `
${indent}${line}`
          : `
`;
      }
    }
    if (comment) {
      str +=
        `
` + stringifyComment.indentComment(commentString(comment), indent);
      if (onComment) onComment();
    } else if (chompKeep && onChompKeep) onChompKeep();
    return str;
  }
  function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
    const {
      indent,
      indentStep,
      flowCollectionPadding: fcPadding,
      options: { commentString },
    } = ctx;
    itemIndent += indentStep;
    const itemCtx = Object.assign({}, ctx, {
      indent: itemIndent,
      inFlow: true,
      type: null,
    });
    let reqNewline = false;
    let linesAtValue = 0;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      let comment = null;
      if (identity.isNode(item)) {
        if (item.spaceBefore) lines.push("");
        addCommentBefore(ctx, lines, item.commentBefore, false);
        if (item.comment) comment = item.comment;
      } else if (identity.isPair(item)) {
        const ik = identity.isNode(item.key) ? item.key : null;
        if (ik) {
          if (ik.spaceBefore) lines.push("");
          addCommentBefore(ctx, lines, ik.commentBefore, false);
          if (ik.comment) reqNewline = true;
        }
        const iv = identity.isNode(item.value) ? item.value : null;
        if (iv) {
          if (iv.comment) comment = iv.comment;
          if (iv.commentBefore) reqNewline = true;
        } else if (item.value == null && ik?.comment) {
          comment = ik.comment;
        }
      }
      if (comment) reqNewline = true;
      let str = stringify.stringify(item, itemCtx, () => (comment = null));
      reqNewline ||
        (reqNewline =
          lines.length > linesAtValue ||
          str.includes(`
`));
      if (i < items.length - 1) {
        str += ",";
      } else if (ctx.options.trailingComma) {
        if (ctx.options.lineWidth > 0) {
          reqNewline ||
            (reqNewline =
              lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) >
              ctx.options.lineWidth);
        }
        if (reqNewline) {
          str += ",";
        }
      }
      if (comment) str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
      lines.push(str);
      linesAtValue = lines.length;
    }
    const { start, end } = flowChars;
    if (lines.length === 0) {
      return start + end;
    } else {
      if (!reqNewline) {
        const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
        reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
      }
      if (reqNewline) {
        let str = start;
        for (const line of lines)
          str += line
            ? `
${indentStep}${indent}${line}`
            : `
`;
        return `${str}
${indent}${end}`;
      } else {
        return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
      }
    }
  }
  function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
    if (comment && chompKeep) comment = comment.replace(/^\n+/, "");
    if (comment) {
      const ic = stringifyComment.indentComment(commentString(comment), indent);
      lines.push(ic.trimStart());
    }
  }
  exports.stringifyCollection = stringifyCollection;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS(function (exports) {
  var stringifyCollection = require_stringifyCollection();
  var addPairToJSMap = require_addPairToJSMap();
  var Collection = require_Collection();
  var identity = require_identity();
  var Pair = require_Pair();
  var Scalar = require_Scalar();
  function findPair(items, key) {
    const k = identity.isScalar(key) ? key.value : key;
    for (const it of items) {
      if (identity.isPair(it)) {
        if (it.key === key || it.key === k) return it;
        if (identity.isScalar(it.key) && it.key.value === k) return it;
      }
    }
    return;
  }

  class YAMLMap extends Collection.Collection {
    static get tagName() {
      return "tag:yaml.org,2002:map";
    }
    constructor(schema) {
      super(identity.MAP, schema);
      this.items = [];
    }
    static from(schema, obj, ctx) {
      const { keepUndefined, replacer } = ctx;
      const map = new this(schema);
      const add = (key, value) => {
        if (typeof replacer === "function") value = replacer.call(obj, key, value);
        else if (Array.isArray(replacer) && !replacer.includes(key)) return;
        if (value !== undefined || keepUndefined) map.items.push(Pair.createPair(key, value, ctx));
      };
      if (obj instanceof Map) {
        for (const [key, value] of obj) add(key, value);
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj)) add(key, obj[key]);
      }
      if (typeof schema.sortMapEntries === "function") {
        map.items.sort(schema.sortMapEntries);
      }
      return map;
    }
    add(pair, overwrite) {
      let _pair;
      if (identity.isPair(pair)) _pair = pair;
      else if (!pair || typeof pair !== "object" || !("key" in pair)) {
        _pair = new Pair.Pair(pair, pair?.value);
      } else _pair = new Pair.Pair(pair.key, pair.value);
      const prev = findPair(this.items, _pair.key);
      const sortEntries = this.schema?.sortMapEntries;
      if (prev) {
        if (!overwrite) throw new Error(`Key ${_pair.key} already set`);
        if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
          prev.value.value = _pair.value;
        else prev.value = _pair.value;
      } else if (sortEntries) {
        const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
        if (i === -1) this.items.push(_pair);
        else this.items.splice(i, 0, _pair);
      } else {
        this.items.push(_pair);
      }
    }
    delete(key) {
      const it = findPair(this.items, key);
      if (!it) return false;
      const del = this.items.splice(this.items.indexOf(it), 1);
      return del.length > 0;
    }
    get(key, keepScalar) {
      const it = findPair(this.items, key);
      const node = it?.value;
      return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? undefined;
    }
    has(key) {
      return !!findPair(this.items, key);
    }
    set(key, value) {
      this.add(new Pair.Pair(key, value), true);
    }
    toJSON(_, ctx, Type) {
      const map = Type ? new Type() : ctx?.mapAsMap ? new Map() : {};
      if (ctx?.onCreate) ctx.onCreate(map);
      for (const item of this.items) addPairToJSMap.addPairToJSMap(ctx, map, item);
      return map;
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx) return JSON.stringify(this);
      for (const item of this.items) {
        if (!identity.isPair(item))
          throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
      }
      if (!ctx.allNullValues && this.hasAllNullValues(false))
        ctx = Object.assign({}, ctx, { allNullValues: true });
      return stringifyCollection.stringifyCollection(this, ctx, {
        blockItemPrefix: "",
        flowChars: { start: "{", end: "}" },
        itemIndent: ctx.indent || "",
        onChompKeep,
        onComment,
      });
    }
  }
  exports.YAMLMap = YAMLMap;
  exports.findPair = findPair;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS(function (exports) {
  var identity = require_identity();
  var YAMLMap = require_YAMLMap();
  var map = {
    collection: "map",
    default: true,
    nodeClass: YAMLMap.YAMLMap,
    tag: "tag:yaml.org,2002:map",
    resolve(map, onError) {
      if (!identity.isMap(map)) onError("Expected a mapping for this tag");
      return map;
    },
    createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx),
  };
  exports.map = map;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS(function (exports) {
  var createNode = require_createNode();
  var stringifyCollection = require_stringifyCollection();
  var Collection = require_Collection();
  var identity = require_identity();
  var Scalar = require_Scalar();
  var toJS = require_toJS();

  class YAMLSeq extends Collection.Collection {
    static get tagName() {
      return "tag:yaml.org,2002:seq";
    }
    constructor(schema) {
      super(identity.SEQ, schema);
      this.items = [];
    }
    add(value) {
      this.items.push(value);
    }
    delete(key) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number") return false;
      const del = this.items.splice(idx, 1);
      return del.length > 0;
    }
    get(key, keepScalar) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number") return;
      const it = this.items[idx];
      return !keepScalar && identity.isScalar(it) ? it.value : it;
    }
    has(key) {
      const idx = asItemIndex(key);
      return typeof idx === "number" && idx < this.items.length;
    }
    set(key, value) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number") throw new Error(`Expected a valid index, not ${key}.`);
      const prev = this.items[idx];
      if (identity.isScalar(prev) && Scalar.isScalarValue(value)) prev.value = value;
      else this.items[idx] = value;
    }
    toJSON(_, ctx) {
      const seq = [];
      if (ctx?.onCreate) ctx.onCreate(seq);
      let i = 0;
      for (const item of this.items) seq.push(toJS.toJS(item, String(i++), ctx));
      return seq;
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx) return JSON.stringify(this);
      return stringifyCollection.stringifyCollection(this, ctx, {
        blockItemPrefix: "- ",
        flowChars: { start: "[", end: "]" },
        itemIndent: (ctx.indent || "") + "  ",
        onChompKeep,
        onComment,
      });
    }
    static from(schema, obj, ctx) {
      const { replacer } = ctx;
      const seq = new this(schema);
      if (obj && Symbol.iterator in Object(obj)) {
        let i = 0;
        for (let it of obj) {
          if (typeof replacer === "function") {
            const key = obj instanceof Set ? it : String(i++);
            it = replacer.call(obj, key, it);
          }
          seq.items.push(createNode.createNode(it, undefined, ctx));
        }
      }
      return seq;
    }
  }
  function asItemIndex(key) {
    let idx = identity.isScalar(key) ? key.value : key;
    if (idx && typeof idx === "string") idx = Number(idx);
    return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
  }
  exports.YAMLSeq = YAMLSeq;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS(function (exports) {
  var identity = require_identity();
  var YAMLSeq = require_YAMLSeq();
  var seq = {
    collection: "seq",
    default: true,
    nodeClass: YAMLSeq.YAMLSeq,
    tag: "tag:yaml.org,2002:seq",
    resolve(seq, onError) {
      if (!identity.isSeq(seq)) onError("Expected a sequence for this tag");
      return seq;
    },
    createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx),
  };
  exports.seq = seq;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS(function (exports) {
  var stringifyString = require_stringifyString();
  var string = {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify(item, ctx, onComment, onChompKeep) {
      ctx = Object.assign({ actualString: true }, ctx);
      return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
    },
  };
  exports.string = string;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var nullTag = {
    identify: (value) => value == null,
    createNode: () => new Scalar.Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new Scalar.Scalar(null),
    stringify: ({ source }, ctx) =>
      typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr,
  };
  exports.nullTag = nullTag;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var boolTag = {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
    stringify({ source, value }, ctx) {
      if (source && boolTag.test.test(source)) {
        const sv = source[0] === "t" || source[0] === "T";
        if (value === sv) return source;
      }
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    },
  };
  exports.boolTag = boolTag;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS(function (exports) {
  function stringifyNumber({ format, minFractionDigits, tag, value }) {
    if (typeof value === "bigint") return String(value);
    const num = typeof value === "number" ? value : Number(value);
    if (!isFinite(num)) return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
    let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
    if (
      !format &&
      minFractionDigits &&
      (!tag || tag === "tag:yaml.org,2002:float") &&
      /^-?\d/.test(n) &&
      !n.includes("e")
    ) {
      let i = n.indexOf(".");
      if (i < 0) {
        i = n.length;
        n += ".";
      }
      let d = minFractionDigits - (n.length - i - 1);
      while (d-- > 0) n += "0";
    }
    return n;
  }
  exports.stringifyNumber = stringifyNumber;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var stringifyNumber = require_stringifyNumber();
  var floatNaN = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) =>
      str.slice(-3).toLowerCase() === "nan"
        ? NaN
        : str[0] === "-"
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber.stringifyNumber,
  };
  var floatExp = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "EXP",
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str),
    stringify(node) {
      const num = Number(node.value);
      return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
    },
  };
  var float = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(str) {
      const node = new Scalar.Scalar(parseFloat(str));
      const dot = str.indexOf(".");
      if (dot !== -1 && str[str.length - 1] === "0") node.minFractionDigits = str.length - dot - 1;
      return node;
    },
    stringify: stringifyNumber.stringifyNumber,
  };
  exports.float = float;
  exports.floatExp = floatExp;
  exports.floatNaN = floatNaN;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS(function (exports) {
  var stringifyNumber = require_stringifyNumber();
  var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
  var intResolve = (str, offset, radix, { intAsBigInt }) =>
    intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
  function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value) && value >= 0) return prefix + value.toString(radix);
    return stringifyNumber.stringifyNumber(node);
  }
  var intOct = {
    identify: (value) => intIdentify(value) && value >= 0,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "OCT",
    test: /^0o[0-7]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
    stringify: (node) => intStringify(node, 8, "0o"),
  };
  var int = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^[-+]?[0-9]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber.stringifyNumber,
  };
  var intHex = {
    identify: (value) => intIdentify(value) && value >= 0,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "HEX",
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: (node) => intStringify(node, 16, "0x"),
  };
  exports.int = int;
  exports.intHex = intHex;
  exports.intOct = intOct;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS(function (exports) {
  var map = require_map();
  var _null = require_null();
  var seq = require_seq();
  var string = require_string();
  var bool = require_bool();
  var float = require_float();
  var int = require_int();
  var schema = [
    map.map,
    seq.seq,
    string.string,
    _null.nullTag,
    bool.boolTag,
    int.intOct,
    int.int,
    int.intHex,
    float.floatNaN,
    float.floatExp,
    float.float,
  ];
  exports.schema = schema;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var map = require_map();
  var seq = require_seq();
  function intIdentify(value) {
    return typeof value === "bigint" || Number.isInteger(value);
  }
  var stringifyJSON = ({ value }) => JSON.stringify(value);
  var jsonScalars = [
    {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify: stringifyJSON,
    },
    {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^null$/,
      resolve: () => null,
      stringify: stringifyJSON,
    },
    {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^true$|^false$/,
      resolve: (str) => str === "true",
      stringify: stringifyJSON,
    },
    {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: (str, _onError, { intAsBigInt }) => (intAsBigInt ? BigInt(str) : parseInt(str, 10)),
      stringify: ({ value }) => (intIdentify(value) ? value.toString() : JSON.stringify(value)),
    },
    {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: (str) => parseFloat(str),
      stringify: stringifyJSON,
    },
  ];
  var jsonError = {
    default: true,
    tag: "",
    test: /^/,
    resolve(str, onError) {
      onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
      return str;
    },
  };
  var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
  exports.schema = schema;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS(function (exports) {
  var node_buffer = __require("buffer");
  var Scalar = require_Scalar();
  var stringifyString = require_stringifyString();
  var binary = {
    identify: (value) => value instanceof Uint8Array,
    default: false,
    tag: "tag:yaml.org,2002:binary",
    resolve(src, onError) {
      if (typeof node_buffer.Buffer === "function") {
        return node_buffer.Buffer.from(src, "base64");
      } else if (typeof atob === "function") {
        const str = atob(src.replace(/[\n\r]/g, ""));
        const buffer = new Uint8Array(str.length);
        for (let i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i);
        return buffer;
      } else {
        onError(
          "This environment does not support reading binary tags; either Buffer or atob is required",
        );
        return src;
      }
    },
    stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
      if (!value) return "";
      const buf = value;
      let str;
      if (typeof node_buffer.Buffer === "function") {
        str =
          buf instanceof node_buffer.Buffer
            ? buf.toString("base64")
            : node_buffer.Buffer.from(buf.buffer).toString("base64");
      } else if (typeof btoa === "function") {
        let s = "";
        for (let i = 0; i < buf.length; ++i) s += String.fromCharCode(buf[i]);
        str = btoa(s);
      } else {
        throw new Error(
          "This environment does not support writing binary tags; either Buffer or btoa is required",
        );
      }
      type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        const lineWidth = Math.max(
          ctx.options.lineWidth - ctx.indent.length,
          ctx.options.minContentWidth,
        );
        const n = Math.ceil(str.length / lineWidth);
        const lines = new Array(n);
        for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
          lines[i] = str.substr(o, lineWidth);
        }
        str = lines.join(
          type === Scalar.Scalar.BLOCK_LITERAL
            ? `
`
            : " ",
        );
      }
      return stringifyString.stringifyString(
        { comment, type, value: str },
        ctx,
        onComment,
        onChompKeep,
      );
    },
  };
  exports.binary = binary;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS(function (exports) {
  var identity = require_identity();
  var Pair = require_Pair();
  var Scalar = require_Scalar();
  var YAMLSeq = require_YAMLSeq();
  function resolvePairs(seq, onError) {
    if (identity.isSeq(seq)) {
      for (let i = 0; i < seq.items.length; ++i) {
        let item = seq.items[i];
        if (identity.isPair(item)) continue;
        else if (identity.isMap(item)) {
          if (item.items.length > 1) onError("Each pair must have its own sequence indicator");
          const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
          if (item.commentBefore)
            pair.key.commentBefore = pair.key.commentBefore
              ? `${item.commentBefore}
${pair.key.commentBefore}`
              : item.commentBefore;
          if (item.comment) {
            const cn = pair.value ?? pair.key;
            cn.comment = cn.comment
              ? `${item.comment}
${cn.comment}`
              : item.comment;
          }
          item = pair;
        }
        seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
      }
    } else onError("Expected a sequence for this tag");
    return seq;
  }
  function createPairs(schema, iterable, ctx) {
    const { replacer } = ctx;
    const pairs = new YAMLSeq.YAMLSeq(schema);
    pairs.tag = "tag:yaml.org,2002:pairs";
    let i = 0;
    if (iterable && Symbol.iterator in Object(iterable))
      for (let it of iterable) {
        if (typeof replacer === "function") it = replacer.call(iterable, String(i++), it);
        let key, value;
        if (Array.isArray(it)) {
          if (it.length === 2) {
            key = it[0];
            value = it[1];
          } else throw new TypeError(`Expected [key, value] tuple: ${it}`);
        } else if (it && it instanceof Object) {
          const keys = Object.keys(it);
          if (keys.length === 1) {
            key = keys[0];
            value = it[key];
          } else {
            throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
          }
        } else {
          key = it;
        }
        pairs.items.push(Pair.createPair(key, value, ctx));
      }
    return pairs;
  }
  var pairs = {
    collection: "seq",
    default: false,
    tag: "tag:yaml.org,2002:pairs",
    resolve: resolvePairs,
    createNode: createPairs,
  };
  exports.createPairs = createPairs;
  exports.pairs = pairs;
  exports.resolvePairs = resolvePairs;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS(function (exports) {
  var identity = require_identity();
  var toJS = require_toJS();
  var YAMLMap = require_YAMLMap();
  var YAMLSeq = require_YAMLSeq();
  var pairs = require_pairs();

  class YAMLOMap extends YAMLSeq.YAMLSeq {
    constructor() {
      super();
      this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
      this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
      this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
      this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
      this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
      this.tag = YAMLOMap.tag;
    }
    toJSON(_, ctx) {
      if (!ctx) return super.toJSON(_);
      const map = new Map();
      if (ctx?.onCreate) ctx.onCreate(map);
      for (const pair of this.items) {
        let key, value;
        if (identity.isPair(pair)) {
          key = toJS.toJS(pair.key, "", ctx);
          value = toJS.toJS(pair.value, key, ctx);
        } else {
          key = toJS.toJS(pair, "", ctx);
        }
        if (map.has(key)) throw new Error("Ordered maps must not include duplicate keys");
        map.set(key, value);
      }
      return map;
    }
    static from(schema, iterable, ctx) {
      const pairs$1 = pairs.createPairs(schema, iterable, ctx);
      const omap = new this();
      omap.items = pairs$1.items;
      return omap;
    }
  }
  YAMLOMap.tag = "tag:yaml.org,2002:omap";
  var omap = {
    collection: "seq",
    identify: (value) => value instanceof Map,
    nodeClass: YAMLOMap,
    default: false,
    tag: "tag:yaml.org,2002:omap",
    resolve(seq, onError) {
      const pairs$1 = pairs.resolvePairs(seq, onError);
      const seenKeys = [];
      for (const { key } of pairs$1.items) {
        if (identity.isScalar(key)) {
          if (seenKeys.includes(key.value)) {
            onError(`Ordered maps must not include duplicate keys: ${key.value}`);
          } else {
            seenKeys.push(key.value);
          }
        }
      }
      return Object.assign(new YAMLOMap(), pairs$1);
    },
    createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx),
  };
  exports.YAMLOMap = YAMLOMap;
  exports.omap = omap;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  function boolStringify({ value, source }, ctx) {
    const boolObj = value ? trueTag : falseTag;
    if (source && boolObj.test.test(source)) return source;
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
  var trueTag = {
    identify: (value) => value === true,
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new Scalar.Scalar(true),
    stringify: boolStringify,
  };
  var falseTag = {
    identify: (value) => value === false,
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new Scalar.Scalar(false),
    stringify: boolStringify,
  };
  exports.falseTag = falseTag;
  exports.trueTag = trueTag;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var stringifyNumber = require_stringifyNumber();
  var floatNaN = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) =>
      str.slice(-3).toLowerCase() === "nan"
        ? NaN
        : str[0] === "-"
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber.stringifyNumber,
  };
  var floatExp = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "EXP",
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str.replace(/_/g, "")),
    stringify(node) {
      const num = Number(node.value);
      return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
    },
  };
  var float = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(str) {
      const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
      const dot = str.indexOf(".");
      if (dot !== -1) {
        const f = str.substring(dot + 1).replace(/_/g, "");
        if (f[f.length - 1] === "0") node.minFractionDigits = f.length;
      }
      return node;
    },
    stringify: stringifyNumber.stringifyNumber,
  };
  exports.float = float;
  exports.floatExp = floatExp;
  exports.floatNaN = floatNaN;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS(function (exports) {
  var stringifyNumber = require_stringifyNumber();
  var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
  function intResolve(str, offset, radix, { intAsBigInt }) {
    const sign = str[0];
    if (sign === "-" || sign === "+") offset += 1;
    str = str.substring(offset).replace(/_/g, "");
    if (intAsBigInt) {
      switch (radix) {
        case 2:
          str = `0b${str}`;
          break;
        case 8:
          str = `0o${str}`;
          break;
        case 16:
          str = `0x${str}`;
          break;
      }
      const n = BigInt(str);
      return sign === "-" ? BigInt(-1) * n : n;
    }
    const n = parseInt(str, radix);
    return sign === "-" ? -1 * n : n;
  }
  function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value)) {
      const str = value.toString(radix);
      return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
    }
    return stringifyNumber.stringifyNumber(node);
  }
  var intBin = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "BIN",
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
    stringify: (node) => intStringify(node, 2, "0b"),
  };
  var intOct = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "OCT",
    test: /^[-+]?0[0-7_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
    stringify: (node) => intStringify(node, 8, "0"),
  };
  var int = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber.stringifyNumber,
  };
  var intHex = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "HEX",
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: (node) => intStringify(node, 16, "0x"),
  };
  exports.int = int;
  exports.intBin = intBin;
  exports.intHex = intHex;
  exports.intOct = intOct;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS(function (exports) {
  var identity = require_identity();
  var Pair = require_Pair();
  var YAMLMap = require_YAMLMap();

  class YAMLSet extends YAMLMap.YAMLMap {
    constructor(schema) {
      super(schema);
      this.tag = YAMLSet.tag;
    }
    add(key) {
      let pair;
      if (identity.isPair(key)) pair = key;
      else if (
        key &&
        typeof key === "object" &&
        "key" in key &&
        "value" in key &&
        key.value === null
      )
        pair = new Pair.Pair(key.key, null);
      else pair = new Pair.Pair(key, null);
      const prev = YAMLMap.findPair(this.items, pair.key);
      if (!prev) this.items.push(pair);
    }
    get(key, keepPair) {
      const pair = YAMLMap.findPair(this.items, key);
      return !keepPair && identity.isPair(pair)
        ? identity.isScalar(pair.key)
          ? pair.key.value
          : pair.key
        : pair;
    }
    set(key, value) {
      if (typeof value !== "boolean")
        throw new Error(
          `Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`,
        );
      const prev = YAMLMap.findPair(this.items, key);
      if (prev && !value) {
        this.items.splice(this.items.indexOf(prev), 1);
      } else if (!prev && value) {
        this.items.push(new Pair.Pair(key));
      }
    }
    toJSON(_, ctx) {
      return super.toJSON(_, ctx, Set);
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx) return JSON.stringify(this);
      if (this.hasAllNullValues(true))
        return super.toString(
          Object.assign({}, ctx, { allNullValues: true }),
          onComment,
          onChompKeep,
        );
      else throw new Error("Set items must all have null values");
    }
    static from(schema, iterable, ctx) {
      const { replacer } = ctx;
      const set = new this(schema);
      if (iterable && Symbol.iterator in Object(iterable))
        for (let value of iterable) {
          if (typeof replacer === "function") value = replacer.call(iterable, value, value);
          set.items.push(Pair.createPair(value, null, ctx));
        }
      return set;
    }
  }
  YAMLSet.tag = "tag:yaml.org,2002:set";
  var set = {
    collection: "map",
    identify: (value) => value instanceof Set,
    nodeClass: YAMLSet,
    default: false,
    tag: "tag:yaml.org,2002:set",
    createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
    resolve(map, onError) {
      if (identity.isMap(map)) {
        if (map.hasAllNullValues(true)) return Object.assign(new YAMLSet(), map);
        else onError("Set items must all have null values");
      } else onError("Expected a mapping for this tag");
      return map;
    },
  };
  exports.YAMLSet = YAMLSet;
  exports.set = set;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS(function (exports) {
  var stringifyNumber = require_stringifyNumber();
  function parseSexagesimal(str, asBigInt) {
    const sign = str[0];
    const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
    const num = (n) => (asBigInt ? BigInt(n) : Number(n));
    const res = parts
      .replace(/_/g, "")
      .split(":")
      .reduce((res, p) => res * num(60) + num(p), num(0));
    return sign === "-" ? num(-1) * res : res;
  }
  function stringifySexagesimal(node) {
    let { value } = node;
    let num = (n) => n;
    if (typeof value === "bigint") num = (n) => BigInt(n);
    else if (isNaN(value) || !isFinite(value)) return stringifyNumber.stringifyNumber(node);
    let sign = "";
    if (value < 0) {
      sign = "-";
      value *= num(-1);
    }
    const _60 = num(60);
    const parts = [value % _60];
    if (value < 60) {
      parts.unshift(0);
    } else {
      value = (value - parts[0]) / _60;
      parts.unshift(value % _60);
      if (value >= 60) {
        value = (value - parts[0]) / _60;
        parts.unshift(value);
      }
    }
    return (
      sign +
      parts
        .map((n) => String(n).padStart(2, "0"))
        .join(":")
        .replace(/000000\d*$/, "")
    );
  }
  var intTime = {
    identify: (value) => typeof value === "bigint" || Number.isInteger(value),
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "TIME",
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
    stringify: stringifySexagesimal,
  };
  var floatTime = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "TIME",
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: (str) => parseSexagesimal(str, false),
    stringify: stringifySexagesimal,
  };
  var timestamp = {
    identify: (value) => value instanceof Date,
    default: true,
    tag: "tag:yaml.org,2002:timestamp",
    test: RegExp(
      "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})" +
        "(?:" +
        "(?:t|T|[ \\t]+)" +
        "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)" +
        "(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?" +
        ")?$",
    ),
    resolve(str) {
      const match = str.match(timestamp.test);
      if (!match) throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
      const [, year, month, day, hour, minute, second] = match.map(Number);
      const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
      let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
      const tz = match[8];
      if (tz && tz !== "Z") {
        let d = parseSexagesimal(tz, false);
        if (Math.abs(d) < 30) d *= 60;
        date -= 60000 * d;
      }
      return new Date(date);
    },
    stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? "",
  };
  exports.floatTime = floatTime;
  exports.intTime = intTime;
  exports.timestamp = timestamp;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS(function (exports) {
  var map = require_map();
  var _null = require_null();
  var seq = require_seq();
  var string = require_string();
  var binary = require_binary();
  var bool = require_bool2();
  var float = require_float2();
  var int = require_int2();
  var merge = require_merge();
  var omap = require_omap();
  var pairs = require_pairs();
  var set = require_set();
  var timestamp = require_timestamp();
  var schema = [
    map.map,
    seq.seq,
    string.string,
    _null.nullTag,
    bool.trueTag,
    bool.falseTag,
    int.intBin,
    int.intOct,
    int.int,
    int.intHex,
    float.floatNaN,
    float.floatExp,
    float.float,
    binary.binary,
    merge.merge,
    omap.omap,
    pairs.pairs,
    set.set,
    timestamp.intTime,
    timestamp.floatTime,
    timestamp.timestamp,
  ];
  exports.schema = schema;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS(function (exports) {
  var map = require_map();
  var _null = require_null();
  var seq = require_seq();
  var string = require_string();
  var bool = require_bool();
  var float = require_float();
  var int = require_int();
  var schema = require_schema();
  var schema$1 = require_schema2();
  var binary = require_binary();
  var merge = require_merge();
  var omap = require_omap();
  var pairs = require_pairs();
  var schema$2 = require_schema3();
  var set = require_set();
  var timestamp = require_timestamp();
  var schemas = new Map([
    ["core", schema.schema],
    ["failsafe", [map.map, seq.seq, string.string]],
    ["json", schema$1.schema],
    ["yaml11", schema$2.schema],
    ["yaml-1.1", schema$2.schema],
  ]);
  var tagsByName = {
    binary: binary.binary,
    bool: bool.boolTag,
    float: float.float,
    floatExp: float.floatExp,
    floatNaN: float.floatNaN,
    floatTime: timestamp.floatTime,
    int: int.int,
    intHex: int.intHex,
    intOct: int.intOct,
    intTime: timestamp.intTime,
    map: map.map,
    merge: merge.merge,
    null: _null.nullTag,
    omap: omap.omap,
    pairs: pairs.pairs,
    seq: seq.seq,
    set: set.set,
    timestamp: timestamp.timestamp,
  };
  var coreKnownTags = {
    "tag:yaml.org,2002:binary": binary.binary,
    "tag:yaml.org,2002:merge": merge.merge,
    "tag:yaml.org,2002:omap": omap.omap,
    "tag:yaml.org,2002:pairs": pairs.pairs,
    "tag:yaml.org,2002:set": set.set,
    "tag:yaml.org,2002:timestamp": timestamp.timestamp,
  };
  function getTags(customTags, schemaName, addMergeTag) {
    const schemaTags = schemas.get(schemaName);
    if (schemaTags && !customTags) {
      return addMergeTag && !schemaTags.includes(merge.merge)
        ? schemaTags.concat(merge.merge)
        : schemaTags.slice();
    }
    let tags = schemaTags;
    if (!tags) {
      if (Array.isArray(customTags)) tags = [];
      else {
        const keys = Array.from(schemas.keys())
          .filter((key) => key !== "yaml11")
          .map((key) => JSON.stringify(key))
          .join(", ");
        throw new Error(
          `Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`,
        );
      }
    }
    if (Array.isArray(customTags)) {
      for (const tag of customTags) tags = tags.concat(tag);
    } else if (typeof customTags === "function") {
      tags = customTags(tags.slice());
    }
    if (addMergeTag) tags = tags.concat(merge.merge);
    return tags.reduce((tags, tag) => {
      const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
      if (!tagObj) {
        const tagName = JSON.stringify(tag);
        const keys = Object.keys(tagsByName)
          .map((key) => JSON.stringify(key))
          .join(", ");
        throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
      }
      if (!tags.includes(tagObj)) tags.push(tagObj);
      return tags;
    }, []);
  }
  exports.coreKnownTags = coreKnownTags;
  exports.getTags = getTags;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS(function (exports) {
  var identity = require_identity();
  var map = require_map();
  var seq = require_seq();
  var string = require_string();
  var tags = require_tags();
  var sortMapEntriesByKey = (a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0);

  class Schema {
    constructor({
      compat,
      customTags,
      merge,
      resolveKnownTags,
      schema,
      sortMapEntries,
      toStringDefaults,
    }) {
      this.compat = Array.isArray(compat)
        ? tags.getTags(compat, "compat")
        : compat
          ? tags.getTags(null, compat)
          : null;
      this.name = (typeof schema === "string" && schema) || "core";
      this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
      this.tags = tags.getTags(customTags, this.name, merge);
      this.toStringOptions = toStringDefaults ?? null;
      Object.defineProperty(this, identity.MAP, { value: map.map });
      Object.defineProperty(this, identity.SCALAR, { value: string.string });
      Object.defineProperty(this, identity.SEQ, { value: seq.seq });
      this.sortMapEntries =
        typeof sortMapEntries === "function"
          ? sortMapEntries
          : sortMapEntries === true
            ? sortMapEntriesByKey
            : null;
    }
    clone() {
      const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
      copy.tags = this.tags.slice();
      return copy;
    }
  }
  exports.Schema = Schema;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS(function (exports) {
  var identity = require_identity();
  var stringify = require_stringify();
  var stringifyComment = require_stringifyComment();
  function stringifyDocument(doc, options) {
    const lines = [];
    let hasDirectives = options.directives === true;
    if (options.directives !== false && doc.directives) {
      const dir = doc.directives.toString(doc);
      if (dir) {
        lines.push(dir);
        hasDirectives = true;
      } else if (doc.directives.docStart) hasDirectives = true;
    }
    if (hasDirectives) lines.push("---");
    const ctx = stringify.createStringifyContext(doc, options);
    const { commentString } = ctx.options;
    if (doc.commentBefore) {
      if (lines.length !== 1) lines.unshift("");
      const cs = commentString(doc.commentBefore);
      lines.unshift(stringifyComment.indentComment(cs, ""));
    }
    let chompKeep = false;
    let contentComment = null;
    if (doc.contents) {
      if (identity.isNode(doc.contents)) {
        if (doc.contents.spaceBefore && hasDirectives) lines.push("");
        if (doc.contents.commentBefore) {
          const cs = commentString(doc.contents.commentBefore);
          lines.push(stringifyComment.indentComment(cs, ""));
        }
        ctx.forceBlockIndent = !!doc.comment;
        contentComment = doc.contents.comment;
      }
      const onChompKeep = contentComment ? undefined : () => (chompKeep = true);
      let body = stringify.stringify(doc.contents, ctx, () => (contentComment = null), onChompKeep);
      if (contentComment)
        body += stringifyComment.lineComment(body, "", commentString(contentComment));
      if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
        lines[lines.length - 1] = `--- ${body}`;
      } else lines.push(body);
    } else {
      lines.push(stringify.stringify(doc.contents, ctx));
    }
    if (doc.directives?.docEnd) {
      if (doc.comment) {
        const cs = commentString(doc.comment);
        if (
          cs.includes(`
`)
        ) {
          lines.push("...");
          lines.push(stringifyComment.indentComment(cs, ""));
        } else {
          lines.push(`... ${cs}`);
        }
      } else {
        lines.push("...");
      }
    } else {
      let dc = doc.comment;
      if (dc && chompKeep) dc = dc.replace(/^\n+/, "");
      if (dc) {
        if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "") lines.push("");
        lines.push(stringifyComment.indentComment(commentString(dc), ""));
      }
    }
    return (
      lines.join(`
`) +
      `
`
    );
  }
  exports.stringifyDocument = stringifyDocument;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS(function (exports) {
  var Alias = require_Alias();
  var Collection = require_Collection();
  var identity = require_identity();
  var Pair = require_Pair();
  var toJS = require_toJS();
  var Schema = require_Schema();
  var stringifyDocument = require_stringifyDocument();
  var anchors = require_anchors();
  var applyReviver = require_applyReviver();
  var createNode = require_createNode();
  var directives = require_directives();

  class Document {
    constructor(value, replacer, options) {
      this.commentBefore = null;
      this.comment = null;
      this.errors = [];
      this.warnings = [];
      Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === undefined && replacer) {
        options = replacer;
        replacer = undefined;
      }
      const opt = Object.assign(
        {
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2",
        },
        options,
      );
      this.options = opt;
      let { version } = opt;
      if (options?._directives) {
        this.directives = options._directives.atDocument();
        if (this.directives.yaml.explicit) version = this.directives.yaml.version;
      } else this.directives = new directives.Directives({ version });
      this.setSchema(version, options);
      this.contents = value === undefined ? null : this.createNode(value, _replacer, options);
    }
    clone() {
      const copy = Object.create(Document.prototype, {
        [identity.NODE_TYPE]: { value: identity.DOC },
      });
      copy.commentBefore = this.commentBefore;
      copy.comment = this.comment;
      copy.errors = this.errors.slice();
      copy.warnings = this.warnings.slice();
      copy.options = Object.assign({}, this.options);
      if (this.directives) copy.directives = this.directives.clone();
      copy.schema = this.schema.clone();
      copy.contents = identity.isNode(this.contents)
        ? this.contents.clone(copy.schema)
        : this.contents;
      if (this.range) copy.range = this.range.slice();
      return copy;
    }
    add(value) {
      if (assertCollection(this.contents)) this.contents.add(value);
    }
    addIn(path, value) {
      if (assertCollection(this.contents)) this.contents.addIn(path, value);
    }
    createAlias(node, name) {
      if (!node.anchor) {
        const prev = anchors.anchorNames(this);
        node.anchor = !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
      }
      return new Alias.Alias(node.anchor);
    }
    createNode(value, replacer, options) {
      let _replacer = undefined;
      if (typeof replacer === "function") {
        value = replacer.call({ "": value }, "", value);
        _replacer = replacer;
      } else if (Array.isArray(replacer)) {
        const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
        const asStr = replacer.filter(keyToStr).map(String);
        if (asStr.length > 0) replacer = replacer.concat(asStr);
        _replacer = replacer;
      } else if (options === undefined && replacer) {
        options = replacer;
        replacer = undefined;
      }
      const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } =
        options ?? {};
      const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
        this,
        anchorPrefix || "a",
      );
      const ctx = {
        aliasDuplicateObjects: aliasDuplicateObjects ?? true,
        keepUndefined: keepUndefined ?? false,
        onAnchor,
        onTagObj,
        replacer: _replacer,
        schema: this.schema,
        sourceObjects,
      };
      const node = createNode.createNode(value, tag, ctx);
      if (flow && identity.isCollection(node)) node.flow = true;
      setAnchors();
      return node;
    }
    createPair(key, value, options = {}) {
      const k = this.createNode(key, null, options);
      const v = this.createNode(value, null, options);
      return new Pair.Pair(k, v);
    }
    delete(key) {
      return assertCollection(this.contents) ? this.contents.delete(key) : false;
    }
    deleteIn(path) {
      if (Collection.isEmptyPath(path)) {
        if (this.contents == null) return false;
        this.contents = null;
        return true;
      }
      return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
    }
    get(key, keepScalar) {
      return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : undefined;
    }
    getIn(path, keepScalar) {
      if (Collection.isEmptyPath(path))
        return !keepScalar && identity.isScalar(this.contents)
          ? this.contents.value
          : this.contents;
      return identity.isCollection(this.contents)
        ? this.contents.getIn(path, keepScalar)
        : undefined;
    }
    has(key) {
      return identity.isCollection(this.contents) ? this.contents.has(key) : false;
    }
    hasIn(path) {
      if (Collection.isEmptyPath(path)) return this.contents !== undefined;
      return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
    }
    set(key, value) {
      if (this.contents == null) {
        this.contents = Collection.collectionFromPath(this.schema, [key], value);
      } else if (assertCollection(this.contents)) {
        this.contents.set(key, value);
      }
    }
    setIn(path, value) {
      if (Collection.isEmptyPath(path)) {
        this.contents = value;
      } else if (this.contents == null) {
        this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
      } else if (assertCollection(this.contents)) {
        this.contents.setIn(path, value);
      }
    }
    setSchema(version, options = {}) {
      if (typeof version === "number") version = String(version);
      let opt;
      switch (version) {
        case "1.1":
          if (this.directives) this.directives.yaml.version = "1.1";
          else this.directives = new directives.Directives({ version: "1.1" });
          opt = { resolveKnownTags: false, schema: "yaml-1.1" };
          break;
        case "1.2":
        case "next":
          if (this.directives) this.directives.yaml.version = version;
          else this.directives = new directives.Directives({ version });
          opt = { resolveKnownTags: true, schema: "core" };
          break;
        case null:
          if (this.directives) delete this.directives;
          opt = null;
          break;
        default: {
          const sv = JSON.stringify(version);
          throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
        }
      }
      if (options.schema instanceof Object) this.schema = options.schema;
      else if (opt) this.schema = new Schema.Schema(Object.assign(opt, options));
      else throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
    }
    toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
      const ctx = {
        anchors: new Map(),
        doc: this,
        keep: !json,
        mapAsMap: mapAsMap === true,
        mapKeyWarned: false,
        maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100,
      };
      const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
      if (typeof onAnchor === "function")
        for (const { count, res } of ctx.anchors.values()) onAnchor(res, count);
      return typeof reviver === "function"
        ? applyReviver.applyReviver(reviver, { "": res }, "", res)
        : res;
    }
    toJSON(jsonArg, onAnchor) {
      return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
    }
    toString(options = {}) {
      if (this.errors.length > 0) throw new Error("Document with errors cannot be stringified");
      if (
        "indent" in options &&
        (!Number.isInteger(options.indent) || Number(options.indent) <= 0)
      ) {
        const s = JSON.stringify(options.indent);
        throw new Error(`"indent" option must be a positive integer, not ${s}`);
      }
      return stringifyDocument.stringifyDocument(this, options);
    }
  }
  function assertCollection(contents) {
    if (identity.isCollection(contents)) return true;
    throw new Error("Expected a YAML collection as document contents");
  }
  exports.Document = Document;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/errors.js
var require_errors = __commonJS(function (exports) {
  class YAMLError extends Error {
    constructor(name, pos, code, message) {
      super();
      this.name = name;
      this.code = code;
      this.message = message;
      this.pos = pos;
    }
  }

  class YAMLParseError extends YAMLError {
    constructor(pos, code, message) {
      super("YAMLParseError", pos, code, message);
    }
  }

  class YAMLWarning extends YAMLError {
    constructor(pos, code, message) {
      super("YAMLWarning", pos, code, message);
    }
  }
  var prettifyError = (src, lc) => (error) => {
    if (error.pos[0] === -1) return;
    error.linePos = error.pos.map((pos) => lc.linePos(pos));
    const { line, col } = error.linePos[0];
    error.message += ` at line ${line}, column ${col}`;
    let ci = col - 1;
    let lineStr = src
      .substring(lc.lineStarts[line - 1], lc.lineStarts[line])
      .replace(/[\n\r]+$/, "");
    if (ci >= 60 && lineStr.length > 80) {
      const trimStart = Math.min(ci - 39, lineStr.length - 79);
      lineStr = "…" + lineStr.substring(trimStart);
      ci -= trimStart - 1;
    }
    if (lineStr.length > 80) lineStr = lineStr.substring(0, 79) + "…";
    if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
      let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
      if (prev.length > 80)
        prev =
          prev.substring(0, 79) +
          `…
`;
      lineStr = prev + lineStr;
    }
    if (/[^ ]/.test(lineStr)) {
      let count = 1;
      const end = error.linePos[1];
      if (end?.line === line && end.col > col) {
        count = Math.max(1, Math.min(end.col - col, 80 - ci));
      }
      const pointer = " ".repeat(ci) + "^".repeat(count);
      error.message += `:

${lineStr}
${pointer}
`;
    }
  };
  exports.YAMLError = YAMLError;
  exports.YAMLParseError = YAMLParseError;
  exports.YAMLWarning = YAMLWarning;
  exports.prettifyError = prettifyError;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS(function (exports) {
  function resolveProps(
    tokens,
    { flow, indicator, next, offset, onError, parentIndent, startOnNewline },
  ) {
    let spaceBefore = false;
    let atNewline = startOnNewline;
    let hasSpace = startOnNewline;
    let comment = "";
    let commentSep = "";
    let hasNewline = false;
    let reqSpace = false;
    let tab = null;
    let anchor = null;
    let tag = null;
    let newlineAfterProp = null;
    let comma = null;
    let found = null;
    let start = null;
    for (const token of tokens) {
      if (reqSpace) {
        if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
          onError(
            token.offset,
            "MISSING_CHAR",
            "Tags and anchors must be separated from the next token by white space",
          );
        reqSpace = false;
      }
      if (tab) {
        if (atNewline && token.type !== "comment" && token.type !== "newline") {
          onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
        }
        tab = null;
      }
      switch (token.type) {
        case "space":
          if (
            !flow &&
            (indicator !== "doc-start" || next?.type !== "flow-collection") &&
            token.source.includes("\t")
          ) {
            tab = token;
          }
          hasSpace = true;
          break;
        case "comment": {
          if (!hasSpace)
            onError(
              token,
              "MISSING_CHAR",
              "Comments must be separated from other tokens by white space characters",
            );
          const cb = token.source.substring(1) || " ";
          if (!comment) comment = cb;
          else comment += commentSep + cb;
          commentSep = "";
          atNewline = false;
          break;
        }
        case "newline":
          if (atNewline) {
            if (comment) comment += token.source;
            else if (!found || indicator !== "seq-item-ind") spaceBefore = true;
          } else commentSep += token.source;
          atNewline = true;
          hasNewline = true;
          if (anchor || tag) newlineAfterProp = token;
          hasSpace = true;
          break;
        case "anchor":
          if (anchor) onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
          if (token.source.endsWith(":"))
            onError(
              token.offset + token.source.length - 1,
              "BAD_ALIAS",
              "Anchor ending in : is ambiguous",
              true,
            );
          anchor = token;
          start ?? (start = token.offset);
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        case "tag": {
          if (tag) onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
          tag = token;
          start ?? (start = token.offset);
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        }
        case indicator:
          if (anchor || tag)
            onError(
              token,
              "BAD_PROP_ORDER",
              `Anchors and tags must be after the ${token.source} indicator`,
            );
          if (found)
            onError(
              token,
              "UNEXPECTED_TOKEN",
              `Unexpected ${token.source} in ${flow ?? "collection"}`,
            );
          found = token;
          atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
          hasSpace = false;
          break;
        case "comma":
          if (flow) {
            if (comma) onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
            comma = token;
            atNewline = false;
            hasSpace = false;
            break;
          }
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
          atNewline = false;
          hasSpace = false;
      }
    }
    const last = tokens[tokens.length - 1];
    const end = last ? last.offset + last.source.length : offset;
    if (
      reqSpace &&
      next &&
      next.type !== "space" &&
      next.type !== "newline" &&
      next.type !== "comma" &&
      (next.type !== "scalar" || next.source !== "")
    ) {
      onError(
        next.offset,
        "MISSING_CHAR",
        "Tags and anchors must be separated from the next token by white space",
      );
    }
    if (
      tab &&
      ((atNewline && tab.indent <= parentIndent) ||
        next?.type === "block-map" ||
        next?.type === "block-seq")
    )
      onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
    return {
      comma,
      found,
      spaceBefore,
      comment,
      hasNewline,
      anchor,
      tag,
      newlineAfterProp,
      end,
      start: start ?? end,
    };
  }
  exports.resolveProps = resolveProps;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS(function (exports) {
  function containsNewline(key) {
    if (!key) return null;
    switch (key.type) {
      case "alias":
      case "scalar":
      case "double-quoted-scalar":
      case "single-quoted-scalar":
        if (
          key.source.includes(`
`)
        )
          return true;
        if (key.end) {
          for (const st of key.end) if (st.type === "newline") return true;
        }
        return false;
      case "flow-collection":
        for (const it of key.items) {
          for (const st of it.start) if (st.type === "newline") return true;
          if (it.sep) {
            for (const st of it.sep) if (st.type === "newline") return true;
          }
          if (containsNewline(it.key) || containsNewline(it.value)) return true;
        }
        return false;
      default:
        return true;
    }
  }
  exports.containsNewline = containsNewline;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS(function (exports) {
  var utilContainsNewline = require_util_contains_newline();
  function flowIndentCheck(indent, fc, onError) {
    if (fc?.type === "flow-collection") {
      const end = fc.end[0];
      if (
        end.indent === indent &&
        (end.source === "]" || end.source === "}") &&
        utilContainsNewline.containsNewline(fc)
      ) {
        const msg = "Flow end indicator should be more indented than parent";
        onError(end, "BAD_INDENT", msg, true);
      }
    }
  }
  exports.flowIndentCheck = flowIndentCheck;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS(function (exports) {
  var identity = require_identity();
  function mapIncludes(ctx, items, search) {
    const { uniqueKeys } = ctx.options;
    if (uniqueKeys === false) return false;
    const isEqual =
      typeof uniqueKeys === "function"
        ? uniqueKeys
        : (a, b) =>
            a === b || (identity.isScalar(a) && identity.isScalar(b) && a.value === b.value);
    return items.some((pair) => isEqual(pair.key, search));
  }
  exports.mapIncludes = mapIncludes;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS(function (exports) {
  var Pair = require_Pair();
  var YAMLMap = require_YAMLMap();
  var resolveProps = require_resolve_props();
  var utilContainsNewline = require_util_contains_newline();
  var utilFlowIndentCheck = require_util_flow_indent_check();
  var utilMapIncludes = require_util_map_includes();
  var startColMsg = "All mapping items must start at the same column";
  function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
    const map = new NodeClass(ctx.schema);
    if (ctx.atRoot) ctx.atRoot = false;
    let offset = bm.offset;
    let commentEnd = null;
    for (const collItem of bm.items) {
      const { start, key, sep, value } = collItem;
      const keyProps = resolveProps.resolveProps(start, {
        indicator: "explicit-key-ind",
        next: key ?? sep?.[0],
        offset,
        onError,
        parentIndent: bm.indent,
        startOnNewline: true,
      });
      const implicitKey = !keyProps.found;
      if (implicitKey) {
        if (key) {
          if (key.type === "block-seq")
            onError(
              offset,
              "BLOCK_AS_IMPLICIT_KEY",
              "A block sequence may not be used as an implicit map key",
            );
          else if ("indent" in key && key.indent !== bm.indent)
            onError(offset, "BAD_INDENT", startColMsg);
        }
        if (!keyProps.anchor && !keyProps.tag && !sep) {
          commentEnd = keyProps.end;
          if (keyProps.comment) {
            if (map.comment)
              map.comment +=
                `
` + keyProps.comment;
            else map.comment = keyProps.comment;
          }
          continue;
        }
        if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
          onError(
            key ?? start[start.length - 1],
            "MULTILINE_IMPLICIT_KEY",
            "Implicit keys need to be on a single line",
          );
        }
      } else if (keyProps.found?.indent !== bm.indent) {
        onError(offset, "BAD_INDENT", startColMsg);
      }
      ctx.atKey = true;
      const keyStart = keyProps.end;
      const keyNode = key
        ? composeNode(ctx, key, keyProps, onError)
        : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
      if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
      ctx.atKey = false;
      if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
        onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
      const valueProps = resolveProps.resolveProps(sep ?? [], {
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: bm.indent,
        startOnNewline: !key || key.type === "block-scalar",
      });
      offset = valueProps.end;
      if (valueProps.found) {
        if (implicitKey) {
          if (value?.type === "block-map" && !valueProps.hasNewline)
            onError(
              offset,
              "BLOCK_AS_IMPLICIT_KEY",
              "Nested mappings are not allowed in compact mappings",
            );
          if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
            onError(
              keyNode.range,
              "KEY_OVER_1024_CHARS",
              "The : indicator must be at most 1024 chars after the start of an implicit block mapping key",
            );
        }
        const valueNode = value
          ? composeNode(ctx, value, valueProps, onError)
          : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
        if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
        offset = valueNode.range[2];
        const pair = new Pair.Pair(keyNode, valueNode);
        if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
        map.items.push(pair);
      } else {
        if (implicitKey)
          onError(
            keyNode.range,
            "MISSING_CHAR",
            "Implicit map keys need to be followed by map values",
          );
        if (valueProps.comment) {
          if (keyNode.comment)
            keyNode.comment +=
              `
` + valueProps.comment;
          else keyNode.comment = valueProps.comment;
        }
        const pair = new Pair.Pair(keyNode);
        if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
        map.items.push(pair);
      }
    }
    if (commentEnd && commentEnd < offset)
      onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
    map.range = [bm.offset, offset, commentEnd ?? offset];
    return map;
  }
  exports.resolveBlockMap = resolveBlockMap;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS(function (exports) {
  var YAMLSeq = require_YAMLSeq();
  var resolveProps = require_resolve_props();
  var utilFlowIndentCheck = require_util_flow_indent_check();
  function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
    const seq = new NodeClass(ctx.schema);
    if (ctx.atRoot) ctx.atRoot = false;
    if (ctx.atKey) ctx.atKey = false;
    let offset = bs.offset;
    let commentEnd = null;
    for (const { start, value } of bs.items) {
      const props = resolveProps.resolveProps(start, {
        indicator: "seq-item-ind",
        next: value,
        offset,
        onError,
        parentIndent: bs.indent,
        startOnNewline: true,
      });
      if (!props.found) {
        if (props.anchor || props.tag || value) {
          if (value?.type === "block-seq")
            onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
          else onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
        } else {
          commentEnd = props.end;
          if (props.comment) seq.comment = props.comment;
          continue;
        }
      }
      const node = value
        ? composeNode(ctx, value, props, onError)
        : composeEmptyNode(ctx, props.end, start, null, props, onError);
      if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
      offset = node.range[2];
      seq.items.push(node);
    }
    seq.range = [bs.offset, offset, commentEnd ?? offset];
    return seq;
  }
  exports.resolveBlockSeq = resolveBlockSeq;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS(function (exports) {
  function resolveEnd(end, offset, reqSpace, onError) {
    let comment = "";
    if (end) {
      let hasSpace = false;
      let sep = "";
      for (const token of end) {
        const { source, type } = token;
        switch (type) {
          case "space":
            hasSpace = true;
            break;
          case "comment": {
            if (reqSpace && !hasSpace)
              onError(
                token,
                "MISSING_CHAR",
                "Comments must be separated from other tokens by white space characters",
              );
            const cb = source.substring(1) || " ";
            if (!comment) comment = cb;
            else comment += sep + cb;
            sep = "";
            break;
          }
          case "newline":
            if (comment) sep += source;
            hasSpace = true;
            break;
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
        }
        offset += source.length;
      }
    }
    return { comment, offset };
  }
  exports.resolveEnd = resolveEnd;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS(function (exports) {
  var identity = require_identity();
  var Pair = require_Pair();
  var YAMLMap = require_YAMLMap();
  var YAMLSeq = require_YAMLSeq();
  var resolveEnd = require_resolve_end();
  var resolveProps = require_resolve_props();
  var utilContainsNewline = require_util_contains_newline();
  var utilMapIncludes = require_util_map_includes();
  var blockMsg = "Block collections are not allowed within flow collections";
  var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
  function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
    const isMap = fc.start.source === "{";
    const fcName = isMap ? "flow map" : "flow sequence";
    const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
    const coll = new NodeClass(ctx.schema);
    coll.flow = true;
    const atRoot = ctx.atRoot;
    if (atRoot) ctx.atRoot = false;
    if (ctx.atKey) ctx.atKey = false;
    let offset = fc.offset + fc.start.source.length;
    for (let i = 0; i < fc.items.length; ++i) {
      const collItem = fc.items[i];
      const { start, key, sep, value } = collItem;
      const props = resolveProps.resolveProps(start, {
        flow: fcName,
        indicator: "explicit-key-ind",
        next: key ?? sep?.[0],
        offset,
        onError,
        parentIndent: fc.indent,
        startOnNewline: false,
      });
      if (!props.found) {
        if (!props.anchor && !props.tag && !sep && !value) {
          if (i === 0 && props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
          else if (i < fc.items.length - 1)
            onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
          if (props.comment) {
            if (coll.comment)
              coll.comment +=
                `
` + props.comment;
            else coll.comment = props.comment;
          }
          offset = props.end;
          continue;
        }
        if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
          onError(
            key,
            "MULTILINE_IMPLICIT_KEY",
            "Implicit keys of flow sequence pairs need to be on a single line",
          );
      }
      if (i === 0) {
        if (props.comma) onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
      } else {
        if (!props.comma) onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
        if (props.comment) {
          let prevItemComment = "";
          loop: for (const st of start) {
            switch (st.type) {
              case "comma":
              case "space":
                break;
              case "comment":
                prevItemComment = st.source.substring(1);
                break loop;
              default:
                break loop;
            }
          }
          if (prevItemComment) {
            let prev = coll.items[coll.items.length - 1];
            if (identity.isPair(prev)) prev = prev.value ?? prev.key;
            if (prev.comment)
              prev.comment +=
                `
` + prevItemComment;
            else prev.comment = prevItemComment;
            props.comment = props.comment.substring(prevItemComment.length + 1);
          }
        }
      }
      if (!isMap && !sep && !props.found) {
        const valueNode = value
          ? composeNode(ctx, value, props, onError)
          : composeEmptyNode(ctx, props.end, sep, null, props, onError);
        coll.items.push(valueNode);
        offset = valueNode.range[2];
        if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else {
        ctx.atKey = true;
        const keyStart = props.end;
        const keyNode = key
          ? composeNode(ctx, key, props, onError)
          : composeEmptyNode(ctx, keyStart, start, null, props, onError);
        if (isBlock(key)) onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
        ctx.atKey = false;
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          flow: fcName,
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: fc.indent,
          startOnNewline: false,
        });
        if (valueProps.found) {
          if (!isMap && !props.found && ctx.options.strict) {
            if (sep)
              for (const st of sep) {
                if (st === valueProps.found) break;
                if (st.type === "newline") {
                  onError(
                    st,
                    "MULTILINE_IMPLICIT_KEY",
                    "Implicit keys of flow sequence pairs need to be on a single line",
                  );
                  break;
                }
              }
            if (props.start < valueProps.found.offset - 1024)
              onError(
                valueProps.found,
                "KEY_OVER_1024_CHARS",
                "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key",
              );
          }
        } else if (value) {
          if ("source" in value && value.source?.[0] === ":")
            onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
          else onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
        }
        const valueNode = value
          ? composeNode(ctx, value, valueProps, onError)
          : valueProps.found
            ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError)
            : null;
        if (valueNode) {
          if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else if (valueProps.comment) {
          if (keyNode.comment)
            keyNode.comment +=
              `
` + valueProps.comment;
          else keyNode.comment = valueProps.comment;
        }
        const pair = new Pair.Pair(keyNode, valueNode);
        if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
        if (isMap) {
          const map = coll;
          if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
            onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
          map.items.push(pair);
        } else {
          const map = new YAMLMap.YAMLMap(ctx.schema);
          map.flow = true;
          map.items.push(pair);
          const endRange = (valueNode ?? keyNode).range;
          map.range = [keyNode.range[0], endRange[1], endRange[2]];
          coll.items.push(map);
        }
        offset = valueNode ? valueNode.range[2] : valueProps.end;
      }
    }
    const expectedEnd = isMap ? "}" : "]";
    const [ce, ...ee] = fc.end;
    let cePos = offset;
    if (ce?.source === expectedEnd) cePos = ce.offset + ce.source.length;
    else {
      const name = fcName[0].toUpperCase() + fcName.substring(1);
      const msg = atRoot
        ? `${name} must end with a ${expectedEnd}`
        : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
      onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
      if (ce && ce.source.length !== 1) ee.unshift(ce);
    }
    if (ee.length > 0) {
      const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
      if (end.comment) {
        if (coll.comment)
          coll.comment +=
            `
` + end.comment;
        else coll.comment = end.comment;
      }
      coll.range = [fc.offset, cePos, end.offset];
    } else {
      coll.range = [fc.offset, cePos, cePos];
    }
    return coll;
  }
  exports.resolveFlowCollection = resolveFlowCollection;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS(function (exports) {
  var identity = require_identity();
  var Scalar = require_Scalar();
  var YAMLMap = require_YAMLMap();
  var YAMLSeq = require_YAMLSeq();
  var resolveBlockMap = require_resolve_block_map();
  var resolveBlockSeq = require_resolve_block_seq();
  var resolveFlowCollection = require_resolve_flow_collection();
  function resolveCollection(CN, ctx, token, onError, tagName, tag) {
    const coll =
      token.type === "block-map"
        ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag)
        : token.type === "block-seq"
          ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag)
          : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
    const Coll = coll.constructor;
    if (tagName === "!" || tagName === Coll.tagName) {
      coll.tag = Coll.tagName;
      return coll;
    }
    if (tagName) coll.tag = tagName;
    return coll;
  }
  function composeCollection(CN, ctx, token, props, onError) {
    const tagToken = props.tag;
    const tagName = !tagToken
      ? null
      : ctx.directives.tagName(tagToken.source, (msg) =>
          onError(tagToken, "TAG_RESOLVE_FAILED", msg),
        );
    if (token.type === "block-seq") {
      const { anchor, newlineAfterProp: nl } = props;
      const lastProp =
        anchor && tagToken
          ? anchor.offset > tagToken.offset
            ? anchor
            : tagToken
          : (anchor ?? tagToken);
      if (lastProp && (!nl || nl.offset < lastProp.offset)) {
        const message = "Missing newline after block sequence props";
        onError(lastProp, "MISSING_CHAR", message);
      }
    }
    const expType =
      token.type === "block-map"
        ? "map"
        : token.type === "block-seq"
          ? "seq"
          : token.start.source === "{"
            ? "map"
            : "seq";
    if (
      !tagToken ||
      !tagName ||
      tagName === "!" ||
      (tagName === YAMLMap.YAMLMap.tagName && expType === "map") ||
      (tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq")
    ) {
      return resolveCollection(CN, ctx, token, onError, tagName);
    }
    let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
    if (!tag) {
      const kt = ctx.schema.knownTags[tagName];
      if (kt?.collection === expType) {
        ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
        tag = kt;
      } else {
        if (kt) {
          onError(
            tagToken,
            "BAD_COLLECTION_TYPE",
            `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`,
            true,
          );
        } else {
          onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
        }
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
    }
    const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
    const res =
      tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ??
      coll;
    const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
    node.range = coll.range;
    node.tag = tagName;
    if (tag?.format) node.format = tag.format;
    return node;
  }
  exports.composeCollection = composeCollection;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  function resolveBlockScalar(ctx, scalar, onError) {
    const start = scalar.offset;
    const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
    if (!header) return { value: "", type: null, comment: "", range: [start, start, start] };
    const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
    const lines = scalar.source ? splitLines(scalar.source) : [];
    let chompStart = lines.length;
    for (let i = lines.length - 1; i >= 0; --i) {
      const content = lines[i][1];
      if (content === "" || content === "\r") chompStart = i;
      else break;
    }
    if (chompStart === 0) {
      const value =
        header.chomp === "+" && lines.length > 0
          ? `
`.repeat(Math.max(1, lines.length - 1))
          : "";
      let end = start + header.length;
      if (scalar.source) end += scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    let trimIndent = scalar.indent + header.indent;
    let offset = scalar.offset + header.length;
    let contentStart = 0;
    for (let i = 0; i < chompStart; ++i) {
      const [indent, content] = lines[i];
      if (content === "" || content === "\r") {
        if (header.indent === 0 && indent.length > trimIndent) trimIndent = indent.length;
      } else {
        if (indent.length < trimIndent) {
          const message =
            "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
          onError(offset + indent.length, "MISSING_CHAR", message);
        }
        if (header.indent === 0) trimIndent = indent.length;
        contentStart = i;
        if (trimIndent === 0 && !ctx.atRoot) {
          const message = "Block scalar values in collections must be indented";
          onError(offset, "BAD_INDENT", message);
        }
        break;
      }
      offset += indent.length + content.length + 1;
    }
    for (let i = lines.length - 1; i >= chompStart; --i) {
      if (lines[i][0].length > trimIndent) chompStart = i + 1;
    }
    let value = "";
    let sep = "";
    let prevMoreIndented = false;
    for (let i = 0; i < contentStart; ++i)
      value +=
        lines[i][0].slice(trimIndent) +
        `
`;
    for (let i = contentStart; i < chompStart; ++i) {
      let [indent, content] = lines[i];
      offset += indent.length + content.length + 1;
      const crlf = content[content.length - 1] === "\r";
      if (crlf) content = content.slice(0, -1);
      if (content && indent.length < trimIndent) {
        const src = header.indent ? "explicit indentation indicator" : "first line";
        const message = `Block scalar lines must not be less indented than their ${src}`;
        onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
        indent = "";
      }
      if (type === Scalar.Scalar.BLOCK_LITERAL) {
        value += sep + indent.slice(trimIndent) + content;
        sep = `
`;
      } else if (indent.length > trimIndent || content[0] === "\t") {
        if (sep === " ")
          sep = `
`;
        else if (
          !prevMoreIndented &&
          sep ===
            `
`
        )
          sep = `

`;
        value += sep + indent.slice(trimIndent) + content;
        sep = `
`;
        prevMoreIndented = true;
      } else if (content === "") {
        if (
          sep ===
          `
`
        )
          value += `
`;
        else
          sep = `
`;
      } else {
        value += sep + content;
        sep = " ";
        prevMoreIndented = false;
      }
    }
    switch (header.chomp) {
      case "-":
        break;
      case "+":
        for (let i = chompStart; i < lines.length; ++i)
          value +=
            `
` + lines[i][0].slice(trimIndent);
        if (
          value[value.length - 1] !==
          `
`
        )
          value += `
`;
        break;
      default:
        value += `
`;
    }
    const end = start + header.length + scalar.source.length;
    return { value, type, comment: header.comment, range: [start, end, end] };
  }
  function parseBlockScalarHeader({ offset, props }, strict, onError) {
    if (props[0].type !== "block-scalar-header") {
      onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
      return null;
    }
    const { source } = props[0];
    const mode = source[0];
    let indent = 0;
    let chomp = "";
    let error = -1;
    for (let i = 1; i < source.length; ++i) {
      const ch = source[i];
      if (!chomp && (ch === "-" || ch === "+")) chomp = ch;
      else {
        const n = Number(ch);
        if (!indent && n) indent = n;
        else if (error === -1) error = offset + i;
      }
    }
    if (error !== -1)
      onError(
        error,
        "UNEXPECTED_TOKEN",
        `Block scalar header includes extra characters: ${source}`,
      );
    let hasSpace = false;
    let comment = "";
    let length = source.length;
    for (let i = 1; i < props.length; ++i) {
      const token = props[i];
      switch (token.type) {
        case "space":
          hasSpace = true;
        case "newline":
          length += token.source.length;
          break;
        case "comment":
          if (strict && !hasSpace) {
            const message =
              "Comments must be separated from other tokens by white space characters";
            onError(token, "MISSING_CHAR", message);
          }
          length += token.source.length;
          comment = token.source.substring(1);
          break;
        case "error":
          onError(token, "UNEXPECTED_TOKEN", token.message);
          length += token.source.length;
          break;
        default: {
          const message = `Unexpected token in block scalar header: ${token.type}`;
          onError(token, "UNEXPECTED_TOKEN", message);
          const ts = token.source;
          if (ts && typeof ts === "string") length += ts.length;
        }
      }
    }
    return { mode, indent, chomp, comment, length };
  }
  function splitLines(source) {
    const split = source.split(/\n( *)/);
    const first = split[0];
    const m = first.match(/^( *)/);
    const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
    const lines = [line0];
    for (let i = 1; i < split.length; i += 2) lines.push([split[i], split[i + 1]]);
    return lines;
  }
  exports.resolveBlockScalar = resolveBlockScalar;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS(function (exports) {
  var Scalar = require_Scalar();
  var resolveEnd = require_resolve_end();
  function resolveFlowScalar(scalar, strict, onError) {
    const { offset, type, source, end } = scalar;
    let _type;
    let value;
    const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
    switch (type) {
      case "scalar":
        _type = Scalar.Scalar.PLAIN;
        value = plainValue(source, _onError);
        break;
      case "single-quoted-scalar":
        _type = Scalar.Scalar.QUOTE_SINGLE;
        value = singleQuotedValue(source, _onError);
        break;
      case "double-quoted-scalar":
        _type = Scalar.Scalar.QUOTE_DOUBLE;
        value = doubleQuotedValue(source, _onError);
        break;
      default:
        onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
        return {
          value: "",
          type: null,
          comment: "",
          range: [offset, offset + source.length, offset + source.length],
        };
    }
    const valueEnd = offset + source.length;
    const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
    return {
      value,
      type: _type,
      comment: re.comment,
      range: [offset, valueEnd, re.offset],
    };
  }
  function plainValue(source, onError) {
    let badChar = "";
    switch (source[0]) {
      case "\t":
        badChar = "a tab character";
        break;
      case ",":
        badChar = "flow indicator character ,";
        break;
      case "%":
        badChar = "directive indicator character %";
        break;
      case "|":
      case ">": {
        badChar = `block scalar indicator ${source[0]}`;
        break;
      }
      case "@":
      case "`": {
        badChar = `reserved character ${source[0]}`;
        break;
      }
    }
    if (badChar) onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
    return foldLines(source);
  }
  function singleQuotedValue(source, onError) {
    if (source[source.length - 1] !== "'" || source.length === 1)
      onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
    return foldLines(source.slice(1, -1)).replace(/''/g, "'");
  }
  function foldLines(source) {
    let first, line;
    try {
      first = new RegExp(
        `(.*?)(?<![ 	])[ 	]*\r?
`,
        "sy",
      );
      line = new RegExp(
        `[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,
        "sy",
      );
    } catch {
      first = /(.*?)[ \t]*\r?\n/sy;
      line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
    }
    let match = first.exec(source);
    if (!match) return source;
    let res = match[1];
    let sep = " ";
    let pos = first.lastIndex;
    line.lastIndex = pos;
    while ((match = line.exec(source))) {
      if (match[1] === "") {
        if (
          sep ===
          `
`
        )
          res += sep;
        else
          sep = `
`;
      } else {
        res += sep + match[1];
        sep = " ";
      }
      pos = line.lastIndex;
    }
    const last = /[ \t]*(.*)/sy;
    last.lastIndex = pos;
    match = last.exec(source);
    return res + sep + (match?.[1] ?? "");
  }
  function doubleQuotedValue(source, onError) {
    let res = "";
    for (let i = 1; i < source.length - 1; ++i) {
      const ch = source[i];
      if (
        ch === "\r" &&
        source[i + 1] ===
          `
`
      )
        continue;
      if (
        ch ===
        `
`
      ) {
        const { fold, offset } = foldNewline(source, i);
        res += fold;
        i = offset;
      } else if (ch === "\\") {
        let next = source[++i];
        const cc = escapeCodes[next];
        if (cc) res += cc;
        else if (
          next ===
          `
`
        ) {
          next = source[i + 1];
          while (next === " " || next === "\t") next = source[++i + 1];
        } else if (
          next === "\r" &&
          source[i + 1] ===
            `
`
        ) {
          next = source[++i + 1];
          while (next === " " || next === "\t") next = source[++i + 1];
        } else if (next === "x" || next === "u" || next === "U") {
          const length = next === "x" ? 2 : next === "u" ? 4 : 8;
          res += parseCharCode(source, i + 1, length, onError);
          i += length;
        } else {
          const raw = source.substr(i - 1, 2);
          onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
          res += raw;
        }
      } else if (ch === " " || ch === "\t") {
        const wsStart = i;
        let next = source[i + 1];
        while (next === " " || next === "\t") next = source[++i + 1];
        if (
          next !==
            `
` &&
          !(
            next === "\r" &&
            source[i + 2] ===
              `
`
          )
        )
          res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
      } else {
        res += ch;
      }
    }
    if (source[source.length - 1] !== '"' || source.length === 1)
      onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
    return res;
  }
  function foldNewline(source, offset) {
    let fold = "";
    let ch = source[offset + 1];
    while (
      ch === " " ||
      ch === "\t" ||
      ch ===
        `
` ||
      ch === "\r"
    ) {
      if (
        ch === "\r" &&
        source[offset + 2] !==
          `
`
      )
        break;
      if (
        ch ===
        `
`
      )
        fold += `
`;
      offset += 1;
      ch = source[offset + 1];
    }
    if (!fold) fold = " ";
    return { fold, offset };
  }
  var escapeCodes = {
    0: "\x00",
    a: "\x07",
    b: "\b",
    e: "\x1B",
    f: "\f",
    n: `
`,
    r: "\r",
    t: "\t",
    v: "\v",
    N: "",
    _: " ",
    L: "\u2028",
    P: "\u2029",
    " ": " ",
    '"': '"',
    "/": "/",
    "\\": "\\",
    "\t": "\t",
  };
  function parseCharCode(source, offset, length, onError) {
    const cc = source.substr(offset, length);
    const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
    const code = ok ? parseInt(cc, 16) : NaN;
    try {
      return String.fromCodePoint(code);
    } catch {
      const raw = source.substr(offset - 2, length + 2);
      onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
      return raw;
    }
  }
  exports.resolveFlowScalar = resolveFlowScalar;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS(function (exports) {
  var identity = require_identity();
  var Scalar = require_Scalar();
  var resolveBlockScalar = require_resolve_block_scalar();
  var resolveFlowScalar = require_resolve_flow_scalar();
  function composeScalar(ctx, token, tagToken, onError) {
    const { value, type, comment, range } =
      token.type === "block-scalar"
        ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError)
        : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
    const tagName = tagToken
      ? ctx.directives.tagName(tagToken.source, (msg) =>
          onError(tagToken, "TAG_RESOLVE_FAILED", msg),
        )
      : null;
    let tag;
    if (ctx.options.stringKeys && ctx.atKey) {
      tag = ctx.schema[identity.SCALAR];
    } else if (tagName) tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
    else if (token.type === "scalar") tag = findScalarTagByTest(ctx, value, token, onError);
    else tag = ctx.schema[identity.SCALAR];
    let scalar;
    try {
      const res = tag.resolve(
        value,
        (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg),
        ctx.options,
      );
      scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
      scalar = new Scalar.Scalar(value);
    }
    scalar.range = range;
    scalar.source = value;
    if (type) scalar.type = type;
    if (tagName) scalar.tag = tagName;
    if (tag.format) scalar.format = tag.format;
    if (comment) scalar.comment = comment;
    return scalar;
  }
  function findScalarTagByName(schema, value, tagName, tagToken, onError) {
    if (tagName === "!") return schema[identity.SCALAR];
    const matchWithTest = [];
    for (const tag of schema.tags) {
      if (!tag.collection && tag.tag === tagName) {
        if (tag.default && tag.test) matchWithTest.push(tag);
        else return tag;
      }
    }
    for (const tag of matchWithTest) if (tag.test?.test(value)) return tag;
    const kt = schema.knownTags[tagName];
    if (kt && !kt.collection) {
      schema.tags.push(Object.assign({}, kt, { default: false, test: undefined }));
      return kt;
    }
    onError(
      tagToken,
      "TAG_RESOLVE_FAILED",
      `Unresolved tag: ${tagName}`,
      tagName !== "tag:yaml.org,2002:str",
    );
    return schema[identity.SCALAR];
  }
  function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
    const tag =
      schema.tags.find(
        (tag) =>
          (tag.default === true || (atKey && tag.default === "key")) && tag.test?.test(value),
      ) || schema[identity.SCALAR];
    if (schema.compat) {
      const compat =
        schema.compat.find((tag) => tag.default && tag.test?.test(value)) ??
        schema[identity.SCALAR];
      if (tag.tag !== compat.tag) {
        const ts = directives.tagString(tag.tag);
        const cs = directives.tagString(compat.tag);
        const msg = `Value may be parsed as either ${ts} or ${cs}`;
        onError(token, "TAG_RESOLVE_FAILED", msg, true);
      }
    }
    return tag;
  }
  exports.composeScalar = composeScalar;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS(function (exports) {
  function emptyScalarPosition(offset, before, pos) {
    if (before) {
      pos ?? (pos = before.length);
      for (let i = pos - 1; i >= 0; --i) {
        let st = before[i];
        switch (st.type) {
          case "space":
          case "comment":
          case "newline":
            offset -= st.source.length;
            continue;
        }
        st = before[++i];
        while (st?.type === "space") {
          offset += st.source.length;
          st = before[++i];
        }
        break;
      }
    }
    return offset;
  }
  exports.emptyScalarPosition = emptyScalarPosition;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS(function (exports) {
  var Alias = require_Alias();
  var identity = require_identity();
  var composeCollection = require_compose_collection();
  var composeScalar = require_compose_scalar();
  var resolveEnd = require_resolve_end();
  var utilEmptyScalarPosition = require_util_empty_scalar_position();
  var CN = { composeNode, composeEmptyNode };
  function composeNode(ctx, token, props, onError) {
    const atKey = ctx.atKey;
    const { spaceBefore, comment, anchor, tag } = props;
    let node;
    let isSrcToken = true;
    switch (token.type) {
      case "alias":
        node = composeAlias(ctx, token, onError);
        if (anchor || tag)
          onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
        break;
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
      case "block-scalar":
        node = composeScalar.composeScalar(ctx, token, tag, onError);
        if (anchor) node.anchor = anchor.source.substring(1);
        break;
      case "block-map":
      case "block-seq":
      case "flow-collection":
        try {
          node = composeCollection.composeCollection(CN, ctx, token, props, onError);
          if (anchor) node.anchor = anchor.source.substring(1);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          onError(token, "RESOURCE_EXHAUSTION", message);
        }
        break;
      default: {
        const message =
          token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
        onError(token, "UNEXPECTED_TOKEN", message);
        isSrcToken = false;
      }
    }
    node ?? (node = composeEmptyNode(ctx, token.offset, undefined, null, props, onError));
    if (anchor && node.anchor === "")
      onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
    if (
      atKey &&
      ctx.options.stringKeys &&
      (!identity.isScalar(node) ||
        typeof node.value !== "string" ||
        (node.tag && node.tag !== "tag:yaml.org,2002:str"))
    ) {
      const msg = "With stringKeys, all keys must be strings";
      onError(tag ?? token, "NON_STRING_KEY", msg);
    }
    if (spaceBefore) node.spaceBefore = true;
    if (comment) {
      if (token.type === "scalar" && token.source === "") node.comment = comment;
      else node.commentBefore = comment;
    }
    if (ctx.options.keepSourceTokens && isSrcToken) node.srcToken = token;
    return node;
  }
  function composeEmptyNode(
    ctx,
    offset,
    before,
    pos,
    { spaceBefore, comment, anchor, tag, end },
    onError,
  ) {
    const token = {
      type: "scalar",
      offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
      indent: -1,
      source: "",
    };
    const node = composeScalar.composeScalar(ctx, token, tag, onError);
    if (anchor) {
      node.anchor = anchor.source.substring(1);
      if (node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
    }
    if (spaceBefore) node.spaceBefore = true;
    if (comment) {
      node.comment = comment;
      node.range[2] = end;
    }
    return node;
  }
  function composeAlias({ options }, { offset, source, end }, onError) {
    const alias = new Alias.Alias(source.substring(1));
    if (alias.source === "") onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
    if (alias.source.endsWith(":"))
      onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
    const valueEnd = offset + source.length;
    const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
    alias.range = [offset, valueEnd, re.offset];
    if (re.comment) alias.comment = re.comment;
    return alias;
  }
  exports.composeEmptyNode = composeEmptyNode;
  exports.composeNode = composeNode;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS(function (exports) {
  var Document = require_Document();
  var composeNode = require_compose_node();
  var resolveEnd = require_resolve_end();
  var resolveProps = require_resolve_props();
  function composeDoc(options, directives, { offset, start, value, end }, onError) {
    const opts = Object.assign({ _directives: directives }, options);
    const doc = new Document.Document(undefined, opts);
    const ctx = {
      atKey: false,
      atRoot: true,
      directives: doc.directives,
      options: doc.options,
      schema: doc.schema,
    };
    const props = resolveProps.resolveProps(start, {
      indicator: "doc-start",
      next: value ?? end?.[0],
      offset,
      onError,
      parentIndent: 0,
      startOnNewline: true,
    });
    if (props.found) {
      doc.directives.docStart = true;
      if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
        onError(
          props.end,
          "MISSING_CHAR",
          "Block collection cannot start on same line with directives-end marker",
        );
    }
    doc.contents = value
      ? composeNode.composeNode(ctx, value, props, onError)
      : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
    if (re.comment) doc.comment = re.comment;
    doc.range = [offset, contentEnd, re.offset];
    return doc;
  }
  exports.composeDoc = composeDoc;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS(function (exports) {
  var node_process = __require("process");
  var directives = require_directives();
  var Document = require_Document();
  var errors = require_errors();
  var identity = require_identity();
  var composeDoc = require_compose_doc();
  var resolveEnd = require_resolve_end();
  function getErrorPos(src) {
    if (typeof src === "number") return [src, src + 1];
    if (Array.isArray(src)) return src.length === 2 ? src : [src[0], src[1]];
    const { offset, source } = src;
    return [offset, offset + (typeof source === "string" ? source.length : 1)];
  }
  function parsePrelude(prelude) {
    let comment = "";
    let atComment = false;
    let afterEmptyLine = false;
    for (let i = 0; i < prelude.length; ++i) {
      const source = prelude[i];
      switch (source[0]) {
        case "#":
          comment +=
            (comment === ""
              ? ""
              : afterEmptyLine
                ? `

`
                : `
`) + (source.substring(1) || " ");
          atComment = true;
          afterEmptyLine = false;
          break;
        case "%":
          if (prelude[i + 1]?.[0] !== "#") i += 1;
          atComment = false;
          break;
        default:
          if (!atComment) afterEmptyLine = true;
          atComment = false;
      }
    }
    return { comment, afterEmptyLine };
  }

  class Composer {
    constructor(options = {}) {
      this.doc = null;
      this.atDirectives = false;
      this.prelude = [];
      this.errors = [];
      this.warnings = [];
      this.onError = (source, code, message, warning) => {
        const pos = getErrorPos(source);
        if (warning) this.warnings.push(new errors.YAMLWarning(pos, code, message));
        else this.errors.push(new errors.YAMLParseError(pos, code, message));
      };
      this.directives = new directives.Directives({ version: options.version || "1.2" });
      this.options = options;
    }
    decorate(doc, afterDoc) {
      const { comment, afterEmptyLine } = parsePrelude(this.prelude);
      if (comment) {
        const dc = doc.contents;
        if (afterDoc) {
          doc.comment = doc.comment
            ? `${doc.comment}
${comment}`
            : comment;
        } else if (afterEmptyLine || doc.directives.docStart || !dc) {
          doc.commentBefore = comment;
        } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
          let it = dc.items[0];
          if (identity.isPair(it)) it = it.key;
          const cb = it.commentBefore;
          it.commentBefore = cb
            ? `${comment}
${cb}`
            : comment;
        } else {
          const cb = dc.commentBefore;
          dc.commentBefore = cb
            ? `${comment}
${cb}`
            : comment;
        }
      }
      if (afterDoc) {
        for (let i = 0; i < this.errors.length; ++i) doc.errors.push(this.errors[i]);
        for (let i = 0; i < this.warnings.length; ++i) doc.warnings.push(this.warnings[i]);
      } else {
        doc.errors = this.errors;
        doc.warnings = this.warnings;
      }
      this.prelude = [];
      this.errors = [];
      this.warnings = [];
    }
    streamInfo() {
      return {
        comment: parsePrelude(this.prelude).comment,
        directives: this.directives,
        errors: this.errors,
        warnings: this.warnings,
      };
    }
    *compose(tokens, forceDoc = false, endOffset = -1) {
      for (const token of tokens) yield* this.next(token);
      yield* this.end(forceDoc, endOffset);
    }
    *next(token) {
      if (node_process.env.LOG_STREAM) console.dir(token, { depth: null });
      switch (token.type) {
        case "directive":
          this.directives.add(token.source, (offset, message, warning) => {
            const pos = getErrorPos(token);
            pos[0] += offset;
            this.onError(pos, "BAD_DIRECTIVE", message, warning);
          });
          this.prelude.push(token.source);
          this.atDirectives = true;
          break;
        case "document": {
          const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
          if (this.atDirectives && !doc.directives.docStart)
            this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
          this.decorate(doc, false);
          if (this.doc) yield this.doc;
          this.doc = doc;
          this.atDirectives = false;
          break;
        }
        case "byte-order-mark":
        case "space":
          break;
        case "comment":
        case "newline":
          this.prelude.push(token.source);
          break;
        case "error": {
          const msg = token.source
            ? `${token.message}: ${JSON.stringify(token.source)}`
            : token.message;
          const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
          if (this.atDirectives || !this.doc) this.errors.push(error);
          else this.doc.errors.push(error);
          break;
        }
        case "doc-end": {
          if (!this.doc) {
            const msg = "Unexpected doc-end without preceding document";
            this.errors.push(
              new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg),
            );
            break;
          }
          this.doc.directives.docEnd = true;
          const end = resolveEnd.resolveEnd(
            token.end,
            token.offset + token.source.length,
            this.doc.options.strict,
            this.onError,
          );
          this.decorate(this.doc, true);
          if (end.comment) {
            const dc = this.doc.comment;
            this.doc.comment = dc
              ? `${dc}
${end.comment}`
              : end.comment;
          }
          this.doc.range[2] = end.offset;
          break;
        }
        default:
          this.errors.push(
            new errors.YAMLParseError(
              getErrorPos(token),
              "UNEXPECTED_TOKEN",
              `Unsupported token ${token.type}`,
            ),
          );
      }
    }
    *end(forceDoc = false, endOffset = -1) {
      if (this.doc) {
        this.decorate(this.doc, true);
        yield this.doc;
        this.doc = null;
      } else if (forceDoc) {
        const opts = Object.assign({ _directives: this.directives }, this.options);
        const doc = new Document.Document(undefined, opts);
        if (this.atDirectives)
          this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
        doc.range = [0, endOffset, endOffset];
        this.decorate(doc, false);
        yield doc;
      }
    }
  }
  exports.Composer = Composer;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS(function (exports) {
  var resolveBlockScalar = require_resolve_block_scalar();
  var resolveFlowScalar = require_resolve_flow_scalar();
  var errors = require_errors();
  var stringifyString = require_stringifyString();
  function resolveAsScalar(token, strict = true, onError) {
    if (token) {
      const _onError = (pos, code, message) => {
        const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
        if (onError) onError(offset, code, message);
        else throw new errors.YAMLParseError([offset, offset + 1], code, message);
      };
      switch (token.type) {
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
        case "block-scalar":
          return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
      }
    }
    return null;
  }
  function createScalarToken(value, context) {
    const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
    const source = stringifyString.stringifyString(
      { type, value },
      {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 },
      },
    );
    const end = context.end ?? [
      {
        type: "newline",
        offset: -1,
        indent,
        source: `
`,
      },
    ];
    switch (source[0]) {
      case "|":
      case ">": {
        const he = source.indexOf(`
`);
        const head = source.substring(0, he);
        const body =
          source.substring(he + 1) +
          `
`;
        const props = [{ type: "block-scalar-header", offset, indent, source: head }];
        if (!addEndtoBlockProps(props, end))
          props.push({
            type: "newline",
            offset: -1,
            indent,
            source: `
`,
          });
        return { type: "block-scalar", offset, indent, props, source: body };
      }
      case '"':
        return { type: "double-quoted-scalar", offset, indent, source, end };
      case "'":
        return { type: "single-quoted-scalar", offset, indent, source, end };
      default:
        return { type: "scalar", offset, indent, source, end };
    }
  }
  function setScalarValue(token, value, context = {}) {
    let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
    let indent = "indent" in token ? token.indent : null;
    if (afterKey && typeof indent === "number") indent += 2;
    if (!type)
      switch (token.type) {
        case "single-quoted-scalar":
          type = "QUOTE_SINGLE";
          break;
        case "double-quoted-scalar":
          type = "QUOTE_DOUBLE";
          break;
        case "block-scalar": {
          const header = token.props[0];
          if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
          type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
          break;
        }
        default:
          type = "PLAIN";
      }
    const source = stringifyString.stringifyString(
      { type, value },
      {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 },
      },
    );
    switch (source[0]) {
      case "|":
      case ">":
        setBlockScalarValue(token, source);
        break;
      case '"':
        setFlowScalarValue(token, source, "double-quoted-scalar");
        break;
      case "'":
        setFlowScalarValue(token, source, "single-quoted-scalar");
        break;
      default:
        setFlowScalarValue(token, source, "scalar");
    }
  }
  function setBlockScalarValue(token, source) {
    const he = source.indexOf(`
`);
    const head = source.substring(0, he);
    const body =
      source.substring(he + 1) +
      `
`;
    if (token.type === "block-scalar") {
      const header = token.props[0];
      if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
      header.source = head;
      token.source = body;
    } else {
      const { offset } = token;
      const indent = "indent" in token ? token.indent : -1;
      const props = [{ type: "block-scalar-header", offset, indent, source: head }];
      if (!addEndtoBlockProps(props, "end" in token ? token.end : undefined))
        props.push({
          type: "newline",
          offset: -1,
          indent,
          source: `
`,
        });
      for (const key of Object.keys(token))
        if (key !== "type" && key !== "offset") delete token[key];
      Object.assign(token, { type: "block-scalar", indent, props, source: body });
    }
  }
  function addEndtoBlockProps(props, end) {
    if (end)
      for (const st of end)
        switch (st.type) {
          case "space":
          case "comment":
            props.push(st);
            break;
          case "newline":
            props.push(st);
            return true;
        }
    return false;
  }
  function setFlowScalarValue(token, source, type) {
    switch (token.type) {
      case "scalar":
      case "double-quoted-scalar":
      case "single-quoted-scalar":
        token.type = type;
        token.source = source;
        break;
      case "block-scalar": {
        const end = token.props.slice(1);
        let oa = source.length;
        if (token.props[0].type === "block-scalar-header") oa -= token.props[0].source.length;
        for (const tok of end) tok.offset += oa;
        delete token.props;
        Object.assign(token, { type, source, end });
        break;
      }
      case "block-map":
      case "block-seq": {
        const offset = token.offset + source.length;
        const nl = {
          type: "newline",
          offset,
          indent: token.indent,
          source: `
`,
        };
        delete token.items;
        Object.assign(token, { type, source, end: [nl] });
        break;
      }
      default: {
        const indent = "indent" in token ? token.indent : -1;
        const end =
          "end" in token && Array.isArray(token.end)
            ? token.end.filter(
                (st) => st.type === "space" || st.type === "comment" || st.type === "newline",
              )
            : [];
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset") delete token[key];
        Object.assign(token, { type, indent, source, end });
      }
    }
  }
  exports.createScalarToken = createScalarToken;
  exports.resolveAsScalar = resolveAsScalar;
  exports.setScalarValue = setScalarValue;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS(function (exports) {
  var stringify = (cst) => ("type" in cst ? stringifyToken(cst) : stringifyItem(cst));
  function stringifyToken(token) {
    switch (token.type) {
      case "block-scalar": {
        let res = "";
        for (const tok of token.props) res += stringifyToken(tok);
        return res + token.source;
      }
      case "block-map":
      case "block-seq": {
        let res = "";
        for (const item of token.items) res += stringifyItem(item);
        return res;
      }
      case "flow-collection": {
        let res = token.start.source;
        for (const item of token.items) res += stringifyItem(item);
        for (const st of token.end) res += st.source;
        return res;
      }
      case "document": {
        let res = stringifyItem(token);
        if (token.end) for (const st of token.end) res += st.source;
        return res;
      }
      default: {
        let res = token.source;
        if ("end" in token && token.end) for (const st of token.end) res += st.source;
        return res;
      }
    }
  }
  function stringifyItem({ start, key, sep, value }) {
    let res = "";
    for (const st of start) res += st.source;
    if (key) res += stringifyToken(key);
    if (sep) for (const st of sep) res += st.source;
    if (value) res += stringifyToken(value);
    return res;
  }
  exports.stringify = stringify;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS(function (exports) {
  var BREAK = Symbol("break visit");
  var SKIP = Symbol("skip children");
  var REMOVE = Symbol("remove item");
  function visit(cst, visitor) {
    if ("type" in cst && cst.type === "document") cst = { start: cst.start, value: cst.value };
    _visit(Object.freeze([]), cst, visitor);
  }
  visit.BREAK = BREAK;
  visit.SKIP = SKIP;
  visit.REMOVE = REMOVE;
  visit.itemAtPath = (cst, path) => {
    let item = cst;
    for (const [field, index] of path) {
      const tok = item?.[field];
      if (tok && "items" in tok) {
        item = tok.items[index];
      } else return;
    }
    return item;
  };
  visit.parentCollection = (cst, path) => {
    const parent = visit.itemAtPath(cst, path.slice(0, -1));
    const field = path[path.length - 1][0];
    const coll = parent?.[field];
    if (coll && "items" in coll) return coll;
    throw new Error("Parent collection not found");
  };
  function _visit(path, item, visitor) {
    let ctrl = visitor(item, path);
    if (typeof ctrl === "symbol") return ctrl;
    for (const field of ["key", "value"]) {
      const token = item[field];
      if (token && "items" in token) {
        for (let i = 0; i < token.items.length; ++i) {
          const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
          if (typeof ci === "number") i = ci - 1;
          else if (ci === BREAK) return BREAK;
          else if (ci === REMOVE) {
            token.items.splice(i, 1);
            i -= 1;
          }
        }
        if (typeof ctrl === "function" && field === "key") ctrl = ctrl(item, path);
      }
    }
    return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
  }
  exports.visit = visit;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS(function (exports) {
  var cstScalar = require_cst_scalar();
  var cstStringify = require_cst_stringify();
  var cstVisit = require_cst_visit();
  var BOM = "\uFEFF";
  var DOCUMENT = "\x02";
  var FLOW_END = "\x18";
  var SCALAR = "\x1F";
  var isCollection = (token) => !!token && "items" in token;
  var isScalar = (token) =>
    !!token &&
    (token.type === "scalar" ||
      token.type === "single-quoted-scalar" ||
      token.type === "double-quoted-scalar" ||
      token.type === "block-scalar");
  function prettyToken(token) {
    switch (token) {
      case BOM:
        return "<BOM>";
      case DOCUMENT:
        return "<DOC>";
      case FLOW_END:
        return "<FLOW_END>";
      case SCALAR:
        return "<SCALAR>";
      default:
        return JSON.stringify(token);
    }
  }
  function tokenType(source) {
    switch (source) {
      case BOM:
        return "byte-order-mark";
      case DOCUMENT:
        return "doc-mode";
      case FLOW_END:
        return "flow-error-end";
      case SCALAR:
        return "scalar";
      case "---":
        return "doc-start";
      case "...":
        return "doc-end";
      case "":
      case `
`:
      case `\r
`:
        return "newline";
      case "-":
        return "seq-item-ind";
      case "?":
        return "explicit-key-ind";
      case ":":
        return "map-value-ind";
      case "{":
        return "flow-map-start";
      case "}":
        return "flow-map-end";
      case "[":
        return "flow-seq-start";
      case "]":
        return "flow-seq-end";
      case ",":
        return "comma";
    }
    switch (source[0]) {
      case " ":
      case "\t":
        return "space";
      case "#":
        return "comment";
      case "%":
        return "directive-line";
      case "*":
        return "alias";
      case "&":
        return "anchor";
      case "!":
        return "tag";
      case "'":
        return "single-quoted-scalar";
      case '"':
        return "double-quoted-scalar";
      case "|":
      case ">":
        return "block-scalar-header";
    }
    return null;
  }
  exports.createScalarToken = cstScalar.createScalarToken;
  exports.resolveAsScalar = cstScalar.resolveAsScalar;
  exports.setScalarValue = cstScalar.setScalarValue;
  exports.stringify = cstStringify.stringify;
  exports.visit = cstVisit.visit;
  exports.BOM = BOM;
  exports.DOCUMENT = DOCUMENT;
  exports.FLOW_END = FLOW_END;
  exports.SCALAR = SCALAR;
  exports.isCollection = isCollection;
  exports.isScalar = isScalar;
  exports.prettyToken = prettyToken;
  exports.tokenType = tokenType;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS(function (exports) {
  var cst = require_cst();
  function isEmpty(ch) {
    switch (ch) {
      case undefined:
      case " ":
      case `
`:
      case "\r":
      case "\t":
        return true;
      default:
        return false;
    }
  }
  var hexDigits = new Set("0123456789ABCDEFabcdef");
  var tagChars = new Set(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()",
  );
  var flowIndicatorChars = new Set(",[]{}");
  var invalidAnchorChars = new Set(` ,[]{}
\r	`);
  var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);

  class Lexer {
    constructor() {
      this.atEnd = false;
      this.blockScalarIndent = -1;
      this.blockScalarKeep = false;
      this.buffer = "";
      this.flowKey = false;
      this.flowLevel = 0;
      this.indentNext = 0;
      this.indentValue = 0;
      this.lineEndPos = null;
      this.next = null;
      this.pos = 0;
    }
    *lex(source, incomplete = false) {
      if (source) {
        if (typeof source !== "string") throw TypeError("source is not a string");
        this.buffer = this.buffer ? this.buffer + source : source;
        this.lineEndPos = null;
      }
      this.atEnd = !incomplete;
      let next = this.next ?? "stream";
      while (next && (incomplete || this.hasChars(1))) next = yield* this.parseNext(next);
    }
    atLineEnd() {
      let i = this.pos;
      let ch = this.buffer[i];
      while (ch === " " || ch === "\t") ch = this.buffer[++i];
      if (
        !ch ||
        ch === "#" ||
        ch ===
          `
`
      )
        return true;
      if (ch === "\r")
        return (
          this.buffer[i + 1] ===
          `
`
        );
      return false;
    }
    charAt(n) {
      return this.buffer[this.pos + n];
    }
    continueScalar(offset) {
      let ch = this.buffer[offset];
      if (this.indentNext > 0) {
        let indent = 0;
        while (ch === " ") ch = this.buffer[++indent + offset];
        if (ch === "\r") {
          const next = this.buffer[indent + offset + 1];
          if (
            next ===
              `
` ||
            (!next && !this.atEnd)
          )
            return offset + indent + 1;
        }
        return ch ===
          `
` ||
          indent >= this.indentNext ||
          (!ch && !this.atEnd)
          ? offset + indent
          : -1;
      }
      if (ch === "-" || ch === ".") {
        const dt = this.buffer.substr(offset, 3);
        if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3])) return -1;
      }
      return offset;
    }
    getLine() {
      let end = this.lineEndPos;
      if (typeof end !== "number" || (end !== -1 && end < this.pos)) {
        end = this.buffer.indexOf(
          `
`,
          this.pos,
        );
        this.lineEndPos = end;
      }
      if (end === -1) return this.atEnd ? this.buffer.substring(this.pos) : null;
      if (this.buffer[end - 1] === "\r") end -= 1;
      return this.buffer.substring(this.pos, end);
    }
    hasChars(n) {
      return this.pos + n <= this.buffer.length;
    }
    setNext(state) {
      this.buffer = this.buffer.substring(this.pos);
      this.pos = 0;
      this.lineEndPos = null;
      this.next = state;
      return null;
    }
    peek(n) {
      return this.buffer.substr(this.pos, n);
    }
    *parseNext(next) {
      switch (next) {
        case "stream":
          return yield* this.parseStream();
        case "line-start":
          return yield* this.parseLineStart();
        case "block-start":
          return yield* this.parseBlockStart();
        case "doc":
          return yield* this.parseDocument();
        case "flow":
          return yield* this.parseFlowCollection();
        case "quoted-scalar":
          return yield* this.parseQuotedScalar();
        case "block-scalar":
          return yield* this.parseBlockScalar();
        case "plain-scalar":
          return yield* this.parsePlainScalar();
      }
    }
    *parseStream() {
      let line = this.getLine();
      if (line === null) return this.setNext("stream");
      if (line[0] === cst.BOM) {
        yield* this.pushCount(1);
        line = line.substring(1);
      }
      if (line[0] === "%") {
        let dirEnd = line.length;
        let cs = line.indexOf("#");
        while (cs !== -1) {
          const ch = line[cs - 1];
          if (ch === " " || ch === "\t") {
            dirEnd = cs - 1;
            break;
          } else {
            cs = line.indexOf("#", cs + 1);
          }
        }
        while (true) {
          const ch = line[dirEnd - 1];
          if (ch === " " || ch === "\t") dirEnd -= 1;
          else break;
        }
        const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
        yield* this.pushCount(line.length - n);
        this.pushNewline();
        return "stream";
      }
      if (this.atLineEnd()) {
        const sp = yield* this.pushSpaces(true);
        yield* this.pushCount(line.length - sp);
        yield* this.pushNewline();
        return "stream";
      }
      yield cst.DOCUMENT;
      return yield* this.parseLineStart();
    }
    *parseLineStart() {
      const ch = this.charAt(0);
      if (!ch && !this.atEnd) return this.setNext("line-start");
      if (ch === "-" || ch === ".") {
        if (!this.atEnd && !this.hasChars(4)) return this.setNext("line-start");
        const s = this.peek(3);
        if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
          yield* this.pushCount(3);
          this.indentValue = 0;
          this.indentNext = 0;
          return s === "---" ? "doc" : "stream";
        }
      }
      this.indentValue = yield* this.pushSpaces(false);
      if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
        this.indentNext = this.indentValue;
      return yield* this.parseBlockStart();
    }
    *parseBlockStart() {
      const [ch0, ch1] = this.peek(2);
      if (!ch1 && !this.atEnd) return this.setNext("block-start");
      if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
        const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
        this.indentNext = this.indentValue + 1;
        this.indentValue += n;
        return "block-start";
      }
      return "doc";
    }
    *parseDocument() {
      yield* this.pushSpaces(true);
      const line = this.getLine();
      if (line === null) return this.setNext("doc");
      let n = yield* this.pushIndicators();
      switch (line[n]) {
        case "#":
          yield* this.pushCount(line.length - n);
        case undefined:
          yield* this.pushNewline();
          return yield* this.parseLineStart();
        case "{":
        case "[":
          yield* this.pushCount(1);
          this.flowKey = false;
          this.flowLevel = 1;
          return "flow";
        case "}":
        case "]":
          yield* this.pushCount(1);
          return "doc";
        case "*":
          yield* this.pushUntil(isNotAnchorChar);
          return "doc";
        case '"':
        case "'":
          return yield* this.parseQuotedScalar();
        case "|":
        case ">":
          n += yield* this.parseBlockScalarHeader();
          n += yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - n);
          yield* this.pushNewline();
          return yield* this.parseBlockScalar();
        default:
          return yield* this.parsePlainScalar();
      }
    }
    *parseFlowCollection() {
      let nl, sp;
      let indent = -1;
      do {
        nl = yield* this.pushNewline();
        if (nl > 0) {
          sp = yield* this.pushSpaces(false);
          this.indentValue = indent = sp;
        } else {
          sp = 0;
        }
        sp += yield* this.pushSpaces(true);
      } while (nl + sp > 0);
      const line = this.getLine();
      if (line === null) return this.setNext("flow");
      if (
        (indent !== -1 && indent < this.indentNext && line[0] !== "#") ||
        (indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3]))
      ) {
        const atFlowEndMarker =
          indent === this.indentNext - 1 &&
          this.flowLevel === 1 &&
          (line[0] === "]" || line[0] === "}");
        if (!atFlowEndMarker) {
          this.flowLevel = 0;
          yield cst.FLOW_END;
          return yield* this.parseLineStart();
        }
      }
      let n = 0;
      while (line[n] === ",") {
        n += yield* this.pushCount(1);
        n += yield* this.pushSpaces(true);
        this.flowKey = false;
      }
      n += yield* this.pushIndicators();
      switch (line[n]) {
        case undefined:
          return "flow";
        case "#":
          yield* this.pushCount(line.length - n);
          return "flow";
        case "{":
        case "[":
          yield* this.pushCount(1);
          this.flowKey = false;
          this.flowLevel += 1;
          return "flow";
        case "}":
        case "]":
          yield* this.pushCount(1);
          this.flowKey = true;
          this.flowLevel -= 1;
          return this.flowLevel ? "flow" : "doc";
        case "*":
          yield* this.pushUntil(isNotAnchorChar);
          return "flow";
        case '"':
        case "'":
          this.flowKey = true;
          return yield* this.parseQuotedScalar();
        case ":": {
          const next = this.charAt(1);
          if (this.flowKey || isEmpty(next) || next === ",") {
            this.flowKey = false;
            yield* this.pushCount(1);
            yield* this.pushSpaces(true);
            return "flow";
          }
        }
        default:
          this.flowKey = false;
          return yield* this.parsePlainScalar();
      }
    }
    *parseQuotedScalar() {
      const quote = this.charAt(0);
      let end = this.buffer.indexOf(quote, this.pos + 1);
      if (quote === "'") {
        while (end !== -1 && this.buffer[end + 1] === "'") end = this.buffer.indexOf("'", end + 2);
      } else {
        while (end !== -1) {
          let n = 0;
          while (this.buffer[end - 1 - n] === "\\") n += 1;
          if (n % 2 === 0) break;
          end = this.buffer.indexOf('"', end + 1);
        }
      }
      const qb = this.buffer.substring(0, end);
      let nl = qb.indexOf(
        `
`,
        this.pos,
      );
      if (nl !== -1) {
        while (nl !== -1) {
          const cs = this.continueScalar(nl + 1);
          if (cs === -1) break;
          nl = qb.indexOf(
            `
`,
            cs,
          );
        }
        if (nl !== -1) {
          end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
        }
      }
      if (end === -1) {
        if (!this.atEnd) return this.setNext("quoted-scalar");
        end = this.buffer.length;
      }
      yield* this.pushToIndex(end + 1, false);
      return this.flowLevel ? "flow" : "doc";
    }
    *parseBlockScalarHeader() {
      this.blockScalarIndent = -1;
      this.blockScalarKeep = false;
      let i = this.pos;
      while (true) {
        const ch = this.buffer[++i];
        if (ch === "+") this.blockScalarKeep = true;
        else if (ch > "0" && ch <= "9") this.blockScalarIndent = Number(ch) - 1;
        else if (ch !== "-") break;
      }
      return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
    }
    *parseBlockScalar() {
      let nl = this.pos - 1;
      let indent = 0;
      let ch;
      loop: for (let i = this.pos; (ch = this.buffer[i]); ++i) {
        switch (ch) {
          case " ":
            indent += 1;
            break;
          case `
`:
            nl = i;
            indent = 0;
            break;
          case "\r": {
            const next = this.buffer[i + 1];
            if (!next && !this.atEnd) return this.setNext("block-scalar");
            if (
              next ===
              `
`
            )
              break;
          }
          default:
            break loop;
        }
      }
      if (!ch && !this.atEnd) return this.setNext("block-scalar");
      if (indent >= this.indentNext) {
        if (this.blockScalarIndent === -1) this.indentNext = indent;
        else {
          this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
        }
        do {
          const cs = this.continueScalar(nl + 1);
          if (cs === -1) break;
          nl = this.buffer.indexOf(
            `
`,
            cs,
          );
        } while (nl !== -1);
        if (nl === -1) {
          if (!this.atEnd) return this.setNext("block-scalar");
          nl = this.buffer.length;
        }
      }
      let i = nl + 1;
      ch = this.buffer[i];
      while (ch === " ") ch = this.buffer[++i];
      if (ch === "\t") {
        while (
          ch === "\t" ||
          ch === " " ||
          ch === "\r" ||
          ch ===
            `
`
        )
          ch = this.buffer[++i];
        nl = i - 1;
      } else if (!this.blockScalarKeep) {
        do {
          let i = nl - 1;
          let ch = this.buffer[i];
          if (ch === "\r") ch = this.buffer[--i];
          const lastChar = i;
          while (ch === " ") ch = this.buffer[--i];
          if (
            ch ===
              `
` &&
            i >= this.pos &&
            i + 1 + indent > lastChar
          )
            nl = i;
          else break;
        } while (true);
      }
      yield cst.SCALAR;
      yield* this.pushToIndex(nl + 1, true);
      return yield* this.parseLineStart();
    }
    *parsePlainScalar() {
      const inFlow = this.flowLevel > 0;
      let end = this.pos - 1;
      let i = this.pos - 1;
      let ch;
      while ((ch = this.buffer[++i])) {
        if (ch === ":") {
          const next = this.buffer[i + 1];
          if (isEmpty(next) || (inFlow && flowIndicatorChars.has(next))) break;
          end = i;
        } else if (isEmpty(ch)) {
          let next = this.buffer[i + 1];
          if (ch === "\r") {
            if (
              next ===
              `
`
            ) {
              i += 1;
              ch = `
`;
              next = this.buffer[i + 1];
            } else end = i;
          }
          if (next === "#" || (inFlow && flowIndicatorChars.has(next))) break;
          if (
            ch ===
            `
`
          ) {
            const cs = this.continueScalar(i + 1);
            if (cs === -1) break;
            i = Math.max(i, cs - 2);
          }
        } else {
          if (inFlow && flowIndicatorChars.has(ch)) break;
          end = i;
        }
      }
      if (!ch && !this.atEnd) return this.setNext("plain-scalar");
      yield cst.SCALAR;
      yield* this.pushToIndex(end + 1, true);
      return inFlow ? "flow" : "doc";
    }
    *pushCount(n) {
      if (n > 0) {
        yield this.buffer.substr(this.pos, n);
        this.pos += n;
        return n;
      }
      return 0;
    }
    *pushToIndex(i, allowEmpty) {
      const s = this.buffer.slice(this.pos, i);
      if (s) {
        yield s;
        this.pos += s.length;
        return s.length;
      } else if (allowEmpty) yield "";
      return 0;
    }
    *pushIndicators() {
      let n = 0;
      loop: while (true) {
        switch (this.charAt(0)) {
          case "!":
            n += yield* this.pushTag();
            n += yield* this.pushSpaces(true);
            continue loop;
          case "&":
            n += yield* this.pushUntil(isNotAnchorChar);
            n += yield* this.pushSpaces(true);
            continue loop;
          case "-":
          case "?":
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || (inFlow && flowIndicatorChars.has(ch1))) {
              if (!inFlow) this.indentNext = this.indentValue + 1;
              else if (this.flowKey) this.flowKey = false;
              n += yield* this.pushCount(1);
              n += yield* this.pushSpaces(true);
              continue loop;
            }
          }
        }
        break loop;
      }
      return n;
    }
    *pushTag() {
      if (this.charAt(1) === "<") {
        let i = this.pos + 2;
        let ch = this.buffer[i];
        while (!isEmpty(ch) && ch !== ">") ch = this.buffer[++i];
        return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
      } else {
        let i = this.pos + 1;
        let ch = this.buffer[i];
        while (ch) {
          if (tagChars.has(ch)) ch = this.buffer[++i];
          else if (
            ch === "%" &&
            hexDigits.has(this.buffer[i + 1]) &&
            hexDigits.has(this.buffer[i + 2])
          ) {
            ch = this.buffer[(i += 3)];
          } else break;
        }
        return yield* this.pushToIndex(i, false);
      }
    }
    *pushNewline() {
      const ch = this.buffer[this.pos];
      if (
        ch ===
        `
`
      )
        return yield* this.pushCount(1);
      else if (
        ch === "\r" &&
        this.charAt(1) ===
          `
`
      )
        return yield* this.pushCount(2);
      else return 0;
    }
    *pushSpaces(allowTabs) {
      let i = this.pos - 1;
      let ch;
      do {
        ch = this.buffer[++i];
      } while (ch === " " || (allowTabs && ch === "\t"));
      const n = i - this.pos;
      if (n > 0) {
        yield this.buffer.substr(this.pos, n);
        this.pos = i;
      }
      return n;
    }
    *pushUntil(test) {
      let i = this.pos;
      let ch = this.buffer[i];
      while (!test(ch)) ch = this.buffer[++i];
      return yield* this.pushToIndex(i, false);
    }
  }
  exports.Lexer = Lexer;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS(function (exports) {
  class LineCounter {
    constructor() {
      this.lineStarts = [];
      this.addNewLine = (offset) => this.lineStarts.push(offset);
      this.linePos = (offset) => {
        let low = 0;
        let high = this.lineStarts.length;
        while (low < high) {
          const mid = (low + high) >> 1;
          if (this.lineStarts[mid] < offset) low = mid + 1;
          else high = mid;
        }
        if (this.lineStarts[low] === offset) return { line: low + 1, col: 1 };
        if (low === 0) return { line: 0, col: offset };
        const start = this.lineStarts[low - 1];
        return { line: low, col: offset - start + 1 };
      };
    }
  }
  exports.LineCounter = LineCounter;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS(function (exports) {
  var node_process = __require("process");
  var cst = require_cst();
  var lexer = require_lexer();
  function includesToken(list, type) {
    for (let i = 0; i < list.length; ++i) if (list[i].type === type) return true;
    return false;
  }
  function findNonEmptyIndex(list) {
    for (let i = 0; i < list.length; ++i) {
      switch (list[i].type) {
        case "space":
        case "comment":
        case "newline":
          break;
        default:
          return i;
      }
    }
    return -1;
  }
  function isFlowToken(token) {
    switch (token?.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
      case "flow-collection":
        return true;
      default:
        return false;
    }
  }
  function getPrevProps(parent) {
    switch (parent.type) {
      case "document":
        return parent.start;
      case "block-map": {
        const it = parent.items[parent.items.length - 1];
        return it.sep ?? it.start;
      }
      case "block-seq":
        return parent.items[parent.items.length - 1].start;
      default:
        return [];
    }
  }
  function getFirstKeyStartProps(prev) {
    if (prev.length === 0) return [];
    let i = prev.length;
    loop: while (--i >= 0) {
      switch (prev[i].type) {
        case "doc-start":
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
        case "newline":
          break loop;
      }
    }
    while (prev[++i]?.type === "space") {}
    return prev.splice(i, prev.length);
  }
  function arrayPushArray(target, source) {
    if (source.length < 1e5) Array.prototype.push.apply(target, source);
    else for (let i = 0; i < source.length; ++i) target.push(source[i]);
  }
  function fixFlowSeqItems(fc) {
    if (fc.start.type === "flow-seq-start") {
      for (const it of fc.items) {
        if (
          it.sep &&
          !it.value &&
          !includesToken(it.start, "explicit-key-ind") &&
          !includesToken(it.sep, "map-value-ind")
        ) {
          if (it.key) it.value = it.key;
          delete it.key;
          if (isFlowToken(it.value)) {
            if (it.value.end) arrayPushArray(it.value.end, it.sep);
            else it.value.end = it.sep;
          } else arrayPushArray(it.start, it.sep);
          delete it.sep;
        }
      }
    }
  }

  class Parser {
    constructor(onNewLine) {
      this.atNewLine = true;
      this.atScalar = false;
      this.indent = 0;
      this.offset = 0;
      this.onKeyLine = false;
      this.stack = [];
      this.source = "";
      this.type = "";
      this.lexer = new lexer.Lexer();
      this.onNewLine = onNewLine;
    }
    *parse(source, incomplete = false) {
      if (this.onNewLine && this.offset === 0) this.onNewLine(0);
      for (const lexeme of this.lexer.lex(source, incomplete)) yield* this.next(lexeme);
      if (!incomplete) yield* this.end();
    }
    *next(source) {
      this.source = source;
      if (node_process.env.LOG_TOKENS) console.log("|", cst.prettyToken(source));
      if (this.atScalar) {
        this.atScalar = false;
        yield* this.step();
        this.offset += source.length;
        return;
      }
      const type = cst.tokenType(source);
      if (!type) {
        const message = `Not a YAML token: ${source}`;
        yield* this.pop({ type: "error", offset: this.offset, message, source });
        this.offset += source.length;
      } else if (type === "scalar") {
        this.atNewLine = false;
        this.atScalar = true;
        this.type = "scalar";
      } else {
        this.type = type;
        yield* this.step();
        switch (type) {
          case "newline":
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) this.onNewLine(this.offset + source.length);
            break;
          case "space":
            if (this.atNewLine && source[0] === " ") this.indent += source.length;
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            if (this.atNewLine) this.indent += source.length;
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = false;
        }
        this.offset += source.length;
      }
    }
    *end() {
      while (this.stack.length > 0) yield* this.pop();
    }
    get sourceToken() {
      const st = {
        type: this.type,
        offset: this.offset,
        indent: this.indent,
        source: this.source,
      };
      return st;
    }
    *step() {
      const top = this.peek(1);
      if (this.type === "doc-end" && top?.type !== "doc-end") {
        while (this.stack.length > 0) yield* this.pop();
        this.stack.push({
          type: "doc-end",
          offset: this.offset,
          source: this.source,
        });
        return;
      }
      if (!top) return yield* this.stream();
      switch (top.type) {
        case "document":
          return yield* this.document(top);
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return yield* this.scalar(top);
        case "block-scalar":
          return yield* this.blockScalar(top);
        case "block-map":
          return yield* this.blockMap(top);
        case "block-seq":
          return yield* this.blockSequence(top);
        case "flow-collection":
          return yield* this.flowCollection(top);
        case "doc-end":
          return yield* this.documentEnd(top);
      }
      yield* this.pop();
    }
    peek(n) {
      return this.stack[this.stack.length - n];
    }
    *pop(error) {
      const token = error ?? this.stack.pop();
      if (!token) {
        const message = "Tried to pop an empty stack";
        yield { type: "error", offset: this.offset, source: "", message };
      } else if (this.stack.length === 0) {
        yield token;
      } else {
        const top = this.peek(1);
        if (token.type === "block-scalar") {
          token.indent = "indent" in top ? top.indent : 0;
        } else if (token.type === "flow-collection" && top.type === "document") {
          token.indent = 0;
        }
        if (token.type === "flow-collection") fixFlowSeqItems(token);
        switch (top.type) {
          case "document":
            top.value = token;
            break;
          case "block-scalar":
            top.props.push(token);
            break;
          case "block-map": {
            const it = top.items[top.items.length - 1];
            if (it.value) {
              top.items.push({ start: [], key: token, sep: [] });
              this.onKeyLine = true;
              return;
            } else if (it.sep) {
              it.value = token;
            } else {
              Object.assign(it, { key: token, sep: [] });
              this.onKeyLine = !it.explicitKey;
              return;
            }
            break;
          }
          case "block-seq": {
            const it = top.items[top.items.length - 1];
            if (it.value) top.items.push({ start: [], value: token });
            else it.value = token;
            break;
          }
          case "flow-collection": {
            const it = top.items[top.items.length - 1];
            if (!it || it.value) top.items.push({ start: [], key: token, sep: [] });
            else if (it.sep) it.value = token;
            else Object.assign(it, { key: token, sep: [] });
            return;
          }
          default:
            yield* this.pop();
            yield* this.pop(token);
        }
        if (
          (top.type === "document" || top.type === "block-map" || top.type === "block-seq") &&
          (token.type === "block-map" || token.type === "block-seq")
        ) {
          const last = token.items[token.items.length - 1];
          if (
            last &&
            !last.sep &&
            !last.value &&
            last.start.length > 0 &&
            findNonEmptyIndex(last.start) === -1 &&
            (token.indent === 0 ||
              last.start.every((st) => st.type !== "comment" || st.indent < token.indent))
          ) {
            if (top.type === "document") top.end = last.start;
            else top.items.push({ start: last.start });
            token.items.splice(-1, 1);
          }
        }
      }
    }
    *stream() {
      switch (this.type) {
        case "directive-line":
          yield { type: "directive", offset: this.offset, source: this.source };
          return;
        case "byte-order-mark":
        case "space":
        case "comment":
        case "newline":
          yield this.sourceToken;
          return;
        case "doc-mode":
        case "doc-start": {
          const doc = {
            type: "document",
            offset: this.offset,
            start: [],
          };
          if (this.type === "doc-start") doc.start.push(this.sourceToken);
          this.stack.push(doc);
          return;
        }
      }
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML stream`,
        source: this.source,
      };
    }
    *document(doc) {
      if (doc.value) return yield* this.lineEnd(doc);
      switch (this.type) {
        case "doc-start": {
          if (findNonEmptyIndex(doc.start) !== -1) {
            yield* this.pop();
            yield* this.step();
          } else doc.start.push(this.sourceToken);
          return;
        }
        case "anchor":
        case "tag":
        case "space":
        case "comment":
        case "newline":
          doc.start.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(doc);
      if (bv) this.stack.push(bv);
      else {
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML document`,
          source: this.source,
        };
      }
    }
    *scalar(scalar) {
      if (this.type === "map-value-ind") {
        const prev = getPrevProps(this.peek(2));
        const start = getFirstKeyStartProps(prev);
        let sep;
        if (scalar.end) {
          sep = scalar.end;
          sep.push(this.sourceToken);
          delete scalar.end;
        } else sep = [this.sourceToken];
        const map = {
          type: "block-map",
          offset: scalar.offset,
          indent: scalar.indent,
          items: [{ start, key: scalar, sep }],
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map;
      } else yield* this.lineEnd(scalar);
    }
    *blockScalar(scalar) {
      switch (this.type) {
        case "space":
        case "comment":
        case "newline":
          scalar.props.push(this.sourceToken);
          return;
        case "scalar":
          scalar.source = this.source;
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine) {
            let nl =
              this.source.indexOf(`
`) + 1;
            while (nl !== 0) {
              this.onNewLine(this.offset + nl);
              nl =
                this.source.indexOf(
                  `
`,
                  nl,
                ) + 1;
            }
          }
          yield* this.pop();
          break;
        default:
          yield* this.pop();
          yield* this.step();
      }
    }
    *blockMap(map) {
      const it = map.items[map.items.length - 1];
      switch (this.type) {
        case "newline":
          this.onKeyLine = false;
          if (it.value) {
            const end = "end" in it.value ? it.value.end : undefined;
            const last = Array.isArray(end) ? end[end.length - 1] : undefined;
            if (last?.type === "comment") end?.push(this.sourceToken);
            else map.items.push({ start: [this.sourceToken] });
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            it.start.push(this.sourceToken);
          }
          return;
        case "space":
        case "comment":
          if (it.value) {
            map.items.push({ start: [this.sourceToken] });
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            if (this.atIndentedComment(it.start, map.indent)) {
              const prev = map.items[map.items.length - 2];
              const end = prev?.value?.end;
              if (Array.isArray(end)) {
                arrayPushArray(end, it.start);
                end.push(this.sourceToken);
                map.items.pop();
                return;
              }
            }
            it.start.push(this.sourceToken);
          }
          return;
      }
      if (this.indent >= map.indent) {
        const atMapIndent = !this.onKeyLine && this.indent === map.indent;
        const atNextItem =
          atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
        let start = [];
        if (atNextItem && it.sep && !it.value) {
          const nl = [];
          for (let i = 0; i < it.sep.length; ++i) {
            const st = it.sep[i];
            switch (st.type) {
              case "newline":
                nl.push(i);
                break;
              case "space":
                break;
              case "comment":
                if (st.indent > map.indent) nl.length = 0;
                break;
              default:
                nl.length = 0;
            }
          }
          if (nl.length >= 2) start = it.sep.splice(nl[1]);
        }
        switch (this.type) {
          case "anchor":
          case "tag":
            if (atNextItem || it.value) {
              start.push(this.sourceToken);
              map.items.push({ start });
              this.onKeyLine = true;
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "explicit-key-ind":
            if (!it.sep && !it.explicitKey) {
              it.start.push(this.sourceToken);
              it.explicitKey = true;
            } else if (atNextItem || it.value) {
              start.push(this.sourceToken);
              map.items.push({ start, explicitKey: true });
            } else {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: [this.sourceToken], explicitKey: true }],
              });
            }
            this.onKeyLine = true;
            return;
          case "map-value-ind":
            if (it.explicitKey) {
              if (!it.sep) {
                if (includesToken(it.start, "newline")) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else {
                  const start = getFirstKeyStartProps(it.start);
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }],
                  });
                }
              } else if (it.value) {
                map.items.push({ start: [], key: null, sep: [this.sourceToken] });
              } else if (includesToken(it.sep, "map-value-ind")) {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start, key: null, sep: [this.sourceToken] }],
                });
              } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                const start = getFirstKeyStartProps(it.start);
                const key = it.key;
                const sep = it.sep;
                sep.push(this.sourceToken);
                delete it.key;
                delete it.sep;
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start, key, sep }],
                });
              } else if (start.length > 0) {
                it.sep = it.sep.concat(start, this.sourceToken);
              } else {
                it.sep.push(this.sourceToken);
              }
            } else {
              if (!it.sep) {
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              } else if (it.value || atNextItem) {
                map.items.push({ start, key: null, sep: [this.sourceToken] });
              } else if (includesToken(it.sep, "map-value-ind")) {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [], key: null, sep: [this.sourceToken] }],
                });
              } else {
                it.sep.push(this.sourceToken);
              }
            }
            this.onKeyLine = true;
            return;
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar": {
            const fs = this.flowScalar(this.type);
            if (atNextItem || it.value) {
              map.items.push({ start, key: fs, sep: [] });
              this.onKeyLine = true;
            } else if (it.sep) {
              this.stack.push(fs);
            } else {
              Object.assign(it, { key: fs, sep: [] });
              this.onKeyLine = true;
            }
            return;
          }
          default: {
            const bv = this.startBlockValue(map);
            if (bv) {
              if (bv.type === "block-seq") {
                if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                  yield* this.pop({
                    type: "error",
                    offset: this.offset,
                    message: "Unexpected block-seq-ind on same line with key",
                    source: this.source,
                  });
                  return;
                }
              } else if (atMapIndent) {
                map.items.push({ start });
              }
              this.stack.push(bv);
              return;
            }
          }
        }
      }
      yield* this.pop();
      yield* this.step();
    }
    *blockSequence(seq) {
      const it = seq.items[seq.items.length - 1];
      switch (this.type) {
        case "newline":
          if (it.value) {
            const end = "end" in it.value ? it.value.end : undefined;
            const last = Array.isArray(end) ? end[end.length - 1] : undefined;
            if (last?.type === "comment") end?.push(this.sourceToken);
            else seq.items.push({ start: [this.sourceToken] });
          } else it.start.push(this.sourceToken);
          return;
        case "space":
        case "comment":
          if (it.value) seq.items.push({ start: [this.sourceToken] });
          else {
            if (this.atIndentedComment(it.start, seq.indent)) {
              const prev = seq.items[seq.items.length - 2];
              const end = prev?.value?.end;
              if (Array.isArray(end)) {
                arrayPushArray(end, it.start);
                end.push(this.sourceToken);
                seq.items.pop();
                return;
              }
            }
            it.start.push(this.sourceToken);
          }
          return;
        case "anchor":
        case "tag":
          if (it.value || this.indent <= seq.indent) break;
          it.start.push(this.sourceToken);
          return;
        case "seq-item-ind":
          if (this.indent !== seq.indent) break;
          if (it.value || includesToken(it.start, "seq-item-ind"))
            seq.items.push({ start: [this.sourceToken] });
          else it.start.push(this.sourceToken);
          return;
      }
      if (this.indent > seq.indent) {
        const bv = this.startBlockValue(seq);
        if (bv) {
          this.stack.push(bv);
          return;
        }
      }
      yield* this.pop();
      yield* this.step();
    }
    *flowCollection(fc) {
      const it = fc.items[fc.items.length - 1];
      if (this.type === "flow-error-end") {
        let top;
        do {
          yield* this.pop();
          top = this.peek(1);
        } while (top?.type === "flow-collection");
      } else if (fc.end.length === 0) {
        switch (this.type) {
          case "comma":
          case "explicit-key-ind":
            if (!it || it.sep) fc.items.push({ start: [this.sourceToken] });
            else it.start.push(this.sourceToken);
            return;
          case "map-value-ind":
            if (!it || it.value) fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
            else if (it.sep) it.sep.push(this.sourceToken);
            else Object.assign(it, { key: null, sep: [this.sourceToken] });
            return;
          case "space":
          case "comment":
          case "newline":
          case "anchor":
          case "tag":
            if (!it || it.value) fc.items.push({ start: [this.sourceToken] });
            else if (it.sep) it.sep.push(this.sourceToken);
            else it.start.push(this.sourceToken);
            return;
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar": {
            const fs = this.flowScalar(this.type);
            if (!it || it.value) fc.items.push({ start: [], key: fs, sep: [] });
            else if (it.sep) this.stack.push(fs);
            else Object.assign(it, { key: fs, sep: [] });
            return;
          }
          case "flow-map-end":
          case "flow-seq-end":
            fc.end.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(fc);
        if (bv) this.stack.push(bv);
        else {
          yield* this.pop();
          yield* this.step();
        }
      } else {
        const parent = this.peek(2);
        if (
          parent.type === "block-map" &&
          ((this.type === "map-value-ind" && parent.indent === fc.indent) ||
            (this.type === "newline" && !parent.items[parent.items.length - 1].sep))
        ) {
          yield* this.pop();
          yield* this.step();
        } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          fixFlowSeqItems(fc);
          const sep = fc.end.splice(1, fc.end.length);
          sep.push(this.sourceToken);
          const map = {
            type: "block-map",
            offset: fc.offset,
            indent: fc.indent,
            items: [{ start, key: fc, sep }],
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else {
          yield* this.lineEnd(fc);
        }
      }
    }
    flowScalar(type) {
      if (this.onNewLine) {
        let nl =
          this.source.indexOf(`
`) + 1;
        while (nl !== 0) {
          this.onNewLine(this.offset + nl);
          nl =
            this.source.indexOf(
              `
`,
              nl,
            ) + 1;
        }
      }
      return {
        type,
        offset: this.offset,
        indent: this.indent,
        source: this.source,
      };
    }
    startBlockValue(parent) {
      switch (this.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return this.flowScalar(this.type);
        case "block-scalar-header":
          return {
            type: "block-scalar",
            offset: this.offset,
            indent: this.indent,
            props: [this.sourceToken],
            source: "",
          };
        case "flow-map-start":
        case "flow-seq-start":
          return {
            type: "flow-collection",
            offset: this.offset,
            indent: this.indent,
            start: this.sourceToken,
            items: [],
            end: [],
          };
        case "seq-item-ind":
          return {
            type: "block-seq",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken] }],
          };
        case "explicit-key-ind": {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          start.push(this.sourceToken);
          return {
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start, explicitKey: true }],
          };
        }
        case "map-value-ind": {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          return {
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start, key: null, sep: [this.sourceToken] }],
          };
        }
      }
      return null;
    }
    atIndentedComment(start, indent) {
      if (this.type !== "comment") return false;
      if (this.indent <= indent) return false;
      return start.every((st) => st.type === "newline" || st.type === "space");
    }
    *documentEnd(docEnd) {
      if (this.type !== "doc-mode") {
        if (docEnd.end) docEnd.end.push(this.sourceToken);
        else docEnd.end = [this.sourceToken];
        if (this.type === "newline") yield* this.pop();
      }
    }
    *lineEnd(token) {
      switch (this.type) {
        case "comma":
        case "doc-start":
        case "doc-end":
        case "flow-seq-end":
        case "flow-map-end":
        case "map-value-ind":
          yield* this.pop();
          yield* this.step();
          break;
        case "newline":
          this.onKeyLine = false;
        case "space":
        case "comment":
        default:
          if (token.end) token.end.push(this.sourceToken);
          else token.end = [this.sourceToken];
          if (this.type === "newline") yield* this.pop();
      }
    }
  }
  exports.Parser = Parser;
});

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS(function (exports) {
  var composer = require_composer();
  var Document = require_Document();
  var errors = require_errors();
  var log = require_log();
  var identity = require_identity();
  var lineCounter = require_line_counter();
  var parser = require_parser();
  function parseOptions(options) {
    const prettyErrors = options.prettyErrors !== false;
    const lineCounter$1 =
      options.lineCounter || (prettyErrors && new lineCounter.LineCounter()) || null;
    return { lineCounter: lineCounter$1, prettyErrors };
  }
  function parseAllDocuments(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser$1 = new parser.Parser(lineCounter?.addNewLine);
    const composer$1 = new composer.Composer(options);
    const docs = Array.from(composer$1.compose(parser$1.parse(source)));
    if (prettyErrors && lineCounter)
      for (const doc of docs) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter));
      }
    if (docs.length > 0) return docs;
    return Object.assign([], { empty: true }, composer$1.streamInfo());
  }
  function parseDocument(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser$1 = new parser.Parser(lineCounter?.addNewLine);
    const composer$1 = new composer.Composer(options);
    let doc = null;
    for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
      if (!doc) doc = _doc;
      else if (doc.options.logLevel !== "silent") {
        doc.errors.push(
          new errors.YAMLParseError(
            _doc.range.slice(0, 2),
            "MULTIPLE_DOCS",
            "Source contains multiple documents; please use YAML.parseAllDocuments()",
          ),
        );
        break;
      }
    }
    if (prettyErrors && lineCounter) {
      doc.errors.forEach(errors.prettifyError(source, lineCounter));
      doc.warnings.forEach(errors.prettifyError(source, lineCounter));
    }
    return doc;
  }
  function parse(src, reviver, options) {
    let _reviver = undefined;
    if (typeof reviver === "function") {
      _reviver = reviver;
    } else if (options === undefined && reviver && typeof reviver === "object") {
      options = reviver;
    }
    const doc = parseDocument(src, options);
    if (!doc) return null;
    doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
    if (doc.errors.length > 0) {
      if (doc.options.logLevel !== "silent") throw doc.errors[0];
      else doc.errors = [];
    }
    return doc.toJS(Object.assign({ reviver: _reviver }, options));
  }
  function stringify(value, replacer, options) {
    let _replacer = null;
    if (typeof replacer === "function" || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === undefined && replacer) {
      options = replacer;
    }
    if (typeof options === "string") options = options.length;
    if (typeof options === "number") {
      const indent = Math.round(options);
      options = indent < 1 ? undefined : indent > 8 ? { indent: 8 } : { indent };
    }
    if (value === undefined) {
      const { keepUndefined } = options ?? replacer ?? {};
      if (!keepUndefined) return;
    }
    if (identity.isDocument(value) && !_replacer) return value.toString(options);
    return new Document.Document(value, _replacer, options).toString(options);
  }
  exports.parse = parse;
  exports.parseAllDocuments = parseAllDocuments;
  exports.parseDocument = parseDocument;
  exports.stringify = stringify;
});

// ../../../node_modules/.bun/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS(function (exports, module) {
  module.exports = isexe;
  isexe.sync = sync;
  var fs = __require("fs");
  function checkPathExt(path, options) {
    var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path, options);
  }
  function isexe(path, options, cb) {
    fs.stat(path, function (er, stat) {
      cb(er, er ? false : checkStat(stat, path, options));
    });
  }
  function sync(path, options) {
    return checkStat(fs.statSync(path), path, options);
  }
});

// ../../../node_modules/.bun/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS(function (exports, module) {
  module.exports = isexe;
  isexe.sync = sync;
  var fs = __require("fs");
  function isexe(path, options, cb) {
    fs.stat(path, function (er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync(path, options) {
    return checkStat(fs.statSync(path), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret =
      mod & o ||
      (mod & g && gid === myGid) ||
      (mod & u && uid === myUid) ||
      (mod & ug && myUid === 0);
    return ret;
  }
});

// ../../../node_modules/.bun/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS(function (exports, module) {
  var fs = __require("fs");
  var core;
  if (process.platform === "win32" || global.TESTING_WINDOWS) {
    core = require_windows();
  } else {
    core = require_mode();
  }
  module.exports = isexe;
  isexe.sync = sync;
  function isexe(path, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== "function") {
        throw new TypeError("callback not provided");
      }
      return new Promise(function (resolve, reject) {
        isexe(path, options || {}, function (er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core(path, options || {}, function (er, is) {
      if (er) {
        if (er.code === "EACCES" || (options && options.ignoreErrors)) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  }
  function sync(path, options) {
    try {
      return core.sync(path, options || {});
    } catch (er) {
      if ((options && options.ignoreErrors) || er.code === "EACCES") {
        return false;
      } else {
        throw er;
      }
    }
  }
});

// ../../../node_modules/.bun/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS(function (exports, module) {
  var isWindows =
    process.platform === "win32" ||
    process.env.OSTYPE === "cygwin" ||
    process.env.OSTYPE === "msys";
  var path = __require("path");
  var COLON = isWindows ? ";" : ":";
  var isexe = require_isexe();
  var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
  var getPathInfo = (cmd, opt) => {
    const colon = opt.colon || COLON;
    const pathEnv =
      cmd.match(/\//) || (isWindows && cmd.match(/\\/))
        ? [""]
        : [
            ...(isWindows ? [process.cwd()] : []),
            ...(opt.path || process.env.PATH || "").split(colon),
          ];
    const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
    const pathExt = isWindows ? pathExtExe.split(colon) : [""];
    if (isWindows) {
      if (cmd.indexOf(".") !== -1 && pathExt[0] !== "") pathExt.unshift("");
    }
    return {
      pathEnv,
      pathExt,
      pathExtExe,
    };
  };
  var which = (cmd, opt, cb) => {
    if (typeof opt === "function") {
      cb = opt;
      opt = {};
    }
    if (!opt) opt = {};
    const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
    const found = [];
    const step = (i) =>
      new Promise((resolve, reject) => {
        if (i === pathEnv.length)
          return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve(subStep(p, i, 0));
      });
    const subStep = (p, i, ii) =>
      new Promise((resolve, reject) => {
        if (ii === pathExt.length) return resolve(step(i + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all) found.push(p + ext);
            else return resolve(p + ext);
          }
          return resolve(subStep(p, i, ii + 1));
        });
      });
    return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
  };
  var whichSync = (cmd, opt) => {
    opt = opt || {};
    const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
    const found = [];
    for (let i = 0; i < pathEnv.length; i++) {
      const ppRaw = pathEnv[i];
      const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
      const pCmd = path.join(pathPart, cmd);
      const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
      for (let j = 0; j < pathExt.length; j++) {
        const cur = p + pathExt[j];
        try {
          const is = isexe.sync(cur, { pathExt: pathExtExe });
          if (is) {
            if (opt.all) found.push(cur);
            else return cur;
          }
        } catch (ex) {}
      }
    }
    if (opt.all && found.length) return found;
    if (opt.nothrow) return null;
    throw getNotFoundError(cmd);
  };
  module.exports = which;
  which.sync = whichSync;
});

// ../../../node_modules/.bun/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = __commonJS(function (exports, module) {
  var pathKey = (options = {}) => {
    const environment = options.env || process.env;
    const platform = options.platform || process.platform;
    if (platform !== "win32") {
      return "PATH";
    }
    return (
      Object.keys(environment)
        .reverse()
        .find((key) => key.toUpperCase() === "PATH") || "Path"
    );
  };
  module.exports = pathKey;
  module.exports.default = pathKey;
});

// ../../../node_modules/.bun/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS(function (exports, module) {
  var path = __require("path");
  var which = require_which();
  var getPathKey = require_path_key();
  function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;
    if (shouldSwitchCwd) {
      try {
        process.chdir(parsed.options.cwd);
      } catch (err) {}
    }
    let resolved;
    try {
      resolved = which.sync(parsed.command, {
        path: env[getPathKey({ env })],
        pathExt: withoutPathExt ? path.delimiter : undefined,
      });
    } catch (e) {
    } finally {
      if (shouldSwitchCwd) {
        process.chdir(cwd);
      }
    }
    if (resolved) {
      resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
    }
    return resolved;
  }
  function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
  }
  module.exports = resolveCommand;
});

// ../../../node_modules/.bun/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS(function (exports, module) {
  var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
  function escapeCommand(arg) {
    arg = arg.replace(metaCharsRegExp, "^$1");
    return arg;
  }
  function escapeArgument(arg, doubleEscapeMetaChars) {
    arg = `${arg}`;
    arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
    arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
    arg = `"${arg}"`;
    arg = arg.replace(metaCharsRegExp, "^$1");
    if (doubleEscapeMetaChars) {
      arg = arg.replace(metaCharsRegExp, "^$1");
    }
    return arg;
  }
  exports.command = escapeCommand;
  exports.argument = escapeArgument;
});

// ../../../node_modules/.bun/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS(function (exports, module) {
  module.exports = /^#!(.*)/;
});

// ../../../node_modules/.bun/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS(function (exports, module) {
  var shebangRegex = require_shebang_regex();
  module.exports = (string = "") => {
    const match = string.match(shebangRegex);
    if (!match) {
      return null;
    }
    const [path, argument] = match[0].replace(/#! ?/, "").split(" ");
    const binary = path.split("/").pop();
    if (binary === "env") {
      return argument;
    }
    return argument ? `${binary} ${argument}` : binary;
  };
});

// ../../../node_modules/.bun/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS(function (exports, module) {
  var fs = __require("fs");
  var shebangCommand = require_shebang_command();
  function readShebang(command) {
    const size = 150;
    const buffer = Buffer.alloc(size);
    let fd;
    try {
      fd = fs.openSync(command, "r");
      fs.readSync(fd, buffer, 0, size, 0);
      fs.closeSync(fd);
    } catch (e) {}
    return shebangCommand(buffer.toString());
  }
  module.exports = readShebang;
});

// ../../../node_modules/.bun/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS(function (exports, module) {
  var path = __require("path");
  var resolveCommand = require_resolveCommand();
  var escape = require_escape();
  var readShebang = require_readShebang();
  var isWin = process.platform === "win32";
  var isExecutableRegExp = /\.(?:com|exe)$/i;
  var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);
    const shebang = parsed.file && readShebang(parsed.file);
    if (shebang) {
      parsed.args.unshift(parsed.file);
      parsed.command = shebang;
      return resolveCommand(parsed);
    }
    return parsed.file;
  }
  function parseNonShell(parsed) {
    if (!isWin) {
      return parsed;
    }
    const commandFile = detectShebang(parsed);
    const needsShell = !isExecutableRegExp.test(commandFile);
    if (parsed.options.forceShell || needsShell) {
      const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
      parsed.command = path.normalize(parsed.command);
      parsed.command = escape.command(parsed.command);
      parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
      const shellCommand = [parsed.command].concat(parsed.args).join(" ");
      parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
      parsed.command = process.env.comspec || "cmd.exe";
      parsed.options.windowsVerbatimArguments = true;
    }
    return parsed;
  }
  function parse(command, args, options) {
    if (args && !Array.isArray(args)) {
      options = args;
      args = null;
    }
    args = args ? args.slice(0) : [];
    options = Object.assign({}, options);
    const parsed = {
      command,
      args,
      options,
      file: undefined,
      original: {
        command,
        args,
      },
    };
    return options.shell ? parsed : parseNonShell(parsed);
  }
  module.exports = parse;
});

// ../../../node_modules/.bun/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS(function (exports, module) {
  var isWin = process.platform === "win32";
  function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${syscall} ${original.command}`,
      path: original.command,
      spawnargs: original.args,
    });
  }
  function hookChildProcess(cp, parsed) {
    if (!isWin) {
      return;
    }
    const originalEmit = cp.emit;
    cp.emit = function (name, arg1) {
      if (name === "exit") {
        const err = verifyENOENT(arg1, parsed);
        if (err) {
          return originalEmit.call(cp, "error", err);
        }
      }
      return originalEmit.apply(cp, arguments);
    };
  }
  function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawn");
    }
    return null;
  }
  function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawnSync");
    }
    return null;
  }
  module.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
  };
});

// ../../../node_modules/.bun/cross-spawn@7.0.6/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS(function (exports, module) {
  var cp = __require("child_process");
  var parse = require_parse();
  var enoent = require_enoent();
  function spawn(command, args, options) {
    const parsed = parse(command, args, options);
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
  }
  function spawnSync(command, args, options) {
    const parsed = parse(command, args, options);
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
  }
  module.exports = spawn;
  module.exports.spawn = spawn;
  module.exports.sync = spawnSync;
  module.exports._parse = parse;
  module.exports._enoent = enoent;
});

// scripts/bench/paired-m05-product.mjs
import assert from "node:assert/strict";
import { createHash as createHash4 } from "node:crypto";
import { readFileSync as readFileSync3, writeFileSync as writeFileSync2 } from "node:fs";
import { performance } from "node:perf_hooks";

// packages/core/dist/chunk-QI7GDWPY.js
var ce = new Set([
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
var ae = new Set(["external_write", "credentials", "publish", "deploy"]);
// packages/core/dist/chunk-GR4IIA5M.js
var w = 64 * 1024;

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/core.js
var _a;
function $constructor(name, initializer, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: new Set(),
        },
        enumerable: false,
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {}
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent) return true;
      return inst?._zod?.traits?.has(name);
    },
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = Symbol("zod_brand");

class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  if (newConfig) Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries)
    .filter(([k, _]) => numericValues.indexOf(+k) === -1)
    .map(([_, v]) => v);
  return values;
}
function joinValues(array, separator = "|") {
  return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint") return value.toString();
  return value;
}
function cached(getter) {
  const set = false;
  return {
    get value() {
      if (!set) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    },
  };
}
function nullish(input) {
  return input === null || input === undefined;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const ratio = val / step;
  const roundedRatio = Math.round(ratio);
  const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
  if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
  return ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v,
      });
    },
    configurable: true,
  });
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__ */ cached(() => {
  if (globalConfig.jitless) {
    return false;
  }
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false) return false;
  const ctor = o.constructor;
  if (ctor === undefined) return true;
  if (typeof ctor !== "function") return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o)) return { ...o };
  if (Array.isArray(o)) return [...o];
  if (o instanceof Map) return new Map(o);
  if (o instanceof Set) return new Set(o);
  return o;
}
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent) cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params) return {};
  if (typeof params === "string") return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string") return { ...params, error: () => params.error };
  return params;
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint") return value.toString() + "n";
  if (typeof value === "string") return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key]) continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: [],
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key]) continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: [],
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
  });
  return clone(schema, def);
}
function merge(a, b) {
  if (a._zod.def.checks?.length) {
    throw new Error(
      ".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.",
    );
  }
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: b._zod.def.checks ?? [],
  });
  return clone(a, def);
}
function partial(Class, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key]) continue;
          shape[key] = Class
            ? new Class({
                type: "optional",
                innerType: oldShape[key],
              })
            : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class
            ? new Class({
                type: "optional",
                innerType: oldShape[key],
              })
            : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: [],
  });
  return clone(schema, def);
}
function required(Class, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key]) continue;
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key],
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key],
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true) return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true) return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue === false) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
  const message = iss.message
    ? iss.message
    : (unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
      unwrapMessage(ctx?.error?.(iss)) ??
      unwrapMessage(config.customError?.(iss)) ??
      unwrapMessage(config.localeError?.(iss)) ??
      "Invalid input");
  const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
  rest.path ?? (rest.path = []);
  rest.message = message;
  if (ctx?.reportInput) {
    rest.input = _input;
  }
  return rest;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input)) return "array";
  if (typeof input === "string") return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (
        obj &&
        Object.getPrototypeOf(obj) !== Object.prototype &&
        "constructor" in obj &&
        obj.constructor
      ) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst,
    };
  }
  return { ...iss };
}

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false,
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false,
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false,
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error, path = []) => {
    for (const issue of error.issues) {
      if (issue.code === "invalid_union" && issue.errors.length) {
        issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
      } else if (issue.code === "invalid_key") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else if (issue.code === "invalid_element") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else {
        const fullpath = [...path, ...issue.path];
        if (fullpath.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(
      result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
    );
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(
      result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
    );
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length
    ? {
        success: false,
        error: new (_Err ?? $ZodError)(
          result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
        ),
      }
    : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) result = await result;
  return result.issues.length
    ? {
        success: false,
        error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
      }
    : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/regexes.js
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration =
  /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(
    `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
  );
};
var email =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 =
  /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 =
  /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 =
  /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex =
    typeof args.precision === "number"
      ? args.precision === -1
        ? `${hhmm}`
        : args.precision === 0
          ? `${hhmm}:[0-5]\\d`
          : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
      : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local) opts.push("");
  if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date",
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive) bag.maximum = def.value;
      else bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive) bag.minimum = def.value;
      else bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst) => {
    var _a;
    (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple =
      typeof payload.value === "bigint"
        ? payload.value % def.value === BigInt(0)
        : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple) return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt) bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst,
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort,
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort,
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort,
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort,
      });
    }
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ??
    (_a.when = (payload) => {
      const val = payload.value;
      return !nullish(val) && val.length !== undefined;
    });
  inst._zod.onattach.push((inst) => {
    const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum) return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ??
    (_a.when = (payload) => {
      const val = payload.value;
      return !nullish(val) && val.length !== undefined;
    });
  inst._zod.onattach.push((inst) => {
    const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum) return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ??
    (_a.when = (payload) => {
      const val = payload.value;
      return !nullish(val) && val.length !== undefined;
    });
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length) return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...(tooBig
        ? { code: "too_big", maximum: def.length }
        : { code: "too_small", minimum: def.length }),
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a = inst._zod).check ??
      (_a.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: def.format,
          input: payload.value,
          ...(def.pattern ? { pattern: def.pattern.toString() } : {}),
          inst,
          continue: !def.abort,
        });
      });
  else (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value)) return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(
    typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex,
  );
  def.pattern = pattern;
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.patterns ?? (bag.patterns = new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position)) return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.patterns ?? (bag.patterns = new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix)) return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.patterns ?? (bag.patterns = new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix)) return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this) this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content
      .split(
        `
`,
      )
      .filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines
      .map((x) => x.slice(minIndent))
      .map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(
      ...args,
      lines.join(`
`),
    );
  }
}

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 4,
  patch: 3,
};

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...(inst._zod.def.checks ?? [])];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks) {
        if (ch._zod.def.when) {
          if (explicitlyAborted(payload)) continue;
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun) continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen) return;
            if (!isAborted) isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen) continue;
          if (!isAborted) isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false) throw new $ZodAsyncError();
        return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse(
          { value: payload.value, issues: [] },
          { ...ctx, skipChecks: true },
        );
        if (canary instanceof Promise) {
          return canary.then((canary) => {
            return handleCanaryResult(canary, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false) throw new $ZodAsyncError();
        return result.then((result) => runChecks(result, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) =>
          r.success ? { value: r.data } : { issues: r.error?.issues },
        );
      }
    },
    vendor: "zod",
    version: 1,
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...(inst?._zod.bag?.patterns ?? [])].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_) {}
    if (typeof payload.value === "string") return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst,
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8,
    };
    const v = versionMap[def.version];
    if (v === undefined) throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      if (!def.normalize && def.protocol?.source === httpProtocol.source) {
        if (!/^https?:\/\//i.test(trimmed)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid URL format",
            input: payload.value,
            inst,
            continue: !def.abort,
          });
          return;
        }
      }
      const url = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort,
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (
          !def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)
        ) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort,
          });
        }
      }
      if (def.normalize) {
        payload.value = url.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort,
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort,
      });
    }
  };
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2) throw new Error();
      const [address, prefix] = parts;
      if (!prefix) throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix) throw new Error();
      if (prefixNum < 0 || prefixNum > 128) throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort,
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "") return true;
  if (/\s/.test(data)) return false;
  if (data.length % 4 !== 0) return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value)) return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data)) return false;
  const base64 = data.replace(/[-_]/g, (c) => (c === "-" ? "+" : "/"));
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value)) return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3) return false;
    const [header] = tokensParts;
    if (!header) return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
    if (!parsedHeader.alg) return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg)) return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort,
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received =
      typeof input === "number"
        ? Number.isNaN(input)
          ? "NaN"
          : !Number.isFinite(input)
            ? "Infinity"
            : undefined
        : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...(received ? { received } : {}),
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean") return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst,
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null) return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst,
    });
    return payload;
  };
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst,
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst,
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run(
        {
          value: item,
          issues: [],
        },
        ctx,
      );
      if (result instanceof Promise) {
        proms.push(result.then((result) => handleArrayResult(result, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
  const isPresent = key in input;
  if (result.issues.length) {
    if (isOptionalIn && isOptionalOut && !isPresent) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && !isOptionalIn) {
    if (!result.issues.length) {
      final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: undefined,
        path: [key],
      });
    }
    return;
  }
  if (result.value === undefined) {
    if (isPresent) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys),
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalIn = _catchall.optin === "optional";
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (key === "__proto__") continue;
    if (keySet.has(key)) continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(
        r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)),
      );
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst,
    });
  }
  if (!proms.length) return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh,
        });
        return newSh;
      },
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = new Set());
        for (const v of field.values) propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst,
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalIn = el._zod.optin === "optional";
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(
          r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)),
        );
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalIn = schema?._zod?.optin === "optional";
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalIn && isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }

        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }

      `);
      } else if (!isOptionalIn) {
        doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }

        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }

      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst,
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass) fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall) return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () =>
    def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined,
  );
  defineLazy(inst._zod, "optout", () =>
    def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined,
  );
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run(
        {
          value: payload.value,
          issues: [],
        },
        ctx,
      );
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0) return result;
        results.push(result);
      }
    }
    if (!async) return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results) => {
      return handleUnionResults(results, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(
          `Invalid discriminated union option at index "${def.options.indexOf(option)}"`,
        );
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k]) propValues[k] = new Set();
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map = new Map();
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map.set(v, o);
      }
    }
    return map;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst,
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback || ctx.direction === "backward") {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      options: Array.from(disc.value.keys()),
      input,
      path: [def.discriminator],
      inst,
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left, right]) => {
        return handleIntersectionResults(payload, left, right);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = new Map();
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k)) unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k)) unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result)) return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(
      `Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`,
    );
  }
  result.value = merged.data;
  return result;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst,
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = new Set();
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
          if (keyResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (keyResult.issues.length) {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst,
            });
            continue;
          }
          const outKey = keyResult.value;
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(
              result.then((result) => {
                if (result.issues.length) {
                  payload.issues.push(...prefixIssues(key, result.issues));
                }
                payload.value[outKey] = result.value;
              }),
            );
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized,
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__") continue;
        if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey =
          typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst,
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(
            result.then((result) => {
              if (result.issues.length) {
                payload.issues.push(...prefixIssues(key, result.issues));
              }
              payload.value[keyResult.value] = result.value;
            }),
          );
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(
    `^(${values
      .filter((k) => propertyKeyTypes.has(typeof k))
      .map((o) => (typeof o === "string" ? escapeRegex(o) : o.toString()))
      .join("|")})$`,
  );
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst,
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(
    `^(${def.values.map((o) => (typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o))).join("|")})$`,
  );
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst,
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output) => {
        payload.value = output;
        payload.fallback = true;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    payload.fallback = true;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (input === undefined && (result.issues.length || result.fallback)) {
    return { issues: [], value: undefined };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values
      ? new Set([...def.innerType._zod.values, undefined])
      : undefined;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const input = payload.value;
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
      return handleOptionalResult(result, input);
    }
    if (payload.value === undefined) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null) return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleDefaultResult(result, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleNonOptionalResult(result, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === undefined) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst,
    });
  }
  return payload;
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => {
        payload.value = result.value;
        if (result.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
            },
            input: payload.value,
          });
          payload.issues = [];
          payload.fallback = true;
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
        },
        input: payload.value,
      });
      payload.issues = [];
      payload.fallback = true;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right) => handlePipeResult(right, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left) => handlePipeResult(left, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r) => handleRefineResult(r, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...(inst._zod.def.path ?? [])],
      continue: !inst._zod.def.abort,
    };
    if (inst._zod.def.params) _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/locales/en.js
var error = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" },
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input",
  };
  const TypeDictionary = {
    nan: "NaN",
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Invalid discriminator value. Expected ${opts}`;
        }
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error(),
  };
}
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/registries.js
var _a2;
var $output = Symbol("ZodOutput");
var $input = Symbol("ZodInput");

class $ZodRegistry {
  constructor() {
    this._map = new WeakMap();
    this._idmap = new Map();
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = new WeakMap();
    this._idmap = new Map();
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...(this.get(p) ?? {}) };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : undefined;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry();
}
(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/api.js
function _string(Class, params) {
  return new Class({
    type: "string",
    ...normalizeParams(params),
  });
}
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params),
  });
}
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params),
  });
}
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params),
  });
}
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _emoji2(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params),
  });
}
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params),
  });
}
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params),
  });
}
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params),
  });
}
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params),
  });
}
function _number(Class, params) {
  return new Class({
    type: "number",
    checks: [],
    ...normalizeParams(params),
  });
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params),
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params),
  });
}
function _null2(Class, params) {
  return new Class({
    type: "null",
    ...normalizeParams(params),
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown",
  });
}
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params),
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false,
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true,
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false,
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true,
  });
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value,
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum,
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum,
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length,
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern,
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params),
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params),
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes,
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix,
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix,
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx,
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    ...normalizeParams(params),
  });
}
function _custom(Class, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...norm,
  });
  return schema;
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params),
  });
  return schema;
}
function _superRefine(fn, params) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal) _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  }, params);
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4") target = "draft-04";
  if (target === "draft-7") target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {}),
    io: params?.io ?? "output",
    counter: 0,
    seen: new Map(),
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? undefined,
  };
}
function process2(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path,
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref) result.ref = parent;
      process2(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta = ctx.metadataRegistry.get(schema);
  if (meta) Object.assign(result.schema, meta);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema)
    (_a = result.schema).default ?? (_a.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(
          `Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
        );
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id) => id);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId) seen.defId = defId;
    const schema = seen.schema;
    for (const key in schema) {
      delete schema[key];
    }
    schema.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error(
          "Cycle detected: " +
            `#/${seen.cycle?.join("/")}/<root>` +
            '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.',
        );
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null) return;
    const schema = seen.def ?? seen.schema;
    const _cached = { ...schema };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (
        refSchema.$ref &&
        (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")
      ) {
        schema.allOf = schema.allOf ?? [];
        schema.allOf.push(refSchema);
      } else {
        Object.assign(schema, refSchema);
      }
      Object.assign(schema, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf") continue;
          if (!(key in _cached)) {
            delete schema[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf") continue;
          if (
            key in refSeen.def &&
            JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])
          ) {
            delete schema[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema) {
            if (key === "$ref" || key === "allOf") continue;
            if (
              key in parentSeen.def &&
              JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])
            ) {
              delete schema[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema,
      path: seen.path ?? [],
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id) throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  if (rootMetaId !== undefined && result.id === rootMetaId) delete result.id;
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      if (seen.def.id === seen.defId) delete seen.def.id;
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {
  } else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors),
        },
      },
      enumerable: false,
      writable: false,
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: new Set() };
  if (ctx.seen.has(_schema)) return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform") return true;
  if (def.type === "array") return isTransforming(def.element, ctx);
  if (def.type === "set") return isTransforming(def.valueType, ctx);
  if (def.type === "lazy") return isTransforming(def.getter(), ctx);
  if (
    def.type === "promise" ||
    def.type === "optional" ||
    def.type === "nonoptional" ||
    def.type === "nullable" ||
    def.type === "readonly" ||
    def.type === "default" ||
    def.type === "prefault"
  ) {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    if (_schema._zod.traits.has("$ZodCodec")) return true;
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx)) return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx)) return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx)) return true;
    }
    if (def.rest && isTransforming(def.rest, ctx)) return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod =
  (schema, processors = {}) =>
  (params) => {
    const ctx = initializeContext({ ...params, processors });
    process2(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
  };
var createStandardJSONSchemaMethod =
  (schema, io, processors = {}) =>
  (params) => {
    const { libraryOptions, target } = params ?? {};
    const ctx = initializeContext({ ...(libraryOptions ?? {}), target, io, processors });
    process2(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
  };
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: "",
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number") json.minLength = minimum;
  if (typeof maximum === "number") json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "") delete json.format;
    if (format === "time") {
      delete json.format;
    }
  }
  if (contentEncoding) json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1) json.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json.allOf = [
        ...regexes.map((regex) => ({
          ...(ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0"
            ? { type: "string" }
            : {}),
          pattern: regex.source,
        })),
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } =
    schema._zod.bag;
  if (typeof format === "string" && format.includes("int")) json.type = "integer";
  else json.type = "number";
  const exMin =
    typeof exclusiveMinimum === "number" &&
    exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
  const exMax =
    typeof exclusiveMaximum === "number" &&
    exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
  if (exMin) {
    if (legacy) {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  } else if (typeof minimum === "number") {
    json.minimum = minimum;
  }
  if (exMax) {
    if (legacy) {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  } else if (typeof maximum === "number") {
    json.maximum = maximum;
  }
  if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number")) json.type = "number";
  if (values.every((v) => typeof v === "string")) json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {
  } else if (vals.length === 1) {
    const val = vals[0];
    json.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number")) json.type = "number";
    if (vals.every((v) => typeof v === "string")) json.type = "string";
    if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
    if (vals.every((v) => v === null)) json.type = "null";
    json.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const pattern = schema._zod.pattern;
  if (!pattern) throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const file = {
    type: "string",
    format: "binary",
    contentEncoding: "binary",
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== undefined) file.minLength = minimum;
  if (maximum !== undefined) file.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file.contentMediaType = mime[0];
      Object.assign(_json, file);
    } else {
      Object.assign(_json, file);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file);
  }
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number") json.minItems = minimum;
  if (typeof maximum === "number") json.maxItems = maximum;
  json.type = "array";
  json.items = process2(def.element, ctx, {
    ...params,
    path: [...params.path, "items"],
  });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  json.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json.properties[key] = process2(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key],
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set(
    [...allKeys].filter((key) => {
      const v = def.shape[key]._zod;
      if (ctx.io === "input") {
        return v.optin === undefined;
      } else {
        return v.optout === undefined;
      }
    }),
  );
  if (requiredKeys.size > 0) {
    json.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output") json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = process2(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"],
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) =>
    process2(x, ctx, {
      ...params,
      path: [...params.path, isExclusive ? "oneOf" : "anyOf", i],
    }),
  );
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const a = process2(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0],
  });
  const b = process2(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1],
  });
  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
  const allOf = [
    ...(isSimpleIntersection(a) ? a.allOf : [a]),
    ...(isSimpleIntersection(b) ? b.allOf : [b]),
  ];
  json.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath =
    ctx.target === "draft-2020-12"
      ? "items"
      : ctx.target === "openapi-3.0"
        ? "items"
        : "additionalItems";
  const prefixItems = def.items.map((x, i) =>
    process2(x, ctx, {
      ...params,
      path: [...params.path, prefixPath, i],
    }),
  );
  const rest = def.rest
    ? process2(def.rest, ctx, {
        ...params,
        path: [
          ...params.path,
          restPath,
          ...(ctx.target === "openapi-3.0" ? [def.items.length] : []),
        ],
      })
    : null;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (rest) {
      json.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems,
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    json.minItems = prefixItems.length;
    if (!rest) {
      json.maxItems = prefixItems.length;
    }
  } else {
    json.items = prefixItems;
    if (rest) {
      json.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number") json.minItems = minimum;
  if (typeof maximum === "number") json.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"],
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      json.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = process2(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"],
      });
    }
    json.additionalProperties = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"],
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter(
      (v) => typeof v === "string" || typeof v === "number",
    );
    if (validKeyValues.length > 0) {
      json.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
  const innerType = ctx.io === "input" ? (inIsTransform ? def.out : def.in) : def.out;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor,
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry = input;
    const ctx = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry._idmap.entries()) {
      const [_, schema] = entry;
      process2(schema, ctx);
    }
    const schemas = {};
    const external = {
      registry,
      uri: params?.uri,
      defs,
    };
    ctx.external = external;
    for (const entry of registry._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx, schema);
      schemas[key] = finalize(ctx, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs,
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process2(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/classic/iso.js
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper),
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper),
    },
    addIssue: {
      value: (issue) => {
        inst.issues.push(issue);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      },
    },
    addIssues: {
      value: (issues) => {
        inst.issues.push(...issues);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      },
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      },
    },
  });
};
var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, {
  Parent: Error,
});

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/classic/parse.js
var parse3 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
var _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
  const proto = Object.getPrototypeOf(inst);
  let installed = _installedGroups.get(proto);
  if (!installed) {
    installed = new Set();
    _installedGroups.set(proto, installed);
  }
  if (installed.has(group)) return;
  installed.add(group);
  for (const key in methods) {
    const fn = methods[key];
    Object.defineProperty(proto, key, {
      configurable: true,
      enumerable: false,
      get() {
        const bound = fn.bind(this);
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable: true,
          value: bound,
        });
        return bound;
      },
      set(v) {
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable: true,
          value: v,
        });
      },
    });
  }
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output"),
    },
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.parse = (data, params) => parse3(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) =>
    parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode(inst, data, params);
  inst.decode = (data, params) => decode(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
  _installLazyMethods(inst, "ZodType", {
    check(...chks) {
      const def = this.def;
      return this.clone(
        mergeDefs(def, {
          checks: [
            ...(def.checks ?? []),
            ...chks.map((ch) =>
              typeof ch === "function"
                ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } }
                : ch,
            ),
          ],
        }),
        { parent: true },
      );
    },
    with(...chks) {
      return this.check(...chks);
    },
    clone(def, params) {
      return clone(this, def, params);
    },
    brand() {
      return this;
    },
    register(reg, meta) {
      reg.add(this, meta);
      return this;
    },
    refine(check, params) {
      return this.check(refine(check, params));
    },
    superRefine(refinement, params) {
      return this.check(superRefine(refinement, params));
    },
    overwrite(fn) {
      return this.check(_overwrite(fn));
    },
    optional() {
      return optional(this);
    },
    exactOptional() {
      return exactOptional(this);
    },
    nullable() {
      return nullable(this);
    },
    nullish() {
      return optional(nullable(this));
    },
    nonoptional(params) {
      return nonoptional(this, params);
    },
    array() {
      return array(this);
    },
    or(arg) {
      return union([this, arg]);
    },
    and(arg) {
      return intersection(this, arg);
    },
    transform(tx) {
      return pipe(this, transform(tx));
    },
    default(d) {
      return _default(this, d);
    },
    prefault(d) {
      return prefault(this, d);
    },
    catch(params) {
      return _catch(this, params);
    },
    pipe(target) {
      return pipe(this, target);
    },
    readonly() {
      return readonly(this);
    },
    describe(description) {
      const cl = this.clone();
      globalRegistry.add(cl, { description });
      return cl;
    },
    meta(...args) {
      if (args.length === 0) return globalRegistry.get(this);
      const cl = this.clone();
      globalRegistry.add(cl, args[0]);
      return cl;
    },
    isOptional() {
      return this.safeParse(undefined).success;
    },
    isNullable() {
      return this.safeParse(null).success;
    },
    apply(fn) {
      return fn(this);
    },
  });
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true,
  });
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  _installLazyMethods(inst, "_ZodString", {
    regex(...args) {
      return this.check(_regex(...args));
    },
    includes(...args) {
      return this.check(_includes(...args));
    },
    startsWith(...args) {
      return this.check(_startsWith(...args));
    },
    endsWith(...args) {
      return this.check(_endsWith(...args));
    },
    min(...args) {
      return this.check(_minLength(...args));
    },
    max(...args) {
      return this.check(_maxLength(...args));
    },
    length(...args) {
      return this.check(_length(...args));
    },
    nonempty(...args) {
      return this.check(_minLength(1, ...args));
    },
    lowercase(params) {
      return this.check(_lowercase(params));
    },
    uppercase(params) {
      return this.check(_uppercase(params));
    },
    trim() {
      return this.check(_trim());
    },
    normalize(...args) {
      return this.check(_normalize(...args));
    },
    toLowerCase() {
      return this.check(_toLowerCase());
    },
    toUpperCase() {
      return this.check(_toUpperCase());
    },
    slugify() {
      return this.check(_slugify());
    },
  });
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  _installLazyMethods(inst, "ZodNumber", {
    gt(value, params) {
      return this.check(_gt(value, params));
    },
    gte(value, params) {
      return this.check(_gte(value, params));
    },
    min(value, params) {
      return this.check(_gte(value, params));
    },
    lt(value, params) {
      return this.check(_lt(value, params));
    },
    lte(value, params) {
      return this.check(_lte(value, params));
    },
    max(value, params) {
      return this.check(_lte(value, params));
    },
    int(params) {
      return this.check(int(params));
    },
    safe(params) {
      return this.check(int(params));
    },
    positive(params) {
      return this.check(_gt(0, params));
    },
    nonnegative(params) {
      return this.check(_gte(0, params));
    },
    negative(params) {
      return this.check(_lt(0, params));
    },
    nonpositive(params) {
      return this.check(_lte(0, params));
    },
    multipleOf(value, params) {
      return this.check(_multipleOf(value, params));
    },
    step(value, params) {
      return this.check(_multipleOf(value, params));
    },
    finite() {
      return this;
    },
  });
  const bag = inst._zod.bag;
  inst.minValue =
    Math.max(
      bag.minimum ?? Number.NEGATIVE_INFINITY,
      bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
    ) ?? null;
  inst.maxValue =
    Math.min(
      bag.maximum ?? Number.POSITIVE_INFINITY,
      bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
    ) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
  _installLazyMethods(inst, "ZodArray", {
    min(n, params) {
      return this.check(_minLength(n, params));
    },
    nonempty(params) {
      return this.check(_minLength(1, params));
    },
    max(n, params) {
      return this.check(_maxLength(n, params));
    },
    length(n, params) {
      return this.check(_length(n, params));
    },
    unwrap() {
      return this.element;
    },
  });
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  defineLazy(inst, "shape", () => {
    return def.shape;
  });
  _installLazyMethods(inst, "ZodObject", {
    keyof() {
      return _enum(Object.keys(this._zod.def.shape));
    },
    catchall(catchall) {
      return this.clone({ ...this._zod.def, catchall });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: never() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: undefined });
    },
    extend(incoming) {
      return extend(this, incoming);
    },
    safeExtend(incoming) {
      return safeExtend(this, incoming);
    },
    merge(other) {
      return merge(this, other);
    },
    pick(mask) {
      return pick(this, mask);
    },
    omit(mask) {
      return omit(this, mask);
    },
    partial(...args) {
      return partial(ZodOptional, this, args[0]);
    },
    required(...args) {
      return required(ZodNonOptional, this, args[0]);
    },
  });
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...normalizeParams(params),
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...normalizeParams(params),
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...normalizeParams(params),
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params),
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) =>
    intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right,
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  if (!valueType || !valueType._zod) {
    return new ZodRecord({
      type: "record",
      keyType: string2(),
      valueType: keyType,
      ...normalizeParams(valueType),
    });
  }
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params),
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries,
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries,
    });
  };
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...normalizeParams(params),
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error(
          "This schema contains multiple valid literal values. Use `.values` instead.",
        );
      }
      return def.values[0];
    },
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params),
  });
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal) _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output) => {
        payload.value = output;
        payload.fallback = true;
        return payload;
      });
    }
    payload.value = output;
    payload.fallback = true;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn,
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType,
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType,
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType,
  });
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    },
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    },
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) =>
    nonoptionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params),
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue,
  });
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out,
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType,
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
// ../../../node_modules/.bun/zod@4.4.3/node_modules/zod/v4/classic/external.js
config(en_default());
// ../../../node_modules/.bun/zod-validation-error@5.0.0+68a1e3a0c4588df3/node_modules/zod-validation-error/v4/index.mjs
function isZodErrorLike(err) {
  return (
    err instanceof Object &&
    "name" in err &&
    (err.name === "ZodError" || err.name === "$ZodError") &&
    "issues" in err &&
    Array.isArray(err.issues)
  );
}
var ZOD_VALIDATION_ERROR_NAME = "ZodValidationError";
var ValidationError = class extends Error {
  name;
  details;
  constructor(message, options) {
    super(message, options);
    this.name = ZOD_VALIDATION_ERROR_NAME;
    this.details = getIssuesFromErrorOptions(options);
  }
  toString() {
    return this.message;
  }
};
function getIssuesFromErrorOptions(options) {
  if (options) {
    const cause = options.cause;
    if (isZodErrorLike(cause)) {
      return cause.issues;
    }
  }
  return [];
}
function stringifySymbol(symbol) {
  return symbol.description ?? "";
}
function isNonEmptyArray(value) {
  return value.length !== 0;
}
var identifierRegex = /[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u;
function joinPath(path) {
  if (path.length === 1) {
    let propertyKey = path[0];
    if (typeof propertyKey === "symbol") {
      propertyKey = stringifySymbol(propertyKey);
    }
    return propertyKey.toString() || '""';
  }
  return path.reduce((acc, propertyKey) => {
    if (typeof propertyKey === "number") {
      return acc + "[" + propertyKey.toString() + "]";
    }
    if (typeof propertyKey === "symbol") {
      propertyKey = stringifySymbol(propertyKey);
    }
    if (propertyKey.includes('"')) {
      return acc + '["' + escapeQuotes(propertyKey) + '"]';
    }
    if (!identifierRegex.test(propertyKey)) {
      return acc + '["' + propertyKey + '"]';
    }
    const separator = acc.length === 0 ? "" : ".";
    return acc + separator + propertyKey;
  }, "");
}
function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}
function titleCase(value) {
  if (value.length === 0) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}
var defaultMessageBuilderOptions = {
  prefix: "Validation error",
  prefixSeparator: ": ",
  maxIssuesInMessage: 99,
  unionSeparator: " or ",
  issueSeparator: "; ",
  includePath: true,
  forceTitleCase: true,
};
function createMessageBuilder(partialOptions = {}) {
  const options = {
    ...defaultMessageBuilderOptions,
    ...partialOptions,
  };
  return function messageBuilder(issues) {
    const message = issues
      .slice(0, options.maxIssuesInMessage)
      .map((issue) => mapIssue(issue, options))
      .join(options.issueSeparator);
    return conditionallyPrefixMessage(message, options);
  };
}
function mapIssue(issue, options) {
  if (issue.code === "invalid_union" && isNonEmptyArray(issue.errors)) {
    const individualMessages = issue.errors.map((issues) =>
      issues
        .map((subIssue) =>
          mapIssue(
            {
              ...subIssue,
              path: issue.path.concat(subIssue.path),
            },
            options,
          ),
        )
        .join(options.issueSeparator),
    );
    return Array.from(new Set(individualMessages)).join(options.unionSeparator);
  }
  const buf = [];
  if (options.forceTitleCase) {
    buf.push(titleCase(issue.message));
  } else {
    buf.push(issue.message);
  }
  pathCondition: if (
    options.includePath &&
    issue.path !== undefined &&
    isNonEmptyArray(issue.path)
  ) {
    if (issue.path.length === 1) {
      const identifier = issue.path[0];
      if (typeof identifier === "number") {
        buf.push(` at index ${identifier}`);
        break pathCondition;
      }
    }
    buf.push(` at "${joinPath(issue.path)}"`);
  }
  return buf.join("");
}
function conditionallyPrefixMessage(message, options) {
  if (options.prefix != null) {
    if (message.length > 0) {
      return [options.prefix, message].join(options.prefixSeparator);
    }
    return options.prefix;
  }
  if (message.length > 0) {
    return message;
  }
  return defaultMessageBuilderOptions.prefix;
}
function fromZodIssue(issue, options = {}) {
  const messageBuilder = createMessageBuilderFromOptions2(options);
  const message = messageBuilder([issue]);
  return new ValidationError(message, {
    cause: new $ZodRealError([issue]),
  });
}
function createMessageBuilderFromOptions2(options) {
  if ("messageBuilder" in options) {
    return options.messageBuilder;
  }
  return createMessageBuilder(options);
}

// ../../../node_modules/.bun/yaml@2.9.0/node_modules/yaml/dist/index.js
var composer = require_composer();
var Document = require_Document();
var Schema = require_Schema();
var errors3 = require_errors();
var Alias = require_Alias();
var identity = require_identity();
var Pair = require_Pair();
var Scalar = require_Scalar();
var YAMLMap = require_YAMLMap();
var YAMLSeq = require_YAMLSeq();
var cst = require_cst();
var lexer = require_lexer();
var lineCounter = require_line_counter();
var parser = require_parser();
var publicApi = require_public_api();
var visit = require_visit();
var $Composer = composer.Composer;
var $Document = Document.Document;
var $Schema = Schema.Schema;
var $YAMLError = errors3.YAMLError;
var $YAMLParseError = errors3.YAMLParseError;
var $YAMLWarning = errors3.YAMLWarning;
var $Alias = Alias.Alias;
var $isAlias = identity.isAlias;
var $isCollection = identity.isCollection;
var $isDocument = identity.isDocument;
var $isMap = identity.isMap;
var $isNode = identity.isNode;
var $isPair = identity.isPair;
var $isScalar = identity.isScalar;
var $isSeq = identity.isSeq;
var $Pair = Pair.Pair;
var $Scalar = Scalar.Scalar;
var $YAMLMap = YAMLMap.YAMLMap;
var $YAMLSeq = YAMLSeq.YAMLSeq;
var $Lexer = lexer.Lexer;
var $LineCounter = lineCounter.LineCounter;
var $Parser = parser.Parser;
var $parse = publicApi.parse;
var $parseAllDocuments = publicApi.parseAllDocuments;
var $parseDocument = publicApi.parseDocument;
var $stringify = publicApi.stringify;
var $visit = visit.visit;
var $visitAsync = visit.visitAsync;

// packages/core/dist/chunk-IKZLQ7JU.js
function Z(o, t) {
  return t.length === 0 ? o : t.map((n) => fromZodIssue(n, { prefix: o }).message).join("; ");
}
function b(o) {
  return !!o && typeof o == "object" && !Array.isArray(o);
}
var d = () => string2().min(1);
var m = (o) => (o ? array(d()).default(o) : array(d()));
var B = () =>
  string2()
    .min(1)
    .regex(/^(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\/\/)(?!\/)(?!.*\/$)[^ ~^:?*[\\]+$/u, {
      message: "Branch prefix must be a git-safe branch namespace without spaces or ref syntax.",
    });
var v = {
  start: { prefix: "Start:", min_chars: 40 },
  blocked: { prefix: "Blocked:", min_chars: 40 },
  verified: { prefix: "Verified:", min_chars: 60 },
};
var l2 = {
  profile: "standard",
  reasoning_effort: "medium",
  text_verbosity: "medium",
  tool_budget: { discovery: 6, implementation: 10, verification: 6 },
  stop_conditions: [
    "Missing required input blocks correctness.",
    "Requested action expands scope or risk beyond approved plan.",
    "Verification fails and remediation changes scope.",
  ],
  handoff_conditions: [
    "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
    "Task depends_on prerequisites are incomplete.",
    "Specialized agent is required.",
  ],
  unsafe_actions_requiring_explicit_user_ok: [
    "Destructive git history operations.",
    "Outside-repo read/write.",
    "Credential, keychain, or SSH material changes.",
  ],
};
var w2 = {
  mode: "raw",
  max_tail_bytes: 65536,
  capture_stderr: true,
  retention: "keep",
  compression: "none",
  redact_patterns: [],
};
var E = { wall_clock_ms: 900000, idle_ms: 180000, terminate_grace_ms: 1500 };
var y = {
  enabled: false,
  version: "0.1.0",
  write_on_finish: true,
  require_for_pr_check: false,
  default_validation_mode: "local",
  include_model_identity: "when_known",
  include_prompts: false,
  include_tool_outputs: false,
};
var q = ["Summary", "Scope", "Plan", "Verify Steps", "Verification", "Rollback Plan", "Findings"];
var N = ["Summary", "Scope", "Plan", "Verification", "Rollback Plan"];
var ue = ["standard", "strict", "paranoid"];
var pe = _enum(["any", "en"]).default("any");
var x = {
  mode: "manual",
  actor: "POLICY:repository",
  allow_operations: [],
  deny_operations: [],
  ttl_minutes: 15,
  approval_receipts: { trusted_issuers: [], max_ttl_minutes: 15, clock_skew_seconds: 30 },
};
var _e = object({
  id: string2().regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/u),
  public_key_spki: string2().regex(/^[A-Za-z0-9+/]+={0,2}$/u, {
    message: "Approval receipt public_key_spki must be base64 DER SPKI.",
  }),
}).strict();
var de = object({
  trusted_issuers: array(_e).default([]),
  max_ttl_minutes: number2().int().min(1).max(60).default(15),
  clock_skew_seconds: number2().int().min(0).max(300).default(30),
})
  .strict()
  .default({ trusted_issuers: [], max_ttl_minutes: 15, clock_skew_seconds: 30 });
var fe = object({
  mode: _enum(["manual", "policy", "all"]).default(x.mode),
  actor: string2()
    .regex(/^POLICY:[A-Za-z0-9][A-Za-z0-9._-]*$/u, {
      message: "Authority actor must be a POLICY:<id> identity and cannot impersonate USER.",
    })
    .default(x.actor),
  allow_operations: m(x.allow_operations),
  deny_operations: m(x.deny_operations),
  ttl_minutes: number2().int().min(1).max(60).default(x.ttl_minutes),
  approval_receipts: de,
})
  .strict()
  .default({
    ...x,
    allow_operations: [...x.allow_operations],
    deny_operations: [...x.deny_operations],
    approval_receipts: { ...x.approval_receipts, trusted_issuers: [] },
  });
var L2 = object({ prefix: d(), min_chars: number2().int().min(0) }).passthrough();
var me = object({
  mode: _enum(["none", "codex_sandbox_full_auto"]).optional(),
  platform: _enum(["auto", "macos", "linux", "windows"]).optional(),
}).passthrough();
var ge = object({
  command: array(d()).min(1),
  env: record(string2(), string2()).default({}),
  enforcement: me.optional(),
}).passthrough();
var ke = object({
  mode: _enum(["raw", "off"]).default(w2.mode),
  max_tail_bytes: number2().int().min(0).default(w2.max_tail_bytes),
  capture_stderr: boolean2().default(w2.capture_stderr),
  retention: _enum(["keep", "remove_on_success", "remove_always"]).default(w2.retention),
  compression: _enum(["none", "gzip"]).default(w2.compression),
  redact_patterns: m(w2.redact_patterns),
})
  .strict()
  .default({ ...w2, redact_patterns: [...w2.redact_patterns] });
var we = object({
  wall_clock_ms: number2().int().min(0).default(E.wall_clock_ms),
  idle_ms: number2().int().min(0).default(E.idle_ms),
  terminate_grace_ms: number2().int().min(0).default(E.terminate_grace_ms),
})
  .strict()
  .default({ ...E });
var k = {
  enabled: false,
  repository: "basilisk-labs/agentplane",
  transport: "github",
  cloud_endpoint: "https://agentplane.cloud/api/feedback/issues",
  allow_anonymous_cloud: false,
  prompt_on_internal_error: true,
  include_insights_report: true,
  dedupe: true,
  labels: ["agentplane-feedback", "bug"],
};
var O = object({
  schema_version: literal(1).default(1),
  workflow_mode: _enum(["direct", "branch_pr"]).default("direct"),
  status_commit_policy: _enum(["off", "warn", "confirm"]).default("warn"),
  commit_automation: _enum(["manual", "finish_only"]).default("manual"),
  finish_auto_status_commit: boolean2().default(false),
  authority: fe,
  close_commit: object({
    direct_dirty_policy: _enum(["allow_other_task_readmes", "strict"]).default(
      "allow_other_task_readmes",
    ),
  })
    .passthrough()
    .default({ direct_dirty_policy: "allow_other_task_readmes" }),
  agents: object({
    approvals: object({
      require_plan: boolean2().default(true),
      require_network: boolean2().default(true),
      require_verify: boolean2().default(true),
      require_force: boolean2().default(false),
    })
      .passthrough()
      .default({
        require_plan: true,
        require_network: true,
        require_verify: true,
        require_force: false,
      }),
  })
    .passthrough()
    .default({
      approvals: {
        require_plan: true,
        require_network: true,
        require_verify: true,
        require_force: false,
      },
    }),
  recipes: object({ storage_default: _enum(["link", "copy"]).default("copy") })
    .passthrough()
    .default({ storage_default: "copy" }),
  execution: object({
    profile: _enum(["standard", "conservative", "balanced", "aggressive"]).default(l2.profile),
    reasoning_effort: _enum(["low", "medium", "high", "xhigh"]).default(l2.reasoning_effort),
    text_verbosity: _enum(["low", "medium", "high"]).default(l2.text_verbosity),
    tool_budget: object({
      discovery: number2().int().min(1).default(l2.tool_budget.discovery),
      implementation: number2().int().min(1).default(l2.tool_budget.implementation),
      verification: number2().int().min(1).default(l2.tool_budget.verification),
    })
      .passthrough()
      .default(l2.tool_budget),
    stop_conditions: m([...l2.stop_conditions]),
    handoff_conditions: m([...l2.handoff_conditions]),
    unsafe_actions_requiring_explicit_user_ok: m([...l2.unsafe_actions_requiring_explicit_user_ok]),
  })
    .passthrough()
    .default({
      profile: l2.profile,
      reasoning_effort: l2.reasoning_effort,
      text_verbosity: l2.text_verbosity,
      tool_budget: { ...l2.tool_budget },
      stop_conditions: [...l2.stop_conditions],
      handoff_conditions: [...l2.handoff_conditions],
      unsafe_actions_requiring_explicit_user_ok: [...l2.unsafe_actions_requiring_explicit_user_ok],
    }),
  runner: object({
    default_adapter: _enum(["codex", "custom", "hermes"]).default("codex"),
    trace: ke,
    timeouts: we,
    custom: ge.optional(),
  })
    .passthrough()
    .default({
      default_adapter: "codex",
      trace: { ...w2, redact_patterns: [...w2.redact_patterns] },
      timeouts: { ...E },
    }),
  feedback: object({
    github_issues: object({
      enabled: boolean2().default(k.enabled),
      repository: d().default(k.repository),
      transport: _enum(["github", "cloud", "auto"]).default(k.transport),
      cloud_endpoint: d().default(k.cloud_endpoint),
      allow_anonymous_cloud: boolean2().default(k.allow_anonymous_cloud),
      prompt_on_internal_error: boolean2().default(k.prompt_on_internal_error),
      include_insights_report: boolean2().default(k.include_insights_report),
      dedupe: boolean2().default(k.dedupe),
      labels: m([...k.labels]),
    })
      .passthrough()
      .default({ ...k }),
  })
    .passthrough()
    .default({ github_issues: { ...k } }),
  acr: object({
    enabled: boolean2().default(y.enabled),
    version: literal("0.1.0").default(y.version),
    write_on_finish: boolean2().default(y.write_on_finish),
    require_for_pr_check: boolean2().default(y.require_for_pr_check),
    default_validation_mode: _enum(["schema", "local", "ci"]).default(y.default_validation_mode),
    include_model_identity: _enum(["never", "when_known", "always"]).default(
      y.include_model_identity,
    ),
    include_prompts: literal(false).default(y.include_prompts),
    include_tool_outputs: literal(false).default(y.include_tool_outputs),
  })
    .passthrough()
    .default({ ...y }),
  paths: object({
    agents_dir: d().default(".agentplane/agents"),
    tasks_path: d().default(".agentplane/tasks.json"),
    workflow_dir: d().default(".agentplane/tasks"),
    worktrees_dir: d().default(".agentplane/worktrees"),
  })
    .passthrough()
    .default({
      agents_dir: ".agentplane/agents",
      tasks_path: ".agentplane/tasks.json",
      workflow_dir: ".agentplane/tasks",
      worktrees_dir: ".agentplane/worktrees",
    }),
  branch: object({ task_prefix: B().default("task"), task_close_prefix: B().default("task-close") })
    .passthrough()
    .default({ task_prefix: "task", task_close_prefix: "task-close" }),
  framework: object({
    source: d().default("https://github.com/basilisk-labs/agentplane"),
    last_update: string2().datetime({ offset: true }).nullable().default(null),
    cli: object({ expected_version: string2().nullable().default(null) })
      .passthrough()
      .default({ expected_version: null }),
  })
    .passthrough()
    .default({
      source: "https://github.com/basilisk-labs/agentplane",
      last_update: null,
      cli: { expected_version: null },
    }),
  tasks: object({
    id_suffix_length_default: number2().int().min(3).max(16).default(6),
    verify: object({
      required_tags: m(["code", "backend", "frontend"]),
      require_steps_for_tags: m().optional(),
      require_steps_for_primary: m(["code", "data", "ops"]),
      require_verification_for_primary: m(["code", "data", "ops"]),
      spike_tag: d().default("spike"),
      enforce_on_plan_approve: boolean2().default(true),
      enforce_on_start_when_no_plan: boolean2().default(true),
    })
      .passthrough()
      .default({
        required_tags: ["code", "backend", "frontend"],
        require_steps_for_primary: ["code", "data", "ops"],
        require_verification_for_primary: ["code", "data", "ops"],
        spike_tag: "spike",
        enforce_on_plan_approve: true,
        enforce_on_start_when_no_plan: true,
      }),
    tags: object({
      primary_allowlist: array(d())
        .min(1)
        .default(["code", "data", "research", "docs", "ops", "product", "meta"]),
      strict_primary: boolean2().default(false),
      fallback_primary: d().default("meta"),
      lock_primary_on_update: boolean2().default(true),
    })
      .passthrough()
      .default({
        primary_allowlist: ["code", "data", "research", "docs", "ops", "product", "meta"],
        strict_primary: false,
        fallback_primary: "meta",
        lock_primary_on_update: true,
      }),
    doc: object({ sections: m([...q]), required_sections: m([...N]) })
      .passthrough()
      .default({ sections: [...q], required_sections: [...N] }),
    comments: object({
      start: L2.default(v.start),
      blocked: L2.default(v.blocked),
      verified: L2.default(v.verified),
    })
      .passthrough()
      .default(v),
  })
    .passthrough()
    .default({
      id_suffix_length_default: 6,
      verify: {
        required_tags: ["code", "backend", "frontend"],
        require_steps_for_primary: ["code", "data", "ops"],
        require_verification_for_primary: ["code", "data", "ops"],
        spike_tag: "spike",
        enforce_on_plan_approve: true,
        enforce_on_start_when_no_plan: true,
      },
      tags: {
        primary_allowlist: ["code", "data", "research", "docs", "ops", "product", "meta"],
        strict_primary: false,
        fallback_primary: "meta",
        lock_primary_on_update: true,
      },
      doc: { sections: [...q], required_sections: [...N] },
      comments: v,
    }),
  evaluator: object({
    max_rework_attempts: number2().int().min(1).max(20).default(3),
    skepticism_level: _enum(ue).default("standard"),
  })
    .passthrough()
    .default({ max_rework_attempts: 3, skepticism_level: "standard" }),
  commit: object({
    generic_tokens: m(["start", "status", "mark", "done", "wip", "update", "tasks", "task"]),
    dco: object({
      enabled: boolean2().default(false),
      name: d().nullable().default(null),
      email: d().nullable().default(null),
    })
      .passthrough()
      .default({ enabled: false, name: null, email: null }),
  })
    .passthrough()
    .default({
      generic_tokens: ["start", "status", "mark", "done", "wip", "update", "tasks", "task"],
      dco: { enabled: false, name: null, email: null },
    }),
  tasks_backend: object({ config_path: d().default(".agentplane/backends/local/backend.json") })
    .passthrough()
    .default({ config_path: ".agentplane/backends/local/backend.json" }),
  artifacts_language: pe,
  closure_commit_requires_approval: boolean2().default(false),
}).passthrough();
function he(o) {
  return Z("config schema validation failed", o);
}
function P(o) {
  let t = O.safeParse(o);
  if (!t.success) {
    let n = new Error(he(t.error.issues));
    throw ((n.cause = t.error), n);
  }
  if (!b(t.data)) throw new Error("config must be an object");
  return (
    (t.data.execution = {
      ...l2,
      tool_budget: { ...l2.tool_budget },
      stop_conditions: [...l2.stop_conditions],
      handoff_conditions: [...l2.handoff_conditions],
      unsafe_actions_requiring_explicit_user_ok: [...l2.unsafe_actions_requiring_explicit_user_ok],
    }),
    t.data
  );
}
var be = P({});
function ye() {
  let { $schema: o, ...t } = toJSONSchema(O, {
    target: "draft-07",
    unrepresentable: "any",
    io: "input",
    reused: "inline",
    cycles: "throw",
  });
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://agentplane.org/schemas/config.schema.json",
    title: "agentplane config.json (v1)",
    ...t,
  };
}
var xe = ye();
var Ce = new Set(["__proto__", "prototype", "constructor"]);
var V = 2;
var h = string2().min(1);
var p = O.shape;
var Ae = p.tasks.unwrap();
var U = object({
  normal_exit_continuation: boolean2(),
  abnormal_backoff: literal("exponential"),
  max_attempts: number2().int().min(1).max(100),
}).strict();
var K = object({ stall_seconds: number2().int().min(1).max(86400) }).strict();
var X = object({ orchestrator: h }).strict();
var Se = object({
  require_plan: boolean2(),
  require_verify: boolean2(),
  require_network: boolean2(),
}).strict();
var Oe = object({
  require_plan: boolean2(),
  require_verify: boolean2(),
  require_network: boolean2(),
  require_force: boolean2().optional(),
}).passthrough();
var We = object({
  mode: p.workflow_mode.unwrap(),
  status_commit_policy: p.status_commit_policy.unwrap().optional(),
  commit_automation: p.commit_automation.unwrap().optional(),
  finish_auto_status_commit: p.finish_auto_status_commit.unwrap().optional(),
  close_commit: p.close_commit.unwrap().optional(),
  artifacts_language: p.artifacts_language.unwrap().optional(),
  closure_commit_requires_approval: p.closure_commit_requires_approval.unwrap().optional(),
}).passthrough();
var Te = object({
  agents_dir: h.optional(),
  tasks_path: h.optional(),
  workflow_dir: h.optional(),
  worktrees_dir: h.optional(),
  isolation: literal("per_task").optional(),
  cleanup: literal("after_finish").optional(),
}).passthrough();
var Me = Ae.extend({ backend: p.tasks_backend.unwrap().optional() }).passthrough();
var Fe = object({
  concurrency: number2().int().min(1).optional(),
  poll_interval_ms: number2().int().min(0).optional(),
  retry_policy: U.optional(),
  timeouts: K.optional(),
}).passthrough();
var je = p.evaluator
  .unwrap()
  .extend({ verdicts: array(h).min(1).optional(), required_checks: array(h).optional() })
  .passthrough();
var qe = object({ runs_dir: h.optional(), events: literal("jsonl").optional() }).passthrough();
var Q = {
  authority: p.authority.unwrap().optional(),
  workspace: Te.optional(),
  paths: p.paths.unwrap().optional(),
  tasks: Me.optional(),
  branch: p.branch.unwrap().optional(),
  framework: p.framework.unwrap().optional(),
  execution: p.execution.unwrap().optional(),
  runner: p.runner.unwrap().optional(),
  feedback: p.feedback.unwrap().optional(),
  recipes: p.recipes.unwrap().optional(),
  commit: p.commit.unwrap().optional(),
  acr: p.acr.unwrap().optional(),
  scheduler: Fe.optional(),
  evaluator: je.optional(),
  observability: qe.optional(),
};
var ee = object({
  version: literal(1),
  mode: p.workflow_mode.unwrap(),
  owners: X,
  approvals: Se,
  retry_policy: U,
  timeouts: K,
  in_scope_paths: array(h).min(1),
  ...Q,
}).strict();
var te = object({
  version: literal(V),
  workflow: We,
  owners: X,
  approvals: Oe,
  ...Q,
  retry_policy: U,
  timeouts: K,
  in_scope_paths: array(h).min(1),
}).strict();
var oe = union([ee, te]);
function Pe() {
  let { $schema: o, ...t } = toJSONSchema(oe, {
    target: "draft-2020-12",
    unrepresentable: "any",
    io: "input",
    reused: "inline",
    cycles: "throw",
  });
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://agentplane.dev/schemas/workflow.schema.json",
    title: "Agentplane Workflow Contract",
    description:
      "Versioned WORKFLOW.md front matter. AgentPlane reads v1 and v2, normalizes both to v2, and rejects unsupported versions.",
    ...t,
  };
}
var Ie = Pe();

// packages/core/dist/chunk-AVRHP5NP.js
import { createHash } from "crypto";

// ../../../node_modules/.bun/canonicalize@3.0.0/node_modules/canonicalize/lib/canonicalize.js
function canonicalize(object, seen = new Set()) {
  if (typeof object === "number" && isNaN(object)) {
    throw new Error("NaN is not allowed");
  }
  if (typeof object === "number" && !isFinite(object)) {
    throw new Error("Infinity is not allowed");
  }
  if (object === null || typeof object !== "object") {
    return JSON.stringify(object);
  }
  if (typeof object.toJSON === "function") {
    if (seen.has(object)) {
      throw new Error("Circular reference detected");
    }
    seen.add(object);
    const result = canonicalize(object.toJSON(), seen);
    seen.delete(object);
    return result;
  }
  if (seen.has(object)) {
    throw new Error("Circular reference detected");
  }
  seen.add(object);
  let result;
  if (Array.isArray(object)) {
    const values = object.map((cv) => {
      const value = cv === undefined || typeof cv === "symbol" ? null : cv;
      return canonicalize(value, seen);
    });
    result = `[${values.join(",")}]`;
  } else {
    const parts = [];
    for (const key of Object.keys(object).sort()) {
      if (object[key] === undefined || typeof object[key] === "symbol") {
        continue;
      }
      parts.push(`${canonicalize(key)}:${canonicalize(object[key], seen)}`);
    }
    result = `{${parts.join(",")}}`;
  }
  seen.delete(object);
  return result;
}

// packages/core/dist/chunk-AVRHP5NP.js
var h2 = string2().trim().min(1);
var R = string2().regex(/^sha256:[a-f0-9]{64}$/u);
var W = h2.refine((e) => !["__proto__", "constructor", "prototype"].includes(e));
var gt = h2.refine(
  (e) =>
    e === "." ||
    (!e.startsWith("/") &&
      !e.includes("\\") &&
      !e.split("/").some((t) => t === ".." || t === "." || !t)),
);
var jr = strictObject({ objective: h2, context: h2, plan_input_digest: R.optional() });
var se = strictObject({
  objective: h2,
  acceptance_criteria: array(h2).min(1),
  verification_commands: array(h2),
  role: _enum(["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"]),
  plan_input_digest: R.optional(),
});
var yt = strictObject({
  scope_roots: array(gt),
  repository_effects: array(h2),
  external_effects: array(h2),
  capabilities: array(h2),
  resources: array(h2),
});
var B2 = strictObject({
  work_items: array(
    strictObject({
      id: W,
      depends_on: array(W),
      required_inputs: array(W),
      expected_outputs: array(W).min(1),
      execution_requirements: yt,
      optional: boolean2(),
      contract: se,
    }),
  ).min(1),
});
var ae2 = {
  task_id: h2,
  repository_identity: R,
  repository_fingerprint: R,
  plan_revision: number2().int().nonnegative(),
  plan_digest: R,
};
var Dr = discriminatedUnion("phase", [
  strictObject({ ...ae2, phase: literal("planning") }),
  strictObject({
    ...ae2,
    phase: literal("implementation"),
    work_item_id: W,
    attempt: number2().int().positive(),
    claim_id: h2,
    contract_digest: R,
    authority_digest: R,
  }),
  strictObject({
    ...ae2,
    phase: literal("inspection"),
    work_item_id: W,
    attempt: number2().int().positive(),
    claim_id: h2,
    contract_digest: R,
    authority_digest: R,
    result_digest: R,
  }),
]);
var Lr = array(strictObject({ id: W, kind: h2, digest: R }));
var Ur = strictObject({
  schema_version: literal(1),
  kind: literal("kernel_migration_semantic_assessment"),
  task_id: h2,
  mapping_version: h2,
  source_digest: R,
  source_bytes_base64: string2().min(1),
  mapping_digest: R,
  fields: array(strictObject({ source_path: h2, target: h2, reason_code: h2 })).min(1),
  stop_rules: array(h2).min(1),
});
var Vr = strictObject({
  schema_version: literal(1),
  kind: literal("kernel_migration_semantic_assessment_result"),
  task_id: h2,
  mapping_version: h2,
  source_digest: R,
  mapping_digest: R,
  status: _enum(["resolved", "blocked"]),
  resolutions: array(
    strictObject({ source_path: h2, target: h2, decision: h2, evidence_digest: R }),
  ),
});
function ce2(e) {
  return Array.isArray(e)
    ? e.map((t) => ce2(t))
    : e && typeof e == "object"
      ? Object.fromEntries(
          Object.entries(e)
            .filter(([, t]) => t !== undefined)
            .toSorted(([t], [r]) => (t < r ? -1 : t > r ? 1 : 0))
            .map(([t, r]) => [t, ce2(r)]),
        )
      : e;
}
function G(e) {
  let t = JSON.stringify(ce2(e));
  return `sha256:${createHash("sha256").update(t, "utf8").digest("hex")}`;
}
var zr = ["document", "legacy_status", "verification_text", "pr_metadata", "provider_summary"];
var Oe2 = /^sha256:[0-9a-f]{64}$/u;
function N2(e, t) {
  let r = new Set(t);
  return e.every((i) => r.has(i));
}
function Re(e) {
  let t = e.replaceAll("\\", "/");
  if (!t || t.includes("\x00") || t.includes("//")) return null;
  if (t === "." || t === "/") return t;
  let r = t.replace(/\/$/u, "");
  return r.split("/").some((i) => i === "." || i === "..") ? null : r;
}
function kt(e, t) {
  let r = Re(e),
    i = Re(t);
  return r === null || i === null
    ? false
    : i === "."
      ? !/^(?:\/|[a-z]:)/iu.test(r)
      : i === "/"
        ? r.startsWith("/")
        : r === i || r.startsWith(`${i}/`);
}
function we2(e, t) {
  return e.every((r) => t.some((i) => kt(r, i)));
}
function qr(e, t) {
  return (
    we2(t.scope_roots, e.scope_roots) &&
    N2(t.repository_effects, e.repository_effects) &&
    N2(t.external_effects, e.external_effects) &&
    N2(t.capabilities, e.capabilities) &&
    N2(t.resources, e.resources)
  );
}
function ht(e, t) {
  return t === null || e === t;
}
function St(e, t) {
  let r = e === null ? 1 / 0 : Date.parse(e),
    i = t === null ? 1 / 0 : Date.parse(t);
  return !Number.isNaN(r) && !Number.isNaN(i) && r <= i;
}
function v2(e, t, r) {
  t || e.push(r);
}
function Wr(e, t) {
  let r = [];
  (v2(r, t.task_id === e.task_id, "task"),
    v2(r, t.plan_revision === e.plan_revision && t.plan_digest === e.plan_digest, "plan"),
    v2(r, t.repository_identity === e.repository_identity, "repository"),
    v2(r, t.repository_fingerprint === e.repository_fingerprint, "state_fingerprint"),
    v2(r, ht(t.work_item_id, e.work_item_id), "work_item"),
    v2(r, we2(t.scope_roots, e.scope_roots), "scope"),
    v2(r, N2(t.repository_effects, e.repository_effects), "repository_effects"),
    v2(r, N2(t.external_effects, e.external_effects), "external_effects"),
    v2(r, N2(t.capabilities, e.capabilities), "capabilities"),
    v2(r, N2(t.resources, e.resources), "resources"),
    v2(r, t.risk.requirements === "bounded" || e.risk.requirements === "material", "risk"),
    v2(r, t.risk.implementation === "bounded" || e.risk.implementation === "material", "risk"));
  let i = { reversible: 0, recovery_required: 1, irreversible: 2 };
  (v2(r, i[t.risk.reversibility] <= i[e.risk.reversibility], "reversibility"),
    v2(r, N2(t.validation_requirements, e.validation_requirements), "validation"),
    v2(r, N2(t.policy_digests, e.policy_digests), "policy"),
    v2(r, N2(t.completion_requirements, e.completion_requirements), "completion"),
    v2(r, St(t.expires_at, e.expires_at), "expiry"),
    v2(
      r,
      t.provenance.kind !== "USER" &&
        t.provenance.parent_authority_digest === e.digest &&
        t.provenance.evidence_digest === e.provenance.evidence_digest,
      "provenance",
    ));
  let a = [...new Set(r)];
  return a.length === 0 ? { ok: true } : { ok: false, violations: a };
}
function Yr(e, t) {
  return (
    Oe2.test(e.digest) &&
    e.task_id === t.task_id &&
    (t.plan_revision === null || e.plan_revision === t.plan_revision) &&
    (t.plan_digest === null || e.plan_digest === t.plan_digest) &&
    e.repository_fingerprint === t.repository_fingerprint &&
    (t.work_item_id === null || e.work_item_id === null || e.work_item_id === t.work_item_id)
  );
}
function Ie2(e) {
  let t = [],
    r = new Set(),
    i = new Map();
  for (let s of e) {
    let p = [
      ...s.execution_requirements.external_effects,
      ...s.execution_requirements.capabilities,
    ].find((u) =>
      /^(?:external_write|publish|deploy|destructive_git|pull_request|integration|hosted_ci|pr\.(?:open|merge|head\.publish|sync_or_verify|artifacts\.update)|provider(?:_write|\.(?:merge|pr(?:\.(?:refresh|update_branch))?))|integration\.(?:enqueue|run_next)|task\.(?:hosted_close\.(?:open|finalize)|worktree\.cleanup)|hosted\.close|publish_pr|merge_pr|hosted_close|cleanup_worktree|merged-worktree-cleanup)$/u.test(
        u,
      ),
    );
    (p && t.push(`supervisor_owned_lifecycle:${s.id}:${p}`),
      s.contract_digest !== undefined &&
        !Oe2.test(s.contract_digest) &&
        t.push(`invalid_contract_digest:${s.id}`),
      (!s.id || r.has(s.id)) && t.push(`duplicate:${s.id}`),
      r.add(s.id),
      new Set(s.expected_outputs).size !== s.expected_outputs.length &&
        t.push(`duplicate_output:${s.id}`));
    for (let u of s.expected_outputs) i.set(u, [...(i.get(u) ?? []), s.id]);
  }
  for (let s of e) {
    for (let p of s.depends_on)
      (r.has(p) || t.push(`missing_dependency:${s.id}:${p}`),
        p === s.id && t.push(`cycle:${s.id}`));
    for (let p of s.required_inputs) {
      let u = i.get(p) ?? [];
      (u.length !== 1 && t.push(`invalid_input:${s.id}:${p}`),
        u.includes(s.id) && t.push(`self_input:${s.id}:${p}`));
    }
  }
  let a = new Map(e.map((s) => [s.id, s])),
    _ = new Set(),
    d = new Set(),
    k = (s) => {
      if (_.has(s)) return true;
      if (d.has(s)) return false;
      _.add(s);
      let p = a.get(s),
        u = [
          ...(p?.depends_on ?? []),
          ...(p?.required_inputs.flatMap((g) => i.get(g) ?? []) ?? []),
        ];
      for (let g of u) if (a.has(g) && k(g)) return true;
      return (_.delete(s), d.add(s), false);
    };
  return (e.some((s) => k(s.id)) && t.push("dependency_cycle"), [...new Set(t)]);
}
function Gr(e) {
  return {
    kind: "rejected",
    code: "PROJECTION_CANNOT_AUTHORIZE",
    facts: [e],
    required_action: "supply_execution_authority",
  };
}
var le = B2.shape.work_items.element;
var Et = strictObject({
  schema_version: literal(1),
  kind: literal("plan_refinement"),
  task_id: string2().min(1),
  base_plan_digest: string2().regex(/^sha256:[a-f0-9]{64}$/u),
  operations: array(
    discriminatedUnion("kind", [
      strictObject({ kind: literal("add"), work_item: le }),
      strictObject({ kind: literal("replace"), work_item: le }),
      strictObject({ kind: literal("remove"), work_item_id: le.shape.id }),
    ]),
  )
    .min(1)
    .max(256),
});
var bt = union([B2, Et]);
function vt(e, t, r) {
  let i = [],
    a = (s) => {
      let p = s.contract_digest && r[String(s.contract_digest)];
      if (!p || !se.safeParse(p).success || G(p) !== s.contract_digest) {
        i.push(`work_contract_missing_or_invalid:${s.id}`);
        return;
      }
      return p;
    },
    _ = e.map((s) => ({ definition: s, contract: a(s) })),
    k = t
      .map((s) => ({ definition: s, contract: a(s) }))
      .filter(({ definition: s }) => !s.optional);
  for (let { definition: s, contract: p } of _.filter(({ definition: u }) => !u.optional)) {
    for (let u of s.expected_outputs)
      k.some(({ definition: g }) => g.expected_outputs.includes(u)) ||
        i.push(`mandatory_output_removed:${u}`);
    for (let u of p?.acceptance_criteria ?? [])
      k.some(({ contract: g }) => g?.acceptance_criteria.includes(u)) ||
        i.push(`mandatory_criterion_removed:${u}`);
    for (let u of p?.verification_commands ?? [])
      k.some(({ contract: g }) => g?.verification_commands.includes(u)) ||
        i.push(`mandatory_check_removed:${u}`);
  }
  return i;
}
function x2(e) {
  let t = canonicalize(e);
  if (t === undefined) throw new Error("Task-centric value is not canonicalizable.");
  return `sha256:${createHash("sha256").update(t, "utf8").digest("hex")}`;
}
function Ot(e) {
  return /^[0-9a-f]{40}$|^[0-9a-f]{64}$/u.test(e) && !/^0+$/u.test(e);
}
function io(e) {
  if (e.git.kind === "commit" && !Ot(e.git.sha))
    throw new Error("Repository commit identity must be a valid Git object id.");
  let t = { schema_version: 1, ...e };
  return Object.freeze({ ...t, digest: x2(t) });
}
function Ce2(e) {
  let { planning_baseline: t, recipe_provenance: r, ...i } = e,
    a = (_) => {
      let { evidence_fingerprint: d, ...k } = _;
      return k;
    };
  return x2({
    ...i,
    work_items: {
      ...i.work_items,
      work_items: i.work_items.work_items.map((_) => ({ ..._, validation: a(_.validation) })),
    },
    top_level_validation: a(i.top_level_validation),
  });
}
function wt(e, t, r) {
  let i = new Set();
  for (let [s, p] of e.work_items.entries())
    (i.has(p.id) &&
      r.push({
        code: "duplicate_work_item",
        path: `work_items[${s}].id`,
        message: `Work item id ${p.id} is duplicated.`,
      }),
      i.add(p.id));
  for (let [s, p] of e.work_items.entries())
    for (let u of p.depends_on)
      i.has(u) ||
        r.push({
          code: "missing_dependency",
          path: `work_items[${s}].depends_on`,
          message: `Work item ${p.id} depends on missing work item ${u}.`,
        });
  let a = new Set(),
    _ = new Set(),
    d = new Map(e.work_items.map((s) => [s.id, s])),
    k = (s) => {
      if (a.has(s)) return true;
      if (_.has(s)) return false;
      a.add(s);
      let p = d.get(s),
        u = [
          ...(p?.depends_on ?? []),
          ...(p?.required_inputs ?? []).flatMap((g) => {
            let f = t.get(g);
            return f === undefined ? [] : [f];
          }),
        ];
      for (let g of u) if (d.has(g) && k(g)) return true;
      return (a.delete(s), _.add(s), false);
    };
  for (let s of e.work_items)
    if (k(s.id)) {
      r.push({
        code: "dependency_cycle",
        path: `work_items.${s.id}.depends_on`,
        message: `Work item ${s.id} participates in a dependency cycle.`,
      });
      break;
    }
}
function _e2(e, t = new Set()) {
  let r = [],
    i = new Map();
  for (let [a, _] of e.work_items.entries())
    for (let d of _.expected_outputs)
      (i.has(d) &&
        r.push({
          code: "duplicate_output_declaration",
          path: `work_items[${a}].expected_outputs`,
          message: `Output ${d} is declared more than once.`,
        }),
        i.set(d, _.id));
  wt(e, i, r);
  for (let [a, _] of e.work_items.entries())
    for (let d of _.required_inputs)
      (!i.has(d) || i.get(d) === _.id) &&
        r.push({
          code: "missing_input_declaration",
          path: `work_items[${a}].required_inputs`,
          message: `Input ${d} has no other producing WorkItem.`,
        });
  for (let [a, _] of e.work_items.entries()) {
    ((_.expected_outputs.length === 0 || _.expected_outputs.some((s) => !s.trim())) &&
      r.push({
        code: "missing_output_declaration",
        path: `work_items[${a}].expected_outputs`,
        message: `Work item ${_.id} declares an empty output.`,
      }),
      _.acceptance_criteria.length === 0 &&
        r.push({
          code: "missing_acceptance",
          path: `work_items[${a}].acceptance_criteria`,
          message: `Work item ${_.id} has no acceptance criteria.`,
        }));
    let d = new Set(_.validation.checks.map((s) => s.id)),
      k = new Map(_.validation.criteria.map((s) => [s.id, s]));
    for (let s of _.acceptance_criteria) {
      if (!s.required) continue;
      let p = k.get(s.id),
        u = s.check_ids.some((f) => !d.has(f)),
        g =
          s.check_ids.length === 0 ||
          !p?.required ||
          s.check_ids.some((f) => !p.check_ids.includes(f));
      (u || g) &&
        r.push({
          code: "missing_validation",
          path: `work_items[${a}].acceptance_criteria.${s.id}`,
          message: `Required criterion ${s.id} is not fully covered by validation criteria and declared checks.`,
        });
    }
    if (t.size > 0)
      for (let s of new Set([..._.capabilities, ..._.validation.checks.map((p) => p.capability)]))
        t.has(s) ||
          r.push({
            code: "unsupported_capability",
            path: `work_items[${a}].capabilities`,
            message: `Capability ${s} is not available.`,
          });
  }
  return r;
}
var xt = new Set(["COMPLETED", "REWORK_READY"]);
var A = string2().trim().min(1);
var j = custom(
  (e) => typeof e == "string" && /^sha256:[0-9a-f]{64}$/u.test(e),
  "Expected a SHA-256 digest.",
);
var jt = string2().datetime({ offset: true });
var pe2 = object({ id: A, description: A, required: boolean2(), check_ids: array(A) }).strict();
var Le = object({
  id: A,
  kind: _enum(["structural", "deterministic", "semantic", "provider"]),
  required: boolean2(),
  capability: A,
  command: A.optional(),
  timeout_ms: number2().int().positive().optional(),
}).strict();
var Ue = object({
  schema_version: literal(1),
  criteria: array(pe2),
  checks: array(Le),
  evidence_fingerprint: j,
}).strict();
var Dt = discriminatedUnion("kind", [
  object({
    kind: literal("commit"),
    sha: string2()
      .regex(/^[0-9a-f]{40}$|^[0-9a-f]{64}$/u)
      .refine((e) => !/^0+$/u.test(e), "A zero Git object id is not a repository baseline."),
    ref: string2().nullable(),
  }).strict(),
  object({ kind: literal("unborn"), ref: string2().nullable() }).strict(),
  object({ kind: literal("unavailable"), reason_code: A, detail: string2().optional() }).strict(),
]);
var Lt = object({
  schema_version: literal(1),
  digest: j,
  git: Dt,
  dirty_paths: array(string2()),
  policy_digest: j.nullable(),
  config_digest: j.nullable(),
  context_digest: j.nullable(),
  task_history_cursor: string2().nullable(),
  captured_at: jt,
})
  .strict()
  .superRefine((e, t) => {
    let { digest: r, ...i } = e;
    r !== x2(i) &&
      t.addIssue({
        code: "custom",
        path: ["digest"],
        message: "Repository snapshot digest does not match its canonical content.",
      });
  });
var Ut = object({
  required_sources: array(A),
  optional_sources: array(A),
  symbol_hints: array(A),
  max_bytes: number2().int().positive(),
}).strict();
var Vt = object({
  kind: _enum(["path", "workspace", "provider_queue", "exclusive"]),
  resource: A,
  mode: _enum(["read", "write", "exclusive"]),
}).strict();
var Ve = object({
  id: A,
  objective: A,
  depends_on: array(A),
  required_inputs: array(A),
  expected_outputs: array(A),
  scope_roots: array(A),
  acceptance_criteria: array(pe2).min(1),
  validation: Ue,
  context: Ut,
  risk: _enum(["low", "medium", "high"]),
  capabilities: array(A),
  resource_claims: array(Vt),
  optional: boolean2(),
  priority: number2().int(),
}).strict();
var Kt = strictObject({
  schema_version: literal(1),
  package: strictObject({ id: A, version: A }),
  scenario: strictObject({ id: A, api_version: literal("2"), digest: j }),
  compiler: strictObject({ id: literal("agentplane.scenario"), version: literal(1) }),
  source_plan_semantics_digest: j,
  parameters: array(
    strictObject({
      name: A,
      value: union([string2().max(8192), number2().int().safe(), boolean2()]),
    }),
  )
    .max(256)
    .superRefine((e, t) => {
      e.some((r, i) => i > 0 && e[i - 1].name >= r.name) &&
        t.addIssue({ code: "custom", message: "Recipe parameters must be unique and sorted." });
    }),
  applicability: strictObject({ observed_by: literal("agentplane"), evidence_digest: j }),
  closure: strictObject({
    digest: j,
    artifact_digest: j,
    artifact_path: A,
    artifact_size_bytes: number2().int().nonnegative(),
    task_quality_root: A,
  }),
});
var de2 = object({
  schema_version: literal(1),
  task_id: A,
  planning_baseline: Lt,
  work_items: object({ schema_version: literal(1), work_items: array(Ve).min(1) }).strict(),
  assumptions: array(string2()),
  unresolved_questions: array(string2()),
  top_level_validation: Ue,
  recipe_provenance: Kt.optional(),
})
  .strict()
  .superRefine((e, t) => {
    if (e.recipe_provenance) {
      let { recipe_provenance: r, ...i } = e;
      Ce2(i) !== r.source_plan_semantics_digest &&
        t.addIssue({
          code: "custom",
          path: ["recipe_provenance", "source_plan_semantics_digest"],
          message: "Recipe provenance does not bind this exact source Plan.",
        });
    }
    for (let r of _e2(e.work_items))
      t.addIssue({ code: "custom", path: r.path.split("."), message: `${r.code}: ${r.message}` });
  });
function $t(e) {
  return de2.parse(e);
}
var Ft = strictObject({ criterion_ids: array(A).min(1), check_ids: array(A).min(1) });
var Ke = strictObject({
  schema_version: literal(2),
  criteria: array(pe2).min(1),
  checks: array(Le).min(1),
  work_items: array(
    Ve.omit({ acceptance_criteria: true, validation: true }).extend({
      criterion_ids: array(A).min(1).optional(),
      check_ids: array(A).min(1).optional(),
    }),
  ).min(1),
  top_level_validation: Ft.optional(),
  assumptions: array(string2()).default([]),
  unresolved_questions: array(string2()).default([]),
}).describe(
  "Define criteria and checks once. One WorkItem may omit criterion_ids, check_ids and top_level_validation to use all definitions. Multiple WorkItems must declare these references explicitly. The CLI supplies the task identity and issued repository baseline.",
);
function zt(e, t) {
  let r = Ke.parse(e);
  function i(f, P) {
    let M = new Map();
    for (let C of f) {
      if (M.has(C.id)) throw new Error(`Duplicate ${P} id: ${C.id}`);
      M.set(C.id, C);
    }
    return M;
  }
  let a = i(r.criteria, "criterion"),
    _ = i(r.checks, "check"),
    d = new Set(),
    k = new Set();
  function s(f, P, M, C) {
    if (new Set(f).size !== f.length) throw new Error(`Duplicate ${C} reference`);
    return f.map((K) => {
      let Z = P.get(K);
      if (!Z) throw new Error(`Unknown ${C} reference: ${K}`);
      return (M.add(K), Z);
    });
  }
  function p(f) {
    if (r.work_items.length > 1 && (!f.criterion_ids || !f.check_ids))
      throw new Error("Multiple WorkItems require explicit validation references");
    let P = s(f.criterion_ids ?? [...a.keys()], a, d, "criterion"),
      M = s(f.check_ids ?? [..._.keys()], _, k, "check"),
      C = new Set(M.map((K) => K.id));
    for (let K of P)
      if (K.check_ids.some((Z) => !C.has(Z)))
        throw new Error(`Criterion ${K.id} references a check outside its validation plan`);
    return {
      schema_version: 1,
      criteria: P,
      checks: M,
      evidence_fingerprint: t.planning_baseline.digest,
    };
  }
  let u = r.work_items.map(({ criterion_ids: f, check_ids: P, ...M }) => {
      let C = p({ criterion_ids: f, check_ids: P });
      return { ...M, acceptance_criteria: C.criteria, validation: C };
    }),
    g = p(r.top_level_validation ?? {});
  if (d.size !== a.size || k.size !== _.size)
    throw new Error("Compact plan contains unused criteria or checks");
  return de2.parse({
    schema_version: 1,
    task_id: t.task_id,
    planning_baseline: t.planning_baseline,
    work_items: { schema_version: 1, work_items: u },
    assumptions: r.assumptions,
    unresolved_questions: r.unresolved_questions,
    top_level_validation: g,
  });
}
var qt = union([de2, Ke]);
function ho(e, t) {
  let r = qt.parse(e);
  if (r.schema_version === 2) return zt(r, t);
  if (!t.rebind) {
    if (r.task_id !== t.task_id) throw new Error("task_id does not match the current task");
    if (r.planning_baseline.digest !== t.planning_baseline.digest)
      throw new Error("planning_baseline does not match the issued repository observation");
    return r;
  }
  let i = (a) => ({ ...a, evidence_fingerprint: t.planning_baseline.digest });
  return $t({
    ...r,
    task_id: t.task_id,
    planning_baseline: t.planning_baseline,
    work_items: {
      ...r.work_items,
      work_items: r.work_items.work_items.map((a) => ({ ...a, validation: i(a.validation) })),
    },
    top_level_validation: i(r.top_level_validation),
  });
}
var o = string2().min(1);
var y2 = string2().datetime({ offset: true });
var U2 = o.nullable();
var $ = y2.nullable();
function Wt(e, t) {
  return toJSONSchema(e, {
    target: "draft-07",
    unrepresentable: "any",
    io: "input",
    reused: t,
    cycles: "throw",
  });
}
function F(e, t, r = {}) {
  let i = Wt(e, r.reused ?? "inline"),
    { $schema: a, definitions: _, ...d } = i;
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: t.$id,
    title: t.title,
    ...(t.description ? { description: t.description } : {}),
    ...(r.reused === "ref" && _ ? { definitions: _ } : {}),
    ...d,
  };
}
var qe2 = "0.1.0";
var X2 = string2().regex(/^sha256:[0-9a-f]{64}$/);
var Fe2 = string2().regex(/^[a-f0-9]{7,64}$/);
var me2 = string2()
  .min(1)
  .regex(/^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$)).+$/);
var ze = _enum([
  "auth",
  "secrets",
  "payments",
  "infra",
  "ci",
  "dependencies",
  "data_model",
  "security",
  "generated_code",
  "public_api",
  "docs",
  "tests",
  "tooling",
  "cli",
  "schema",
  "policy",
  "evidence",
  "custom",
]);
var fe2 = object({ type: o, id: o }).strict();
var Zt = object({ type: o, id: o }).strict();
var We2 = object({ path: me2, sha256: X2 }).strict();
var Bt = object({ name: o, version: o.optional() }).strict();
var Jt = object({ name: o, version: o }).strict();
var Xt = object({
  vcs: literal("git"),
  remote: o.optional(),
  base_ref: o.optional(),
  base_commit: Fe2,
  work_ref: o.optional(),
  work_commit: Fe2,
  change_request: object({
    provider: _enum(["github", "gitlab", "unknown", "custom"]),
    type: _enum(["pull_request", "merge_request", "unknown", "custom"]),
    id: o,
  })
    .strict()
    .optional(),
}).strict();
var Qt = object({
  task_id: o,
  title: o,
  intent: o,
  requested_by: fe2.optional(),
  external_refs: array(Zt).optional(),
}).strict();
var en = object({
  id: o.optional(),
  name: o,
  agent_type: _enum(["coding_agent", "human", "hybrid", "automation", "unknown"]),
  model: object({
    provider: _enum(["anthropic", "openai", "cursor", "aider", "unknown", "custom"]),
    name: o,
    version: o,
  })
    .strict()
    .optional(),
  toolchain: array(Bt).optional(),
}).strict();
var tn = object({
  status: _enum(["missing", "draft", "pending_approval", "approved", "rejected", "waived"]),
  artifact: We2.optional(),
  approved_at: y2.optional(),
  approved_by: fe2.optional(),
}).strict();
var nn = object({
  filesystem: object({ allowed_paths: array(o).optional(), protected_paths: array(o).optional() })
    .strict()
    .optional(),
  network: object({
    mode: _enum(["disabled", "approval_required", "allowed", "unknown"]),
  }).strict(),
  secrets: object({ access: _enum(["none", "approval_required", "allowed", "unknown"]) }).strict(),
  tools: array(object({ name: o, allowed: boolean2() }).strict()).optional(),
}).strict();
var rn = object({
  policy_version: o.optional(),
  policy_hash: X2.optional(),
  decisions: array(
    object({
      rule_id: o,
      decision: _enum(["pass", "fail", "warning", "not_applicable", "manual_override"]),
      reason: o,
    }).strict(),
  ),
}).strict();
var on = object({
  summary: o,
  diff_stats: object({
    files_changed: number2().int().min(0),
    insertions: number2().int().min(0),
    deletions: number2().int().min(0),
  }).strict(),
  files: array(
    object({
      path: me2,
      status: _enum([
        "added",
        "modified",
        "deleted",
        "renamed",
        "copied",
        "type_changed",
        "unknown",
      ]),
      risk_categories: array(ze).optional(),
    }).strict(),
  ),
  risk: object({
    level: _enum(["low", "medium", "high", "critical", "unknown"]),
    categories: array(ze),
    protected_paths_touched: boolean2(),
  }).strict(),
}).strict();
var an = object({
  status: _enum(["passed", "failed", "partial", "not_run", "waived"]),
  checks: array(
    object({
      check_id: o,
      type: _enum([
        "test",
        "lint",
        "typecheck",
        "build",
        "security_scan",
        "schema_validation",
        "manual_review",
        "other",
      ]),
      command: o.optional(),
      status: _enum(["passed", "failed", "skipped", "not_run", "waived", "unknown"]),
      exit_code: number2().int().nullable().optional(),
      artifact: We2.optional(),
    }).strict(),
  ),
}).strict();
var sn = object({
  approval_id: o,
  type: _enum([
    "plan_approval",
    "plan_waiver",
    "protected_path_approval",
    "verification_waiver",
    "policy_override",
    "merge_approval",
  ]),
  decision: _enum(["approved", "rejected", "waived", "overridden"]),
  approved_by: fe2,
  approved_at: y2,
  scope: o,
}).strict();
var cn = object({
  type: _enum([
    "task",
    "plan",
    "approval",
    "policy",
    "diff",
    "verification_log",
    "test_report",
    "security_report",
    "finish",
    "other",
  ]),
  path: me2,
  sha256: X2,
}).strict();
var ln = object({
  status: _enum([
    "draft",
    "planned",
    "approved",
    "implemented",
    "verified",
    "finished",
    "failed",
    "abandoned",
  ]),
  merge_ready: boolean2(),
  residual_risks: array(o).optional(),
  rollback: object({ available: boolean2(), notes: o.optional() }).strict().optional(),
}).strict();
var _n = object({
  digest_algorithm: literal("sha256"),
  record_digest: X2.nullable(),
  canonicalization: literal("rfc8785-jcs"),
  signatures: array(unknown()).optional(),
}).strict();
var pn = string2().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)+$/);
var Q2 = object({
  acr_version: literal(qe2),
  record_type: literal("agent_change_record"),
  record_id: string2().regex(/^acr_[A-Za-z0-9_-]+$/),
  created_at: y2,
  producer: Jt,
  repository: Xt,
  task: Qt,
  agent: en,
  plan: tn,
  permissions: nn,
  policy: rn,
  changes: on,
  verification: an,
  approvals: array(sn),
  evidence: array(cn),
  result: ln,
  integrity: _n,
  extensions: record(pn, unknown()).optional(),
}).strict();
var Ye = "0.1";
var Ge = [
  "spec_gap",
  "assumption",
  "decision",
  "deviation",
  "tradeoff",
  "risk",
  "bug_candidate",
  "issue_candidate",
  "incident_candidate",
  "context_candidate",
  "agent_improvement_candidate",
  "workflow_improvement_candidate",
];
var Ze = ["planning", "implementation", "verification", "integration", "finish", "post_run"];
var Be = ["low", "medium", "high", "critical"];
var Je = [
  "none",
  "readme_finding",
  "github_issue",
  "incident",
  "context",
  "skill",
  "workflow_change",
  "agent_prompt_change",
  "test_gap",
];
var Xe = ["open", "accepted", "promoted", "dismissed", "superseded"];
var un = string2()
  .min(1)
  .regex(/^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$)).+$/);
var mn = object({
  files: array(un).optional(),
  commands: array(o).optional(),
  refs: array(o).optional(),
}).strict();
var fn = object({ type: _enum(Je), title: o.optional(), details: o.optional() }).strict();
var ee2 = object({
  schema_version: literal(Ye),
  id: string2().regex(/^obs-[A-Za-z0-9_-]+$/),
  task_id: o,
  created_at: y2,
  author: o,
  phase: _enum(Ze),
  kind: _enum(Ge),
  severity: _enum(Be),
  summary: o,
  evidence: mn.optional(),
  decision: o.optional(),
  impact: o.optional(),
  recommended_action: fn.optional(),
  status: _enum(Xe),
  tags: array(o).optional(),
}).strict();
var gn = ["dry_run", "execute"];
var yn = ["requested", "accepted", "blocked", "expired", "cancelled"];
var An = ["task_readme", "verification", "acr", "trace", "artifact", "custom"];
var kn = ["evidence", "artifact", "trace", "acr", "log"];
var hn = string2().regex(/^[a-f0-9]{7,64}$/u);
var z = string2()
  .min(1)
  .max(160)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/u);
var Sn = string2()
  .min(1)
  .max(240)
  .regex(
    /^(?!\/)(?!.*\/$)(?!.*\/\/)(?!.*\.\.)(?!.*(?:^|\/)\.)(?!.*(?:^|\/)[^/]*\.lock(?:\/|$))(?!.*[~^:?*[\]\\\s@$`;|&<>(){}])[\w./-]+$/u,
  );
var En = string2()
  .min(1)
  .max(200)
  .regex(
    /^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*:\/\/)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\.git$)[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u,
  );
var bn = object({
  kind: literal("git"),
  repository: En,
  ref: Sn,
  commit_sha: hn.optional(),
}).strict();
var vn = object({
  type: _enum(["human", "agent", "automation", "service", "unknown"]),
  id: z,
}).strict();
var Tn = object({ kind: _enum(An), id: z, required: boolean2().default(true) }).strict();
var Rn = object({ kind: _enum(kn), target_id: z, expires_at: y2.optional() }).strict();
var On = object({ checked_at: y2, active: literal(false) }).strict();
var Y = object({
  schema_version: literal(1),
  run_id: z,
  project_id: z,
  workspace_id: z,
  task_id: o,
  agent_task_id: z.optional(),
  plan_id: z.optional(),
  repo_ref: bn,
  requested_by: vn,
  mode: _enum(gn),
  required_evidence: array(Tn).min(1),
  upload_targets: array(Rn).min(1),
  created_at: y2,
  expires_at: y2,
  status: _enum(yn),
  kill_switch_checked: On,
})
  .strict()
  .superRefine((e, t) => {
    Date.parse(e.expires_at) <= Date.parse(e.created_at) &&
      t.addIssue({
        code: "custom",
        path: ["expires_at"],
        message: "expires_at must be after created_at",
      });
  });
var te2 = ["TODO", "DOING", "DONE", "BLOCKED"];
var Do = te2.join("|");
var xn = new Set(te2);
var Pn = ["status", "comment", "verify"];
var Ae2 = literal(3);
var et = record(string2(), string2());
var ke2 = object({ author: o, body: o }).strict();
var he2 = object({
  type: _enum(Pn),
  at: y2,
  author: o,
  commit: string2()
    .regex(/^[0-9a-f]{40,64}$/u)
    .optional(),
  from: string2().optional(),
  to: string2().optional(),
  state: string2().optional(),
  note: string2().optional(),
  body: string2().optional(),
}).passthrough();
var Mn = ["pending", "approved", "rejected"];
var Hn = ["pending", "ok", "needs_rework", "blocked_external"];
var jn = ["pending", "pass", "rework", "blocked", "human_review"];
var Dn = ["human_supplied", "evaluator_supplied"];
var Se2 = object({
  state: _enum(Mn),
  updated_at: $,
  updated_by: string2().nullable(),
  note: string2().nullable(),
}).passthrough();
var Ee = object({
  state: _enum(Hn),
  attempts: number2().int().min(0).optional(),
  updated_at: $,
  updated_by: string2().nullable(),
  note: string2().nullable(),
})
  .passthrough()
  .transform((e) => ({ ...e, attempts: e.attempts ?? 0 }));
var be2 = object({
  state: _enum(jn),
  provenance: _enum(Dn).optional(),
  updated_at: $,
  updated_by: string2().nullable(),
  note: string2().nullable(),
  evaluated_sha: string2().nullable(),
  review_identity_digest: string2().nullable(),
  evidence_refs: array(string2()).default([]),
  findings: array(string2()).default([]),
}).passthrough();
var Ln = ["low", "normal", "med", "high"];
var Un = ["low", "med", "high"];
var Vn = ["analysis", "content", "docs", "code", "release", "ops", "context"];
var Kn = ["none", "docs", "code", "release", "ops", "context", "unknown"];
var $n = ["network", "credentials", "deploy", "publish", "merge", "security", "external_system"];
var Fn = ["prepared", "running", "success", "failed", "blocked", "cancelled"];
var zn = ["execute", "dry_run"];
var qn = ["task", "recipe_scenario"];
var Wn = ["agentplane", "provider", "bidirectional", "derived", "ignored"];
var Yn = ["record", "manual", "agentplane_wins", "provider_wins"];
var Gn = ["field", "identity", "freshness", "deletion", "dependency", "permission"];
var Zn = ["info", "warning", "blocking"];
var Bn = ["open", "resolved", "ignored"];
var nt = _enum(te2);
var rt = _enum(Ln);
var ot = _enum(Un);
var it = _enum(Vn);
var at = _enum(Kn);
var st = array(_enum($n));
var ct = object({
  schema_version: literal(1),
  requested_mode: _enum(["repository", "auto", "direct", "branch_pr"]),
  selected_mode: _enum(["direct", "branch_pr"]),
  repository_mode: _enum(["direct", "branch_pr"]),
  reason_codes: array(o).min(1),
  frozen: literal(true),
}).strict();
var q2 = _enum([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
var V2 = _enum([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);
var Jn = object({
  schema_version: literal(2),
  preferred_mode: _enum(["direct", "branch_pr"]),
  scope_roots: array(o),
  repository_effects: array(q2),
  external_effects: array(V2),
  requirements_uncertainty: _enum(["bounded", "material"]),
  implementation_uncertainty: _enum(["bounded", "material"]),
  reversibility: _enum(["reversible", "recovery_required", "irreversible"]),
  rationale: array(o).min(1),
}).strict();
var Xn = object({ id: o, result: _enum(["pass", "fail", "unsupported"]) }).strict();
var lt = {
  source: literal("execution_contract"),
  phase: _enum(["task", "local", "pr", "release"]),
  observed: object({
    repository_effects: array(q2),
    external_effects: array(V2),
    changed_components: array(o),
    changed_files: array(o),
  }).strict(),
  policy_floor: object({
    pr_full_regression: literal(true),
    unknown_or_central_full_regression: literal(true),
    monotonic_strengthening: literal(true),
  }).strict(),
  selected_checks: array(o).min(1),
  escalation_reasons: array(o),
  requires_full_regression: boolean2(),
  requires_real_e2e: boolean2(),
  digest: string2().regex(/^sha256:[0-9a-f]{64}$/u),
};
var Qn = object({
  ...lt,
  schema_version: literal(1),
  declared: object({ repository_effects: array(q2), external_effects: array(V2) }).strict(),
  selector: object({ kind: o, reason: o, selected_test_files: array(o) }).strict(),
}).strict();
var er = object({
  ...lt,
  schema_version: literal(2),
  declared: object({
    repository_effects: array(q2),
    external_effects: array(V2),
    components: array(o),
    risk: object({
      requirements_uncertainty: _enum(["bounded", "material"]),
      implementation_uncertainty: _enum(["bounded", "material"]),
      reversibility: _enum(["reversible", "recovery_required", "irreversible"]),
    }).strict(),
    evidence_requirements: array(o).min(1),
  }).strict(),
  selector: object({
    kind: o,
    reason: o,
    execution_mode: o,
    bucket: o.nullable(),
    buckets: array(o),
    lint_targets: array(o),
    vitest_pool: _enum(["threads", "forks"]),
    run_cli_docs_check: boolean2(),
    selected_test_files: array(o),
  }).strict(),
  execution_groups: array(o).min(1),
}).strict();
var tr = union([Qn, er]);
var _t = object({
  schema_version: literal(1),
  source: _enum(["agent_declared", "legacy_compatibility"]),
  declaration: Jn,
  selected_mode: _enum(["direct", "branch_pr"]),
  repository_mode: _enum(["direct", "branch_pr"]),
  reason_codes: array(o).min(1),
  authority: object({
    writable_roots: array(o),
    allowed_repository_effects: array(q2),
    forbidden_repository_effects: array(q2),
    allowed_external_effects: array(V2),
    forbidden_external_effects: array(V2),
    allowed_capabilities: array(o).optional(),
    allowed_resources: array(o).optional(),
  }).strict(),
  safety: object({
    requires_worktree: boolean2(),
    requires_user_approval: boolean2(),
    approval_effects: array(V2),
  }).strict(),
  verification: object({ required_evidence: array(o).min(1), contract: tr.optional() }).strict(),
  observed: object({
    repository_effects: array(q2),
    external_effects: array(V2),
    changed_paths: array(o),
    changed_components: array(o),
    verification_results: array(Xn),
    authority_violations: array(o),
  }).strict(),
  escalation: object({
    from: literal("direct"),
    to: literal("branch_pr"),
    reason_codes: array(o).min(1),
    preserved_changed_paths: array(o).min(1),
    preserved_commit: o.optional(),
  })
    .strict()
    .optional(),
}).strict();
var pt = object({
  system: o,
  issue_id: o.optional(),
  url: o.optional(),
  recipe_id: o.optional(),
  scenario_id: o.optional(),
  recipe_version: o.optional(),
  run_id: o.optional(),
}).catchall(string2());
var dt = object({ hash: o, message: o }).strict().nullable();
var nr = object({
  kind: _enum(qn),
  task_id: o.optional(),
  recipe_id: o.optional(),
  scenario_id: o.optional(),
}).passthrough();
var rr = object({
  duration_ms: number2().optional(),
  stdout_bytes: number2().optional(),
  stderr_bytes: number2().optional(),
  output_last_message_bytes: number2().nullable().optional(),
}).passthrough();
var or = object({
  provenance: literal("supervisor_observed").optional(),
  evidence_paths: array(o).optional(),
  changed_paths: array(o).optional(),
  files_changed_count: number2().int().min(0).optional(),
  tests_run: array(o).optional(),
  verification_candidates: array(o).optional(),
}).passthrough();
var ir = object({
  path: o,
  sha256: string2().regex(/^sha256:[0-9a-f]{64}$/u),
  verification_state: _enum([
    "observed_success",
    "rejected",
    "unverified",
    "compatibility_unverified",
  ]),
  observed_by: literal("agentplane"),
}).strict();
var tt = object({
  run_id: o,
  status: _enum(Fn),
  adapter_id: o,
  mode: _enum(zn),
  created_at: y2.optional(),
  updated_at: y2,
  started_at: y2.optional(),
  ended_at: y2.optional(),
  exit_code: number2().int().nullable(),
  target: nr,
  summary: string2().optional(),
  output_paths: array(o).optional(),
  stdout_summary: string2().optional(),
  stderr_summary: string2().optional(),
  metrics: rr.optional(),
  evidence: or.optional(),
  execution_receipt: ir.optional(),
}).passthrough();
var ut = tt.extend({ history: array(tt).optional() });
var mt = object({
  schema_version: literal(1),
  state: _enum(["observed", "partial", "unavailable"]),
  cached_input_tokens: number2().int().min(0).nullable().optional(),
  cached_input_observed_agent_runs: number2().int().min(0).optional(),
  input_tokens: number2().int().min(0).nullable(),
  output_tokens: number2().int().min(0).nullable(),
  reasoning_tokens: number2().int().min(0).nullable(),
  total_tokens: number2().int().min(0).nullable(),
  agent_runs: number2().int().min(0),
  observed_agent_runs: number2().int().min(0),
  source: _enum(["supervisor_journal", "unavailable"]),
  observed_by: literal("agentplane"),
  journal_digest: string2()
    .regex(/^sha256:[0-9a-f]{64}$/u)
    .nullable(),
  unavailable_reason: string2().min(1).nullable(),
  updated_at: y2,
})
  .strict()
  .superRefine((e, t) => {
    (((e.cached_input_observed_agent_runs ?? 0) > e.observed_agent_runs ||
      ((e.cached_input_observed_agent_runs ?? 0) > 0 && e.cached_input_tokens == null) ||
      (e.cached_input_tokens != null && (e.cached_input_observed_agent_runs ?? 0) === 0) ||
      (e.cached_input_tokens != null &&
        (e.input_tokens == null || e.cached_input_tokens > e.input_tokens))) &&
      t.addIssue({
        code: "custom",
        message: "Cached input requires consistent supervisor-observed coverage and input totals.",
      }),
      e.observed_agent_runs > e.agent_runs &&
        t.addIssue({
          code: "custom",
          message: "Observed token-usage runs cannot exceed total agent runs.",
        }));
    let r = [e.input_tokens, e.output_tokens, e.reasoning_tokens, e.total_tokens];
    e.state === "observed"
      ? (e.agent_runs === 0 ||
          e.observed_agent_runs !== e.agent_runs ||
          r.includes(null) ||
          e.source !== "supervisor_journal" ||
          e.unavailable_reason !== null) &&
        t.addIssue({
          code: "custom",
          message: "Observed token usage requires complete supervisor-observed telemetry.",
        })
      : e.state === "partial"
        ? (e.observed_agent_runs === 0 ||
            e.source !== "supervisor_journal" ||
            e.unavailable_reason === null) &&
          t.addIssue({
            code: "custom",
            message: "Partial token usage requires some observed telemetry and a gap reason.",
          })
        : (e.observed_agent_runs !== 0 ||
            r.some((i) => i !== null) ||
            e.unavailable_reason === null) &&
          t.addIssue({
            code: "custom",
            message: "Unavailable token usage must not fabricate token counts.",
          });
  });
var ar = object({
  provider: o,
  connector_kind: o.optional(),
  connection_id: o.optional(),
  installation_id: o.optional(),
  remote_id: o,
  remote_url: o.optional(),
  remote_revision: o.optional(),
  title: o.optional(),
  state: o.optional(),
  synced_at: y2.optional(),
}).strict();
var sr = object({
  authority: _enum(Wn),
  remote_field: o.optional(),
  conflict_policy: _enum(Yn).optional(),
  updated_at: y2.optional(),
  note: o.optional(),
}).strict();
var cr = object({
  projected_at: y2.optional(),
  projection_sha256: o.optional(),
  source_revision: number2().int().min(0).optional(),
  provider_revision: o.optional(),
  stale: boolean2().optional(),
  reason: o.optional(),
}).strict();
var lr = object({
  id: o,
  kind: _enum(Gn),
  severity: _enum(Zn),
  status: _enum(Bn),
  summary: o,
  provider: o.optional(),
  remote_id: o.optional(),
  field: o.optional(),
  detected_at: y2,
  resolved_at: y2.optional(),
  safe_command: o.optional(),
  when_to_stop: o.optional(),
}).strict();
var ft = object({
  version: literal(1),
  external_refs: array(ar).default([]),
  field_policies: record(o, sr).default({}),
  freshness: cr.optional(),
  conflicts: array(lr).default([]),
}).strict();
var ne = object({
  id: o,
  title: o,
  result_summary: string2().optional(),
  risk_level: ot.optional(),
  breaking: boolean2().optional(),
  status: nt,
  priority: rt,
  owner: o,
  revision: number2().int().min(1).optional(),
  origin: pt.optional(),
  depends_on: array(o),
  tags: array(o),
  task_kind: it.optional(),
  mutation_scope: at.optional(),
  risk_flags: st.optional(),
  verify: array(o),
  plan_approval: Se2,
  verification: Ee,
  quality_review: be2.optional(),
  runner: ut.optional(),
  token_usage: mt.optional(),
  execution_route: ct.optional(),
  execution_contract: _t.optional(),
  sync: ft.optional(),
  commit: dt.optional(),
  comments: array(ke2),
  events: array(he2).optional(),
  doc_version: Ae2,
  doc_updated_at: y2,
  doc_updated_by: o,
  description: string2(),
  sections: et.optional(),
  dirty: boolean2().optional(),
  id_source: o.optional(),
  extensions: record(string2(), unknown()).optional(),
}).passthrough();
var _r = object({
  id: o,
  title: o,
  result_summary: string2().optional(),
  risk_level: ot.optional(),
  breaking: boolean2().optional(),
  status: nt,
  priority: rt,
  owner: o,
  revision: number2().int().min(1).optional(),
  origin: pt.optional(),
  runner: ut.optional(),
  token_usage: mt.optional(),
  execution_route: ct.optional(),
  execution_contract: _t.optional(),
  depends_on: array(o),
  tags: array(o),
  task_kind: it.optional(),
  mutation_scope: at.optional(),
  risk_flags: st.optional(),
  verify: array(o),
  plan_approval: Se2,
  verification: Ee,
  quality_review: be2.optional(),
  commit: dt,
  comments: array(ke2),
  events: array(he2).optional(),
  sync: ft.optional(),
  doc_version: Ae2,
  doc_updated_at: y2,
  doc_updated_by: o,
  description: string2(),
  dirty: boolean2(),
  id_source: o,
}).passthrough();
var pr = object({
  schema_version: literal(1),
  managed_by: o,
  checksum_algo: literal("sha256"),
  checksum: o,
}).strict();
var re = object({ tasks: array(_r), meta: pr }).strict();
var fr = ["prepared", "running", "success", "failed", "blocked", "cancelled"];
var gr = ["protected_base_integrate"];
var yr = ["awaiting_github_merge", "awaiting_provider_merge"];
var Ar = ["not_performed"];
var kr = [
  "github_pr_merge_then_hosted_close",
  "github_task_pr_merge_then_hosted_close",
  "provider_change_request_merge_then_hosted_close",
];
var hr = ["run", "resume", "retry", "wait", "cancel_then_resume", "none"];
var Sr = object({
  kind: _enum(gr),
  status: _enum(yr).nullable().optional(),
  local_mutation: _enum(Ar).nullable().optional(),
  finalize_via: _enum(kr).nullable().optional(),
  provider: _enum(["github", "gitlab"]).nullable().optional(),
  pr_number: number2().int().min(1).nullable().optional(),
  pr_url: U2.optional(),
  provider_base_sha: U2.optional(),
  handoff_show_command: string2().nullable().optional(),
  base_pull_command: string2().nullable().optional(),
}).passthrough();
var Er = object({
  run_id: U2.optional(),
  status: _enum(fr).nullable().optional(),
  heartbeat_at: $.optional(),
  next_action: _enum(hr).nullable().optional(),
  next_command: string2().nullable().optional(),
  resume_command: string2().nullable().optional(),
  retry_command: string2().nullable().optional(),
  state_path: string2().nullable().optional(),
  trace_path: string2().nullable().optional(),
}).passthrough();
var oe2 = object({
  schema_version: literal(1),
  task_id: o,
  created_at: y2,
  from_role: o,
  to_role: U2.optional(),
  reason: o,
  note: string2().optional(),
  branch: U2.optional(),
  base_branch: U2.optional(),
  head_sha: string2().min(7).nullable().optional(),
  workspace_root: U2.optional(),
  pr_branch: U2.optional(),
  runner: Er.optional(),
  route: Sr.optional(),
  next_actions: array(o).optional(),
  risks: array(o).optional(),
  open_questions: array(o).optional(),
  evidence_paths: array(o).optional(),
}).passthrough();
var br = ["OPEN", "CLOSED", "MERGED"];
var vr = ["open", "merged", "handoff", "remote_staged", "remote_failed"];
var Tr = ["squash", "merge", "rebase"];
var Rr = ["pass", "fail", "skipped"];
var Or = ["all_or_fail"];
var ie = object({
  schema_version: literal(1),
  task_id: o,
  related_task_ids: array(o).optional(),
  batch: object({
    schema_version: literal(1),
    primary_task_id: o,
    included_task_ids: array(o).min(1),
    closure_policy: _enum(Or),
  })
    .strict()
    .optional(),
  branch: o.optional(),
  base: o.optional(),
  pr_number: number2().int().min(1).optional(),
  pr_url: o.optional(),
  provider: object({
    schema_version: literal(1),
    kind: _enum(["github", "gitlab"]),
    hostname: o,
    remote: o,
    source_project: o,
    target_project: o,
  })
    .strict()
    .optional(),
  created_at: y2,
  updated_at: y2,
  status: _enum(br).optional(),
  artifact_state: _enum(vr).optional(),
  artifact_state_reason: o.optional(),
  artifact_state_updated_at: y2.optional(),
  merge_strategy: _enum(Tr).optional(),
  merged_at: y2.optional(),
  merge_commit: o.optional(),
  head_sha: o.optional(),
  last_verified_sha: string2().min(7).nullable().optional(),
  last_verified_at: $.optional(),
  verify: object({ status: _enum(Rr).optional(), command: string2().optional() })
    .passthrough()
    .optional(),
}).passthrough();
var wr = F(Q2, {
  $id: "https://agentplane.org/schemas/acr-v0.1.schema.json",
  title: "Agent Change Record (ACR) v0.1",
  description:
    "ACR is a machine-readable evidence projection derived from AgentPlane task, policy, verification, and Git state.",
});
var Ir = F(ne, {
  $id: "https://agentplane.org/schemas/task-readme-frontmatter.schema.json",
  title: "Task README frontmatter (v1)",
  description:
    "Task READMEs are Markdown with YAML frontmatter. This schema describes the frontmatter keys.",
});
var Cr = F(re, {
  $id: "https://agentplane.org/schemas/tasks-export.schema.json",
  title: "tasks.json export snapshot (v1)",
});
var xr = F(ie, {
  $id: "https://agentplane.org/schemas/pr-meta.schema.json",
  title: "PR artifact meta.json (v1)",
});
var Nr = F(oe2, {
  $id: "https://agentplane.org/schemas/task-handoff.schema.json",
  title: "Task handoff artifact (v1)",
});
var Pr = F(Y, {
  $id: "https://agentplane.org/schemas/runner-handoff.schema.json",
  title: "AgentPlane runner handoff (v1)",
  description:
    "Connector-neutral cloud-to-runner handoff contract for preparing a hosted runner without granting lifecycle authority or executing repository mutations by itself.",
});
var Mr = F(ee2, {
  $id: "https://agentplane.org/schemas/task-observation.schema.json",
  title: "Task observation JSONL entry (v0.1)",
  description:
    "A task observation is one append-only JSONL entry for agent-discovered spec gaps, decisions, risks, and follow-up candidates.",
});

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/index.js
var exports_execa = {};
__export(exports_execa, {
  $: () => $2,
  ExecaError: () => ExecaError,
  ExecaSyncError: () => ExecaSyncError,
  execa: () => execa,
  execaCommand: () => execaCommand,
  execaCommandSync: () => execaCommandSync,
  execaNode: () => execaNode,
  execaSync: () => execaSync,
  getCancelSignal: () => getCancelSignal2,
  getEachMessage: () => getEachMessage2,
  getOneMessage: () => getOneMessage2,
  parseCommandString: () => parseCommandString,
  sendMessage: () => sendMessage2,
});

// ../../../node_modules/.bun/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/file-url.js
import { fileURLToPath } from "node:url";
var safeNormalizeFileUrl = (file, name) => {
  const fileString = normalizeFileUrl(normalizeDenoExecPath(file));
  if (typeof fileString !== "string") {
    throw new TypeError(`${name} must be a string or a file URL: ${fileString}.`);
  }
  return fileString;
};
var normalizeDenoExecPath = (file) => (isDenoExecPath(file) ? file.toString() : file);
var isDenoExecPath = (file) =>
  typeof file !== "string" && file && Object.getPrototypeOf(file) === String.prototype;
var normalizeFileUrl = (file) => (file instanceof URL ? fileURLToPath(file) : file);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/parameters.js
var normalizeParameters = (rawFile, rawArguments = [], rawOptions = {}) => {
  const filePath = safeNormalizeFileUrl(rawFile, "First argument");
  const [commandArguments, options] = isPlainObject2(rawArguments)
    ? [[], rawArguments]
    : [rawArguments, rawOptions];
  if (!Array.isArray(commandArguments)) {
    throw new TypeError(
      `Second argument must be either an array of arguments or an options object: ${commandArguments}`,
    );
  }
  if (
    commandArguments.some(
      (commandArgument) => typeof commandArgument === "object" && commandArgument !== null,
    )
  ) {
    throw new TypeError(`Second argument must be an array of strings: ${commandArguments}`);
  }
  const normalizedArguments = commandArguments.map(String);
  const nullByteArgument = normalizedArguments.find((normalizedArgument) =>
    normalizedArgument.includes("\x00"),
  );
  if (nullByteArgument !== undefined) {
    throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${nullByteArgument}`);
  }
  if (!isPlainObject2(options)) {
    throw new TypeError(`Last argument must be an options object: ${options}`);
  }
  return [filePath, normalizedArguments, options];
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/template.js
import { ChildProcess } from "node:child_process";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/utils/uint-array.js
import { StringDecoder } from "node:string_decoder";
var { toString: objectToString } = Object.prototype;
var isArrayBuffer = (value) => objectToString.call(value) === "[object ArrayBuffer]";
var isUint8Array = (value) => objectToString.call(value) === "[object Uint8Array]";
var bufferToUint8Array = (buffer) =>
  new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
var textEncoder = new TextEncoder();
var stringToUint8Array = (string) => textEncoder.encode(string);
var textDecoder = new TextDecoder();
var uint8ArrayToString = (uint8Array) => textDecoder.decode(uint8Array);
var joinToString = (uint8ArraysOrStrings, encoding) => {
  const strings = uint8ArraysToStrings(uint8ArraysOrStrings, encoding);
  return strings.join("");
};
var uint8ArraysToStrings = (uint8ArraysOrStrings, encoding) => {
  if (
    encoding === "utf8" &&
    uint8ArraysOrStrings.every((uint8ArrayOrString) => typeof uint8ArrayOrString === "string")
  ) {
    return uint8ArraysOrStrings;
  }
  const decoder = new StringDecoder(encoding);
  const strings = uint8ArraysOrStrings
    .map((uint8ArrayOrString) =>
      typeof uint8ArrayOrString === "string"
        ? stringToUint8Array(uint8ArrayOrString)
        : uint8ArrayOrString,
    )
    .map((uint8Array) => decoder.write(uint8Array));
  const finalString = decoder.end();
  return finalString === "" ? strings : [...strings, finalString];
};
var joinToUint8Array = (uint8ArraysOrStrings) => {
  if (uint8ArraysOrStrings.length === 1 && isUint8Array(uint8ArraysOrStrings[0])) {
    return uint8ArraysOrStrings[0];
  }
  return concatUint8Arrays(stringsToUint8Arrays(uint8ArraysOrStrings));
};
var stringsToUint8Arrays = (uint8ArraysOrStrings) =>
  uint8ArraysOrStrings.map((uint8ArrayOrString) =>
    typeof uint8ArrayOrString === "string"
      ? stringToUint8Array(uint8ArrayOrString)
      : uint8ArrayOrString,
  );
var concatUint8Arrays = (uint8Arrays) => {
  const result = new Uint8Array(getJoinLength(uint8Arrays));
  let index = 0;
  for (const uint8Array of uint8Arrays) {
    result.set(uint8Array, index);
    index += uint8Array.length;
  }
  return result;
};
var getJoinLength = (uint8Arrays) => {
  let joinLength = 0;
  for (const uint8Array of uint8Arrays) {
    joinLength += uint8Array.length;
  }
  return joinLength;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/template.js
var isTemplateString = (templates) => Array.isArray(templates) && Array.isArray(templates.raw);
var parseTemplates = (templates, expressions) => {
  let tokens = [];
  for (const [index, template] of templates.entries()) {
    tokens = parseTemplate({
      templates,
      expressions,
      tokens,
      index,
      template,
    });
  }
  if (tokens.length === 0) {
    throw new TypeError("Template script must not be empty");
  }
  const [file, ...commandArguments] = tokens;
  return [file, commandArguments, {}];
};
var parseTemplate = ({ templates, expressions, tokens, index, template }) => {
  if (template === undefined) {
    throw new TypeError(`Invalid backslash sequence: ${templates.raw[index]}`);
  }
  const { nextTokens, leadingWhitespaces, trailingWhitespaces } = splitByWhitespaces(
    template,
    templates.raw[index],
  );
  const newTokens = concatTokens(tokens, nextTokens, leadingWhitespaces);
  if (index === expressions.length) {
    return newTokens;
  }
  const expression = expressions[index];
  const expressionTokens = Array.isArray(expression)
    ? expression.map((expression) => parseExpression(expression))
    : [parseExpression(expression)];
  return concatTokens(newTokens, expressionTokens, trailingWhitespaces);
};
var splitByWhitespaces = (template, rawTemplate) => {
  if (rawTemplate.length === 0) {
    return { nextTokens: [], leadingWhitespaces: false, trailingWhitespaces: false };
  }
  const nextTokens = [];
  let templateStart = 0;
  const leadingWhitespaces = DELIMITERS.has(rawTemplate[0]);
  for (
    let templateIndex = 0, rawIndex = 0;
    templateIndex < template.length;
    templateIndex += 1, rawIndex += 1
  ) {
    const rawCharacter = rawTemplate[rawIndex];
    if (DELIMITERS.has(rawCharacter)) {
      if (templateStart !== templateIndex) {
        nextTokens.push(template.slice(templateStart, templateIndex));
      }
      templateStart = templateIndex + 1;
    } else if (rawCharacter === "\\") {
      const nextRawCharacter = rawTemplate[rawIndex + 1];
      if (
        nextRawCharacter ===
        `
`
      ) {
        templateIndex -= 1;
        rawIndex += 1;
      } else if (nextRawCharacter === "u" && rawTemplate[rawIndex + 2] === "{") {
        rawIndex = rawTemplate.indexOf("}", rawIndex + 3);
      } else {
        rawIndex += ESCAPE_LENGTH[nextRawCharacter] ?? 1;
      }
    }
  }
  const trailingWhitespaces = templateStart === template.length;
  if (!trailingWhitespaces) {
    nextTokens.push(template.slice(templateStart));
  }
  return { nextTokens, leadingWhitespaces, trailingWhitespaces };
};
var DELIMITERS = new Set([
  " ",
  "\t",
  "\r",
  `
`,
]);
var ESCAPE_LENGTH = { x: 3, u: 5 };
var concatTokens = (tokens, nextTokens, isSeparated) =>
  isSeparated || tokens.length === 0 || nextTokens.length === 0
    ? [...tokens, ...nextTokens]
    : [...tokens.slice(0, -1), `${tokens.at(-1)}${nextTokens[0]}`, ...nextTokens.slice(1)];
var parseExpression = (expression) => {
  const typeOfExpression = typeof expression;
  if (typeOfExpression === "string") {
    return expression;
  }
  if (typeOfExpression === "number") {
    return String(expression);
  }
  if (isPlainObject2(expression) && ("stdout" in expression || "isMaxBuffer" in expression)) {
    return getSubprocessResult(expression);
  }
  if (
    expression instanceof ChildProcess ||
    Object.prototype.toString.call(expression) === "[object Promise]"
  ) {
    throw new TypeError(
      "Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}.",
    );
  }
  throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
};
var getSubprocessResult = ({ stdout }) => {
  if (typeof stdout === "string") {
    return stdout;
  }
  if (isUint8Array(stdout)) {
    return uint8ArrayToString(stdout);
  }
  if (stdout === undefined) {
    throw new TypeError(
      `Missing result.stdout in template expression. This is probably due to the previous subprocess' "stdout" option.`,
    );
  }
  throw new TypeError(`Unexpected "${typeof stdout}" stdout in template expression`);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/main-sync.js
import { spawnSync } from "node:child_process";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/specific.js
import { debuglog } from "node:util";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/utils/standard-stream.js
import process3 from "node:process";
var isStandardStream = (stream) => STANDARD_STREAMS.includes(stream);
var STANDARD_STREAMS = [process3.stdin, process3.stdout, process3.stderr];
var STANDARD_STREAMS_ALIASES = ["stdin", "stdout", "stderr"];
var getStreamName = (fdNumber) => STANDARD_STREAMS_ALIASES[fdNumber] ?? `stdio[${fdNumber}]`;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/specific.js
var normalizeFdSpecificOptions = (options) => {
  const optionsCopy = { ...options };
  for (const optionName of FD_SPECIFIC_OPTIONS) {
    optionsCopy[optionName] = normalizeFdSpecificOption(options, optionName);
  }
  return optionsCopy;
};
var normalizeFdSpecificOption = (options, optionName) => {
  const optionBaseArray = Array.from({ length: getStdioLength(options) + 1 });
  const optionArray = normalizeFdSpecificValue(options[optionName], optionBaseArray, optionName);
  return addDefaultValue(optionArray, optionName);
};
var getStdioLength = ({ stdio }) =>
  Array.isArray(stdio)
    ? Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length)
    : STANDARD_STREAMS_ALIASES.length;
var normalizeFdSpecificValue = (optionValue, optionArray, optionName) =>
  isPlainObject2(optionValue)
    ? normalizeOptionObject(optionValue, optionArray, optionName)
    : optionArray.fill(optionValue);
var normalizeOptionObject = (optionValue, optionArray, optionName) => {
  for (const fdName of Object.keys(optionValue).sort(compareFdName)) {
    for (const fdNumber of parseFdName(fdName, optionName, optionArray)) {
      optionArray[fdNumber] = optionValue[fdName];
    }
  }
  return optionArray;
};
var compareFdName = (fdNameA, fdNameB) =>
  getFdNameOrder(fdNameA) < getFdNameOrder(fdNameB) ? 1 : -1;
var getFdNameOrder = (fdName) => {
  if (fdName === "stdout" || fdName === "stderr") {
    return 0;
  }
  return fdName === "all" ? 2 : 1;
};
var parseFdName = (fdName, optionName, optionArray) => {
  if (fdName === "ipc") {
    return [optionArray.length - 1];
  }
  const fdNumber = parseFd(fdName);
  if (fdNumber === undefined || fdNumber === 0) {
    throw new TypeError(`"${optionName}.${fdName}" is invalid.
It must be "${optionName}.stdout", "${optionName}.stderr", "${optionName}.all", "${optionName}.ipc", or "${optionName}.fd3", "${optionName}.fd4" (and so on).`);
  }
  if (fdNumber >= optionArray.length) {
    throw new TypeError(`"${optionName}.${fdName}" is invalid: that file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
  }
  return fdNumber === "all" ? [1, 2] : [fdNumber];
};
var parseFd = (fdName) => {
  if (fdName === "all") {
    return fdName;
  }
  if (STANDARD_STREAMS_ALIASES.includes(fdName)) {
    return STANDARD_STREAMS_ALIASES.indexOf(fdName);
  }
  const regexpResult = FD_REGEXP.exec(fdName);
  if (regexpResult !== null) {
    return Number(regexpResult[1]);
  }
};
var FD_REGEXP = /^fd(\d+)$/;
var addDefaultValue = (optionArray, optionName) =>
  optionArray.map((optionValue) =>
    optionValue === undefined ? DEFAULT_OPTIONS[optionName] : optionValue,
  );
var verboseDefault = debuglog("execa").enabled ? "full" : "none";
var DEFAULT_OPTIONS = {
  lines: false,
  buffer: true,
  maxBuffer: 1000 * 1000 * 100,
  verbose: verboseDefault,
  stripFinalNewline: true,
};
var FD_SPECIFIC_OPTIONS = ["lines", "buffer", "maxBuffer", "verbose", "stripFinalNewline"];
var getFdSpecificValue = (optionArray, fdNumber) =>
  fdNumber === "ipc" ? optionArray.at(-1) : optionArray[fdNumber];

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/values.js
var isVerbose = ({ verbose }, fdNumber) => getFdVerbose(verbose, fdNumber) !== "none";
var isFullVerbose = ({ verbose }, fdNumber) =>
  !["none", "short"].includes(getFdVerbose(verbose, fdNumber));
var getVerboseFunction = ({ verbose }, fdNumber) => {
  const fdVerbose = getFdVerbose(verbose, fdNumber);
  return isVerboseFunction(fdVerbose) ? fdVerbose : undefined;
};
var getFdVerbose = (verbose, fdNumber) =>
  fdNumber === undefined ? getFdGenericVerbose(verbose) : getFdSpecificValue(verbose, fdNumber);
var getFdGenericVerbose = (verbose) =>
  verbose.find((fdVerbose) => isVerboseFunction(fdVerbose)) ??
  VERBOSE_VALUES.findLast((fdVerbose) => verbose.includes(fdVerbose));
var isVerboseFunction = (fdVerbose) => typeof fdVerbose === "function";
var VERBOSE_VALUES = ["none", "short", "full"];

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/log.js
import { inspect } from "node:util";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/escape.js
import { platform } from "node:process";
import { stripVTControlCharacters } from "node:util";
var joinCommand = (filePath, rawArguments) => {
  const fileAndArguments = [filePath, ...rawArguments];
  const command = fileAndArguments.join(" ");
  const escapedCommand = fileAndArguments
    .map((fileAndArgument) => quoteString(escapeControlCharacters(fileAndArgument)))
    .join(" ");
  return { command, escapedCommand };
};
var escapeLines = (lines) =>
  stripVTControlCharacters(lines)
    .split(
      `
`,
    )
    .map((line) => escapeControlCharacters(line)).join(`
`);
var escapeControlCharacters = (line) =>
  line.replaceAll(SPECIAL_CHAR_REGEXP, (character) => escapeControlCharacter(character));
var escapeControlCharacter = (character) => {
  const commonEscape = COMMON_ESCAPES[character];
  if (commonEscape !== undefined) {
    return commonEscape;
  }
  const codepoint = character.codePointAt(0);
  const codepointHex = codepoint.toString(16);
  return codepoint <= ASTRAL_START ? `\\u${codepointHex.padStart(4, "0")}` : `\\U${codepointHex}`;
};
var getSpecialCharRegExp = () => {
  try {
    return new RegExp("\\p{Separator}|\\p{Other}", "gu");
  } catch {
    return /[\s\u0000-\u001F\u007F-\u009F\u00AD]/g;
  }
};
var SPECIAL_CHAR_REGEXP = getSpecialCharRegExp();
var COMMON_ESCAPES = {
  " ": " ",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "\t": "\\t",
};
var ASTRAL_START = 65535;
var quoteString = (escapedArgument) => {
  if (NO_ESCAPE_REGEXP.test(escapedArgument)) {
    return escapedArgument;
  }
  return platform === "win32"
    ? `"${escapedArgument.replaceAll('"', '""')}"`
    : `'${escapedArgument.replaceAll("'", "'\\''")}'`;
};
var NO_ESCAPE_REGEXP = /^[\w./-]+$/;

// ../../../node_modules/.bun/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js
import process4 from "node:process";
function isUnicodeSupported() {
  const { env } = process4;
  const { TERM, TERM_PROGRAM } = env;
  if (process4.platform !== "win32") {
    return TERM !== "linux";
  }
  return (
    Boolean(env.WT_SESSION) ||
    Boolean(env.TERMINUS_SUBLIME) ||
    env.ConEmuTask === "{cmd::Cmder}" ||
    TERM_PROGRAM === "Terminus-Sublime" ||
    TERM_PROGRAM === "vscode" ||
    TERM === "xterm-256color" ||
    TERM === "alacritty" ||
    TERM === "rxvt-unicode" ||
    TERM === "rxvt-unicode-256color" ||
    env.TERMINAL_EMULATOR === "JetBrains-JediTerm"
  );
}

// ../../../node_modules/.bun/figures@6.1.0/node_modules/figures/index.js
var common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "█",
  squareDarkShade: "▓",
  squareMediumShade: "▒",
  squareLightShade: "░",
  squareTop: "▀",
  squareBottom: "▄",
  squareLeft: "▌",
  squareRight: "▐",
  squareCenter: "■",
  bullet: "●",
  dot: "․",
  ellipsis: "…",
  pointerSmall: "›",
  triangleUp: "▲",
  triangleUpSmall: "▴",
  triangleDown: "▼",
  triangleDownSmall: "▾",
  triangleLeftSmall: "◂",
  triangleRightSmall: "▸",
  home: "⌂",
  heart: "♥",
  musicNote: "♪",
  musicNoteBeamed: "♫",
  arrowUp: "↑",
  arrowDown: "↓",
  arrowLeft: "←",
  arrowRight: "→",
  arrowLeftRight: "↔",
  arrowUpDown: "↕",
  almostEqual: "≈",
  notEqual: "≠",
  lessOrEqual: "≤",
  greaterOrEqual: "≥",
  identical: "≡",
  infinity: "∞",
  subscriptZero: "₀",
  subscriptOne: "₁",
  subscriptTwo: "₂",
  subscriptThree: "₃",
  subscriptFour: "₄",
  subscriptFive: "₅",
  subscriptSix: "₆",
  subscriptSeven: "₇",
  subscriptEight: "₈",
  subscriptNine: "₉",
  oneHalf: "½",
  oneThird: "⅓",
  oneQuarter: "¼",
  oneFifth: "⅕",
  oneSixth: "⅙",
  oneEighth: "⅛",
  twoThirds: "⅔",
  twoFifths: "⅖",
  threeQuarters: "¾",
  threeFifths: "⅗",
  threeEighths: "⅜",
  fourFifths: "⅘",
  fiveSixths: "⅚",
  fiveEighths: "⅝",
  sevenEighths: "⅞",
  line: "─",
  lineBold: "━",
  lineDouble: "═",
  lineDashed0: "┄",
  lineDashed1: "┅",
  lineDashed2: "┈",
  lineDashed3: "┉",
  lineDashed4: "╌",
  lineDashed5: "╍",
  lineDashed6: "╴",
  lineDashed7: "╶",
  lineDashed8: "╸",
  lineDashed9: "╺",
  lineDashed10: "╼",
  lineDashed11: "╾",
  lineDashed12: "−",
  lineDashed13: "–",
  lineDashed14: "‐",
  lineDashed15: "⁃",
  lineVertical: "│",
  lineVerticalBold: "┃",
  lineVerticalDouble: "║",
  lineVerticalDashed0: "┆",
  lineVerticalDashed1: "┇",
  lineVerticalDashed2: "┊",
  lineVerticalDashed3: "┋",
  lineVerticalDashed4: "╎",
  lineVerticalDashed5: "╏",
  lineVerticalDashed6: "╵",
  lineVerticalDashed7: "╷",
  lineVerticalDashed8: "╹",
  lineVerticalDashed9: "╻",
  lineVerticalDashed10: "╽",
  lineVerticalDashed11: "╿",
  lineDownLeft: "┐",
  lineDownLeftArc: "╮",
  lineDownBoldLeftBold: "┓",
  lineDownBoldLeft: "┒",
  lineDownLeftBold: "┑",
  lineDownDoubleLeftDouble: "╗",
  lineDownDoubleLeft: "╖",
  lineDownLeftDouble: "╕",
  lineDownRight: "┌",
  lineDownRightArc: "╭",
  lineDownBoldRightBold: "┏",
  lineDownBoldRight: "┎",
  lineDownRightBold: "┍",
  lineDownDoubleRightDouble: "╔",
  lineDownDoubleRight: "╓",
  lineDownRightDouble: "╒",
  lineUpLeft: "┘",
  lineUpLeftArc: "╯",
  lineUpBoldLeftBold: "┛",
  lineUpBoldLeft: "┚",
  lineUpLeftBold: "┙",
  lineUpDoubleLeftDouble: "╝",
  lineUpDoubleLeft: "╜",
  lineUpLeftDouble: "╛",
  lineUpRight: "└",
  lineUpRightArc: "╰",
  lineUpBoldRightBold: "┗",
  lineUpBoldRight: "┖",
  lineUpRightBold: "┕",
  lineUpDoubleRightDouble: "╚",
  lineUpDoubleRight: "╙",
  lineUpRightDouble: "╘",
  lineUpDownLeft: "┤",
  lineUpBoldDownBoldLeftBold: "┫",
  lineUpBoldDownBoldLeft: "┨",
  lineUpDownLeftBold: "┥",
  lineUpBoldDownLeftBold: "┩",
  lineUpDownBoldLeftBold: "┪",
  lineUpDownBoldLeft: "┧",
  lineUpBoldDownLeft: "┦",
  lineUpDoubleDownDoubleLeftDouble: "╣",
  lineUpDoubleDownDoubleLeft: "╢",
  lineUpDownLeftDouble: "╡",
  lineUpDownRight: "├",
  lineUpBoldDownBoldRightBold: "┣",
  lineUpBoldDownBoldRight: "┠",
  lineUpDownRightBold: "┝",
  lineUpBoldDownRightBold: "┡",
  lineUpDownBoldRightBold: "┢",
  lineUpDownBoldRight: "┟",
  lineUpBoldDownRight: "┞",
  lineUpDoubleDownDoubleRightDouble: "╠",
  lineUpDoubleDownDoubleRight: "╟",
  lineUpDownRightDouble: "╞",
  lineDownLeftRight: "┬",
  lineDownBoldLeftBoldRightBold: "┳",
  lineDownLeftBoldRightBold: "┯",
  lineDownBoldLeftRight: "┰",
  lineDownBoldLeftBoldRight: "┱",
  lineDownBoldLeftRightBold: "┲",
  lineDownLeftRightBold: "┮",
  lineDownLeftBoldRight: "┭",
  lineDownDoubleLeftDoubleRightDouble: "╦",
  lineDownDoubleLeftRight: "╥",
  lineDownLeftDoubleRightDouble: "╤",
  lineUpLeftRight: "┴",
  lineUpBoldLeftBoldRightBold: "┻",
  lineUpLeftBoldRightBold: "┷",
  lineUpBoldLeftRight: "┸",
  lineUpBoldLeftBoldRight: "┹",
  lineUpBoldLeftRightBold: "┺",
  lineUpLeftRightBold: "┶",
  lineUpLeftBoldRight: "┵",
  lineUpDoubleLeftDoubleRightDouble: "╩",
  lineUpDoubleLeftRight: "╨",
  lineUpLeftDoubleRightDouble: "╧",
  lineUpDownLeftRight: "┼",
  lineUpBoldDownBoldLeftBoldRightBold: "╋",
  lineUpDownBoldLeftBoldRightBold: "╈",
  lineUpBoldDownLeftBoldRightBold: "╇",
  lineUpBoldDownBoldLeftRightBold: "╊",
  lineUpBoldDownBoldLeftBoldRight: "╉",
  lineUpBoldDownLeftRight: "╀",
  lineUpDownBoldLeftRight: "╁",
  lineUpDownLeftBoldRight: "┽",
  lineUpDownLeftRightBold: "┾",
  lineUpBoldDownBoldLeftRight: "╂",
  lineUpDownLeftBoldRightBold: "┿",
  lineUpBoldDownLeftBoldRight: "╃",
  lineUpBoldDownLeftRightBold: "╄",
  lineUpDownBoldLeftBoldRight: "╅",
  lineUpDownBoldLeftRightBold: "╆",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
  lineUpDoubleDownDoubleLeftRight: "╫",
  lineUpDownLeftDoubleRightDouble: "╪",
  lineCross: "╳",
  lineBackslash: "╲",
  lineSlash: "╱",
};
var specialMainSymbols = {
  tick: "✔",
  info: "ℹ",
  warning: "⚠",
  cross: "✘",
  squareSmall: "◻",
  squareSmallFilled: "◼",
  circle: "◯",
  circleFilled: "◉",
  circleDotted: "◌",
  circleDouble: "◎",
  circleCircle: "ⓞ",
  circleCross: "ⓧ",
  circlePipe: "Ⓘ",
  radioOn: "◉",
  radioOff: "◯",
  checkboxOn: "☒",
  checkboxOff: "☐",
  checkboxCircleOn: "ⓧ",
  checkboxCircleOff: "Ⓘ",
  pointer: "❯",
  triangleUpOutline: "△",
  triangleLeft: "◀",
  triangleRight: "▶",
  lozenge: "◆",
  lozengeOutline: "◇",
  hamburger: "☰",
  smiley: "㋡",
  mustache: "෴",
  star: "★",
  play: "▶",
  nodejs: "⬢",
  oneSeventh: "⅐",
  oneNinth: "⅑",
  oneTenth: "⅒",
};
var specialFallbackSymbols = {
  tick: "√",
  info: "i",
  warning: "‼",
  cross: "×",
  squareSmall: "□",
  squareSmallFilled: "■",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(○)",
  circleCross: "(×)",
  circlePipe: "(│)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[×]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(×)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "∆",
  triangleLeft: "◄",
  triangleRight: "►",
  lozenge: "♦",
  lozengeOutline: "◊",
  hamburger: "≡",
  smiley: "☺",
  mustache: "┌─┐",
  star: "✶",
  play: "►",
  nodejs: "♦",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10",
};
var mainSymbols = { ...common, ...specialMainSymbols };
var fallbackSymbols = { ...common, ...specialFallbackSymbols };
var shouldUseMain = isUnicodeSupported();
var figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var figures_default = figures;
var replacements = Object.entries(specialMainSymbols);

// ../../../node_modules/.bun/yoctocolors@2.1.2/node_modules/yoctocolors/base.js
import tty from "node:tty";
var hasColors = tty?.WriteStream?.prototype?.hasColors?.() ?? false;
var format = (open, close) => {
  if (!hasColors) {
    return (input) => input;
  }
  const openCode = `\x1B[${open}m`;
  const closeCode = `\x1B[${close}m`;
  return (input) => {
    const string = input + "";
    let index = string.indexOf(closeCode);
    if (index === -1) {
      return openCode + string + closeCode;
    }
    let result = openCode;
    let lastIndex = 0;
    const reopenOnNestedClose = close === 22;
    const replaceCode = (reopenOnNestedClose ? closeCode : "") + openCode;
    while (index !== -1) {
      result += string.slice(lastIndex, index) + replaceCode;
      lastIndex = index + closeCode.length;
      index = string.indexOf(closeCode, lastIndex);
    }
    result += string.slice(lastIndex) + closeCode;
    return result;
  };
};
var reset = format(0, 0);
var bold = format(1, 22);
var dim = format(2, 22);
var italic = format(3, 23);
var underline = format(4, 24);
var overline = format(53, 55);
var inverse = format(7, 27);
var hidden = format(8, 28);
var strikethrough = format(9, 29);
var black = format(30, 39);
var red = format(31, 39);
var green = format(32, 39);
var yellow = format(33, 39);
var blue = format(34, 39);
var magenta = format(35, 39);
var cyan = format(36, 39);
var white = format(37, 39);
var gray = format(90, 39);
var bgBlack = format(40, 49);
var bgRed = format(41, 49);
var bgGreen = format(42, 49);
var bgYellow = format(43, 49);
var bgBlue = format(44, 49);
var bgMagenta = format(45, 49);
var bgCyan = format(46, 49);
var bgWhite = format(47, 49);
var bgGray = format(100, 49);
var redBright = format(91, 39);
var greenBright = format(92, 39);
var yellowBright = format(93, 39);
var blueBright = format(94, 39);
var magentaBright = format(95, 39);
var cyanBright = format(96, 39);
var whiteBright = format(97, 39);
var bgRedBright = format(101, 49);
var bgGreenBright = format(102, 49);
var bgYellowBright = format(103, 49);
var bgBlueBright = format(104, 49);
var bgMagentaBright = format(105, 49);
var bgCyanBright = format(106, 49);
var bgWhiteBright = format(107, 49);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/default.js
var defaultVerboseFunction = ({
  type,
  message,
  timestamp,
  piped,
  commandId,
  result: { failed = false } = {},
  options: { reject = true },
}) => {
  const timestampString = serializeTimestamp(timestamp);
  const icon = ICONS[type]({ failed, reject, piped });
  const color = COLORS[type]({ reject });
  return `${gray(`[${timestampString}]`)} ${gray(`[${commandId}]`)} ${color(icon)} ${color(message)}`;
};
var serializeTimestamp = (timestamp) =>
  `${padField(timestamp.getHours(), 2)}:${padField(timestamp.getMinutes(), 2)}:${padField(timestamp.getSeconds(), 2)}.${padField(timestamp.getMilliseconds(), 3)}`;
var padField = (field, padding) => String(field).padStart(padding, "0");
var getFinalIcon = ({ failed, reject }) => {
  if (!failed) {
    return figures_default.tick;
  }
  return reject ? figures_default.cross : figures_default.warning;
};
var ICONS = {
  command: ({ piped }) => (piped ? "|" : "$"),
  output: () => " ",
  ipc: () => "*",
  error: getFinalIcon,
  duration: getFinalIcon,
};
var identity2 = (string) => string;
var COLORS = {
  command: () => bold,
  output: () => identity2,
  ipc: () => identity2,
  error: ({ reject }) => (reject ? redBright : yellowBright),
  duration: () => gray,
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/custom.js
var applyVerboseOnLines = (printedLines, verboseInfo, fdNumber) => {
  const verboseFunction = getVerboseFunction(verboseInfo, fdNumber);
  return printedLines
    .map(({ verboseLine, verboseObject }) =>
      applyVerboseFunction(verboseLine, verboseObject, verboseFunction),
    )
    .filter((printedLine) => printedLine !== undefined)
    .map((printedLine) => appendNewline(printedLine))
    .join("");
};
var applyVerboseFunction = (verboseLine, verboseObject, verboseFunction) => {
  if (verboseFunction === undefined) {
    return verboseLine;
  }
  const printedLine = verboseFunction(verboseLine, verboseObject);
  if (typeof printedLine === "string") {
    return printedLine;
  }
};
var appendNewline = (printedLine) =>
  printedLine.endsWith(`
`)
    ? printedLine
    : `${printedLine}
`;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/log.js
var verboseLog = ({ type, verboseMessage, fdNumber, verboseInfo, result }) => {
  const verboseObject = getVerboseObject({ type, result, verboseInfo });
  const printedLines = getPrintedLines(verboseMessage, verboseObject);
  const finalLines = applyVerboseOnLines(printedLines, verboseInfo, fdNumber);
  if (finalLines !== "") {
    console.warn(finalLines.slice(0, -1));
  }
};
var getVerboseObject = ({
  type,
  result,
  verboseInfo: {
    escapedCommand,
    commandId,
    rawOptions: { piped = false, ...options },
  },
}) => ({
  type,
  escapedCommand,
  commandId: `${commandId}`,
  timestamp: new Date(),
  piped,
  result,
  options,
});
var getPrintedLines = (verboseMessage, verboseObject) =>
  verboseMessage
    .split(
      `
`,
    )
    .map((message) => getPrintedLine({ ...verboseObject, message }));
var getPrintedLine = (verboseObject) => {
  const verboseLine = defaultVerboseFunction(verboseObject);
  return { verboseLine, verboseObject };
};
var serializeVerboseMessage = (message) => {
  const messageString = typeof message === "string" ? message : inspect(message);
  const escapedMessage = escapeLines(messageString);
  return escapedMessage.replaceAll("\t", " ".repeat(TAB_SIZE));
};
var TAB_SIZE = 2;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/start.js
var logCommand = (escapedCommand, verboseInfo) => {
  if (!isVerbose(verboseInfo)) {
    return;
  }
  verboseLog({
    type: "command",
    verboseMessage: escapedCommand,
    verboseInfo,
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/info.js
var getVerboseInfo = (verbose, escapedCommand, rawOptions) => {
  validateVerbose(verbose);
  const commandId = getCommandId(verbose);
  return {
    verbose,
    escapedCommand,
    commandId,
    rawOptions,
  };
};
var getCommandId = (verbose) => (isVerbose({ verbose }) ? COMMAND_ID++ : undefined);
var COMMAND_ID = 0n;
var validateVerbose = (verbose) => {
  for (const fdVerbose of verbose) {
    if (fdVerbose === false) {
      throw new TypeError(`The "verbose: false" option was renamed to "verbose: 'none'".`);
    }
    if (fdVerbose === true) {
      throw new TypeError(`The "verbose: true" option was renamed to "verbose: 'short'".`);
    }
    if (!VERBOSE_VALUES.includes(fdVerbose) && !isVerboseFunction(fdVerbose)) {
      const allowedValues = VERBOSE_VALUES.map((allowedValue) => `'${allowedValue}'`).join(", ");
      throw new TypeError(
        `The "verbose" option must not be ${fdVerbose}. Allowed values are: ${allowedValues} or a function.`,
      );
    }
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/duration.js
import { hrtime } from "node:process";
var getStartTime = () => hrtime.bigint();
var getDurationMs = (startTime) => Number(hrtime.bigint() - startTime) / 1e6;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/command.js
var handleCommand = (filePath, rawArguments, rawOptions) => {
  const startTime = getStartTime();
  const { command, escapedCommand } = joinCommand(filePath, rawArguments);
  const verbose = normalizeFdSpecificOption(rawOptions, "verbose");
  const verboseInfo = getVerboseInfo(verbose, escapedCommand, { ...rawOptions });
  logCommand(escapedCommand, verboseInfo);
  return {
    command,
    escapedCommand,
    startTime,
    verboseInfo,
  };
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/options.js
var import_cross_spawn = __toESM(require_cross_spawn(), 1);
import path5 from "node:path";
import process7 from "node:process";

// ../../../node_modules/.bun/npm-run-path@6.0.0/node_modules/npm-run-path/index.js
import process5 from "node:process";
import path2 from "node:path";

// ../../../node_modules/.bun/path-key@4.0.0/node_modules/path-key/index.js
function pathKey(options = {}) {
  const { env = process.env, platform = process.platform } = options;
  if (platform !== "win32") {
    return "PATH";
  }
  return (
    Object.keys(env)
      .reverse()
      .find((key) => key.toUpperCase() === "PATH") || "Path"
  );
}

// ../../../node_modules/.bun/unicorn-magic@0.3.0/node_modules/unicorn-magic/node.js
import { promisify } from "node:util";
import {
  execFile as execFileCallback,
  execFileSync as execFileSyncOriginal,
} from "node:child_process";
import path from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var execFileOriginal = promisify(execFileCallback);
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? fileURLToPath2(urlOrPath) : urlOrPath;
}
function traversePathUp(startPath) {
  return {
    *[Symbol.iterator]() {
      let currentPath = path.resolve(toPath(startPath));
      let previousPath;
      while (previousPath !== currentPath) {
        yield currentPath;
        previousPath = currentPath;
        currentPath = path.resolve(currentPath, "..");
      }
    },
  };
}
var TEN_MEGABYTES_IN_BYTES = 10 * 1024 * 1024;

// ../../../node_modules/.bun/npm-run-path@6.0.0/node_modules/npm-run-path/index.js
var npmRunPath = ({
  cwd = process5.cwd(),
  path: pathOption = process5.env[pathKey()],
  preferLocal = true,
  execPath = process5.execPath,
  addExecPath = true,
} = {}) => {
  const cwdPath = path2.resolve(toPath(cwd));
  const result = [];
  const pathParts = pathOption.split(path2.delimiter);
  if (preferLocal) {
    applyPreferLocal(result, pathParts, cwdPath);
  }
  if (addExecPath) {
    applyExecPath(result, pathParts, execPath, cwdPath);
  }
  return pathOption === "" || pathOption === path2.delimiter
    ? `${result.join(path2.delimiter)}${pathOption}`
    : [...result, pathOption].join(path2.delimiter);
};
var applyPreferLocal = (result, pathParts, cwdPath) => {
  for (const directory of traversePathUp(cwdPath)) {
    const pathPart = path2.join(directory, "node_modules/.bin");
    if (!pathParts.includes(pathPart)) {
      result.push(pathPart);
    }
  }
};
var applyExecPath = (result, pathParts, execPath, cwdPath) => {
  const pathPart = path2.resolve(cwdPath, toPath(execPath), "..");
  if (!pathParts.includes(pathPart)) {
    result.push(pathPart);
  }
};
var npmRunPathEnv = ({ env = process5.env, ...options } = {}) => {
  env = { ...env };
  const pathName = pathKey({ env });
  options.path = env[pathName];
  env[pathName] = npmRunPath(options);
  return env;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/kill.js
import { setTimeout } from "node:timers/promises";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/final-error.js
var getFinalError = (originalError, message, isSync) => {
  const ErrorClass = isSync ? ExecaSyncError : ExecaError;
  const options = originalError instanceof DiscardedError ? {} : { cause: originalError };
  return new ErrorClass(message, options);
};

class DiscardedError extends Error {}
var setErrorName = (ErrorClass, value) => {
  Object.defineProperty(ErrorClass.prototype, "name", {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(ErrorClass.prototype, execaErrorSymbol, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false,
  });
};
var isExecaError = (error) => isErrorInstance(error) && execaErrorSymbol in error;
var execaErrorSymbol = Symbol("isExecaError");
var isErrorInstance = (value) => Object.prototype.toString.call(value) === "[object Error]";

class ExecaError extends Error {}
setErrorName(ExecaError, ExecaError.name);

class ExecaSyncError extends Error {}
setErrorName(ExecaSyncError, ExecaSyncError.name);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/signal.js
import { constants as constants3 } from "node:os";

// ../../../node_modules/.bun/human-signals@8.0.1/node_modules/human-signals/build/src/main.js
import { constants as constants2 } from "node:os";

// ../../../node_modules/.bun/human-signals@8.0.1/node_modules/human-signals/build/src/realtime.js
var getRealtimeSignals = () => {
  const length = SIGRTMAX - SIGRTMIN + 1;
  return Array.from({ length }, getRealtimeSignal);
};
var getRealtimeSignal = (value, index) => ({
  name: `SIGRT${index + 1}`,
  number: SIGRTMIN + index,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix",
});
var SIGRTMIN = 34;
var SIGRTMAX = 64;

// ../../../node_modules/.bun/human-signals@8.0.1/node_modules/human-signals/build/src/signals.js
import { constants } from "node:os";

// ../../../node_modules/.bun/human-signals@8.0.1/node_modules/human-signals/build/src/core.js
var SIGNALS = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix",
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi",
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix",
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi",
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix",
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi",
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd",
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd",
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other",
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi",
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: true,
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix",
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi",
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix",
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix",
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix",
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi",
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other",
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix",
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other",
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: true,
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: true,
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix",
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix",
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other",
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix",
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd",
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd",
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd",
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd",
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd",
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd",
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other",
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other",
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other",
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv",
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other",
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other",
  },
];

// ../../../node_modules/.bun/human-signals@8.0.1/node_modules/human-signals/build/src/signals.js
var getSignals = () => {
  const realtimeSignals = getRealtimeSignals();
  const signals = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals;
};
var normalizeSignal = ({
  name,
  number: defaultNumber,
  description,
  action,
  forced = false,
  standard,
}) => {
  const {
    signals: { [name]: constantSignal },
  } = constants;
  const supported = constantSignal !== undefined;
  const number = supported ? constantSignal : defaultNumber;
  return { name, number, description, supported, action, forced, standard };
};

// ../../../node_modules/.bun/human-signals@8.0.1/node_modules/human-signals/build/src/main.js
var getSignalsByName = () => {
  const signals = getSignals();
  return Object.fromEntries(signals.map(getSignalByName));
};
var getSignalByName = ({ name, number, description, supported, action, forced, standard }) => [
  name,
  { name, number, description, supported, action, forced, standard },
];
var signalsByName = getSignalsByName();
var getSignalsByNumber = () => {
  const signals = getSignals();
  const length = SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
  return Object.assign({}, ...signalsA);
};
var getSignalByNumber = (number, signals) => {
  const signal = findSignalByNumber(number, signals);
  if (signal === undefined) {
    return {};
  }
  const { name, description, supported, action, forced, standard } = signal;
  return {
    [number]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard,
    },
  };
};
var findSignalByNumber = (number, signals) => {
  const signal = signals.find(({ name }) => constants2.signals[name] === number);
  if (signal !== undefined) {
    return signal;
  }
  return signals.find((signalA) => signalA.number === number);
};
var signalsByNumber = getSignalsByNumber();

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/signal.js
var normalizeKillSignal = (killSignal) => {
  const optionName = "option `killSignal`";
  if (killSignal === 0) {
    throw new TypeError(`Invalid ${optionName}: 0 cannot be used.`);
  }
  return normalizeSignal2(killSignal, optionName);
};
var normalizeSignalArgument = (signal) =>
  signal === 0 ? signal : normalizeSignal2(signal, "`subprocess.kill()`'s argument");
var normalizeSignal2 = (signalNameOrInteger, optionName) => {
  if (Number.isInteger(signalNameOrInteger)) {
    return normalizeSignalInteger(signalNameOrInteger, optionName);
  }
  if (typeof signalNameOrInteger === "string") {
    return normalizeSignalName(signalNameOrInteger, optionName);
  }
  throw new TypeError(`Invalid ${optionName} ${String(signalNameOrInteger)}: it must be a string or an integer.
${getAvailableSignals()}`);
};
var normalizeSignalInteger = (signalInteger, optionName) => {
  if (signalsIntegerToName.has(signalInteger)) {
    return signalsIntegerToName.get(signalInteger);
  }
  throw new TypeError(`Invalid ${optionName} ${signalInteger}: this signal integer does not exist.
${getAvailableSignals()}`);
};
var getSignalsIntegerToName = () =>
  new Map(
    Object.entries(constants3.signals)
      .reverse()
      .map(([signalName, signalInteger]) => [signalInteger, signalName]),
  );
var signalsIntegerToName = getSignalsIntegerToName();
var normalizeSignalName = (signalName, optionName) => {
  if (signalName in constants3.signals) {
    return signalName;
  }
  if (signalName.toUpperCase() in constants3.signals) {
    throw new TypeError(
      `Invalid ${optionName} '${signalName}': please rename it to '${signalName.toUpperCase()}'.`,
    );
  }
  throw new TypeError(`Invalid ${optionName} '${signalName}': this signal name does not exist.
${getAvailableSignals()}`);
};
var getAvailableSignals = () => `Available signal names: ${getAvailableSignalNames()}.
Available signal numbers: ${getAvailableSignalIntegers()}.`;
var getAvailableSignalNames = () =>
  Object.keys(constants3.signals)
    .sort()
    .map((signalName) => `'${signalName}'`)
    .join(", ");
var getAvailableSignalIntegers = () =>
  [
    ...new Set(
      Object.values(constants3.signals).sort(
        (signalInteger, signalIntegerTwo) => signalInteger - signalIntegerTwo,
      ),
    ),
  ].join(", ");
var getSignalDescription = (signal) => signalsByName[signal].description;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/kill.js
var normalizeForceKillAfterDelay = (forceKillAfterDelay) => {
  if (forceKillAfterDelay === false) {
    return forceKillAfterDelay;
  }
  if (forceKillAfterDelay === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT;
  }
  if (!Number.isFinite(forceKillAfterDelay) || forceKillAfterDelay < 0) {
    throw new TypeError(
      `Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${forceKillAfterDelay}\` (${typeof forceKillAfterDelay})`,
    );
  }
  return forceKillAfterDelay;
};
var DEFAULT_FORCE_KILL_TIMEOUT = 1000 * 5;
var subprocessKill = (
  { kill, options: { forceKillAfterDelay, killSignal }, onInternalError, context, controller },
  signalOrError,
  errorArgument,
) => {
  const { signal, error } = parseKillArguments(signalOrError, errorArgument, killSignal);
  emitKillError(error, onInternalError);
  const killResult = kill(signal);
  setKillTimeout({
    kill,
    signal,
    forceKillAfterDelay,
    killSignal,
    killResult,
    context,
    controller,
  });
  return killResult;
};
var parseKillArguments = (signalOrError, errorArgument, killSignal) => {
  const [signal = killSignal, error] = isErrorInstance(signalOrError)
    ? [undefined, signalOrError]
    : [signalOrError, errorArgument];
  if (typeof signal !== "string" && !Number.isInteger(signal)) {
    throw new TypeError(
      `The first argument must be an error instance or a signal name string/integer: ${String(signal)}`,
    );
  }
  if (error !== undefined && !isErrorInstance(error)) {
    throw new TypeError(
      `The second argument is optional. If specified, it must be an error instance: ${error}`,
    );
  }
  return { signal: normalizeSignalArgument(signal), error };
};
var emitKillError = (error, onInternalError) => {
  if (error !== undefined) {
    onInternalError.reject(error);
  }
};
var setKillTimeout = async ({
  kill,
  signal,
  forceKillAfterDelay,
  killSignal,
  killResult,
  context,
  controller,
}) => {
  if (signal === killSignal && killResult) {
    killOnTimeout({
      kill,
      forceKillAfterDelay,
      context,
      controllerSignal: controller.signal,
    });
  }
};
var killOnTimeout = async ({ kill, forceKillAfterDelay, context, controllerSignal }) => {
  if (forceKillAfterDelay === false) {
    return;
  }
  try {
    await setTimeout(forceKillAfterDelay, undefined, { signal: controllerSignal });
    if (kill("SIGKILL")) {
      context.isForcefullyTerminated ??= true;
    }
  } catch {}
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/utils/abort-signal.js
import { once } from "node:events";
var onAbortedSignal = async (mainSignal, stopSignal) => {
  if (!mainSignal.aborted) {
    await once(mainSignal, "abort", { signal: stopSignal });
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/cancel.js
var validateCancelSignal = ({ cancelSignal }) => {
  if (
    cancelSignal !== undefined &&
    Object.prototype.toString.call(cancelSignal) !== "[object AbortSignal]"
  ) {
    throw new Error(`The \`cancelSignal\` option must be an AbortSignal: ${String(cancelSignal)}`);
  }
};
var throwOnCancel = ({ subprocess, cancelSignal, gracefulCancel, context, controller }) =>
  cancelSignal === undefined || gracefulCancel
    ? []
    : [terminateOnCancel(subprocess, cancelSignal, context, controller)];
var terminateOnCancel = async (subprocess, cancelSignal, context, { signal }) => {
  await onAbortedSignal(cancelSignal, signal);
  context.terminationReason ??= "cancel";
  subprocess.kill();
  throw cancelSignal.reason;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/graceful.js
import { scheduler as scheduler2 } from "node:timers/promises";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/send.js
import { promisify as promisify2 } from "node:util";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/validation.js
var validateIpcMethod = ({ methodName, isSubprocess, ipc, isConnected }) => {
  validateIpcOption(methodName, isSubprocess, ipc);
  validateConnection(methodName, isSubprocess, isConnected);
};
var validateIpcOption = (methodName, isSubprocess, ipc) => {
  if (!ipc) {
    throw new Error(
      `${getMethodName(methodName, isSubprocess)} can only be used if the \`ipc\` option is \`true\`.`,
    );
  }
};
var validateConnection = (methodName, isSubprocess, isConnected) => {
  if (!isConnected) {
    throw new Error(
      `${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} has already exited or disconnected.`,
    );
  }
};
var throwOnEarlyDisconnect = (isSubprocess) => {
  throw new Error(
    `${getMethodName("getOneMessage", isSubprocess)} could not complete: the ${getOtherProcessName(isSubprocess)} exited or disconnected.`,
  );
};
var throwOnStrictDeadlockError = (isSubprocess) => {
  throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is sending a message too, instead of listening to incoming messages.
This can be fixed by both sending a message and listening to incoming messages at the same time:

const [receivedMessage] = await Promise.all([
	${getMethodName("getOneMessage", isSubprocess)},
	${getMethodName("sendMessage", isSubprocess, "message, {strict: true}")},
]);`);
};
var getStrictResponseError = (error, isSubprocess) =>
  new Error(
    `${getMethodName("sendMessage", isSubprocess)} failed when sending an acknowledgment response to the ${getOtherProcessName(isSubprocess)}.`,
    { cause: error },
  );
var throwOnMissingStrict = (isSubprocess) => {
  throw new Error(
    `${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is not listening to incoming messages.`,
  );
};
var throwOnStrictDisconnect = (isSubprocess) => {
  throw new Error(
    `${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} exited without listening to incoming messages.`,
  );
};
var getAbortDisconnectError = () =>
  new Error(`\`cancelSignal\` aborted: the ${getOtherProcessName(true)} disconnected.`);
var throwOnMissingParent = () => {
  throw new Error(
    "`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option.",
  );
};
var handleEpipeError = ({ error, methodName, isSubprocess }) => {
  if (error.code === "EPIPE") {
    throw new Error(
      `${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} is disconnecting.`,
      { cause: error },
    );
  }
};
var handleSerializationError = ({ error, methodName, isSubprocess, message }) => {
  if (isSerializationError(error)) {
    throw new Error(
      `${getMethodName(methodName, isSubprocess)}'s argument type is invalid: the message cannot be serialized: ${String(message)}.`,
      { cause: error },
    );
  }
};
var isSerializationError = ({ code, message }) =>
  SERIALIZATION_ERROR_CODES.has(code) ||
  SERIALIZATION_ERROR_MESSAGES.some((serializationErrorMessage) =>
    message.includes(serializationErrorMessage),
  );
var SERIALIZATION_ERROR_CODES = new Set(["ERR_MISSING_ARGS", "ERR_INVALID_ARG_TYPE"]);
var SERIALIZATION_ERROR_MESSAGES = [
  "could not be cloned",
  "circular structure",
  "call stack size exceeded",
];
var getMethodName = (methodName, isSubprocess, parameters = "") =>
  methodName === "cancelSignal"
    ? "`cancelSignal`'s `controller.abort()`"
    : `${getNamespaceName(isSubprocess)}${methodName}(${parameters})`;
var getNamespaceName = (isSubprocess) => (isSubprocess ? "" : "subprocess.");
var getOtherProcessName = (isSubprocess) => (isSubprocess ? "parent process" : "subprocess");
var disconnect = (anyProcess) => {
  if (anyProcess.connected) {
    anyProcess.disconnect();
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/utils/deferred.js
var createDeferred = () => {
  const methods = {};
  const promise = new Promise((resolve, reject) => {
    Object.assign(methods, { resolve, reject });
  });
  return Object.assign(promise, methods);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/fd-options.js
var getToStream = (destination, to = "stdin") => {
  const isWritable = true;
  const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(destination);
  const fdNumber = getFdNumber(fileDescriptors, to, isWritable);
  const destinationStream = destination.stdio[fdNumber];
  if (destinationStream === null) {
    throw new TypeError(getInvalidStdioOptionMessage(fdNumber, to, options, isWritable));
  }
  return destinationStream;
};
var getFromStream = (source, from = "stdout") => {
  const isWritable = false;
  const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
  const fdNumber = getFdNumber(fileDescriptors, from, isWritable);
  const sourceStream = fdNumber === "all" ? source.all : source.stdio[fdNumber];
  if (sourceStream === null || sourceStream === undefined) {
    throw new TypeError(getInvalidStdioOptionMessage(fdNumber, from, options, isWritable));
  }
  return sourceStream;
};
var SUBPROCESS_OPTIONS = new WeakMap();
var getFdNumber = (fileDescriptors, fdName, isWritable) => {
  const fdNumber = parseFdNumber(fdName, isWritable);
  validateFdNumber(fdNumber, fdName, isWritable, fileDescriptors);
  return fdNumber;
};
var parseFdNumber = (fdName, isWritable) => {
  const fdNumber = parseFd(fdName);
  if (fdNumber !== undefined) {
    return fdNumber;
  }
  const { validOptions, defaultValue } = isWritable
    ? { validOptions: '"stdin"', defaultValue: "stdin" }
    : { validOptions: '"stdout", "stderr", "all"', defaultValue: "stdout" };
  throw new TypeError(`"${getOptionName(isWritable)}" must not be "${fdName}".
It must be ${validOptions} or "fd3", "fd4" (and so on).
It is optional and defaults to "${defaultValue}".`);
};
var validateFdNumber = (fdNumber, fdName, isWritable, fileDescriptors) => {
  const fileDescriptor = fileDescriptors[getUsedDescriptor(fdNumber)];
  if (fileDescriptor === undefined) {
    throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. That file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
  }
  if (fileDescriptor.direction === "input" && !isWritable) {
    throw new TypeError(
      `"${getOptionName(isWritable)}" must not be ${fdName}. It must be a readable stream, not writable.`,
    );
  }
  if (fileDescriptor.direction !== "input" && isWritable) {
    throw new TypeError(
      `"${getOptionName(isWritable)}" must not be ${fdName}. It must be a writable stream, not readable.`,
    );
  }
};
var getInvalidStdioOptionMessage = (fdNumber, fdName, options, isWritable) => {
  if (fdNumber === "all" && !options.all) {
    return `The "all" option must be true to use "from: 'all'".`;
  }
  const { optionName, optionValue } = getInvalidStdioOption(fdNumber, options);
  return `The "${optionName}: ${serializeOptionValue(optionValue)}" option is incompatible with using "${getOptionName(isWritable)}: ${serializeOptionValue(fdName)}".
Please set this option with "pipe" instead.`;
};
var getInvalidStdioOption = (fdNumber, { stdin, stdout, stderr, stdio }) => {
  const usedDescriptor = getUsedDescriptor(fdNumber);
  if (usedDescriptor === 0 && stdin !== undefined) {
    return { optionName: "stdin", optionValue: stdin };
  }
  if (usedDescriptor === 1 && stdout !== undefined) {
    return { optionName: "stdout", optionValue: stdout };
  }
  if (usedDescriptor === 2 && stderr !== undefined) {
    return { optionName: "stderr", optionValue: stderr };
  }
  return { optionName: `stdio[${usedDescriptor}]`, optionValue: stdio[usedDescriptor] };
};
var getUsedDescriptor = (fdNumber) => (fdNumber === "all" ? 1 : fdNumber);
var getOptionName = (isWritable) => (isWritable ? "to" : "from");
var serializeOptionValue = (value) => {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return typeof value === "number" ? `${value}` : "Stream";
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/strict.js
import { once as once3 } from "node:events";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/utils/max-listeners.js
import { addAbortListener } from "node:events";
var incrementMaxListeners = (eventEmitter, maxListenersIncrement, signal) => {
  const maxListeners = eventEmitter.getMaxListeners();
  if (maxListeners === 0 || maxListeners === Number.POSITIVE_INFINITY) {
    return;
  }
  eventEmitter.setMaxListeners(maxListeners + maxListenersIncrement);
  addAbortListener(signal, () => {
    eventEmitter.setMaxListeners(eventEmitter.getMaxListeners() - maxListenersIncrement);
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/forward.js
import { EventEmitter } from "node:events";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/incoming.js
import { once as once2 } from "node:events";
import { scheduler } from "node:timers/promises";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/reference.js
var addReference = (channel, reference) => {
  if (reference) {
    addReferenceCount(channel);
  }
};
var addReferenceCount = (channel) => {
  channel.refCounted();
};
var removeReference = (channel, reference) => {
  if (reference) {
    removeReferenceCount(channel);
  }
};
var removeReferenceCount = (channel) => {
  channel.unrefCounted();
};
var undoAddedReferences = (channel, isSubprocess) => {
  if (isSubprocess) {
    removeReferenceCount(channel);
    removeReferenceCount(channel);
  }
};
var redoAddedReferences = (channel, isSubprocess) => {
  if (isSubprocess) {
    addReferenceCount(channel);
    addReferenceCount(channel);
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/incoming.js
var onMessage = async ({ anyProcess, channel, isSubprocess, ipcEmitter }, wrappedMessage) => {
  if (handleStrictResponse(wrappedMessage) || handleAbort(wrappedMessage)) {
    return;
  }
  if (!INCOMING_MESSAGES.has(anyProcess)) {
    INCOMING_MESSAGES.set(anyProcess, []);
  }
  const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
  incomingMessages.push(wrappedMessage);
  if (incomingMessages.length > 1) {
    return;
  }
  while (incomingMessages.length > 0) {
    await waitForOutgoingMessages(anyProcess, ipcEmitter, wrappedMessage);
    await scheduler.yield();
    const message = await handleStrictRequest({
      wrappedMessage: incomingMessages[0],
      anyProcess,
      channel,
      isSubprocess,
      ipcEmitter,
    });
    incomingMessages.shift();
    ipcEmitter.emit("message", message);
    ipcEmitter.emit("message:done");
  }
};
var onDisconnect = async ({ anyProcess, channel, isSubprocess, ipcEmitter, boundOnMessage }) => {
  abortOnDisconnect();
  const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
  while (incomingMessages?.length > 0) {
    await once2(ipcEmitter, "message:done");
  }
  anyProcess.removeListener("message", boundOnMessage);
  redoAddedReferences(channel, isSubprocess);
  ipcEmitter.connected = false;
  ipcEmitter.emit("disconnect");
};
var INCOMING_MESSAGES = new WeakMap();

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/forward.js
var getIpcEmitter = (anyProcess, channel, isSubprocess) => {
  if (IPC_EMITTERS.has(anyProcess)) {
    return IPC_EMITTERS.get(anyProcess);
  }
  const ipcEmitter = new EventEmitter();
  ipcEmitter.connected = true;
  IPC_EMITTERS.set(anyProcess, ipcEmitter);
  forwardEvents({
    ipcEmitter,
    anyProcess,
    channel,
    isSubprocess,
  });
  return ipcEmitter;
};
var IPC_EMITTERS = new WeakMap();
var forwardEvents = ({ ipcEmitter, anyProcess, channel, isSubprocess }) => {
  const boundOnMessage = onMessage.bind(undefined, {
    anyProcess,
    channel,
    isSubprocess,
    ipcEmitter,
  });
  anyProcess.on("message", boundOnMessage);
  anyProcess.once(
    "disconnect",
    onDisconnect.bind(undefined, {
      anyProcess,
      channel,
      isSubprocess,
      ipcEmitter,
      boundOnMessage,
    }),
  );
  undoAddedReferences(channel, isSubprocess);
};
var isConnected = (anyProcess) => {
  const ipcEmitter = IPC_EMITTERS.get(anyProcess);
  return ipcEmitter === undefined ? anyProcess.channel !== null : ipcEmitter.connected;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/strict.js
var handleSendStrict = ({ anyProcess, channel, isSubprocess, message, strict }) => {
  if (!strict) {
    return message;
  }
  const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
  const hasListeners = hasMessageListeners(anyProcess, ipcEmitter);
  return {
    id: count++,
    type: REQUEST_TYPE,
    message,
    hasListeners,
  };
};
var count = 0n;
var validateStrictDeadlock = (outgoingMessages, wrappedMessage) => {
  if (wrappedMessage?.type !== REQUEST_TYPE || wrappedMessage.hasListeners) {
    return;
  }
  for (const { id } of outgoingMessages) {
    if (id !== undefined) {
      STRICT_RESPONSES[id].resolve({ isDeadlock: true, hasListeners: false });
    }
  }
};
var handleStrictRequest = async ({
  wrappedMessage,
  anyProcess,
  channel,
  isSubprocess,
  ipcEmitter,
}) => {
  if (wrappedMessage?.type !== REQUEST_TYPE || !anyProcess.connected) {
    return wrappedMessage;
  }
  const { id, message } = wrappedMessage;
  const response = {
    id,
    type: RESPONSE_TYPE,
    message: hasMessageListeners(anyProcess, ipcEmitter),
  };
  try {
    await sendMessage(
      {
        anyProcess,
        channel,
        isSubprocess,
        ipc: true,
      },
      response,
    );
  } catch (error) {
    ipcEmitter.emit("strict:error", error);
  }
  return message;
};
var handleStrictResponse = (wrappedMessage) => {
  if (wrappedMessage?.type !== RESPONSE_TYPE) {
    return false;
  }
  const { id, message: hasListeners } = wrappedMessage;
  STRICT_RESPONSES[id]?.resolve({ isDeadlock: false, hasListeners });
  return true;
};
var waitForStrictResponse = async (wrappedMessage, anyProcess, isSubprocess) => {
  if (wrappedMessage?.type !== REQUEST_TYPE) {
    return;
  }
  const deferred = createDeferred();
  STRICT_RESPONSES[wrappedMessage.id] = deferred;
  const controller = new AbortController();
  try {
    const { isDeadlock, hasListeners } = await Promise.race([
      deferred,
      throwOnDisconnect(anyProcess, isSubprocess, controller),
    ]);
    if (isDeadlock) {
      throwOnStrictDeadlockError(isSubprocess);
    }
    if (!hasListeners) {
      throwOnMissingStrict(isSubprocess);
    }
  } finally {
    controller.abort();
    delete STRICT_RESPONSES[wrappedMessage.id];
  }
};
var STRICT_RESPONSES = {};
var throwOnDisconnect = async (anyProcess, isSubprocess, { signal }) => {
  incrementMaxListeners(anyProcess, 1, signal);
  await once3(anyProcess, "disconnect", { signal });
  throwOnStrictDisconnect(isSubprocess);
};
var REQUEST_TYPE = "execa:ipc:request";
var RESPONSE_TYPE = "execa:ipc:response";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/outgoing.js
var startSendMessage = (anyProcess, wrappedMessage, strict) => {
  if (!OUTGOING_MESSAGES.has(anyProcess)) {
    OUTGOING_MESSAGES.set(anyProcess, new Set());
  }
  const outgoingMessages = OUTGOING_MESSAGES.get(anyProcess);
  const onMessageSent = createDeferred();
  const id = strict ? wrappedMessage.id : undefined;
  const outgoingMessage = { onMessageSent, id };
  outgoingMessages.add(outgoingMessage);
  return { outgoingMessages, outgoingMessage };
};
var endSendMessage = ({ outgoingMessages, outgoingMessage }) => {
  outgoingMessages.delete(outgoingMessage);
  outgoingMessage.onMessageSent.resolve();
};
var waitForOutgoingMessages = async (anyProcess, ipcEmitter, wrappedMessage) => {
  while (
    !hasMessageListeners(anyProcess, ipcEmitter) &&
    OUTGOING_MESSAGES.get(anyProcess)?.size > 0
  ) {
    const outgoingMessages = [...OUTGOING_MESSAGES.get(anyProcess)];
    validateStrictDeadlock(outgoingMessages, wrappedMessage);
    await Promise.all(outgoingMessages.map(({ onMessageSent }) => onMessageSent));
  }
};
var OUTGOING_MESSAGES = new WeakMap();
var hasMessageListeners = (anyProcess, ipcEmitter) =>
  ipcEmitter.listenerCount("message") > getMinListenerCount(anyProcess);
var getMinListenerCount = (anyProcess) =>
  SUBPROCESS_OPTIONS.has(anyProcess) &&
  !getFdSpecificValue(SUBPROCESS_OPTIONS.get(anyProcess).options.buffer, "ipc")
    ? 1
    : 0;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/send.js
var sendMessage = (
  { anyProcess, channel, isSubprocess, ipc },
  message,
  { strict = false } = {},
) => {
  const methodName = "sendMessage";
  validateIpcMethod({
    methodName,
    isSubprocess,
    ipc,
    isConnected: anyProcess.connected,
  });
  return sendMessageAsync({
    anyProcess,
    channel,
    methodName,
    isSubprocess,
    message,
    strict,
  });
};
var sendMessageAsync = async ({
  anyProcess,
  channel,
  methodName,
  isSubprocess,
  message,
  strict,
}) => {
  const wrappedMessage = handleSendStrict({
    anyProcess,
    channel,
    isSubprocess,
    message,
    strict,
  });
  const outgoingMessagesState = startSendMessage(anyProcess, wrappedMessage, strict);
  try {
    await sendOneMessage({
      anyProcess,
      methodName,
      isSubprocess,
      wrappedMessage,
      message,
    });
  } catch (error) {
    disconnect(anyProcess);
    throw error;
  } finally {
    endSendMessage(outgoingMessagesState);
  }
};
var sendOneMessage = async ({ anyProcess, methodName, isSubprocess, wrappedMessage, message }) => {
  const sendMethod = getSendMethod(anyProcess);
  try {
    await Promise.all([
      waitForStrictResponse(wrappedMessage, anyProcess, isSubprocess),
      sendMethod(wrappedMessage),
    ]);
  } catch (error) {
    handleEpipeError({ error, methodName, isSubprocess });
    handleSerializationError({
      error,
      methodName,
      isSubprocess,
      message,
    });
    throw error;
  }
};
var getSendMethod = (anyProcess) => {
  if (PROCESS_SEND_METHODS.has(anyProcess)) {
    return PROCESS_SEND_METHODS.get(anyProcess);
  }
  const sendMethod = promisify2(anyProcess.send.bind(anyProcess));
  PROCESS_SEND_METHODS.set(anyProcess, sendMethod);
  return sendMethod;
};
var PROCESS_SEND_METHODS = new WeakMap();

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/graceful.js
var sendAbort = (subprocess, message) => {
  const methodName = "cancelSignal";
  validateConnection(methodName, false, subprocess.connected);
  return sendOneMessage({
    anyProcess: subprocess,
    methodName,
    isSubprocess: false,
    wrappedMessage: { type: GRACEFUL_CANCEL_TYPE, message },
    message,
  });
};
var getCancelSignal = async ({ anyProcess, channel, isSubprocess, ipc }) => {
  await startIpc({
    anyProcess,
    channel,
    isSubprocess,
    ipc,
  });
  return cancelController.signal;
};
var startIpc = async ({ anyProcess, channel, isSubprocess, ipc }) => {
  if (cancelListening) {
    return;
  }
  cancelListening = true;
  if (!ipc) {
    throwOnMissingParent();
    return;
  }
  if (channel === null) {
    abortOnDisconnect();
    return;
  }
  getIpcEmitter(anyProcess, channel, isSubprocess);
  await scheduler2.yield();
};
var cancelListening = false;
var handleAbort = (wrappedMessage) => {
  if (wrappedMessage?.type !== GRACEFUL_CANCEL_TYPE) {
    return false;
  }
  cancelController.abort(wrappedMessage.message);
  return true;
};
var GRACEFUL_CANCEL_TYPE = "execa:ipc:cancel";
var abortOnDisconnect = () => {
  cancelController.abort(getAbortDisconnectError());
};
var cancelController = new AbortController();

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/graceful.js
var validateGracefulCancel = ({ gracefulCancel, cancelSignal, ipc, serialization }) => {
  if (!gracefulCancel) {
    return;
  }
  if (cancelSignal === undefined) {
    throw new Error(
      "The `cancelSignal` option must be defined when setting the `gracefulCancel` option.",
    );
  }
  if (!ipc) {
    throw new Error("The `ipc` option cannot be false when setting the `gracefulCancel` option.");
  }
  if (serialization === "json") {
    throw new Error(
      "The `serialization` option cannot be 'json' when setting the `gracefulCancel` option.",
    );
  }
};
var throwOnGracefulCancel = ({
  subprocess,
  cancelSignal,
  gracefulCancel,
  forceKillAfterDelay,
  context,
  controller,
}) =>
  gracefulCancel
    ? [
        sendOnAbort({
          subprocess,
          cancelSignal,
          forceKillAfterDelay,
          context,
          controller,
        }),
      ]
    : [];
var sendOnAbort = async ({
  subprocess,
  cancelSignal,
  forceKillAfterDelay,
  context,
  controller: { signal },
}) => {
  await onAbortedSignal(cancelSignal, signal);
  const reason = getReason(cancelSignal);
  await sendAbort(subprocess, reason);
  killOnTimeout({
    kill: subprocess.kill,
    forceKillAfterDelay,
    context,
    controllerSignal: signal,
  });
  context.terminationReason ??= "gracefulCancel";
  throw cancelSignal.reason;
};
var getReason = ({ reason }) => {
  if (!(reason instanceof DOMException)) {
    return reason;
  }
  const error = new Error(reason.message);
  Object.defineProperty(error, "stack", {
    value: reason.stack,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  return error;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/timeout.js
import { setTimeout as setTimeout2 } from "node:timers/promises";
var validateTimeout = ({ timeout }) => {
  if (timeout !== undefined && (!Number.isFinite(timeout) || timeout < 0)) {
    throw new TypeError(
      `Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`,
    );
  }
};
var throwOnTimeout = (subprocess, timeout, context, controller) =>
  timeout === 0 || timeout === undefined
    ? []
    : [killAfterTimeout(subprocess, timeout, context, controller)];
var killAfterTimeout = async (subprocess, timeout, context, { signal }) => {
  await setTimeout2(timeout, undefined, { signal });
  context.terminationReason ??= "timeout";
  subprocess.kill();
  throw new DiscardedError();
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/node.js
import { execPath, execArgv } from "node:process";
import path3 from "node:path";
var mapNode = ({ options }) => {
  if (options.node === false) {
    throw new TypeError('The "node" option cannot be false with `execaNode()`.');
  }
  return { options: { ...options, node: true } };
};
var handleNodeOption = (
  file,
  commandArguments,
  {
    node: shouldHandleNode = false,
    nodePath = execPath,
    nodeOptions = execArgv.filter((nodeOption) => !nodeOption.startsWith("--inspect")),
    cwd,
    execPath: formerNodePath,
    ...options
  },
) => {
  if (formerNodePath !== undefined) {
    throw new TypeError(
      'The "execPath" option has been removed. Please use the "nodePath" option instead.',
    );
  }
  const normalizedNodePath = safeNormalizeFileUrl(nodePath, 'The "nodePath" option');
  const resolvedNodePath = path3.resolve(cwd, normalizedNodePath);
  const newOptions = {
    ...options,
    nodePath: resolvedNodePath,
    node: shouldHandleNode,
    cwd,
  };
  if (!shouldHandleNode) {
    return [file, commandArguments, newOptions];
  }
  if (path3.basename(file, ".exe") === "node") {
    throw new TypeError(
      'When the "node" option is true, the first argument does not need to be "node".',
    );
  }
  return [
    resolvedNodePath,
    [...nodeOptions, file, ...commandArguments],
    { ipc: true, ...newOptions, shell: false },
  ];
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/ipc-input.js
import { serialize } from "node:v8";
var validateIpcInputOption = ({ ipcInput, ipc, serialization }) => {
  if (ipcInput === undefined) {
    return;
  }
  if (!ipc) {
    throw new Error("The `ipcInput` option cannot be set unless the `ipc` option is `true`.");
  }
  validateIpcInput[serialization](ipcInput);
};
var validateAdvancedInput = (ipcInput) => {
  try {
    serialize(ipcInput);
  } catch (error) {
    throw new Error("The `ipcInput` option is not serializable with a structured clone.", {
      cause: error,
    });
  }
};
var validateJsonInput = (ipcInput) => {
  try {
    JSON.stringify(ipcInput);
  } catch (error) {
    throw new Error("The `ipcInput` option is not serializable with JSON.", { cause: error });
  }
};
var validateIpcInput = {
  advanced: validateAdvancedInput,
  json: validateJsonInput,
};
var sendIpcInput = async (subprocess, ipcInput) => {
  if (ipcInput === undefined) {
    return;
  }
  await subprocess.sendMessage(ipcInput);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/encoding-option.js
var validateEncoding = ({ encoding }) => {
  if (ENCODINGS.has(encoding)) {
    return;
  }
  const correctEncoding = getCorrectEncoding(encoding);
  if (correctEncoding !== undefined) {
    throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to ${serializeEncoding(correctEncoding)}.`);
  }
  const correctEncodings = [...ENCODINGS]
    .map((correctEncoding) => serializeEncoding(correctEncoding))
    .join(", ");
  throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to one of: ${correctEncodings}.`);
};
var TEXT_ENCODINGS = new Set(["utf8", "utf16le"]);
var BINARY_ENCODINGS = new Set(["buffer", "hex", "base64", "base64url", "latin1", "ascii"]);
var ENCODINGS = new Set([...TEXT_ENCODINGS, ...BINARY_ENCODINGS]);
var getCorrectEncoding = (encoding) => {
  if (encoding === null) {
    return "buffer";
  }
  if (typeof encoding !== "string") {
    return;
  }
  const lowerEncoding = encoding.toLowerCase();
  if (lowerEncoding in ENCODING_ALIASES) {
    return ENCODING_ALIASES[lowerEncoding];
  }
  if (ENCODINGS.has(lowerEncoding)) {
    return lowerEncoding;
  }
};
var ENCODING_ALIASES = {
  "utf-8": "utf8",
  "utf-16le": "utf16le",
  "ucs-2": "utf16le",
  ucs2: "utf16le",
  binary: "latin1",
};
var serializeEncoding = (encoding) =>
  typeof encoding === "string" ? `"${encoding}"` : String(encoding);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/cwd.js
import { statSync } from "node:fs";
import path4 from "node:path";
import process6 from "node:process";
var normalizeCwd = (cwd = getDefaultCwd()) => {
  const cwdString = safeNormalizeFileUrl(cwd, 'The "cwd" option');
  return path4.resolve(cwdString);
};
var getDefaultCwd = () => {
  try {
    return process6.cwd();
  } catch (error) {
    error.message = `The current directory does not exist.
${error.message}`;
    throw error;
  }
};
var fixCwdError = (originalMessage, cwd) => {
  if (cwd === getDefaultCwd()) {
    return originalMessage;
  }
  let cwdStat;
  try {
    cwdStat = statSync(cwd);
  } catch (error) {
    return `The "cwd" option is invalid: ${cwd}.
${error.message}
${originalMessage}`;
  }
  if (!cwdStat.isDirectory()) {
    return `The "cwd" option is not a directory: ${cwd}.
${originalMessage}`;
  }
  return originalMessage;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/options.js
var normalizeOptions = (filePath, rawArguments, rawOptions) => {
  rawOptions.cwd = normalizeCwd(rawOptions.cwd);
  const [processedFile, processedArguments, processedOptions] = handleNodeOption(
    filePath,
    rawArguments,
    rawOptions,
  );
  const {
    command: file,
    args: commandArguments,
    options: initialOptions,
  } = import_cross_spawn.default._parse(processedFile, processedArguments, processedOptions);
  const fdOptions = normalizeFdSpecificOptions(initialOptions);
  const options = addDefaultOptions(fdOptions);
  validateTimeout(options);
  validateEncoding(options);
  validateIpcInputOption(options);
  validateCancelSignal(options);
  validateGracefulCancel(options);
  options.shell = normalizeFileUrl(options.shell);
  options.env = getEnv(options);
  options.killSignal = normalizeKillSignal(options.killSignal);
  options.forceKillAfterDelay = normalizeForceKillAfterDelay(options.forceKillAfterDelay);
  options.lines = options.lines.map(
    (lines, fdNumber) =>
      lines && !BINARY_ENCODINGS.has(options.encoding) && options.buffer[fdNumber],
  );
  if (process7.platform === "win32" && path5.basename(file, ".exe") === "cmd") {
    commandArguments.unshift("/q");
  }
  return { file, commandArguments, options };
};
var addDefaultOptions = ({
  extendEnv = true,
  preferLocal = false,
  cwd,
  localDir: localDirectory = cwd,
  encoding = "utf8",
  reject = true,
  cleanup = true,
  all = false,
  windowsHide = true,
  killSignal = "SIGTERM",
  forceKillAfterDelay = true,
  gracefulCancel = false,
  ipcInput,
  ipc = ipcInput !== undefined || gracefulCancel,
  serialization = "advanced",
  ...options
}) => ({
  ...options,
  extendEnv,
  preferLocal,
  cwd,
  localDirectory,
  encoding,
  reject,
  cleanup,
  all,
  windowsHide,
  killSignal,
  forceKillAfterDelay,
  gracefulCancel,
  ipcInput,
  ipc,
  serialization,
});
var getEnv = ({ env: envOption, extendEnv, preferLocal, node, localDirectory, nodePath }) => {
  const env = extendEnv ? { ...process7.env, ...envOption } : envOption;
  if (preferLocal || node) {
    return npmRunPathEnv({
      env,
      cwd: localDirectory,
      execPath: nodePath,
      preferLocal,
      addExecPath: node,
    });
  }
  return env;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/arguments/shell.js
var concatenateShell = (file, commandArguments, options) =>
  options.shell && commandArguments.length > 0
    ? [[file, ...commandArguments].join(" "), [], options]
    : [file, commandArguments, options];

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/message.js
import { inspect as inspect2 } from "node:util";

// ../../../node_modules/.bun/strip-final-newline@4.0.0/node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
  if (typeof input === "string") {
    return stripFinalNewlineString(input);
  }
  if (!(ArrayBuffer.isView(input) && input.BYTES_PER_ELEMENT === 1)) {
    throw new Error("Input must be a string or a Uint8Array");
  }
  return stripFinalNewlineBinary(input);
}
var stripFinalNewlineString = (input) =>
  input.at(-1) === LF ? input.slice(0, input.at(-2) === CR ? -2 : -1) : input;
var stripFinalNewlineBinary = (input) =>
  input.at(-1) === LF_BINARY ? input.subarray(0, input.at(-2) === CR_BINARY ? -2 : -1) : input;
var LF = `
`;
var LF_BINARY = LF.codePointAt(0);
var CR = "\r";
var CR_BINARY = CR.codePointAt(0);

// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/index.js
import { on as on2 } from "node:events";
import { finished } from "node:stream/promises";

// ../../../node_modules/.bun/is-stream@4.0.1/node_modules/is-stream/index.js
function isStream(stream, { checkOpen = true } = {}) {
  return (
    stream !== null &&
    typeof stream === "object" &&
    (stream.writable ||
      stream.readable ||
      !checkOpen ||
      (stream.writable === undefined && stream.readable === undefined)) &&
    typeof stream.pipe === "function"
  );
}
function isWritableStream(stream, { checkOpen = true } = {}) {
  return (
    isStream(stream, { checkOpen }) &&
    (stream.writable || !checkOpen) &&
    typeof stream.write === "function" &&
    typeof stream.end === "function" &&
    typeof stream.writable === "boolean" &&
    typeof stream.writableObjectMode === "boolean" &&
    typeof stream.destroy === "function" &&
    typeof stream.destroyed === "boolean"
  );
}
function isReadableStream(stream, { checkOpen = true } = {}) {
  return (
    isStream(stream, { checkOpen }) &&
    (stream.readable || !checkOpen) &&
    typeof stream.read === "function" &&
    typeof stream.readable === "boolean" &&
    typeof stream.readableObjectMode === "boolean" &&
    typeof stream.destroy === "function" &&
    typeof stream.destroyed === "boolean"
  );
}
function isDuplexStream(stream, options) {
  return isWritableStream(stream, options) && isReadableStream(stream, options);
}

// ../../../node_modules/.bun/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js
var a = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);

class c {
  #t;
  #n;
  #r = false;
  #e = undefined;
  constructor(e, t) {
    ((this.#t = e), (this.#n = t));
  }
  next() {
    const e = () => this.#s();
    return ((this.#e = this.#e ? this.#e.then(e, e) : e()), this.#e);
  }
  return(e) {
    const t = () => this.#i(e);
    return this.#e ? this.#e.then(t, t) : t();
  }
  async #s() {
    if (this.#r)
      return {
        done: true,
        value: undefined,
      };
    let e;
    try {
      e = await this.#t.read();
    } catch (t) {
      throw ((this.#e = undefined), (this.#r = true), this.#t.releaseLock(), t);
    }
    return (e.done && ((this.#e = undefined), (this.#r = true), this.#t.releaseLock()), e);
  }
  async #i(e) {
    if (this.#r)
      return {
        done: true,
        value: e,
      };
    if (((this.#r = true), !this.#n)) {
      const t = this.#t.cancel(e);
      return (
        this.#t.releaseLock(),
        await t,
        {
          done: true,
          value: e,
        }
      );
    }
    return (
      this.#t.releaseLock(),
      {
        done: true,
        value: e,
      }
    );
  }
}
var n = Symbol();
function i() {
  return this[n].next();
}
Object.defineProperty(i, "name", { value: "next" });
function o2(r) {
  return this[n].return(r);
}
Object.defineProperty(o2, "name", { value: "return" });
var u = Object.create(a, {
  next: {
    enumerable: true,
    configurable: true,
    writable: true,
    value: i,
  },
  return: {
    enumerable: true,
    configurable: true,
    writable: true,
    value: o2,
  },
});
function h3({ preventCancel: r = false } = {}) {
  const e = this.getReader(),
    t = new c(e, r),
    s = Object.create(u);
  return ((s[n] = t), s);
}

// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/stream.js
var getAsyncIterable = (stream) => {
  if (isReadableStream(stream, { checkOpen: false }) && nodeImports.on !== undefined) {
    return getStreamIterable(stream);
  }
  if (typeof stream?.[Symbol.asyncIterator] === "function") {
    return stream;
  }
  if (toString.call(stream) === "[object ReadableStream]") {
    return h3.call(stream);
  }
  throw new TypeError(
    "The first argument must be a Readable, a ReadableStream, or an async iterable.",
  );
};
var { toString } = Object.prototype;
var getStreamIterable = async function* (stream) {
  const controller = new AbortController();
  const state = {};
  handleStreamEnd(stream, controller, state);
  try {
    for await (const [chunk] of nodeImports.on(stream, "data", { signal: controller.signal })) {
      yield chunk;
    }
  } catch (error) {
    if (state.error !== undefined) {
      throw state.error;
    } else if (!controller.signal.aborted) {
      throw error;
    }
  } finally {
    stream.destroy();
  }
};
var handleStreamEnd = async (stream, controller, state) => {
  try {
    await nodeImports.finished(stream, {
      cleanup: true,
      readable: true,
      writable: false,
      error: false,
    });
  } catch (error) {
    state.error = error;
  } finally {
    controller.abort();
  }
};
var nodeImports = {};

// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/contents.js
var getStreamContents = async (
  stream,
  { init, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize },
  { maxBuffer = Number.POSITIVE_INFINITY } = {},
) => {
  const asyncIterable = getAsyncIterable(stream);
  const state = init();
  state.length = 0;
  try {
    for await (const chunk of asyncIterable) {
      const chunkType = getChunkType(chunk);
      const convertedChunk = convertChunk[chunkType](chunk, state);
      appendChunk({
        convertedChunk,
        state,
        getSize,
        truncateChunk,
        addChunk,
        maxBuffer,
      });
    }
    appendFinalChunk({
      state,
      convertChunk,
      getSize,
      truncateChunk,
      addChunk,
      getFinalChunk,
      maxBuffer,
    });
    return finalize(state);
  } catch (error) {
    const normalizedError = typeof error === "object" && error !== null ? error : new Error(error);
    normalizedError.bufferedData = finalize(state);
    throw normalizedError;
  }
};
var appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
  const convertedChunk = getFinalChunk(state);
  if (convertedChunk !== undefined) {
    appendChunk({
      convertedChunk,
      state,
      getSize,
      truncateChunk,
      addChunk,
      maxBuffer,
    });
  }
};
var appendChunk = ({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
  const chunkSize = getSize(convertedChunk);
  const newLength = state.length + chunkSize;
  if (newLength <= maxBuffer) {
    addNewChunk(convertedChunk, state, addChunk, newLength);
    return;
  }
  const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
  if (truncatedChunk !== undefined) {
    addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
  }
  throw new MaxBufferError();
};
var addNewChunk = (convertedChunk, state, addChunk, newLength) => {
  state.contents = addChunk(convertedChunk, state, newLength);
  state.length = newLength;
};
var getChunkType = (chunk) => {
  const typeOfChunk = typeof chunk;
  if (typeOfChunk === "string") {
    return "string";
  }
  if (typeOfChunk !== "object" || chunk === null) {
    return "others";
  }
  if (globalThis.Buffer?.isBuffer(chunk)) {
    return "buffer";
  }
  const prototypeName = objectToString2.call(chunk);
  if (prototypeName === "[object ArrayBuffer]") {
    return "arrayBuffer";
  }
  if (prototypeName === "[object DataView]") {
    return "dataView";
  }
  if (
    Number.isInteger(chunk.byteLength) &&
    Number.isInteger(chunk.byteOffset) &&
    objectToString2.call(chunk.buffer) === "[object ArrayBuffer]"
  ) {
    return "typedArray";
  }
  return "others";
};
var { toString: objectToString2 } = Object.prototype;

class MaxBufferError extends Error {
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
}

// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/utils.js
var identity3 = (value) => value;
var noop = () => {
  return;
};
var getContentsProperty = ({ contents }) => contents;
var throwObjectStream = (chunk) => {
  throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
};
var getLengthProperty = (convertedChunk) => convertedChunk.length;

// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/array.js
async function getStreamAsArray(stream, options) {
  return getStreamContents(stream, arrayMethods, options);
}
var initArray = () => ({ contents: [] });
var increment = () => 1;
var addArrayChunk = (convertedChunk, { contents }) => {
  contents.push(convertedChunk);
  return contents;
};
var arrayMethods = {
  init: initArray,
  convertChunk: {
    string: identity3,
    buffer: identity3,
    arrayBuffer: identity3,
    dataView: identity3,
    typedArray: identity3,
    others: identity3,
  },
  getSize: increment,
  truncateChunk: noop,
  addChunk: addArrayChunk,
  getFinalChunk: noop,
  finalize: getContentsProperty,
};
// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream, options) {
  return getStreamContents(stream, arrayBufferMethods, options);
}
var initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
var useTextEncoder = (chunk) => textEncoder2.encode(chunk);
var textEncoder2 = new TextEncoder();
var useUint8Array = (chunk) => new Uint8Array(chunk);
var useUint8ArrayWithOffset = (chunk) =>
  new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
var truncateArrayBufferChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
var addArrayBufferChunk = (convertedChunk, { contents, length: previousLength }, length) => {
  const newContents = hasArrayBufferResize()
    ? resizeArrayBuffer(contents, length)
    : resizeArrayBufferSlow(contents, length);
  new Uint8Array(newContents).set(convertedChunk, previousLength);
  return newContents;
};
var resizeArrayBufferSlow = (contents, length) => {
  if (length <= contents.byteLength) {
    return contents;
  }
  const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
  new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
  return arrayBuffer;
};
var resizeArrayBuffer = (contents, length) => {
  if (length <= contents.maxByteLength) {
    contents.resize(length);
    return contents;
  }
  const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
  new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
  return arrayBuffer;
};
var getNewContentsLength = (length) =>
  SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR));
var SCALE_FACTOR = 2;
var finalizeArrayBuffer = ({ contents, length }) =>
  hasArrayBufferResize() ? contents : contents.slice(0, length);
var hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;
var arrayBufferMethods = {
  init: initArrayBuffer,
  convertChunk: {
    string: useTextEncoder,
    buffer: useUint8Array,
    arrayBuffer: useUint8Array,
    dataView: useUint8ArrayWithOffset,
    typedArray: useUint8ArrayWithOffset,
    others: throwObjectStream,
  },
  getSize: getLengthProperty,
  truncateChunk: truncateArrayBufferChunk,
  addChunk: addArrayBufferChunk,
  getFinalChunk: noop,
  finalize: finalizeArrayBuffer,
};
// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/string.js
async function getStreamAsString(stream, options) {
  return getStreamContents(stream, stringMethods, options);
}
var initString = () => ({ contents: "", textDecoder: new TextDecoder() });
var useTextDecoder = (chunk, { textDecoder }) => textDecoder.decode(chunk, { stream: true });
var addStringChunk = (convertedChunk, { contents }) => contents + convertedChunk;
var truncateStringChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
var getFinalStringChunk = ({ textDecoder }) => {
  const finalChunk = textDecoder.decode();
  return finalChunk === "" ? undefined : finalChunk;
};
var stringMethods = {
  init: initString,
  convertChunk: {
    string: identity3,
    buffer: useTextDecoder,
    arrayBuffer: useTextDecoder,
    dataView: useTextDecoder,
    typedArray: useTextDecoder,
    others: throwObjectStream,
  },
  getSize: getLengthProperty,
  truncateChunk: truncateStringChunk,
  addChunk: addStringChunk,
  getFinalChunk: getFinalStringChunk,
  finalize: getContentsProperty,
};
// ../../../node_modules/.bun/get-stream@9.0.1/node_modules/get-stream/source/index.js
Object.assign(nodeImports, { on: on2, finished });

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/max-buffer.js
var handleMaxBuffer = ({ error, stream, readableObjectMode, lines, encoding, fdNumber }) => {
  if (!(error instanceof MaxBufferError)) {
    throw error;
  }
  if (fdNumber === "all") {
    return error;
  }
  const unit = getMaxBufferUnit(readableObjectMode, lines, encoding);
  error.maxBufferInfo = { fdNumber, unit };
  stream.destroy();
  throw error;
};
var getMaxBufferUnit = (readableObjectMode, lines, encoding) => {
  if (readableObjectMode) {
    return "objects";
  }
  if (lines) {
    return "lines";
  }
  if (encoding === "buffer") {
    return "bytes";
  }
  return "characters";
};
var checkIpcMaxBuffer = (subprocess, ipcOutput, maxBuffer) => {
  if (ipcOutput.length !== maxBuffer) {
    return;
  }
  const error = new MaxBufferError();
  error.maxBufferInfo = { fdNumber: "ipc" };
  throw error;
};
var getMaxBufferMessage = (error, maxBuffer) => {
  const { streamName, threshold, unit } = getMaxBufferInfo(error, maxBuffer);
  return `Command's ${streamName} was larger than ${threshold} ${unit}`;
};
var getMaxBufferInfo = (error, maxBuffer) => {
  if (error?.maxBufferInfo === undefined) {
    return { streamName: "output", threshold: maxBuffer[1], unit: "bytes" };
  }
  const {
    maxBufferInfo: { fdNumber, unit },
  } = error;
  delete error.maxBufferInfo;
  const threshold = getFdSpecificValue(maxBuffer, fdNumber);
  if (fdNumber === "ipc") {
    return { streamName: "IPC output", threshold, unit: "messages" };
  }
  return { streamName: getStreamName(fdNumber), threshold, unit };
};
var isMaxBufferSync = (resultError, output, maxBuffer) =>
  resultError?.code === "ENOBUFS" &&
  output !== null &&
  output.some((result) => result !== null && result.length > getMaxBufferSync(maxBuffer));
var truncateMaxBufferSync = (result, isMaxBuffer, maxBuffer) => {
  if (!isMaxBuffer) {
    return result;
  }
  const maxBufferValue = getMaxBufferSync(maxBuffer);
  return result.length > maxBufferValue ? result.slice(0, maxBufferValue) : result;
};
var getMaxBufferSync = ([, stdoutMaxBuffer]) => stdoutMaxBuffer;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/message.js
var createMessages = ({
  stdio,
  all,
  ipcOutput,
  originalError,
  signal,
  signalDescription,
  exitCode,
  escapedCommand,
  timedOut,
  isCanceled,
  isGracefullyCanceled,
  isMaxBuffer,
  isForcefullyTerminated,
  forceKillAfterDelay,
  killSignal,
  maxBuffer,
  timeout,
  cwd,
}) => {
  const errorCode = originalError?.code;
  const prefix = getErrorPrefix({
    originalError,
    timedOut,
    timeout,
    isMaxBuffer,
    maxBuffer,
    errorCode,
    signal,
    signalDescription,
    exitCode,
    isCanceled,
    isGracefullyCanceled,
    isForcefullyTerminated,
    forceKillAfterDelay,
    killSignal,
  });
  const originalMessage = getOriginalMessage(originalError, cwd);
  const suffix =
    originalMessage === undefined
      ? ""
      : `
${originalMessage}`;
  const shortMessage = `${prefix}: ${escapedCommand}${suffix}`;
  const messageStdio = all === undefined ? [stdio[2], stdio[1]] : [all];
  const message = [
    shortMessage,
    ...messageStdio,
    ...stdio.slice(3),
    ipcOutput.map((ipcMessage) => serializeIpcMessage(ipcMessage)).join(`
`),
  ]
    .map((messagePart) => escapeLines(stripFinalNewline(serializeMessagePart(messagePart))))
    .filter(Boolean).join(`

`);
  return { originalMessage, shortMessage, message };
};
var getErrorPrefix = ({
  originalError,
  timedOut,
  timeout,
  isMaxBuffer,
  maxBuffer,
  errorCode,
  signal,
  signalDescription,
  exitCode,
  isCanceled,
  isGracefullyCanceled,
  isForcefullyTerminated,
  forceKillAfterDelay,
  killSignal,
}) => {
  const forcefulSuffix = getForcefulSuffix(isForcefullyTerminated, forceKillAfterDelay);
  if (timedOut) {
    return `Command timed out after ${timeout} milliseconds${forcefulSuffix}`;
  }
  if (isGracefullyCanceled) {
    if (signal === undefined) {
      return `Command was gracefully canceled with exit code ${exitCode}`;
    }
    return isForcefullyTerminated
      ? `Command was gracefully canceled${forcefulSuffix}`
      : `Command was gracefully canceled with ${signal} (${signalDescription})`;
  }
  if (isCanceled) {
    return `Command was canceled${forcefulSuffix}`;
  }
  if (isMaxBuffer) {
    return `${getMaxBufferMessage(originalError, maxBuffer)}${forcefulSuffix}`;
  }
  if (errorCode !== undefined) {
    return `Command failed with ${errorCode}${forcefulSuffix}`;
  }
  if (isForcefullyTerminated) {
    return `Command was killed with ${killSignal} (${getSignalDescription(killSignal)})${forcefulSuffix}`;
  }
  if (signal !== undefined) {
    return `Command was killed with ${signal} (${signalDescription})`;
  }
  if (exitCode !== undefined) {
    return `Command failed with exit code ${exitCode}`;
  }
  return "Command failed";
};
var getForcefulSuffix = (isForcefullyTerminated, forceKillAfterDelay) =>
  isForcefullyTerminated
    ? ` and was forcefully terminated after ${forceKillAfterDelay} milliseconds`
    : "";
var getOriginalMessage = (originalError, cwd) => {
  if (originalError instanceof DiscardedError) {
    return;
  }
  const originalMessage = isExecaError(originalError)
    ? originalError.originalMessage
    : String(originalError?.message ?? originalError);
  const escapedOriginalMessage = escapeLines(fixCwdError(originalMessage, cwd));
  return escapedOriginalMessage === "" ? undefined : escapedOriginalMessage;
};
var serializeIpcMessage = (ipcMessage) =>
  typeof ipcMessage === "string" ? ipcMessage : inspect2(ipcMessage);
var serializeMessagePart = (messagePart) =>
  Array.isArray(messagePart)
    ? messagePart
        .map((messageItem) => stripFinalNewline(serializeMessageItem(messageItem)))
        .filter(Boolean).join(`
`)
    : serializeMessageItem(messagePart);
var serializeMessageItem = (messageItem) => {
  if (typeof messageItem === "string") {
    return messageItem;
  }
  if (isUint8Array(messageItem)) {
    return uint8ArrayToString(messageItem);
  }
  return "";
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/result.js
var makeSuccessResult = ({
  command,
  escapedCommand,
  stdio,
  all,
  ipcOutput,
  options: { cwd },
  startTime,
}) =>
  omitUndefinedProperties({
    command,
    escapedCommand,
    cwd,
    durationMs: getDurationMs(startTime),
    failed: false,
    timedOut: false,
    isCanceled: false,
    isGracefullyCanceled: false,
    isTerminated: false,
    isMaxBuffer: false,
    isForcefullyTerminated: false,
    exitCode: 0,
    stdout: stdio[1],
    stderr: stdio[2],
    all,
    stdio,
    ipcOutput,
    pipedFrom: [],
  });
var makeEarlyError = ({
  error,
  command,
  escapedCommand,
  fileDescriptors,
  options,
  startTime,
  isSync,
}) =>
  makeError({
    error,
    command,
    escapedCommand,
    startTime,
    timedOut: false,
    isCanceled: false,
    isGracefullyCanceled: false,
    isMaxBuffer: false,
    isForcefullyTerminated: false,
    stdio: Array.from({ length: fileDescriptors.length }),
    ipcOutput: [],
    options,
    isSync,
  });
var makeError = ({
  error: originalError,
  command,
  escapedCommand,
  startTime,
  timedOut,
  isCanceled,
  isGracefullyCanceled,
  isMaxBuffer,
  isForcefullyTerminated,
  exitCode: rawExitCode,
  signal: rawSignal,
  stdio,
  all,
  ipcOutput,
  options: {
    timeoutDuration,
    timeout = timeoutDuration,
    forceKillAfterDelay,
    killSignal,
    cwd,
    maxBuffer,
  },
  isSync,
}) => {
  const { exitCode, signal, signalDescription } = normalizeExitPayload(rawExitCode, rawSignal);
  const { originalMessage, shortMessage, message } = createMessages({
    stdio,
    all,
    ipcOutput,
    originalError,
    signal,
    signalDescription,
    exitCode,
    escapedCommand,
    timedOut,
    isCanceled,
    isGracefullyCanceled,
    isMaxBuffer,
    isForcefullyTerminated,
    forceKillAfterDelay,
    killSignal,
    maxBuffer,
    timeout,
    cwd,
  });
  const error = getFinalError(originalError, message, isSync);
  Object.assign(
    error,
    getErrorProperties({
      error,
      command,
      escapedCommand,
      startTime,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode,
      signal,
      signalDescription,
      stdio,
      all,
      ipcOutput,
      cwd,
      originalMessage,
      shortMessage,
    }),
  );
  return error;
};
var getErrorProperties = ({
  error,
  command,
  escapedCommand,
  startTime,
  timedOut,
  isCanceled,
  isGracefullyCanceled,
  isMaxBuffer,
  isForcefullyTerminated,
  exitCode,
  signal,
  signalDescription,
  stdio,
  all,
  ipcOutput,
  cwd,
  originalMessage,
  shortMessage,
}) =>
  omitUndefinedProperties({
    shortMessage,
    originalMessage,
    command,
    escapedCommand,
    cwd,
    durationMs: getDurationMs(startTime),
    failed: true,
    timedOut,
    isCanceled,
    isGracefullyCanceled,
    isTerminated: signal !== undefined,
    isMaxBuffer,
    isForcefullyTerminated,
    exitCode,
    signal,
    signalDescription,
    code: error.cause?.code,
    stdout: stdio[1],
    stderr: stdio[2],
    all,
    stdio,
    ipcOutput,
    pipedFrom: [],
  });
var omitUndefinedProperties = (result) =>
  Object.fromEntries(Object.entries(result).filter(([, value]) => value !== undefined));
var normalizeExitPayload = (rawExitCode, rawSignal) => {
  const exitCode = rawExitCode === null ? undefined : rawExitCode;
  const signal = rawSignal === null ? undefined : rawSignal;
  const signalDescription = signal === undefined ? undefined : getSignalDescription(rawSignal);
  return { exitCode, signal, signalDescription };
};

// ../../../node_modules/.bun/parse-ms@4.0.0/node_modules/parse-ms/index.js
var toZeroIfInfinity = (value) => (Number.isFinite(value) ? value : 0);
function parseNumber(milliseconds) {
  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc((milliseconds / 3600000) % 24),
    minutes: Math.trunc((milliseconds / 60000) % 60),
    seconds: Math.trunc((milliseconds / 1000) % 60),
    milliseconds: Math.trunc(milliseconds % 1000),
    microseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1000) % 1000),
    nanoseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e6) % 1000),
  };
}
function parseBigint(milliseconds) {
  return {
    days: milliseconds / 86400000n,
    hours: (milliseconds / 3600000n) % 24n,
    minutes: (milliseconds / 60000n) % 60n,
    seconds: (milliseconds / 1000n) % 60n,
    milliseconds: milliseconds % 1000n,
    microseconds: 0n,
    nanoseconds: 0n,
  };
}
function parseMilliseconds(milliseconds) {
  switch (typeof milliseconds) {
    case "number": {
      if (Number.isFinite(milliseconds)) {
        return parseNumber(milliseconds);
      }
      break;
    }
    case "bigint": {
      return parseBigint(milliseconds);
    }
  }
  throw new TypeError("Expected a finite number or bigint");
}

// ../../../node_modules/.bun/pretty-ms@9.3.0/node_modules/pretty-ms/index.js
var isZero = (value) => value === 0 || value === 0n;
var pluralize = (word, count) => (count === 1 || count === 1n ? word : `${word}s`);
var SECOND_ROUNDING_EPSILON = 0.0000001;
var ONE_DAY_IN_MILLISECONDS = 24n * 60n * 60n * 1000n;
function prettyMilliseconds(milliseconds, options) {
  const isBigInt = typeof milliseconds === "bigint";
  if (!isBigInt && !Number.isFinite(milliseconds)) {
    throw new TypeError("Expected a finite number or bigint");
  }
  options = { ...options };
  const sign = milliseconds < 0 ? "-" : "";
  milliseconds = milliseconds < 0 ? -milliseconds : milliseconds;
  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }
  if (options.compact) {
    options.unitCount = 1;
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }
  let result = [];
  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };
  const add = (value, long, short, valueString) => {
    if (
      (result.length === 0 || !options.colonNotation) &&
      isZero(value) &&
      !(options.colonNotation && short === "m")
    ) {
      return;
    }
    valueString ??= String(value);
    if (options.colonNotation) {
      const wholeDigits = valueString.includes(".")
        ? valueString.split(".")[0].length
        : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      valueString += options.verbose ? " " + pluralize(long, value) : short;
    }
    result.push(valueString);
  };
  const parsed = parseMilliseconds(milliseconds);
  const days = BigInt(parsed.days);
  if (options.hideYearAndDays) {
    add(BigInt(days) * 24n + BigInt(parsed.hours), "hour", "h");
  } else {
    if (options.hideYear) {
      add(days, "day", "d");
    } else {
      add(days / 365n, "year", "y");
      add(days % 365n, "day", "d");
    }
    add(Number(parsed.hours), "hour", "h");
  }
  add(Number(parsed.minutes), "minute", "m");
  if (!options.hideSeconds) {
    if (
      options.separateMilliseconds ||
      options.formatSubMilliseconds ||
      (!options.colonNotation && milliseconds < 1000 && !options.subSecondsAsDecimals)
    ) {
      const seconds = Number(parsed.seconds);
      const milliseconds = Number(parsed.milliseconds);
      const microseconds = Number(parsed.microseconds);
      const nanoseconds = Number(parsed.nanoseconds);
      add(seconds, "second", "s");
      if (options.formatSubMilliseconds) {
        add(milliseconds, "millisecond", "ms");
        add(microseconds, "microsecond", "µs");
        add(nanoseconds, "nanosecond", "ns");
      } else {
        const millisecondsAndBelow = milliseconds + microseconds / 1000 + nanoseconds / 1e6;
        const millisecondsDecimalDigits =
          typeof options.millisecondsDecimalDigits === "number"
            ? options.millisecondsDecimalDigits
            : 0;
        const roundedMilliseconds =
          millisecondsAndBelow >= 1
            ? Math.round(millisecondsAndBelow)
            : Math.ceil(millisecondsAndBelow);
        const millisecondsString = millisecondsDecimalDigits
          ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits)
          : roundedMilliseconds;
        add(Number.parseFloat(millisecondsString), "millisecond", "ms", millisecondsString);
      }
    } else {
      const seconds =
        ((isBigInt ? Number(milliseconds % ONE_DAY_IN_MILLISECONDS) : milliseconds) / 1000) % 60;
      const secondsDecimalDigits =
        typeof options.secondsDecimalDigits === "number" ? options.secondsDecimalDigits : 1;
      const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
      const secondsString = options.keepDecimalsOnWholeSeconds
        ? secondsFixed
        : secondsFixed.replace(/\.0+$/, "");
      add(Number.parseFloat(secondsString), "second", "s", secondsString);
    }
  }
  if (result.length === 0) {
    return sign + "0" + (options.verbose ? " milliseconds" : "ms");
  }
  const separator = options.colonNotation ? ":" : " ";
  if (typeof options.unitCount === "number") {
    result = result.slice(0, Math.max(options.unitCount, 1));
  }
  return sign + result.join(separator);
}

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/error.js
var logError = (result, verboseInfo) => {
  if (result.failed) {
    verboseLog({
      type: "error",
      verboseMessage: result.shortMessage,
      verboseInfo,
      result,
    });
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/complete.js
var logResult = (result, verboseInfo) => {
  if (!isVerbose(verboseInfo)) {
    return;
  }
  logError(result, verboseInfo);
  logDuration(result, verboseInfo);
};
var logDuration = (result, verboseInfo) => {
  const verboseMessage = `(done in ${prettyMilliseconds(result.durationMs)})`;
  verboseLog({
    type: "duration",
    verboseMessage,
    verboseInfo,
    result,
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/reject.js
var handleResult = (result, verboseInfo, { reject }) => {
  logResult(result, verboseInfo);
  if (result.failed && reject) {
    throw result;
  }
  return result;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/handle-sync.js
import { readFileSync as readFileSync2 } from "node:fs";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/type.js
var getStdioItemType = (value, optionName) => {
  if (isAsyncGenerator(value)) {
    return "asyncGenerator";
  }
  if (isSyncGenerator(value)) {
    return "generator";
  }
  if (isUrl(value)) {
    return "fileUrl";
  }
  if (isFilePathObject(value)) {
    return "filePath";
  }
  if (isWebStream(value)) {
    return "webStream";
  }
  if (isStream(value, { checkOpen: false })) {
    return "native";
  }
  if (isUint8Array(value)) {
    return "uint8Array";
  }
  if (isAsyncIterableObject(value)) {
    return "asyncIterable";
  }
  if (isIterableObject(value)) {
    return "iterable";
  }
  if (isTransformStream(value)) {
    return getTransformStreamType({ transform: value }, optionName);
  }
  if (isTransformOptions(value)) {
    return getTransformObjectType(value, optionName);
  }
  return "native";
};
var getTransformObjectType = (value, optionName) => {
  if (isDuplexStream(value.transform, { checkOpen: false })) {
    return getDuplexType(value, optionName);
  }
  if (isTransformStream(value.transform)) {
    return getTransformStreamType(value, optionName);
  }
  return getGeneratorObjectType(value, optionName);
};
var getDuplexType = (value, optionName) => {
  validateNonGeneratorType(value, optionName, "Duplex stream");
  return "duplex";
};
var getTransformStreamType = (value, optionName) => {
  validateNonGeneratorType(value, optionName, "web TransformStream");
  return "webTransform";
};
var validateNonGeneratorType = ({ final, binary, objectMode }, optionName, typeName) => {
  checkUndefinedOption(final, `${optionName}.final`, typeName);
  checkUndefinedOption(binary, `${optionName}.binary`, typeName);
  checkBooleanOption(objectMode, `${optionName}.objectMode`);
};
var checkUndefinedOption = (value, optionName, typeName) => {
  if (value !== undefined) {
    throw new TypeError(
      `The \`${optionName}\` option can only be defined when using a generator, not a ${typeName}.`,
    );
  }
};
var getGeneratorObjectType = ({ transform, final, binary, objectMode }, optionName) => {
  if (transform !== undefined && !isGenerator(transform)) {
    throw new TypeError(
      `The \`${optionName}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`,
    );
  }
  if (isDuplexStream(final, { checkOpen: false })) {
    throw new TypeError(`The \`${optionName}.final\` option must not be a Duplex stream.`);
  }
  if (isTransformStream(final)) {
    throw new TypeError(`The \`${optionName}.final\` option must not be a web TransformStream.`);
  }
  if (final !== undefined && !isGenerator(final)) {
    throw new TypeError(`The \`${optionName}.final\` option must be a generator.`);
  }
  checkBooleanOption(binary, `${optionName}.binary`);
  checkBooleanOption(objectMode, `${optionName}.objectMode`);
  return isAsyncGenerator(transform) || isAsyncGenerator(final) ? "asyncGenerator" : "generator";
};
var checkBooleanOption = (value, optionName) => {
  if (value !== undefined && typeof value !== "boolean") {
    throw new TypeError(`The \`${optionName}\` option must use a boolean.`);
  }
};
var isGenerator = (value) => isAsyncGenerator(value) || isSyncGenerator(value);
var isAsyncGenerator = (value) =>
  Object.prototype.toString.call(value) === "[object AsyncGeneratorFunction]";
var isSyncGenerator = (value) =>
  Object.prototype.toString.call(value) === "[object GeneratorFunction]";
var isTransformOptions = (value) =>
  isPlainObject2(value) && (value.transform !== undefined || value.final !== undefined);
var isUrl = (value) => Object.prototype.toString.call(value) === "[object URL]";
var isRegularUrl = (value) => isUrl(value) && value.protocol !== "file:";
var isFilePathObject = (value) =>
  isPlainObject2(value) &&
  Object.keys(value).length > 0 &&
  Object.keys(value).every((key) => FILE_PATH_KEYS.has(key)) &&
  isFilePathString(value.file);
var FILE_PATH_KEYS = new Set(["file", "append"]);
var isFilePathString = (file) => typeof file === "string";
var isUnknownStdioString = (type, value) =>
  type === "native" && typeof value === "string" && !KNOWN_STDIO_STRINGS.has(value);
var KNOWN_STDIO_STRINGS = new Set(["ipc", "ignore", "inherit", "overlapped", "pipe"]);
var isReadableStream2 = (value) =>
  Object.prototype.toString.call(value) === "[object ReadableStream]";
var isWritableStream2 = (value) =>
  Object.prototype.toString.call(value) === "[object WritableStream]";
var isWebStream = (value) => isReadableStream2(value) || isWritableStream2(value);
var isTransformStream = (value) =>
  isReadableStream2(value?.readable) && isWritableStream2(value?.writable);
var isAsyncIterableObject = (value) =>
  isObject2(value) && typeof value[Symbol.asyncIterator] === "function";
var isIterableObject = (value) => isObject2(value) && typeof value[Symbol.iterator] === "function";
var isObject2 = (value) => typeof value === "object" && value !== null;
var TRANSFORM_TYPES = new Set(["generator", "asyncGenerator", "duplex", "webTransform"]);
var FILE_TYPES = new Set(["fileUrl", "filePath", "fileNumber"]);
var SPECIAL_DUPLICATE_TYPES_SYNC = new Set(["fileUrl", "filePath"]);
var SPECIAL_DUPLICATE_TYPES = new Set([...SPECIAL_DUPLICATE_TYPES_SYNC, "webStream", "nodeStream"]);
var FORBID_DUPLICATE_TYPES = new Set(["webTransform", "duplex"]);
var TYPE_TO_MESSAGE = {
  generator: "a generator",
  asyncGenerator: "an async generator",
  fileUrl: "a file URL",
  filePath: "a file path string",
  fileNumber: "a file descriptor number",
  webStream: "a web stream",
  nodeStream: "a Node.js stream",
  webTransform: "a web TransformStream",
  duplex: "a Duplex stream",
  native: "any value",
  iterable: "an iterable",
  asyncIterable: "an async iterable",
  string: "a string",
  uint8Array: "a Uint8Array",
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/object-mode.js
var getTransformObjectModes = (objectMode, index, newTransforms, direction) =>
  direction === "output"
    ? getOutputObjectModes(objectMode, index, newTransforms)
    : getInputObjectModes(objectMode, index, newTransforms);
var getOutputObjectModes = (objectMode, index, newTransforms) => {
  const writableObjectMode = index !== 0 && newTransforms[index - 1].value.readableObjectMode;
  const readableObjectMode = objectMode ?? writableObjectMode;
  return { writableObjectMode, readableObjectMode };
};
var getInputObjectModes = (objectMode, index, newTransforms) => {
  const writableObjectMode =
    index === 0 ? objectMode === true : newTransforms[index - 1].value.readableObjectMode;
  const readableObjectMode =
    index !== newTransforms.length - 1 && (objectMode ?? writableObjectMode);
  return { writableObjectMode, readableObjectMode };
};
var getFdObjectMode = (stdioItems, direction) => {
  const lastTransform = stdioItems.findLast(({ type }) => TRANSFORM_TYPES.has(type));
  if (lastTransform === undefined) {
    return false;
  }
  return direction === "input"
    ? lastTransform.value.writableObjectMode
    : lastTransform.value.readableObjectMode;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/normalize.js
var normalizeTransforms = (stdioItems, optionName, direction, options) => [
  ...stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type)),
  ...getTransforms(stdioItems, optionName, direction, options),
];
var getTransforms = (stdioItems, optionName, direction, { encoding }) => {
  const transforms = stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type));
  const newTransforms = Array.from({ length: transforms.length });
  for (const [index, stdioItem] of Object.entries(transforms)) {
    newTransforms[index] = normalizeTransform({
      stdioItem,
      index: Number(index),
      newTransforms,
      optionName,
      direction,
      encoding,
    });
  }
  return sortTransforms(newTransforms, direction);
};
var normalizeTransform = ({
  stdioItem,
  stdioItem: { type },
  index,
  newTransforms,
  optionName,
  direction,
  encoding,
}) => {
  if (type === "duplex") {
    return normalizeDuplex({ stdioItem, optionName });
  }
  if (type === "webTransform") {
    return normalizeTransformStream({
      stdioItem,
      index,
      newTransforms,
      direction,
    });
  }
  return normalizeGenerator({
    stdioItem,
    index,
    newTransforms,
    direction,
    encoding,
  });
};
var normalizeDuplex = ({
  stdioItem,
  stdioItem: {
    value: {
      transform,
      transform: { writableObjectMode, readableObjectMode },
      objectMode = readableObjectMode,
    },
  },
  optionName,
}) => {
  if (objectMode && !readableObjectMode) {
    throw new TypeError(
      `The \`${optionName}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`,
    );
  }
  if (!objectMode && readableObjectMode) {
    throw new TypeError(
      `The \`${optionName}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`,
    );
  }
  return {
    ...stdioItem,
    value: { transform, writableObjectMode, readableObjectMode },
  };
};
var normalizeTransformStream = ({
  stdioItem,
  stdioItem: { value },
  index,
  newTransforms,
  direction,
}) => {
  const { transform, objectMode } = isPlainObject2(value) ? value : { transform: value };
  const { writableObjectMode, readableObjectMode } = getTransformObjectModes(
    objectMode,
    index,
    newTransforms,
    direction,
  );
  return {
    ...stdioItem,
    value: { transform, writableObjectMode, readableObjectMode },
  };
};
var normalizeGenerator = ({
  stdioItem,
  stdioItem: { value },
  index,
  newTransforms,
  direction,
  encoding,
}) => {
  const {
    transform,
    final,
    binary: binaryOption = false,
    preserveNewlines = false,
    objectMode,
  } = isPlainObject2(value) ? value : { transform: value };
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const { writableObjectMode, readableObjectMode } = getTransformObjectModes(
    objectMode,
    index,
    newTransforms,
    direction,
  );
  return {
    ...stdioItem,
    value: {
      transform,
      final,
      binary,
      preserveNewlines,
      writableObjectMode,
      readableObjectMode,
    },
  };
};
var sortTransforms = (newTransforms, direction) =>
  direction === "input" ? newTransforms.reverse() : newTransforms;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/direction.js
import process8 from "node:process";
var getStreamDirection = (stdioItems, fdNumber, optionName) => {
  const directions = stdioItems.map((stdioItem) => getStdioItemDirection(stdioItem, fdNumber));
  if (directions.includes("input") && directions.includes("output")) {
    throw new TypeError(
      `The \`${optionName}\` option must not be an array of both readable and writable values.`,
    );
  }
  return directions.find(Boolean) ?? DEFAULT_DIRECTION;
};
var getStdioItemDirection = ({ type, value }, fdNumber) =>
  KNOWN_DIRECTIONS[fdNumber] ?? guessStreamDirection[type](value);
var KNOWN_DIRECTIONS = ["input", "output", "output"];
var anyDirection = () => {
  return;
};
var alwaysInput = () => "input";
var guessStreamDirection = {
  generator: anyDirection,
  asyncGenerator: anyDirection,
  fileUrl: anyDirection,
  filePath: anyDirection,
  iterable: alwaysInput,
  asyncIterable: alwaysInput,
  uint8Array: alwaysInput,
  webStream: (value) => (isWritableStream2(value) ? "output" : "input"),
  nodeStream(value) {
    if (!isReadableStream(value, { checkOpen: false })) {
      return "output";
    }
    return isWritableStream(value, { checkOpen: false }) ? undefined : "input";
  },
  webTransform: anyDirection,
  duplex: anyDirection,
  native(value) {
    const standardStreamDirection = getStandardStreamDirection(value);
    if (standardStreamDirection !== undefined) {
      return standardStreamDirection;
    }
    if (isStream(value, { checkOpen: false })) {
      return guessStreamDirection.nodeStream(value);
    }
  },
};
var getStandardStreamDirection = (value) => {
  if ([0, process8.stdin].includes(value)) {
    return "input";
  }
  if ([1, 2, process8.stdout, process8.stderr].includes(value)) {
    return "output";
  }
};
var DEFAULT_DIRECTION = "output";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/array.js
var normalizeIpcStdioArray = (stdioArray, ipc) =>
  ipc && !stdioArray.includes("ipc") ? [...stdioArray, "ipc"] : stdioArray;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/stdio-option.js
var normalizeStdioOption = ({ stdio, ipc, buffer, ...options }, verboseInfo, isSync) => {
  const stdioArray = getStdioArray(stdio, options).map((stdioOption, fdNumber) =>
    addDefaultValue2(stdioOption, fdNumber),
  );
  return isSync
    ? normalizeStdioSync(stdioArray, buffer, verboseInfo)
    : normalizeIpcStdioArray(stdioArray, ipc);
};
var getStdioArray = (stdio, options) => {
  if (stdio === undefined) {
    return STANDARD_STREAMS_ALIASES.map((alias) => options[alias]);
  }
  if (hasAlias(options)) {
    throw new Error(
      `It's not possible to provide \`stdio\` in combination with one of ${STANDARD_STREAMS_ALIASES.map((alias) => `\`${alias}\``).join(", ")}`,
    );
  }
  if (typeof stdio === "string") {
    return [stdio, stdio, stdio];
  }
  if (!Array.isArray(stdio)) {
    throw new TypeError(
      `Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``,
    );
  }
  const length = Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length);
  return Array.from({ length }, (_, fdNumber) => stdio[fdNumber]);
};
var hasAlias = (options) => STANDARD_STREAMS_ALIASES.some((alias) => options[alias] !== undefined);
var addDefaultValue2 = (stdioOption, fdNumber) => {
  if (Array.isArray(stdioOption)) {
    return stdioOption.map((item) => addDefaultValue2(item, fdNumber));
  }
  if (stdioOption === null || stdioOption === undefined) {
    return fdNumber >= STANDARD_STREAMS_ALIASES.length ? "ignore" : "pipe";
  }
  return stdioOption;
};
var normalizeStdioSync = (stdioArray, buffer, verboseInfo) =>
  stdioArray.map((stdioOption, fdNumber) =>
    !buffer[fdNumber] &&
    fdNumber !== 0 &&
    !isFullVerbose(verboseInfo, fdNumber) &&
    isOutputPipeOnly(stdioOption)
      ? "ignore"
      : stdioOption,
  );
var isOutputPipeOnly = (stdioOption) =>
  stdioOption === "pipe" ||
  (Array.isArray(stdioOption) && stdioOption.every((item) => item === "pipe"));

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/native.js
import { readFileSync } from "node:fs";
import tty2 from "node:tty";
var handleNativeStream = ({
  stdioItem,
  stdioItem: { type },
  isStdioArray,
  fdNumber,
  direction,
  isSync,
}) => {
  if (!isStdioArray || type !== "native") {
    return stdioItem;
  }
  return isSync
    ? handleNativeStreamSync({ stdioItem, fdNumber, direction })
    : handleNativeStreamAsync({ stdioItem, fdNumber });
};
var handleNativeStreamSync = ({
  stdioItem,
  stdioItem: { value, optionName },
  fdNumber,
  direction,
}) => {
  const targetFd = getTargetFd({
    value,
    optionName,
    fdNumber,
    direction,
  });
  if (targetFd !== undefined) {
    return targetFd;
  }
  if (isStream(value, { checkOpen: false })) {
    throw new TypeError(
      `The \`${optionName}: Stream\` option cannot both be an array and include a stream with synchronous methods.`,
    );
  }
  return stdioItem;
};
var getTargetFd = ({ value, optionName, fdNumber, direction }) => {
  const targetFdNumber = getTargetFdNumber(value, fdNumber);
  if (targetFdNumber === undefined) {
    return;
  }
  if (direction === "output") {
    return { type: "fileNumber", value: targetFdNumber, optionName };
  }
  if (tty2.isatty(targetFdNumber)) {
    throw new TypeError(
      `The \`${optionName}: ${serializeOptionValue(value)}\` option is invalid: it cannot be a TTY with synchronous methods.`,
    );
  }
  return {
    type: "uint8Array",
    value: bufferToUint8Array(readFileSync(targetFdNumber)),
    optionName,
  };
};
var getTargetFdNumber = (value, fdNumber) => {
  if (value === "inherit") {
    return fdNumber;
  }
  if (typeof value === "number") {
    return value;
  }
  const standardStreamIndex = STANDARD_STREAMS.indexOf(value);
  if (standardStreamIndex !== -1) {
    return standardStreamIndex;
  }
};
var handleNativeStreamAsync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber }) => {
  if (value === "inherit") {
    return {
      type: "nodeStream",
      value: getStandardStream(fdNumber, value, optionName),
      optionName,
    };
  }
  if (typeof value === "number") {
    return { type: "nodeStream", value: getStandardStream(value, value, optionName), optionName };
  }
  if (isStream(value, { checkOpen: false })) {
    return { type: "nodeStream", value, optionName };
  }
  return stdioItem;
};
var getStandardStream = (fdNumber, value, optionName) => {
  const standardStream = STANDARD_STREAMS[fdNumber];
  if (standardStream === undefined) {
    throw new TypeError(
      `The \`${optionName}: ${value}\` option is invalid: no such standard stream.`,
    );
  }
  return standardStream;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/input-option.js
var handleInputOptions = ({ input, inputFile }, fdNumber) =>
  fdNumber === 0 ? [...handleInputOption(input), ...handleInputFileOption(inputFile)] : [];
var handleInputOption = (input) =>
  input === undefined
    ? []
    : [
        {
          type: getInputType(input),
          value: input,
          optionName: "input",
        },
      ];
var getInputType = (input) => {
  if (isReadableStream(input, { checkOpen: false })) {
    return "nodeStream";
  }
  if (typeof input === "string") {
    return "string";
  }
  if (isUint8Array(input)) {
    return "uint8Array";
  }
  throw new Error(
    "The `input` option must be a string, a Uint8Array or a Node.js Readable stream.",
  );
};
var handleInputFileOption = (inputFile) =>
  inputFile === undefined
    ? []
    : [
        {
          ...getInputFileType(inputFile),
          optionName: "inputFile",
        },
      ];
var getInputFileType = (inputFile) => {
  if (isUrl(inputFile)) {
    return { type: "fileUrl", value: inputFile };
  }
  if (isFilePathString(inputFile)) {
    return { type: "filePath", value: { file: inputFile } };
  }
  throw new Error("The `inputFile` option must be a file path string or a file URL.");
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/duplicate.js
var filterDuplicates = (stdioItems) =>
  stdioItems.filter((stdioItemOne, indexOne) =>
    stdioItems.every(
      (stdioItemTwo, indexTwo) =>
        stdioItemOne.value !== stdioItemTwo.value ||
        indexOne >= indexTwo ||
        stdioItemOne.type === "generator" ||
        stdioItemOne.type === "asyncGenerator",
    ),
  );
var getDuplicateStream = ({
  stdioItem: { type, value, optionName },
  direction,
  fileDescriptors,
  isSync,
}) => {
  const otherStdioItems = getOtherStdioItems(fileDescriptors, type);
  if (otherStdioItems.length === 0) {
    return;
  }
  if (isSync) {
    validateDuplicateStreamSync({
      otherStdioItems,
      type,
      value,
      optionName,
      direction,
    });
    return;
  }
  if (SPECIAL_DUPLICATE_TYPES.has(type)) {
    return getDuplicateStreamInstance({
      otherStdioItems,
      type,
      value,
      optionName,
      direction,
    });
  }
  if (FORBID_DUPLICATE_TYPES.has(type)) {
    validateDuplicateTransform({
      otherStdioItems,
      type,
      value,
      optionName,
    });
  }
};
var getOtherStdioItems = (fileDescriptors, type) =>
  fileDescriptors.flatMap(({ direction, stdioItems }) =>
    stdioItems
      .filter((stdioItem) => stdioItem.type === type)
      .map((stdioItem) => ({ ...stdioItem, direction })),
  );
var validateDuplicateStreamSync = ({ otherStdioItems, type, value, optionName, direction }) => {
  if (SPECIAL_DUPLICATE_TYPES_SYNC.has(type)) {
    getDuplicateStreamInstance({
      otherStdioItems,
      type,
      value,
      optionName,
      direction,
    });
  }
};
var getDuplicateStreamInstance = ({ otherStdioItems, type, value, optionName, direction }) => {
  const duplicateStdioItems = otherStdioItems.filter((stdioItem) => hasSameValue(stdioItem, value));
  if (duplicateStdioItems.length === 0) {
    return;
  }
  const differentStdioItem = duplicateStdioItems.find(
    (stdioItem) => stdioItem.direction !== direction,
  );
  throwOnDuplicateStream(differentStdioItem, optionName, type);
  return direction === "output" ? duplicateStdioItems[0].stream : undefined;
};
var hasSameValue = ({ type, value }, secondValue) => {
  if (type === "filePath") {
    return value.file === secondValue.file;
  }
  if (type === "fileUrl") {
    return value.href === secondValue.href;
  }
  return value === secondValue;
};
var validateDuplicateTransform = ({ otherStdioItems, type, value, optionName }) => {
  const duplicateStdioItem = otherStdioItems.find(
    ({ value: { transform } }) => transform === value.transform,
  );
  throwOnDuplicateStream(duplicateStdioItem, optionName, type);
};
var throwOnDuplicateStream = (stdioItem, optionName, type) => {
  if (stdioItem !== undefined) {
    throw new TypeError(
      `The \`${stdioItem.optionName}\` and \`${optionName}\` options must not target ${TYPE_TO_MESSAGE[type]} that is the same.`,
    );
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/handle.js
var handleStdio = (addProperties, options, verboseInfo, isSync) => {
  const stdio = normalizeStdioOption(options, verboseInfo, isSync);
  const initialFileDescriptors = stdio.map((stdioOption, fdNumber) =>
    getFileDescriptor({
      stdioOption,
      fdNumber,
      options,
      isSync,
    }),
  );
  const fileDescriptors = getFinalFileDescriptors({
    initialFileDescriptors,
    addProperties,
    options,
    isSync,
  });
  options.stdio = fileDescriptors.map(({ stdioItems }) => forwardStdio(stdioItems));
  return fileDescriptors;
};
var getFileDescriptor = ({ stdioOption, fdNumber, options, isSync }) => {
  const optionName = getStreamName(fdNumber);
  const { stdioItems: initialStdioItems, isStdioArray } = initializeStdioItems({
    stdioOption,
    fdNumber,
    options,
    optionName,
  });
  const direction = getStreamDirection(initialStdioItems, fdNumber, optionName);
  const stdioItems = initialStdioItems.map((stdioItem) =>
    handleNativeStream({
      stdioItem,
      isStdioArray,
      fdNumber,
      direction,
      isSync,
    }),
  );
  const normalizedStdioItems = normalizeTransforms(stdioItems, optionName, direction, options);
  const objectMode = getFdObjectMode(normalizedStdioItems, direction);
  validateFileObjectMode(normalizedStdioItems, objectMode);
  return { direction, objectMode, stdioItems: normalizedStdioItems };
};
var initializeStdioItems = ({ stdioOption, fdNumber, options, optionName }) => {
  const values = Array.isArray(stdioOption) ? stdioOption : [stdioOption];
  const initialStdioItems = [
    ...values.map((value) => initializeStdioItem(value, optionName)),
    ...handleInputOptions(options, fdNumber),
  ];
  const stdioItems = filterDuplicates(initialStdioItems);
  const isStdioArray = stdioItems.length > 1;
  validateStdioArray(stdioItems, isStdioArray, optionName);
  validateStreams(stdioItems);
  return { stdioItems, isStdioArray };
};
var initializeStdioItem = (value, optionName) => ({
  type: getStdioItemType(value, optionName),
  value,
  optionName,
});
var validateStdioArray = (stdioItems, isStdioArray, optionName) => {
  if (stdioItems.length === 0) {
    throw new TypeError(`The \`${optionName}\` option must not be an empty array.`);
  }
  if (!isStdioArray) {
    return;
  }
  for (const { value, optionName } of stdioItems) {
    if (INVALID_STDIO_ARRAY_OPTIONS.has(value)) {
      throw new Error(`The \`${optionName}\` option must not include \`${value}\`.`);
    }
  }
};
var INVALID_STDIO_ARRAY_OPTIONS = new Set(["ignore", "ipc"]);
var validateStreams = (stdioItems) => {
  for (const stdioItem of stdioItems) {
    validateFileStdio(stdioItem);
  }
};
var validateFileStdio = ({ type, value, optionName }) => {
  if (isRegularUrl(value)) {
    throw new TypeError(`The \`${optionName}: URL\` option must use the \`file:\` scheme.
For example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`);
  }
  if (isUnknownStdioString(type, value)) {
    throw new TypeError(
      `The \`${optionName}: { file: '...' }\` option must be used instead of \`${optionName}: '...'\`.`,
    );
  }
};
var validateFileObjectMode = (stdioItems, objectMode) => {
  if (!objectMode) {
    return;
  }
  const fileStdioItem = stdioItems.find(({ type }) => FILE_TYPES.has(type));
  if (fileStdioItem !== undefined) {
    throw new TypeError(
      `The \`${fileStdioItem.optionName}\` option cannot use both files and transforms in objectMode.`,
    );
  }
};
var getFinalFileDescriptors = ({ initialFileDescriptors, addProperties, options, isSync }) => {
  const fileDescriptors = [];
  try {
    for (const fileDescriptor of initialFileDescriptors) {
      fileDescriptors.push(
        getFinalFileDescriptor({
          fileDescriptor,
          fileDescriptors,
          addProperties,
          options,
          isSync,
        }),
      );
    }
    return fileDescriptors;
  } catch (error) {
    cleanupCustomStreams(fileDescriptors);
    throw error;
  }
};
var getFinalFileDescriptor = ({
  fileDescriptor: { direction, objectMode, stdioItems },
  fileDescriptors,
  addProperties,
  options,
  isSync,
}) => {
  const finalStdioItems = stdioItems.map((stdioItem) =>
    addStreamProperties({
      stdioItem,
      addProperties,
      direction,
      options,
      fileDescriptors,
      isSync,
    }),
  );
  return { direction, objectMode, stdioItems: finalStdioItems };
};
var addStreamProperties = ({
  stdioItem,
  addProperties,
  direction,
  options,
  fileDescriptors,
  isSync,
}) => {
  const duplicateStream = getDuplicateStream({
    stdioItem,
    direction,
    fileDescriptors,
    isSync,
  });
  if (duplicateStream !== undefined) {
    return { ...stdioItem, stream: duplicateStream };
  }
  return {
    ...stdioItem,
    ...addProperties[direction][stdioItem.type](stdioItem, options),
  };
};
var cleanupCustomStreams = (fileDescriptors) => {
  for (const { stdioItems } of fileDescriptors) {
    for (const { stream } of stdioItems) {
      if (stream !== undefined && !isStandardStream(stream)) {
        stream.destroy();
      }
    }
  }
};
var forwardStdio = (stdioItems) => {
  if (stdioItems.length > 1) {
    return stdioItems.some(({ value }) => value === "overlapped") ? "overlapped" : "pipe";
  }
  const [{ type, value }] = stdioItems;
  return type === "native" ? value : "pipe";
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/handle-sync.js
var handleStdioSync = (options, verboseInfo) =>
  handleStdio(addPropertiesSync, options, verboseInfo, true);
var forbiddenIfSync = ({ type, optionName }) => {
  throwInvalidSyncValue(optionName, TYPE_TO_MESSAGE[type]);
};
var forbiddenNativeIfSync = ({ optionName, value }) => {
  if (value === "ipc" || value === "overlapped") {
    throwInvalidSyncValue(optionName, `"${value}"`);
  }
  return {};
};
var throwInvalidSyncValue = (optionName, value) => {
  throw new TypeError(`The \`${optionName}\` option cannot be ${value} with synchronous methods.`);
};
var addProperties = {
  generator() {},
  asyncGenerator: forbiddenIfSync,
  webStream: forbiddenIfSync,
  nodeStream: forbiddenIfSync,
  webTransform: forbiddenIfSync,
  duplex: forbiddenIfSync,
  asyncIterable: forbiddenIfSync,
  native: forbiddenNativeIfSync,
};
var addPropertiesSync = {
  input: {
    ...addProperties,
    fileUrl: ({ value }) => ({ contents: [bufferToUint8Array(readFileSync2(value))] }),
    filePath: ({ value: { file } }) => ({ contents: [bufferToUint8Array(readFileSync2(file))] }),
    fileNumber: forbiddenIfSync,
    iterable: ({ value }) => ({ contents: [...value] }),
    string: ({ value }) => ({ contents: [value] }),
    uint8Array: ({ value }) => ({ contents: [value] }),
  },
  output: {
    ...addProperties,
    fileUrl: ({ value }) => ({ path: value }),
    filePath: ({ value: { file, append } }) => ({ path: file, append }),
    fileNumber: ({ value }) => ({ path: value }),
    iterable: forbiddenIfSync,
    string: forbiddenIfSync,
    uint8Array: forbiddenIfSync,
  },
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/strip-newline.js
var stripNewline = (value, { stripFinalNewline: stripFinalNewline2 }, fdNumber) =>
  getStripFinalNewline(stripFinalNewline2, fdNumber) && value !== undefined && !Array.isArray(value)
    ? stripFinalNewline(value)
    : value;
var getStripFinalNewline = (stripFinalNewline, fdNumber) =>
  fdNumber === "all" ? stripFinalNewline[1] || stripFinalNewline[2] : stripFinalNewline[fdNumber];

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/generator.js
import { Transform, getDefaultHighWaterMark } from "node:stream";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/split.js
var getSplitLinesGenerator = (binary, preserveNewlines, skipped, state) =>
  binary || skipped ? undefined : initializeSplitLines(preserveNewlines, state);
var splitLinesSync = (chunk, preserveNewlines, objectMode) =>
  objectMode
    ? chunk.flatMap((item) => splitLinesItemSync(item, preserveNewlines))
    : splitLinesItemSync(chunk, preserveNewlines);
var splitLinesItemSync = (chunk, preserveNewlines) => {
  const { transform, final } = initializeSplitLines(preserveNewlines, {});
  return [...transform(chunk), ...final()];
};
var initializeSplitLines = (preserveNewlines, state) => {
  state.previousChunks = "";
  return {
    transform: splitGenerator.bind(undefined, state, preserveNewlines),
    final: linesFinal.bind(undefined, state),
  };
};
var splitGenerator = function* (state, preserveNewlines, chunk) {
  if (typeof chunk !== "string") {
    yield chunk;
    return;
  }
  let { previousChunks } = state;
  let start = -1;
  for (let end = 0; end < chunk.length; end += 1) {
    if (
      chunk[end] ===
      `
`
    ) {
      const newlineLength = getNewlineLength(chunk, end, preserveNewlines, state);
      let line = chunk.slice(start + 1, end + 1 - newlineLength);
      if (previousChunks.length > 0) {
        line = concatString(previousChunks, line);
        previousChunks = "";
      }
      yield line;
      start = end;
    }
  }
  if (start !== chunk.length - 1) {
    previousChunks = concatString(previousChunks, chunk.slice(start + 1));
  }
  state.previousChunks = previousChunks;
};
var getNewlineLength = (chunk, end, preserveNewlines, state) => {
  if (preserveNewlines) {
    return 0;
  }
  state.isWindowsNewline = end !== 0 && chunk[end - 1] === "\r";
  return state.isWindowsNewline ? 2 : 1;
};
var linesFinal = function* ({ previousChunks }) {
  if (previousChunks.length > 0) {
    yield previousChunks;
  }
};
var getAppendNewlineGenerator = ({ binary, preserveNewlines, readableObjectMode, state }) =>
  binary || preserveNewlines || readableObjectMode
    ? undefined
    : { transform: appendNewlineGenerator.bind(undefined, state) };
var appendNewlineGenerator = function* ({ isWindowsNewline = false }, chunk) {
  const { unixNewline, windowsNewline, LF, concatBytes } =
    typeof chunk === "string" ? linesStringInfo : linesUint8ArrayInfo;
  if (chunk.at(-1) === LF) {
    yield chunk;
    return;
  }
  const newline = isWindowsNewline ? windowsNewline : unixNewline;
  yield concatBytes(chunk, newline);
};
var concatString = (firstChunk, secondChunk) => `${firstChunk}${secondChunk}`;
var linesStringInfo = {
  windowsNewline: `\r
`,
  unixNewline: `
`,
  LF: `
`,
  concatBytes: concatString,
};
var concatUint8Array = (firstChunk, secondChunk) => {
  const chunk = new Uint8Array(firstChunk.length + secondChunk.length);
  chunk.set(firstChunk, 0);
  chunk.set(secondChunk, firstChunk.length);
  return chunk;
};
var linesUint8ArrayInfo = {
  windowsNewline: new Uint8Array([13, 10]),
  unixNewline: new Uint8Array([10]),
  LF: 10,
  concatBytes: concatUint8Array,
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/validate.js
import { Buffer as Buffer2 } from "node:buffer";
var getValidateTransformInput = (writableObjectMode, optionName) =>
  writableObjectMode ? undefined : validateStringTransformInput.bind(undefined, optionName);
var validateStringTransformInput = function* (optionName, chunk) {
  if (typeof chunk !== "string" && !isUint8Array(chunk) && !Buffer2.isBuffer(chunk)) {
    throw new TypeError(
      `The \`${optionName}\` option's transform must use "objectMode: true" to receive as input: ${typeof chunk}.`,
    );
  }
  yield chunk;
};
var getValidateTransformReturn = (readableObjectMode, optionName) =>
  readableObjectMode
    ? validateObjectTransformReturn.bind(undefined, optionName)
    : validateStringTransformReturn.bind(undefined, optionName);
var validateObjectTransformReturn = function* (optionName, chunk) {
  validateEmptyReturn(optionName, chunk);
  yield chunk;
};
var validateStringTransformReturn = function* (optionName, chunk) {
  validateEmptyReturn(optionName, chunk);
  if (typeof chunk !== "string" && !isUint8Array(chunk)) {
    throw new TypeError(
      `The \`${optionName}\` option's function must yield a string or an Uint8Array, not ${typeof chunk}.`,
    );
  }
  yield chunk;
};
var validateEmptyReturn = (optionName, chunk) => {
  if (chunk === null || chunk === undefined) {
    throw new TypeError(`The \`${optionName}\` option's function must not call \`yield ${chunk}\`.
Instead, \`yield\` should either be called with a value, or not be called at all. For example:
  if (condition) { yield value; }`);
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/encoding-transform.js
import { Buffer as Buffer3 } from "node:buffer";
import { StringDecoder as StringDecoder2 } from "node:string_decoder";
var getEncodingTransformGenerator = (binary, encoding, skipped) => {
  if (skipped) {
    return;
  }
  if (binary) {
    return { transform: encodingUint8ArrayGenerator.bind(undefined, new TextEncoder()) };
  }
  const stringDecoder = new StringDecoder2(encoding);
  return {
    transform: encodingStringGenerator.bind(undefined, stringDecoder),
    final: encodingStringFinal.bind(undefined, stringDecoder),
  };
};
var encodingUint8ArrayGenerator = function* (textEncoder, chunk) {
  if (Buffer3.isBuffer(chunk)) {
    yield bufferToUint8Array(chunk);
  } else if (typeof chunk === "string") {
    yield textEncoder.encode(chunk);
  } else {
    yield chunk;
  }
};
var encodingStringGenerator = function* (stringDecoder, chunk) {
  yield isUint8Array(chunk) ? stringDecoder.write(chunk) : chunk;
};
var encodingStringFinal = function* (stringDecoder) {
  const lastChunk = stringDecoder.end();
  if (lastChunk !== "") {
    yield lastChunk;
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/run-async.js
import { callbackify } from "node:util";
var pushChunks = callbackify(async (getChunks, state, getChunksArguments, transformStream) => {
  state.currentIterable = getChunks(...getChunksArguments);
  try {
    for await (const chunk of state.currentIterable) {
      transformStream.push(chunk);
    }
  } finally {
    delete state.currentIterable;
  }
});
var transformChunk = async function* (chunk, generators, index) {
  if (index === generators.length) {
    yield chunk;
    return;
  }
  const { transform = identityGenerator } = generators[index];
  for await (const transformedChunk of transform(chunk)) {
    yield* transformChunk(transformedChunk, generators, index + 1);
  }
};
var finalChunks = async function* (generators) {
  for (const [index, { final }] of Object.entries(generators)) {
    yield* generatorFinalChunks(final, Number(index), generators);
  }
};
var generatorFinalChunks = async function* (final, index, generators) {
  if (final === undefined) {
    return;
  }
  for await (const finalChunk of final()) {
    yield* transformChunk(finalChunk, generators, index + 1);
  }
};
var destroyTransform = callbackify(async ({ currentIterable }, error) => {
  if (currentIterable !== undefined) {
    await (error ? currentIterable.throw(error) : currentIterable.return());
    return;
  }
  if (error) {
    throw error;
  }
});
var identityGenerator = function* (chunk) {
  yield chunk;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/run-sync.js
var pushChunksSync = (getChunksSync, getChunksArguments, transformStream, done) => {
  try {
    for (const chunk of getChunksSync(...getChunksArguments)) {
      transformStream.push(chunk);
    }
    done();
  } catch (error) {
    done(error);
  }
};
var runTransformSync = (generators, chunks) => [
  ...chunks.flatMap((chunk) => [...transformChunkSync(chunk, generators, 0)]),
  ...finalChunksSync(generators),
];
var transformChunkSync = function* (chunk, generators, index) {
  if (index === generators.length) {
    yield chunk;
    return;
  }
  const { transform = identityGenerator2 } = generators[index];
  for (const transformedChunk of transform(chunk)) {
    yield* transformChunkSync(transformedChunk, generators, index + 1);
  }
};
var finalChunksSync = function* (generators) {
  for (const [index, { final }] of Object.entries(generators)) {
    yield* generatorFinalChunksSync(final, Number(index), generators);
  }
};
var generatorFinalChunksSync = function* (final, index, generators) {
  if (final === undefined) {
    return;
  }
  for (const finalChunk of final()) {
    yield* transformChunkSync(finalChunk, generators, index + 1);
  }
};
var identityGenerator2 = function* (chunk) {
  yield chunk;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/transform/generator.js
var generatorToStream = (
  { value, value: { transform, final, writableObjectMode, readableObjectMode }, optionName },
  { encoding },
) => {
  const state = {};
  const generators = addInternalGenerators(value, encoding, optionName);
  const transformAsync = isAsyncGenerator(transform);
  const finalAsync = isAsyncGenerator(final);
  const transformMethod = transformAsync
    ? pushChunks.bind(undefined, transformChunk, state)
    : pushChunksSync.bind(undefined, transformChunkSync);
  const finalMethod =
    transformAsync || finalAsync
      ? pushChunks.bind(undefined, finalChunks, state)
      : pushChunksSync.bind(undefined, finalChunksSync);
  const destroyMethod =
    transformAsync || finalAsync ? destroyTransform.bind(undefined, state) : undefined;
  const stream = new Transform({
    writableObjectMode,
    writableHighWaterMark: getDefaultHighWaterMark(writableObjectMode),
    readableObjectMode,
    readableHighWaterMark: getDefaultHighWaterMark(readableObjectMode),
    transform(chunk, encoding, done) {
      transformMethod([chunk, generators, 0], this, done);
    },
    flush(done) {
      finalMethod([generators], this, done);
    },
    destroy: destroyMethod,
  });
  return { stream };
};
var runGeneratorsSync = (chunks, stdioItems, encoding, isInput) => {
  const generators = stdioItems.filter(({ type }) => type === "generator");
  const reversedGenerators = isInput ? generators.reverse() : generators;
  for (const { value, optionName } of reversedGenerators) {
    const generators = addInternalGenerators(value, encoding, optionName);
    chunks = runTransformSync(generators, chunks);
  }
  return chunks;
};
var addInternalGenerators = (
  { transform, final, binary, writableObjectMode, readableObjectMode, preserveNewlines },
  encoding,
  optionName,
) => {
  const state = {};
  return [
    { transform: getValidateTransformInput(writableObjectMode, optionName) },
    getEncodingTransformGenerator(binary, encoding, writableObjectMode),
    getSplitLinesGenerator(binary, preserveNewlines, writableObjectMode, state),
    { transform, final },
    { transform: getValidateTransformReturn(readableObjectMode, optionName) },
    getAppendNewlineGenerator({
      binary,
      preserveNewlines,
      readableObjectMode,
      state,
    }),
  ].filter(Boolean);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/input-sync.js
var addInputOptionsSync = (fileDescriptors, options) => {
  for (const fdNumber of getInputFdNumbers(fileDescriptors)) {
    addInputOptionSync(fileDescriptors, fdNumber, options);
  }
};
var getInputFdNumbers = (fileDescriptors) =>
  new Set(
    Object.entries(fileDescriptors)
      .filter(([, { direction }]) => direction === "input")
      .map(([fdNumber]) => Number(fdNumber)),
  );
var addInputOptionSync = (fileDescriptors, fdNumber, options) => {
  const { stdioItems } = fileDescriptors[fdNumber];
  const allStdioItems = stdioItems.filter(({ contents }) => contents !== undefined);
  if (allStdioItems.length === 0) {
    return;
  }
  if (fdNumber !== 0) {
    const [{ type, optionName }] = allStdioItems;
    throw new TypeError(
      `Only the \`stdin\` option, not \`${optionName}\`, can be ${TYPE_TO_MESSAGE[type]} with synchronous methods.`,
    );
  }
  const allContents = allStdioItems.map(({ contents }) => contents);
  const transformedContents = allContents.map((contents) =>
    applySingleInputGeneratorsSync(contents, stdioItems),
  );
  options.input = joinToUint8Array(transformedContents);
};
var applySingleInputGeneratorsSync = (contents, stdioItems) => {
  const newContents = runGeneratorsSync(contents, stdioItems, "utf8", true);
  validateSerializable(newContents);
  return joinToUint8Array(newContents);
};
var validateSerializable = (newContents) => {
  const invalidItem = newContents.find((item) => typeof item !== "string" && !isUint8Array(item));
  if (invalidItem !== undefined) {
    throw new TypeError(
      `The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${invalidItem}.`,
    );
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/output-sync.js
import { writeFileSync, appendFileSync } from "node:fs";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/output.js
var shouldLogOutput = ({ stdioItems, encoding, verboseInfo, fdNumber }) =>
  fdNumber !== "all" &&
  isFullVerbose(verboseInfo, fdNumber) &&
  !BINARY_ENCODINGS.has(encoding) &&
  fdUsesVerbose(fdNumber) &&
  (stdioItems.some(({ type, value }) => type === "native" && PIPED_STDIO_VALUES.has(value)) ||
    stdioItems.every(({ type }) => TRANSFORM_TYPES.has(type)));
var fdUsesVerbose = (fdNumber) => fdNumber === 1 || fdNumber === 2;
var PIPED_STDIO_VALUES = new Set(["pipe", "overlapped"]);
var logLines = async (linesIterable, stream, fdNumber, verboseInfo) => {
  for await (const line of linesIterable) {
    if (!isPipingStream(stream)) {
      logLine(line, fdNumber, verboseInfo);
    }
  }
};
var logLinesSync = (linesArray, fdNumber, verboseInfo) => {
  for (const line of linesArray) {
    logLine(line, fdNumber, verboseInfo);
  }
};
var isPipingStream = (stream) => stream._readableState.pipes.length > 0;
var logLine = (line, fdNumber, verboseInfo) => {
  const verboseMessage = serializeVerboseMessage(line);
  verboseLog({
    type: "output",
    verboseMessage,
    fdNumber,
    verboseInfo,
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/output-sync.js
var transformOutputSync = ({
  fileDescriptors,
  syncResult: { output },
  options,
  isMaxBuffer,
  verboseInfo,
}) => {
  if (output === null) {
    return { output: Array.from({ length: 3 }) };
  }
  const state = {};
  const outputFiles = new Set([]);
  const transformedOutput = output.map((result, fdNumber) =>
    transformOutputResultSync(
      {
        result,
        fileDescriptors,
        fdNumber,
        state,
        outputFiles,
        isMaxBuffer,
        verboseInfo,
      },
      options,
    ),
  );
  return { output: transformedOutput, ...state };
};
var transformOutputResultSync = (
  { result, fileDescriptors, fdNumber, state, outputFiles, isMaxBuffer, verboseInfo },
  { buffer, encoding, lines, stripFinalNewline, maxBuffer },
) => {
  if (result === null) {
    return;
  }
  const truncatedResult = truncateMaxBufferSync(result, isMaxBuffer, maxBuffer);
  const uint8ArrayResult = bufferToUint8Array(truncatedResult);
  const { stdioItems, objectMode } = fileDescriptors[fdNumber];
  const chunks = runOutputGeneratorsSync([uint8ArrayResult], stdioItems, encoding, state);
  const { serializedResult, finalResult = serializedResult } = serializeChunks({
    chunks,
    objectMode,
    encoding,
    lines,
    stripFinalNewline,
    fdNumber,
  });
  logOutputSync({
    serializedResult,
    fdNumber,
    state,
    verboseInfo,
    encoding,
    stdioItems,
    objectMode,
  });
  const returnedResult = buffer[fdNumber] ? finalResult : undefined;
  try {
    if (state.error === undefined) {
      writeToFiles(serializedResult, stdioItems, outputFiles);
    }
    return returnedResult;
  } catch (error) {
    state.error = error;
    return returnedResult;
  }
};
var runOutputGeneratorsSync = (chunks, stdioItems, encoding, state) => {
  try {
    return runGeneratorsSync(chunks, stdioItems, encoding, false);
  } catch (error) {
    state.error = error;
    return chunks;
  }
};
var serializeChunks = ({ chunks, objectMode, encoding, lines, stripFinalNewline, fdNumber }) => {
  if (objectMode) {
    return { serializedResult: chunks };
  }
  if (encoding === "buffer") {
    return { serializedResult: joinToUint8Array(chunks) };
  }
  const serializedResult = joinToString(chunks, encoding);
  if (lines[fdNumber]) {
    return {
      serializedResult,
      finalResult: splitLinesSync(serializedResult, !stripFinalNewline[fdNumber], objectMode),
    };
  }
  return { serializedResult };
};
var logOutputSync = ({
  serializedResult,
  fdNumber,
  state,
  verboseInfo,
  encoding,
  stdioItems,
  objectMode,
}) => {
  if (
    !shouldLogOutput({
      stdioItems,
      encoding,
      verboseInfo,
      fdNumber,
    })
  ) {
    return;
  }
  const linesArray = splitLinesSync(serializedResult, false, objectMode);
  try {
    logLinesSync(linesArray, fdNumber, verboseInfo);
  } catch (error) {
    state.error ??= error;
  }
};
var writeToFiles = (serializedResult, stdioItems, outputFiles) => {
  for (const { path, append } of stdioItems.filter(({ type }) => FILE_TYPES.has(type))) {
    const pathString = typeof path === "string" ? path : path.toString();
    if (append || outputFiles.has(pathString)) {
      appendFileSync(path, serializedResult);
    } else {
      outputFiles.add(pathString);
      writeFileSync(path, serializedResult);
    }
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/all-sync.js
var getAllSync = ([, stdout, stderr], options) => {
  if (!options.all) {
    return;
  }
  if (stdout === undefined) {
    return stderr;
  }
  if (stderr === undefined) {
    return stdout;
  }
  if (Array.isArray(stdout)) {
    return Array.isArray(stderr)
      ? [...stdout, ...stderr]
      : [...stdout, stripNewline(stderr, options, "all")];
  }
  if (Array.isArray(stderr)) {
    return [stripNewline(stdout, options, "all"), ...stderr];
  }
  if (isUint8Array(stdout) && isUint8Array(stderr)) {
    return concatUint8Arrays([stdout, stderr]);
  }
  return `${stdout}${stderr}`;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/exit-async.js
import { once as once4 } from "node:events";
var waitForExit = async (subprocess, context) => {
  const [exitCode, signal] = await waitForExitOrError(subprocess);
  context.isForcefullyTerminated ??= false;
  return [exitCode, signal];
};
var waitForExitOrError = async (subprocess) => {
  const [spawnPayload, exitPayload] = await Promise.allSettled([
    once4(subprocess, "spawn"),
    once4(subprocess, "exit"),
  ]);
  if (spawnPayload.status === "rejected") {
    return [];
  }
  return exitPayload.status === "rejected" ? waitForSubprocessExit(subprocess) : exitPayload.value;
};
var waitForSubprocessExit = async (subprocess) => {
  try {
    return await once4(subprocess, "exit");
  } catch {
    return waitForSubprocessExit(subprocess);
  }
};
var waitForSuccessfulExit = async (exitPromise) => {
  const [exitCode, signal] = await exitPromise;
  if (!isSubprocessErrorExit(exitCode, signal) && isFailedExit(exitCode, signal)) {
    throw new DiscardedError();
  }
  return [exitCode, signal];
};
var isSubprocessErrorExit = (exitCode, signal) => exitCode === undefined && signal === undefined;
var isFailedExit = (exitCode, signal) => exitCode !== 0 || signal !== null;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/exit-sync.js
var getExitResultSync = ({ error, status: exitCode, signal, output }, { maxBuffer }) => {
  const resultError = getResultError(error, exitCode, signal);
  const timedOut = resultError?.code === "ETIMEDOUT";
  const isMaxBuffer = isMaxBufferSync(resultError, output, maxBuffer);
  return {
    resultError,
    exitCode,
    signal,
    timedOut,
    isMaxBuffer,
  };
};
var getResultError = (error, exitCode, signal) => {
  if (error !== undefined) {
    return error;
  }
  return isFailedExit(exitCode, signal) ? new DiscardedError() : undefined;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/main-sync.js
var execaCoreSync = (rawFile, rawArguments, rawOptions) => {
  const {
    file,
    commandArguments,
    command,
    escapedCommand,
    startTime,
    verboseInfo,
    options,
    fileDescriptors,
  } = handleSyncArguments(rawFile, rawArguments, rawOptions);
  const result = spawnSubprocessSync({
    file,
    commandArguments,
    options,
    command,
    escapedCommand,
    verboseInfo,
    fileDescriptors,
    startTime,
  });
  return handleResult(result, verboseInfo, options);
};
var handleSyncArguments = (rawFile, rawArguments, rawOptions) => {
  const { command, escapedCommand, startTime, verboseInfo } = handleCommand(
    rawFile,
    rawArguments,
    rawOptions,
  );
  const syncOptions = normalizeSyncOptions(rawOptions);
  const { file, commandArguments, options } = normalizeOptions(rawFile, rawArguments, syncOptions);
  validateSyncOptions(options);
  const fileDescriptors = handleStdioSync(options, verboseInfo);
  return {
    file,
    commandArguments,
    command,
    escapedCommand,
    startTime,
    verboseInfo,
    options,
    fileDescriptors,
  };
};
var normalizeSyncOptions = (options) =>
  options.node && !options.ipc ? { ...options, ipc: false } : options;
var validateSyncOptions = ({ ipc, ipcInput, detached, cancelSignal }) => {
  if (ipcInput) {
    throwInvalidSyncOption("ipcInput");
  }
  if (ipc) {
    throwInvalidSyncOption("ipc: true");
  }
  if (detached) {
    throwInvalidSyncOption("detached: true");
  }
  if (cancelSignal) {
    throwInvalidSyncOption("cancelSignal");
  }
};
var throwInvalidSyncOption = (value) => {
  throw new TypeError(`The "${value}" option cannot be used with synchronous methods.`);
};
var spawnSubprocessSync = ({
  file,
  commandArguments,
  options,
  command,
  escapedCommand,
  verboseInfo,
  fileDescriptors,
  startTime,
}) => {
  const syncResult = runSubprocessSync({
    file,
    commandArguments,
    options,
    command,
    escapedCommand,
    fileDescriptors,
    startTime,
  });
  if (syncResult.failed) {
    return syncResult;
  }
  const { resultError, exitCode, signal, timedOut, isMaxBuffer } = getExitResultSync(
    syncResult,
    options,
  );
  const { output, error = resultError } = transformOutputSync({
    fileDescriptors,
    syncResult,
    options,
    isMaxBuffer,
    verboseInfo,
  });
  const stdio = output.map((stdioOutput, fdNumber) => stripNewline(stdioOutput, options, fdNumber));
  const all = stripNewline(getAllSync(output, options), options, "all");
  return getSyncResult({
    error,
    exitCode,
    signal,
    timedOut,
    isMaxBuffer,
    stdio,
    all,
    options,
    command,
    escapedCommand,
    startTime,
  });
};
var runSubprocessSync = ({
  file,
  commandArguments,
  options,
  command,
  escapedCommand,
  fileDescriptors,
  startTime,
}) => {
  try {
    addInputOptionsSync(fileDescriptors, options);
    const normalizedOptions = normalizeSpawnSyncOptions(options);
    return spawnSync(...concatenateShell(file, commandArguments, normalizedOptions));
  } catch (error) {
    return makeEarlyError({
      error,
      command,
      escapedCommand,
      fileDescriptors,
      options,
      startTime,
      isSync: true,
    });
  }
};
var normalizeSpawnSyncOptions = ({ encoding, maxBuffer, ...options }) => ({
  ...options,
  encoding: "buffer",
  maxBuffer: getMaxBufferSync(maxBuffer),
});
var getSyncResult = ({
  error,
  exitCode,
  signal,
  timedOut,
  isMaxBuffer,
  stdio,
  all,
  options,
  command,
  escapedCommand,
  startTime,
}) =>
  error === undefined
    ? makeSuccessResult({
        command,
        escapedCommand,
        stdio,
        all,
        ipcOutput: [],
        options,
        startTime,
      })
    : makeError({
        error,
        command,
        escapedCommand,
        timedOut,
        isCanceled: false,
        isGracefullyCanceled: false,
        isMaxBuffer,
        isForcefullyTerminated: false,
        exitCode,
        signal,
        stdio,
        all,
        ipcOutput: [],
        options,
        startTime,
        isSync: true,
      });

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/main-async.js
import { setMaxListeners } from "node:events";
import { spawn } from "node:child_process";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/methods.js
import process9 from "node:process";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/get-one.js
import { once as once5, on as on3 } from "node:events";
var getOneMessage = (
  { anyProcess, channel, isSubprocess, ipc },
  { reference = true, filter } = {},
) => {
  validateIpcMethod({
    methodName: "getOneMessage",
    isSubprocess,
    ipc,
    isConnected: isConnected(anyProcess),
  });
  return getOneMessageAsync({
    anyProcess,
    channel,
    isSubprocess,
    filter,
    reference,
  });
};
var getOneMessageAsync = async ({ anyProcess, channel, isSubprocess, filter, reference }) => {
  addReference(channel, reference);
  const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
  const controller = new AbortController();
  try {
    return await Promise.race([
      getMessage(ipcEmitter, filter, controller),
      throwOnDisconnect2(ipcEmitter, isSubprocess, controller),
      throwOnStrictError(ipcEmitter, isSubprocess, controller),
    ]);
  } catch (error) {
    disconnect(anyProcess);
    throw error;
  } finally {
    controller.abort();
    removeReference(channel, reference);
  }
};
var getMessage = async (ipcEmitter, filter, { signal }) => {
  if (filter === undefined) {
    const [message] = await once5(ipcEmitter, "message", { signal });
    return message;
  }
  for await (const [message] of on3(ipcEmitter, "message", { signal })) {
    if (filter(message)) {
      return message;
    }
  }
};
var throwOnDisconnect2 = async (ipcEmitter, isSubprocess, { signal }) => {
  await once5(ipcEmitter, "disconnect", { signal });
  throwOnEarlyDisconnect(isSubprocess);
};
var throwOnStrictError = async (ipcEmitter, isSubprocess, { signal }) => {
  const [error] = await once5(ipcEmitter, "strict:error", { signal });
  throw getStrictResponseError(error, isSubprocess);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/get-each.js
import { once as once6, on as on4 } from "node:events";
var getEachMessage = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true } = {}) =>
  loopOnMessages({
    anyProcess,
    channel,
    isSubprocess,
    ipc,
    shouldAwait: !isSubprocess,
    reference,
  });
var loopOnMessages = ({ anyProcess, channel, isSubprocess, ipc, shouldAwait, reference }) => {
  validateIpcMethod({
    methodName: "getEachMessage",
    isSubprocess,
    ipc,
    isConnected: isConnected(anyProcess),
  });
  addReference(channel, reference);
  const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
  const controller = new AbortController();
  const state = {};
  stopOnDisconnect(anyProcess, ipcEmitter, controller);
  abortOnStrictError({
    ipcEmitter,
    isSubprocess,
    controller,
    state,
  });
  return iterateOnMessages({
    anyProcess,
    channel,
    ipcEmitter,
    isSubprocess,
    shouldAwait,
    controller,
    state,
    reference,
  });
};
var stopOnDisconnect = async (anyProcess, ipcEmitter, controller) => {
  try {
    await once6(ipcEmitter, "disconnect", { signal: controller.signal });
    controller.abort();
  } catch {}
};
var abortOnStrictError = async ({ ipcEmitter, isSubprocess, controller, state }) => {
  try {
    const [error] = await once6(ipcEmitter, "strict:error", { signal: controller.signal });
    state.error = getStrictResponseError(error, isSubprocess);
    controller.abort();
  } catch {}
};
var iterateOnMessages = async function* ({
  anyProcess,
  channel,
  ipcEmitter,
  isSubprocess,
  shouldAwait,
  controller,
  state,
  reference,
}) {
  try {
    for await (const [message] of on4(ipcEmitter, "message", { signal: controller.signal })) {
      throwIfStrictError(state);
      yield message;
    }
  } catch {
    throwIfStrictError(state);
  } finally {
    controller.abort();
    removeReference(channel, reference);
    if (!isSubprocess) {
      disconnect(anyProcess);
    }
    if (shouldAwait) {
      await anyProcess;
    }
  }
};
var throwIfStrictError = ({ error }) => {
  if (error) {
    throw error;
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/methods.js
var addIpcMethods = (subprocess, { ipc }) => {
  Object.assign(subprocess, getIpcMethods(subprocess, false, ipc));
};
var getIpcExport = () => {
  const anyProcess = process9;
  const isSubprocess = true;
  const ipc = process9.channel !== undefined;
  return {
    ...getIpcMethods(anyProcess, isSubprocess, ipc),
    getCancelSignal: getCancelSignal.bind(undefined, {
      anyProcess,
      channel: anyProcess.channel,
      isSubprocess,
      ipc,
    }),
  };
};
var getIpcMethods = (anyProcess, isSubprocess, ipc) => ({
  sendMessage: sendMessage.bind(undefined, {
    anyProcess,
    channel: anyProcess.channel,
    isSubprocess,
    ipc,
  }),
  getOneMessage: getOneMessage.bind(undefined, {
    anyProcess,
    channel: anyProcess.channel,
    isSubprocess,
    ipc,
  }),
  getEachMessage: getEachMessage.bind(undefined, {
    anyProcess,
    channel: anyProcess.channel,
    isSubprocess,
    ipc,
  }),
});

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/return/early-error.js
import { ChildProcess as ChildProcess2 } from "node:child_process";
import { PassThrough, Readable, Writable, Duplex } from "node:stream";
var handleEarlyError = ({
  error,
  command,
  escapedCommand,
  fileDescriptors,
  options,
  startTime,
  verboseInfo,
}) => {
  cleanupCustomStreams(fileDescriptors);
  const subprocess = new ChildProcess2();
  createDummyStreams(subprocess, fileDescriptors);
  Object.assign(subprocess, { readable, writable, duplex });
  const earlyError = makeEarlyError({
    error,
    command,
    escapedCommand,
    fileDescriptors,
    options,
    startTime,
    isSync: false,
  });
  const promise = handleDummyPromise(earlyError, verboseInfo, options);
  return { subprocess, promise };
};
var createDummyStreams = (subprocess, fileDescriptors) => {
  const stdin = createDummyStream();
  const stdout = createDummyStream();
  const stderr = createDummyStream();
  const extraStdio = Array.from({ length: fileDescriptors.length - 3 }, createDummyStream);
  const all = createDummyStream();
  const stdio = [stdin, stdout, stderr, ...extraStdio];
  Object.assign(subprocess, {
    stdin,
    stdout,
    stderr,
    all,
    stdio,
  });
};
var createDummyStream = () => {
  const stream = new PassThrough();
  stream.end();
  return stream;
};
var readable = () => new Readable({ read() {} });
var writable = () => new Writable({ write() {} });
var duplex = () => new Duplex({ read() {}, write() {} });
var handleDummyPromise = async (error, verboseInfo, options) =>
  handleResult(error, verboseInfo, options);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/stdio/handle-async.js
import { createReadStream, createWriteStream } from "node:fs";
import { Buffer as Buffer4 } from "node:buffer";
import { Readable as Readable2, Writable as Writable2, Duplex as Duplex2 } from "node:stream";
var handleStdioAsync = (options, verboseInfo) =>
  handleStdio(addPropertiesAsync, options, verboseInfo, false);
var forbiddenIfAsync = ({ type, optionName }) => {
  throw new TypeError(`The \`${optionName}\` option cannot be ${TYPE_TO_MESSAGE[type]}.`);
};
var addProperties2 = {
  fileNumber: forbiddenIfAsync,
  generator: generatorToStream,
  asyncGenerator: generatorToStream,
  nodeStream: ({ value }) => ({ stream: value }),
  webTransform({ value: { transform, writableObjectMode, readableObjectMode } }) {
    const objectMode = writableObjectMode || readableObjectMode;
    const stream = Duplex2.fromWeb(transform, { objectMode });
    return { stream };
  },
  duplex: ({ value: { transform } }) => ({ stream: transform }),
  native() {},
};
var addPropertiesAsync = {
  input: {
    ...addProperties2,
    fileUrl: ({ value }) => ({ stream: createReadStream(value) }),
    filePath: ({ value: { file } }) => ({ stream: createReadStream(file) }),
    webStream: ({ value }) => ({ stream: Readable2.fromWeb(value) }),
    iterable: ({ value }) => ({ stream: Readable2.from(value) }),
    asyncIterable: ({ value }) => ({ stream: Readable2.from(value) }),
    string: ({ value }) => ({ stream: Readable2.from(value) }),
    uint8Array: ({ value }) => ({ stream: Readable2.from(Buffer4.from(value)) }),
  },
  output: {
    ...addProperties2,
    fileUrl: ({ value }) => ({ stream: createWriteStream(value) }),
    filePath: ({ value: { file, append } }) => ({
      stream: createWriteStream(file, append ? { flags: "a" } : {}),
    }),
    webStream: ({ value }) => ({ stream: Writable2.fromWeb(value) }),
    iterable: forbiddenIfAsync,
    asyncIterable: forbiddenIfAsync,
    string: forbiddenIfAsync,
    uint8Array: forbiddenIfAsync,
  },
};

// ../../../node_modules/.bun/@sindresorhus+merge-streams@4.0.0/node_modules/@sindresorhus/merge-streams/index.js
import { on as on5, once as once7 } from "node:events";
import {
  PassThrough as PassThroughStream,
  getDefaultHighWaterMark as getDefaultHighWaterMark2,
} from "node:stream";
import { finished as finished2 } from "node:stream/promises";
function mergeStreams(streams) {
  if (!Array.isArray(streams)) {
    throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
  }
  for (const stream of streams) {
    validateStream(stream);
  }
  const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
  const highWaterMark = getHighWaterMark(streams, objectMode);
  const passThroughStream = new MergedStream({
    objectMode,
    writableHighWaterMark: highWaterMark,
    readableHighWaterMark: highWaterMark,
  });
  for (const stream of streams) {
    passThroughStream.add(stream);
  }
  return passThroughStream;
}
var getHighWaterMark = (streams, objectMode) => {
  if (streams.length === 0) {
    return getDefaultHighWaterMark2(objectMode);
  }
  const highWaterMarks = streams
    .filter(({ readableObjectMode }) => readableObjectMode === objectMode)
    .map(({ readableHighWaterMark }) => readableHighWaterMark);
  return Math.max(...highWaterMarks);
};

class MergedStream extends PassThroughStream {
  #streams = new Set([]);
  #ended = new Set([]);
  #aborted = new Set([]);
  #onFinished;
  #unpipeEvent = Symbol("unpipe");
  #streamPromises = new WeakMap();
  add(stream) {
    validateStream(stream);
    if (this.#streams.has(stream)) {
      return;
    }
    this.#streams.add(stream);
    this.#onFinished ??= onMergedStreamFinished(this, this.#streams, this.#unpipeEvent);
    const streamPromise = endWhenStreamsDone({
      passThroughStream: this,
      stream,
      streams: this.#streams,
      ended: this.#ended,
      aborted: this.#aborted,
      onFinished: this.#onFinished,
      unpipeEvent: this.#unpipeEvent,
    });
    this.#streamPromises.set(stream, streamPromise);
    stream.pipe(this, { end: false });
  }
  async remove(stream) {
    validateStream(stream);
    if (!this.#streams.has(stream)) {
      return false;
    }
    const streamPromise = this.#streamPromises.get(stream);
    if (streamPromise === undefined) {
      return false;
    }
    this.#streamPromises.delete(stream);
    stream.unpipe(this);
    await streamPromise;
    return true;
  }
}
var onMergedStreamFinished = async (passThroughStream, streams, unpipeEvent) => {
  updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
  const controller = new AbortController();
  try {
    await Promise.race([
      onMergedStreamEnd(passThroughStream, controller),
      onInputStreamsUnpipe(passThroughStream, streams, unpipeEvent, controller),
    ]);
  } finally {
    controller.abort();
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
  }
};
var onMergedStreamEnd = async (passThroughStream, { signal }) => {
  try {
    await finished2(passThroughStream, { signal, cleanup: true });
  } catch (error) {
    errorOrAbortStream(passThroughStream, error);
    throw error;
  }
};
var onInputStreamsUnpipe = async (passThroughStream, streams, unpipeEvent, { signal }) => {
  for await (const [unpipedStream] of on5(passThroughStream, "unpipe", { signal })) {
    if (streams.has(unpipedStream)) {
      unpipedStream.emit(unpipeEvent);
    }
  }
};
var validateStream = (stream) => {
  if (typeof stream?.pipe !== "function") {
    throw new TypeError(`Expected a readable stream, got: \`${typeof stream}\`.`);
  }
};
var endWhenStreamsDone = async ({
  passThroughStream,
  stream,
  streams,
  ended,
  aborted,
  onFinished,
  unpipeEvent,
}) => {
  updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM);
  const controller = new AbortController();
  try {
    await Promise.race([
      afterMergedStreamFinished(onFinished, stream, controller),
      onInputStreamEnd({
        passThroughStream,
        stream,
        streams,
        ended,
        aborted,
        controller,
      }),
      onInputStreamUnpipe({
        stream,
        streams,
        ended,
        aborted,
        unpipeEvent,
        controller,
      }),
    ]);
  } finally {
    controller.abort();
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
  }
  if (streams.size > 0 && streams.size === ended.size + aborted.size) {
    if (ended.size === 0 && aborted.size > 0) {
      abortStream(passThroughStream);
    } else {
      endStream(passThroughStream);
    }
  }
};
var afterMergedStreamFinished = async (onFinished, stream, { signal }) => {
  try {
    await onFinished;
    if (!signal.aborted) {
      abortStream(stream);
    }
  } catch (error) {
    if (!signal.aborted) {
      errorOrAbortStream(stream, error);
    }
  }
};
var onInputStreamEnd = async ({
  passThroughStream,
  stream,
  streams,
  ended,
  aborted,
  controller: { signal },
}) => {
  try {
    await finished2(stream, {
      signal,
      cleanup: true,
      readable: true,
      writable: false,
    });
    if (streams.has(stream)) {
      ended.add(stream);
    }
  } catch (error) {
    if (signal.aborted || !streams.has(stream)) {
      return;
    }
    if (isAbortError(error)) {
      aborted.add(stream);
    } else {
      errorStream(passThroughStream, error);
    }
  }
};
var onInputStreamUnpipe = async ({
  stream,
  streams,
  ended,
  aborted,
  unpipeEvent,
  controller: { signal },
}) => {
  await once7(stream, unpipeEvent, { signal });
  if (!stream.readable) {
    return once7(signal, "abort", { signal });
  }
  streams.delete(stream);
  ended.delete(stream);
  aborted.delete(stream);
};
var endStream = (stream) => {
  if (stream.writable) {
    stream.end();
  }
};
var errorOrAbortStream = (stream, error) => {
  if (isAbortError(error)) {
    abortStream(stream);
  } else {
    errorStream(stream, error);
  }
};
var isAbortError = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
var abortStream = (stream) => {
  if (stream.readable || stream.writable) {
    stream.destroy();
  }
};
var errorStream = (stream, error) => {
  if (!stream.destroyed) {
    stream.once("error", noop2);
    stream.destroy(error);
  }
};
var noop2 = () => {};
var updateMaxListeners = (passThroughStream, increment) => {
  const maxListeners = passThroughStream.getMaxListeners();
  if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) {
    passThroughStream.setMaxListeners(maxListeners + increment);
  }
};
var PASSTHROUGH_LISTENERS_COUNT = 2;
var PASSTHROUGH_LISTENERS_PER_STREAM = 1;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/pipeline.js
import { finished as finished3 } from "node:stream/promises";
var pipeStreams = (source, destination) => {
  source.pipe(destination);
  onSourceFinish(source, destination);
  onDestinationFinish(source, destination);
};
var onSourceFinish = async (source, destination) => {
  if (isStandardStream(source) || isStandardStream(destination)) {
    return;
  }
  try {
    await finished3(source, { cleanup: true, readable: true, writable: false });
  } catch {}
  endDestinationStream(destination);
};
var endDestinationStream = (destination) => {
  if (destination.writable) {
    destination.end();
  }
};
var onDestinationFinish = async (source, destination) => {
  if (isStandardStream(source) || isStandardStream(destination)) {
    return;
  }
  try {
    await finished3(destination, { cleanup: true, readable: false, writable: true });
  } catch {}
  abortSourceStream(source);
};
var abortSourceStream = (source) => {
  if (source.readable) {
    source.destroy();
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/output-async.js
var pipeOutputAsync = (subprocess, fileDescriptors, controller) => {
  const pipeGroups = new Map();
  for (const [fdNumber, { stdioItems, direction }] of Object.entries(fileDescriptors)) {
    for (const { stream } of stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type))) {
      pipeTransform(subprocess, stream, direction, fdNumber);
    }
    for (const { stream } of stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type))) {
      pipeStdioItem({
        subprocess,
        stream,
        direction,
        fdNumber,
        pipeGroups,
        controller,
      });
    }
  }
  for (const [outputStream, inputStreams] of pipeGroups.entries()) {
    const inputStream = inputStreams.length === 1 ? inputStreams[0] : mergeStreams(inputStreams);
    pipeStreams(inputStream, outputStream);
  }
};
var pipeTransform = (subprocess, stream, direction, fdNumber) => {
  if (direction === "output") {
    pipeStreams(subprocess.stdio[fdNumber], stream);
  } else {
    pipeStreams(stream, subprocess.stdio[fdNumber]);
  }
  const streamProperty = SUBPROCESS_STREAM_PROPERTIES[fdNumber];
  if (streamProperty !== undefined) {
    subprocess[streamProperty] = stream;
  }
  subprocess.stdio[fdNumber] = stream;
};
var SUBPROCESS_STREAM_PROPERTIES = ["stdin", "stdout", "stderr"];
var pipeStdioItem = ({ subprocess, stream, direction, fdNumber, pipeGroups, controller }) => {
  if (stream === undefined) {
    return;
  }
  setStandardStreamMaxListeners(stream, controller);
  const [inputStream, outputStream] =
    direction === "output"
      ? [stream, subprocess.stdio[fdNumber]]
      : [subprocess.stdio[fdNumber], stream];
  const outputStreams = pipeGroups.get(inputStream) ?? [];
  pipeGroups.set(inputStream, [...outputStreams, outputStream]);
};
var setStandardStreamMaxListeners = (stream, { signal }) => {
  if (isStandardStream(stream)) {
    incrementMaxListeners(stream, MAX_LISTENERS_INCREMENT, signal);
  }
};
var MAX_LISTENERS_INCREMENT = 2;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/cleanup.js
import { addAbortListener as addAbortListener2 } from "node:events";

// ../../../node_modules/.bun/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT",
  );
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// ../../../node_modules/.bun/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process2) =>
  !!process2 &&
  typeof process2 === "object" &&
  typeof process2.removeListener === "function" &&
  typeof process2.emit === "function" &&
  typeof process2.reallyExit === "function" &&
  typeof process2.listeners === "function" &&
  typeof process2.kill === "function" &&
  typeof process2.pid === "number" &&
  typeof process2.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global2 = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);

class Emitter {
  emitted = {
    afterExit: false,
    exit: false,
  };
  listeners = {
    afterExit: [],
    exit: [],
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global2[kExitEmitter]) {
      return global2[kExitEmitter];
    }
    ObjectDefineProperty(global2, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
}

class SignalExitBase {}
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    },
  };
};

class SignalExitFallback extends SignalExitBase {
  onExit() {
    return () => {};
  }
  load() {}
  unload() {}
}

class SignalExit extends SignalExitBase {
  #hupSig = process10.platform === "win32" ? "SIGINT" : "SIGHUP";
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process2) {
    super();
    this.#process = process2;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process2;
        if (
          typeof p.__signal_exit_emitter__ === "object" &&
          typeof p.__signal_exit_emitter__.count === "number"
        ) {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret) process2.kill(process2.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process2.reallyExit;
    this.#originalProcessEmit = process2.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {};
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (
        this.#emitter.listeners["exit"].length === 0 &&
        this.#emitter.listeners["afterExit"].length === 0
      ) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn) this.#process.on(sig, fn);
      } catch (_) {}
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {}
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
}
var process10 = globalThis.process;
var { onExit, load, unload } = signalExitWrap(
  processOk(process10) ? new SignalExit(process10) : new SignalExitFallback(),
);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/terminate/cleanup.js
var cleanupOnExit = (subprocess, { cleanup, detached }, { signal }) => {
  if (!cleanup || detached) {
    return;
  }
  const removeExitHandler = onExit(() => {
    subprocess.kill();
  });
  addAbortListener2(signal, () => {
    removeExitHandler();
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/pipe/pipe-arguments.js
var normalizePipeArguments = (
  { source, sourcePromise, boundOptions, createNested },
  ...pipeArguments
) => {
  const startTime = getStartTime();
  const { destination, destinationStream, destinationError, from, unpipeSignal } =
    getDestinationStream(boundOptions, createNested, pipeArguments);
  const { sourceStream, sourceError } = getSourceStream(source, from);
  const { options: sourceOptions, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
  return {
    sourcePromise,
    sourceStream,
    sourceOptions,
    sourceError,
    destination,
    destinationStream,
    destinationError,
    unpipeSignal,
    fileDescriptors,
    startTime,
  };
};
var getDestinationStream = (boundOptions, createNested, pipeArguments) => {
  try {
    const { destination, pipeOptions: { from, to, unpipeSignal } = {} } = getDestination(
      boundOptions,
      createNested,
      ...pipeArguments,
    );
    const destinationStream = getToStream(destination, to);
    return {
      destination,
      destinationStream,
      from,
      unpipeSignal,
    };
  } catch (error) {
    return { destinationError: error };
  }
};
var getDestination = (boundOptions, createNested, firstArgument, ...pipeArguments) => {
  if (Array.isArray(firstArgument)) {
    const destination = createNested(mapDestinationArguments, boundOptions)(
      firstArgument,
      ...pipeArguments,
    );
    return { destination, pipeOptions: boundOptions };
  }
  if (
    typeof firstArgument === "string" ||
    firstArgument instanceof URL ||
    isDenoExecPath(firstArgument)
  ) {
    if (Object.keys(boundOptions).length > 0) {
      throw new TypeError(
        'Please use .pipe("file", ..., options) or .pipe(execa("file", ..., options)) instead of .pipe(options)("file", ...).',
      );
    }
    const [rawFile, rawArguments, rawOptions] = normalizeParameters(
      firstArgument,
      ...pipeArguments,
    );
    const destination = createNested(mapDestinationArguments)(rawFile, rawArguments, rawOptions);
    return { destination, pipeOptions: rawOptions };
  }
  if (SUBPROCESS_OPTIONS.has(firstArgument)) {
    if (Object.keys(boundOptions).length > 0) {
      throw new TypeError(
        "Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`).",
      );
    }
    return { destination: firstArgument, pipeOptions: pipeArguments[0] };
  }
  throw new TypeError(
    `The first argument must be a template string, an options object, or an Execa subprocess: ${firstArgument}`,
  );
};
var mapDestinationArguments = ({ options }) => ({
  options: { ...options, stdin: "pipe", piped: true },
});
var getSourceStream = (source, from) => {
  try {
    const sourceStream = getFromStream(source, from);
    return { sourceStream };
  } catch (error) {
    return { sourceError: error };
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/pipe/throw.js
var handlePipeArgumentsError = ({
  sourceStream,
  sourceError,
  destinationStream,
  destinationError,
  fileDescriptors,
  sourceOptions,
  startTime,
}) => {
  const error = getPipeArgumentsError({
    sourceStream,
    sourceError,
    destinationStream,
    destinationError,
  });
  if (error !== undefined) {
    throw createNonCommandError({
      error,
      fileDescriptors,
      sourceOptions,
      startTime,
    });
  }
};
var getPipeArgumentsError = ({
  sourceStream,
  sourceError,
  destinationStream,
  destinationError,
}) => {
  if (sourceError !== undefined && destinationError !== undefined) {
    return destinationError;
  }
  if (destinationError !== undefined) {
    abortSourceStream(sourceStream);
    return destinationError;
  }
  if (sourceError !== undefined) {
    endDestinationStream(destinationStream);
    return sourceError;
  }
};
var createNonCommandError = ({ error, fileDescriptors, sourceOptions, startTime }) =>
  makeEarlyError({
    error,
    command: PIPE_COMMAND_MESSAGE,
    escapedCommand: PIPE_COMMAND_MESSAGE,
    fileDescriptors,
    options: sourceOptions,
    startTime,
    isSync: false,
  });
var PIPE_COMMAND_MESSAGE = "source.pipe(destination)";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/pipe/sequence.js
var waitForBothSubprocesses = async (subprocessPromises) => {
  const [
    { status: sourceStatus, reason: sourceReason, value: sourceResult = sourceReason },
    {
      status: destinationStatus,
      reason: destinationReason,
      value: destinationResult = destinationReason,
    },
  ] = await subprocessPromises;
  if (!destinationResult.pipedFrom.includes(sourceResult)) {
    destinationResult.pipedFrom.push(sourceResult);
  }
  if (destinationStatus === "rejected") {
    throw destinationResult;
  }
  if (sourceStatus === "rejected") {
    throw sourceResult;
  }
  return destinationResult;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/pipe/streaming.js
import { finished as finished4 } from "node:stream/promises";
var pipeSubprocessStream = (sourceStream, destinationStream, maxListenersController) => {
  const mergedStream = MERGED_STREAMS.has(destinationStream)
    ? pipeMoreSubprocessStream(sourceStream, destinationStream)
    : pipeFirstSubprocessStream(sourceStream, destinationStream);
  incrementMaxListeners(sourceStream, SOURCE_LISTENERS_PER_PIPE, maxListenersController.signal);
  incrementMaxListeners(
    destinationStream,
    DESTINATION_LISTENERS_PER_PIPE,
    maxListenersController.signal,
  );
  cleanupMergedStreamsMap(destinationStream);
  return mergedStream;
};
var pipeFirstSubprocessStream = (sourceStream, destinationStream) => {
  const mergedStream = mergeStreams([sourceStream]);
  pipeStreams(mergedStream, destinationStream);
  MERGED_STREAMS.set(destinationStream, mergedStream);
  return mergedStream;
};
var pipeMoreSubprocessStream = (sourceStream, destinationStream) => {
  const mergedStream = MERGED_STREAMS.get(destinationStream);
  mergedStream.add(sourceStream);
  return mergedStream;
};
var cleanupMergedStreamsMap = async (destinationStream) => {
  try {
    await finished4(destinationStream, { cleanup: true, readable: false, writable: true });
  } catch {}
  MERGED_STREAMS.delete(destinationStream);
};
var MERGED_STREAMS = new WeakMap();
var SOURCE_LISTENERS_PER_PIPE = 2;
var DESTINATION_LISTENERS_PER_PIPE = 1;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/pipe/abort.js
import { aborted as aborted2 } from "node:util";
var unpipeOnAbort = (unpipeSignal, unpipeContext) =>
  unpipeSignal === undefined ? [] : [unpipeOnSignalAbort(unpipeSignal, unpipeContext)];
var unpipeOnSignalAbort = async (
  unpipeSignal,
  { sourceStream, mergedStream, fileDescriptors, sourceOptions, startTime },
) => {
  await aborted2(unpipeSignal, sourceStream);
  await mergedStream.remove(sourceStream);
  const error = new Error("Pipe canceled by `unpipeSignal` option.");
  throw createNonCommandError({
    error,
    fileDescriptors,
    sourceOptions,
    startTime,
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/pipe/setup.js
var pipeToSubprocess = (sourceInfo, ...pipeArguments) => {
  if (isPlainObject2(pipeArguments[0])) {
    return pipeToSubprocess.bind(undefined, {
      ...sourceInfo,
      boundOptions: { ...sourceInfo.boundOptions, ...pipeArguments[0] },
    });
  }
  const { destination, ...normalizedInfo } = normalizePipeArguments(sourceInfo, ...pipeArguments);
  const promise = handlePipePromise({ ...normalizedInfo, destination });
  promise.pipe = pipeToSubprocess.bind(undefined, {
    ...sourceInfo,
    source: destination,
    sourcePromise: promise,
    boundOptions: {},
  });
  return promise;
};
var handlePipePromise = async ({
  sourcePromise,
  sourceStream,
  sourceOptions,
  sourceError,
  destination,
  destinationStream,
  destinationError,
  unpipeSignal,
  fileDescriptors,
  startTime,
}) => {
  const subprocessPromises = getSubprocessPromises(sourcePromise, destination);
  handlePipeArgumentsError({
    sourceStream,
    sourceError,
    destinationStream,
    destinationError,
    fileDescriptors,
    sourceOptions,
    startTime,
  });
  const maxListenersController = new AbortController();
  try {
    const mergedStream = pipeSubprocessStream(
      sourceStream,
      destinationStream,
      maxListenersController,
    );
    return await Promise.race([
      waitForBothSubprocesses(subprocessPromises),
      ...unpipeOnAbort(unpipeSignal, {
        sourceStream,
        mergedStream,
        sourceOptions,
        fileDescriptors,
        startTime,
      }),
    ]);
  } finally {
    maxListenersController.abort();
  }
};
var getSubprocessPromises = (sourcePromise, destination) =>
  Promise.allSettled([sourcePromise, destination]);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/contents.js
import { setImmediate } from "node:timers/promises";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/iterate.js
import { on as on6 } from "node:events";
import { getDefaultHighWaterMark as getDefaultHighWaterMark3 } from "node:stream";
var iterateOnSubprocessStream = ({
  subprocessStdout,
  subprocess,
  binary,
  shouldEncode,
  encoding,
  preserveNewlines,
}) => {
  const controller = new AbortController();
  stopReadingOnExit(subprocess, controller);
  return iterateOnStream({
    stream: subprocessStdout,
    controller,
    binary,
    shouldEncode: !subprocessStdout.readableObjectMode && shouldEncode,
    encoding,
    shouldSplit: !subprocessStdout.readableObjectMode,
    preserveNewlines,
  });
};
var stopReadingOnExit = async (subprocess, controller) => {
  try {
    await subprocess;
  } catch {
  } finally {
    controller.abort();
  }
};
var iterateForResult = ({ stream, onStreamEnd, lines, encoding, stripFinalNewline, allMixed }) => {
  const controller = new AbortController();
  stopReadingOnStreamEnd(onStreamEnd, controller, stream);
  const objectMode = stream.readableObjectMode && !allMixed;
  return iterateOnStream({
    stream,
    controller,
    binary: encoding === "buffer",
    shouldEncode: !objectMode,
    encoding,
    shouldSplit: !objectMode && lines,
    preserveNewlines: !stripFinalNewline,
  });
};
var stopReadingOnStreamEnd = async (onStreamEnd, controller, stream) => {
  try {
    await onStreamEnd;
  } catch {
    stream.destroy();
  } finally {
    controller.abort();
  }
};
var iterateOnStream = ({
  stream,
  controller,
  binary,
  shouldEncode,
  encoding,
  shouldSplit,
  preserveNewlines,
}) => {
  const onStdoutChunk = on6(stream, "data", {
    signal: controller.signal,
    highWaterMark: HIGH_WATER_MARK,
    highWatermark: HIGH_WATER_MARK,
  });
  return iterateOnData({
    onStdoutChunk,
    controller,
    binary,
    shouldEncode,
    encoding,
    shouldSplit,
    preserveNewlines,
  });
};
var DEFAULT_OBJECT_HIGH_WATER_MARK = getDefaultHighWaterMark3(true);
var HIGH_WATER_MARK = DEFAULT_OBJECT_HIGH_WATER_MARK;
var iterateOnData = async function* ({
  onStdoutChunk,
  controller,
  binary,
  shouldEncode,
  encoding,
  shouldSplit,
  preserveNewlines,
}) {
  const generators = getGenerators({
    binary,
    shouldEncode,
    encoding,
    shouldSplit,
    preserveNewlines,
  });
  try {
    for await (const [chunk] of onStdoutChunk) {
      yield* transformChunkSync(chunk, generators, 0);
    }
  } catch (error) {
    if (!controller.signal.aborted) {
      throw error;
    }
  } finally {
    yield* finalChunksSync(generators);
  }
};
var getGenerators = ({ binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) =>
  [
    getEncodingTransformGenerator(binary, encoding, !shouldEncode),
    getSplitLinesGenerator(binary, preserveNewlines, !shouldSplit, {}),
  ].filter(Boolean);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/io/contents.js
var getStreamOutput = async ({
  stream,
  onStreamEnd,
  fdNumber,
  encoding,
  buffer,
  maxBuffer,
  lines,
  allMixed,
  stripFinalNewline,
  verboseInfo,
  streamInfo,
}) => {
  const logPromise = logOutputAsync({
    stream,
    onStreamEnd,
    fdNumber,
    encoding,
    allMixed,
    verboseInfo,
    streamInfo,
  });
  if (!buffer) {
    await Promise.all([resumeStream(stream), logPromise]);
    return;
  }
  const stripFinalNewlineValue = getStripFinalNewline(stripFinalNewline, fdNumber);
  const iterable = iterateForResult({
    stream,
    onStreamEnd,
    lines,
    encoding,
    stripFinalNewline: stripFinalNewlineValue,
    allMixed,
  });
  const [output] = await Promise.all([
    getStreamContents2({
      stream,
      iterable,
      fdNumber,
      encoding,
      maxBuffer,
      lines,
    }),
    logPromise,
  ]);
  return output;
};
var logOutputAsync = async ({
  stream,
  onStreamEnd,
  fdNumber,
  encoding,
  allMixed,
  verboseInfo,
  streamInfo: { fileDescriptors },
}) => {
  if (
    !shouldLogOutput({
      stdioItems: fileDescriptors[fdNumber]?.stdioItems,
      encoding,
      verboseInfo,
      fdNumber,
    })
  ) {
    return;
  }
  const linesIterable = iterateForResult({
    stream,
    onStreamEnd,
    lines: true,
    encoding,
    stripFinalNewline: true,
    allMixed,
  });
  await logLines(linesIterable, stream, fdNumber, verboseInfo);
};
var resumeStream = async (stream) => {
  await setImmediate();
  if (stream.readableFlowing === null) {
    stream.resume();
  }
};
var getStreamContents2 = async ({
  stream,
  stream: { readableObjectMode },
  iterable,
  fdNumber,
  encoding,
  maxBuffer,
  lines,
}) => {
  try {
    if (readableObjectMode || lines) {
      return await getStreamAsArray(iterable, { maxBuffer });
    }
    if (encoding === "buffer") {
      return new Uint8Array(await getStreamAsArrayBuffer(iterable, { maxBuffer }));
    }
    return await getStreamAsString(iterable, { maxBuffer });
  } catch (error) {
    return handleBufferedData(
      handleMaxBuffer({
        error,
        stream,
        readableObjectMode,
        lines,
        encoding,
        fdNumber,
      }),
    );
  }
};
var getBufferedData = async (streamPromise) => {
  try {
    return await streamPromise;
  } catch (error) {
    return handleBufferedData(error);
  }
};
var handleBufferedData = ({ bufferedData }) =>
  isArrayBuffer(bufferedData) ? new Uint8Array(bufferedData) : bufferedData;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/wait-stream.js
import { finished as finished5 } from "node:stream/promises";
var waitForStream = async (
  stream,
  fdNumber,
  streamInfo,
  { isSameDirection, stopOnExit = false } = {},
) => {
  const state = handleStdinDestroy(stream, streamInfo);
  const abortController = new AbortController();
  try {
    await Promise.race([
      ...(stopOnExit ? [streamInfo.exitPromise] : []),
      finished5(stream, { cleanup: true, signal: abortController.signal }),
    ]);
  } catch (error) {
    if (!state.stdinCleanedUp) {
      handleStreamError(error, fdNumber, streamInfo, isSameDirection);
    }
  } finally {
    abortController.abort();
  }
};
var handleStdinDestroy = (stream, { originalStreams: [originalStdin], subprocess }) => {
  const state = { stdinCleanedUp: false };
  if (stream === originalStdin) {
    spyOnStdinDestroy(stream, subprocess, state);
  }
  return state;
};
var spyOnStdinDestroy = (subprocessStdin, subprocess, state) => {
  const { _destroy } = subprocessStdin;
  subprocessStdin._destroy = (...destroyArguments) => {
    setStdinCleanedUp(subprocess, state);
    _destroy.call(subprocessStdin, ...destroyArguments);
  };
};
var setStdinCleanedUp = ({ exitCode, signalCode }, state) => {
  if (exitCode !== null || signalCode !== null) {
    state.stdinCleanedUp = true;
  }
};
var handleStreamError = (error, fdNumber, streamInfo, isSameDirection) => {
  if (!shouldIgnoreStreamError(error, fdNumber, streamInfo, isSameDirection)) {
    throw error;
  }
};
var shouldIgnoreStreamError = (error, fdNumber, streamInfo, isSameDirection = true) => {
  if (streamInfo.propagating) {
    return isStreamEpipe(error) || isStreamAbort(error);
  }
  streamInfo.propagating = true;
  return isInputFileDescriptor(streamInfo, fdNumber) === isSameDirection
    ? isStreamEpipe(error)
    : isStreamAbort(error);
};
var isInputFileDescriptor = ({ fileDescriptors }, fdNumber) =>
  fdNumber !== "all" && fileDescriptors[fdNumber].direction === "input";
var isStreamAbort = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
var isStreamEpipe = (error) => error?.code === "EPIPE";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/stdio.js
var waitForStdioStreams = ({
  subprocess,
  encoding,
  buffer,
  maxBuffer,
  lines,
  stripFinalNewline,
  verboseInfo,
  streamInfo,
}) =>
  subprocess.stdio.map((stream, fdNumber) =>
    waitForSubprocessStream({
      stream,
      fdNumber,
      encoding,
      buffer: buffer[fdNumber],
      maxBuffer: maxBuffer[fdNumber],
      lines: lines[fdNumber],
      allMixed: false,
      stripFinalNewline,
      verboseInfo,
      streamInfo,
    }),
  );
var waitForSubprocessStream = async ({
  stream,
  fdNumber,
  encoding,
  buffer,
  maxBuffer,
  lines,
  allMixed,
  stripFinalNewline,
  verboseInfo,
  streamInfo,
}) => {
  if (!stream) {
    return;
  }
  const onStreamEnd = waitForStream(stream, fdNumber, streamInfo);
  if (isInputFileDescriptor(streamInfo, fdNumber)) {
    await onStreamEnd;
    return;
  }
  const [output] = await Promise.all([
    getStreamOutput({
      stream,
      onStreamEnd,
      fdNumber,
      encoding,
      buffer,
      maxBuffer,
      lines,
      allMixed,
      stripFinalNewline,
      verboseInfo,
      streamInfo,
    }),
    onStreamEnd,
  ]);
  return output;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/all-async.js
var makeAllStream = ({ stdout, stderr }, { all }) =>
  all && (stdout || stderr) ? mergeStreams([stdout, stderr].filter(Boolean)) : undefined;
var waitForAllStream = ({
  subprocess,
  encoding,
  buffer,
  maxBuffer,
  lines,
  stripFinalNewline,
  verboseInfo,
  streamInfo,
}) =>
  waitForSubprocessStream({
    ...getAllStream(subprocess, buffer),
    fdNumber: "all",
    encoding,
    maxBuffer: maxBuffer[1] + maxBuffer[2],
    lines: lines[1] || lines[2],
    allMixed: getAllMixed(subprocess),
    stripFinalNewline,
    verboseInfo,
    streamInfo,
  });
var getAllStream = ({ stdout, stderr, all }, [, bufferStdout, bufferStderr]) => {
  const buffer = bufferStdout || bufferStderr;
  if (!buffer) {
    return { stream: all, buffer };
  }
  if (!bufferStdout) {
    return { stream: stderr, buffer };
  }
  if (!bufferStderr) {
    return { stream: stdout, buffer };
  }
  return { stream: all, buffer };
};
var getAllMixed = ({ all, stdout, stderr }) =>
  all && stdout && stderr && stdout.readableObjectMode !== stderr.readableObjectMode;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/wait-subprocess.js
import { once as once8 } from "node:events";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/verbose/ipc.js
var shouldLogIpc = (verboseInfo) => isFullVerbose(verboseInfo, "ipc");
var logIpcOutput = (message, verboseInfo) => {
  const verboseMessage = serializeVerboseMessage(message);
  verboseLog({
    type: "ipc",
    verboseMessage,
    fdNumber: "ipc",
    verboseInfo,
  });
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/ipc/buffer-messages.js
var waitForIpcOutput = async ({
  subprocess,
  buffer: bufferArray,
  maxBuffer: maxBufferArray,
  ipc,
  ipcOutput,
  verboseInfo,
}) => {
  if (!ipc) {
    return ipcOutput;
  }
  const isVerbose = shouldLogIpc(verboseInfo);
  const buffer = getFdSpecificValue(bufferArray, "ipc");
  const maxBuffer = getFdSpecificValue(maxBufferArray, "ipc");
  for await (const message of loopOnMessages({
    anyProcess: subprocess,
    channel: subprocess.channel,
    isSubprocess: false,
    ipc,
    shouldAwait: false,
    reference: true,
  })) {
    if (buffer) {
      checkIpcMaxBuffer(subprocess, ipcOutput, maxBuffer);
      ipcOutput.push(message);
    }
    if (isVerbose) {
      logIpcOutput(message, verboseInfo);
    }
  }
  return ipcOutput;
};
var getBufferedIpcOutput = async (ipcOutputPromise, ipcOutput) => {
  await Promise.allSettled([ipcOutputPromise]);
  return ipcOutput;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/resolve/wait-subprocess.js
var waitForSubprocessResult = async ({
  subprocess,
  options: {
    encoding,
    buffer,
    maxBuffer,
    lines,
    timeoutDuration: timeout,
    cancelSignal,
    gracefulCancel,
    forceKillAfterDelay,
    stripFinalNewline,
    ipc,
    ipcInput,
  },
  context,
  verboseInfo,
  fileDescriptors,
  originalStreams,
  onInternalError,
  controller,
}) => {
  const exitPromise = waitForExit(subprocess, context);
  const streamInfo = {
    originalStreams,
    fileDescriptors,
    subprocess,
    exitPromise,
    propagating: false,
  };
  const stdioPromises = waitForStdioStreams({
    subprocess,
    encoding,
    buffer,
    maxBuffer,
    lines,
    stripFinalNewline,
    verboseInfo,
    streamInfo,
  });
  const allPromise = waitForAllStream({
    subprocess,
    encoding,
    buffer,
    maxBuffer,
    lines,
    stripFinalNewline,
    verboseInfo,
    streamInfo,
  });
  const ipcOutput = [];
  const ipcOutputPromise = waitForIpcOutput({
    subprocess,
    buffer,
    maxBuffer,
    ipc,
    ipcOutput,
    verboseInfo,
  });
  const originalPromises = waitForOriginalStreams(originalStreams, subprocess, streamInfo);
  const customStreamsEndPromises = waitForCustomStreamsEnd(fileDescriptors, streamInfo);
  try {
    return await Promise.race([
      Promise.all([
        {},
        waitForSuccessfulExit(exitPromise),
        Promise.all(stdioPromises),
        allPromise,
        ipcOutputPromise,
        sendIpcInput(subprocess, ipcInput),
        ...originalPromises,
        ...customStreamsEndPromises,
      ]),
      onInternalError,
      throwOnSubprocessError(subprocess, controller),
      ...throwOnTimeout(subprocess, timeout, context, controller),
      ...throwOnCancel({
        subprocess,
        cancelSignal,
        gracefulCancel,
        context,
        controller,
      }),
      ...throwOnGracefulCancel({
        subprocess,
        cancelSignal,
        gracefulCancel,
        forceKillAfterDelay,
        context,
        controller,
      }),
    ]);
  } catch (error) {
    context.terminationReason ??= "other";
    return Promise.all([
      { error },
      exitPromise,
      Promise.all(stdioPromises.map((stdioPromise) => getBufferedData(stdioPromise))),
      getBufferedData(allPromise),
      getBufferedIpcOutput(ipcOutputPromise, ipcOutput),
      Promise.allSettled(originalPromises),
      Promise.allSettled(customStreamsEndPromises),
    ]);
  }
};
var waitForOriginalStreams = (originalStreams, subprocess, streamInfo) =>
  originalStreams.map((stream, fdNumber) =>
    stream === subprocess.stdio[fdNumber] ? undefined : waitForStream(stream, fdNumber, streamInfo),
  );
var waitForCustomStreamsEnd = (fileDescriptors, streamInfo) =>
  fileDescriptors.flatMap(({ stdioItems }, fdNumber) =>
    stdioItems
      .filter(
        ({ value, stream = value }) =>
          isStream(stream, { checkOpen: false }) && !isStandardStream(stream),
      )
      .map(({ type, value, stream = value }) =>
        waitForStream(stream, fdNumber, streamInfo, {
          isSameDirection: TRANSFORM_TYPES.has(type),
          stopOnExit: type === "native",
        }),
      ),
  );
var throwOnSubprocessError = async (subprocess, { signal }) => {
  const [error] = await once8(subprocess, "error", { signal });
  throw error;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/concurrent.js
var initializeConcurrentStreams = () => ({
  readableDestroy: new WeakMap(),
  writableFinal: new WeakMap(),
  writableDestroy: new WeakMap(),
});
var addConcurrentStream = (concurrentStreams, stream, waitName) => {
  const weakMap = concurrentStreams[waitName];
  if (!weakMap.has(stream)) {
    weakMap.set(stream, []);
  }
  const promises = weakMap.get(stream);
  const promise = createDeferred();
  promises.push(promise);
  const resolve = promise.resolve.bind(promise);
  return { resolve, promises };
};
var waitForConcurrentStreams = async ({ resolve, promises }, subprocess) => {
  resolve();
  const [isSubprocessExit] = await Promise.race([
    Promise.allSettled([true, subprocess]),
    Promise.all([false, ...promises]),
  ]);
  return !isSubprocessExit;
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/readable.js
import { Readable as Readable3 } from "node:stream";
import { callbackify as callbackify2 } from "node:util";

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/shared.js
import { finished as finished6 } from "node:stream/promises";
var safeWaitForSubprocessStdin = async (subprocessStdin) => {
  if (subprocessStdin === undefined) {
    return;
  }
  try {
    await waitForSubprocessStdin(subprocessStdin);
  } catch {}
};
var safeWaitForSubprocessStdout = async (subprocessStdout) => {
  if (subprocessStdout === undefined) {
    return;
  }
  try {
    await waitForSubprocessStdout(subprocessStdout);
  } catch {}
};
var waitForSubprocessStdin = async (subprocessStdin) => {
  await finished6(subprocessStdin, { cleanup: true, readable: false, writable: true });
};
var waitForSubprocessStdout = async (subprocessStdout) => {
  await finished6(subprocessStdout, { cleanup: true, readable: true, writable: false });
};
var waitForSubprocess = async (subprocess, error) => {
  await subprocess;
  if (error) {
    throw error;
  }
};
var destroyOtherStream = (stream, isOpen, error) => {
  if (error && !isStreamAbort(error)) {
    stream.destroy(error);
  } else if (isOpen) {
    stream.destroy();
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/readable.js
var createReadable = (
  { subprocess, concurrentStreams, encoding },
  { from, binary: binaryOption = true, preserveNewlines = true } = {},
) => {
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(
    subprocess,
    from,
    concurrentStreams,
  );
  const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(
    subprocessStdout,
    binary,
  );
  const { read, onStdoutDataDone } = getReadableMethods({
    subprocessStdout,
    subprocess,
    binary,
    encoding,
    preserveNewlines,
  });
  const readable = new Readable3({
    read,
    destroy: callbackify2(
      onReadableDestroy.bind(undefined, { subprocessStdout, subprocess, waitReadableDestroy }),
    ),
    highWaterMark: readableHighWaterMark,
    objectMode: readableObjectMode,
    encoding: readableEncoding,
  });
  onStdoutFinished({
    subprocessStdout,
    onStdoutDataDone,
    readable,
    subprocess,
  });
  return readable;
};
var getSubprocessStdout = (subprocess, from, concurrentStreams) => {
  const subprocessStdout = getFromStream(subprocess, from);
  const waitReadableDestroy = addConcurrentStream(
    concurrentStreams,
    subprocessStdout,
    "readableDestroy",
  );
  return { subprocessStdout, waitReadableDestroy };
};
var getReadableOptions = (
  { readableEncoding, readableObjectMode, readableHighWaterMark },
  binary,
) =>
  binary
    ? { readableEncoding, readableObjectMode, readableHighWaterMark }
    : {
        readableEncoding,
        readableObjectMode: true,
        readableHighWaterMark: DEFAULT_OBJECT_HIGH_WATER_MARK,
      };
var getReadableMethods = ({ subprocessStdout, subprocess, binary, encoding, preserveNewlines }) => {
  const onStdoutDataDone = createDeferred();
  const onStdoutData = iterateOnSubprocessStream({
    subprocessStdout,
    subprocess,
    binary,
    shouldEncode: !binary,
    encoding,
    preserveNewlines,
  });
  return {
    read() {
      onRead(this, onStdoutData, onStdoutDataDone);
    },
    onStdoutDataDone,
  };
};
var onRead = async (readable, onStdoutData, onStdoutDataDone) => {
  try {
    const { value, done } = await onStdoutData.next();
    if (done) {
      onStdoutDataDone.resolve();
    } else {
      readable.push(value);
    }
  } catch {}
};
var onStdoutFinished = async ({
  subprocessStdout,
  onStdoutDataDone,
  readable,
  subprocess,
  subprocessStdin,
}) => {
  try {
    await waitForSubprocessStdout(subprocessStdout);
    await subprocess;
    await safeWaitForSubprocessStdin(subprocessStdin);
    await onStdoutDataDone;
    if (readable.readable) {
      readable.push(null);
    }
  } catch (error) {
    await safeWaitForSubprocessStdin(subprocessStdin);
    destroyOtherReadable(readable, error);
  }
};
var onReadableDestroy = async ({ subprocessStdout, subprocess, waitReadableDestroy }, error) => {
  if (await waitForConcurrentStreams(waitReadableDestroy, subprocess)) {
    destroyOtherReadable(subprocessStdout, error);
    await waitForSubprocess(subprocess, error);
  }
};
var destroyOtherReadable = (stream, error) => {
  destroyOtherStream(stream, stream.readable, error);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/writable.js
import { Writable as Writable3 } from "node:stream";
import { callbackify as callbackify3 } from "node:util";
var createWritable = ({ subprocess, concurrentStreams }, { to } = {}) => {
  const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(
    subprocess,
    to,
    concurrentStreams,
  );
  const writable = new Writable3({
    ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
    destroy: callbackify3(
      onWritableDestroy.bind(undefined, {
        subprocessStdin,
        subprocess,
        waitWritableFinal,
        waitWritableDestroy,
      }),
    ),
    highWaterMark: subprocessStdin.writableHighWaterMark,
    objectMode: subprocessStdin.writableObjectMode,
  });
  onStdinFinished(subprocessStdin, writable);
  return writable;
};
var getSubprocessStdin = (subprocess, to, concurrentStreams) => {
  const subprocessStdin = getToStream(subprocess, to);
  const waitWritableFinal = addConcurrentStream(
    concurrentStreams,
    subprocessStdin,
    "writableFinal",
  );
  const waitWritableDestroy = addConcurrentStream(
    concurrentStreams,
    subprocessStdin,
    "writableDestroy",
  );
  return { subprocessStdin, waitWritableFinal, waitWritableDestroy };
};
var getWritableMethods = (subprocessStdin, subprocess, waitWritableFinal) => ({
  write: onWrite.bind(undefined, subprocessStdin),
  final: callbackify3(
    onWritableFinal.bind(undefined, subprocessStdin, subprocess, waitWritableFinal),
  ),
});
var onWrite = (subprocessStdin, chunk, encoding, done) => {
  if (subprocessStdin.write(chunk, encoding)) {
    done();
  } else {
    subprocessStdin.once("drain", done);
  }
};
var onWritableFinal = async (subprocessStdin, subprocess, waitWritableFinal) => {
  if (await waitForConcurrentStreams(waitWritableFinal, subprocess)) {
    if (subprocessStdin.writable) {
      subprocessStdin.end();
    }
    await subprocess;
  }
};
var onStdinFinished = async (subprocessStdin, writable, subprocessStdout) => {
  try {
    await waitForSubprocessStdin(subprocessStdin);
    if (writable.writable) {
      writable.end();
    }
  } catch (error) {
    await safeWaitForSubprocessStdout(subprocessStdout);
    destroyOtherWritable(writable, error);
  }
};
var onWritableDestroy = async (
  { subprocessStdin, subprocess, waitWritableFinal, waitWritableDestroy },
  error,
) => {
  await waitForConcurrentStreams(waitWritableFinal, subprocess);
  if (await waitForConcurrentStreams(waitWritableDestroy, subprocess)) {
    destroyOtherWritable(subprocessStdin, error);
    await waitForSubprocess(subprocess, error);
  }
};
var destroyOtherWritable = (stream, error) => {
  destroyOtherStream(stream, stream.writable, error);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/duplex.js
import { Duplex as Duplex3 } from "node:stream";
import { callbackify as callbackify4 } from "node:util";
var createDuplex = (
  { subprocess, concurrentStreams, encoding },
  { from, to, binary: binaryOption = true, preserveNewlines = true } = {},
) => {
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(
    subprocess,
    from,
    concurrentStreams,
  );
  const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(
    subprocess,
    to,
    concurrentStreams,
  );
  const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(
    subprocessStdout,
    binary,
  );
  const { read, onStdoutDataDone } = getReadableMethods({
    subprocessStdout,
    subprocess,
    binary,
    encoding,
    preserveNewlines,
  });
  const duplex = new Duplex3({
    read,
    ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
    destroy: callbackify4(
      onDuplexDestroy.bind(undefined, {
        subprocessStdout,
        subprocessStdin,
        subprocess,
        waitReadableDestroy,
        waitWritableFinal,
        waitWritableDestroy,
      }),
    ),
    readableHighWaterMark,
    writableHighWaterMark: subprocessStdin.writableHighWaterMark,
    readableObjectMode,
    writableObjectMode: subprocessStdin.writableObjectMode,
    encoding: readableEncoding,
  });
  onStdoutFinished({
    subprocessStdout,
    onStdoutDataDone,
    readable: duplex,
    subprocess,
    subprocessStdin,
  });
  onStdinFinished(subprocessStdin, duplex, subprocessStdout);
  return duplex;
};
var onDuplexDestroy = async (
  {
    subprocessStdout,
    subprocessStdin,
    subprocess,
    waitReadableDestroy,
    waitWritableFinal,
    waitWritableDestroy,
  },
  error,
) => {
  await Promise.all([
    onReadableDestroy({ subprocessStdout, subprocess, waitReadableDestroy }, error),
    onWritableDestroy(
      {
        subprocessStdin,
        subprocess,
        waitWritableFinal,
        waitWritableDestroy,
      },
      error,
    ),
  ]);
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/iterable.js
var createIterable = (
  subprocess,
  encoding,
  { from, binary: binaryOption = false, preserveNewlines = false } = {},
) => {
  const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
  const subprocessStdout = getFromStream(subprocess, from);
  const onStdoutData = iterateOnSubprocessStream({
    subprocessStdout,
    subprocess,
    binary,
    shouldEncode: true,
    encoding,
    preserveNewlines,
  });
  return iterateOnStdoutData(onStdoutData, subprocessStdout, subprocess);
};
var iterateOnStdoutData = async function* (onStdoutData, subprocessStdout, subprocess) {
  try {
    yield* onStdoutData;
  } finally {
    if (subprocessStdout.readable) {
      subprocessStdout.destroy();
    }
    await subprocess;
  }
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/convert/add.js
var addConvertedStreams = (subprocess, { encoding }) => {
  const concurrentStreams = initializeConcurrentStreams();
  subprocess.readable = createReadable.bind(undefined, { subprocess, concurrentStreams, encoding });
  subprocess.writable = createWritable.bind(undefined, { subprocess, concurrentStreams });
  subprocess.duplex = createDuplex.bind(undefined, { subprocess, concurrentStreams, encoding });
  subprocess.iterable = createIterable.bind(undefined, subprocess, encoding);
  subprocess[Symbol.asyncIterator] = createIterable.bind(undefined, subprocess, encoding, {});
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/promise.js
var mergePromise = (subprocess, promise) => {
  for (const [property, descriptor] of descriptors) {
    const value = descriptor.value.bind(promise);
    Reflect.defineProperty(subprocess, property, { ...descriptor, value });
  }
};
var nativePromisePrototype = (async () => {})().constructor.prototype;
var descriptors = ["then", "catch", "finally"].map((property) => [
  property,
  Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property),
]);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/main-async.js
var execaCoreAsync = (rawFile, rawArguments, rawOptions, createNested) => {
  const {
    file,
    commandArguments,
    command,
    escapedCommand,
    startTime,
    verboseInfo,
    options,
    fileDescriptors,
  } = handleAsyncArguments(rawFile, rawArguments, rawOptions);
  const { subprocess, promise } = spawnSubprocessAsync({
    file,
    commandArguments,
    options,
    startTime,
    verboseInfo,
    command,
    escapedCommand,
    fileDescriptors,
  });
  subprocess.pipe = pipeToSubprocess.bind(undefined, {
    source: subprocess,
    sourcePromise: promise,
    boundOptions: {},
    createNested,
  });
  mergePromise(subprocess, promise);
  SUBPROCESS_OPTIONS.set(subprocess, { options, fileDescriptors });
  return subprocess;
};
var handleAsyncArguments = (rawFile, rawArguments, rawOptions) => {
  const { command, escapedCommand, startTime, verboseInfo } = handleCommand(
    rawFile,
    rawArguments,
    rawOptions,
  );
  const {
    file,
    commandArguments,
    options: normalizedOptions,
  } = normalizeOptions(rawFile, rawArguments, rawOptions);
  const options = handleAsyncOptions(normalizedOptions);
  const fileDescriptors = handleStdioAsync(options, verboseInfo);
  return {
    file,
    commandArguments,
    command,
    escapedCommand,
    startTime,
    verboseInfo,
    options,
    fileDescriptors,
  };
};
var handleAsyncOptions = ({ timeout, signal, ...options }) => {
  if (signal !== undefined) {
    throw new TypeError('The "signal" option has been renamed to "cancelSignal" instead.');
  }
  return { ...options, timeoutDuration: timeout };
};
var spawnSubprocessAsync = ({
  file,
  commandArguments,
  options,
  startTime,
  verboseInfo,
  command,
  escapedCommand,
  fileDescriptors,
}) => {
  let subprocess;
  try {
    subprocess = spawn(...concatenateShell(file, commandArguments, options));
  } catch (error) {
    return handleEarlyError({
      error,
      command,
      escapedCommand,
      fileDescriptors,
      options,
      startTime,
      verboseInfo,
    });
  }
  const controller = new AbortController();
  setMaxListeners(Number.POSITIVE_INFINITY, controller.signal);
  const originalStreams = [...subprocess.stdio];
  pipeOutputAsync(subprocess, fileDescriptors, controller);
  cleanupOnExit(subprocess, options, controller);
  const context = {};
  const onInternalError = createDeferred();
  subprocess.kill = subprocessKill.bind(undefined, {
    kill: subprocess.kill.bind(subprocess),
    options,
    onInternalError,
    context,
    controller,
  });
  subprocess.all = makeAllStream(subprocess, options);
  addConvertedStreams(subprocess, options);
  addIpcMethods(subprocess, options);
  const promise = handlePromise({
    subprocess,
    options,
    startTime,
    verboseInfo,
    fileDescriptors,
    originalStreams,
    command,
    escapedCommand,
    context,
    onInternalError,
    controller,
  });
  return { subprocess, promise };
};
var handlePromise = async ({
  subprocess,
  options,
  startTime,
  verboseInfo,
  fileDescriptors,
  originalStreams,
  command,
  escapedCommand,
  context,
  onInternalError,
  controller,
}) => {
  const [errorInfo, [exitCode, signal], stdioResults, allResult, ipcOutput] =
    await waitForSubprocessResult({
      subprocess,
      options,
      context,
      verboseInfo,
      fileDescriptors,
      originalStreams,
      onInternalError,
      controller,
    });
  controller.abort();
  onInternalError.resolve();
  const stdio = stdioResults.map((stdioResult, fdNumber) =>
    stripNewline(stdioResult, options, fdNumber),
  );
  const all = stripNewline(allResult, options, "all");
  const result = getAsyncResult({
    errorInfo,
    exitCode,
    signal,
    stdio,
    all,
    ipcOutput,
    context,
    options,
    command,
    escapedCommand,
    startTime,
  });
  return handleResult(result, verboseInfo, options);
};
var getAsyncResult = ({
  errorInfo,
  exitCode,
  signal,
  stdio,
  all,
  ipcOutput,
  context,
  options,
  command,
  escapedCommand,
  startTime,
}) =>
  "error" in errorInfo
    ? makeError({
        error: errorInfo.error,
        command,
        escapedCommand,
        timedOut: context.terminationReason === "timeout",
        isCanceled:
          context.terminationReason === "cancel" || context.terminationReason === "gracefulCancel",
        isGracefullyCanceled: context.terminationReason === "gracefulCancel",
        isMaxBuffer: errorInfo.error instanceof MaxBufferError,
        isForcefullyTerminated: context.isForcefullyTerminated,
        exitCode,
        signal,
        stdio,
        all,
        ipcOutput,
        options,
        startTime,
        isSync: false,
      })
    : makeSuccessResult({
        command,
        escapedCommand,
        stdio,
        all,
        ipcOutput,
        options,
        startTime,
      });

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/bind.js
var mergeOptions = (boundOptions, options) => {
  const newOptions = Object.fromEntries(
    Object.entries(options).map(([optionName, optionValue]) => [
      optionName,
      mergeOption(optionName, boundOptions[optionName], optionValue),
    ]),
  );
  return { ...boundOptions, ...newOptions };
};
var mergeOption = (optionName, boundOptionValue, optionValue) => {
  if (
    DEEP_OPTIONS.has(optionName) &&
    isPlainObject2(boundOptionValue) &&
    isPlainObject2(optionValue)
  ) {
    return { ...boundOptionValue, ...optionValue };
  }
  return optionValue;
};
var DEEP_OPTIONS = new Set(["env", ...FD_SPECIFIC_OPTIONS]);

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/create.js
var createExeca = (mapArguments, boundOptions, deepOptions, setBoundExeca) => {
  const createNested = (mapArguments, boundOptions, setBoundExeca) =>
    createExeca(mapArguments, boundOptions, deepOptions, setBoundExeca);
  const boundExeca = (...execaArguments) =>
    callBoundExeca(
      {
        mapArguments,
        deepOptions,
        boundOptions,
        setBoundExeca,
        createNested,
      },
      ...execaArguments,
    );
  if (setBoundExeca !== undefined) {
    setBoundExeca(boundExeca, createNested, boundOptions);
  }
  return boundExeca;
};
var callBoundExeca = (
  { mapArguments, deepOptions = {}, boundOptions = {}, setBoundExeca, createNested },
  firstArgument,
  ...nextArguments
) => {
  if (isPlainObject2(firstArgument)) {
    return createNested(mapArguments, mergeOptions(boundOptions, firstArgument), setBoundExeca);
  }
  const { file, commandArguments, options, isSync } = parseArguments({
    mapArguments,
    firstArgument,
    nextArguments,
    deepOptions,
    boundOptions,
  });
  return isSync
    ? execaCoreSync(file, commandArguments, options)
    : execaCoreAsync(file, commandArguments, options, createNested);
};
var parseArguments = ({
  mapArguments,
  firstArgument,
  nextArguments,
  deepOptions,
  boundOptions,
}) => {
  const callArguments = isTemplateString(firstArgument)
    ? parseTemplates(firstArgument, nextArguments)
    : [firstArgument, ...nextArguments];
  const [initialFile, initialArguments, initialOptions] = normalizeParameters(...callArguments);
  const mergedOptions = mergeOptions(mergeOptions(deepOptions, boundOptions), initialOptions);
  const {
    file = initialFile,
    commandArguments = initialArguments,
    options = mergedOptions,
    isSync = false,
  } = mapArguments({
    file: initialFile,
    commandArguments: initialArguments,
    options: mergedOptions,
  });
  return {
    file,
    commandArguments,
    options,
    isSync,
  };
};

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/command.js
var mapCommandAsync = ({ file, commandArguments }) => parseCommand(file, commandArguments);
var mapCommandSync = ({ file, commandArguments }) => ({
  ...parseCommand(file, commandArguments),
  isSync: true,
});
var parseCommand = (command, unusedArguments) => {
  if (unusedArguments.length > 0) {
    throw new TypeError(
      `The command and its arguments must be passed as a single string: ${command} ${unusedArguments}.`,
    );
  }
  const [file, ...commandArguments] = parseCommandString(command);
  return { file, commandArguments };
};
var parseCommandString = (command) => {
  if (typeof command !== "string") {
    throw new TypeError(`The command must be a string: ${String(command)}.`);
  }
  const trimmedCommand = command.trim();
  if (trimmedCommand === "") {
    return [];
  }
  const tokens = [];
  for (const token of trimmedCommand.split(SPACES_REGEXP)) {
    const previousToken = tokens.at(-1);
    if (previousToken && previousToken.endsWith("\\")) {
      tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
    } else {
      tokens.push(token);
    }
  }
  return tokens;
};
var SPACES_REGEXP = / +/g;

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/lib/methods/script.js
var setScriptSync = (boundExeca, createNested, boundOptions) => {
  boundExeca.sync = createNested(mapScriptSync, boundOptions);
  boundExeca.s = boundExeca.sync;
};
var mapScriptAsync = ({ options }) => getScriptOptions(options);
var mapScriptSync = ({ options }) => ({ ...getScriptOptions(options), isSync: true });
var getScriptOptions = (options) => ({ options: { ...getScriptStdinOption(options), ...options } });
var getScriptStdinOption = ({ input, inputFile, stdio }) =>
  input === undefined && inputFile === undefined && stdio === undefined ? { stdin: "inherit" } : {};
var deepScriptOptions = { preferLocal: true };

// ../../../node_modules/.bun/execa@9.6.1/node_modules/execa/index.js
var execa = createExeca(() => ({}));
var execaSync = createExeca(() => ({ isSync: true }));
var execaCommand = createExeca(mapCommandAsync);
var execaCommandSync = createExeca(mapCommandSync);
var execaNode = createExeca(mapNode);
var $2 = createExeca(mapScriptAsync, {}, deepScriptOptions, setScriptSync);
var {
  sendMessage: sendMessage2,
  getOneMessage: getOneMessage2,
  getEachMessage: getEachMessage2,
  getCancelSignal: getCancelSignal2,
} = getIpcExport();

// packages/core/dist/chunk-WRSJDOQ2.js
var u2 = exports_execa;
var t = u2.execa ?? u2.default;
var o3 = u2.execaSync ?? u2.sync;
var w3 = !!u2.execa;
if (!t || !o3) throw new Error("Unsupported execa module shape: expected execa/execaSync exports");

// packages/core/dist/chunk-OOMTEPSW.js
import { randomUUID, randomInt, createHash as createHash2 } from "crypto";
var pe3 = new Set(["description", "body", "note", "message", "result_summary"]);
var $e = 1024 * 1024;
var rt2 = randomUUID();
// packages/core/dist/chunk-WOT6VMZA.js
var d2 = Object.defineProperty;
var e = (c, a) => {
  for (var b in a) d2(c, b, { get: a[b], enumerable: true });
};

// packages/core/dist/tasks/index.js
var Me3 = {};
e(Me3, {
  EFFECT_OBSERVE_TRANSITION_TABLE: () => be3,
  EFFECT_STATES: () => fe3,
  KERNEL_REJECTION_CODES: () => me4,
  PROJECTION_SOURCES: () => zr,
  TASK_ACTION_TRANSITION_TABLE: () => Pe3,
  TASK_STATES: () => ue2,
  TASK_TRANSITION_TABLE: () => xe2,
  WORK_ITEM_STATES: () => ge5,
  WORK_ITEM_TRANSITION_TABLE: () => we3,
  additivePlanScopeExpansionRoots: () => G3,
  authorityBindsCurrentState: () => Yr,
  authorityDigest: () => v3,
  canonicalAuthorityIssues: () => q4,
  compareExecutionAuthority: () => Wr,
  continuationIssues: () => F3,
  isAdditivePlanScopeExpansion: () => ye4,
  isTaskCompletionEligible: () => ie3,
  kernelDigest: () => G,
  planAmendmentScopeRoots: () => L4,
  planScopeExpansionApprovalDigest: () => O3,
  policyRenewalApprovalEvidence: () => X4,
  policyRenewalIssues: () => x3,
  policyRenewalRequestDigest: () => $4,
  projectionCannotAuthorize: () => Gr,
  reduceTaskCommand: () => Oe3,
  validateWorkItemDefinitions: () => Ie2,
  workItemResourceConflicts: () => ne3,
});
var ue2 = [
  "CAPTURED",
  "PLANNING",
  "AWAITING_PLAN_APPROVAL",
  "ACTIVE",
  "FINAL_VALIDATION",
  "COMPLETED",
  "HUMAN_REQUIRED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
];
var ge5 = [
  "PLANNED",
  "READY",
  "CLAIMED",
  "EXECUTING",
  "RESULT_RECEIVED",
  "INSPECTING",
  "VALIDATING",
  "REWORK_READY",
  "COMPLETED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
];
var fe3 = ["PREPARED", "PENDING", "APPLIED", "NOT_APPLIED", "IN_DOUBT", "RECONCILED", "SUPERSEDED"];
var me4 = [
  "TASK_ID_MISMATCH",
  "STALE_TASK_REVISION",
  "STALE_STATE_FINGERPRINT",
  "ILLEGAL_TASK_TRANSITION",
  "ILLEGAL_WORK_ITEM_TRANSITION",
  "CURRENT_PLAN_MISSING",
  "CURRENT_PLAN_NOT_APPROVED",
  "PLAN_DIGEST_MISMATCH",
  "PLAN_REVISION_MISMATCH",
  "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
  "WORK_ITEM_MISSING",
  "WORK_ITEM_DEPENDENCY_INCOMPLETE",
  "WORK_ITEM_RESOURCE_CONFLICT",
  "WORK_ITEM_RESULT_TARGET_MISMATCH",
  "WORK_ITEM_OUTPUT_MISSING",
  "WORK_ITEM_VALIDATION_MISSING",
  "VALIDATION_IDENTITY_MISMATCH",
  "AUTHORITY_MISSING",
  "AUTHORITY_TASK_MISMATCH",
  "AUTHORITY_SCOPE_EXCEEDED",
  "AUTHORITY_PROVENANCE_ESCALATION",
  "MUTATION_ID_CONFLICT",
  "EFFECT_RECONCILIATION_REQUIRED",
  "FINAL_VALIDATION_MISSING",
  "TASK_COMPLETION_INELIGIBLE",
  "PROJECTION_CANNOT_AUTHORIZE",
  "CONTROLLER_TRANSFER_INVALID",
  "MIGRATION_RECEIPT_INVALID",
];
function O3(e) {
  return G({ kind: "canonical_plan_scope_expansion_approval", ...e });
}
function V3(e, i) {
  let t = [...i].toSorted();
  return e.length === i.length && [...e].toSorted().every((n, a) => n === t[a]);
}
function ji(e, i) {
  return e.some((t) => t === "." || i === t || i.startsWith(`${t}/`));
}
function Ee2(e) {
  return e.amended.approval_actor_id === null ||
    e.amended.approval_evidence_digest !==
      O3({
        task_id: e.task_id,
        current_plan_digest: e.source.digest,
        amended_plan_digest: e.amended.digest,
        actor_id: e.amended.approval_actor_id,
      })
    ? null
    : (L4({ current: e.source, amended: e.amended, authority: e.authority })?.filter(
        (t) => !ji(e.authority.scope_roots, t),
      ) ?? null);
}
function G3(e) {
  if (e.current.work_items.length !== e.amended.work_items.length) return null;
  let i = new Map(e.current.work_items.map((a) => [a.id, a])),
    t = new Set();
  return e.amended.work_items.every((a) => {
    let o = i.get(a.id);
    if (!o) return false;
    let { execution_requirements: r, ...s } = o,
      { execution_requirements: c, ...l } = a;
    if (
      G(s) !== G(l) ||
      !r ||
      !c ||
      !r.scope_roots.every((g) => c.scope_roots.includes(g)) ||
      !V3(r.repository_effects, c.repository_effects) ||
      !V3(r.external_effects, c.external_effects) ||
      !V3(r.capabilities, c.capabilities) ||
      !V3(r.resources, c.resources) ||
      !qr(e.authority, { ...c, scope_roots: r.scope_roots })
    )
      return false;
    for (let g of c.scope_roots) r.scope_roots.includes(g) || t.add(g);
    return true;
  }) && t.size > 0
    ? [...t].toSorted()
    : null;
}
function L4(e) {
  let i = G3(e);
  if (i !== null) return i;
  let t = new Map(e.current.work_items.map((a) => [a.id, a]));
  return !(
    e.current.work_items.length !== e.amended.work_items.length ||
    e.amended.work_items.some(
      (a) => !t.has(a.id) || t.get(a.id)?.contract_digest !== a.contract_digest,
    )
  ) ||
    e.amended.work_items.some(
      (a) => !a.execution_requirements || !qr(e.authority, a.execution_requirements),
    )
    ? null
    : [];
}
function ye4(e) {
  return G3(e) !== null;
}
function v3(e) {
  let { digest: i, ...t } = e;
  return G(t);
}
function z2(e) {
  return G({ kind: "canonical_authority_delta_approval", ...e });
}
function $4(e) {
  return G({
    kind: "canonical_policy_authority_renewal",
    task_id: e.parent.task_id,
    task_revision: e.task_revision,
    parent_authority_digest: e.parent.digest,
    repository_fingerprint: e.repository_fingerprint,
    policy_digests: e.policy_digests,
    changed_paths: e.changed_paths ?? [],
    repository_evidence_digest: e.repository_evidence_digest ?? null,
  });
}
function X4(e) {
  return G({ kind: "canonical_policy_authority_renewal_approval", ...e });
}
function x3(e, i) {
  let { authority: t, observation: n } = i,
    a = {
      ...t,
      digest: e.digest,
      repository_fingerprint: e.repository_fingerprint,
      policy_digests: e.policy_digests,
      provenance: e.provenance,
    };
  return i.approval_mode !== "manual_operator" ||
    n?.kind !== "policy_renewal" ||
    n.request_task_revision === undefined ||
    n.previous_fingerprint !== e.repository_fingerprint ||
    (t.repository_fingerprint !== e.repository_fingerprint && n.changed_paths.length === 0) ||
    JSON.stringify(n.changed_paths) !== JSON.stringify([...new Set(n.changed_paths)].toSorted()) ||
    n.changed_paths.some((o) => {
      let r = {
          scope_roots: [o],
          repository_effects: [],
          external_effects: [],
          capabilities: [],
          resources: [],
        },
        s =
          ["AGENTS.md", ".agentplane/WORKFLOW.md", ".agentplane/config.json"].includes(o) ||
          o.startsWith(".agentplane/policy/");
      return !qr({ ...e, scope_roots: ["."] }, r) || (!s && !qr(e, r));
    }) ||
    n.added_scope_roots !== undefined ||
    n.added_repository_effects !== undefined ||
    (n.changed_paths.length > 0 &&
      !/^sha256:[0-9a-f]{64}$/u.test(n.repository_evidence_digest ?? "")) ||
    t.provenance.kind !== "USER" ||
    !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(t.provenance.actor_id) ||
    t.provenance.parent_authority_digest !== e.digest ||
    t.provenance.evidence_digest !== e.provenance.evidence_digest ||
    t.digest !== v3(t) ||
    G(a) !== G(e) ||
    G(t.policy_digests) === G(e.policy_digests) ||
    t.policy_digests.length === 0 ||
    t.policy_digests.some((o) => !/^sha256:[0-9a-f]{64}$/u.test(o)) ||
    n.request_digest !==
      $4({
        task_revision: n.request_task_revision,
        parent: e,
        repository_fingerprint: t.repository_fingerprint,
        policy_digests: t.policy_digests,
        changed_paths: n.changed_paths,
        repository_evidence_digest: n.repository_evidence_digest,
      }) ||
    n.evidence_digest !== X4({ request_digest: n.request_digest, actor_id: t.provenance.actor_id })
    ? ["policy_renewal_binding"]
    : [];
}
function q4(e) {
  let i = [],
    t = e.authority_lineage ?? [],
    n = new Set();
  for (let [a, o] of t.entries()) {
    let r = o.authority;
    ((r.digest !== v3(r) || n.has(r.digest)) && i.push("authority_digest"),
      n.add(r.digest),
      r.task_id !== e.id && i.push("authority_task"));
    let s = [e.current_plan, ...e.plan_history].find(
        (u) => u?.revision === r.plan_revision && u.digest === r.plan_digest,
      ),
      c = t[a - 1]?.authority,
      l = c
        ? [e.current_plan, ...e.plan_history].find((u) => u?.digest === c.plan_digest)
        : undefined,
      g =
        o.observation?.kind === "plan_amendment" && c && l && s
          ? Ee2({ task_id: e.id, source: l, amended: s, authority: c })
          : null,
      C =
        g !== null &&
        r.provenance.evidence_digest === c?.provenance.evidence_digest &&
        JSON.stringify(o.observation?.added_scope_roots ?? []) === JSON.stringify(g),
      W =
        o.approval_mode === null &&
        c?.plan_revision === r.plan_revision &&
        c.plan_digest === r.plan_digest &&
        c.provenance.evidence_digest === r.provenance.evidence_digest;
    if (
      (o.observation?.kind !== "authority_delta" &&
        s?.approval_evidence_digest !== r.provenance.evidence_digest &&
        !C &&
        !W &&
        i.push("authority_plan"),
      o.observation?.kind === "policy_renewal")
    )
      (!c || x3(c, o).length > 0) && i.push("policy_renewal");
    else if (o.observation?.kind === "authority_delta") {
      let u = o.observation,
        p = c
          ? {
              ...r,
              digest: c.digest,
              repository_fingerprint: c.repository_fingerprint,
              scope_roots: c.scope_roots,
              repository_effects: c.repository_effects,
              provenance: c.provenance,
            }
          : null;
      (!c ||
        o.approval_mode === null ||
        o.approval_mode !== "manual_operator" ||
        r.provenance.kind !== "USER" ||
        r.provenance.parent_authority_digest !== c.digest ||
        r.provenance.evidence_digest !== c.provenance.evidence_digest ||
        u.evidence_digest !==
          z2({
            task_id: e.id,
            request_digest: u.request_digest,
            actor_id: r.provenance.actor_id,
          }) ||
        u.request_task_revision === undefined ||
        u.repository_evidence_digest === undefined ||
        u.added_scope_roots === undefined ||
        u.added_repository_effects === undefined ||
        u.added_scope_roots.length === 0 ||
        JSON.stringify(u.changed_paths) !==
          JSON.stringify([...new Set(u.changed_paths)].toSorted()) ||
        JSON.stringify(u.added_scope_roots) !==
          JSON.stringify([...new Set(u.added_scope_roots)].toSorted()) ||
        JSON.stringify(u.added_repository_effects) !==
          JSON.stringify([...new Set(u.added_repository_effects)].toSorted()) ||
        u.added_scope_roots.some((f) => !u.changed_paths.includes(f)) ||
        JSON.stringify(r.scope_roots) !==
          JSON.stringify([...new Set([...c.scope_roots, ...u.added_scope_roots])].toSorted()) ||
        JSON.stringify(r.repository_effects) !==
          JSON.stringify(
            [...new Set([...c.repository_effects, ...u.added_repository_effects])].toSorted(),
          ) ||
        !p ||
        G(p) !== G(c) ||
        G({
          task_id: e.id,
          task_revision: u.request_task_revision,
          plan_revision: c.plan_revision,
          plan_digest: c.plan_digest,
          parent_authority_digest: c.digest,
          repository_identity: c.repository_identity,
          previous_fingerprint: c.repository_fingerprint,
          repository_fingerprint: r.repository_fingerprint,
          repository_evidence_digest: u.repository_evidence_digest,
          changed_paths: u.changed_paths,
          added_scope_roots: u.added_scope_roots,
          added_repository_effects: u.added_repository_effects,
        }) !== u.request_digest) &&
        i.push("authority_delta");
    } else if (o.approval_mode === null) {
      let u = t[a - 1]?.authority;
      (!u || !o.observation || F3(u, o).length > 0) && i.push("authority_continuation");
    } else {
      let u =
        o.approval_mode === "repository_policy"
          ? r.provenance.kind === "SYSTEM"
          : r.provenance.kind === "USER";
      (o.observation !== null ||
        !u ||
        r.provenance.parent_authority_digest !== null ||
        s?.approval_actor_id !== r.provenance.actor_id) &&
        i.push("authority_approval");
    }
  }
  return i;
}
function F3(e, i) {
  let { authority: t, observation: n } = i;
  if (i.approval_mode !== null || !n) return ["observation_required"];
  let a = {
      ...t,
      plan_revision: e.plan_revision,
      plan_digest: e.plan_digest,
      repository_fingerprint: e.repository_fingerprint,
    },
    o =
      n.kind === "plan_amendment"
        ? {
            ...a,
            scope_roots: e.scope_roots,
            provenance: { ...a.provenance, evidence_digest: e.provenance.evidence_digest },
          }
        : a,
    r = Wr(e, o);
  if (!r.ok) return [...r.violations];
  let s = { ...o, digest: e.digest, provenance: e.provenance };
  if (G(s) !== G(e)) return ["authority_dimensions_changed"];
  if (
    t.digest !== v3(t) ||
    n.previous_fingerprint !== e.repository_fingerprint ||
    !/^sha256:[0-9a-f]{64}$/u.test(n.evidence_digest)
  )
    return ["observation_binding"];
  if (n.kind === "plan_amendment") {
    let c = n.added_scope_roots ?? [];
    if (
      t.plan_revision !== e.plan_revision + 1 ||
      t.plan_digest === e.plan_digest ||
      t.repository_fingerprint !== e.repository_fingerprint ||
      n.changed_paths.length > 0 ||
      JSON.stringify(c) !== JSON.stringify([...new Set(c)].toSorted()) ||
      JSON.stringify(t.scope_roots) !==
        JSON.stringify([...new Set([...e.scope_roots, ...c])].toSorted())
    )
      return ["plan_observation_binding"];
  } else {
    if (n.kind === "authority_delta") return ["authority_delta_requires_user"];
    if (
      t.plan_revision !== e.plan_revision ||
      t.plan_digest !== e.plan_digest ||
      t.repository_fingerprint === e.repository_fingerprint ||
      n.changed_paths.length === 0 ||
      !Wr(e, { ...a, scope_roots: n.changed_paths }).ok
    )
      return ["repository_observation_scope"];
  }
  return [];
}
function Te2(e, i) {
  let t = e.aggregate.authority_lineage?.at(-1)?.authority,
    n = e.aggregate.current_plan;
  if (
    !t ||
    !e.authority ||
    G(t) !== G(e.authority) ||
    e.actor.kind !== "SYSTEM" ||
    !e.actor.capabilities.includes("authority.observe") ||
    i.authority.provenance.actor_id !== e.actor.id ||
    i.authority.repository_fingerprint !== e.repository_fingerprint ||
    n?.state !== "APPROVED" ||
    i.authority.plan_revision !== n.revision ||
    i.authority.plan_digest !== n.digest
  )
    return ["native_authority_observation_required"];
  if (
    !Number.isFinite(Date.parse(e.occurred_at)) ||
    (t.expires_at !== null &&
      (!Number.isFinite(Date.parse(t.expires_at)) ||
        Date.parse(e.occurred_at) >= Date.parse(t.expires_at)))
  )
    return ["authority_expired"];
  if (i.observation?.kind === "plan_amendment") {
    let a = e.aggregate.plan_history.find((c) => c.digest === t.plan_digest),
      o =
        a?.approval_actor_id === n.approval_actor_id &&
        a?.approval_evidence_digest === n.approval_evidence_digest,
      r = a ? Ee2({ task_id: e.aggregate.id, source: a, amended: n, authority: t }) : null,
      s = r !== null && JSON.stringify(i.observation.added_scope_roots ?? []) === JSON.stringify(r);
    if (
      (!o && !s) ||
      (!s &&
        (a?.work_items.length !== n.work_items.length ||
          n.work_items.some((c) => {
            let l = a?.work_items.find((g) => g.id === c.id);
            return !l || l.contract_digest !== c.contract_digest;
          })))
    )
      return ["nonmaterial_plan_observation_required"];
  }
  return F3(t, i);
}
var Ie3 = {
  CAPTURED: ["PLANNING", "CANCELLED"],
  PLANNING: ["AWAITING_PLAN_APPROVAL", "CANCELLED"],
  AWAITING_PLAN_APPROVAL: ["PLANNING", "ACTIVE", "CANCELLED"],
  ACTIVE: ["FINAL_VALIDATION", "HUMAN_REQUIRED", "BLOCKED", "EFFECT_IN_DOUBT", "CANCELLED"],
  FINAL_VALIDATION: [
    "ACTIVE",
    "COMPLETED",
    "HUMAN_REQUIRED",
    "BLOCKED",
    "EFFECT_IN_DOUBT",
    "CANCELLED",
  ],
  COMPLETED: [],
  HUMAN_REQUIRED: ["ACTIVE", "BLOCKED", "CANCELLED"],
  BLOCKED: ["ACTIVE", "HUMAN_REQUIRED", "CANCELLED"],
  EFFECT_IN_DOUBT: ["ACTIVE"],
  CANCELLED: [],
};
var Ae3 = {
  request_human: [
    ["ACTIVE", "HUMAN_REQUIRED"],
    ["FINAL_VALIDATION", "HUMAN_REQUIRED"],
    ["BLOCKED", "HUMAN_REQUIRED"],
  ],
  block: [
    ["ACTIVE", "BLOCKED"],
    ["FINAL_VALIDATION", "BLOCKED"],
    ["HUMAN_REQUIRED", "BLOCKED"],
  ],
  resume: [
    ["FINAL_VALIDATION", "ACTIVE"],
    ["HUMAN_REQUIRED", "ACTIVE"],
    ["BLOCKED", "ACTIVE"],
  ],
  cancel: [
    ["CAPTURED", "CANCELLED"],
    ["PLANNING", "CANCELLED"],
    ["AWAITING_PLAN_APPROVAL", "CANCELLED"],
    ["ACTIVE", "CANCELLED"],
    ["FINAL_VALIDATION", "CANCELLED"],
    ["HUMAN_REQUIRED", "CANCELLED"],
    ["BLOCKED", "CANCELLED"],
  ],
};
var ve = {
  claim: [
    ["READY", "CLAIMED"],
    ["REWORK_READY", "CLAIMED"],
  ],
  begin: [["CLAIMED", "EXECUTING"]],
  inspect: [["RESULT_RECEIVED", "INSPECTING"]],
  validate: [["INSPECTING", "VALIDATING"]],
  rework: [["VALIDATING", "REWORK_READY"]],
  block: [
    ["READY", "BLOCKED"],
    ["CLAIMED", "BLOCKED"],
    ["EXECUTING", "BLOCKED"],
    ["RESULT_RECEIVED", "BLOCKED"],
    ["INSPECTING", "BLOCKED"],
    ["VALIDATING", "BLOCKED"],
    ["REWORK_READY", "BLOCKED"],
    ["EFFECT_IN_DOUBT", "BLOCKED"],
  ],
  resume: [["BLOCKED", "READY"]],
  complete: [["VALIDATING", "COMPLETED"]],
  cancel: [
    ["PLANNED", "CANCELLED"],
    ["READY", "CANCELLED"],
    ["CLAIMED", "CANCELLED"],
    ["EXECUTING", "CANCELLED"],
    ["RESULT_RECEIVED", "CANCELLED"],
    ["INSPECTING", "CANCELLED"],
    ["VALIDATING", "CANCELLED"],
    ["REWORK_READY", "CANCELLED"],
    ["BLOCKED", "CANCELLED"],
    ["EFFECT_IN_DOUBT", "CANCELLED"],
  ],
};
var Re2 = {
  PREPARED: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
  PENDING: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
  APPLIED: ["APPLIED"],
  NOT_APPLIED: ["NOT_APPLIED"],
  IN_DOUBT: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
  RECONCILED: [],
  SUPERSEDED: [],
};
var ke4 = {
  capture_intent: "intent_captured",
  transition_task: "task_transitioned",
  propose_plan: "plan_proposed",
  reject_plan: "plan_rejected",
  approve_plan: "plan_approved",
  continue_authority: "authority_continued",
  renew_policy_authority: "authority_continued",
  approve_authority_delta: "authority_continued",
  materialize_work_items: "work_items_materialized",
  transition_work_item: "work_item_transitioned",
  accept_work_item_result: "work_item_result_accepted",
  record_work_item_validation: "work_item_validation_recorded",
  record_final_validation: "final_validation_recorded",
  prepare_effect: "effect_prepared",
  begin_effect: "effect_started",
  observe_effect: "effect_observed",
  reconcile_effect: "effect_reconciled",
  supersede_effect: "effect_superseded",
  amend_plan: "plan_amended",
  request_authority_delta: "authority_delta_requested",
  complete_task: "task_completed",
  record_controller_transfer: "controller_transferred",
  record_migration: "migration_recorded",
};
function _(e, i, t = "request_fresh_packet") {
  return { kind: "rejected", code: e, facts: i, required_action: t };
}
function J(e, i) {
  return Ie3[e].includes(i);
}
function P2(e, i, t) {
  return e !== null && e.revision === i && e.digest === t;
}
function Se3(e) {
  return (
    e.command.kind === "reject_plan" &&
    e.aggregate.current_plan?.state === "APPROVED" &&
    e.aggregate.state === "ACTIVE" &&
    Object.values(e.aggregate.work_items).some((i) => i.state === "BLOCKED") &&
    e.actor.kind === "USER" &&
    e.actor.transport === "manual" &&
    e.command.rejection_evidence_digest !== undefined &&
    I2(e.command.rejection_evidence_digest)
  );
}
function Hi(e, i) {
  let t = e.authority;
  if (!t) return _("AUTHORITY_MISSING", [e.command.kind], "request_authority");
  if (t.task_id !== e.aggregate.id)
    return _("AUTHORITY_TASK_MISMATCH", [t.task_id, e.aggregate.id]);
  let n = Date.parse(e.occurred_at),
    a = t.expires_at === null ? 1 / 0 : Date.parse(t.expires_at);
  if (!Number.isFinite(n) || Number.isNaN(a) || n >= a)
    return _("AUTHORITY_SCOPE_EXCEEDED", ["authority_expired_or_invalid_time"]);
  let o = e.aggregate.authority_lineage?.at(-1)?.authority,
    r =
      e.command.kind === "propose_plan" &&
      e.aggregate.state === "PLANNING" &&
      e.aggregate.current_plan?.state === "REJECTED",
    s = Se3(e);
  if (o && e.command.kind !== "approve_plan") {
    if (t.digest !== v3(t)) return _("AUTHORITY_SCOPE_EXCEEDED", ["authority_digest"]);
    if (!r && !s && G(t) !== G(o) && !Wr(o, t).ok)
      return _("AUTHORITY_SCOPE_EXCEEDED", ["canonical_authority_lineage"]);
  }
  let c = e.aggregate.current_plan;
  return e.repository_fingerprint === null ||
    !Yr(t, {
      task_id: e.aggregate.id,
      plan_revision: c?.revision ?? null,
      plan_digest: c?.digest ?? null,
      repository_fingerprint: e.repository_fingerprint,
      work_item_id: i,
    })
    ? _("AUTHORITY_SCOPE_EXCEEDED", [t.digest])
    : null;
}
function Z2(e, i) {
  return (
    i !== undefined &&
    e.authority !== null &&
    qr(e.authority, i) &&
    i.capabilities.every((t) => e.actor.capabilities.includes(t))
  );
}
function Yi(e) {
  switch (e.kind) {
    case "transition_work_item":
    case "accept_work_item_result":
    case "record_work_item_validation":
      return e.work_item_id;
    default:
      return null;
  }
}
function w4(e, i) {
  let t = new Map(i.map((n) => [n.id, n]));
  return e.definition.expected_outputs.every((n) => {
    let a = t.get(n);
    return (
      a !== undefined &&
      a.task_id.length > 0 &&
      a.work_item_id === e.definition.id &&
      a.attempt === e.attempt
    );
  });
}
function I2(e) {
  return /^sha256:[0-9a-f]{64}$/u.test(e);
}
function he4(e) {
  return e.id.length > 0 && e.kind.length > 0 && I2(e.digest) && I2(e.repository_fingerprint);
}
function te3(e, i) {
  return e?.status === "PASSED" && i !== null && e.identity.implementation_identity === i;
}
function ee3(e, i) {
  let t = e.identity;
  return (
    i !== null &&
    I2(i) &&
    t.implementation_identity === i &&
    t.check_id.trim().length > 0 &&
    I2(t.command_digest) &&
    I2(t.toolchain_digest) &&
    I2(t.environment_digest) &&
    e.evidence_digests.length > 0 &&
    e.evidence_digests.every((n) => I2(n))
  );
}
function De2(e) {
  let i = { ...e };
  for (let [t, n] of Object.entries(i))
    n.state === "PLANNED" &&
      n.definition.depends_on.every((a) => i[a]?.state === "COMPLETED") &&
      Ne(n, i) &&
      (i[t] = { ...n, state: "READY", revision: n.revision + 1 });
  return i;
}
function Ne(e, i) {
  return e.definition.required_inputs.every((t) =>
    Object.values(i).some(
      (n) =>
        n.definition.id !== e.definition.id &&
        n.state === "COMPLETED" &&
        n.definition.expected_outputs.includes(t) &&
        te3(n.validation, n.result_digest) &&
        w4(n, n.output_manifests) &&
        n.output_manifests.some((a) => a.id === t && he4(a)),
    ),
  );
}
function zi(e, i) {
  return { ...e, state: i };
}
function Q3(e, i) {
  return i.some((t) => t.state === "IN_DOUBT")
    ? "EFFECT_IN_DOUBT"
    : e === "EFFECT_IN_DOUBT"
      ? "ACTIVE"
      : e;
}
function Ce3(e, i) {
  let t = G(e.command),
    n = {
      id: `${e.mutation_id}:${ke4[e.command.kind]}`,
      kind: ke4[e.command.kind],
      task_id: i.id,
      task_revision: i.revision,
      mutation_id: e.mutation_id,
      occurred_at: e.occurred_at,
      command_digest: t,
      payload_digest: G({ kind: e.command.kind, aggregate_revision: i.revision }),
    },
    a = {
      mutation_id: e.mutation_id,
      command_digest: t,
      before_revision: e.aggregate.revision,
      after_revision: i.revision,
      aggregate_digest: G(i),
      event_digests: [G(n)],
      effect_ids:
        e.command.kind === "prepare_effect"
          ? [e.command.effect.id]
          : e.command.kind === "begin_effect" ||
              e.command.kind === "observe_effect" ||
              e.command.kind === "reconcile_effect" ||
              e.command.kind === "supersede_effect"
            ? [e.command.effect_id]
            : [],
    };
  return {
    kind: "accepted",
    aggregate: { ...i, mutation_receipts: { ...i.mutation_receipts, [e.mutation_id]: a } },
    events: [n],
    receipts: [a],
  };
}
function $i(e) {
  let i = G(e.command),
    t = e.aggregate.mutation_receipts[e.mutation_id];
  if (t)
    return t.command_digest !== i
      ? _("MUTATION_ID_CONFLICT", [e.mutation_id], "use_new_mutation_id")
      : { kind: "accepted", aggregate: e.aggregate, events: [], receipts: [t] };
  if (e.aggregate.state === "COMPLETED" || e.aggregate.state === "CANCELLED")
    return _("ILLEGAL_TASK_TRANSITION", [e.aggregate.state, e.command.kind]);
  if (e.command.task_id !== e.aggregate.id)
    return _("TASK_ID_MISMATCH", [e.command.task_id, e.aggregate.id]);
  if (e.command.expected_task_revision !== e.aggregate.revision)
    return _("STALE_TASK_REVISION", [
      String(e.command.expected_task_revision),
      String(e.aggregate.revision),
    ]);
  if (
    e.repository_fingerprint === null ||
    e.command.expected_state_fingerprint !== e.repository_fingerprint
  )
    return _("STALE_STATE_FINGERPRINT", [
      e.command.expected_state_fingerprint,
      e.repository_fingerprint ?? "null",
    ]);
  let n = e.aggregate.effects.find((o) => o.state === "IN_DOUBT" || o.state === "PENDING");
  if (
    n &&
    e.command.kind !== "observe_effect" &&
    e.command.kind !== "reconcile_effect" &&
    e.command.kind !== "supersede_effect"
  )
    return _("EFFECT_RECONCILIATION_REQUIRED", [n.id], "reconcile_effect");
  if (e.command.kind === "renew_policy_authority") {
    let o = e.command.record,
      r = e.aggregate.authority_lineage?.at(-1)?.authority,
      s = e.aggregate.current_plan;
    return !r ||
      !["ACTIVE", "BLOCKED", "HUMAN_REQUIRED", "FINAL_VALIDATION"].includes(e.aggregate.state) ||
      s?.state !== "APPROVED" ||
      s.revision !== r.plan_revision ||
      s.digest !== r.plan_digest ||
      e.actor.kind !== "USER" ||
      e.actor.transport !== "manual" ||
      e.actor.id !== o.authority.provenance.actor_id ||
      e.authority !== null ||
      o.authority.repository_fingerprint !== e.repository_fingerprint ||
      o.observation?.request_task_revision !== e.aggregate.revision ||
      (r.expires_at !== null && Date.parse(r.expires_at) <= Date.parse(e.occurred_at)) ||
      x3(r, o).length > 0
      ? _("AUTHORITY_SCOPE_EXCEEDED", ["policy_renewal_binding"])
      : null;
  }
  if (e.command.kind === "continue_authority") {
    let o = Te2(e, e.command.record);
    return o.length > 0 ? _("AUTHORITY_SCOPE_EXCEEDED", o) : null;
  }
  if (e.command.kind === "approve_authority_delta") {
    let o = e.command,
      r = e.aggregate.authority_lineage?.at(-1)?.authority,
      s = o.record,
      { observation: c, authority: l } = s,
      g = r
        ? {
            ...l,
            digest: r.digest,
            repository_fingerprint: r.repository_fingerprint,
            scope_roots: r.scope_roots,
            repository_effects: r.repository_effects,
            provenance: r.provenance,
          }
        : null;
    return !r ||
      e.actor.kind !== "USER" ||
      e.actor.transport !== "manual" ||
      e.authority !== null ||
      o.parent_authority_digest !== r.digest ||
      s.approval_mode !== "manual_operator" ||
      c?.kind !== "authority_delta" ||
      c.request_digest !== o.request_digest ||
      c.request_task_revision !== e.aggregate.revision ||
      c.repository_evidence_digest === undefined ||
      c.previous_fingerprint !== r.repository_fingerprint ||
      l.repository_fingerprint !== e.repository_fingerprint ||
      l.provenance.kind !== "USER" ||
      l.provenance.actor_id !== e.actor.id ||
      l.provenance.parent_authority_digest !== r.digest ||
      l.provenance.evidence_digest !== r.provenance.evidence_digest ||
      c.evidence_digest !==
        z2({ task_id: e.aggregate.id, request_digest: o.request_digest, actor_id: e.actor.id }) ||
      l.digest !== v3(l) ||
      !g ||
      G(g) !== G(r) ||
      JSON.stringify(l.scope_roots) !==
        JSON.stringify(
          [...new Set([...r.scope_roots, ...(c.added_scope_roots ?? [])])].toSorted(),
        ) ||
      JSON.stringify(l.repository_effects) !==
        JSON.stringify(
          [...new Set([...r.repository_effects, ...(c.added_repository_effects ?? [])])].toSorted(),
        ) ||
      G({
        task_id: e.aggregate.id,
        task_revision: e.aggregate.revision,
        plan_revision: r.plan_revision,
        plan_digest: r.plan_digest,
        parent_authority_digest: r.digest,
        repository_identity: r.repository_identity,
        previous_fingerprint: r.repository_fingerprint,
        repository_fingerprint: e.repository_fingerprint,
        repository_evidence_digest: c.repository_evidence_digest,
        changed_paths: c.changed_paths,
        added_scope_roots: c.added_scope_roots ?? [],
        added_repository_effects: c.added_repository_effects ?? [],
      }) !== o.request_digest ||
      q4({ ...e.aggregate, authority_lineage: [...(e.aggregate.authority_lineage ?? []), s] })
        .length > 0
      ? _("AUTHORITY_SCOPE_EXCEEDED", ["authority_delta_binding"])
      : null;
  }
  let a = Yi(e.command);
  if (a !== null) {
    if (e.aggregate.state !== "ACTIVE")
      return _("ILLEGAL_TASK_TRANSITION", [e.aggregate.state, e.command.kind]);
    if (!e.aggregate.current_plan) return _("CURRENT_PLAN_MISSING", []);
    if (e.aggregate.current_plan.state !== "APPROVED")
      return _("CURRENT_PLAN_NOT_APPROVED", [e.aggregate.current_plan.state]);
    let o = e.aggregate.work_items[a],
      r = e.aggregate.current_plan.work_items.find((s) => s.id === a);
    if (o && (!r || G(o.definition) !== G(r)))
      return _("PLAN_DIGEST_MISMATCH", [a, "runtime_definition_mismatch"]);
    if (o && !Z2(e, o.definition.execution_requirements))
      return _("AUTHORITY_SCOPE_EXCEEDED", [a, "execution_requirements"]);
  }
  return Hi(e, a);
}
function Xi(e, i) {
  let t = e.aggregate,
    n = t.current_plan;
  if (!P2(n, i.plan_revision, i.plan_digest)) return _("PLAN_DIGEST_MISMATCH", [i.plan_digest]);
  if (n.state !== "APPROVED") return _("CURRENT_PLAN_NOT_APPROVED", [n.state]);
  if (t.state !== "ACTIVE" && t.state !== "FINAL_VALIDATION")
    return _("ILLEGAL_TASK_TRANSITION", [t.state, i.kind]);
  let a = i.amended_plan;
  if (a.revision !== n.revision + 1) return _("PLAN_REVISION_MISMATCH", [String(a.revision)]);
  if (
    i.amendment_digest !== G(a) ||
    a.digest !== G({ revision: a.revision, work_items: a.work_items })
  )
    return _("PLAN_DIGEST_MISMATCH", [a.digest]);
  let o = Ie2(a.work_items);
  if (o.length > 0) return _("WORK_ITEM_DEPENDENCY_INCOMPLETE", o);
  let r = new Map(n.work_items.map((p) => [p.id, p])),
    s =
      a.work_items.length !== n.work_items.length ||
      a.work_items.some((p) => r.get(p.id)?.contract_digest !== p.contract_digest || !r.has(p.id));
  if (s) {
    let p = vt(n.work_items, a.work_items, i.work_contracts ?? {});
    if (p.length > 0) return _("PLAN_SCOPE_EXPANSION_REQUIRES_USER", p, "request_authority_delta");
  }
  let c = a.work_items.filter((p) => {
      let f = r.get(p.id);
      return (
        f?.execution_requirements !== undefined &&
        p.execution_requirements !== undefined &&
        !qr(f.execution_requirements, p.execution_requirements)
      );
    }),
    l = O3({
      task_id: t.id,
      current_plan_digest: n.digest,
      amended_plan_digest: a.digest,
      actor_id: e.actor.id,
    }),
    g =
      (s || c.length > 0) &&
      e.actor.kind === "USER" &&
      i.authority_delta_digest === l &&
      e.authority !== null &&
      e.authority.work_item_id === null &&
      L4({ current: n, amended: a, authority: e.authority }) !== null;
  if (
    (i.authority_delta_digest !== null && !g) ||
    (s && !g) ||
    a.work_items.some((p) => {
      let f = r.get(p.id);
      return f
        ? (!g && f.contract_digest !== p.contract_digest) ||
            (!f.optional && p.optional) ||
            (!g && !f.expected_outputs.every((A) => p.expected_outputs.includes(A))) ||
            (!g && !f.required_inputs.every((A) => p.required_inputs.includes(A))) ||
            (!g && !f.depends_on.every((A) => p.depends_on.includes(A))) ||
            !p.execution_requirements ||
            !f.execution_requirements ||
            (!qr(f.execution_requirements, p.execution_requirements) && !g) ||
            e.authority?.work_item_id !== null ||
            (!g && !qr(e.authority, p.execution_requirements))
        : !g;
    })
  )
    return _(
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      ["amendment_changes_authority_or_work_item_set"],
      "request_authority_delta",
    );
  let C = t.effects.find((p) => ["PREPARED", "PENDING", "IN_DOUBT"].includes(p.state));
  if (C) return _("EFFECT_RECONCILIATION_REQUIRED", [C.id]);
  let W = new Map(a.work_items.map((p) => [p.id, p])),
    u = {};
  for (let [p, f] of Object.entries(t.work_items)) {
    let A = r.get(p),
      j = W.get(p);
    if (!A || G(f.definition) !== G(A))
      return _("PLAN_DIGEST_MISMATCH", [p, "runtime_definition_mismatch"]);
    if (!j) {
      if (!g || !["PLANNED", "READY"].includes(f.state) || f.attempt !== 0)
        return _("ILLEGAL_WORK_ITEM_TRANSITION", [p, f.state, "remove_work_item"]);
      continue;
    }
    let de = G(j) !== G(A);
    if (
      !["PLANNED", "READY", "REWORK_READY", "BLOCKED", "COMPLETED", "CANCELLED"].includes(
        f.state,
      ) ||
      (de && (f.state === "COMPLETED" || f.state === "CANCELLED"))
    )
      return _("ILLEGAL_WORK_ITEM_TRANSITION", [p, f.state, "amend_plan"], "wait_or_replan");
    u[p] = de
      ? {
          ...f,
          definition: j,
          state: "PLANNED",
          revision: f.revision + 1,
          claim_id: null,
          result_digest: null,
          output_manifests: [],
          validation: null,
        }
      : f;
  }
  for (let p of a.work_items)
    r.has(p.id) ||
      (u[p.id] = {
        definition: p,
        state: "PLANNED",
        revision: 1,
        attempt: 0,
        claim_id: null,
        result_digest: null,
        output_manifests: [],
        validation: null,
      });
  return Ce3(e, {
    ...t,
    revision: t.revision + 1,
    state: "ACTIVE",
    current_plan: {
      ...n,
      ...a,
      ...(g ? { approval_actor_id: e.actor.id, approval_evidence_digest: l } : {}),
    },
    plan_history: [...t.plan_history, { ...n, state: "SUPERSEDED" }],
    work_items: De2(u),
    final_validation: null,
  });
}
function Oe3(e) {
  let i = $i(e);
  if (i) return i;
  let { aggregate: t, command: n } = e,
    a;
  switch (n.kind) {
    case "capture_intent": {
      if (!J(t.state, "PLANNING")) return _("ILLEGAL_TASK_TRANSITION", [t.state, "PLANNING"]);
      a = { ...t, revision: t.revision + 1, state: "PLANNING", intent_digest: n.intent_digest };
      break;
    }
    case "transition_task": {
      let o = Ae3[n.action].find(([r]) => r === t.state);
      if (!o) return _("ILLEGAL_TASK_TRANSITION", [t.state, n.action]);
      a = {
        ...t,
        revision: t.revision + 1,
        state: o[1],
        final_validation: n.action === "resume" ? null : t.final_validation,
      };
      break;
    }
    case "propose_plan": {
      if (!J(t.state, "AWAITING_PLAN_APPROVAL"))
        return _("ILLEGAL_TASK_TRANSITION", [t.state, "AWAITING_PLAN_APPROVAL"]);
      if (n.plan.state !== "PROPOSED") return _("ILLEGAL_TASK_TRANSITION", ["plan", n.plan.state]);
      if (n.plan.revision !== (t.current_plan?.revision ?? 0) + 1)
        return _("PLAN_REVISION_MISMATCH", [String(n.plan.revision)]);
      if (
        n.plan.work_items.some((r) => r.contract_digest !== undefined) &&
        n.plan.digest !== G({ revision: n.plan.revision, work_items: n.plan.work_items })
      )
        return _("PLAN_DIGEST_MISMATCH", [n.plan.digest]);
      let o = Ie2(n.plan.work_items);
      if (o.length > 0) return _("WORK_ITEM_DEPENDENCY_INCOMPLETE", o);
      a = {
        ...t,
        revision: t.revision + 1,
        state: "AWAITING_PLAN_APPROVAL",
        current_plan: n.plan,
        plan_history: t.current_plan ? [...t.plan_history, t.current_plan] : t.plan_history,
        work_items: {},
        final_validation: null,
      };
      break;
    }
    case "reject_plan": {
      if (!P2(t.current_plan, n.plan_revision, n.plan_digest))
        return _("PLAN_DIGEST_MISMATCH", [n.plan_digest]);
      let o = Se3(e);
      if (t.current_plan.state !== "PROPOSED" && !o)
        return _("ILLEGAL_TASK_TRANSITION", [t.current_plan.state, "REJECTED"]);
      a = {
        ...t,
        revision: t.revision + 1,
        state: "PLANNING",
        current_plan: { ...t.current_plan, state: "REJECTED" },
      };
      break;
    }
    case "approve_plan": {
      let o = e.authority?.provenance,
        r =
          n.authority_mode === "repository_policy" &&
          e.actor.kind === "SYSTEM" &&
          o?.kind === "SYSTEM",
        s =
          n.authority_mode !== "repository_policy" && e.actor.kind === "USER" && o?.kind === "USER";
      if (
        (!r && !s) ||
        o.parent_authority_digest !== null ||
        o.actor_id !== e.actor.id ||
        o.evidence_digest !== n.approval_evidence_digest
      )
        return _("AUTHORITY_PROVENANCE_ESCALATION", ["plan_approval_requires_user_evidence"]);
      if (!P2(t.current_plan, n.plan_revision, n.plan_digest))
        return _("PLAN_DIGEST_MISMATCH", [n.plan_digest]);
      if (t.current_plan.state !== "PROPOSED" || !J(t.state, "ACTIVE"))
        return _("ILLEGAL_TASK_TRANSITION", [t.state, "ACTIVE"]);
      if (t.authority_lineage && !n.authority_mode)
        return _("AUTHORITY_SCOPE_EXCEEDED", ["canonical_approval_mode_required"]);
      if (n.authority_mode) {
        let c = e.authority;
        if (!c) return _("AUTHORITY_MISSING", ["canonical_approval_authority"]);
        if (c.digest !== v3(c) || c.work_item_id !== null)
          return _("AUTHORITY_SCOPE_EXCEEDED", ["canonical_approval_authority"]);
      }
      a = {
        ...t,
        ...(n.authority_mode && e.authority
          ? {
              authority_lineage: [
                ...(t.authority_lineage ?? []),
                { authority: e.authority, approval_mode: n.authority_mode, observation: null },
              ],
            }
          : {}),
        revision: t.revision + 1,
        state: "ACTIVE",
        current_plan: {
          ...t.current_plan,
          state: "APPROVED",
          approval_actor_id: e.actor.id,
          approval_evidence_digest: n.approval_evidence_digest,
        },
      };
      break;
    }
    case "renew_policy_authority":
    case "continue_authority": {
      a = {
        ...t,
        revision: t.revision + 1,
        authority_lineage: [...(t.authority_lineage ?? []), n.record],
      };
      break;
    }
    case "approve_authority_delta": {
      a = {
        ...t,
        revision: t.revision + 1,
        authority_lineage: [...(t.authority_lineage ?? []), n.record],
      };
      break;
    }
    case "materialize_work_items": {
      if (t.state !== "ACTIVE") return _("ILLEGAL_TASK_TRANSITION", [t.state, n.kind]);
      if (!P2(t.current_plan, n.plan_revision, n.plan_digest))
        return _("PLAN_DIGEST_MISMATCH", [n.plan_digest]);
      if (t.current_plan.state !== "APPROVED")
        return _("CURRENT_PLAN_NOT_APPROVED", [t.current_plan.state]);
      if (Object.keys(t.work_items).length > 0)
        return _("ILLEGAL_TASK_TRANSITION", ["work_items_already_materialized"]);
      let o = Ie2(t.current_plan.work_items);
      if (o.length > 0) return _("WORK_ITEM_DEPENDENCY_INCOMPLETE", o);
      let r = Object.fromEntries(
        t.current_plan.work_items.map((s) => [
          s.id,
          {
            definition: s,
            state:
              s.depends_on.length === 0 && s.required_inputs.length === 0 ? "READY" : "PLANNED",
            revision: 1,
            attempt: 0,
            claim_id: null,
            result_digest: null,
            output_manifests: [],
            validation: null,
          },
        ]),
      );
      a = { ...t, revision: t.revision + 1, work_items: r };
      break;
    }
    case "transition_work_item": {
      let o = t.work_items[n.work_item_id];
      if (!o) return _("WORK_ITEM_MISSING", [n.work_item_id]);
      let r = ve[n.action].find(([g]) => g === o.state);
      if (!r) return _("ILLEGAL_WORK_ITEM_TRANSITION", [o.state, n.action]);
      if (
        n.action === "claim" &&
        !o.definition.depends_on.every((g) => t.work_items[g]?.state === "COMPLETED")
      )
        return _("WORK_ITEM_DEPENDENCY_INCOMPLETE", o.definition.depends_on);
      if (n.action === "claim" && !n.claim_id)
        return _("ILLEGAL_WORK_ITEM_TRANSITION", ["claim_id_missing"]);
      if (n.action === "claim" && !Ne(o, t.work_items))
        return _("WORK_ITEM_DEPENDENCY_INCOMPLETE", o.definition.required_inputs);
      if (n.action === "claim") {
        let g = ne3(o, Object.values(t.work_items));
        if (g.length > 0) return _("WORK_ITEM_RESOURCE_CONFLICT", g);
      }
      if (n.action === "complete") {
        if (!w4(o, o.output_manifests))
          return _("WORK_ITEM_OUTPUT_MISSING", o.definition.expected_outputs);
        if (!te3(o.validation, o.result_digest))
          return _("WORK_ITEM_VALIDATION_MISSING", [n.work_item_id]);
      }
      let [, s] = r,
        c = {
          ...o,
          state: s,
          revision: o.revision + 1,
          attempt: n.action === "claim" ? o.attempt + 1 : o.attempt,
          claim_id: n.action === "claim" ? n.claim_id : o.claim_id,
          result_digest: n.action === "claim" ? null : o.result_digest,
          output_manifests: n.action === "claim" ? [] : o.output_manifests,
          validation: n.action === "claim" ? null : o.validation,
        },
        l = { ...t.work_items, [n.work_item_id]: c };
      a = { ...t, revision: t.revision + 1, work_items: n.action === "complete" ? De2(l) : l };
      break;
    }
    case "accept_work_item_result": {
      if (!P2(t.current_plan, n.plan_revision, n.plan_digest))
        return _("PLAN_DIGEST_MISMATCH", [n.plan_digest]);
      let o = t.work_items[n.work_item_id];
      if (!o) return _("WORK_ITEM_MISSING", [n.work_item_id]);
      if (o.state !== "EXECUTING")
        return _("ILLEGAL_WORK_ITEM_TRANSITION", [o.state, "RESULT_RECEIVED"]);
      if (
        !I2(n.result_digest) ||
        new Set(n.output_manifests.map((r) => r.id)).size !== n.output_manifests.length ||
        n.output_manifests.some(
          (r) =>
            !he4(r) ||
            r.task_id !== t.id ||
            r.plan_revision !== n.plan_revision ||
            r.work_item_id !== n.work_item_id ||
            r.attempt !== o.attempt ||
            r.repository_fingerprint !== e.repository_fingerprint,
        )
      )
        return _("WORK_ITEM_RESULT_TARGET_MISMATCH", [n.work_item_id]);
      if (!w4(o, n.output_manifests))
        return _("WORK_ITEM_OUTPUT_MISSING", o.definition.expected_outputs);
      a = {
        ...t,
        revision: t.revision + 1,
        work_items: {
          ...t.work_items,
          [n.work_item_id]: {
            ...o,
            state: "RESULT_RECEIVED",
            revision: o.revision + 1,
            result_digest: n.result_digest,
            output_manifests: [...n.output_manifests],
            validation: null,
          },
        },
      };
      break;
    }
    case "record_work_item_validation": {
      let o = t.work_items[n.work_item_id];
      if (!o) return _("WORK_ITEM_MISSING", [n.work_item_id]);
      if (!ee3(n.validation, o.result_digest))
        return _("VALIDATION_IDENTITY_MISMATCH", [n.work_item_id]);
      if (o.state !== "INSPECTING" && o.state !== "VALIDATING")
        return _("ILLEGAL_WORK_ITEM_TRANSITION", [o.state, "VALIDATING"]);
      a = {
        ...t,
        revision: t.revision + 1,
        work_items: {
          ...t.work_items,
          [n.work_item_id]: {
            ...o,
            state: "VALIDATING",
            revision: o.revision + 1,
            validation: n.validation,
          },
        },
      };
      break;
    }
    case "record_final_validation": {
      if (!ee3(n.validation, e.repository_fingerprint))
        return _("VALIDATION_IDENTITY_MISMATCH", ["final_validation"]);
      if (n.validation.status !== "PASSED")
        return _("FINAL_VALIDATION_MISSING", [n.validation.status]);
      if (t.state !== "ACTIVE" && t.state !== "FINAL_VALIDATION")
        return _("ILLEGAL_TASK_TRANSITION", [t.state, "FINAL_VALIDATION"]);
      if (!Le2(t)) return _("TASK_COMPLETION_INELIGIBLE", ["required_work_incomplete"]);
      a = {
        ...t,
        revision: t.revision + 1,
        state: "FINAL_VALIDATION",
        final_validation: n.validation,
      };
      break;
    }
    case "prepare_effect": {
      if (t.state !== "ACTIVE" && t.state !== "FINAL_VALIDATION")
        return _("ILLEGAL_TASK_TRANSITION", [t.state, n.kind]);
      if (
        !e.authority?.external_effects.includes(n.effect.kind) ||
        !Z2(e, n.effect.execution_requirements)
      )
        return _("AUTHORITY_SCOPE_EXCEEDED", [n.effect.kind]);
      if (
        t.effects.some(
          (o) => o.id === n.effect.id || o.idempotency_key === n.effect.idempotency_key,
        )
      )
        return _("MUTATION_ID_CONFLICT", [n.effect.id]);
      if (
        n.effect.state !== "PREPARED" ||
        !n.effect.id.trim() ||
        !n.effect.idempotency_key.trim() ||
        !I2(n.effect.request_digest)
      )
        return _("ILLEGAL_TASK_TRANSITION", ["effect", n.effect.state]);
      a = { ...t, revision: t.revision + 1, effects: [...t.effects, n.effect] };
      break;
    }
    case "begin_effect": {
      if (t.state !== "ACTIVE" && t.state !== "FINAL_VALIDATION")
        return _("ILLEGAL_TASK_TRANSITION", [t.state, n.kind]);
      let o = t.effects.find((r) => r.id === n.effect_id);
      if (o?.state !== "PREPARED") return _("EFFECT_RECONCILIATION_REQUIRED", [n.effect_id]);
      if (!e.authority?.external_effects.includes(o.kind) || !Z2(e, o.execution_requirements))
        return _("AUTHORITY_SCOPE_EXCEEDED", [o.kind]);
      a = {
        ...t,
        revision: t.revision + 1,
        effects: t.effects.map((r) => (r.id === o.id ? { ...r, state: "PENDING" } : r)),
      };
      break;
    }
    case "observe_effect": {
      let o = t.effects.findIndex((s) => s.id === n.effect_id);
      if (o === -1) return _("EFFECT_RECONCILIATION_REQUIRED", [n.effect_id]);
      if (!Re2[t.effects[o].state].includes(n.observed_state))
        return _("EFFECT_RECONCILIATION_REQUIRED", [
          n.effect_id,
          t.effects[o].state,
          n.observed_state,
        ]);
      let r = [...t.effects];
      ((r[o] = { ...r[o], state: n.observed_state, observed_state_digest: n.observation_digest }),
        (a = { ...t, revision: t.revision + 1, state: Q3(t.state, r), effects: r }));
      break;
    }
    case "reconcile_effect": {
      let o = t.effects.findIndex((s) => s.id === n.effect_id);
      if (o === -1) return _("EFFECT_RECONCILIATION_REQUIRED", [n.effect_id]);
      if (t.effects[o].state !== "IN_DOUBT")
        return _("EFFECT_RECONCILIATION_REQUIRED", [t.effects[o].state]);
      let r = [...t.effects];
      ((r[o] = {
        ...r[o],
        state: "RECONCILED",
        provider_receipt_digest: n.provider_receipt_digest,
        observed_state_digest: G(n.resolution),
      }),
        (a = { ...t, revision: t.revision + 1, state: Q3(t.state, r), effects: r }));
      break;
    }
    case "supersede_effect": {
      let o = t.effects.findIndex((c) => c.id === n.effect_id),
        r = t.effects.find((c) => c.id === n.replacement_effect_id);
      if (
        o === -1 ||
        t.effects[o].state !== "IN_DOUBT" ||
        r?.state !== "PREPARED" ||
        r?.id === n.effect_id
      )
        return _("EFFECT_RECONCILIATION_REQUIRED", [n.effect_id]);
      let s = [...t.effects];
      ((s[o] = zi(s[o], "SUPERSEDED")),
        (a = { ...t, revision: t.revision + 1, state: Q3(t.state, s), effects: s }));
      break;
    }
    case "amend_plan":
      return Xi(e, n);
    case "request_authority_delta": {
      if (e.authority?.digest !== n.parent_authority_digest)
        return _("AUTHORITY_SCOPE_EXCEEDED", [n.parent_authority_digest]);
      a = { ...t, revision: t.revision + 1 };
      break;
    }
    case "complete_task": {
      if (!t.current_plan) return _("CURRENT_PLAN_MISSING", []);
      if (t.current_plan.state !== "APPROVED")
        return _("CURRENT_PLAN_NOT_APPROVED", [t.current_plan.state]);
      let o = t.current_plan.work_items.filter((l) => !l.optional),
        r = o.filter((l) => t.work_items[l.id]?.state !== "COMPLETED"),
        s = o.filter((l) => {
          let g = t.work_items[l.id];
          return !g || !w4(g, g.output_manifests);
        }),
        c = t.effects.filter((l) => ["PREPARED", "PENDING", "IN_DOUBT"].includes(l.state));
      if (e.repository_fingerprint === null || !ie3(t, e.repository_fingerprint))
        return _("TASK_COMPLETION_INELIGIBLE", [
          ...r.map((l) => `incomplete:${l.id}`),
          ...s.map((l) => `outputs:${l.id}`),
          ...c.map((l) => `effect:${l.id}:${l.state}`),
        ]);
      a = { ...t, revision: t.revision + 1, state: "COMPLETED" };
      break;
    }
    case "record_controller_transfer": {
      if (
        !n.receipt.from_controller ||
        !n.receipt.to_controller ||
        n.receipt.from_controller === n.receipt.to_controller ||
        n.receipt.authority_digest !== e.authority?.digest
      )
        return _("CONTROLLER_TRANSFER_INVALID", [n.receipt.from_controller]);
      a = { ...t, revision: t.revision + 1, controller_transfer: n.receipt };
      break;
    }
    case "record_migration": {
      if (
        !n.receipt.migration_version ||
        n.receipt.canonical_digest === n.receipt.source_digest ||
        t.migration_receipts.some((o) => o.migration_version === n.receipt.migration_version)
      )
        return _("MIGRATION_RECEIPT_INVALID", [n.receipt.migration_version]);
      a = {
        ...t,
        revision: t.revision + 1,
        migration_receipts: [...t.migration_receipts, n.receipt],
      };
      break;
    }
  }
  return Ce3(e, a);
}
function ie3(e, i) {
  return e.state !== "FINAL_VALIDATION" ||
    e.current_plan?.state !== "APPROVED" ||
    e.final_validation?.status !== "PASSED" ||
    !ee3(e.final_validation, i)
    ? false
    : Le2(e) &&
        e.effects.every((t) =>
          ["APPLIED", "NOT_APPLIED", "RECONCILED", "SUPERSEDED"].includes(t.state),
        );
}
function Le2(e) {
  return (
    Object.values(e.work_items).every(
      (i) => i.claim_id === null || i.state === "COMPLETED" || i.state === "CANCELLED",
    ) &&
    e.current_plan?.state === "APPROVED" &&
    e.current_plan.work_items
      .filter((i) => !i.optional)
      .every((i) => {
        let t = e.work_items[i.id];
        return (
          t?.state === "COMPLETED" &&
          G(t.definition) === G(i) &&
          w4(t, t.output_manifests) &&
          te3(t.validation, t.result_digest)
        );
      })
  );
}
var xe2 = Ie3;
function ne3(e, i) {
  let t = new Set(e.definition.execution_requirements.resources);
  return i
    .filter(
      (n) =>
        n.definition.id !== e.definition.id &&
        n.claim_id !== null &&
        [
          "CLAIMED",
          "EXECUTING",
          "RESULT_RECEIVED",
          "INSPECTING",
          "VALIDATING",
          "BLOCKED",
          "EFFECT_IN_DOUBT",
        ].includes(n.state),
    )
    .flatMap((n) =>
      n.definition.execution_requirements.resources
        .filter((a) => t.has(a))
        .map((a) => `${n.definition.id}:${a}`),
    )
    .toSorted();
}
var Pe3 = Ae3;
var we3 = ve;
var be3 = Re2;
var mn2 = new Set([
  "CAPTURED",
  "PLANNING",
  "AWAITING_PLAN_APPROVAL",
  "ACTIVE",
  "FINAL_VALIDATION",
  "COMPLETED",
  "HUMAN_REQUIRED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
]);
var En2 = new Set([
  "PLANNED",
  "READY",
  "CLAIMED",
  "EXECUTING",
  "RESULT_RECEIVED",
  "INSPECTING",
  "VALIDATING",
  "REWORK_READY",
  "COMPLETED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
]);

// packages/core/src/schemas/zod-error-format.ts
function formatZodIssues(prefix, issues) {
  if (issues.length === 0) return prefix;
  return issues.map((issue) => fromZodIssue(issue, { prefix }).message).join("; ");
}

// packages/core/src/types/guards.ts
function isRecord(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

// packages/core/src/tasks/task-artifact-schema.shared.ts
var NON_EMPTY_STRING = string2().min(1);
var ISO_UTC_TIMESTAMP = string2().datetime({ offset: true });
var NULLABLE_NON_EMPTY_STRING = NON_EMPTY_STRING.nullable();
var NULLABLE_ISO_UTC_TIMESTAMP = ISO_UTC_TIMESTAMP.nullable();
function zodToDraft7JsonSchema(schema, reused) {
  return toJSONSchema(schema, {
    target: "draft-07",
    unrepresentable: "any",
    io: "input",
    reused,
    cycles: "throw",
  });
}
function buildJsonSchemaDocument(schema, meta, options = {}) {
  const generated = zodToDraft7JsonSchema(schema, options.reused ?? "inline");
  const { $schema: _schema, definitions: _definitions, ...rest } = generated;
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: meta.$id,
    title: meta.title,
    ...(meta.description ? { description: meta.description } : {}),
    ...(options.reused === "ref" && _definitions ? { definitions: _definitions } : {}),
    ...rest,
  };
}

// packages/core/src/tasks/task-artifact-schema.acr.ts
var ACR_VERSION = "0.1.0";
var SHA256_DIGEST_SCHEMA = string2().regex(/^sha256:[0-9a-f]{64}$/);
var GIT_OID_SCHEMA = string2().regex(/^[a-f0-9]{7,64}$/);
var REPOSITORY_RELATIVE_PATH_SCHEMA = string2()
  .min(1)
  .regex(/^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$)).+$/);
var ACR_RISK_CATEGORY_SCHEMA = _enum([
  "auth",
  "secrets",
  "payments",
  "infra",
  "ci",
  "dependencies",
  "data_model",
  "security",
  "generated_code",
  "public_api",
  "docs",
  "tests",
  "tooling",
  "cli",
  "schema",
  "policy",
  "evidence",
  "custom",
]);
var PRINCIPAL_SCHEMA = object({
  type: NON_EMPTY_STRING,
  id: NON_EMPTY_STRING,
}).strict();
var EXTERNAL_REF_SCHEMA = object({
  type: NON_EMPTY_STRING,
  id: NON_EMPTY_STRING,
}).strict();
var ARTIFACT_SCHEMA = object({
  path: REPOSITORY_RELATIVE_PATH_SCHEMA,
  sha256: SHA256_DIGEST_SCHEMA,
}).strict();
var TOOL_SCHEMA = object({
  name: NON_EMPTY_STRING,
  version: NON_EMPTY_STRING.optional(),
}).strict();
var ACR_PRODUCER_SCHEMA = object({
  name: NON_EMPTY_STRING,
  version: NON_EMPTY_STRING,
}).strict();
var ACR_REPOSITORY_SCHEMA = object({
  vcs: literal("git"),
  remote: NON_EMPTY_STRING.optional(),
  base_ref: NON_EMPTY_STRING.optional(),
  base_commit: GIT_OID_SCHEMA,
  work_ref: NON_EMPTY_STRING.optional(),
  work_commit: GIT_OID_SCHEMA,
  change_request: object({
    provider: _enum(["github", "gitlab", "unknown", "custom"]),
    type: _enum(["pull_request", "merge_request", "unknown", "custom"]),
    id: NON_EMPTY_STRING,
  })
    .strict()
    .optional(),
}).strict();
var ACR_TASK_SCHEMA = object({
  task_id: NON_EMPTY_STRING,
  title: NON_EMPTY_STRING,
  intent: NON_EMPTY_STRING,
  requested_by: PRINCIPAL_SCHEMA.optional(),
  external_refs: array(EXTERNAL_REF_SCHEMA).optional(),
}).strict();
var ACR_AGENT_SCHEMA = object({
  id: NON_EMPTY_STRING.optional(),
  name: NON_EMPTY_STRING,
  agent_type: _enum(["coding_agent", "human", "hybrid", "automation", "unknown"]),
  model: object({
    provider: _enum(["anthropic", "openai", "cursor", "aider", "unknown", "custom"]),
    name: NON_EMPTY_STRING,
    version: NON_EMPTY_STRING,
  })
    .strict()
    .optional(),
  toolchain: array(TOOL_SCHEMA).optional(),
}).strict();
var ACR_PLAN_SCHEMA = object({
  status: _enum(["missing", "draft", "pending_approval", "approved", "rejected", "waived"]),
  artifact: ARTIFACT_SCHEMA.optional(),
  approved_at: ISO_UTC_TIMESTAMP.optional(),
  approved_by: PRINCIPAL_SCHEMA.optional(),
}).strict();
var ACR_PERMISSIONS_SCHEMA = object({
  filesystem: object({
    allowed_paths: array(NON_EMPTY_STRING).optional(),
    protected_paths: array(NON_EMPTY_STRING).optional(),
  })
    .strict()
    .optional(),
  network: object({
    mode: _enum(["disabled", "approval_required", "allowed", "unknown"]),
  }).strict(),
  secrets: object({
    access: _enum(["none", "approval_required", "allowed", "unknown"]),
  }).strict(),
  tools: array(
    object({
      name: NON_EMPTY_STRING,
      allowed: boolean2(),
    }).strict(),
  ).optional(),
}).strict();
var ACR_POLICY_SCHEMA = object({
  policy_version: NON_EMPTY_STRING.optional(),
  policy_hash: SHA256_DIGEST_SCHEMA.optional(),
  decisions: array(
    object({
      rule_id: NON_EMPTY_STRING,
      decision: _enum(["pass", "fail", "warning", "not_applicable", "manual_override"]),
      reason: NON_EMPTY_STRING,
    }).strict(),
  ),
}).strict();
var ACR_CHANGES_SCHEMA = object({
  summary: NON_EMPTY_STRING,
  diff_stats: object({
    files_changed: number2().int().min(0),
    insertions: number2().int().min(0),
    deletions: number2().int().min(0),
  }).strict(),
  files: array(
    object({
      path: REPOSITORY_RELATIVE_PATH_SCHEMA,
      status: _enum([
        "added",
        "modified",
        "deleted",
        "renamed",
        "copied",
        "type_changed",
        "unknown",
      ]),
      risk_categories: array(ACR_RISK_CATEGORY_SCHEMA).optional(),
    }).strict(),
  ),
  risk: object({
    level: _enum(["low", "medium", "high", "critical", "unknown"]),
    categories: array(ACR_RISK_CATEGORY_SCHEMA),
    protected_paths_touched: boolean2(),
  }).strict(),
}).strict();
var ACR_VERIFICATION_SCHEMA = object({
  status: _enum(["passed", "failed", "partial", "not_run", "waived"]),
  checks: array(
    object({
      check_id: NON_EMPTY_STRING,
      type: _enum([
        "test",
        "lint",
        "typecheck",
        "build",
        "security_scan",
        "schema_validation",
        "manual_review",
        "other",
      ]),
      command: NON_EMPTY_STRING.optional(),
      status: _enum(["passed", "failed", "skipped", "not_run", "waived", "unknown"]),
      exit_code: number2().int().nullable().optional(),
      artifact: ARTIFACT_SCHEMA.optional(),
    }).strict(),
  ),
}).strict();
var ACR_APPROVAL_SCHEMA = object({
  approval_id: NON_EMPTY_STRING,
  type: _enum([
    "plan_approval",
    "plan_waiver",
    "protected_path_approval",
    "verification_waiver",
    "policy_override",
    "merge_approval",
  ]),
  decision: _enum(["approved", "rejected", "waived", "overridden"]),
  approved_by: PRINCIPAL_SCHEMA,
  approved_at: ISO_UTC_TIMESTAMP,
  scope: NON_EMPTY_STRING,
}).strict();
var ACR_EVIDENCE_SCHEMA = object({
  type: _enum([
    "task",
    "plan",
    "approval",
    "policy",
    "diff",
    "verification_log",
    "test_report",
    "security_report",
    "finish",
    "other",
  ]),
  path: REPOSITORY_RELATIVE_PATH_SCHEMA,
  sha256: SHA256_DIGEST_SCHEMA,
}).strict();
var ACR_RESULT_SCHEMA = object({
  status: _enum([
    "draft",
    "planned",
    "approved",
    "implemented",
    "verified",
    "finished",
    "failed",
    "abandoned",
  ]),
  merge_ready: boolean2(),
  residual_risks: array(NON_EMPTY_STRING).optional(),
  rollback: object({
    available: boolean2(),
    notes: NON_EMPTY_STRING.optional(),
  })
    .strict()
    .optional(),
}).strict();
var ACR_INTEGRITY_SCHEMA = object({
  digest_algorithm: literal("sha256"),
  record_digest: SHA256_DIGEST_SCHEMA.nullable(),
  canonicalization: literal("rfc8785-jcs"),
  signatures: array(unknown()).optional(),
}).strict();
var ACR_EXTENSION_KEY_SCHEMA = string2().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)+$/);
var ACR_ZOD_SCHEMA = object({
  acr_version: literal(ACR_VERSION),
  record_type: literal("agent_change_record"),
  record_id: string2().regex(/^acr_[A-Za-z0-9_-]+$/),
  created_at: ISO_UTC_TIMESTAMP,
  producer: ACR_PRODUCER_SCHEMA,
  repository: ACR_REPOSITORY_SCHEMA,
  task: ACR_TASK_SCHEMA,
  agent: ACR_AGENT_SCHEMA,
  plan: ACR_PLAN_SCHEMA,
  permissions: ACR_PERMISSIONS_SCHEMA,
  policy: ACR_POLICY_SCHEMA,
  changes: ACR_CHANGES_SCHEMA,
  verification: ACR_VERIFICATION_SCHEMA,
  approvals: array(ACR_APPROVAL_SCHEMA),
  evidence: array(ACR_EVIDENCE_SCHEMA),
  result: ACR_RESULT_SCHEMA,
  integrity: ACR_INTEGRITY_SCHEMA,
  extensions: record(ACR_EXTENSION_KEY_SCHEMA, unknown()).optional(),
}).strict();

// packages/core/src/tasks/task-artifact-schema.handoff.ts
var RUNNER_OUTCOME_STATUS_VALUES = [
  "prepared",
  "running",
  "success",
  "failed",
  "blocked",
  "cancelled",
];
var HANDOFF_ROUTE_KIND_VALUES = ["protected_base_integrate"];
var HANDOFF_ROUTE_STATUS_VALUES = ["awaiting_github_merge", "awaiting_provider_merge"];
var HANDOFF_LOCAL_MUTATION_VALUES = ["not_performed"];
var HANDOFF_FINALIZE_VIA_VALUES = [
  "github_pr_merge_then_hosted_close",
  "github_task_pr_merge_then_hosted_close",
  "provider_change_request_merge_then_hosted_close",
];
var RUNNER_NEXT_ACTION_VALUES = ["run", "resume", "retry", "wait", "cancel_then_resume", "none"];
var TASK_HANDOFF_ROUTE_ZOD_SCHEMA = object({
  kind: _enum(HANDOFF_ROUTE_KIND_VALUES),
  status: _enum(HANDOFF_ROUTE_STATUS_VALUES).nullable().optional(),
  local_mutation: _enum(HANDOFF_LOCAL_MUTATION_VALUES).nullable().optional(),
  finalize_via: _enum(HANDOFF_FINALIZE_VIA_VALUES).nullable().optional(),
  provider: _enum(["github", "gitlab"]).nullable().optional(),
  pr_number: number2().int().min(1).nullable().optional(),
  pr_url: NULLABLE_NON_EMPTY_STRING.optional(),
  provider_base_sha: NULLABLE_NON_EMPTY_STRING.optional(),
  handoff_show_command: string2().nullable().optional(),
  base_pull_command: string2().nullable().optional(),
}).passthrough();
var TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA = object({
  run_id: NULLABLE_NON_EMPTY_STRING.optional(),
  status: _enum(RUNNER_OUTCOME_STATUS_VALUES).nullable().optional(),
  heartbeat_at: NULLABLE_ISO_UTC_TIMESTAMP.optional(),
  next_action: _enum(RUNNER_NEXT_ACTION_VALUES).nullable().optional(),
  next_command: string2().nullable().optional(),
  resume_command: string2().nullable().optional(),
  retry_command: string2().nullable().optional(),
  state_path: string2().nullable().optional(),
  trace_path: string2().nullable().optional(),
}).passthrough();
var TASK_HANDOFF_ZOD_SCHEMA = object({
  schema_version: literal(1),
  task_id: NON_EMPTY_STRING,
  created_at: ISO_UTC_TIMESTAMP,
  from_role: NON_EMPTY_STRING,
  to_role: NULLABLE_NON_EMPTY_STRING.optional(),
  reason: NON_EMPTY_STRING,
  note: string2().optional(),
  branch: NULLABLE_NON_EMPTY_STRING.optional(),
  base_branch: NULLABLE_NON_EMPTY_STRING.optional(),
  head_sha: string2().min(7).nullable().optional(),
  workspace_root: NULLABLE_NON_EMPTY_STRING.optional(),
  pr_branch: NULLABLE_NON_EMPTY_STRING.optional(),
  runner: TASK_HANDOFF_RUNNER_STATE_ZOD_SCHEMA.optional(),
  route: TASK_HANDOFF_ROUTE_ZOD_SCHEMA.optional(),
  next_actions: array(NON_EMPTY_STRING).optional(),
  risks: array(NON_EMPTY_STRING).optional(),
  open_questions: array(NON_EMPTY_STRING).optional(),
  evidence_paths: array(NON_EMPTY_STRING).optional(),
}).passthrough();

// packages/core/src/tasks/task-artifact-schema.observations.ts
var TASK_OBSERVATION_SCHEMA_VERSION = "0.1";
var TASK_OBSERVATION_KIND_VALUES = [
  "spec_gap",
  "assumption",
  "decision",
  "deviation",
  "tradeoff",
  "risk",
  "bug_candidate",
  "issue_candidate",
  "incident_candidate",
  "context_candidate",
  "agent_improvement_candidate",
  "workflow_improvement_candidate",
];
var TASK_OBSERVATION_PHASE_VALUES = [
  "planning",
  "implementation",
  "verification",
  "integration",
  "finish",
  "post_run",
];
var TASK_OBSERVATION_SEVERITY_VALUES = ["low", "medium", "high", "critical"];
var TASK_OBSERVATION_ACTION_VALUES = [
  "none",
  "readme_finding",
  "github_issue",
  "incident",
  "context",
  "skill",
  "workflow_change",
  "agent_prompt_change",
  "test_gap",
];
var TASK_OBSERVATION_STATUS_VALUES = ["open", "accepted", "promoted", "dismissed", "superseded"];
var REPOSITORY_RELATIVE_PATH_SCHEMA2 = string2()
  .min(1)
  .regex(/^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$)).+$/);
var TASK_OBSERVATION_EVIDENCE_ZOD_SCHEMA = object({
  files: array(REPOSITORY_RELATIVE_PATH_SCHEMA2).optional(),
  commands: array(NON_EMPTY_STRING).optional(),
  refs: array(NON_EMPTY_STRING).optional(),
}).strict();
var TASK_OBSERVATION_RECOMMENDED_ACTION_ZOD_SCHEMA = object({
  type: _enum(TASK_OBSERVATION_ACTION_VALUES),
  title: NON_EMPTY_STRING.optional(),
  details: NON_EMPTY_STRING.optional(),
}).strict();
var TASK_OBSERVATION_ZOD_SCHEMA = object({
  schema_version: literal(TASK_OBSERVATION_SCHEMA_VERSION),
  id: string2().regex(/^obs-[A-Za-z0-9_-]+$/),
  task_id: NON_EMPTY_STRING,
  created_at: ISO_UTC_TIMESTAMP,
  author: NON_EMPTY_STRING,
  phase: _enum(TASK_OBSERVATION_PHASE_VALUES),
  kind: _enum(TASK_OBSERVATION_KIND_VALUES),
  severity: _enum(TASK_OBSERVATION_SEVERITY_VALUES),
  summary: NON_EMPTY_STRING,
  evidence: TASK_OBSERVATION_EVIDENCE_ZOD_SCHEMA.optional(),
  decision: NON_EMPTY_STRING.optional(),
  impact: NON_EMPTY_STRING.optional(),
  recommended_action: TASK_OBSERVATION_RECOMMENDED_ACTION_ZOD_SCHEMA.optional(),
  status: _enum(TASK_OBSERVATION_STATUS_VALUES),
  tags: array(NON_EMPTY_STRING).optional(),
}).strict();

// packages/core/src/tasks/task-artifact-schema.pr-metadata.ts
var PR_STATUS_VALUES = ["OPEN", "CLOSED", "MERGED"];
var PR_ARTIFACT_STATE_VALUES = ["open", "merged", "handoff", "remote_staged", "remote_failed"];
var MERGE_STRATEGY_VALUES = ["squash", "merge", "rebase"];
var PR_VERIFY_STATUS_VALUES = ["pass", "fail", "skipped"];
var PR_BATCH_CLOSURE_POLICY_VALUES = ["all_or_fail"];
var TASK_PR_META_ZOD_SCHEMA = object({
  schema_version: literal(1),
  task_id: NON_EMPTY_STRING,
  related_task_ids: array(NON_EMPTY_STRING).optional(),
  batch: object({
    schema_version: literal(1),
    primary_task_id: NON_EMPTY_STRING,
    included_task_ids: array(NON_EMPTY_STRING).min(1),
    closure_policy: _enum(PR_BATCH_CLOSURE_POLICY_VALUES),
  })
    .strict()
    .optional(),
  branch: NON_EMPTY_STRING.optional(),
  base: NON_EMPTY_STRING.optional(),
  pr_number: number2().int().min(1).optional(),
  pr_url: NON_EMPTY_STRING.optional(),
  provider: object({
    schema_version: literal(1),
    kind: _enum(["github", "gitlab"]),
    hostname: NON_EMPTY_STRING,
    remote: NON_EMPTY_STRING,
    source_project: NON_EMPTY_STRING,
    target_project: NON_EMPTY_STRING,
  })
    .strict()
    .optional(),
  created_at: ISO_UTC_TIMESTAMP,
  updated_at: ISO_UTC_TIMESTAMP,
  status: _enum(PR_STATUS_VALUES).optional(),
  artifact_state: _enum(PR_ARTIFACT_STATE_VALUES).optional(),
  artifact_state_reason: NON_EMPTY_STRING.optional(),
  artifact_state_updated_at: ISO_UTC_TIMESTAMP.optional(),
  merge_strategy: _enum(MERGE_STRATEGY_VALUES).optional(),
  merged_at: ISO_UTC_TIMESTAMP.optional(),
  merge_commit: NON_EMPTY_STRING.optional(),
  head_sha: NON_EMPTY_STRING.optional(),
  last_verified_sha: string2().min(7).nullable().optional(),
  last_verified_at: NULLABLE_ISO_UTC_TIMESTAMP.optional(),
  verify: object({
    status: _enum(PR_VERIFY_STATUS_VALUES).optional(),
    command: string2().optional(),
  })
    .passthrough()
    .optional(),
}).passthrough();

// packages/core/src/tasks/task-artifact-schema.runner-handoff.ts
var RUNNER_HANDOFF_MODE_VALUES = ["dry_run", "execute"];
var RUNNER_HANDOFF_STATUS_VALUES = ["requested", "accepted", "blocked", "expired", "cancelled"];
var RUNNER_HANDOFF_EVIDENCE_KIND_VALUES = [
  "task_readme",
  "verification",
  "acr",
  "trace",
  "artifact",
  "custom",
];
var RUNNER_HANDOFF_UPLOAD_TARGET_KIND_VALUES = ["evidence", "artifact", "trace", "acr", "log"];
var GIT_OID_SCHEMA2 = string2().regex(/^[a-f0-9]{7,64}$/u);
var SAFE_ID_SCHEMA = string2()
  .min(1)
  .max(160)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/u);
var SAFE_REF_COMPONENT_SCHEMA = string2()
  .min(1)
  .max(240)
  .regex(
    /^(?!\/)(?!.*\/$)(?!.*\/\/)(?!.*\.\.)(?!.*(?:^|\/)\.)(?!.*(?:^|\/)[^/]*\.lock(?:\/|$))(?!.*[~^:?*[\]\\\s@$`;|&<>(){}])[\w./-]+$/u,
  );
var SAFE_REPOSITORY_SLUG_SCHEMA = string2()
  .min(1)
  .max(200)
  .regex(
    /^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*:\/\/)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\.git$)[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u,
  );
var RUNNER_HANDOFF_REPO_REF_ZOD_SCHEMA = object({
  kind: literal("git"),
  repository: SAFE_REPOSITORY_SLUG_SCHEMA,
  ref: SAFE_REF_COMPONENT_SCHEMA,
  commit_sha: GIT_OID_SCHEMA2.optional(),
}).strict();
var RUNNER_HANDOFF_PRINCIPAL_ZOD_SCHEMA = object({
  type: _enum(["human", "agent", "automation", "service", "unknown"]),
  id: SAFE_ID_SCHEMA,
}).strict();
var RUNNER_HANDOFF_REQUIRED_EVIDENCE_ZOD_SCHEMA = object({
  kind: _enum(RUNNER_HANDOFF_EVIDENCE_KIND_VALUES),
  id: SAFE_ID_SCHEMA,
  required: boolean2().default(true),
}).strict();
var RUNNER_HANDOFF_UPLOAD_TARGET_ZOD_SCHEMA = object({
  kind: _enum(RUNNER_HANDOFF_UPLOAD_TARGET_KIND_VALUES),
  target_id: SAFE_ID_SCHEMA,
  expires_at: ISO_UTC_TIMESTAMP.optional(),
}).strict();
var RUNNER_HANDOFF_KILL_SWITCH_CHECK_ZOD_SCHEMA = object({
  checked_at: ISO_UTC_TIMESTAMP,
  active: literal(false),
}).strict();
var AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA = object({
  schema_version: literal(1),
  run_id: SAFE_ID_SCHEMA,
  project_id: SAFE_ID_SCHEMA,
  workspace_id: SAFE_ID_SCHEMA,
  task_id: NON_EMPTY_STRING,
  agent_task_id: SAFE_ID_SCHEMA.optional(),
  plan_id: SAFE_ID_SCHEMA.optional(),
  repo_ref: RUNNER_HANDOFF_REPO_REF_ZOD_SCHEMA,
  requested_by: RUNNER_HANDOFF_PRINCIPAL_ZOD_SCHEMA,
  mode: _enum(RUNNER_HANDOFF_MODE_VALUES),
  required_evidence: array(RUNNER_HANDOFF_REQUIRED_EVIDENCE_ZOD_SCHEMA).min(1),
  upload_targets: array(RUNNER_HANDOFF_UPLOAD_TARGET_ZOD_SCHEMA).min(1),
  created_at: ISO_UTC_TIMESTAMP,
  expires_at: ISO_UTC_TIMESTAMP,
  status: _enum(RUNNER_HANDOFF_STATUS_VALUES),
  kill_switch_checked: RUNNER_HANDOFF_KILL_SWITCH_CHECK_ZOD_SCHEMA,
})
  .strict()
  .superRefine((value, ctx) => {
    if (Date.parse(value.expires_at) <= Date.parse(value.created_at)) {
      ctx.addIssue({
        code: "custom",
        path: ["expires_at"],
        message: "expires_at must be after created_at",
      });
    }
  });

// packages/core/src/tasks/task-artifact-schema.findings.ts
var TASK_EVENT_TYPE_VALUES = ["status", "comment", "verify"];
var DOC_VERSION_SCHEMA = literal(3);
var TASK_SECTIONS_SCHEMA = record(string2(), string2());
var TASK_COMMENT_SCHEMA = object({
  author: NON_EMPTY_STRING,
  body: NON_EMPTY_STRING,
}).strict();
var TASK_EVENT_SCHEMA = object({
  type: _enum(TASK_EVENT_TYPE_VALUES),
  at: ISO_UTC_TIMESTAMP,
  author: NON_EMPTY_STRING,
  commit: string2()
    .regex(/^[0-9a-f]{40,64}$/u)
    .optional(),
  from: string2().optional(),
  to: string2().optional(),
  state: string2().optional(),
  note: string2().optional(),
  body: string2().optional(),
}).passthrough();

// packages/core/src/tasks/task-artifact-schema.verification.ts
var PLAN_APPROVAL_STATE_VALUES = ["pending", "approved", "rejected"];
var VERIFICATION_STATE_VALUES = ["pending", "ok", "needs_rework", "blocked_external"];
var QUALITY_REVIEW_STATE_VALUES = ["pending", "pass", "rework", "blocked", "human_review"];
var QUALITY_REVIEW_PROVENANCE_VALUES = ["human_supplied", "evaluator_supplied"];
var TASK_PLAN_APPROVAL_SCHEMA = object({
  state: _enum(PLAN_APPROVAL_STATE_VALUES),
  updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
  updated_by: string2().nullable(),
  note: string2().nullable(),
}).passthrough();
var TASK_VERIFICATION_SCHEMA = object({
  state: _enum(VERIFICATION_STATE_VALUES),
  attempts: number2().int().min(0).optional(),
  updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
  updated_by: string2().nullable(),
  note: string2().nullable(),
})
  .passthrough()
  .transform((value) => ({ ...value, attempts: value.attempts ?? 0 }));
var TASK_QUALITY_REVIEW_SCHEMA = object({
  state: _enum(QUALITY_REVIEW_STATE_VALUES),
  provenance: _enum(QUALITY_REVIEW_PROVENANCE_VALUES).optional(),
  updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
  updated_by: string2().nullable(),
  note: string2().nullable(),
  evaluated_sha: string2().nullable(),
  review_identity_digest: string2().nullable(),
  evidence_refs: array(string2()).default([]),
  findings: array(string2()).default([]),
}).passthrough();

// packages/core/src/tasks/task-status.ts
var TASK_STATUS_VALUES = ["TODO", "DOING", "DONE", "BLOCKED"];
var TASK_STATUS_LABEL = TASK_STATUS_VALUES.join("|");
var TASK_STATUS_SET = new Set(TASK_STATUS_VALUES);

// packages/core/src/tasks/task-artifact-schema.task.ts
var TASK_PRIORITY_VALUES = ["low", "normal", "med", "high"];
var TASK_RISK_LEVEL_VALUES = ["low", "med", "high"];
var TASK_KIND_VALUES = ["analysis", "content", "docs", "code", "release", "ops", "context"];
var TASK_MUTATION_SCOPE_VALUES = ["none", "docs", "code", "release", "ops", "context", "unknown"];
var TASK_RISK_FLAG_VALUES = [
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
];
var RUNNER_OUTCOME_STATUS_VALUES2 = [
  "prepared",
  "running",
  "success",
  "failed",
  "blocked",
  "cancelled",
];
var RUNNER_MODE_VALUES = ["execute", "dry_run"];
var RUNNER_TARGET_KIND_VALUES = ["task", "recipe_scenario"];
var TASK_SYNC_FIELD_AUTHORITY_VALUES = [
  "agentplane",
  "provider",
  "bidirectional",
  "derived",
  "ignored",
];
var TASK_SYNC_CONFLICT_POLICY_VALUES = ["record", "manual", "agentplane_wins", "provider_wins"];
var TASK_SYNC_CONFLICT_KIND_VALUES = [
  "field",
  "identity",
  "freshness",
  "deletion",
  "dependency",
  "permission",
];
var TASK_SYNC_CONFLICT_SEVERITY_VALUES = ["info", "warning", "blocking"];
var TASK_SYNC_CONFLICT_STATUS_VALUES = ["open", "resolved", "ignored"];
var TASK_STATUS_SCHEMA = _enum(TASK_STATUS_VALUES);
var TASK_PRIORITY_SCHEMA = _enum(TASK_PRIORITY_VALUES);
var TASK_RISK_LEVEL_SCHEMA = _enum(TASK_RISK_LEVEL_VALUES);
var TASK_KIND_SCHEMA = _enum(TASK_KIND_VALUES);
var TASK_MUTATION_SCOPE_SCHEMA = _enum(TASK_MUTATION_SCOPE_VALUES);
var TASK_RISK_FLAGS_SCHEMA = array(_enum(TASK_RISK_FLAG_VALUES));
var TASK_EXECUTION_ROUTE_SCHEMA = object({
  schema_version: literal(1),
  requested_mode: _enum(["repository", "auto", "direct", "branch_pr"]),
  selected_mode: _enum(["direct", "branch_pr"]),
  repository_mode: _enum(["direct", "branch_pr"]),
  reason_codes: array(NON_EMPTY_STRING).min(1),
  frozen: literal(true),
}).strict();
var TASK_REPOSITORY_EFFECT_SCHEMA = _enum([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
var TASK_EXTERNAL_EFFECT_SCHEMA = _enum([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);
var TASK_EXECUTION_DECLARATION_SCHEMA = object({
  schema_version: literal(2),
  preferred_mode: _enum(["direct", "branch_pr"]),
  scope_roots: array(NON_EMPTY_STRING),
  repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
  external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
  requirements_uncertainty: _enum(["bounded", "material"]),
  implementation_uncertainty: _enum(["bounded", "material"]),
  reversibility: _enum(["reversible", "recovery_required", "irreversible"]),
  rationale: array(NON_EMPTY_STRING).min(1),
}).strict();
var TASK_VERIFICATION_OBSERVATION_SCHEMA = object({
  id: NON_EMPTY_STRING,
  result: _enum(["pass", "fail", "unsupported"]),
}).strict();
var TASK_VERIFICATION_CONTRACT_COMMON_SCHEMA = {
  source: literal("execution_contract"),
  phase: _enum(["task", "local", "pr", "release"]),
  observed: object({
    repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
    external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
    changed_components: array(NON_EMPTY_STRING),
    changed_files: array(NON_EMPTY_STRING),
  }).strict(),
  policy_floor: object({
    pr_full_regression: literal(true),
    unknown_or_central_full_regression: literal(true),
    monotonic_strengthening: literal(true),
  }).strict(),
  selected_checks: array(NON_EMPTY_STRING).min(1),
  escalation_reasons: array(NON_EMPTY_STRING),
  requires_full_regression: boolean2(),
  requires_real_e2e: boolean2(),
  digest: string2().regex(/^sha256:[0-9a-f]{64}$/u),
};
var TASK_VERIFICATION_CONTRACT_V1_SCHEMA = object({
  ...TASK_VERIFICATION_CONTRACT_COMMON_SCHEMA,
  schema_version: literal(1),
  declared: object({
    repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
    external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
  }).strict(),
  selector: object({
    kind: NON_EMPTY_STRING,
    reason: NON_EMPTY_STRING,
    selected_test_files: array(NON_EMPTY_STRING),
  }).strict(),
}).strict();
var TASK_VERIFICATION_CONTRACT_V2_SCHEMA = object({
  ...TASK_VERIFICATION_CONTRACT_COMMON_SCHEMA,
  schema_version: literal(2),
  declared: object({
    repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
    external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
    components: array(NON_EMPTY_STRING),
    risk: object({
      requirements_uncertainty: _enum(["bounded", "material"]),
      implementation_uncertainty: _enum(["bounded", "material"]),
      reversibility: _enum(["reversible", "recovery_required", "irreversible"]),
    }).strict(),
    evidence_requirements: array(NON_EMPTY_STRING).min(1),
  }).strict(),
  selector: object({
    kind: NON_EMPTY_STRING,
    reason: NON_EMPTY_STRING,
    execution_mode: NON_EMPTY_STRING,
    bucket: NON_EMPTY_STRING.nullable(),
    buckets: array(NON_EMPTY_STRING),
    lint_targets: array(NON_EMPTY_STRING),
    vitest_pool: _enum(["threads", "forks"]),
    run_cli_docs_check: boolean2(),
    selected_test_files: array(NON_EMPTY_STRING),
  }).strict(),
  execution_groups: array(NON_EMPTY_STRING).min(1),
}).strict();
var TASK_VERIFICATION_CONTRACT_SCHEMA = union([
  TASK_VERIFICATION_CONTRACT_V1_SCHEMA,
  TASK_VERIFICATION_CONTRACT_V2_SCHEMA,
]);
var TASK_EXECUTION_CONTRACT_SCHEMA = object({
  schema_version: literal(1),
  source: _enum(["agent_declared", "legacy_compatibility"]),
  declaration: TASK_EXECUTION_DECLARATION_SCHEMA,
  selected_mode: _enum(["direct", "branch_pr"]),
  repository_mode: _enum(["direct", "branch_pr"]),
  reason_codes: array(NON_EMPTY_STRING).min(1),
  authority: object({
    writable_roots: array(NON_EMPTY_STRING),
    allowed_repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
    forbidden_repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
    allowed_external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
    forbidden_external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
    allowed_capabilities: array(NON_EMPTY_STRING).optional(),
    allowed_resources: array(NON_EMPTY_STRING).optional(),
  }).strict(),
  safety: object({
    requires_worktree: boolean2(),
    requires_user_approval: boolean2(),
    approval_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
  }).strict(),
  verification: object({
    required_evidence: array(NON_EMPTY_STRING).min(1),
    contract: TASK_VERIFICATION_CONTRACT_SCHEMA.optional(),
  }).strict(),
  observed: object({
    repository_effects: array(TASK_REPOSITORY_EFFECT_SCHEMA),
    external_effects: array(TASK_EXTERNAL_EFFECT_SCHEMA),
    changed_paths: array(NON_EMPTY_STRING),
    changed_components: array(NON_EMPTY_STRING),
    verification_results: array(TASK_VERIFICATION_OBSERVATION_SCHEMA),
    authority_violations: array(NON_EMPTY_STRING),
  }).strict(),
  escalation: object({
    from: literal("direct"),
    to: literal("branch_pr"),
    reason_codes: array(NON_EMPTY_STRING).min(1),
    preserved_changed_paths: array(NON_EMPTY_STRING).min(1),
    preserved_commit: NON_EMPTY_STRING.optional(),
  })
    .strict()
    .optional(),
}).strict();
var TASK_ORIGIN_SCHEMA = object({
  system: NON_EMPTY_STRING,
  issue_id: NON_EMPTY_STRING.optional(),
  url: NON_EMPTY_STRING.optional(),
  recipe_id: NON_EMPTY_STRING.optional(),
  scenario_id: NON_EMPTY_STRING.optional(),
  recipe_version: NON_EMPTY_STRING.optional(),
  run_id: NON_EMPTY_STRING.optional(),
}).catchall(string2());
var TASK_COMMIT_SCHEMA = object({
  hash: NON_EMPTY_STRING,
  message: NON_EMPTY_STRING,
})
  .strict()
  .nullable();
var RUNNER_TARGET_SCHEMA = object({
  kind: _enum(RUNNER_TARGET_KIND_VALUES),
  task_id: NON_EMPTY_STRING.optional(),
  recipe_id: NON_EMPTY_STRING.optional(),
  scenario_id: NON_EMPTY_STRING.optional(),
}).passthrough();
var RUNNER_METRICS_SCHEMA = object({
  duration_ms: number2().optional(),
  stdout_bytes: number2().optional(),
  stderr_bytes: number2().optional(),
  output_last_message_bytes: number2().nullable().optional(),
}).passthrough();
var RUNNER_EVIDENCE_SCHEMA = object({
  provenance: literal("supervisor_observed").optional(),
  evidence_paths: array(NON_EMPTY_STRING).optional(),
  changed_paths: array(NON_EMPTY_STRING).optional(),
  files_changed_count: number2().int().min(0).optional(),
  tests_run: array(NON_EMPTY_STRING).optional(),
  verification_candidates: array(NON_EMPTY_STRING).optional(),
}).passthrough();
var RUNNER_EXECUTION_RECEIPT_REF_SCHEMA = object({
  path: NON_EMPTY_STRING,
  sha256: string2().regex(/^sha256:[0-9a-f]{64}$/u),
  verification_state: _enum([
    "observed_success",
    "rejected",
    "unverified",
    "compatibility_unverified",
  ]),
  observed_by: literal("agentplane"),
}).strict();
var RUNNER_HISTORY_ENTRY_SCHEMA = object({
  run_id: NON_EMPTY_STRING,
  status: _enum(RUNNER_OUTCOME_STATUS_VALUES2),
  adapter_id: NON_EMPTY_STRING,
  mode: _enum(RUNNER_MODE_VALUES),
  created_at: ISO_UTC_TIMESTAMP.optional(),
  updated_at: ISO_UTC_TIMESTAMP,
  started_at: ISO_UTC_TIMESTAMP.optional(),
  ended_at: ISO_UTC_TIMESTAMP.optional(),
  exit_code: number2().int().nullable(),
  target: RUNNER_TARGET_SCHEMA,
  summary: string2().optional(),
  output_paths: array(NON_EMPTY_STRING).optional(),
  stdout_summary: string2().optional(),
  stderr_summary: string2().optional(),
  metrics: RUNNER_METRICS_SCHEMA.optional(),
  evidence: RUNNER_EVIDENCE_SCHEMA.optional(),
  execution_receipt: RUNNER_EXECUTION_RECEIPT_REF_SCHEMA.optional(),
}).passthrough();
var RUNNER_OUTCOME_SCHEMA = RUNNER_HISTORY_ENTRY_SCHEMA.extend({
  history: array(RUNNER_HISTORY_ENTRY_SCHEMA).optional(),
});
var TASK_TOKEN_USAGE_SCHEMA = object({
  schema_version: literal(1),
  state: _enum(["observed", "partial", "unavailable"]),
  cached_input_tokens: number2().int().min(0).nullable().optional(),
  cached_input_observed_agent_runs: number2().int().min(0).optional(),
  input_tokens: number2().int().min(0).nullable(),
  output_tokens: number2().int().min(0).nullable(),
  reasoning_tokens: number2().int().min(0).nullable(),
  total_tokens: number2().int().min(0).nullable(),
  agent_runs: number2().int().min(0),
  observed_agent_runs: number2().int().min(0),
  source: _enum(["supervisor_journal", "unavailable"]),
  observed_by: literal("agentplane"),
  journal_digest: string2()
    .regex(/^sha256:[0-9a-f]{64}$/u)
    .nullable(),
  unavailable_reason: string2().min(1).nullable(),
  updated_at: ISO_UTC_TIMESTAMP,
})
  .strict()
  .superRefine((usage, ctx) => {
    if (
      (usage.cached_input_observed_agent_runs ?? 0) > usage.observed_agent_runs ||
      ((usage.cached_input_observed_agent_runs ?? 0) > 0 && usage.cached_input_tokens == null) ||
      (usage.cached_input_tokens != null && (usage.cached_input_observed_agent_runs ?? 0) === 0) ||
      (usage.cached_input_tokens != null &&
        (usage.input_tokens == null || usage.cached_input_tokens > usage.input_tokens))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Cached input requires consistent supervisor-observed coverage and input totals.",
      });
    }
    if (usage.observed_agent_runs > usage.agent_runs) {
      ctx.addIssue({
        code: "custom",
        message: "Observed token-usage runs cannot exceed total agent runs.",
      });
    }
    const tokenFields = [
      usage.input_tokens,
      usage.output_tokens,
      usage.reasoning_tokens,
      usage.total_tokens,
    ];
    if (usage.state === "observed") {
      if (
        usage.agent_runs === 0 ||
        usage.observed_agent_runs !== usage.agent_runs ||
        tokenFields.includes(null) ||
        usage.source !== "supervisor_journal" ||
        usage.unavailable_reason !== null
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Observed token usage requires complete supervisor-observed telemetry.",
        });
      }
    } else if (usage.state === "partial") {
      if (
        usage.observed_agent_runs === 0 ||
        usage.source !== "supervisor_journal" ||
        usage.unavailable_reason === null
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Partial token usage requires some observed telemetry and a gap reason.",
        });
      }
    } else if (
      usage.observed_agent_runs !== 0 ||
      tokenFields.some((value) => value !== null) ||
      usage.unavailable_reason === null
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Unavailable token usage must not fabricate token counts.",
      });
    }
  });
var TASK_SYNC_EXTERNAL_REF_SCHEMA = object({
  provider: NON_EMPTY_STRING,
  connector_kind: NON_EMPTY_STRING.optional(),
  connection_id: NON_EMPTY_STRING.optional(),
  installation_id: NON_EMPTY_STRING.optional(),
  remote_id: NON_EMPTY_STRING,
  remote_url: NON_EMPTY_STRING.optional(),
  remote_revision: NON_EMPTY_STRING.optional(),
  title: NON_EMPTY_STRING.optional(),
  state: NON_EMPTY_STRING.optional(),
  synced_at: ISO_UTC_TIMESTAMP.optional(),
}).strict();
var TASK_SYNC_FIELD_POLICY_SCHEMA = object({
  authority: _enum(TASK_SYNC_FIELD_AUTHORITY_VALUES),
  remote_field: NON_EMPTY_STRING.optional(),
  conflict_policy: _enum(TASK_SYNC_CONFLICT_POLICY_VALUES).optional(),
  updated_at: ISO_UTC_TIMESTAMP.optional(),
  note: NON_EMPTY_STRING.optional(),
}).strict();
var TASK_SYNC_FRESHNESS_SCHEMA = object({
  projected_at: ISO_UTC_TIMESTAMP.optional(),
  projection_sha256: NON_EMPTY_STRING.optional(),
  source_revision: number2().int().min(0).optional(),
  provider_revision: NON_EMPTY_STRING.optional(),
  stale: boolean2().optional(),
  reason: NON_EMPTY_STRING.optional(),
}).strict();
var TASK_SYNC_CONFLICT_SCHEMA = object({
  id: NON_EMPTY_STRING,
  kind: _enum(TASK_SYNC_CONFLICT_KIND_VALUES),
  severity: _enum(TASK_SYNC_CONFLICT_SEVERITY_VALUES),
  status: _enum(TASK_SYNC_CONFLICT_STATUS_VALUES),
  summary: NON_EMPTY_STRING,
  provider: NON_EMPTY_STRING.optional(),
  remote_id: NON_EMPTY_STRING.optional(),
  field: NON_EMPTY_STRING.optional(),
  detected_at: ISO_UTC_TIMESTAMP,
  resolved_at: ISO_UTC_TIMESTAMP.optional(),
  safe_command: NON_EMPTY_STRING.optional(),
  when_to_stop: NON_EMPTY_STRING.optional(),
}).strict();
var TASK_SYNC_ENVELOPE_SCHEMA = object({
  version: literal(1),
  external_refs: array(TASK_SYNC_EXTERNAL_REF_SCHEMA).default([]),
  field_policies: record(NON_EMPTY_STRING, TASK_SYNC_FIELD_POLICY_SCHEMA).default({}),
  freshness: TASK_SYNC_FRESHNESS_SCHEMA.optional(),
  conflicts: array(TASK_SYNC_CONFLICT_SCHEMA).default([]),
}).strict();
var TASK_README_FRONTMATTER_ZOD_SCHEMA = object({
  id: NON_EMPTY_STRING,
  title: NON_EMPTY_STRING,
  result_summary: string2().optional(),
  risk_level: TASK_RISK_LEVEL_SCHEMA.optional(),
  breaking: boolean2().optional(),
  status: TASK_STATUS_SCHEMA,
  priority: TASK_PRIORITY_SCHEMA,
  owner: NON_EMPTY_STRING,
  revision: number2().int().min(1).optional(),
  origin: TASK_ORIGIN_SCHEMA.optional(),
  depends_on: array(NON_EMPTY_STRING),
  tags: array(NON_EMPTY_STRING),
  task_kind: TASK_KIND_SCHEMA.optional(),
  mutation_scope: TASK_MUTATION_SCOPE_SCHEMA.optional(),
  risk_flags: TASK_RISK_FLAGS_SCHEMA.optional(),
  verify: array(NON_EMPTY_STRING),
  plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
  verification: TASK_VERIFICATION_SCHEMA,
  quality_review: TASK_QUALITY_REVIEW_SCHEMA.optional(),
  runner: RUNNER_OUTCOME_SCHEMA.optional(),
  token_usage: TASK_TOKEN_USAGE_SCHEMA.optional(),
  execution_route: TASK_EXECUTION_ROUTE_SCHEMA.optional(),
  execution_contract: TASK_EXECUTION_CONTRACT_SCHEMA.optional(),
  sync: TASK_SYNC_ENVELOPE_SCHEMA.optional(),
  commit: TASK_COMMIT_SCHEMA.optional(),
  comments: array(TASK_COMMENT_SCHEMA),
  events: array(TASK_EVENT_SCHEMA).optional(),
  doc_version: DOC_VERSION_SCHEMA,
  doc_updated_at: ISO_UTC_TIMESTAMP,
  doc_updated_by: NON_EMPTY_STRING,
  description: string2(),
  sections: TASK_SECTIONS_SCHEMA.optional(),
  dirty: boolean2().optional(),
  id_source: NON_EMPTY_STRING.optional(),
  extensions: record(string2(), unknown()).optional(),
}).passthrough();
var TASKS_EXPORT_TASK_SCHEMA = object({
  id: NON_EMPTY_STRING,
  title: NON_EMPTY_STRING,
  result_summary: string2().optional(),
  risk_level: TASK_RISK_LEVEL_SCHEMA.optional(),
  breaking: boolean2().optional(),
  status: TASK_STATUS_SCHEMA,
  priority: TASK_PRIORITY_SCHEMA,
  owner: NON_EMPTY_STRING,
  revision: number2().int().min(1).optional(),
  origin: TASK_ORIGIN_SCHEMA.optional(),
  runner: RUNNER_OUTCOME_SCHEMA.optional(),
  token_usage: TASK_TOKEN_USAGE_SCHEMA.optional(),
  execution_route: TASK_EXECUTION_ROUTE_SCHEMA.optional(),
  execution_contract: TASK_EXECUTION_CONTRACT_SCHEMA.optional(),
  depends_on: array(NON_EMPTY_STRING),
  tags: array(NON_EMPTY_STRING),
  task_kind: TASK_KIND_SCHEMA.optional(),
  mutation_scope: TASK_MUTATION_SCOPE_SCHEMA.optional(),
  risk_flags: TASK_RISK_FLAGS_SCHEMA.optional(),
  verify: array(NON_EMPTY_STRING),
  plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
  verification: TASK_VERIFICATION_SCHEMA,
  quality_review: TASK_QUALITY_REVIEW_SCHEMA.optional(),
  commit: TASK_COMMIT_SCHEMA,
  comments: array(TASK_COMMENT_SCHEMA),
  events: array(TASK_EVENT_SCHEMA).optional(),
  sync: TASK_SYNC_ENVELOPE_SCHEMA.optional(),
  doc_version: DOC_VERSION_SCHEMA,
  doc_updated_at: ISO_UTC_TIMESTAMP,
  doc_updated_by: NON_EMPTY_STRING,
  description: string2(),
  dirty: boolean2(),
  id_source: NON_EMPTY_STRING,
}).passthrough();
var TASKS_EXPORT_META_SCHEMA = object({
  schema_version: literal(1),
  managed_by: NON_EMPTY_STRING,
  checksum_algo: literal("sha256"),
  checksum: NON_EMPTY_STRING,
}).strict();
var TASKS_EXPORT_ZOD_SCHEMA = object({
  tasks: array(TASKS_EXPORT_TASK_SCHEMA),
  meta: TASKS_EXPORT_META_SCHEMA,
}).strict();

// packages/core/src/tasks/task-artifact-schema.ts
var ACR_SCHEMA = buildJsonSchemaDocument(ACR_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/acr-v0.1.schema.json",
  title: "Agent Change Record (ACR) v0.1",
  description:
    "ACR is a machine-readable evidence projection derived from AgentPlane task, policy, verification, and Git state.",
});
var TASK_README_FRONTMATTER_SCHEMA = buildJsonSchemaDocument(TASK_README_FRONTMATTER_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/task-readme-frontmatter.schema.json",
  title: "Task README frontmatter (v1)",
  description:
    "Task READMEs are Markdown with YAML frontmatter. This schema describes the frontmatter keys.",
});
var TASKS_EXPORT_SCHEMA = buildJsonSchemaDocument(TASKS_EXPORT_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/tasks-export.schema.json",
  title: "tasks.json export snapshot (v1)",
});
var TASK_PR_META_SCHEMA = buildJsonSchemaDocument(TASK_PR_META_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/pr-meta.schema.json",
  title: "PR artifact meta.json (v1)",
});
var TASK_HANDOFF_SCHEMA = buildJsonSchemaDocument(TASK_HANDOFF_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/task-handoff.schema.json",
  title: "Task handoff artifact (v1)",
});
var AGENTPLANE_RUNNER_HANDOFF_SCHEMA = buildJsonSchemaDocument(
  AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA,
  {
    $id: "https://agentplane.org/schemas/runner-handoff.schema.json",
    title: "AgentPlane runner handoff (v1)",
    description:
      "Connector-neutral cloud-to-runner handoff contract for preparing a hosted runner without granting lifecycle authority or executing repository mutations by itself.",
  },
);
var TASK_OBSERVATION_SCHEMA = buildJsonSchemaDocument(TASK_OBSERVATION_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/task-observation.schema.json",
  title: "Task observation JSONL entry (v0.1)",
  description:
    "A task observation is one append-only JSONL entry for agent-discovered spec gaps, decisions, risks, and follow-up candidates.",
});
// packages/core/src/tasks/kernel-semantic.ts
var text = string2().trim().min(1);
var digest = string2().regex(/^sha256:[a-f0-9]{64}$/u);
var safeId = text.refine((value) => !["__proto__", "constructor", "prototype"].includes(value));
var root = text.refine(
  (value) =>
    value === "." ||
    (!value.startsWith("/") &&
      !value.includes("\\") &&
      !value.split("/").some((part) => part === ".." || part === "." || !part)),
);
var kernelIntentSchema = strictObject({
  objective: text,
  context: text,
  plan_input_digest: digest.optional(),
});
var kernelWorkContractSchema = strictObject({
  objective: text,
  acceptance_criteria: array(text).min(1),
  verification_commands: array(text),
  role: _enum(["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"]),
  plan_input_digest: digest.optional(),
});
var kernelExecutionRequirementsSchema = strictObject({
  scope_roots: array(root),
  repository_effects: array(text),
  external_effects: array(text),
  capabilities: array(text),
  resources: array(text),
});
var kernelPlanProposalSchema = strictObject({
  work_items: array(
    strictObject({
      id: safeId,
      depends_on: array(safeId),
      required_inputs: array(safeId),
      expected_outputs: array(safeId).min(1),
      execution_requirements: kernelExecutionRequirementsSchema,
      optional: boolean2(),
      contract: kernelWorkContractSchema,
    }),
  ).min(1),
});
var commonBinding = {
  task_id: text,
  repository_identity: digest,
  repository_fingerprint: digest,
  plan_revision: number2().int().nonnegative(),
  plan_digest: digest,
};
var kernelEpisodeBindingSchema = discriminatedUnion("phase", [
  strictObject({ ...commonBinding, phase: literal("planning") }),
  strictObject({
    ...commonBinding,
    phase: literal("implementation"),
    work_item_id: safeId,
    attempt: number2().int().positive(),
    claim_id: text,
    contract_digest: digest,
    authority_digest: digest,
  }),
  strictObject({
    ...commonBinding,
    phase: literal("inspection"),
    work_item_id: safeId,
    attempt: number2().int().positive(),
    claim_id: text,
    contract_digest: digest,
    authority_digest: digest,
    result_digest: digest,
  }),
]);
var kernelOutputClaimsSchema = array(strictObject({ id: safeId, kind: text, digest }));
var kernelMigrationSemanticAssessmentRequestSchema = strictObject({
  schema_version: literal(1),
  kind: literal("kernel_migration_semantic_assessment"),
  task_id: text,
  mapping_version: text,
  source_digest: digest,
  source_bytes_base64: string2().min(1),
  mapping_digest: digest,
  fields: array(
    strictObject({
      source_path: text,
      target: text,
      reason_code: text,
    }),
  ).min(1),
  stop_rules: array(text).min(1),
});
var kernelMigrationSemanticAssessmentSchema = strictObject({
  schema_version: literal(1),
  kind: literal("kernel_migration_semantic_assessment_result"),
  task_id: text,
  mapping_version: text,
  source_digest: digest,
  mapping_digest: digest,
  status: _enum(["resolved", "blocked"]),
  resolutions: array(
    strictObject({ source_path: text, target: text, decision: text, evidence_digest: digest }),
  ),
});

// packages/core/src/tasks/kernel-plan-refinement.ts
var item = kernelPlanProposalSchema.shape.work_items.element;
var kernelPlanRefinementSchema = strictObject({
  schema_version: literal(1),
  kind: literal("plan_refinement"),
  task_id: string2().min(1),
  base_plan_digest: string2().regex(/^sha256:[a-f0-9]{64}$/u),
  operations: array(
    discriminatedUnion("kind", [
      strictObject({ kind: literal("add"), work_item: item }),
      strictObject({ kind: literal("replace"), work_item: item }),
      strictObject({ kind: literal("remove"), work_item_id: item.shape.id }),
    ]),
  )
    .min(1)
    .max(256),
});
var kernelPlanInputSchema = union([kernelPlanProposalSchema, kernelPlanRefinementSchema]);
// packages/core/src/tasks/verification-contract-kernel.js
var FULL_REGRESSION_REPOSITORY_EFFECTS = new Set([
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
var REAL_E2E_EXTERNAL_EFFECTS = new Set(["external_write", "credentials", "publish", "deploy"]);
// packages/core/src/tasks/task-readme-io.ts
import { randomUUID as randomUUID2 } from "node:crypto";

// packages/core/src/fs/atomic-write.ts
var VERIFY_CHUNK_BYTES = 64 * 1024;

// packages/core/src/process/run-process.ts
var execaCompat = exports_execa;
var execa2 = execaCompat.execa ?? execaCompat.default;
var execaSync2 = execaCompat.execaSync ?? execaCompat.sync;
var execaUsesBufferEncoding = Boolean(execaCompat.execa);
if (!execa2 || !execaSync2) {
  throw new Error("Unsupported execa module shape: expected execa/execaSync exports");
}

// packages/core/src/tasks/task-readme.ts
var MULTILINE_FRIENDLY_KEYS = new Set(["description", "body", "note", "message", "result_summary"]);

// packages/core/src/tasks/task-readme-io.ts
var TASK_README_LOCK_MAX_BYTES = 1024 * 1024;
var CURRENT_PROCESS_INSTANCE_ID = randomUUID2();
// packages/core/src/config/schema.impl.ts
var nonEmptyString = () => string2().min(1);
var nonEmptyStringArray = (defaults) =>
  defaults ? array(nonEmptyString()).default(defaults) : array(nonEmptyString());
var branchPrefixString = () =>
  string2()
    .min(1)
    .regex(/^(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\/\/)(?!\/)(?!.*\/$)[^ ~^:?*[\\]+$/u, {
      message: "Branch prefix must be a git-safe branch namespace without spaces or ref syntax.",
    });
var COMMENT_POLICY_DEFAULTS = {
  start: { prefix: "Start:", min_chars: 40 },
  blocked: { prefix: "Blocked:", min_chars: 40 },
  verified: { prefix: "Verified:", min_chars: 60 },
};
var EXECUTION_DEFAULTS = {
  profile: "standard",
  reasoning_effort: "medium",
  text_verbosity: "medium",
  tool_budget: {
    discovery: 6,
    implementation: 10,
    verification: 6,
  },
  stop_conditions: [
    "Missing required input blocks correctness.",
    "Requested action expands scope or risk beyond approved plan.",
    "Verification fails and remediation changes scope.",
  ],
  handoff_conditions: [
    "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
    "Task depends_on prerequisites are incomplete.",
    "Specialized agent is required.",
  ],
  unsafe_actions_requiring_explicit_user_ok: [
    "Destructive git history operations.",
    "Outside-repo read/write.",
    "Credential, keychain, or SSH material changes.",
  ],
};
var RUNNER_TRACE_DEFAULTS = {
  mode: "raw",
  max_tail_bytes: 65536,
  capture_stderr: true,
  retention: "keep",
  compression: "none",
  redact_patterns: [],
};
var RUNNER_TIMEOUT_DEFAULTS = {
  wall_clock_ms: 900000,
  idle_ms: 180000,
  terminate_grace_ms: 1500,
};
var ACR_DEFAULTS = {
  enabled: false,
  version: "0.1.0",
  write_on_finish: true,
  require_for_pr_check: false,
  default_validation_mode: "local",
  include_model_identity: "when_known",
  include_prompts: false,
  include_tool_outputs: false,
};
var TASK_DOC_SECTIONS_DEFAULT = [
  "Summary",
  "Scope",
  "Plan",
  "Verify Steps",
  "Verification",
  "Rollback Plan",
  "Findings",
];
var TASK_DOC_REQUIRED_SECTIONS_DEFAULT = [
  "Summary",
  "Scope",
  "Plan",
  "Verification",
  "Rollback Plan",
];
var EVALUATOR_SKEPTICISM_LEVELS = ["standard", "strict", "paranoid"];
var ARTIFACTS_LANGUAGE = _enum(["any", "en"]).default("any");
var SIDE_EFFECT_AUTHORITY_DEFAULTS = {
  mode: "manual",
  actor: "POLICY:repository",
  allow_operations: [],
  deny_operations: [],
  ttl_minutes: 15,
  approval_receipts: {
    trusted_issuers: [],
    max_ttl_minutes: 15,
    clock_skew_seconds: 30,
  },
};
var APPROVAL_RECEIPT_ISSUER_SCHEMA = object({
  id: string2().regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/u),
  public_key_spki: string2().regex(/^[A-Za-z0-9+/]+={0,2}$/u, {
    message: "Approval receipt public_key_spki must be base64 DER SPKI.",
  }),
}).strict();
var APPROVAL_RECEIPTS_SCHEMA = object({
  trusted_issuers: array(APPROVAL_RECEIPT_ISSUER_SCHEMA).default([]),
  max_ttl_minutes: number2().int().min(1).max(60).default(15),
  clock_skew_seconds: number2().int().min(0).max(300).default(30),
})
  .strict()
  .default({
    trusted_issuers: [],
    max_ttl_minutes: 15,
    clock_skew_seconds: 30,
  });
var SIDE_EFFECT_AUTHORITY_SCHEMA = object({
  mode: _enum(["manual", "policy", "all"]).default(SIDE_EFFECT_AUTHORITY_DEFAULTS.mode),
  actor: string2()
    .regex(/^POLICY:[A-Za-z0-9][A-Za-z0-9._-]*$/u, {
      message: "Authority actor must be a POLICY:<id> identity and cannot impersonate USER.",
    })
    .default(SIDE_EFFECT_AUTHORITY_DEFAULTS.actor),
  allow_operations: nonEmptyStringArray(SIDE_EFFECT_AUTHORITY_DEFAULTS.allow_operations),
  deny_operations: nonEmptyStringArray(SIDE_EFFECT_AUTHORITY_DEFAULTS.deny_operations),
  ttl_minutes: number2().int().min(1).max(60).default(SIDE_EFFECT_AUTHORITY_DEFAULTS.ttl_minutes),
  approval_receipts: APPROVAL_RECEIPTS_SCHEMA,
})
  .strict()
  .default({
    ...SIDE_EFFECT_AUTHORITY_DEFAULTS,
    allow_operations: [...SIDE_EFFECT_AUTHORITY_DEFAULTS.allow_operations],
    deny_operations: [...SIDE_EFFECT_AUTHORITY_DEFAULTS.deny_operations],
    approval_receipts: {
      ...SIDE_EFFECT_AUTHORITY_DEFAULTS.approval_receipts,
      trusted_issuers: [],
    },
  });
var COMMENT_POLICY_SCHEMA = object({
  prefix: nonEmptyString(),
  min_chars: number2().int().min(0),
}).passthrough();
var RUNNER_CUSTOM_ENFORCEMENT_SCHEMA = object({
  mode: _enum(["none", "codex_sandbox_full_auto"]).optional(),
  platform: _enum(["auto", "macos", "linux", "windows"]).optional(),
}).passthrough();
var RUNNER_CUSTOM_SCHEMA = object({
  command: array(nonEmptyString()).min(1),
  env: record(string2(), string2()).default({}),
  enforcement: RUNNER_CUSTOM_ENFORCEMENT_SCHEMA.optional(),
}).passthrough();
var RUNNER_TRACE_SCHEMA = object({
  mode: _enum(["raw", "off"]).default(RUNNER_TRACE_DEFAULTS.mode),
  max_tail_bytes: number2().int().min(0).default(RUNNER_TRACE_DEFAULTS.max_tail_bytes),
  capture_stderr: boolean2().default(RUNNER_TRACE_DEFAULTS.capture_stderr),
  retention: _enum(["keep", "remove_on_success", "remove_always"]).default(
    RUNNER_TRACE_DEFAULTS.retention,
  ),
  compression: _enum(["none", "gzip"]).default(RUNNER_TRACE_DEFAULTS.compression),
  redact_patterns: nonEmptyStringArray(RUNNER_TRACE_DEFAULTS.redact_patterns),
})
  .strict()
  .default({
    ...RUNNER_TRACE_DEFAULTS,
    redact_patterns: [...RUNNER_TRACE_DEFAULTS.redact_patterns],
  });
var RUNNER_TIMEOUTS_SCHEMA = object({
  wall_clock_ms: number2().int().min(0).default(RUNNER_TIMEOUT_DEFAULTS.wall_clock_ms),
  idle_ms: number2().int().min(0).default(RUNNER_TIMEOUT_DEFAULTS.idle_ms),
  terminate_grace_ms: number2().int().min(0).default(RUNNER_TIMEOUT_DEFAULTS.terminate_grace_ms),
})
  .strict()
  .default({ ...RUNNER_TIMEOUT_DEFAULTS });
var FEEDBACK_GITHUB_ISSUES_DEFAULTS = {
  enabled: false,
  repository: "basilisk-labs/agentplane",
  transport: "github",
  cloud_endpoint: "https://agentplane.cloud/api/feedback/issues",
  allow_anonymous_cloud: false,
  prompt_on_internal_error: true,
  include_insights_report: true,
  dedupe: true,
  labels: ["agentplane-feedback", "bug"],
};
var AgentplaneConfigSchema = object({
  schema_version: literal(1).default(1),
  workflow_mode: _enum(["direct", "branch_pr"]).default("direct"),
  status_commit_policy: _enum(["off", "warn", "confirm"]).default("warn"),
  commit_automation: _enum(["manual", "finish_only"]).default("manual"),
  finish_auto_status_commit: boolean2().default(false),
  authority: SIDE_EFFECT_AUTHORITY_SCHEMA,
  close_commit: object({
    direct_dirty_policy: _enum(["allow_other_task_readmes", "strict"]).default(
      "allow_other_task_readmes",
    ),
  })
    .passthrough()
    .default({
      direct_dirty_policy: "allow_other_task_readmes",
    }),
  agents: object({
    approvals: object({
      require_plan: boolean2().default(true),
      require_network: boolean2().default(true),
      require_verify: boolean2().default(true),
      require_force: boolean2().default(false),
    })
      .passthrough()
      .default({
        require_plan: true,
        require_network: true,
        require_verify: true,
        require_force: false,
      }),
  })
    .passthrough()
    .default({
      approvals: {
        require_plan: true,
        require_network: true,
        require_verify: true,
        require_force: false,
      },
    }),
  recipes: object({
    storage_default: _enum(["link", "copy"]).default("copy"),
  })
    .passthrough()
    .default({ storage_default: "copy" }),
  execution: object({
    profile: _enum(["standard", "conservative", "balanced", "aggressive"]).default(
      EXECUTION_DEFAULTS.profile,
    ),
    reasoning_effort: _enum(["low", "medium", "high", "xhigh"]).default(
      EXECUTION_DEFAULTS.reasoning_effort,
    ),
    text_verbosity: _enum(["low", "medium", "high"]).default(EXECUTION_DEFAULTS.text_verbosity),
    tool_budget: object({
      discovery: number2().int().min(1).default(EXECUTION_DEFAULTS.tool_budget.discovery),
      implementation: number2().int().min(1).default(EXECUTION_DEFAULTS.tool_budget.implementation),
      verification: number2().int().min(1).default(EXECUTION_DEFAULTS.tool_budget.verification),
    })
      .passthrough()
      .default(EXECUTION_DEFAULTS.tool_budget),
    stop_conditions: nonEmptyStringArray([...EXECUTION_DEFAULTS.stop_conditions]),
    handoff_conditions: nonEmptyStringArray([...EXECUTION_DEFAULTS.handoff_conditions]),
    unsafe_actions_requiring_explicit_user_ok: nonEmptyStringArray([
      ...EXECUTION_DEFAULTS.unsafe_actions_requiring_explicit_user_ok,
    ]),
  })
    .passthrough()
    .default({
      profile: EXECUTION_DEFAULTS.profile,
      reasoning_effort: EXECUTION_DEFAULTS.reasoning_effort,
      text_verbosity: EXECUTION_DEFAULTS.text_verbosity,
      tool_budget: { ...EXECUTION_DEFAULTS.tool_budget },
      stop_conditions: [...EXECUTION_DEFAULTS.stop_conditions],
      handoff_conditions: [...EXECUTION_DEFAULTS.handoff_conditions],
      unsafe_actions_requiring_explicit_user_ok: [
        ...EXECUTION_DEFAULTS.unsafe_actions_requiring_explicit_user_ok,
      ],
    }),
  runner: object({
    default_adapter: _enum(["codex", "custom", "hermes"]).default("codex"),
    trace: RUNNER_TRACE_SCHEMA,
    timeouts: RUNNER_TIMEOUTS_SCHEMA,
    custom: RUNNER_CUSTOM_SCHEMA.optional(),
  })
    .passthrough()
    .default({
      default_adapter: "codex",
      trace: {
        ...RUNNER_TRACE_DEFAULTS,
        redact_patterns: [...RUNNER_TRACE_DEFAULTS.redact_patterns],
      },
      timeouts: { ...RUNNER_TIMEOUT_DEFAULTS },
    }),
  feedback: object({
    github_issues: object({
      enabled: boolean2().default(FEEDBACK_GITHUB_ISSUES_DEFAULTS.enabled),
      repository: nonEmptyString().default(FEEDBACK_GITHUB_ISSUES_DEFAULTS.repository),
      transport: _enum(["github", "cloud", "auto"]).default(
        FEEDBACK_GITHUB_ISSUES_DEFAULTS.transport,
      ),
      cloud_endpoint: nonEmptyString().default(FEEDBACK_GITHUB_ISSUES_DEFAULTS.cloud_endpoint),
      allow_anonymous_cloud: boolean2().default(
        FEEDBACK_GITHUB_ISSUES_DEFAULTS.allow_anonymous_cloud,
      ),
      prompt_on_internal_error: boolean2().default(
        FEEDBACK_GITHUB_ISSUES_DEFAULTS.prompt_on_internal_error,
      ),
      include_insights_report: boolean2().default(
        FEEDBACK_GITHUB_ISSUES_DEFAULTS.include_insights_report,
      ),
      dedupe: boolean2().default(FEEDBACK_GITHUB_ISSUES_DEFAULTS.dedupe),
      labels: nonEmptyStringArray([...FEEDBACK_GITHUB_ISSUES_DEFAULTS.labels]),
    })
      .passthrough()
      .default({ ...FEEDBACK_GITHUB_ISSUES_DEFAULTS }),
  })
    .passthrough()
    .default({
      github_issues: { ...FEEDBACK_GITHUB_ISSUES_DEFAULTS },
    }),
  acr: object({
    enabled: boolean2().default(ACR_DEFAULTS.enabled),
    version: literal("0.1.0").default(ACR_DEFAULTS.version),
    write_on_finish: boolean2().default(ACR_DEFAULTS.write_on_finish),
    require_for_pr_check: boolean2().default(ACR_DEFAULTS.require_for_pr_check),
    default_validation_mode: _enum(["schema", "local", "ci"]).default(
      ACR_DEFAULTS.default_validation_mode,
    ),
    include_model_identity: _enum(["never", "when_known", "always"]).default(
      ACR_DEFAULTS.include_model_identity,
    ),
    include_prompts: literal(false).default(ACR_DEFAULTS.include_prompts),
    include_tool_outputs: literal(false).default(ACR_DEFAULTS.include_tool_outputs),
  })
    .passthrough()
    .default({ ...ACR_DEFAULTS }),
  paths: object({
    agents_dir: nonEmptyString().default(".agentplane/agents"),
    tasks_path: nonEmptyString().default(".agentplane/tasks.json"),
    workflow_dir: nonEmptyString().default(".agentplane/tasks"),
    worktrees_dir: nonEmptyString().default(".agentplane/worktrees"),
  })
    .passthrough()
    .default({
      agents_dir: ".agentplane/agents",
      tasks_path: ".agentplane/tasks.json",
      workflow_dir: ".agentplane/tasks",
      worktrees_dir: ".agentplane/worktrees",
    }),
  branch: object({
    task_prefix: branchPrefixString().default("task"),
    task_close_prefix: branchPrefixString().default("task-close"),
  })
    .passthrough()
    .default({ task_prefix: "task", task_close_prefix: "task-close" }),
  framework: object({
    source: nonEmptyString().default("https://github.com/basilisk-labs/agentplane"),
    last_update: string2().datetime({ offset: true }).nullable().default(null),
    cli: object({
      expected_version: string2().nullable().default(null),
    })
      .passthrough()
      .default({ expected_version: null }),
  })
    .passthrough()
    .default({
      source: "https://github.com/basilisk-labs/agentplane",
      last_update: null,
      cli: { expected_version: null },
    }),
  tasks: object({
    id_suffix_length_default: number2().int().min(3).max(16).default(6),
    verify: object({
      required_tags: nonEmptyStringArray(["code", "backend", "frontend"]),
      require_steps_for_tags: nonEmptyStringArray().optional(),
      require_steps_for_primary: nonEmptyStringArray(["code", "data", "ops"]),
      require_verification_for_primary: nonEmptyStringArray(["code", "data", "ops"]),
      spike_tag: nonEmptyString().default("spike"),
      enforce_on_plan_approve: boolean2().default(true),
      enforce_on_start_when_no_plan: boolean2().default(true),
    })
      .passthrough()
      .default({
        required_tags: ["code", "backend", "frontend"],
        require_steps_for_primary: ["code", "data", "ops"],
        require_verification_for_primary: ["code", "data", "ops"],
        spike_tag: "spike",
        enforce_on_plan_approve: true,
        enforce_on_start_when_no_plan: true,
      }),
    tags: object({
      primary_allowlist: array(nonEmptyString())
        .min(1)
        .default(["code", "data", "research", "docs", "ops", "product", "meta"]),
      strict_primary: boolean2().default(false),
      fallback_primary: nonEmptyString().default("meta"),
      lock_primary_on_update: boolean2().default(true),
    })
      .passthrough()
      .default({
        primary_allowlist: ["code", "data", "research", "docs", "ops", "product", "meta"],
        strict_primary: false,
        fallback_primary: "meta",
        lock_primary_on_update: true,
      }),
    doc: object({
      sections: nonEmptyStringArray([...TASK_DOC_SECTIONS_DEFAULT]),
      required_sections: nonEmptyStringArray([...TASK_DOC_REQUIRED_SECTIONS_DEFAULT]),
    })
      .passthrough()
      .default({
        sections: [...TASK_DOC_SECTIONS_DEFAULT],
        required_sections: [...TASK_DOC_REQUIRED_SECTIONS_DEFAULT],
      }),
    comments: object({
      start: COMMENT_POLICY_SCHEMA.default(COMMENT_POLICY_DEFAULTS.start),
      blocked: COMMENT_POLICY_SCHEMA.default(COMMENT_POLICY_DEFAULTS.blocked),
      verified: COMMENT_POLICY_SCHEMA.default(COMMENT_POLICY_DEFAULTS.verified),
    })
      .passthrough()
      .default(COMMENT_POLICY_DEFAULTS),
  })
    .passthrough()
    .default({
      id_suffix_length_default: 6,
      verify: {
        required_tags: ["code", "backend", "frontend"],
        require_steps_for_primary: ["code", "data", "ops"],
        require_verification_for_primary: ["code", "data", "ops"],
        spike_tag: "spike",
        enforce_on_plan_approve: true,
        enforce_on_start_when_no_plan: true,
      },
      tags: {
        primary_allowlist: ["code", "data", "research", "docs", "ops", "product", "meta"],
        strict_primary: false,
        fallback_primary: "meta",
        lock_primary_on_update: true,
      },
      doc: {
        sections: [...TASK_DOC_SECTIONS_DEFAULT],
        required_sections: [...TASK_DOC_REQUIRED_SECTIONS_DEFAULT],
      },
      comments: COMMENT_POLICY_DEFAULTS,
    }),
  evaluator: object({
    max_rework_attempts: number2().int().min(1).max(20).default(3),
    skepticism_level: _enum(EVALUATOR_SKEPTICISM_LEVELS).default("standard"),
  })
    .passthrough()
    .default({
      max_rework_attempts: 3,
      skepticism_level: "standard",
    }),
  commit: object({
    generic_tokens: nonEmptyStringArray([
      "start",
      "status",
      "mark",
      "done",
      "wip",
      "update",
      "tasks",
      "task",
    ]),
    dco: object({
      enabled: boolean2().default(false),
      name: nonEmptyString().nullable().default(null),
      email: nonEmptyString().nullable().default(null),
    })
      .passthrough()
      .default({
        enabled: false,
        name: null,
        email: null,
      }),
  })
    .passthrough()
    .default({
      generic_tokens: ["start", "status", "mark", "done", "wip", "update", "tasks", "task"],
      dco: {
        enabled: false,
        name: null,
        email: null,
      },
    }),
  tasks_backend: object({
    config_path: nonEmptyString().default(".agentplane/backends/local/backend.json"),
  })
    .passthrough()
    .default({ config_path: ".agentplane/backends/local/backend.json" }),
  artifacts_language: ARTIFACTS_LANGUAGE,
  closure_commit_requires_approval: boolean2().default(false),
}).passthrough();
function formatAgentplaneConfigIssues(issues) {
  return formatZodIssues("config schema validation failed", issues);
}
function validateAgentplaneConfig(raw) {
  const parsed = AgentplaneConfigSchema.safeParse(raw);
  if (!parsed.success) {
    const err = new Error(formatAgentplaneConfigIssues(parsed.error.issues));
    err.cause = parsed.error;
    throw err;
  }
  if (!isRecord(parsed.data)) {
    throw new Error("config must be an object");
  }
  parsed.data.execution = {
    ...EXECUTION_DEFAULTS,
    tool_budget: { ...EXECUTION_DEFAULTS.tool_budget },
    stop_conditions: [...EXECUTION_DEFAULTS.stop_conditions],
    handoff_conditions: [...EXECUTION_DEFAULTS.handoff_conditions],
    unsafe_actions_requiring_explicit_user_ok: [
      ...EXECUTION_DEFAULTS.unsafe_actions_requiring_explicit_user_ok,
    ],
  };
  return parsed.data;
}
var DEFAULT_AGENTPLANE_CONFIG = validateAgentplaneConfig({});
function buildAgentplaneConfigJsonSchema() {
  const { $schema: _schema, ...schema } = toJSONSchema(AgentplaneConfigSchema, {
    target: "draft-07",
    unrepresentable: "any",
    io: "input",
    reused: "inline",
    cycles: "throw",
  });
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://agentplane.org/schemas/config.schema.json",
    title: "agentplane config.json (v1)",
    ...schema,
  };
}
var AGENTPLANE_CONFIG_SCHEMA = buildAgentplaneConfigJsonSchema();

// packages/core/src/config/defaults.ts
var PROTOTYPE_POLLUTION_KEYS = new Set(["__proto__", "prototype", "constructor"]);
// packages/core/src/config/workflow-contract.ts
var WORKFLOW_CONTRACT_VERSION = 2;
var nonEmptyString2 = string2().min(1);
var configShape = AgentplaneConfigSchema.shape;
var tasksConfigSchema = configShape.tasks.unwrap();
var WORKFLOW_RETRY_POLICY_SCHEMA = object({
  normal_exit_continuation: boolean2(),
  abnormal_backoff: literal("exponential"),
  max_attempts: number2().int().min(1).max(100),
}).strict();
var WORKFLOW_TIMEOUTS_SCHEMA = object({
  stall_seconds: number2().int().min(1).max(86400),
}).strict();
var WORKFLOW_OWNERS_SCHEMA = object({
  orchestrator: nonEmptyString2,
}).strict();
var WORKFLOW_APPROVALS_V1_SCHEMA = object({
  require_plan: boolean2(),
  require_verify: boolean2(),
  require_network: boolean2(),
}).strict();
var WORKFLOW_APPROVALS_V2_SCHEMA = object({
  require_plan: boolean2(),
  require_verify: boolean2(),
  require_network: boolean2(),
  require_force: boolean2().optional(),
}).passthrough();
var WORKFLOW_SECTION_SCHEMA = object({
  mode: configShape.workflow_mode.unwrap(),
  status_commit_policy: configShape.status_commit_policy.unwrap().optional(),
  commit_automation: configShape.commit_automation.unwrap().optional(),
  finish_auto_status_commit: configShape.finish_auto_status_commit.unwrap().optional(),
  close_commit: configShape.close_commit.unwrap().optional(),
  artifacts_language: configShape.artifacts_language.unwrap().optional(),
  closure_commit_requires_approval: configShape.closure_commit_requires_approval
    .unwrap()
    .optional(),
}).passthrough();
var WORKFLOW_WORKSPACE_SCHEMA = object({
  agents_dir: nonEmptyString2.optional(),
  tasks_path: nonEmptyString2.optional(),
  workflow_dir: nonEmptyString2.optional(),
  worktrees_dir: nonEmptyString2.optional(),
  isolation: literal("per_task").optional(),
  cleanup: literal("after_finish").optional(),
}).passthrough();
var WORKFLOW_TASKS_SCHEMA = tasksConfigSchema
  .extend({
    backend: configShape.tasks_backend.unwrap().optional(),
  })
  .passthrough();
var WORKFLOW_SCHEDULER_SCHEMA = object({
  concurrency: number2().int().min(1).optional(),
  poll_interval_ms: number2().int().min(0).optional(),
  retry_policy: WORKFLOW_RETRY_POLICY_SCHEMA.optional(),
  timeouts: WORKFLOW_TIMEOUTS_SCHEMA.optional(),
}).passthrough();
var WORKFLOW_EVALUATOR_SCHEMA = configShape.evaluator
  .unwrap()
  .extend({
    verdicts: array(nonEmptyString2).min(1).optional(),
    required_checks: array(nonEmptyString2).optional(),
  })
  .passthrough();
var WORKFLOW_OBSERVABILITY_SCHEMA = object({
  runs_dir: nonEmptyString2.optional(),
  events: literal("jsonl").optional(),
}).passthrough();
var WORKFLOW_OPTIONAL_ROOT_SHAPE = {
  authority: configShape.authority.unwrap().optional(),
  workspace: WORKFLOW_WORKSPACE_SCHEMA.optional(),
  paths: configShape.paths.unwrap().optional(),
  tasks: WORKFLOW_TASKS_SCHEMA.optional(),
  branch: configShape.branch.unwrap().optional(),
  framework: configShape.framework.unwrap().optional(),
  execution: configShape.execution.unwrap().optional(),
  runner: configShape.runner.unwrap().optional(),
  feedback: configShape.feedback.unwrap().optional(),
  recipes: configShape.recipes.unwrap().optional(),
  commit: configShape.commit.unwrap().optional(),
  acr: configShape.acr.unwrap().optional(),
  scheduler: WORKFLOW_SCHEDULER_SCHEMA.optional(),
  evaluator: WORKFLOW_EVALUATOR_SCHEMA.optional(),
  observability: WORKFLOW_OBSERVABILITY_SCHEMA.optional(),
};
var WorkflowV1FrontMatterSchema = object({
  version: literal(1),
  mode: configShape.workflow_mode.unwrap(),
  owners: WORKFLOW_OWNERS_SCHEMA,
  approvals: WORKFLOW_APPROVALS_V1_SCHEMA,
  retry_policy: WORKFLOW_RETRY_POLICY_SCHEMA,
  timeouts: WORKFLOW_TIMEOUTS_SCHEMA,
  in_scope_paths: array(nonEmptyString2).min(1),
  ...WORKFLOW_OPTIONAL_ROOT_SHAPE,
}).strict();
var WorkflowV2FrontMatterSchema = object({
  version: literal(WORKFLOW_CONTRACT_VERSION),
  workflow: WORKFLOW_SECTION_SCHEMA,
  owners: WORKFLOW_OWNERS_SCHEMA,
  approvals: WORKFLOW_APPROVALS_V2_SCHEMA,
  ...WORKFLOW_OPTIONAL_ROOT_SHAPE,
  retry_policy: WORKFLOW_RETRY_POLICY_SCHEMA,
  timeouts: WORKFLOW_TIMEOUTS_SCHEMA,
  in_scope_paths: array(nonEmptyString2).min(1),
}).strict();
var WorkflowFrontMatterInputSchema = union([
  WorkflowV1FrontMatterSchema,
  WorkflowV2FrontMatterSchema,
]);
function buildWorkflowJsonSchema() {
  const { $schema: _schema, ...schema } = toJSONSchema(WorkflowFrontMatterInputSchema, {
    target: "draft-2020-12",
    unrepresentable: "any",
    io: "input",
    reused: "inline",
    cycles: "throw",
  });
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://agentplane.dev/schemas/workflow.schema.json",
    title: "Agentplane Workflow Contract",
    description:
      "Versioned WORKFLOW.md front matter. AgentPlane reads v1 and v2, normalizes both to v2, and rejects unsupported versions.",
    ...schema,
  };
}
var WORKFLOW_FRONT_MATTER_JSON_SCHEMA = buildWorkflowJsonSchema();
// packages/core/src/tasks/task-centric/digest.ts
import { createHash as createHash3 } from "node:crypto";
function taskCentricDigest(value) {
  const canonical = canonicalize(value);
  if (canonical === undefined) throw new Error("Task-centric value is not canonicalizable.");
  return `sha256:${createHash3("sha256").update(canonical, "utf8").digest("hex")}`;
}
function recipeSourcePlanSemanticDigest(proposal) {
  const { planning_baseline: _baseline, recipe_provenance: _provenance, ...source } = proposal;
  const validation = (value) => {
    const { evidence_fingerprint: _fingerprint, ...semantics } = value;
    return semantics;
  };
  return taskCentricDigest({
    ...source,
    work_items: {
      ...source.work_items,
      work_items: source.work_items.work_items.map((item) => ({
        ...item,
        validation: validation(item.validation),
      })),
    },
    top_level_validation: validation(source.top_level_validation),
  });
}
// packages/core/src/tasks/task-centric/compatibility.ts
var TASK_LIFECYCLE_STATES = new Set([
  "CAPTURED",
  "PLANNING",
  "AWAITING_PLAN_APPROVAL",
  "ACTIVE",
  "FINAL_VALIDATION",
  "COMPLETED",
  "HUMAN_REQUIRED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
]);
var WORK_ITEM_STATES2 = new Set([
  "PLANNED",
  "READY",
  "CLAIMED",
  "EXECUTING",
  "RESULT_RECEIVED",
  "INSPECTING",
  "VALIDATING",
  "REWORK_READY",
  "COMPLETED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
]);
// packages/core/src/tasks/task-centric/graph.ts
function validateDependencies(graph, outputOwners, issues) {
  const ids = new Set();
  for (const [index, item] of graph.work_items.entries()) {
    if (ids.has(item.id)) {
      issues.push({
        code: "duplicate_work_item",
        path: `work_items[${index}].id`,
        message: `Work item id ${item.id} is duplicated.`,
      });
    }
    ids.add(item.id);
  }
  for (const [index, item] of graph.work_items.entries()) {
    for (const dependency of item.depends_on) {
      if (!ids.has(dependency)) {
        issues.push({
          code: "missing_dependency",
          path: `work_items[${index}].depends_on`,
          message: `Work item ${item.id} depends on missing work item ${dependency}.`,
        });
      }
    }
  }
  const visiting = new Set();
  const visited = new Set();
  const byId = new Map(graph.work_items.map((item) => [item.id, item]));
  const visit = (id) => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    const item = byId.get(id);
    const prerequisites = [
      ...(item?.depends_on ?? []),
      ...(item?.required_inputs ?? []).flatMap((input) => {
        const producer = outputOwners.get(input);
        return producer === undefined ? [] : [producer];
      }),
    ];
    for (const dependency of prerequisites) {
      if (byId.has(dependency) && visit(dependency)) return true;
    }
    visiting.delete(id);
    visited.add(id);
    return false;
  };
  for (const item of graph.work_items) {
    if (visit(item.id)) {
      issues.push({
        code: "dependency_cycle",
        path: `work_items.${item.id}.depends_on`,
        message: `Work item ${item.id} participates in a dependency cycle.`,
      });
      break;
    }
  }
}
function validateWorkItemGraph(graph, supportedCapabilities = new Set()) {
  const issues = [];
  const outputOwners = new Map();
  for (const [index, item] of graph.work_items.entries()) {
    for (const output of item.expected_outputs) {
      if (outputOwners.has(output)) {
        issues.push({
          code: "duplicate_output_declaration",
          path: `work_items[${index}].expected_outputs`,
          message: `Output ${output} is declared more than once.`,
        });
      }
      outputOwners.set(output, item.id);
    }
  }
  validateDependencies(graph, outputOwners, issues);
  for (const [index, item] of graph.work_items.entries()) {
    for (const input of item.required_inputs) {
      if (!outputOwners.has(input) || outputOwners.get(input) === item.id) {
        issues.push({
          code: "missing_input_declaration",
          path: `work_items[${index}].required_inputs`,
          message: `Input ${input} has no other producing WorkItem.`,
        });
      }
    }
  }
  for (const [index, item] of graph.work_items.entries()) {
    if (
      item.expected_outputs.length === 0 ||
      item.expected_outputs.some((output) => !output.trim())
    ) {
      issues.push({
        code: "missing_output_declaration",
        path: `work_items[${index}].expected_outputs`,
        message: `Work item ${item.id} declares an empty output.`,
      });
    }
    if (item.acceptance_criteria.length === 0) {
      issues.push({
        code: "missing_acceptance",
        path: `work_items[${index}].acceptance_criteria`,
        message: `Work item ${item.id} has no acceptance criteria.`,
      });
    }
    const checkIds = new Set(item.validation.checks.map((check) => check.id));
    const validationCriteriaById = new Map(
      item.validation.criteria.map((criterion) => [criterion.id, criterion]),
    );
    for (const criterion of item.acceptance_criteria) {
      if (!criterion.required) continue;
      const validationCriterion = validationCriteriaById.get(criterion.id);
      const missingDeclaredCheck = criterion.check_ids.some((id) => !checkIds.has(id));
      const validationDoesNotCoverAcceptance =
        criterion.check_ids.length === 0 ||
        !validationCriterion?.required ||
        criterion.check_ids.some((id) => !validationCriterion.check_ids.includes(id));
      if (missingDeclaredCheck || validationDoesNotCoverAcceptance) {
        issues.push({
          code: "missing_validation",
          path: `work_items[${index}].acceptance_criteria.${criterion.id}`,
          message: `Required criterion ${criterion.id} is not fully covered by validation criteria and declared checks.`,
        });
      }
    }
    if (supportedCapabilities.size > 0) {
      for (const capability of new Set([
        ...item.capabilities,
        ...item.validation.checks.map((check) => check.capability),
      ])) {
        if (!supportedCapabilities.has(capability)) {
          issues.push({
            code: "unsupported_capability",
            path: `work_items[${index}].capabilities`,
            message: `Capability ${capability} is not available.`,
          });
        }
      }
    }
  }
  return issues;
}
var RECOVERABLE_WORK_ITEM_STATES = new Set(["COMPLETED", "REWORK_READY"]);
// packages/core/src/tasks/task-centric/schema.ts
var NON_EMPTY = string2().trim().min(1);
var DIGEST = custom(
  (value) => typeof value === "string" && /^sha256:[0-9a-f]{64}$/u.test(value),
  "Expected a SHA-256 digest.",
);
var ISO_DATE = string2().datetime({ offset: true });
var ACCEPTANCE_CRITERION = object({
  id: NON_EMPTY,
  description: NON_EMPTY,
  required: boolean2(),
  check_ids: array(NON_EMPTY),
}).strict();
var VALIDATION_CHECK = object({
  id: NON_EMPTY,
  kind: _enum(["structural", "deterministic", "semantic", "provider"]),
  required: boolean2(),
  capability: NON_EMPTY,
  command: NON_EMPTY.optional(),
  timeout_ms: number2().int().positive().optional(),
}).strict();
var VALIDATION_PLAN = object({
  schema_version: literal(1),
  criteria: array(ACCEPTANCE_CRITERION),
  checks: array(VALIDATION_CHECK),
  evidence_fingerprint: DIGEST,
}).strict();
var GIT_BASE_IDENTITY = discriminatedUnion("kind", [
  object({
    kind: literal("commit"),
    sha: string2()
      .regex(/^[0-9a-f]{40}$|^[0-9a-f]{64}$/u)
      .refine(
        (value) => !/^0+$/u.test(value),
        "A zero Git object id is not a repository baseline.",
      ),
    ref: string2().nullable(),
  }).strict(),
  object({ kind: literal("unborn"), ref: string2().nullable() }).strict(),
  object({
    kind: literal("unavailable"),
    reason_code: NON_EMPTY,
    detail: string2().optional(),
  }).strict(),
]);
var REPOSITORY_SNAPSHOT_ZOD_SCHEMA = object({
  schema_version: literal(1),
  digest: DIGEST,
  git: GIT_BASE_IDENTITY,
  dirty_paths: array(string2()),
  policy_digest: DIGEST.nullable(),
  config_digest: DIGEST.nullable(),
  context_digest: DIGEST.nullable(),
  task_history_cursor: string2().nullable(),
  captured_at: ISO_DATE,
})
  .strict()
  .superRefine((value, ctx) => {
    const { digest, ...identity } = value;
    if (digest !== taskCentricDigest(identity)) {
      ctx.addIssue({
        code: "custom",
        path: ["digest"],
        message: "Repository snapshot digest does not match its canonical content.",
      });
    }
  });
var CONTEXT_SPEC = object({
  required_sources: array(NON_EMPTY),
  optional_sources: array(NON_EMPTY),
  symbol_hints: array(NON_EMPTY),
  max_bytes: number2().int().positive(),
}).strict();
var RESOURCE_CLAIM = object({
  kind: _enum(["path", "workspace", "provider_queue", "exclusive"]),
  resource: NON_EMPTY,
  mode: _enum(["read", "write", "exclusive"]),
}).strict();
var WORK_ITEM = object({
  id: NON_EMPTY,
  objective: NON_EMPTY,
  depends_on: array(NON_EMPTY),
  required_inputs: array(NON_EMPTY),
  expected_outputs: array(NON_EMPTY),
  scope_roots: array(NON_EMPTY),
  acceptance_criteria: array(ACCEPTANCE_CRITERION).min(1),
  validation: VALIDATION_PLAN,
  context: CONTEXT_SPEC,
  risk: _enum(["low", "medium", "high"]),
  capabilities: array(NON_EMPTY),
  resource_claims: array(RESOURCE_CLAIM),
  optional: boolean2(),
  priority: number2().int(),
}).strict();
var RECIPE_PLAN_PROVENANCE = strictObject({
  schema_version: literal(1),
  package: strictObject({ id: NON_EMPTY, version: NON_EMPTY }),
  scenario: strictObject({ id: NON_EMPTY, api_version: literal("2"), digest: DIGEST }),
  compiler: strictObject({ id: literal("agentplane.scenario"), version: literal(1) }),
  source_plan_semantics_digest: DIGEST,
  parameters: array(
    strictObject({
      name: NON_EMPTY,
      value: union([string2().max(8192), number2().int().safe(), boolean2()]),
    }),
  )
    .max(256)
    .superRefine((values, ctx) => {
      if (values.some((entry, index) => index > 0 && values[index - 1].name >= entry.name))
        ctx.addIssue({ code: "custom", message: "Recipe parameters must be unique and sorted." });
    }),
  applicability: strictObject({ observed_by: literal("agentplane"), evidence_digest: DIGEST }),
  closure: strictObject({
    digest: DIGEST,
    artifact_digest: DIGEST,
    artifact_path: NON_EMPTY,
    artifact_size_bytes: number2().int().nonnegative(),
    task_quality_root: NON_EMPTY,
  }),
});
var TASK_PLAN_PROPOSAL_ZOD_SCHEMA = object({
  schema_version: literal(1),
  task_id: NON_EMPTY,
  planning_baseline: REPOSITORY_SNAPSHOT_ZOD_SCHEMA,
  work_items: object({ schema_version: literal(1), work_items: array(WORK_ITEM).min(1) }).strict(),
  assumptions: array(string2()),
  unresolved_questions: array(string2()),
  top_level_validation: VALIDATION_PLAN,
  recipe_provenance: RECIPE_PLAN_PROVENANCE.optional(),
})
  .strict()
  .superRefine((value, ctx) => {
    if (value.recipe_provenance) {
      const { recipe_provenance, ...source } = value;
      if (recipeSourcePlanSemanticDigest(source) !== recipe_provenance.source_plan_semantics_digest)
        ctx.addIssue({
          code: "custom",
          path: ["recipe_provenance", "source_plan_semantics_digest"],
          message: "Recipe provenance does not bind this exact source Plan.",
        });
    }
    for (const issue of validateWorkItemGraph(value.work_items)) {
      ctx.addIssue({
        code: "custom",
        path: issue.path.split("."),
        message: `${issue.code}: ${issue.message}`,
      });
    }
  });
var VALIDATION_REFERENCES = strictObject({
  criterion_ids: array(NON_EMPTY).min(1),
  check_ids: array(NON_EMPTY).min(1),
});
var COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA = strictObject({
  schema_version: literal(2),
  criteria: array(ACCEPTANCE_CRITERION).min(1),
  checks: array(VALIDATION_CHECK).min(1),
  work_items: array(
    WORK_ITEM.omit({ acceptance_criteria: true, validation: true }).extend({
      criterion_ids: array(NON_EMPTY).min(1).optional(),
      check_ids: array(NON_EMPTY).min(1).optional(),
    }),
  ).min(1),
  top_level_validation: VALIDATION_REFERENCES.optional(),
  assumptions: array(string2()).default([]),
  unresolved_questions: array(string2()).default([]),
}).describe(
  "Define criteria and checks once. One WorkItem may omit criterion_ids, check_ids and top_level_validation to use all definitions. Multiple WorkItems must declare these references explicitly. The CLI supplies the task identity and issued repository baseline.",
);
var TASK_PLAN_PROPOSAL_INPUT_ZOD_SCHEMA = union([
  TASK_PLAN_PROPOSAL_ZOD_SCHEMA,
  COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA,
]);
// packages/recipes/dist/index.js
function P3(e) {
  return (
    e.length > 0 &&
    e === e.trim() &&
    !/[\\:]/u.test(e) &&
    [...e].every((i) => (i.codePointAt(0) ?? 0) >= 32 && i.codePointAt(0) !== 127) &&
    !e.startsWith("/") &&
    !e.includes("{{") &&
    !e.includes("}}") &&
    e.split("/").every((i) => i !== ".." && i !== "")
  );
}
var I3 = string2()
  .min(1)
  .max(256)
  .regex(/^[A-Za-z0-9_.:@/-]+$/u);
var Y2 = string2()
  .max(1024)
  .refine((e) => e !== "." && P3(e), "Expected a contained file or package path.");
var X5 = _enum(["recipe", "repository"]);
var $e2 = discriminatedUnion("kind", [
  strictObject({ kind: literal("file"), source: X5, path: Y2 }),
  strictObject({ kind: literal("package"), id: I3 }),
  strictObject({ kind: literal("tool"), id: I3 }),
  strictObject({ kind: literal("secret"), id: I3, version: I3 }),
]);
var K2 = array($e2).max(4096);
var ce4 = strictObject({
  schema_version: literal(1),
  files: array(strictObject({ source: X5, path: Y2, dependencies: K2 })).max(4096),
  packages: array(
    strictObject({
      id: I3,
      version: I3,
      source: X5,
      root: Y2,
      files: array(Y2).min(1).max(4096),
      digest: string2().regex(/^sha256:[a-f0-9]{64}$/u),
      dependencies: K2,
    }),
  ).max(256),
  tools: array(strictObject({ id: I3, package_id: I3 })).max(1024),
  capabilities: array(strictObject({ id: I3, dependencies: K2 })).max(1024),
  commands: array(strictObject({ command: string2().min(1).max(8192), dependencies: K2 })).max(
    1024,
  ),
});
var M = string2().trim().min(1);
var Qe2 = string2().regex(/^[A-Za-z_][A-Za-z0-9_]*$/u);
var ei = M.refine((e) => !/[\\/]/u.test(e) && e !== "." && e !== "..");
var W2 = (e, i) =>
  strictObject({
    name: Qe2,
    type: literal(e),
    required: boolean2(),
    description: M.optional(),
    default: i.optional(),
  });
var ii = array(
  union([
    W2("string", string2()),
    W2("repo_path", string2().refine(P3, "Expected a repository-relative path.")),
    W2("integer", number2().int().safe()),
    W2("boolean", boolean2()),
  ]),
).superRefine((e, i) => {
  let n = new Set();
  for (let [t, r] of e.entries())
    (n.has(r.name) &&
      i.addIssue({ code: "custom", path: [t, "name"], message: "Duplicate parameter name." }),
      n.add(r.name));
});
var ve2 = discriminatedUnion("kind", [
  strictObject({ kind: literal("path_exists"), path: M }),
  strictObject({ kind: literal("capability_available"), capability: M }),
  strictObject({
    kind: literal("observed_value_equals"),
    key: M,
    value: union([string2(), number2().finite(), boolean2(), _null3()]),
  }),
]);
var ne4 = strictObject({
  schema_version: literal("2"),
  id: ei,
  summary: M.optional(),
  description: M.optional(),
  goal: M,
  parameters: ii,
  applicability: strictObject({ required: array(ve2), excluded: array(ve2) }),
  plan_template: COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA,
});
function N4(e) {
  return ne4.parse(e);
}
var U3 = class extends Error {
  parameterNames;
  constructor(i) {
    (super(`Missing required parameters: ${i.join(", ")}`),
      (this.name = "MissingScenarioParametersError"),
      (this.parameterNames = [...i]));
  }
};
function Re3(e, i) {
  let n = N4(e),
    t = new Map(n.parameters.map((a) => [a.name, a])),
    r = new Map();
  for (let a of i) {
    if (!t.has(a.name)) throw new Error(`Unknown parameter: ${a.name}`);
    if (r.has(a.name)) throw new Error(`Duplicate parameter: ${a.name}`);
    r.set(a.name, a.value);
  }
  let c = [];
  for (let a of n.parameters) {
    if ((!r.has(a.name) && a.default !== undefined && r.set(a.name, a.default), !r.has(a.name))) {
      a.required && c.push(a.name);
      continue;
    }
    let g = r.get(a.name);
    if (
      !(a.type === "integer"
        ? typeof g == "number" && Number.isSafeInteger(g)
        : a.type === "repo_path"
          ? typeof g == "string" && P3(g)
          : typeof g === a.type)
    )
      throw new Error(`Invalid ${a.type} parameter: ${a.name}`);
  }
  if (c.length > 0) throw new U3(c);
  let o =
      /^(?:summary|description|goal|plan_template\.(?:criteria\.\d+\.description|work_items\.\d+\.(?:objective|context\.symbol_hints\.\d+)|assumptions\.\d+|unresolved_questions\.\d+)|applicability\.(?:required|excluded)\.\d+\.value)$/u,
    y =
      /^(?:applicability\.(?:required|excluded)\.\d+\.path|plan_template\.work_items\.\d+\.(?:scope_roots\.\d+|context\.(?:required_sources|optional_sources)\.\d+))$/u;
  function m(a, g, $) {
    let v = a.replaceAll(/\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}/gu, (S, R) => {
      if (!r.has(R)) throw new Error(`Unbound parameter ${R} in ${g}`);
      if ($ && t.get(R)?.type !== "repo_path")
        throw new Error(`Path field ${g} requires a repo_path parameter: ${R}`);
      return String(r.get(R));
    });
    if (v.includes("{{") || v.includes("}}")) throw new Error(`Unresolved placeholder in ${g}`);
    if ($ && !P3(v)) throw new Error(`Invalid repository path in ${g}`);
    return v;
  }
  function l(a, g, $ = false) {
    if (typeof a == "string") {
      let v = $ || y.test(g);
      if (v || o.test(g)) return m(a, g, v);
      if (a.includes("{{") || a.includes("}}"))
        throw new Error(`Placeholders are forbidden in ${g}`);
      return a;
    }
    if (Array.isArray(a)) return a.map((v, S) => l(v, `${g}.${S}`));
    if (a !== null && typeof a == "object") {
      let v = a;
      return Object.fromEntries(
        Object.entries(v).map(([S, R]) => {
          let V = g ? `${g}.${S}` : S;
          if (V === "parameters") return [S, R];
          let J =
            S === "resource" &&
            v.kind === "path" &&
            /^plan_template\.work_items\.\d+\.resource_claims\.\d+$/u.test(g);
          return [S, l(R, V, J)];
        }),
      );
    }
    return a;
  }
  return N4(l(n, ""));
}
var li = strictObject({
  mode: literal("instantiate"),
  scenario: unknown(),
  bindings: array(
    strictObject({
      name: string2().min(1),
      value: union([string2(), number2().int().safe(), boolean2()]),
    }),
  ).max(256),
  task_id: string2().min(1),
  planning_baseline: REPOSITORY_SNAPSHOT_ZOD_SCHEMA,
});
var be4 = string2().regex(/^sha256:[a-f0-9]{64}$/u);
var F4 = string2().min(1).max(8192);
var Ae4 = {
  schema_version: literal(1),
  kind: literal("recipe_v1_conversion_result"),
  task_id: F4,
  source_digest: be4,
  audit_digest: be4,
};
var yi2 = discriminatedUnion("status", [
  strictObject({
    ...Ae4,
    status: literal("draft"),
    scenario: ne4,
    resolutions: array(strictObject({ source_path: F4, target_path: F4, explanation: F4 })).max(
      256,
    ),
  }),
  strictObject({ ...Ae4, status: literal("blocked"), reason: F4 }),
]);

// scripts/bench/paired-m05-product.mjs
var start = performance.now();
assert.equal(process.env.AGENTPLANE_PAIRED_MODE, "offline");
assert.equal(process.env.AGENTPLANE_PAIRED_FAKE_PROVIDER, "1");
assert.equal(process.env.AGENTPLANE_PAIRED_NETWORK, "deny");
var task = JSON.parse(readFileSync3("fixture.json", "utf8"));
var arm = process.env.AGENTPLANE_PAIRED_ARM;
assert.ok(["no_recipe", "instantiate", "specialize"].includes(arm));
var compact = structuredClone(task.plan);
var route = "inline";
var stages = [];
var selectionStart = performance.now();
stages.push({ id: "fixture_input", duration_ms: selectionStart - start });
if (arm !== "no_recipe") {
  if (task.selection === "no_match") {
    assert.notEqual(task.requested_scenario, task.scenario.id);
    route = "no_match_fallback";
  } else {
    assert.equal(task.requested_scenario, task.scenario.id);
    try {
      compact = Re3(task.scenario, task.bindings).plan_template;
      route = "instantiated";
      if (arm === "specialize") {
        const draft = structuredClone(compact);
        draft.work_items[0].objective = "Fixture specialization input: semantic detail absent";
        compact = { ...draft, work_items: structuredClone(task.plan.work_items) };
        route = "deterministic_specialization";
      }
    } catch (error) {
      assert.equal(task.selection, "near_match");
      assert.ok(error instanceof U3);
      assert.deepEqual(error.parameterNames, ["objective"]);
      compact = structuredClone(task.plan);
      route = "missing_binding_fallback";
    }
  }
}
stages.push({
  id: "selection_and_fixture_planning",
  duration_ms: performance.now() - selectionStart,
});
var normalizationStart = performance.now();
assert.throws(() => N4({ ...task.scenario, approval: "USER" }));
var baseline = io({
  git: { kind: "commit", sha: process.env.AGENTPLANE_PAIRED_TARGET_COMMIT, ref: "refs/heads/main" },
  dirty_paths: [],
  policy_digest: task.policy_digest,
  config_digest: null,
  context_digest: null,
  task_history_cursor: null,
  captured_at: "2026-10-06T00:00:00.000Z",
});
var proposal = ho(compact, {
  task_id: "m05-offline-fixture",
  planning_baseline: baseline,
});
writeFileSync2("plan.json", JSON.stringify(proposal));
writeFileSync2(
  "route.json",
  JSON.stringify({ arm, route, authority_granted: false, provider_invoked: false }),
);
var resultDigest = `sha256:${createHash4("sha256").update(JSON.stringify(proposal)).digest("hex")}`;
stages.push({
  id: "normalization_and_fixture_output",
  duration_ms: performance.now() - normalizationStart,
});
process.stdout.write(
  JSON.stringify({
    status: "completed",
    result_digest: resultDigest,
    violations: [],
    stages,
    token_usage: {
      state: "unavailable",
      input_tokens: null,
      cached_input_tokens: null,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: null,
      reason: "Deterministic offline Plan preparation; no provider usage was observed.",
    },
    observed_identity: {
      adapter: process.env.AGENTPLANE_PAIRED_ADAPTER,
      model: process.env.AGENTPLANE_PAIRED_MODEL,
      reasoning_effort: process.env.AGENTPLANE_PAIRED_REASONING_EFFORT,
      authority_digest: process.env.AGENTPLANE_PAIRED_AUTHORITY_DIGEST,
      check_ids: JSON.parse(process.env.AGENTPLANE_PAIRED_CHECK_IDS),
      retry_limit: Number(process.env.AGENTPLANE_PAIRED_RETRY_LIMIT),
      runtime_profile: JSON.parse(process.env.AGENTPLANE_PAIRED_RUNTIME_PROFILE),
    },
  }),
);
