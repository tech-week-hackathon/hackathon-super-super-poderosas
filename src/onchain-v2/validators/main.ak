use aiken/transaction.{Mint, ScriptContext, Spend, Transaction, find_input}
use onchain_v2/checks.{
  validate_burn, validate_mint, validate_upgrade, validate_vote,
}
use onchain_v2/types.{
  AssetClass, BurnControlToken, MiniPropDatum, MiniPropRedeemer,
  MintControlToken, MintingRedeemer, ScriptHash, Upgrade, Vote,
}

validator(
  voting_token_asset_class: AssetClass,
  upgrade_script_hash: ScriptHash,
) {
  fn spend(datum: MiniPropDatum, redeemer: MiniPropRedeemer, ctx: ScriptContext) {
    let ScriptContext { transaction, purpose } = ctx

    expect Spend(own_ref) = purpose

    let Transaction { inputs, .. } = transaction

    expect Some(own_input) = find_input(inputs, own_ref)

    when redeemer is {
      Vote { voting_token_amount, vote } ->
        validate_vote(
          voting_token_asset_class,
          voting_token_amount,
          vote,
          own_input,
          datum,
          transaction,
        )
      Upgrade ->
        validate_upgrade(datum, own_input, upgrade_script_hash, transaction)
    }
  }

  fn mint(redeemer: MintingRedeemer, ctx: ScriptContext) {
    let ScriptContext { transaction, purpose } = ctx

    expect Mint(own_policy) = purpose

    when redeemer is {
      MintControlToken { governance_action } ->
        validate_mint(governance_action, own_policy, transaction)
      BurnControlToken -> validate_burn(own_policy, transaction)
    }
  }
}
