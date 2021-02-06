import { ResourceProps } from "../../types/types";
import { ResourceId } from "./constants";

export class Resource {
  id: ResourceId;
  name: string;

  constructor({ id, name }: ResourceProps) {
    this.id = id;
    this.name = name;
  }
}
