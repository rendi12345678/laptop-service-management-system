import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

export const useApiAction = () => {
  const { toast } = useToast();
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const triggerRefetch = () => {
    setRefetchTrigger((prev) => !prev);
  };

  const apiAction = async ({
    url,
    method = "GET",
    data = {}, // Make `data` the more general name
    successMessage,
    errorMessage,
    successVariant = "default",
    errorVariant = "destructive",
  }: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: Record<string, any>; // Accepts query params or body data
    successMessage: string;
    errorMessage: string;
    successVariant?: "default";
    errorVariant?: "destructive";
  }): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const config: any = {
        method,
        url,
      };

      // If the method is GET or DELETE, we use `params` (query parameters)
      if (method === "GET" || method === "DELETE") {
        config.params = data; // `data` will be treated as query parameters
      } else {
        config.headers = { "Content-Type": "application/json" }; // Set the header for POST/PUT requests
        config.data = data; // `data` will be treated as the request body
      }

      const response = await axios(config);

      if (response.status >= 200 && response.status < 300) {
        triggerRefetch(); // Trigger refetch only on success
        toast({
          title: "Success",
          description: successMessage || response.data.message || "Action completed successfully.",
          variant: successVariant,
        });
        return { success: true, data: response.data }; // Return success and response data
      } else {
        const errorMsg = errorMessage || response.data.message || `Error: ${response.statusText}`;
        toast({
          title: "Error",
          description: errorMsg,
          variant: errorVariant,
        });
        return { success: false, error: errorMsg }; // Return failure and error message
      }
    } catch (error) {
      // Handle errors (network or other failures)
      const errorMsg =
        (error as { response?: { data: { message: string } } })?.response?.data?.message ||
        (error as { message: string }).message ||
        "An unexpected error occurred.";
      toast({
        title: "Failed",
        description: errorMsg,
        variant: errorVariant,
      });
      return { success: false, error: errorMsg }; // Return failure and error message
    }
  };

  return { apiAction, refetchTrigger };
};
