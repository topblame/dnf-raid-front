import type {JobType} from './character';
export interface RaidType{id:number;raidName:string;memberCount:number}
export interface Member{id:number;slotNo:number;characterId:number;adventureId:number;adventureName:string;characterName:string;jobName:string;jobType:JobType;equipmentScore:number|null;buffScore:number|null}
export interface Party{id:number;partyType:string;partyOrder:number;members:Member[]}
export interface Round{id:number;roundNo:number;raidType:RaidType;parties:Party[]}
export interface Schedule{id:number;scheduleName:string;startDate:string;memo:string|null;finalized:boolean;rounds:Round[]}
export interface Job{id:number;jobName:string;jobType:JobType}
