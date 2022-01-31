import { useQuery } from "react-query";
import { fetchData } from "../api";

function Home() {
  const { isLoading, data } = useQuery("data", fetchData);
  return <div></div>;
}

export default Home;
