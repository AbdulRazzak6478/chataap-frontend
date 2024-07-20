import { Select, Option, IconButton } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
// import { PiGreaterThan } from "react-icons/pi";
// import { useAuth } from "../../../../store/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const rounds = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
];
export default function EditQuarterFinalModal() {
  const [showModel, setShowModel] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [dropList, setDropList] = useState([]);

  const getRoundData = async (id) => {
    try {
      setLoading(true);
      console.log(id);
      setShowModel(true);
      const response = await axios.get(
        "http://localhost:3005/api/tournaments/getRoundDataForFixing/66965cf9b1c2c7db41b59fc3"
      );
      console.log("data : ", response.data.data);
      setParticipants(response.data.data.participants);
      setMatches(response.data.data.roundMatches);
      const arr = response.data.data.roundMatches?.map((match, index) => {
        return {
          index: index,
          teamA: match?.teamA,
          teamB: match?.teamB,
        };
      });
      const teamList = response.data.data.participants?.map(
        (team) => team?.name
      );
      setDropList(teamList);
      setDefaultData(arr);
      console.log("participants : ", participants);
      console.log("matches : ", matches);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(id);
      setErr(error.message);
      setShowModel(false);
    }
  };

  const onSetData = (value, index, position, listIndex) => {
    console.log("onSet : ", value, index, position, listIndex);
    if (value.length == 0) {
      return;
    }
    console.log("before update List : ", dropList, defaultData);

    var updatedDefaultData = [];
    setDefaultData((prevState) => {
      const arr = JSON.parse(JSON.stringify(prevState));
      console.log("arr : ", arr);
      arr?.forEach((data) => {
        if (data?.teamA == value) {
          data.teamA = null;
        }
        if (data?.teamB == value) {
          data.teamB = null;
        }
      });
      if (position === "A") {
        arr[index].teamA = value;
      }
      if (position === "B") {
        arr[index].teamB = value;
      }
      updatedDefaultData = [...arr];
      const updatedTeams = [];
      updatedDefaultData.forEach((data) => {
        if (data?.teamA) {
          updatedTeams.push(data?.teamA);
        }
        if (data?.teamB) {
          updatedTeams.push(data?.teamB);
        }
      });
      console.log("list teams : ", updatedTeams);
      console.log("default Data : ", defaultData);
      setDropList([...updatedTeams]);
      return [...arr];
    });
    console.log('default updated in on set : ',updatedDefaultData);
  };
  useEffect(() => {
    console.log("updated default : ", defaultData);
  }, [defaultData, dropList]);
  const setArrangeTeamsIntoMatches = () => {
    // toast.success('teams : ',dropList)
    let missingTeams = []
    defaultData.forEach((team,index)=>{
      if(team.teamA === null)
      {
        console.log('team A :',team?.teamA)
        missingTeams.push('match :'+(index+1)+' teamA is not assign');
      }
      if(team?.teamB === null)
      {
        console.log('teamB : ',team?.teamB);
        missingTeams.push('match :'+(index+1)+' teamB is not assign');
      }
    })
    console.log('missing Teams : ',missingTeams);
    if(missingTeams.length !==0)
    {
      return ;
    }
    if(dropList.length !== participants.length)
    {
      console.log('teams are not properly arrange ',dropList);
      return ;
    }
    console.log("arranged teams : ", dropList);

  };

  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : err ? (
        err
      ) : (
        showModel && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#000000E6]">
            <div className="flex flex-col gap-4 bg-white rounded-sm px-6 py-8 w-[35%] relative">
              <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-bold">Edit First Round</h1>
                <IconButton
                  onClick={() => setShowModel(false)}
                  className={
                    "shadow-none hover:shadow-none focus:shadow-none text-[#FF0023] bg-[#FDE4E8] border border-[#FF0023] rounded-sm"
                  }
                  size="sm"
                >
                  <Icon
                    icon="material-symbols:close"
                    className="text-[1.5rem]"
                  />
                </IconButton>
              </div>
              <div>
                {matches.length > 0 &&
                  matches.map((match, index) => (
                    <div
                      key={index}
                      className="flex gap-[1.5rem] items-center justify-center"
                    >
                      <select
                        // defaultValue={defaultData[index].teamA}
                        disabled={match?.teamA ? false : true}
                        onChange={(e) =>
                          onSetData(e.target.value, index, "A", index * 2)
                        }
                        className="custom-select w-[200px] px-1 py-2 mt-6 text-gray-700 border border-gray-300 rounded-md shadow-sm"
                      >
                        {/* {defaultData[index].teamA == null && <option>{defaultData[index].teamA}</option>} */}
                        <option className={`bg-lime-200 text-slate-500`}>
                          {defaultData[index].teamA}
                        </option>
                        {participants.length > 0 &&
                          participants.map((participant, ind) => (
                            <option
                              key={participant?.id}
                              className={` ${
                                dropList.includes(participant?.name)
                                  ? "text-gray-400"
                                  : "text-black-700"
                              }`}
                            >
                              {participant?.name}
                            </option>
                          ))}
                      </select>
                      <p className="mt-6">VS</p>
                      <select
                        // defaultValue={defaultData[index].teamB}
                        disabled={match?.teamB ? false : true}
                        onChange={(e) =>
                          onSetData(e.target.value, index, "B", index * 2 + 1)
                        }
                        className={`${
                          !match?.teamB && "cursor-not-allowed"
                        } custom-select w-[200px] px-1 py-2 mt-6 text-gray-700 border border-gray-300 rounded-md shadow-sm`}
                      >
                        {/* {defaultData[index].teamB == null && <option></option>} */}
                        {/* {defaultData[index].teamB == null && <option>{defaultData[index].teamB}</option>} */}
                        <option className={`bg-lime-200 text-slate-500`}>
                          {defaultData[index].teamB}
                        </option>
                        {participants.length > 0 &&
                          participants.map((participant, ind) => (
                            <option
                              key={participant?.id}
                              className={` ${
                                dropList.includes(participant?.name)
                                  ? "text-gray-400"
                                  : "text-black-700"
                              }`}
                              //   onChange={(e)=>onSetData(e,index,'B')}
                            >
                              {participant?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  ))}
              </div>
              <div className="w-[20%] flex items-center justify-center text-white bg-[#FB6108] px-4 py-2 cursor-pointer rounded-md gap-1">
                <button
                  type="button"
                  className="text-[0.8rem] sm:text-[1rem] font-semibold"
                  onClick={setArrangeTeamsIntoMatches}
                >
                  Save
                </button>
                {/* <PiGreaterThan /> */}
              </div>
            </div>
            <ToastContainer />
          </div>
        )
      )}
      {loading ? (
        <hi>Loading ...</hi>
      ) : err ? (
        err
      ) : (
        !showModel &&
        rounds?.map((round) => (
          <button
            key={round?.id}
            onClick={() => getRoundData(round.id)}
            className="w-[100px] px-4 py-2 mx-3 mt-10 cursor-pointer rounded-md  text-white bg-[#FB6108]"
          >
            Round {round.id}
          </button>
        ))
      )}
    </>
  );
}

// import React, { useState } from 'react';

// const TeamSelector = () => {
//   const [selectedTeams, setSelectedTeams] = useState({
//     team1: null,
//     team2: null,
//     team3: null,
//     team4: null,
//     team5: null,
//     team6: null,
//     team7: null,
//     team8: null,
//   });

//   const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'];

//   const handleSelect = (team, slot) => {
//     setSelectedTeams((prevSelectedTeams) => {
//       const newSelectedTeams = { ...prevSelectedTeams };

//       // Remove the team from all slots if already selected
//       Object.keys(newSelectedTeams).forEach((key) => {
//         if (newSelectedTeams[key] === team) {
//           newSelectedTeams[key] = null;
//         }
//       });

//       // Set the team for the selected slot
//       newSelectedTeams[slot] = team;

//       return newSelectedTeams;
//     });
//   };

//   return (
//     <div>
//       {Object.keys(selectedTeams).map((slot) => (
//         <div key={slot}>
//           <label>{slot}:</label>
//           <select
//             value={selectedTeams[slot] || ''}
//             onChange={(e) => handleSelect(e.target.value, slot)}
//           >
//             <option value="" disabled>Select a team</option>
//             {teams.map((team) => (
//               <option key={team} value={team}>
//                 {team}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TeamSelector;
