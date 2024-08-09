const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");

// movies_actors
Movie.belongsToMany(Actor, { through: "movies_actors" });
Actor.belongsToMany(Movie, { through: "movies_actors" });

// movies_directors
Movie.belongsToMany(Director, { through: "movies_directors" });
Director.belongsToMany(Movie, { through: "movies_directors" });

// movies_genres
Movie.belongsToMany(Genre, { through: "movies_genres" });
Genre.belongsToMany(Movie, { through: "movies_genres" });
