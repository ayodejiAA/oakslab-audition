import { Resolver, Mutation, Arg, Int } from "type-graphql";
import { NotFoundError } from "../common/apollo.error";
import { Task, CreateTaskInput, UpdateTaskInput, Stage } from "../schemaTypes";
import { db } from "../config/db";

@Resolver(() => Task)
export class TasksResolver {
  private db = db;

  @Mutation(() => Task)
  async addTask(@Arg("data") data: CreateTaskInput): Promise<Task> {
    const { stageId, description } = data;

    const stage = this.db.stages.find(({ id }) => id === stageId);
    if (stage === undefined)
      throw new NotFoundError(`Stage with ID ${stageId} not found`);

    const task = {
      id: stage.tasks.length + 1,
      description,
      done: false,
      stageId,
    } as Task;

    stage.tasks.push(task);
    return task;
  }

  @Mutation(() => Task)
  async updateTask(
    @Arg("stageId", () => Int) stageId: number,
    @Arg("taskId", () => Int) taskId: number,
    @Arg("data") data: UpdateTaskInput
  ): Promise<Task> {
    const stage = this.db.stages.find(({ id }) => id === stageId);

    if (stage === undefined)
      throw new NotFoundError(`Stage with ID ${stageId} not found`);

    const task = stage.tasks.find(({ id }) => id === taskId);

    if (task === undefined)
      throw new NotFoundError(`Task with ID ${taskId} not found`);

    Object.assign(task, { ...task, ...data });

    // Task Status Change
    // TODO: extract to a method in a Task service file
    if ("done" in data) {
      for (const idx in this.db.stages) {
        const currentStage = this.db.stages[idx];
        const previousStage = +idx === 0 ? null : this.db.stages[+idx - 1];

        if (previousStage === null || previousStage.isCompleted) {
          if (currentStage.tasks.every(({ done }) => done)) {
            currentStage.isCompleted = true;
          } else {
            currentStage.isCompleted = false;
          }
        } else {
          currentStage.isCompleted = false;
        }
      }
    }

    return task;
  }
}
