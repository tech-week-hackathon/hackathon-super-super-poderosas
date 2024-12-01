import { Assets, Data, fromText, Lucid, SpendingValidator, toUnit } from "lucid-txpipe"
import { script } from "./constants"
import { GovernanceActionId, MinPropDatum } from "./types";


export function getScriptDetails(lucid: Lucid) {
    const scriptAddress = lucid.utils.validatorToAddress(script);
    const policyId = lucid.utils.validatorToScriptHash(script);
    const assetNameHex = fromText("ControlToken");
    const mintAsset:Assets = {
        [toUnit(policyId, assetNameHex)] : BigInt(1)
    }

    return {
        script: script,
        address: scriptAddress,
        policyId: policyId,
        assetName: assetNameHex,
        controlToken: mintAsset,
    }
}

export async function getScriptUtxo(lucid: Lucid, govActionId: GovernanceActionId, script:any,) {
    const scriptUtxos = await lucid.utxosAt(script.address);
    for (const u of scriptUtxos) {
        if (u.datum) {
            const d = u.datum
            const datum: MinPropDatum = Data.from(d, MinPropDatum);
            if (datum.GovernanceActionId.txId === govActionId.txId &&
                datum.GovernanceActionId.index == BigInt(govActionId.index)
            ) return u
        }
    }
    console.log("script utxo not found");
}