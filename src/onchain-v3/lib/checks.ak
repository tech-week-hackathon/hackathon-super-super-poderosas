use aiken/collection/list.{filter}
use aiken/collection/pairs.{has_key}
use aiken/interval.{is_entirely_after}
use cardano/address.{Address, Script}
use cardano/assets.{flatten, from_asset, without_lovelace}
use cardano/governance.{DelegateRepresentative, Voter}
use cardano/transaction.{
  InlineDatum, Input, Output, Transaction, Vote, find_script_outputs,
}
use types.{MiniPropDatum}
use utils.{get_voting_winner}

// TODO: FIX CIRCULARITY AND/OR VOTING UTXO FORGING
// IDEA: USE GLOBAL UTXO WITH THE HASHED IN THE DATUM

pub fn validate_mini_prop_spend(
  own_input: Input,
  datum: MiniPropDatum,
  tx: Transaction,
) {
  let Transaction { validity_range, outputs, mint, redeemers, .. } = tx

  let Input { output: Output { address: i_addr, value: i_value, .. }, .. } =
    own_input

  expect Address { payment_credential: Script(own_hash), .. } = i_addr

  expect [] = find_script_outputs(outputs, own_hash)

  let MiniPropDatum { voting_deadline: dat_vote_deadline, .. } = datum

  expect [(control_policy, control_name, 1)] =
    i_value |> without_lovelace() |> flatten()

  let expected_mint = from_asset(control_policy, control_name, -1)

  // let winning_option: VotingOption = get_voting_winner(dat_vote_state)
  let expected_purpose = Vote(DelegateRepresentative(Script(own_hash)))

  // Vote prupose?
  and {
    // Deadline has passed
    is_entirely_after(validity_range, dat_vote_deadline)?,
    // Control token is burnt and nothing else is minted/burned
    (mint == expected_mint)?,
    // Check that the voting validator is actually being called
    has_key(redeemers, expected_purpose)?,
  }
}

pub fn validate_vote(own_voter: Voter, tx: Transaction) {
  let Transaction { inputs, votes, .. } = tx

  expect DelegateRepresentative(Script(own_hash)) = own_voter

  expect [own_input] =
    filter(
      inputs,
      fn(i) { i.output.address.payment_credential == Script(own_hash) },
    )

  expect Input { output: Output { datum: InlineDatum(i_datum_data), .. }, .. } =
    own_input

  expect MiniPropDatum {
    voting_state: dat_voting_state,
    governance_action: dat_gov_action_id,
    ..
  } = i_datum_data

  expect [own_votes] = pairs.get_all(votes, own_voter)

  expect [Pair(own_vote_gov_action_id, own_vote_option)] = own_votes

  let winning_option = get_voting_winner(dat_voting_state)

  and {
    // The only vote is voting for the correct governance action
    (own_vote_gov_action_id == dat_gov_action_id)?,
    // The actual vote option is used
    (own_vote_option == winning_option)?,
  }
}
