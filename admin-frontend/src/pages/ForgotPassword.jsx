import { useState } from 'react';
import '../styles/auth.css'

const ForgotPassword = () =>{

    const onSubmitHandle = async (e) =>{
      e.preventDefault();
      const email = e.target.email.value;
      console.log(email)
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/forgot-password`,{
              method:"POST",
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({email})
            });

        }catch(e){

        }
    }

    return(
         <div className="register-main-container">
      <div className="register-card" style={{ maxWidth: '450px' }}>
        
        <form onSubmit={onSubmitHandle} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email Address" required />
          </div>

          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
    )
}

export default ForgotPassword;