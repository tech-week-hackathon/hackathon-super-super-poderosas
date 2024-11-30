use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{AssetName, PolicyId}
use cardano/governance.{GovernanceActionId}
use cardano/transaction.{OutputReference}

pub type AssetClass {
  policy: PolicyId,
  name: AssetName,
}

pub type PosixTime =
  Int

pub type MiniPropDatum {
  voting_state: VotingState,
  voting_deadline: PosixTime,
  proposal_id: GovernanceActionId,
}

pub type VotingState {
  yes: Int,
  no: Int,
  abstain: Int,
}

pub type MiniPropRedeemer {
  VoteFromWallet { voting_token_amount: Int }
  VoteFromLock
  Execute
}

pub type MintingRedeemer {
  Mint { utxo_ref: OutputReference }
  Burn
}

pub type VoteRedeemer {
  VoteRedeemer
}

pub type LockDatum {
  user_vkey: VerificationKeyHash,
  unlock_deadline: PosixTime,
  previous_proposals: List<GovernanceActionId>,
}

pub type LockRedeemer {
  Unlock
  Vote
}
