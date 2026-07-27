import { buildGameFromJSON } from "../Client/GameBuilder.js";
import GameDefinition from "../Rules/GameDefinition.js";
import pickupJson from "./Pickup.json" with { type: "json" };
import buttonCounterJson from "./ButtonCounter.json" with { type: "json" };
import crazyEightsJson from "./CrazyEights.json" with { type: "json" };
import spadesJson from "./Spades.json" with { type: "json" };
import inBetweenJson from "./InBetween.json" with { type: "json" };
import GameManager from "../GameManager.js";

const PickupGame = buildGameFromJSON(pickupJson);
export const ButtonCounterGame = buildGameFromJSON(buttonCounterJson) as GameDefinition;
export const CrazyEightsGame = buildGameFromJSON(crazyEightsJson) as GameDefinition;
export const SpadesGame = buildGameFromJSON(spadesJson) as GameDefinition;
export const InBetweenGame = buildGameFromJSON(inBetweenJson) as GameDefinition;

if (PickupGame == null) throw new Error("Ooops, null game :P");
if (ButtonCounterGame == null || CrazyEightsGame == null || SpadesGame == null || InBetweenGame == null) throw new Error("I believe Sam may have messed up");

export default PickupGame as GameDefinition;

GameManager.registerGameDefinition(ButtonCounterGame, 999, JSON.stringify(buttonCounterJson));
GameManager.registerGameDefinition(PickupGame, 1000, JSON.stringify(pickupJson));
GameManager.registerGameDefinition(CrazyEightsGame, 998, JSON.stringify(crazyEightsJson));
GameManager.registerGameDefinition(SpadesGame, 997, JSON.stringify(spadesJson));
GameManager.registerGameDefinition(InBetweenGame, 996, JSON.stringify(inBetweenJson));

console.log('Games registered');