use cardano/assets.{AssetName, PolicyId}
use cardano/governance.{GovernanceActionId}

pub type AssetClass {
  policy: PolicyId,
  name: AssetName,
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
  Execute
}

pub type MintingRedeemer {
  MintControlToken { governance_action: GovernanceActionId }
  BurnControlToken
}
