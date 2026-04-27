"use client";
import React, { use, useEffect, useMemo, useState } from 'react'
import { Header } from "./header"
import { Card } from "./card"
import { Chart } from "./chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBoxOpen, faCirclePlus, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";


export const Content = () => {
      const path =usePathname();
      const [product,setProduct]=useState([]);
      const [user,setUser]=useState([]);
      const [totalSalse, SetTotalSalse]=useState(0)

      {/* Display only the Chosen months*/}
      const chartData =useMemo(()=>{
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const baseData =months.map((ele)=>({name:ele, salse:0}));

            product.forEach((item)=>{
                  const monthIndex=months.indexOf(item.date)
                  if(monthIndex!==-1){
                        baseData[monthIndex].salse+=Number(item.price || 0)
                  }
            })

            return baseData.filter((month)=> month.salse>0);

      },[product])

      


      {/*Start Fetching for Data */}     
      
      const getData=async ()=>{
            {/*Get Product */}
            try {
                  const ProductResponse=await fetch(("https://69ef3562112e1b968e242fb4.mockapi.io/db/products"),{
                        method:`GET`,
                  });

                  if(ProductResponse.ok){
                        const result=  await ProductResponse.json();
                        setProduct(result);
                  }
                  else{
                        console.log("Erorr in Try ")
                  }
            } catch (error) {
                  console.log("Erorr in connection")
            }


            {/*Get Users*/}
            try {
                  const UserResponse=await fetch(("https://69ef3562112e1b968e242fb4.mockapi.io/db/user"),{
                        method:`GET`,
                  });

                  if(UserResponse.ok){
                        const result=  await UserResponse.json();
                        setUser(result);
                  }
                  else{
                        console.log("Erorr in Try ")
                  }
            } catch (error) {
                  console.log("Erorr in connection")

            }
      }
            {/*End Fetching for Data */}     



      useEffect(()=>{
            getData();
      },[])




      

      useEffect(()=>{
            const sum=product.reduce((acc , curr)=> acc + Number(curr.price) ,0)
            SetTotalSalse(sum)
      },[product])


      return (
      <div className="content">

            <div className="box">

                  <Card 
                  type={`Sales`}
                  number={`${totalSalse}$`}
                  icon={faChartLine}
                  /> 

                  <Card 
                  type={`Proudects`}
                  number={`${product.length}`}
                  icon={faBoxOpen}
                  />

                  <Card 
                  type={`User`}
                  number={`${user?.length || 0}`}
                  icon={faUsersGear}
                  />

                  

                  <Card 
                  type={`Orders`}
                  number={`50`}
                  icon={faUsersGear}
                  />
            </div>

                  <Chart data={chartData} />

      </div>
      )
}
