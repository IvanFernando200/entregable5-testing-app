const request = require("supertest");
const app = require("../app");

let id;

test("GET /genres must get all the genres", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres must create a genre", async () => {
  const newGenre = { name: "horror" };
  const res = await request(app).post("/genres").send(newGenre);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  id = res.body.id;
  expect(res.body.name).toBe(newGenre.name);
});

test("PUT /genres/:id must update a genre", async () => {
  const updatedGenre = {
    name: "nature",
  };
  const res = await request(app).put(`/genres/${id}`).send(updatedGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
});

test("DELETE /genres/:id must delete a genre", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
