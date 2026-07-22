import { buildGameFromJSON } from "../Client/GameBuilder.js";
import GameDefinition from "../Rules/GameDefinition.js";
import pickupJson from "./Pickup.json" with { type: "json" };
import buttonCounterJson from "./ButtonCounter.json" with { type: "json" };
import crazyEightsJson from "./CrazyEights.json" with { type: "json" };
import GameManager from "../GameManager.js";
import CrazyEights from "./CrazyEights.js";

const PickupGame = buildGameFromJSON(pickupJson);
export const ButtonCounterGame = buildGameFromJSON(buttonCounterJson) as GameDefinition;
export const CrazyEightsGame = buildGameFromJSON(crazyEightsJson) as GameDefinition;

if (PickupGame == null) throw new Error("Ooops, null game :P");
if (ButtonCounterGame == null || CrazyEightsGame == null) throw new Error("I believe Sam may have messed up");

export default PickupGame as GameDefinition;

GameManager.registerGameDefinition(ButtonCounterGame, 999, JSON.stringify(buttonCounterJson));
GameManager.registerGameDefinition(PickupGame, 1000, JSON.stringify(pickupJson));
GameManager.registerGameDefinition(CrazyEightsGame, 998, JSON.stringify(crazyEightsJson));

console.log('Games registered');