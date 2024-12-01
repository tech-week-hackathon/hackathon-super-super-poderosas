import { Assets, Constr, Data, fromText, Lucid, SpendingValidator, toUnit, TxComplete } from "lucid-txpipe";
import { MIN_ADA, script, VotingTokenUnit } from "./utils/constants";
import { GovernanceActionId, MakeRedeemerVote, MinPropDatum, WrapRedeemer } from "./utils/types";
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
        governanceActionId: {
            txId: { field: govAction.txId},
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

async function voteMiniProp(choice: string, govActionId: GovernanceActionId, lucid: Lucid): Promise<TxComplete> {
    const script = getScriptDetails(lucid);
    // const scriptUtxo = await getScriptUtxo(lucid, govActionId, script);

    const utxo = await lucid.utxosByOutRef([{
        txHash: "045528f627afe6fb3644bca0a06a669dd7bb782b649306e69a2bfd481396073c",
        outputIndex: 0
    }])
    console.log("daledale", utxo[0].datum)
    const parsedDatum = Data.from<MinPropDatum>(utxo[0].datum!, MinPropDatum);
    const ownAddr = await lucid.wallet.address()
    const pkh = lucid.utils.getAddressDetails(ownAddr).paymentCredential!.hash;

    const ownUtxos = await lucid.wallet.getUtxos();

    let votes = BigInt(0);

    const utxosWithAsset = ownUtxos.filter((u) => {
        let vt = u.assets[VotingTokenUnit]
        if (vt > 0) {
            votes += vt;
            return true
        }
    })

    if (votes !== BigInt(0)) {
            const voteRdm: WrapRedeemer = MakeRedeemerVote(choice, votes);

            let dtm;

            if (choice === "yes") dtm = {...parsedDatum, votingState: { ...parsedDatum.votingState, yes: parsedDatum.votingState.yes + BigInt(1) }}
            else if (choice === "no") dtm = {...parsedDatum, votingState: { ...parsedDatum.votingState, no: parsedDatum.votingState.no + BigInt(1) }}
            else if (choice === "abstain") dtm = {...parsedDatum, votingState: { ...parsedDatum.votingState, abstain: parsedDatum.votingState.abstain + BigInt(1) }}

            const datum = Data.to<MinPropDatum>(dtm!, MinPropDatum)

            const tx = lucid.newTx()
                .addSignerKey(pkh)
                .attachSpendingValidator(script.script)
                .collectFrom(utxosWithAsset)
                .collectFrom([utxo[0]], Data.to(new Constr(1, [Data.void()])))
                .payToContract(script.address, { inline: datum }, utxo[0].assets!)
                .payToAddress(ownAddr, {[VotingTokenUnit]: votes})
                .complete()

            return tx;
    } else {
        return Promise.reject()
    }
}

export { createMiniProp , voteMiniProp}