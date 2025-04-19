import { randomUUID } from "crypto";
import { mergeUsers } from "../mergeUsers";
import { User } from "../type";

const createUser = (emails: string[]): User => ({
  surveysParticipated: emails.map((email) => ({
    iteration: "HOGE",
    qualtricsId: randomUUID(),
    willingness: true,
    email: `${email}@gmail.com`,
  })),
});

describe("mergeUsers", () => {
  it("should leave distinct users unchanged", () => {
    const users = [createUser(["alice"]), createUser(["bob"])];
    expect(users.length).toBe(2);
  });

  it("should merge two users sharing an email", () => {
    const user1 = createUser(["alice", "bob"]);
    const user2 = createUser(["alice", "charlie"]);

    const mergedUsers = mergeUsers([user1, user2]);
    expect(mergedUsers.length).toBe(1);
    expect(mergedUsers[0].surveysParticipated.length).toBe(4);
    expect(
      Array.from(
        new Set(
          mergedUsers.flatMap((u) => u.surveysParticipated.map((s) => s.email))
        )
      ).length
    ).toEqual(3);
  });

  it("should handle transitive merges", () => {
    const user1 = createUser(["alice", "bob"]);
    const user2 = createUser(["bob", "charlie"]);
    const user3 = createUser(["charlie", "dave"]);

    const mergedUsers = mergeUsers([user1, user2, user3]);
    expect(mergedUsers.length).toBe(1);
    expect(mergedUsers[0].surveysParticipated.length).toBe(6);
    expect(
      Array.from(
        new Set(
          mergedUsers.flatMap((u) => u.surveysParticipated.map((s) => s.email))
        )
      ).length
    ).toEqual(4);
  });
});
