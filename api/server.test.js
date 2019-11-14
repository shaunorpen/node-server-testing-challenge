const server = require("./server");
const request = require("supertest");

describe("users api", () => {
  describe("get all users", () => {
    test("returns three users", () => {
      return request(server)
        .get("/api/users")
        .expect(200)
        .expect([
          { id: 1, username: "shaun", password: "1234" },
          { id: 2, username: "sarah", password: "1234" },
          { id: 3, username: "archie", password: "1234" }
        ]);
    });
  });
  describe("get individual user", () => {
    test("returns one user", () => {
      return request(server)
        .get("/api/users/1")
        .expect(200)
        .expect({ id: 1, username: "shaun", password: "1234" });
    });
  });
  describe("create new user", () => {
    test("returns four users", () => {
      return request(server)
        .post("/api/users")
        .send({ username: "fred", password: "1234" })
        .expect(201)
        .expect([
          { id: 1, username: "shaun", password: "1234" },
          { id: 2, username: "sarah", password: "1234" },
          { id: 3, username: "archie", password: "1234" },
          { id: 4, username: "fred", password: "1234" }
        ]);
    });
  });
  describe("update user", () => {
    test("returns updated user list", () => {
      return request(server)
        .put("/api/users/1")
        .send({ username: "sean", password: "4321" })
        .expect(200)
        .expect([
          { id: 1, username: "sean", password: "4321" },
          { id: 2, username: "sarah", password: "1234" },
          { id: 3, username: "archie", password: "1234" },
          { id: 4, username: "fred", password: "1234" }
        ]);
    });
  });
  describe("delete user", () => {
    test("returns three users", () => {
      return request(server)
        .delete("/api/users/4")
        .expect(200)
        .expect([
          { id: 1, username: "sean", password: "4321" },
          { id: 2, username: "sarah", password: "1234" },
          { id: 3, username: "archie", password: "1234" }
        ]);
    });
  });
});
