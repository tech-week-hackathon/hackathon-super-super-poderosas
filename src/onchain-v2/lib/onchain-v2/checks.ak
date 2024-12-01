use aiken/dict.{to_pairs}
use aiken/interval.{is_entirely_after, is_entirely_before}
use aiken/list
use aiken/transaction.{
  InlineDatum, Input, Output, Transaction, find_script_outputs,
}
use aiken/transaction/credential.{Address, ScriptCredential}
use aiken/transaction/value.{
  PolicyId, flatten, from_minted_value, tokens, without_lovelace,
}
use onchain_v2/constants.{control_token_name, one_week}
use onchain_v2/types.{
  AssetClass, GovernanceActionId, MiniPropDatum, ScriptHash, VotingOption,
  VotingState,
}
use onchain_v2/utils.{calculate_new_vote_state, get_upper}

pub fn validate_vote(
  voting_token_asset_class: AssetClass,
  voting_token_amount: Int,
  vote: VotingOption,
  own_input: Input,
  datum: MiniPropDatum,
  tx: Transaction,
) {
  let Transaction { validity_range, inputs, outputs, .. } = tx

  let Input { output: Output { address: i_addr, value: i_value, .. }, .. } =
    own_input

  expect Address { payment_credential: ScriptCredential(own_hash), .. } = i_addr

  expect [own_output] = find_script_outputs(outputs, own_hash)

  let Output {
    // TODO: Maybe validate staking? Payment already validated
    // address: o_addr,
    value: o_value,
    datum: o_datum,
    reference_script: o_ref_script,
    ..
  } = own_output

  let MiniPropDatum {
    voting_state: dat_vote_state,
    voting_deadline: dat_vote_deadline,
    governance_action: dat_gov_action,
  } = datum

  let expected_vote_state =
    calculate_new_vote_state(dat_vote_state, vote, voting_token_amount)

  let expected_datum: MiniPropDatum =
    MiniPropDatum {
      voting_state: expected_vote_state,
      voting_deadline: dat_vote_deadline,
      governance_action: dat_gov_action,
    }

  let AssetClass { policy: voting_token_policy, name: voting_token_name } =
    voting_token_asset_class

  let voting_tokens_in_inputs =
    list.foldl(
      inputs,
      0,
      fn(i: Input, acc) {
        let token_amount =
          value.quantity_of(
            i.output.value,
            voting_token_policy,
            voting_token_name,
          )
        acc + token_amount
      },
    )

  and {
    // No ref script to avoid paying increased fees
    (o_ref_script == None)?,
    // Value doesn't change
    (i_value == o_value)?,
    // Datum matches expected datum
    (o_datum == InlineDatum(expected_datum))?,
    // Must have enough tokens in the inputs
    (voting_tokens_in_inputs >= voting_token_amount)?,
    // Voting amount must be positive
    (voting_token_amount > 0)?,
    // Deadline must be in the future
    is_entirely_after(validity_range, dat_vote_deadline)?,
  }
}

pub fn validate_upgrade(
  datum: MiniPropDatum,
  own_input: Input,
  upgrade_script_hash: ScriptHash,
  tx: Transaction,
) {
  let Transaction { validity_range, outputs, .. } = tx

  let Input { output: Output { value: i_value, datum: i_datum, .. }, .. } =
    own_input

  expect [upgraded_output] = find_script_outputs(outputs, upgrade_script_hash)

  let Output {
    // TODO: Maybe validate staking? Payment already validated
    // address: o_addr,
    value: o_value,
    datum: o_datum,
    reference_script: o_ref_script,
    ..
  } = upgraded_output

  let MiniPropDatum { voting_deadline: dat_deadline, .. } = datum

  and {
    // No ref script to avoid paying increased fees
    (o_ref_script == None)?,
    // Lock token must remain
    (o_value == i_value)?,
    // Datum must remain the same
    (o_datum == InlineDatum(i_datum))?,
    // Deadline must be in the past
    is_entirely_before(validity_range, dat_deadline)?,
  }
}

pub fn validate_mint(
  red_gov_action: GovernanceActionId,
  own_policy: PolicyId,
  tx: Transaction,
) {
  let Transaction { outputs, validity_range, mint, .. } = tx

  let expected_name = control_token_name

  let mint_value = from_minted_value(mint)

  expect [Pair(name, 1)] = mint_value |> tokens(own_policy) |> to_pairs()

  expect [own_output] = find_script_outputs(outputs, own_policy)

  let Output {
    // TODO: Maybe check staking? Payment already validated
    // address: o_addr,
    value: o_value,
    datum: o_datum,
    reference_script: o_ref_script,
    ..
  } = own_output

  let expected_voting_state: VotingState =
    VotingState { yes: 0, no: 0, abstain: 0 }

  let expected_deadline = get_upper(validity_range) + one_week

  let expected_datum: MiniPropDatum =
    MiniPropDatum {
      voting_state: expected_voting_state,
      voting_deadline: expected_deadline,
      governance_action: red_gov_action,
    }
  let expected_datum_data: Data = expected_datum

  expect [(pol, tn, 1)] = without_lovelace(o_value) |> flatten()

  and {
    // Minted token has expected name
    (name == expected_name)?,
    // No ref script to avoid paying increased fees
    (o_ref_script == None)?,
    // Datum is correct
    (o_datum == InlineDatum(expected_datum_data))?,
    // Only token paid to the script has the correct policy and token name
    (pol == own_policy)?,
    (tn == expected_name)?,
  }
}

pub fn validate_burn(own_policy: PolicyId, tx: Transaction) {
  tx.mint
    |> from_minted_value()
    |> tokens(own_policy)
    |> dict.values()
    |> list.all(fn(qty) { (qty < 0)? })
}
