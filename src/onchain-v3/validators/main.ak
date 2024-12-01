use cardano/certificate.{Certificate}
use cardano/governance.{Voter}
use cardano/transaction.{OutputReference, Transaction, find_input}
use checks.{validate_mini_prop_spend, validate_vote}
use types.{MiniPropDatum}

validator my_script {
  spend(
    datum: Option<MiniPropDatum>,
    _redeemer: Data,
    own_ref: OutputReference,
    tx: Transaction,
  ) {
    let Transaction { inputs, .. } = tx

    expect Some(own_datum) = datum

    expect Some(own_input) = find_input(inputs, own_ref)

    validate_mini_prop_spend(own_input, own_datum, tx)
  }

  // TODO: THIS PURPOSE
  publish(_redeemer: Data, _certificate: Certificate, _tx: Transaction) {
    True
  }

  vote(_redeemer: Data, own_voter: Voter, tx: Transaction) {
    validate_vote(own_voter, tx)
  }

  else(_) {
    fail
  }
}
