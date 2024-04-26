import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BranchForm from "./Components/Branch/BranchForm";
import CustomLayout from "./Layout";
import BranchList from "./Components/Branch/BranchList";
import { toast } from "react-toastify";

const AddBranch = ({ sideBarValue }) => {
  const navigate = useNavigate(); // Fixed typo
  const [selectedKey, setSelectedKey] = useState("1");
  const [branchData,setBranchData]=useState();
  useEffect(()=>{
    getAllQueries()
  },[])
  const getAllQueries = () => {
    fetch("http://localhost:3000/franchises")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch queries");
        }
        return res.json();
      })
      .then((data) => {
        setBranchData(data);
      })
      .catch((error) => {
        console.error("Error fetching queries:", error);
        toast.error("Failed to fetch queries");
      });
  };
console.log(branchData)
  return (
    <div>
      <CustomLayout selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
        <BranchForm getAllQueries={getAllQueries}/>
        <BranchList branchData={branchData} setBranchData={setBranchData}/>
      </CustomLayout>
    </div>
  );
};

export default AddBranch;
