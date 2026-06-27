import { buildClientGameDefinitionFromblocks } from "../Client/ClientBlocksBuilder.js";
import { buildGameFromJSON } from "../Client/GameBuilder.js"
import GameDefinition from "../Rules/GameDefinition.js";
//import pickupJson from "./Pickup.json" with { type: "json" };
import pickupBlocksJson from "./PickupBlocks.json" with { type: "json" };

<<<<<<< HEAD
const PickupGameJson = pickupJson
const PickupGame = buildGameFromJSON(pickupJson);
=======
//const PickupGame = buildGameFromJSON(pickupJson);


const PickupBlocksFromEditor = buildClientGameDefinitionFromblocks(pickupBlocksJson);
const PickupGame = buildGameFromJSON(PickupBlocksFromEditor);
>>>>>>> main

if (PickupGame == null) throw new Error("Ooops, null game :P");

export default PickupGame as GameDefinition;
export  PickupGameJson as string;