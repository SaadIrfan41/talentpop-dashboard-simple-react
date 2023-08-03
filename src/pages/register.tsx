import RegisterFormImage from '@/assets/register.png'
import RegisterForm from '@/components/Forms/RegisterForm'
import { Bulp, HelpIcon, MessagesIcon } from '@/components/Icons'

const SignupPage = () => {
  return (
    <div className='flex h-screen w-full '>
      <div className=' flex w-full  max-w-[5rem] flex-col justify-between border-r-2 border-[#DCDBE1]'>
        <div className='mt-10 flex flex-col items-center justify-center gap-y-4'>
          <Bulp />
          <div className=' h-40 w-[0.063rem] bg-[#4BBA39] ' />
        </div>
        <div className='mt-10 flex flex-col items-center justify-center gap-y-8'>
          <HelpIcon />
          <MessagesIcon />
        </div>
      </div>
      <div className='grid w-full grid-cols-12     '>
        <div className=' col-span-12 mt-10  pl-10  pr-5   lg:col-span-7  lg:pl-16'>
          <h1 className={` mb-7 text-3xl font-bold text-[#69C920]`}>
            Create an Account
          </h1>
          <RegisterForm />
        </div>
        <div className='relative ml-auto hidden h-full w-full  lg:col-span-5 lg:block'>
          <div className='sticky bottom-0 top-0 '>
            <img
              placeholder='blur'
              className='  ml-auto  h-screen w-auto  '
              src={RegisterFormImage}
              alt='SignUP Form Image'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
