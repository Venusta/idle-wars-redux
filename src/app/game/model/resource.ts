import { ResourceIdType } from "../constants";

interface ResourceProps {
  id: ResourceIdType;
  name: string;
}

export class Resource {
  id: ResourceIdType;
  name: string;

  constructor({ id, name }: ResourceProps) {
    this.id = id;
    this.name = name;
  }
}
