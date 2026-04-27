"use client";
import React, { useRef, useState } from 'react'

export default function AddProducts () {
      const nameRef=useRef(null);
      const priceRef=useRef(null);
      const imgRef=useRef(null);
      const monthRef=useRef(null);
      const [state ,setState]=useState("")
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



      function handelSubmit(e){
            e.preventDefault();
            const name = nameRef.current.value;
            const price = priceRef.current.value;
            const month = monthRef.current.value;
            if(name==="" || price ==="" ||month===""){
                  alert("Please fill all fields");
                  return;
            }
            else{
                  
                  sendData();

            }

      }

      

      const sendData=async ()=>{
            setState("Waitting for response...");

            // 1. نأخذ المسار الوهمي مثل C:\fakepath\image.jpg
            const fullPath = imgRef.current.value; 
            // 2. نقصه عند الفواصل المائلة ونأخذ آخر قطعة (اسم الصورة فقط)
            const fileName = fullPath.split(/(\\|\/)/).pop();
            const data={
                  name:`${nameRef.current.value}`,
                  price:`${priceRef.current.value}`,
                  img:`${fileName}`,
                  date:`${monthRef.current.value}`
            }

            try {
                  const response=await fetch(("http://localhost:4000/products"),{
                        method:`POST`,
                        headers: {
                              "Content-Type": "application/json", 
                              },
                        body:JSON.stringify(data),
                  });

                  if(response.ok){
                        setState("Product Added Successfully! ✅")
                        ResetInput()
                  }
                  else{
                        setState("Error in Network ❌");
                  }

            } catch (error) {
                  setState("Can not connect to Database 📡");
            }
      }

      function ResetInput(){
            nameRef.current.value=""
            priceRef.current.value=""
            monthRef.current.value=""
            imgRef.current.value=null
      }

      
      return (
      <div className="FormBox">
            <form className="ProductForm" onSubmit={handelSubmit}>
                  <h3>Add Pruduct</h3>

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
                        <label  htmlFor="name" >Enter the name of product</label>
                        <input type="text" id="name" placeholder="Enter The Name" ref={nameRef} />
                  </div>

                  <div className="price">
                        <label htmlFor="price">Enter the price</label>
                        <input type="number"  id="price" placeholder="Enter the price" ref={priceRef} />
                  </div>

                  <label htmlFor="month">Enter the Month</label>
                  <select id="month" ref={monthRef}>
                  <option value="" disabled selected>Select The Month</option>
                  {months.map((ele,index)=>{
                        return(
                              <option value={ele} key={index}>{ele}</option>
                        )
                  })}
                  </select>

                  <div className="img">
                        <label htmlFor="photo">Enter the Photo</label>
                        <input type="file" id="photo" placeholder="Enter the price" ref={imgRef} />
                  </div>
                  
                  </div>

                  <button type="submit">Create Product</button>
            </form>

            


            
            
      </div>
      )
}
