import React from "react";

const Filter = (props) => {
  
  let filterData=props.filterData;
  let category=props.category;
  let setCategory=props.setCategory;

  function filterHandler(title){
    console.log(title);
    setCategory(title);

  };

  // multiple quantity of data k lie we want to use mutiple elements then use map

  return (

    

    <div className="w-11/12 flex flex-wrap max-w-max space-x-4 gap-y-4 mx-auto py-4 justify-center">
      {
        
        // har ek data k lie map chahiye and map it with a button

        // button se different cards a rhe hn so add Event listener

        // kisi bhi button pe click kar rhe to uska title as a parameter send hogya and vo fir category ke andar send ho jaega
        
        
        filterData.map((data)=>{

          // here onClick k andar humne ek arrow function bheja hai (it is simply function which is calling filterHandler

          // category ki value ka basis pe apply css on selected category

          // jis bhi buttn ko render karne nikle ho uski title ki value compare krwali

          // button ka title category se compare krke highlight karo
          
          return <button key={data.id}  className={`text-lg px-2 py-1 rounded-md font-medium text-white bg-black hover:bg-opacity-50 border-2 transition-all duration-300
          ${category===data.title?"bg-opacity-60 border-white":"bg-opacity-40 border-transparent" }
          `} onClick={()=> filterHandler(data.title)}>{data.title} </button>
        })
      }
    </div>
  );
};

export default Filter;
