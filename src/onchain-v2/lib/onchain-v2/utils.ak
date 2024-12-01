use aiken/interval.{Finite, Interval, IntervalBound}
use aiken/transaction.{ValidityRange}
use onchain_v2/constants.{one_day}
use onchain_v2/types.{Abstain, No, VotingOption, VotingState, Yes}

// // Converts an OutputReference to a plain bytestring using `cbor.serialize` for
// // the output_index and blake2b_256 to hash.
// pub fn output_reference_to_bytestring(ref: OutputReference) {
//   let OutputReference { transaction_id, output_index } = ref
//   let TransactionId { hash: tx_hash } = transaction_id

//   let serialized_index = serialise(output_index)

//   let concated = bytearray.concat(tx_hash, serialized_index)

//   blake2b_256(concated)
// }

pub fn get_lower(range: ValidityRange) {
  let Interval { lower_bound, .. } = range
  expect IntervalBound { bound_type: Finite(lwb), is_inclusive: True } =
    lower_bound

  lwb
}

pub fn get_upper(range: ValidityRange) {
  let Interval { upper_bound, .. } = range
  expect IntervalBound { bound_type: Finite(upb), is_inclusive: True } =
    upper_bound

  upb
}

pub fn check_validity_range(range: ValidityRange) {
  let upb = get_upper(range)
  let lwb = get_lower(range)

  lwb - upb <= one_day
}

pub fn calculate_new_vote_state(
  state: VotingState,
  vote: VotingOption,
  amount: Int,
) {
  let VotingState { yes: old_yes, no: old_no, abstain: old_abstain } = state

  when vote is {
    Yes -> VotingState { ..state, yes: old_yes + amount }
    No -> VotingState { ..state, no: old_no + amount }
    Abstain -> VotingState { ..state, abstain: old_abstain + amount }
  }
}
