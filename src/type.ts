export type Row = {
  qualtricsId: string;
  reference: string;
  willingness: boolean;
  email: string;
};

export type User = {
  surveysParticipated: {
    iteration: string;
    qualtricsId: string;
    willingness: boolean;
    email: string;
  }[];
};
