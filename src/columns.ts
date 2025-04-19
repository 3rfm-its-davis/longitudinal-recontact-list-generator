export const columns: {
  [key: string]: ColumnDefinition;
} = {
  Y18L: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["S0A"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["S0A_1_TEXT"] },
  },
  Y18MM: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientFirstName"],
    },
    willingness: {
      tags: ["H9_3"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["H10_3"] },
  },
  Y18MO: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientFirstName"],
    },
    willingness: {
      tags: ["H9_3"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["H10_3"] },
  },
  Y19: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["Q93_2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["Q108_3"] },
  },
  S20L: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN02_1"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN01_2"] },
  },
  S20O: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN02_B_2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN01_2"] },
  },
  S20C: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN02_1"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN01_2"] },
  },
  F20L: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN03_1"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN01_2"] },
  },
  F20O: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN01_2"],
      optIn: false,
      value: "-99999",
    },
    email: { tags: ["EN01_2"] },
  },
  F20C: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN03_1"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN01_2"] },
  },
  Y21L: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN02_1"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN01_MO_CV_1_L_2"] },
  },
  Y21O: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN01_OP_1"],
      optIn: false,
      value: "",
    },
    email: { tags: ["EN01_OP_1"] },
  },
  Y21C: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN01_MO_CV_1_2"],
      optIn: false,
      value: "1",
    },
    email: { tags: ["EN02_1"] },
  },
  Y21MO: {
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
  Y23L: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23LI: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23LS: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN3"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23O: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN1"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_1_TEXT"] },
  },
  Y23C: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN3"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23CI: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN3"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23MO: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23MOI: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23MM: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
  Y23CB: {
    qualtricsId: {
      tags: ["ResponseId"],
    },
    reference: {
      tags: ["RecipientEmail"],
    },
    willingness: {
      tags: ["EN2"],
      optIn: true,
      value: "1",
    },
    email: { tags: ["EN1_4"] },
  },
};

type ColumnDefinition = {
  [key: string]: {
    tags: string[];
    optIn?: boolean;
    value?: string;
  };
};

export type DataKey = keyof typeof columns;
