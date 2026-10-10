import assert from "node:assert/strict";

// The trusted host creates a fresh externally restricted app-server for the
// issued role and writable roots. An EVALUATOR must not inherit EXECUTOR writes.
// The factory owns native campaign authority; no manifest approval is accepted.
export function semanticCodingPort({ assignmentId, phase = "steady", openEpisode }) {
  return async function solve(episode) {
    const host = await openEpisode(episode.order);
    const messages = [];
    const unsubscribe = host.subscribe((event) => {
      if (event.method === "item/completed" && event.params?.item?.type === "agentMessage")
        messages.push(structuredClone(event.params));
    });
    try {
      const call = {
        id: host.callId,
        assignment_id: assignmentId,
        episode_id: episode.order.work_order_id.replace(/^sha256:/u, ""),
        role: episode.order.role,
        accounting_phase: phase,
        retry: host.retry ?? 0,
      };
      const prompt =
        "Perform only this native WorkOrder. Respect all authority and stop rules. Return the typed semantic JSON payload as your final message. The host writes the result to the issued exchange. Do not execute lifecycle or approval commands.\n" +
        JSON.stringify({
          work_order: episode.order,
          required_context: episode.required,
          result_schema: episode.schema,
        });
      const receipt = await host.boundary.execute(call, [
        { type: "text", text: prompt, text_elements: [] },
      ]);
      const matching = messages.filter(
        (message) => message.threadId === receipt.thread_id && message.turnId === receipt.turn_id,
      );
      assert.ok(matching.length > 0, "A bound final semantic message is required");
      assert.equal(typeof matching.at(-1).item.text, "string");
      const result = JSON.parse(matching.at(-1).item.text);
      assert.equal(result.work_order_id, episode.order.work_order_id);
      return { call_id: call.id, result };
    } finally {
      unsubscribe();
      await host.close();
    }
  };
}
