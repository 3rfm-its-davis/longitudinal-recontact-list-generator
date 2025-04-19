import { getUserEmails } from "./generateList";
import { User } from "./type";

export const mergeUsers = (users: User[]): User[] => {
  const emailMap: Record<string, User[]> = {};

  users.forEach((user) => {
    user.surveysParticipated.forEach(({ email }) => {
      if (!emailMap[email]) {
        emailMap[email] = [];
      }
      emailMap[email].push(user);
    });
  });

  const visited = new Set<User>();
  const mergedUsers: User[] = [];

  const dfs = (user: User, component: User[]) => {
    if (visited.has(user)) return;

    visited.add(user);
    component.push(user);
    getUserEmails(user).forEach((email) => {
      emailMap[email].forEach((connectedUser) => {
        dfs(connectedUser, component);
      });
    });
  };

  users.forEach((user) => {
    if (!visited.has(user)) {
      const component: User[] = [];
      dfs(user, component);

      const allSurveysParticipated = component.flatMap(
        (u) => u.surveysParticipated
      );

      mergedUsers.push({
        surveysParticipated: allSurveysParticipated,
      });
    }
  });

  return mergedUsers;
};
