import CreateLocationReservation from './component/CreateLocationReservation'
import CreateMember from './component/CreateMember'
import CreateReport from './component/CreateReport'
import CreateSportEquipment from './component/CreateSportEquipment';
import SportEquipmentData from './component/SportEquipmentData';
import CreateBorrow_Sport_Equipment from './component/CreateBorrow_Sport_Equipment';
import Login from './component/Login'
import Home from './component/Home'
import HomeMember from './component/HomeMember'
import HomeStaff from './component/HomeStaff'
import StaffLogin from './component/StaffLogin' 
import CreatePayment from './component/CreatePayment'
import CreateCheckInOut from './component/CreateCheckInOut'
import { Router, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"

function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Home />}> </Route>
      <Route path="/Login" element={<Login />}> </Route>
      <Route path="/StaffLogin" element={<StaffLogin />}> </Route>
      <Route path="/HomeMember" element={<HomeMember />}> </Route>
      <Route path="/HomeStaff" element={<HomeStaff />}> </Route>
      <Route path="/CreateMember" element={<CreateMember />}> </Route>
      <Route path="/CreateReport" element={<CreateReport />}> </Route>
      <Route path="/CreateLocationReservation" element={<CreateLocationReservation />}> </Route>
      <Route path="/sport_equipment_data" element={<SportEquipmentData />} />
      <Route path="/create_sport_equipment" element={<CreateSportEquipment />} /> 
      <Route path="/CreateBorrow_Sport_Equipment" element={<CreateBorrow_Sport_Equipment />} /> 
      <Route path="/CreatePayment" element={<CreatePayment />} />
      <Route path="/CreateCheckInOut" element={<CreateCheckInOut />} />


    </Routes>
  )
}
export default App;