import fs from "fs";
import { columns, DataKey } from "./columns";
import { parser } from "./parser";
import { Row } from "./type";
import { validateEmail } from "./validateEmail";

const rowKeys: (keyof Row)[] = [
  "qualtricsId",
  "reference",
  "willingness",
  "email",
];

const formatResponse = (args: [DataKey, string]) => {
  const filePath = args[1];

  const output: {
    qualtricsId: string;
    reference: string;
    willingness: boolean;
    email: string;
  }[] = [];

  fs.createReadStream(filePath)
    .pipe(parser())
    .on("data", (row: { [key: string]: string | number }) => {
      const newRow = rowKeys.reduce((acc: Row, key: keyof Row) => {
        const prop = columns[args[0]][key];
        if (key === "willingness") {
          acc[key] =
            row[prop.tags[0]].toString().trim() === ""
              ? false
              : prop.optIn
              ? row[prop.tags[0]] === prop.value
              : row[prop.tags[0]].toString() !== prop.value;
        } else if (key === "email" || key === "reference") {
          acc[key] = validateEmail(
            prop.tags.map((tag) => row[tag]) as string[]
          );
        } else {
          acc[key] = row[prop.tags[0]] as string;
        }
        return acc;
      }, {} as Row);

      output.push(newRow);
    })
    .on("end", () => {
      console.log("Output length:", output.length);
      const outputFilePath = filePath.replace(/\.dat$/, "_output.dat");
      const outputStream = fs.createWriteStream(outputFilePath);
      outputStream.write("qualtricsId\treference\twillingness\temail\n");
      output.forEach((row) => {
        outputStream.write(
          `${row.qualtricsId}\t${row.reference}\t${row.willingness}\t${row.email}\n`
        );
      });
      outputStream.end();
      console.log("Output written to", outputFilePath);
    })
    .on("error", (err: unknown) => {
      console.error("Error reading file:", err);
    });
};

formatResponse([process.argv[2] as DataKey, process.argv[3]]);
