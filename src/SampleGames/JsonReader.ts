import { buildGameFromJSON } from "../Client/GameBuilder.js";
import GameDefinition from "../Rules/GameDefinition.js";
import pickupJson from "./Pickup.json" with { type: "json" };
import buttonCounterJson from "./ButtonCounter.json" with { type: "json" };
import crazyEightsJson from "./CrazyEights.json" with { type: "json" };
import spadesJson from "./Spades.json" with { type: "json" };
import inBetweenJson from "./InBetween.json" with { type: "json" };
import GameManager from "../GameManager.js";
import ClientGameDefinition, { ClientGameDefinitionSchema } from "../schemas/ClientGameDefinition.js";

export const PickupGame         = buildGameFromJSON(ClientGameDefinitionSchema.parse(pickupJson));
export const ButtonCounterGame  = buildGameFromJSON(ClientGameDefinitionSchema.parse(buttonCounterJson));
export const CrazyEightsGame    = buildGameFromJSON(ClientGameDefinitionSchema.parse(crazyEightsJson));
export const SpadesGame         = buildGameFromJSON(ClientGameDefinitionSchema.parse(spadesJson));
export const InBetweenGame      = buildGameFromJSON(ClientGameDefinitionSchema.parse(inBetweenJson));

export default PickupGame as GameDefinition;

GameManager.registerGameDefinition(ButtonCounterGame, 999, buttonCounterJson as ClientGameDefinition);
GameManager.registerGameDefinition(PickupGame, 1000, pickupJson as ClientGameDefinition);
GameManager.registerGameDefinition(CrazyEightsGame, 998, crazyEightsJson as ClientGameDefinition);
GameManager.registerGameDefinition(SpadesGame, 997, spadesJson as ClientGameDefinition);
GameManager.registerGameDefinition(InBetweenGame, 996, inBetweenJson as ClientGameDefinition);

console.log('Games registered');