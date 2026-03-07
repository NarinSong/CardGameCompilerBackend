// This will be used for type-checking incoming game definitions from the client

import { z } from "zod";
import { BoardSchema, GameMetaArgsSchema, PhaseSchema, PlayerSchema } from "./GameDefinitionArgs";

// It will *not* be used for the back-end implementation
const ClientGameDefinitionSchema = z.object({
  gameMeta: GameMetaArgsSchema,
  playerDefinition: PlayerSchema,
  boardDefinition: BoardSchema,
  roles: z.array(z.string()),
  labels: z.array(z.string()),
  actionRoles: z.array(z.string()),
  phases: z.array(PhaseSchema),
});

type ClientGameDefinition = z.infer<typeof ClientGameDefinitionSchema>;

// Throws if invalid
export function verifyClientGameDefintion(payload: unknown): ClientGameDefinition {
  return ClientGameDefinitionSchema.parse(payload);
}

export default ClientGameDefinition;