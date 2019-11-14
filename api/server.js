const express = require("express");

const server = express();
let users = [
  { id: 1, username: "shaun", password: "1234" },
  { id: 2, username: "sarah", password: "1234" },
  { id: 3, username: "archie", password: "1234" }
];
let id = 4;

server.use(express.json());

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.post("/api/users", (req, res) => {
  const newUser = {
    ...req.body,
    id
  };
  users.push(newUser);
  id++;
  res.status(201).json(users);
});

server.get("/api/users/:id", (req, res) => {
  res
    .status(200)
    .json(users.filter(user => user.id === Number(req.params.id))[0]);
});

server.put("/api/users/:id", (req, res) => {
  users = users.map(user =>
    user.id === Number(req.params.id) ? { ...user, ...req.body } : user
  );
  res.status(200).json(users);
});

server.delete("/api/users/:id", (req, res) => {
  users = users.filter(user => user.id !== Number(req.params.id));
  res.status(200).json(users);
});

server.get("*", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
