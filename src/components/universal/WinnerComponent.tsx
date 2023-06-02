import { useState } from "react";
import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";

const WinnerComponent = (
  { type }: 
  { type: "COSPLAY" | "SOCIAL" | "SOCIETY"}) => {


  const [wList, setWlist] = useState<string[] | undefined>(undefined);  
  setTimeout(() => {
    const { data: winner } = api.prize.getWinner.useQuery({
      category: type,
    });
    setWlist(winner?.winners);
  }, 1000);  

  if (!wList) return <LoadingSpinner />;

  




  return (<></>);

}






export default WinnerComponent;