import { parse } from "csv-parse";

export const parser = () =>
  parse({
    delimiter: "\t",
    columns: true,
    bom: true,
  });
