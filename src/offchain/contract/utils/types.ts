import { Data } from "lucid-txpipe";

const MinGobDatumSchema = Data.Object({
  votingState: Data.Object({
      yes: Data.Integer(),
      no: Data.Integer(),
      abstain: Data.Integer(),
  }),
  deadline: Data.Integer(),
  GobernanceActionId: Data.Object({
      txId: Data.Bytes(),
      index: Data.Integer(),
  })
});
type MinGobDatum = Data.Static<typeof MinGobDatumSchema>;
const MinGobDatum = MinGobDatumSchema as unknown as MinGobDatum;


export { MinGobDatum }