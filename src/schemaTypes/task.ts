import { Field, ObjectType, InputType, Int } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
export class Task {
  @Field(() => Int)
  id!: number;

  @Field()
  @Length(10, 100)
  description!: string;

  @Field()
  done!: boolean;
}

@InputType()
export class CreateTaskInput {
  @Field(() => Int)
  stageId!: number;

  @Field()
  @Length(2, 100)
  description!: string;
}

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  @Length(2, 100)
  description?: string;

  @Field({ nullable: true })
  done?: boolean;
}
