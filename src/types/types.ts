export interface Building {
  buildingType: number
  level: number
}

export interface Resources {
  timber: number
  clay: number
  iron: number
}

export type Population = number

export interface Town {
  resources: Resources;
  population: number;
  buildings: Building[];
}
