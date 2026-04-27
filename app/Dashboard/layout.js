import React from 'react'
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import CommonLoader from "@/components/commonLoader"

export default function DashboardLayout  ({children}) {
      return (
            <div className="contaner">
                  <CommonLoader />
                  <Sidebar />
                  <div className="content">
                        <Header />
                  {children}</div>
                  </div>
      )
}
