import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../config/Url";
import ToolsCard from "./ToolsCard";


// Removed unused import
const FeaturedTools = ({ title, tools }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ["featuredTools"],
    queryFn: () =>
      axios
        .get(`${baseUrl}/api/v1/tools/featured-tools`)
        .then((res) => res.data),
  });


  if (isLoading)
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

  return (
    data && (
      <div className="mt-10"> 
        <h2 className="text-xl font-medium brightness-90 mb-5 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data && data.map((item, index) => (
            <ToolsCard key={index} item={item} />
          ))}

          {tools && tools.map((item, index) => (
            <ToolsCard key={index} item={item} />
          ))}
        </div>
      </div>
    )
  );
};

export default FeaturedTools;
