use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction.{TransactionId}
use aiken/transaction/credential.{Script, VerificationKey}
use aiken/transaction/value.{AssetName, PolicyId}

pub type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

pub type ScriptHash =
  Hash<Blake2b_224, Script>

pub type AssetClass {
  policy: PolicyId,
  name: AssetName,
}

pub type GovernanceActionId {
  transaction: TransactionId,
  index: Int,
}

pub type PosixTime =
  Int

pub type MiniPropDatum {
  voting_state: VotingState,
  voting_deadline: PosixTime,
  governance_action: GovernanceActionId,
}

pub type VotingState {
  no: Int,
  yes: Int,
  abstain: Int,
}

pub type MiniPropRedeemer {
  Vote { voting_token_amount: Int, vote: VotingOption }
  Upgrade
}

pub type VotingOption {
  No
  Yes
  Abstain
}

pub type MintingRedeemer {
  MintControlToken { governance_action: GovernanceActionId }
  BurnControlToken
}
