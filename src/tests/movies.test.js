const request = require("supertest");
// const app = require("/Users/IVAN/Downloads/node/week5/entregable5/movies-app-alter-back/src/app");
const app = require("../app");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
const Actor = require("../models/Actor");

let id;
test("GET /movies must get all the movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies must create a movie", async () => {
  const newMovie = {
    name: "Interestellar",
    image: "https://interestellar.png",
    synopsis: "that's when they travel to the space",
    releaseYear: 2020,
  };
  const res = await request(app).post("/movies").send(newMovie);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  id = res.body.id;
  expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies/:id must return a movie", async () => {
  const res = await request(app).get(`/movies/${id}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT /movies/:id must update a movie", async () => {
  const updatedMovie = {
    name: "Interestellar new age",
    image: "https://inter-interestellar.png",
  };
  const res = await request(app).put(`/movies/${id}`).send(updatedMovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedMovie.name);
});

test("POST /movies/:id/actors must set actors to movie", async () => {
  const actor = await Actor.create({
    firstName: "Ivan",
    lastName: "Surkillo",
    nationality: "Cuba",
    image: "https://ivansurkillo.png",
    birthday: "03-18-1987",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("POST /movies/:id/directors must set directors to movie", async () => {
  const director = await Director.create({
    firstName: "Musk",
    lastName: "Dias",
    nationality: "Bolivia",
    image: "https://muskdias.png",
    birthday: "09-20-1969",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("POST /movies/:id/genres must set genres to movie", async () => {
  const genre = await Genre.create({ name: "horror" });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("DELETE /movies/:id must delete a movie", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
