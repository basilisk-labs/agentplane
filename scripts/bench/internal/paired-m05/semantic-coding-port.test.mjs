import assert from "node:assert/strict";
import test from "node:test";
import { semanticCodingPort } from "./semantic-coding-port.mjs";
const noop = () => {};
for (const wrong of [false, true])
  test(`semantic output is bound to the actual provider thread and turn: ${wrong}`, async () => {
    let listener,
      closed = false,
      seen;
    const episode = {
      order: {
        work_order_id: "sha256:" + "a".repeat(64),
        role: "EVALUATOR",
        authority: { writable_roots: [] },
      },
      required: [],
      schema: {},
    };
    const solve = semanticCodingPort({
      assignmentId: "assignment",
      openEpisode: async (order) => {
        assert.deepEqual(order.authority.writable_roots, []);
        return {
          callId: "call",
          subscribe(fn) {
            listener = fn;
            return noop;
          },
          close: async () => {
            closed = true;
          },
          boundary: {
            execute: async (call, input) => {
              seen = call;
              assert.ok(input[0].text.includes("Do not execute lifecycle"));
              listener({
                method: "item/completed",
                params: {
                  threadId: wrong ? "other" : "thread",
                  turnId: "turn",
                  item: {
                    type: "agentMessage",
                    text: JSON.stringify({ work_order_id: order.work_order_id, status: "failed" }),
                  },
                },
              });
              return { thread_id: "thread", turn_id: "turn" };
            },
          },
        };
      },
    });
    if (wrong) await assert.rejects(solve(episode), /bound final/u);
    else {
      const solved = await solve(episode);
      assert.equal(solved.call_id, "call");
    }
    assert.equal(seen.role, "EVALUATOR");
    assert.equal(seen.accounting_phase, "steady");
    assert.equal(closed, true);
  });
