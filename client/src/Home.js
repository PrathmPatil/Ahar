import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomLayout from "./Layout";

const Home = ({ sideBarValue }) => {
  const navigate = useNavigate(); // Fixed typo
  const [customerlist, listupdate] = useState(null);
  const [selectedKey, setSelectedKey] = useState("1");

  console.log(sideBarValue);
  //   useEffect(() => {
  //     let userrole = sessionStorage.getItem("userrole");
  // console.log(userrole)
  //     if (userrole === "admin") {
  //       navigate("/Admin");
  //     } else {
  //       navigate("/nouser");
  //     }
  //   }, [navigate]);

  // Uncomment and adjust the fetch request if needed

  return (
    <div>
      <CustomLayout selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
        <h1 className="text-center">Welcome</h1>
      </CustomLayout>

      {/* Render your customer data table here if needed */}
    </div>
  );
};

export default Home;
