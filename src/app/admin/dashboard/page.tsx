import { FaTasks, FaUsers, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import TaskReport from "@/components/dashboard/TaskReport";
import UserList from "@/components/dashboard/UserList";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardGreater from "@/components/dashboard/DashboardGreater"
import AdminProfileHeader from "@/components/dashboard/AdminProfileHeader"
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ListCard from "@/components/dashboard/ListCard";
import { SearchParams } from "@/types"
import getTasksAction from "@/actions/dashboard/getTasksAction"
import getMetricsAction from "@/actions/dashboard/getMetricsAction"
import getWorkersAction from "@/actions/dashboard/getWorkersAction"

const DashboardPage = async ({
  searchParams,
}: SearchParams) => {
  const { page = 1, perPage = 5 } = await searchParams;

  // @ts-ignore
  const { items, totalItemsLength } = await getTasksAction(
    Number(page),
    Number(perPage),
  );
  const metrics = await getMetricsAction();
  // @ts-ignore
  const { items: users } = await getWorkersAction();

  // Define the data for the dashboard summary
  const data = [
    {
      label: "Total Users",
      // @ts-ignore
      value: metrics?.metrics?.totalUsers,
      icon: <FaUsers />,
    },
    {
      label: "Active Tasks",
      // @ts-ignore
      value: metrics?.metrics?.totalActiveTasks,
      icon: <FaTasks />,
    },
    {
      label: "In Progress Tasks",
      // @ts-ignore
      value: metrics?.metrics?.totalInProgressTasks,
      icon: <FaHourglassHalf />,
    },
    {
      label: "Completed Tasks",
      // @ts-ignore
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
      <DashboardContent className="grid grid-cols-7 gap-6">
        <DashboardSummary   // @ts-ignore
          data={data} />
        <section className="flex flex-col gap-6 col-span-5">
          <TaskReport
            // @ts-ignore
            page={page}
            // @ts-ignore
            per_page={perPage}
            items={items}
            totalItemsLength={totalItemsLength}
          />
        </section>
        <section className="flex flex-col col-span-2 gap-6">
          <ListCard title="Worker Report" description="A detailed list of all workers at Servy with key information.">
            <UserList users={users} />
          </ListCard>
        </section>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
