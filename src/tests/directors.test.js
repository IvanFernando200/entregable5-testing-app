const request = require("supertest");
const app = require("../app");

let id;
test("GET /directors must get all the directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors must create a director", async () => {
  const newDirector = {
    firstName: "Andi",
    lastName: "Gonzales",
    nationality: "USA",
    image: "https://andiceo.jpn",
    birthday: "02-22-1978",
  };
  const res = await request(app).post("/directors").send(newDirector);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  id = res.body.id;
  expect(res.body.firstName).toBe(newDirector.firstName);
});

test("PUT /directors/:id must update a director", async () => {
  const updatedDirector = {
    firstName: "Geronimo",
    nationality: "UK",
  };
  const res = await request(app).put(`/directors/${id}`).send(updatedDirector);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedDirector.firstName);
});

test("DELETE /directors/:id must delete a director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
