import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import Input from './Input'
import {Logo, Button} from './index'
import { Link } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const[error,setError] = useState("")
    const {register,handleSubmit} = useForm()

    const login = async (data)=>{
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const getCurrentUser = await authService.getCurrentUser()

                if(getCurrentUser) dispatch(authLogin(getCurrentUser))
                Navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
      <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign Up
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
            <Input
            label="Email :"
            placeholder="Enter your email"
            type="email"
            {...register("email" , {
                required:true,
                validate:{
                    matchPattern: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"
                }
            })}
            />
            <Input
            label="Password :"
            placeholder="Enter your password"
            type="password"
            {...register("password" , {
                required:true
            })}
            />
            <Button
            className='w-full cursor-pointer'
            type='submit'
            >
            Sign In
            </Button>
          
        </div>
    </form>
    </div>
    </div>
  )
}

export default Login