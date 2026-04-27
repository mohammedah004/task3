'use client';
import { LoadingCompnent } from "@/components/loading";
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react"

export default function Login() {
      const [state ,setState]=useState("");
      const nameRef=useRef(null);
      const passRef=useRef(null);
      const router=useRouter();
      const [showLoading,setShowLoading]=useState(false)


      function handelSubmit(e){
            e.preventDefault();
            if(nameRef.current.value==="admin"&&passRef.current.value==="admin"){
                  setState("Loading... ✅ ")
                  setShowLoading(true)
                  router.push("/Dashboard")
            }
            else{
                  setState("Username or Password is Wrong ")
                  restInput()
            }
      }

      function restInput(){
            nameRef.current.value=""
            passRef.current.value=""
      }

      return(
            <>
            {showLoading && <LoadingCompnent />}

      <div className="Logincontaner">
            <div className="LoginFormBox">
            <form className="LoginForm" onSubmit={handelSubmit}>
                  <h3>Login</h3>

                  {/* --- إظهار الحالة هنا --- */}
                  {state && (
                        <div style={{
                        padding: '10px',
                        marginBottom: '10px',
                        backgroundColor: state.includes('✅') ? '#d4edda' : '#f8d7da',
                        color: state.includes('✅') ? '#155724' : '#721c24',
                        borderRadius: '5px',
                        textAlign: 'center'
                        }}>
                        {state}
                        </div>
                  )}

                  <div className="cont">
                        <div className="name">
                        <label  htmlFor="name" >Enter the UserName</label>
                        <input type="text" id="name" placeholder="Enter The Name" ref={nameRef} />
                  </div>

                  <div className="price">
                        <label htmlFor="pass">Enter the Password</label>
                        <input type="password"  id="pass" placeholder="Enter the Password" ref={passRef} />
                  </div>

                  </div>

                  <div className="info">
                        <p>UserName is <span>admin</span></p>
                        <p>Password is <span>admin</span></p>
                  </div>

                  <button type="submit">Login</button>
            </form>

            


            
            
      </div>
      </div>
            </>
      )

}
