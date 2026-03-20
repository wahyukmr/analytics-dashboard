import type { UserPersona } from "../../types";

export class PersonaService {
  pickPersona(random: () => number): UserPersona {
    const r = random();

    if (r < 0.5) return "casual"; // 50%
    if (r < 0.85) return "active"; // 35%
    return "power"; // 15%
  }
}
