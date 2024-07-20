import axios from "axios";
import { useEffect } from "react";

const FixingType = () => {
  // const [participants, setParticipants] = useState([]);
  const fun = async () => {
    console.log("before");
    // const response = await axios.get(
    //   `http://localhost:3005/api/tournaments/getRoundDataForFixing/6696286a2ad81cc25b1e8243`);
    // console.log("data : ", response);
    try {
      const response = await fetch(
        "http://localhost:3005/api/tournaments/getRoundDataForFixing/6696286a2ad81cc25b1e8243",
        {
          method: "GET",
        }
      );
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.warn("Fetch Error ==>", error);
    }
  };
  useEffect(() => {
    fun();
  }, []);
  return <div>FixingType</div>;
};

export default FixingType;
