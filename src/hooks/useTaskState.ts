"use client"
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ITask } from "@/models/Task";
import { serializeData } from "@/lib/utils";
import { useApiAction } from "@/hooks/useApiAction";

const initialTaskState: ITask = {
  description: "",
  workerId: null,
  customerName: "",
  customerPhone: "",
  status: "Pending",
  serialNumber: "",
  laptopBrand: "",
  laptopModel: "",
  totalCost: 0,
  createdAt: new Date(),
};

const useTaskState = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "5";

  const { apiAction, refetchTrigger } = useApiAction();

  const [loading2, setLoading2] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // @ts-ignore
  const [taskData, setTaskData] = useState<ITask>(serializeData(initialTaskState));

  return {
    page,
    perPage,
    apiAction,
    refetchTrigger,
    loading2,
    setLoading2,
    error,
    setError,
    taskData,
    setTaskData,
    initialTaskState
  };
};

export default useTaskState;

