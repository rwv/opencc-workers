import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Could import any other source file/function here
import worker from "../src";

describe("translate", () => {
  it("translate from tw to cn", async () => {
    const query = {
      query: "漢語",
      from: "tw",
      to: "cn",
    };

    const parameters = new URLSearchParams();
    parameters.set("from", query.from);
    parameters.set("to", query.to);
    parameters.set("query", query.query);

    const request = new Request(
      "http://example.com/translate?" + parameters.toString()
    );

    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions

    await waitOnExecutionContext(ctx);
    const text = await response.text();
    expect(text).toBe("汉语");
  });

  it("translate from cn to tw", async () => {
    const query = {
      query: "汉语",
      from: "cn",
      to: "tw",
    };

    const parameters = new URLSearchParams();
    parameters.set("from", query.from);
    parameters.set("to", query.to);
    parameters.set("query", query.query);

    const request = new Request(
      "http://example.com/translate?" + parameters.toString()
    );

    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions

    await waitOnExecutionContext(ctx);
    const text = await response.text();
    expect(text).toBe("漢語");
  });
});
