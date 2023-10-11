// import { click } from '@testing-library/user-event/dist/click';
// import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { toast } from 'react-toastify';
import React from 'react'
import {FcLike,FcLikePlaceholder} from 'react-icons/fc';

// {courses} means card
const Card = (props) => {
    
    let course=props.course;
    let likedCourses=props.likedCourses;  // iske andara track h ki konse courses kike kiye gaye hn

    let setLikedCourses=props.setLikedCourses;

//    like wale button pe click karne de current course check hoga ki vo like course h ki nahi , agar vo pehle se liked h to unlike it and if not liked then like it abnd show toast accordingly

    function clickHandler(){

        // logic

        // if likeCourses.includes check krta h liked courses wali array me kuj h
        
        if(likedCourses.includes(course.id)){
            // pehle se like hua pada tha

            // jo liked courses hn unki previous state pkdi and filters course who id == course id

            setLikedCourses((prev)=>prev.filter((cid)=>(cid!==course.id)));
            toast.warning("Like removed");
            
        }

        else{
            // pehle se liked nahi 
            // insert karna h ye liked courses me

            // lenght 0 pe new course id added

            if(likedCourses.length===0){
                setLikedCourses([course.id]);
            }

            else{
                // non-empty pehle se

                // purana + newcoursw id

                // if length non-zero then add prev + current course ki id

                // if length not zeo then prev vale k sath curr obj ka bhi course.id daldo 

                setLikedCourses((prev)=>[...prev,course.id]);

            }

            toast.success("Liked Successfully");
        }


    }

    return(
        <div className="w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden">
            
            <div className="relative">
                <img src={course.image.url}></img>

                <div className="w-[40px] h-[40px] bg-white rounded-full absolute right-2 bottom-[-11px] grid place-items-center">
                    <button onClick={clickHandler}>
                        {
                            likedCourses.includes(course.id) ? ( <FcLike fontSize="1.75rem"></FcLike>):( <FcLikePlaceholder fontSize="1.75rem"></FcLikePlaceholder>)
                        }
                       
                    </button>

                </div>
            </div>

            <div className="p-4 ">
                <p className="text-white font-semibold text-lg leading-6">{course.title}</p>
                <p className="mt-2 text-white">
                    {
                        course.description.length>100?(course.description.substr(0,100)+"..."):(course.description)
                    }
                </p>
            </div>

        </div>

        
    )
}

export default Card