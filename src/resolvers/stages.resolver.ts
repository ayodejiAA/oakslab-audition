import { Query, Resolver, Mutation, Arg, Int } from "type-graphql";
import { NotFoundError } from "../common/apollo.error";
import { db } from "../config/db";
import { StageInput, Stage, Task } from "../schemaTypes";

@Resolver(() => Stage)
export class StagesResolver {
  private db = db;

  @Query(() => [Stage])
  async getStages(): Promise<Stage[]> {
    return this.db.stages;
  }

  @Query(() => Stage)
  async getStage(@Arg("id", () => Int) stageId: number): Promise<Stage> {
    const stage = this.db.stages.find(({ id }) => id === stageId);
    if (stage === undefined)
      throw new NotFoundError(`Stage with ID ${stageId} not found`);

    return stage;
  }

  @Mutation(() => Stage)
  async addStage(@Arg("data") data: StageInput): Promise<Stage> {
    const { title } = data;

    const stage = {
      id: this.db.stages.length + 1,
      title,
      isCompleted: false,
      tasks: [],
    } as Stage;

    this.db.stages.push(stage);
    return stage;
  }

  @Mutation(() => Stage)
  async updateStage(
    @Arg("id", () => Int) stageId: number,
    @Arg("data") data: StageInput
  ): Promise<Stage> {
    const stage = this.db.stages.find(({ id }) => id === stageId);
    if (stage === undefined)
      throw new NotFoundError(`Stage with ID ${stageId} not found`);
    stage.title = data.title;
    return stage;
  }
}
