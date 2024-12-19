import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskTable from "./TaskTable";
import SelectShowing from "./SelectShowing";
import { ITask } from "@/models/Task";

export interface TaskReportProps {
  items: ITask[];
  totalItemsLength: number;
  page: string | string[];
  per_page: string | string[];
}

export default function TaskReport({
  items,
  totalItemsLength,
  page,
  per_page,
}: TaskReportProps): ReactElement {
  return (
    <Card className="bg-background shadow">
      <CardHeader className="flex-row justify-between items-start">
        <span>
          <CardTitle className="my-0">Task Report</CardTitle>
          <CardDescription className="mt-1.5">
            Summary of current tasks and their status
          </CardDescription>
        </span>
        <SelectShowing />
      </CardHeader>
      <CardContent>
        <TaskTable
          page={page}
          per_page={per_page}
          items={items}
          totalItemsLength={totalItemsLength}
        />
      </CardContent>
    </Card>
  );
}

