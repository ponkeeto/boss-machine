const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
ideasRouter;

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (!idea) {
    res.status(404).send();
  } else {
    req.idea = idea;
    next();
  }
});

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
