import { describe, it, expect } from "vitest";

describe("Test Infrastructure", () => {
  it("should run tests successfully", () => {
    expect(true).toBe(true);
  });

  it("should have access to globals", () => {
    expect(window).toBeDefined();
    expect(document).toBeDefined();
  });
});
