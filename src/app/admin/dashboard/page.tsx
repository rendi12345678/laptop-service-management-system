// @ts-nocheck
import { FaTasks, FaHourglassHalf, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import TaskReport from "@/components/dashboard/TaskReport";
import UserList from "@/components/dashboard/UserList";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardGreater from "@/components/dashboard/DashboardGreater";
import AdminProfileHeader from "@/components/dashboard/AdminProfileHeader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ListCard from "@/components/dashboard/ListCard";
import { SearchParams } from "@/types";
import getTasksAction from "@/actions/dashboard/getTasksAction";
import getMetricsAction from "@/actions/dashboard/getMetricsAction";
import getWorkersAction from "@/actions/dashboard/getWorkersAction";

const DashboardPage = async ({ searchParams }: SearchParams) => {
  const { page = 1, perPage = 5 } = await searchParams;

  const [tasksResponse, metrics, workersResponse] = await Promise.all([
    getTasksAction(Number(page), Number(perPage)),
    getMetricsAction(),
    getWorkersAction(),
  ]);

  const { items, totalItemsLength } = tasksResponse;
  const { items: users } = workersResponse;

  // Define the data for the dashboard summary
  const data = [
    {
      label: "Active Tasks",
      value: metrics?.metrics?.totalActiveTasks,
      icon: <FaTasks />,
    },
    {
      label: "Pending Tasks",
      value: metrics?.metrics?.totalPendingTasks,
      icon: <FaExclamationCircle />,
    },
    {
      label: "In Progress Tasks",
      value: metrics?.metrics?.totalInProgressTasks,
      icon: <FaHourglassHalf />,
    },
    {
      label: "Completed Tasks",
      value: metrics?.metrics?.totalCompletedTasks,
      icon: <FaCheckCircle />,
    },
  ];

  return (
    <DashboardContainer className="w-full min-h-svh py-12 px-10 overflow-y-auto">
      <DashboardHeader className="flex justify-between">
        <DashboardGreater />
        <AdminProfileHeader />
      </DashboardHeader>
      <DashboardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
        <DashboardSummary
          data={data} />
        <section className="flex flex-col gap-6 col-span-1 sm:col-span-2 lg:col-span-5">
          <TaskReport
            page={page}
            per_page={perPage}
            items={items}
            totalItemsLength={totalItemsLength}
          />
        </section>
        <section className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-2 gap-6">
          <ListCard
            title="Worker Report"
            description="A detailed list of all workers at Servy with key information."
          >
            <UserList users={users} />
          </ListCard>
        </section>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
