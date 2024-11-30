use cardano/governance.{GovernanceActionId}
use cardano/transaction.{Input, OutputReference, Transaction}

pub fn validate_vote_from_wallet(
  vote_token_amount: Int,
  own_input: Input,
  tx: Transaction,
) {
  True
}

pub fn validate_vote_from_lock(
  lock_utxo_ref: OutputReference,
  own_input: Input,
  tx: Transaction,
) {
  True
}

pub fn validate_execute(own_input: Input, tx: Transaction) {
  True
}

pub fn validate_mint(proposal_id: GovernanceActionId, tx: Transaction) {
  True
}

pub fn validate_burn(tx: Transaction) {
  True
}
