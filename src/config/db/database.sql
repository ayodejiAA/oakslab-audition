-- CreateTable
CREATE TABLE IF NOT EXISTS "Stage"(
  "id" SERIAL NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "isCompleted" BOOLEAN NOT NULL DEFAULT false,
  "tasksOrderId" INTEGER REFERENCES "StageTasksOrder"("id"),
  PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Task"(
  "id" SERIAL NOT NULL,
  "description" VARCHAR(100) NOT NULL,
  "done" BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE
  "Task"
ADD
  FOREIGN KEY ("stageId") REFERENCES "Stage"("id");

CREATE TABLE IF NOT EXISTS "StageTasksOrder"(
  "id" SERIAL NOT NULL,
  "taskIds" VARCHAR(MAX) NOT NULL,
  PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE
  "StageTasksOrder"
ADD
  FOREIGN KEY ("stageId") REFERENCES "Stage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StageTasksOrder.stageId_unique" ON "StageTasksOrder"("stageId");