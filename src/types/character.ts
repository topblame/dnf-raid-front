export interface NeopleCharacterSearchResult {
  serverId: string;
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  fame: number;
}

export interface CharacterSearchResponse {
  rows: NeopleCharacterSearchResult[];
}

export interface CreateCharacterRequest {
  serverId: string;
  characterId: string;
  equipmentScore: number;
  dundamDamage?: number | null;
  buffScore?: number | null;
  memo?: string | null;
}

export type JobType = "UNKNOWN" | "DEALER" | "BUFFER";

export interface GameCharacter {
  id: number;
  adventureId: number;
  adventureName: string;

  serverId: string;
  neopleCharacterId: string;

  characterName: string;

  jobId: number;
  jobName: string;
  jobType: JobType;

  fame: number;

  equipmentScore: number;
  dundamDamage: number | null;
  buffScore: number | null;
  memo: string | null;
}