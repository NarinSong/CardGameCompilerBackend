import { buildGameFromJSON } from "../Client/GameBuilder.js";
import GameDefinition from "../Rules/GameDefinition.js";
import pickupJson from "./Pickup.json" with { type: "json" };
import buttonCounterJson from "./ButtonCounter.json" with { type: "json" };
import crazyEightsJson from "./CrazyEights.json" with { type: "json" };
import spadesJson from "./Spades.json" with { type: "json" };
import inBetweenJson from "./InBetween.json" with { type: "json" };
import GameManager from "../GameManager.js";
import ClientGameDefinition from "../schemas/ClientGameDefinition.js";

const PickupGame = buildGameFromJSON(pickupJson as ClientGameDefinition);
export const ButtonCounterGame = buildGameFromJSON(buttonCounterJson as ClientGameDefinition) as GameDefinition;
export const CrazyEightsGame = buildGameFromJSON(crazyEightsJson as ClientGameDefinition) as GameDefinition;
export const SpadesGame = buildGameFromJSON(spadesJson as ClientGameDefinition) as GameDefinition;
export const InBetweenGame = buildGameFromJSON(inBetweenJson as ClientGameDefinition) as GameDefinition;

if (PickupGame == null) throw new Error("Ooops, null game :P");
if (ButtonCounterGame == null || CrazyEightsGame == null || SpadesGame == null || InBetweenGame == null) throw new Error("I believe Sam may have messed up");

export default PickupGame as GameDefinition;

GameManager.registerGameDefinition(ButtonCounterGame, 999, buttonCounterJson as ClientGameDefinition);
GameManager.registerGameDefinition(PickupGame, 1000, pickupJson as ClientGameDefinition);
GameManager.registerGameDefinition(CrazyEightsGame, 998, crazyEightsJson as ClientGameDefinition);
GameManager.registerGameDefinition(SpadesGame, 997, spadesJson as ClientGameDefinition);
GameManager.registerGameDefinition(InBetweenGame, 996, inBetweenJson as ClientGameDefinition);

console.log('Games registered');