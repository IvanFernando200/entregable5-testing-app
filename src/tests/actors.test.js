const request = require("supertest");
const app = require("../app");

let id;

test("GET /actors must get all the actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors must create an actor", async () => {
  const newActor = {
    firstName: "Ivan",
    lastName: "Silva",
    nationality: "russia",
    image:
      "https://media.licdn.com/dms/image/D4E03AQFS6NIcXFCVJQ/profile-displayphoto-shrink_400_400/0/1704974971113?e=1728518400&v=beta&t=YZNhKDGY1wmfT7sWlIXszvICiJWcasN9XzYptl_nJcE",
    birthday: "09-23-2000",
  };
  const res = await request(app).post("/actors").send(newActor);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  id = res.body.id;
  expect(res.body.firstName).toBe(newActor.firstName);
});

test("PUT /actors/:id must update an actor", async () => {
  const updatedActor = {
    firstName: "Garou",
    lastName: "Siverian",
  };
  const res = await request(app).put(`/actors/${id}`).send(updatedActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedActor.firstName);
});

test("DELETE /actors/:id must remove an actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
