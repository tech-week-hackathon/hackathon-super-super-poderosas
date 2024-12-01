import { Assets, Constr, Data, fromText, Lucid, SpendingValidator, toUnit } from "lucid-txpipe";
import { MIN_ADA, script } from "./utils/constants";
import { GovernanceActionId, MinPropDatum } from "./utils/types";
import { getScriptDetails, getScriptUtxo } from "./utils/helpers";

async function createMiniProp(lucid: Lucid, govAction: GovernanceActionId) {
    const script = getScriptDetails(lucid);
    const pkh = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential!.hash;

    const date =  (new Date()).getTime();
    const deadline = date + 604800000 //  7 days in milliseconds

    const datumData: MinPropDatum = {
        votingState: {
            yes: BigInt(0),
            no: BigInt(0),
            abstain: BigInt(0)
        },
        deadline: BigInt(deadline),
        GovernanceActionId: {
            txId: govAction.txId,
            index: BigInt(govAction.index)
        }
    };

    const datum = Data.to<MinPropDatum>(datumData, MinPropDatum);

    const tx = lucid.newTx();
    tx.mintAssets(script.controlToken, Data.to(new Constr(0, [])))
    tx.payToContract(script.address, datum, {...script.controlToken, "lovelace": MIN_ADA})
    tx.attachMintingPolicy(script.script)
    tx.addSignerKey(pkh)
    const txComplete = await tx.complete()
    return txComplete
}

// async function VoteMiniProp(choice: string, govActionId: GovernanceActionId, lucid: Lucid) {
//     const script = getScriptDetails(lucid);
//     const scriptUtxo = getScriptUtxo(lucid, govActionId, script);

// }

export { createMiniProp }