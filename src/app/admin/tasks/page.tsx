import { SearchParams } from "@/types"
import { AddTaskDialog } from "@/components/dashboard/dialogs/AddTaskDialog";
import SelectShowing from "@/components/dashboard/SelectShowing";
import TaskTable from "@/components/dashboard/TaskTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardTitle from "@/components/dashboard/DashboardTitle";
import getTasksAction from "@/actions/dashboard/getTasksAction";
import deleteTaskAction from "@/actions/dashboard/deleteTaskAction";

const TasksPage = async ({
  searchParams,
}: SearchParams) => {
  const { page = 1, perPage = 5 } = await searchParams;
  // @ts-ignore
  const { items, totalItemsLength } = await getTasksAction(
    Number(page),
    Number(perPage),
  );

  return (
    <DashboardContainer className="w-full min-h-screen py-12 px-10 overflow-y-auto">
      <DashboardHeader className="flex justify-between">
        <DashboardTitle>Tasks</DashboardTitle>
        <div className="flex gap-6">
          <SelectShowing />
          <AddTaskDialog />
        </div>
      </DashboardHeader>
      <DashboardContent className="bg-background shadow p-6 rounded-lg">
        <TaskTable
          // @ts-ignore
          page={page}
          deleteAction={deleteTaskAction}
          // @ts-ignore
          per_page={perPage}
          items={items}
          totalItemsLength={totalItemsLength}
        />
      </DashboardContent>
    </DashboardContainer>
  );
};

export default TasksPage;
