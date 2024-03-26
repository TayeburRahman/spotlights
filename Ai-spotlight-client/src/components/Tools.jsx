import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../config/Url";
import ToolsCard from "./ToolsCard";

const Tools = ({ tools, title, f_option, response, isFilterClicked, gridChecked }) => {
  const [toolsData, setTools] = useState()

  const { isLoading, error, data } = useQuery({
    queryKey: ["approvedTools"],
    queryFn: () =>
      axios
        .get(`${baseUrl}/api/v1/tools/approved-tools`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (f_option > 0) {
      setTools(tools)
    } else {
      setTools(data)
    }
  }, [f_option, tools, data])

  if (isLoading || response)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error.message}
      </div>
    );

  if (!toolsData?.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No Data found !
      </div>
    );

  return (
    <div className="my-5">
      <h2 className="text-2xl font-medium brightness-90 mb-5 text-center">
        {f_option === 0 && title}
      </h2>

      <div className={`ease-linear duration-500 ${isFilterClicked ? (gridChecked ? "block space-y-5 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4") : (gridChecked ? "block space-y-5 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4")}`}>
        {toolsData && toolsData.map((item, index) => (
          <ToolsCard key={index} item={item} />
        ))}
      </div>

    </div>
  );
};

export default Tools;
