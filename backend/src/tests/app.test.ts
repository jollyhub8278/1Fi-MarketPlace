import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../app";

describe("1Fi Marketplace API", () => {
  it("returns the API health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "1Fi Marketplace API is running",
    });
  });

  it("returns 404 for an unknown route", async () => {
    const response = await request(app).get(
      "/api/unknown-route",
    );

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain(
      "Route not found",
    );
  });
});