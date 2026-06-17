import { buildClientGameDefinitionFromblocks } from "../Client/ClientBlocksBuilder.js";
import { buildGameFromJSON } from "../Client/GameBuilder.js"
import GameDefinition from "../Rules/GameDefinition.js";
//import pickupJson from "./Pickup.json" with { type: "json" };
import pickupBlocksJson from "./PickupBlocks.json" with { type: "json" };

//const PickupGame = buildGameFromJSON(pickupJson);


const PickupBlocksFromEditor = buildClientGameDefinitionFromblocks(pickupBlocksJson);
const PickupGame = buildGameFromJSON(PickupBlocksFromEditor);

if (PickupGame == null) throw new Error("Ooops, null game :P");

export default PickupGame as GameDefinition;