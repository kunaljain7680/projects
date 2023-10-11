// import Card from "./Card";
import React from 'react'
import Card from './Card';
import  {useState} from 'react';
// map array pe lgta h vo single array pe

// object.courses return an array of courses of diffrerent type which has firther arrays and to iterate on each array do array.forEach() and then there is also courses data array and put all the objects in a single array

// jab mera app start hota h to sare k sare courses unliked hote h i.e likedCourses k array empty hota h
const Cards=(props)=>{

    let courses=props.courses;
    let category=props.category;

    const [likedCourses,setLikedCourses]=useState([]); // starting me koi bhi course liked nhi h

    console.log(courses);

   
// this function will return courses k object ka array received from api call

    function getCourses(){

        // show those cards whose category is selected

        if(category==="All"){
            let allCourses=[];

            Object.values(courses).forEach(array=>{
                array.forEach(courseData=>{
                    allCourses.push(courseData);
                })
            })
    
            return allCourses; 
        }

        else{

            // main sirf specific category ka array pass karunga

            return courses[category];
        }
       
    }

    return (

        <div className="flex flex-wrap justify-center gap-4 mb-4">

            {

// sare k sare courses k lie create card
                getCourses().map((course)=>{

                    // course is passed as a prop as har card ko har ek prop ka data
                    
                    return <Card key={course.id}  course={course} likedCourses={likedCourses} setLikedCourses={setLikedCourses}></Card>
                })
            }
            
        </div>
    )
}
    


export default Cards;
