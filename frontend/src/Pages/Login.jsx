import React from 'react'
import {useFormik} from 'formik'
import { Link } from 'react-router-dom'
const initialValues  = {
    email : "",
    password : ""
}
const user = {
  email: "amazue@gmail.com",
  password: "chima12345"
}

const validate = values => {
    const errors = {}
    if(!values.email){
        errors.email = "Required"
    }else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format'
  }

    if(!values.password){
        errors.password = "Required"
    }else if(values.password.length < 8 || !values.password.includes(values.password[0].toUpperCase())){
        errors.password = "Invalid password"
    }
    return errors

 
}




function Login() { 

    const formik = useFormik({
    initialValues,
    validate,
    onSubmit: values => {
      if (values.email === user.email && values.password === user.password) {
        alert("Welcome!")
      } else {
        alert("Invalid credentials")
      }
    }
  })
  return (
    <div className='flex center justify-center'>

<form action=""
onSubmit={formik.handleSubmit}
className='mt-[100px] '
>
    <h1 className='text-2xl font-bold mb-[20px] pl-[130px] ' >Login</h1>
    <label htmlFor="email" >Email</label> <br />
    <input type="email"
    id='email'
    name= "email"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}
    placeholder='Input Email'
    autoComplete='on'
    autoFocus = {true}className='bg-[#3566bb50] w-[320px] h-[50px] rounded-[10px] mb-[20px] mt-[10px]b outline-none p-[10px]'
    >
    
    </input>
 
 {
    formik.touched.email && formik.errors.email ? 
    (
        <div className='text-red-600'>
            {formik.errors.email}
        </div>
    ): null
 }
<br />

<label htmlFor="password">Password</label><br />
 <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className='bg-[#3566bb50] w-[320px] h-[50px] rounded-[10px] mt-[10px] outline-none p-[10px]'
          placeholder='Password'
        />

 {formik.touched.password && formik.errors.password ? (
          <div className='text-red-600'>{formik.errors.password}</div>
        ) : null}
<br />
        <button type='submit' className='bg-[#3566bb] cursor-[pointer] w-[320px] h-[50px] mt-[20px] rounded-[10px] mt-[10px] text-white font-bold'>
            Login
        </button> <br />
         <button type='submit' className='bg-[#3566bb] cursor-[pointer] w-[320px] h-[50px] mt-[20px] rounded-[10px] mt-[10px] text-white font-bold'>
<Link to="/register">Sign up</Link>
        </button>
</form>


    </div>
  )
}

export default Login