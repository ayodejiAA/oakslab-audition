import { Field, ObjectType, InputType, Int } from "type-graphql";
import { Length } from "class-validator";
import { Task } from "./task";

@ObjectType()
export class Stage {
  @Field(() => Int)
  id!: number;

  @Field()
  @Length(2, 100)
  title!: string;

  @Field(() => [Task])
  tasks!: Task[];

  @Field({ defaultValue: false })
  isCompleted!: boolean;
}

@InputType()
export class StageInput implements Pick<Stage, "title"> {
  @Field()
  @Length(2, 100)
  title!: string;
}
