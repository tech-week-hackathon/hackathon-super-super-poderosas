import { Constr, Data } from "lucid-txpipe";

const MinPropDatumSchema = Data.Object({
  votingState: Data.Object({
      no: Data.Integer(),
      yes: Data.Integer(),
      abstain: Data.Integer(),
  }),
  deadline: Data.Integer(),
  governanceActionId: Data.Object({
      txId: Data.Object({field: Data.Bytes()}),
      index: Data.Integer(),
  })
});
type MinPropDatum = Data.Static<typeof MinPropDatumSchema>;
const MinPropDatum = MinPropDatumSchema as unknown as MinPropDatum;

type GovernanceActionId = {
  txId: string,
  index: number
}

const VoteSchema = Data.Enum([
  Data.Literal("No"),
  Data.Literal("Yes"),
  Data.Literal("Abstain")
]);
type Vote = Data.Static<typeof VoteSchema>;
const Vote = VoteSchema as unknown as Vote;

const VoteRedeemerSchema = Data.Object({
  voting_token_amount: Data.Integer(),
  vote: VoteSchema
});
type VoteRedeemer = Data.Static<typeof VoteRedeemerSchema>;
const VoteRedeemer = VoteRedeemerSchema as unknown as VoteRedeemer;

const WrapRedeemerSchema = Data.Enum([
  Data.Literal("Wrap"),
  Data.Object({
    Enum: Data.Enum([
      Data.Object({
        Vote: VoteRedeemerSchema
      }), Data.Literal("Upgrade")]

    )
  })
]);
type WrapRedeemer = Data.Static<typeof WrapRedeemerSchema>;
const WrapRedeemer = WrapRedeemerSchema as unknown as WrapRedeemer;

function MakeRedeemerVote(choice: string, votes: bigint): WrapRedeemer {
  let rdm:Vote;
  if (choice === "no") rdm = "No"
  else if (choice === "yes") rdm = "Yes"
  else rdm = "Abstain"

  const vote = {
    voting_token_amount: votes,
    vote: rdm
  }
  const redeemer = {
    Vote: vote
  }
  return {
    Enum: redeemer
  }
}

export { MinPropDatum, MakeRedeemerVote, WrapRedeemer };
export type { GovernanceActionId };
