import { app } from "../src/grapql/server";
import supertest from 'supertest';
import { data } from '../src/data';

describe('GraphQL server', () => {
  const request = supertest(app);
  const articleId = data.article && Object.keys(data.article)[0];

  test("GraphQl path responds", async () => {
    const response = await request.get("/graphql");
    expect(response.status).toBe(200);
  })

  test("GraphQl returns valid response on valid Article query", async () => {
    const query = `
                query Article {
                getArticle(id: "${articleId}") {
                  id
                  slug
                  title
                }
              }`;

    const response = await request.post("/graphql").send({ query });
    
    expect(JSON.parse(response.text).data).toBeDefined();
  })

  test("GraphQl returns null if no data is found", async () => {
    const query = `
                query Article {
                getArticle(id: "Invalid-id") {
                  id
                  slug
                  title
                }
              }`;

    const response = await request.post("/graphql").send({ query });

    expect(JSON.parse(response.text).data.getArticle).toBe(null);
  })

  test("GraphQl returns error on invalid Article query", async () => {
    const query = `
                query Article {
                getArticle(id: "${articleId}") {
                  id
                  t
                }
              }`;

    const response = await request.post("/graphql").send({ query });

    expect(JSON.parse(response.text).data).not.toBeDefined();
    expect(JSON.parse(response.text).errors).toBeDefined();
  })

  test("GraphQl updateAticleSlug mutation works", async () => {
    const updatedSlug = "test-updated";
    const query = `
                mutation UpdateSlug {
                updateAticleSlug(id: "${articleId}", slug: "${updatedSlug}") {
                  id
                  slug
                }
              }`;

    const response = await request.post("/graphql").send({ query });

    expect(JSON.parse(response.text).data).toBeDefined();
    expect(JSON.parse(response.text).data.updateAticleSlug.slug).toBe(updatedSlug);
  })
})
