import Logo from "@/assets/logo.png";

import LoginForm from "@/components/Forms/LoginForm";

const Login = () => {
  return (
    <div className=" mx-auto flex h-screen max-w-7xl flex-col items-center justify-center ">
      <img
      
        src={Logo}
        alt="TalentPop"
        className=" -ml-3 mb-6 object-contain"
      />

      <h1 className=" mx-auto mb-5 text-4xl font-black text-[#69C920] text-opacity-80">
        Log in
      </h1>
      <LoginForm />

      {/* <span className='ml-1 mt-5 text-lg font-normal text-[#69C920]'>
        Forgot password?
      </span> */}
    </div>
  );
};

export default Login;
