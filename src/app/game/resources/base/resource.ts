import { ResourceProps } from "../../../../types/types";
import { ResourceIdType } from "../../constants";

export class Resource {
  id: ResourceIdType;
  name: string;

  constructor({ id, name }: ResourceProps) {
    this.id = id;
    this.name = name;
  }
}
