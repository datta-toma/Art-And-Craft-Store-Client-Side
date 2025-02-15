
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../hook/useAuth';
import { useState } from 'react';
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";


import "./log.css"; 

const Login = () => {

    const {signInUser, loading} = useAuth();
  const [error, setError] = useState(null);



   const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        const {email, password} = data;

          signInUser(email, password)
          .then((result) =>{
            if(result.user){
              navigate(from);
            }
          })
    
          .catch(error =>{
            console.log(error)
            // Show error message using SweetAlert
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email and password do not match!',
        });
          })
  };

// //   spinner
//   if (loading) {
//     return <Spinner />; 
//   }

    
    return (
        <div>
            <div className="hero min-h-screen log-contain bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                             <h1 className="text-3xl font-bold text-center">Login</h1>
                            <label className="label">
                                 <span className="label-text">Email</span>
                            </label>
                               <input type="email" placeholder="email" className="input input-bordered" required 
                               {...register("email", { required: true })}
                                />
                                {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required
                         {...register("password", { required: true })}
                         />
                          {errors.password && <span>This field is required</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        </div>
                        <label>
                            Please here? <Link to="/sign-up" className="label-text-alt link link-hover ">
                              <span className='text-blue-800 ml-2'>Sign Up</span>
                            </Link>
                        </label>
                        <SocialLogin></SocialLogin>
                    </form>
                    
                    </div>
                </div>
            </div>
        </div>
    );
 };

export default Login;