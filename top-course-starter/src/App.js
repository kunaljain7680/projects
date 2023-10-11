import React from "react";
import { apiUrl, filterData } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
const App = () => {
  
  const [courses, setCourses] = useState(null);

  // loading wale spinner k lie

  const [loading, setLoading] = useState(true);

  // category made for switching bwteeen different categories

  const[category,setCategory]=useState(filterData[0].title); // all se initialise karvali

  // ye function sare k sare courses ka data fetch karke le ata h

  async function fetchData() {
    // till api call data fetches show spiner

    setLoading(true);

    try {
      let response = await fetch(apiUrl);
      let output = await response.json();

      // output k andar sara data pada h from api call

      setCourses(output.data);
    } catch (error) {
      toast.error("Network issue");
    }

    // when data is fetched

    setLoading(false);
  }

  // function call k lie

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2 ">
      <div>
        <Navbar></Navbar>
      </div>

      {/* making this div for background-color to be given to it*/}

{/* filter k dwara category set hojegi and cards se vo category ke cards show honge */}

      <div>
        <div>
          <Filter filterData={filterData} category={category} setCategory={setCategory}></Filter>
        </div>

{/* filter se update ho ke category set hogi */}

        <div className="w-11/12 max-w-[1200px] mx-auto flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? <Spinner></Spinner> : <Cards courses={courses} category={category}></Cards>}
        </div>
      </div>
    </div>
  );
};

export default App;
