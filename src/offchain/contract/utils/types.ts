import { Data } from "lucid-txpipe";

const MinPropDatumSchema = Data.Object({
  votingState: Data.Object({
      no: Data.Integer(),
      yes: Data.Integer(),
      abstain: Data.Integer(),
  }),
  deadline: Data.Integer(),
  GovernanceActionId: Data.Object({
      txId: Data.Bytes(),
      index: Data.Integer(),
  })
});
type MinPropDatum = Data.Static<typeof MinPropDatumSchema>;
const MinPropDatum = MinPropDatumSchema as unknown as MinPropDatum;

type GovernanceActionId = {
  txId: string,
  index: number
}


export { MinPropDatum };
export type { GovernanceActionId };
