import { Address, Assets, Data, fromText, Lucid, SpendingValidator, toUnit } from "lucid-txpipe"
import { script } from "./constants"
import { GovernanceActionId, MinPropDatum } from "./types";


type ScriptDetails = {
    script: SpendingValidator,
    address: Address,
    policyId: string,
    assetName: string,
    controlToken: Assets,
}

export function getScriptDetails(lucid: Lucid): ScriptDetails {
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

export async function getScriptUtxo(lucid: Lucid, govActionId: GovernanceActionId, script: ScriptDetails) {
    const scriptUtxos = await lucid.utxosAt("addr_test1wpunlryvl7aqsxe22erzlsseej87v5kk5vutvtrmzdy8dect48z0w");
    for (const u of scriptUtxos) {
        if (u.datum) {
            console.log(u)
            const d = u.datum
            const datum: MinPropDatum = Data.from(d, MinPropDatum);
            if (datum.governanceActionId.txId.field === govActionId.txId &&
                datum.governanceActionId.index == BigInt(govActionId.index)
            ) {
                return u
            }
        }
    }
    
}