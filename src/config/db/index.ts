import { Stage } from "../../schemaTypes";

interface IDB {
  stages: Stage[];
  tasksOrderingIds: Record<number, number[]>;
}

export const db: IDB = {
  stages: [],
  tasksOrderingIds: {}, // TODO: Ordered List of task IDs. For the purpose of drag and drop feature on the client.
};
