// import blueprintV1 from "./onchain/plutus.json";

import { SpendingValidator } from "lucid-txpipe";


const MIN_ADA = BigInt(3000000)

const script: SpendingValidator = {
    type: 'PlutusV2',
    script: '4e4d01000033222220051200120011',
};




export { MIN_ADA, script,  }