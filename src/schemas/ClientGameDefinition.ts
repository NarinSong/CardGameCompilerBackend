// This will be used for type-checking incoming game definitions from the client

import { z } from "zod";
import { BoardSchema, GameMetaArgsSchema, PhaseSchema, PlayerSchema } from "./GameDefinitionArgs.js";

// It will *not* be used for the back-end implementation
export const ClientGameDefinitionSchema = z.object({
  gameMeta: GameMetaArgsSchema,
  playerDefinition: PlayerSchema,
  boardDefinition: BoardSchema,
  phases: z.array(PhaseSchema),
});

type ClientGameDefinition = z.infer<typeof ClientGameDefinitionSchema>;

export function verifyClientGameDefintion(payload: unknown): ClientGameDefinition | null {
  const result = ClientGameDefinitionSchema.safeParse(payload);

  if (!result.success) {
    console.dir(z.treeifyError(result.error), { depth: null });
    return null;
  }
  return result.data;
}

export default ClientGameDefinition;