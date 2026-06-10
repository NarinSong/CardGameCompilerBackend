import { buildGameFromJSON } from "../Client/GameBuilder.js"
import GameDefinition from "../Rules/GameDefinition.js";
import pickupJson from "./Pickup.json" with { type: "json" };

const PickupGameJson = pickupJson
const PickupGame = buildGameFromJSON(pickupJson);

if (PickupGame == null) throw new Error("Ooops, null game :P");

export default PickupGame as GameDefinition;
export  PickupGameJson as string;