import React, { useState } from 'react'
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
const Navbar = () => {

    const { scrollY } = useScroll();

    const [visible, setVisible] = useState(false);
    // const [prev, setPrev] = useState(0);

    const parentVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: "-4rem" },
    }

    function trackMotion(latest: number, prev: number){
        console.log(`latest : ${latest} and prev : ${prev}`)
        if(latest < prev){
            setVisible(false);
            console.log("visible");
        }
        else if (latest > 40 && latest > prev) {
         setVisible(true);
         console.log("hidden");
    }
    }

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        trackMotion(latest, 200);
        // setPrev(latest);
    })



  return (
        <motion.nav 
        variants={parentVariants}
        animate={visible ? "hidden" : "visible"}
        transition={{
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.6,
        staggerChildren: 0.05,
        }}

        className='fixed backdrop-blur-xl inset-x-0 top-2 flex bg-blue-300/50 justify-between shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] items-center max-w-3xl mx-auto rounded-lg  px-2 py-3'>
        <div className='flex items-center ml-2 gap-3'>
            <BsFillPatchQuestionFill color='red' className='cursor-pointer border-2 border-black shadow-[4px_4px_0_#000] roudned-lg size-9 -rotate-15'/>
            <div className='text-neutral-200 text-xl rounded-sm p-0.5 cursor-pointer font-primary'>
               DOUBTSHELL
            </div>
        </div>
        <div className='flex text-sm'>
            <motion.button
             initial={{ 
                y: 0,
                backgroundColor: "rgb(253, 224, 71)", 
             }}
             whileHover={{
                y:-3,
                backgroundColor: "white",
             }}
             transition={{
               y: { duration: 0.3, ease: "easeInOut" },
               backgroundColor: { duration: 3 },
             }}
             className='opacity-0 md:bg-yellow-300 opacity-100 shadow-[4px_4px_0_#000] rounded-sm h-[30px] w-[120px] mr-3 border-2 font-primary border-black cursor-pointer'>Login</motion.button>
            <motion.button 
            initial={{
                y:0
            }}
            whileHover={{
                y:-3,
                backgroundColor: "oklch(90.5% 0.182 98.111)"
            }}
            className='bg-white shadow-[4px_4px_0_#000] rounded-sm h-[30px] w-[120px] mr-3 border-2 font-primary border-black cursor-pointer'>Register</motion.button>
        </div>
    </motion.nav>

  )
}

export default Navbar