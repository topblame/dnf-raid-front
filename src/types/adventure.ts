import type { JobType } from "./character";

export interface AdventureCharacter {
  id: number;
  serverId: string;
  characterName: string;
  jobGroup: string | null;
  jobName: string;
  jobType: JobType;
  fame: number | null;
  equipmentScore: number | null;
  dundamDamage: number | null;
  buffScore: number | null;
  memo: string | null;
}

export interface Adventure {
  id: number;
  adventureName: string;
  memo: string | null;
  characters: AdventureCharacter[];
}
