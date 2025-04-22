# UC Davis Mobility Study Longitudinal Recontact List Genearator

This repository contains the code to generate a longitudinal recontact list for the UC Davis Mobility Study. The recontact list is used to identify participants who are eligible for follow-up surveys and other study-related activities.

## Prerequisites

- Node.js (>= 22.8.0)

## Usage

### Installation

Run `npm i` in the command line at the project root directory to install the required dependencies.

### Prepare the cross-sectional dataset

1. Download the raw dataset of your interest from the Qualtrics survey data page, in a SPSS .sav format.
2. Open it in the SPSS Statistics and find the columns that represents the following information.
   - `qualtricsId`: The Qualtrics ID for the response. Usually it is in the "ResponseId" column.
   - `reference`: The email address of each participant.
   - `willingness`: The date when the participant started the survey.
   - `email`: The date when the participant completed the survey.
3. Export the dataset as TSV file, selecting the columns mentioned above.
4. Save the TSV file in the `src/data` folder of this repository, and rename it to `{iteration}.dat`. The `iteration` is the iteration name of the dataset, e.g. `2023-o150` is the opinion panel n=150 dataset in 2023. Do not use "output" in the name of the file as it is used later.

### Define the dataset specifications

1. Navigate to the `src/columns.ts` file.
2. Update the `columns` object by adding new entry for the new dataset. The entry will have the following format:

```ts
type ColumnDefinition = {
  [key: string]: {
    tags: string[];
    optIn?: boolean;
    value?: string;
  };
};

/*
 * Example
 */
const columns: ColumnDefinition = {
  Y21MM: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientFirstName"],
    },
    willingness: {
      tags: ["EN02_1"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN01_MO_CV_1_2"] },
  },
};
```

- The `tags` column points to the column that contains the relevant information about what the property shows. e.g., `ResponseId` column in SPSS is connected to the `qualtricsId` property in this program.
- For `willingness` property, please indicate that if it is an "opt-in" question or "opy-out" question. For instance, if the question is "Please check this box if you do NOT want to be contacted again", then it is an opt-out question, and the `optIn` property should be set to `false`.
- Then set the `value` property to the value of when the selection is made. e.g., if the column `EN1` is 1 when the participant checks the box in the example above = they _refused_ to be contacted again, then the `value` property should be set to `1`. This program, then, considers any non-blank value of the column `EN1` as a consent to be contacted again.

### Run the program to format the Responses

1. Open command line at the project root directory.
2. Run the following command to generate the longitudinal recontact list:

```bash
npm run formatResponse {definition} {path}
```

- `{definition}`: The name of the dataset definition you just added in the `src/columns.ts` file. e.g., "Y21MM".
- `{path}`: The path to the TSV file you saved in the `src/data` folder. It should be in the format of `src/data/{iteration}.dat`. e.g., `src/data/2021-mm.dat`.

3. The node program will read the TSV file, format the data, and save it in the `src/data` folder as `{iteration}-output.dat`. The `iteration` is the same as the one you used in the previous step. e.g., `2021-mm-output.dat`.
4. The output file will contain the following columns:
   - `qualtricsId`: The Qualtrics ID for the response.
   - `reference`: The email address of each participant when they are recontacted in the longitudinal panel (if exists).
   - `willingness`: Boolean value that indicates participant's willingness to be contacted again.
   - `email`: The email address of each participant that they typed in during the survey to be contacted again. This might be different from the `reference` column.
5. Note that the email strings in the `refernce` and `email` properties are normalized by the [`validator`](https://github.com/validatorjs/validator.js) package. All letters are lowered and dots before the @ sign are removed for gmail.com addresses.

### Run the program to generate the longitudinal recontact list

1. Open command line at the project root directory.
2. Run the following command to generate the longitudinal recontact list:

```bash
npm run generateList
```

3. The node program will read the `src/data/.*_output.dat` TSV files and combine them into a single JSON file. the output will be in the following format.

```jsonc
[
  {
    "surveysParticipated": [
      {
        /*
         * One of the survey iteration names defined in the src/columns.ts file
         */
        "iteration": "string",
        "qualtricsId": "string",
        "willingness": "boolean",
        /*
         * Normalized email address
         * Email address that the participant input during the survey takes the precedence over the reference.
         * If both types of email do not exist, then the entry will not be included in the output (because we have no information to recontact them again).
         */
        "email": "string"
      }
    ]
  }
]
```

4. The output file will be saved as `src/data/output_list.json`. The file will contain a list of all past participants. They are unique by the email address. i.e., no duplicate email appears in different participants. This file can be used in the next step to export the invitation list.

## (Optional) Create the invitation list for the next survey wave

The directory [`./src/R`](src/R) contains the R script to create the invitation list for the next survey wave. Please refer to the readme file in the directory for more information.
