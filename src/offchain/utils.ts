// import blueprintV1 from "./onchain/plutus.json";

import { SpendingValidator } from "lucid-txpipe";

const MIN_ADA = BigInt(3000000);

const script: SpendingValidator = {
  type: "PlutusV2",
  script: "4e4d01000033222220051200120011",
};

export { MIN_ADA, script };

import { Assets, Data, fromText, Lucid, toUnit } from "lucid-txpipe";

export function getScriptDetails(lucid: Lucid) {
  const scriptAddress = lucid.utils.validatorToAddress(script);
  const policyId = lucid.utils.validatorToScriptHash(script);
  const assetNameHex = fromText("ControlToken");
  const mintAsset: Assets = {
    [toUnit(policyId, assetNameHex)]: BigInt(1),
  };

  return {
    script: script,
    address: scriptAddress,
    policyId: policyId,
    assetName: assetNameHex,
    controlToken: mintAsset,
  };
}

export async function getScriptUtxo(
  lucid: Lucid,
  govActionId: GovernanceActionId,
  script: any
) {
  const scriptUtxos = await lucid.utxosAt(script.address);
  for (const u of scriptUtxos) {
    if (u.datum) {
      const d = u.datum;
      const datum: MinPropDatum = Data.from(d, MinPropDatum);
      if (
        datum.GovernanceActionId.txId.hash === govActionId.txId &&
        datum.GovernanceActionId.index == BigInt(govActionId.index)
      )
        return u;
    }
  }
  console.log("script utxo not found");
}

const MinPropDatumSchema = Data.Object({
  votingState: Data.Object({
    no: Data.Integer(),
    yes: Data.Integer(),
    abstain: Data.Integer(),
  }),
  deadline: Data.Integer(),
  GovernanceActionId: Data.Object({
    txId: Data.Object({ hash: Data.Bytes() }),
    index: Data.Integer(),
  }),
});
type MinPropDatum = Data.Static<typeof MinPropDatumSchema>;
const MinPropDatum = MinPropDatumSchema as unknown as MinPropDatum;

type GovernanceActionId = {
  txId: string;
  index: number;
};

export { MinPropDatum };
export type { GovernanceActionId };
