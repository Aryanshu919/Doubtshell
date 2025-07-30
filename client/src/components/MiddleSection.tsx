import React from 'react';
import { MdPushPin } from 'react-icons/md';
import { BiSolidMessage } from 'react-icons/bi';
import { RiRobot3Fill } from 'react-icons/ri';
import { HiTrophy } from 'react-icons/hi2';
import { FaUserGraduate } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';

const MiddleSection = () => {
  return (
    <div className='bg-rose-300 py-20'>
            <div className='text-center font-primary text-xl sm:text-3xl'>
                <h1>We Prodive the best features</h1>

                <p className='font-secondary mt-2 text-lg'>Everything you need to master your subject game</p>
            </div>
        <div className='grid max-w-[1280px] mx-auto content-center m-10 grid-rows-2 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-4 p-5'>
            <div className='bg-neutral-200 border-4 p-10 shadow-[4px_4px_0_#000]'>
                <div>
                    <MdPushPin className='bg-red-300 p-2 border-2 rotate-12 mb-2 rounded-xs shadow-[2px_2px_0_#000] border-black' color='white' size={60}/>
                </div>
                <div className='font-primary mt-5 text-xl'>
                    Organized Doubts
                </div>
                <div className='font-secondary mt-2'>
                    <p>	Tag doubts by subject and topic to keep everything neat and easily searchable.</p>
                </div>
            </div>
            <div className='bg-neutral-200 border-4 p-10 shadow-[4px_4px_0_#000]'>
                <div>
                    <BiSolidMessage className='bg-yellow-300 p-2 border-2 -rotate-12 mb-2 rounded-xs shadow-[2px_2px_0_#000] border-black' color='black' size={60}/>
                </div>
                <div className='font-primary mt-5 text-xl'>
                    Peer-Reviewed
                </div>
                <div className='font-secondary mt-2'>
                    <p>Upvote/downvote answers so the best, most accurate responses rise to the top.</p>
                </div>
            </div>
            <div className='bg-neutral-200 border-4 p-10 shadow-[4px_4px_0_#000]'>
                <div>
                    <RiRobot3Fill className='bg-orange-300 p-2 border-2 rotate-12 mb-2 rounded-xs shadow-[2px_2px_0_#000] border-black' color='white' size={60}/>
                </div>
                <div className='font-primary mt-5 text-xl'>
                   	Anonymous Mode
                </div>
                <div className='font-secondary mt-2'>
                    <p>aAsk questions privately to avoid hesitation or judgment from peers.</p>
                </div>
            </div>
            <div className='bg-neutral-200 border-4 p-10 shadow-[4px_4px_0_#000]'>
                <div>
                    <HiTrophy className='bg-blue-300 p-2 border-2 -rotate-12 mb-2 rounded-xs shadow-[2px_2px_0_#000] border-black' color='black' size={60}/>
                </div>
                <div className='font-primary mt-5 text-xl'>
                   	Leaderboards
                </div>
                <div className='font-secondary mt-2'>
                    <p>Encourage helpfulness with rankings for top doubt-solvers by subject.</p>
                </div>
            </div>
            <div className='bg-neutral-200 border-4 p-10 shadow-[4px_4px_0_#000]'>
                <div>
                    <FaUserGraduate className='bg-blue-300 p-2 border-2 mb-2 rounded-xs shadow-[2px_2px_0_#000] border-black' color='white' size={60}/>
                </div>
                <div className='font-primary mt-5 text-xl'>
                   	Tag Mentors
                </div>
                <div className='font-secondary mt-2'>
                    <p>Invite teachers or mentors for expert guidance on complex questions.</p>
                </div>
            </div>
            <div className='bg-neutral-200 border-4 p-10 shadow-[4px_4px_0_#000]'>
                <div>
                    <RiRobot2Fill className='bg-blue-300 p-2 border-2 rotate-12 mb-2 rounded-xs shadow-[2px_2px_0_#000] border-black' color='black' size={60}/>
                </div>
                <div className='font-primary mt-5 text-xl'>
                   	Tag Mentors
                </div>
                <div className='font-secondary mt-2'>
                    <p>	Get instant, GPT-generated answers to commonly asked academic questions <span className='italic'>(comming soon)</span></p>
                </div>
            </div>

        </div>
     
    </div>
  )
}

export default MiddleSection