import { buildGameFromJSON } from "../Client/GameBuilder.js";
import GameDefinition from "../Rules/GameDefinition.js";
import pickupJson from "./Pickup.json" with { type: "json" };
import buttonCounterJson from "./ButtonCounter.json" with { type: "json" };
import GameManager from "../GameManager.js";
import CrazyEights from "./CrazyEights.js";

const PickupGame = buildGameFromJSON(pickupJson);

if (PickupGame == null) throw new Error("Ooops, null game :P");

export const ButtonCounterGame = buildGameFromJSON(buttonCounterJson) as GameDefinition;

if (ButtonCounterGame == null) throw new Error("I believe Sam may have messed up");

export default PickupGame as GameDefinition;

GameManager.registerGameDefinition(ButtonCounterGame, 999, JSON.stringify(buttonCounterJson));
GameManager.registerGameDefinition(PickupGame, 1000, JSON.stringify(pickupJson));
GameManager.registerGameDefinition(CrazyEights, 998, JSON.stringify(CrazyEights));

console.log('Games registered');