import { buildGameFromJSON } from "../Client/GameBuilder"
import GameDefinition from "../Rules/GameDefinition";
import pickupJson from "./Pickup.json"

const PickupGame = buildGameFromJSON(pickupJson);

if (PickupGame == null) throw new Error("Ooops, null game :P");

export default PickupGame as GameDefinition;