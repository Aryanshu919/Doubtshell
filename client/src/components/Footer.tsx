import { BsFillPatchQuestionFill } from 'react-icons/bs'

const Footer = () => {
  const Links = ["PRIVACY", "TERMS", "SUPPORT", "API", "STATUS"];


  return (
    <div>
        <div className='bg-black py-30'>
        <div className='flex items-center justify-center ml-2 gap-5'>
            <BsFillPatchQuestionFill color='orange' className='cursor-pointer border-2 border-white rounded-sm shadow-[4px_4px_0_#fff] bg-white roudned-lg size-9 -rotate-15'/>
            <div className='text-neutral-200 text-xl rounded-sm p-0.5 cursor-pointer font-primary'>
               DOUBTSHELL
            </div>
        </div>
        <div className='flex items-center justify-center gap-10 mt-10 font-secondary font-semibold'>
            {
                Links.map(((link,index) => (
                    <div key={index} className='text-white cursor-pointer'>{link} </div>
                )))
            }
        </div>
        <div className='flex justify-center mt-10'>
            <p className='text-white font-secondary '>© 2025 Doubtshell. Built with ❤️ for Students.</p>
        </div>

        <div>
          
        </div>

        </div>
    </div>
  )
}

export default Footer