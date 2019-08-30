import { app } from "../src/server";
import supertest from 'supertest';

describe('server', () => {
  const request = supertest(app);
  
  test("Root path responds", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  })

  test("GraphQl path responds", async () => {
    const response = await request.get("/graphql");
    expect(response.status).toBe(200);
  })
})
