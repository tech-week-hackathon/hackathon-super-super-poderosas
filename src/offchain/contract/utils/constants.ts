// import blueprintV1 from "./onchain/plutus.json";

// 
import { SpendingValidator } from "lucid-txpipe";


const MIN_ADA = BigInt(3000000)

const script: SpendingValidator = {
    type: 'PlutusV2',
    script: '4e4d01000033222220051200120011',
};

const VotingTokenUnit = "bbee4f4ace619c0f8b22cd755ce272ee850141e6b2058c72ef08bf3844454d4f"




export { MIN_ADA, script, VotingTokenUnit }