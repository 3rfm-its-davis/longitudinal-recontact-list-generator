import fs from "fs";
import { debuglog } from "util";
import { mergeUsers } from "./mergeUsers";
import { parser } from "./parser";
import { Row, User } from "./type";
const debugTSV = debuglog("app:readTSV");
const debugGenerateList = debuglog("app:generateList");

const readTSV = (filePath: string): Promise<Row[]> => {
  return new Promise((resolve, reject) => {
    const rows: Row[] = [];
    fs.createReadStream(filePath)
      .pipe(parser())
      .on("data", (row: Row) => {
        rows.push(row);
      })
      .on("end", () => {
        debugTSV("Rows length:", rows.length);
        resolve(rows);
      })
      .on("error", (err: unknown) => {
        debugTSV("Error reading file:", err);
        reject(err);
      });
  });
};

export const getUserEmails = (user: User) => {
  const emails = user.surveysParticipated.map((survey) => survey.email);
  return emails;
};

const generateList = async () => {
  const fileList = fs
    .readdirSync("./src/data")
    .filter((file) => file.includes("output"))
    .filter((file) => file.endsWith("dat"));

  const users: User[] = [];

  for (const file of fileList) {
    debugGenerateList("Processing file:", file);
    const rows: Row[] = (await readTSV(`./src/data/${file}`)).filter(
      (row: Row) => row.email.trim() !== "" || row.reference.trim() !== ""
    );

    for (const row of rows) {
      const currentUser =
        users.find((user) => getUserEmails(user).includes(row.reference)) ||
        users.find((user) => getUserEmails(user).includes(row.email));
      const iteration = file.replace("_output.dat", "");
      const email =
        row.email !== ""
          ? row.email
          : row.reference !== ""
          ? row.reference
          : undefined;

      if (!email) {
        continue;
      }

      const newSurveyParticipated = {
        iteration: iteration,
        qualtricsId: row.qualtricsId,
        willingness: row.willingness,
        email: email,
      };

      if (currentUser) {
        currentUser.surveysParticipated.push(newSurveyParticipated);
      } else {
        users.push({
          surveysParticipated: [newSurveyParticipated],
        });
      }
    }

    const length = users.length;
    const mergedUsers = mergeUsers(users);
    debugGenerateList("Merged ", length - mergedUsers.length, " users");

    users.length = 0;
    users.push(...mergedUsers);

    debugGenerateList(users.length.toString(), " users");
  }

  const outputFilePath = `./src/data/output_list.tsv`;
  fs.writeFileSync(
    outputFilePath.replace(".tsv", ".json"),
    JSON.stringify(users, null, 2)
  );
  debugGenerateList("Output written to", outputFilePath);
};

generateList();
