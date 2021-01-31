export interface Building {
  buildingType: number
  level: number
}

export interface Town {
  buildings: Building[];
}
