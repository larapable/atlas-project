"use client";
import Navbar from "../components/Navbar";
import UserHeader from "../components/UserHeader";
import StrategyMapping from "../components/StrategyMapping";

const StratMapPage = () => {
  return (
    <div className="flex flex-row w-full bg-[#E9E9E9]">
      <Navbar/>
        <div className="flex-1 h-screen">
            <div className="flex-1 flex flex-col mt-8 ml-80">
              <StrategyMapping />
            </div>
        </div>
    </div>
  )
}

export default StratMapPage