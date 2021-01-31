import { ResourceProps } from "../../types/types";;

export class Resource {
  id: number;
  name: string;

  constructor({ id, name }: ResourceProps) {
    this.id = id;
    this.name = name;
  }
}
