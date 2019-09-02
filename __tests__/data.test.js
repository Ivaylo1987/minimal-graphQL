import getEntity, { data } from '../src/data';

describe("Data service", () => {
  const articleId = data.article && Object.keys(data.article)[0];

  test("getEntity returns correct object by id", () => {
    const article = getEntity("article", articleId);

    expect(article.id).toBe(articleId)
  })

  test("getEntity returns undefined if object is not found by id", () => {
    const article = getEntity("article", "non-existing-id");

    expect(article).toBeUndefined()
  })
})
