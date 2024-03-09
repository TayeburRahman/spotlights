import axios from "axios";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/Url";
import { useQuery } from "@tanstack/react-query";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["featuredTools"],
    queryFn: () =>
      axios
        .get(`${baseUrl}/api/v1/tools/featured-tools`)
        .then((res) => res.data),
  });

  const handleInputChange = (e) => {

    showSearchSuggestions(e.target.value);

    setValues({ ...values, keyword: e.target.value });
  }
  const showSearchSuggestions = (keyword) => {
    // Implement your logic for showing search suggestions here
    console.log('Showing suggestions for:', keyword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/tools/search/${values.keyword}`
      );
      setValues({ ...values, results: data }); // Assuming the received data is directly the search results array
      navigate(`/search/${values.keyword}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <form
        className="d-flex search-form my-5 w-[100%]"
        role="search"
        onSubmit={handleSubmit}
      >
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
        <div className="relative"><div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
          <input
            type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="I want to Create my business"
            aria-label="Search"
            value={values.keyword}
            onChange={handleInputChange}
          />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
        </div>
      </form>

      {/* Check if data is available before mapping */}
      <div className="bg-white rounded-b-2xl hover:rounded-b-xl absolute w-[100%] mt-[-24px] z-20">
        {data && data.filter(item => {
          const searchTerm = values.keyword.toLowerCase();  // Convert search term to lowercase
          const title = item.title.toLowerCase();  // Convert title to lowercase
          return searchTerm && title.includes(searchTerm);  // Check if title includes search term
        }).map((item, index) => (
          <div key={index} className="rounded hover:rounded-b-xl">
            <div className="bg-white text-black rounded-b-xl hover:rounded-b-xl">
              <ul>
                <li className="hover:bg-gray-200 hover:cursor-pointer hover:font-semibold px-3 py-2 rounded z-10 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  {item.title &&
                    <a href={`/tool-details/${item.title}`} className="mt-[-2px]">
                      <p>{item.title}</p>
                    </a>
                  }
                </li>
              </ul>
              {/* Add more logic or components to display other properties if needed */}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SearchInput;
