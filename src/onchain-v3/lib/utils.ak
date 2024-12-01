use aiken/math.{max}
use cardano/governance.{Abstain, No, Yes}
use types.{VotingState}

pub fn get_voting_winner(vote_state: VotingState) {
  let VotingState { no, yes, abstain } = vote_state

  let winning_votes_amount = max(no, max(yes, abstain))

  if winning_votes_amount == no {
    No
  } else if winning_votes_amount == yes {
    Yes
  } else {
    Abstain
  }
}
