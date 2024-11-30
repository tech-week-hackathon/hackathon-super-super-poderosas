use aiken/crypto.{ScriptHash, VerificationKeyHash}
use cardano/assets.{AssetName, PolicyId}
use cardano/governance.{GovernanceActionId, Voter}
use cardano/transaction.{OutputReference, Transaction, find_input}
use types.{
  AssetClass, Execute, MiniPropDatum, MiniPropRedeemer, MintingRedeemer,
  VoteFromLock, VoteFromWallet, VoteRedeemer,
}

validator ble(
  voting_token_asset_class: AssetClass,
  drep_id: Voter,
  lock_script_hash: ScriptHash,
) {
  spend(
    datum: Option<MiniPropDatum>,
    redeemer: MiniPropRedeemer,
    own_ref: OutputReference,
    tx: Transaction,
  ) {
    let Transaction { inputs, .. } = tx
    expect Some(own_input) = find_input(inputs, own_ref)
    when redeemer is {
      VoteFromWallet { voting_token_amount } -> True
      VoteFromLock -> True
      Execute -> True
    }
  }

  mint(redeemer: MintingRedeemer, policy_id: PolicyId, self: Transaction) {
    todo @"mint logic goes here"
  }

  vote(redeemer: VoteRedeemer, voter: Voter, self: Transaction) {
    todo @"vote logic goes here"
  }

  else(_) {
    fail
  }
}
