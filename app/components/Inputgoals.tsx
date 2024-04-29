import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function Inputgoals() {

  const [isEditing, setIsEditing] = React.useState(true)
  const [officeVision, setOfficeVision] = React.useState('')
  const [valueProposition, setValueProposition] = React.useState('')
  const [strategicGoals, setStrategicGoals] = React.useState('')
  const [strategicGoals2, setStrategicGoals2] = React.useState('')
  const [strategicGoals3, setStrategicGoals3] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(new Date());
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()


    if (!officeVision || !valueProposition || !strategicGoals) {
      alert('Please fill out all fields')
      return;
    }

    try {
      const response = await fetch('api/inputGoals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          officeVision: officeVision,
          valueProposition: valueProposition,
          strategicGoals: strategicGoals,
          strategicGoals2: strategicGoals2,
          strategicGoals3: strategicGoals3,
          selectedDate: selectedDate,
          selectedEndDate: selectedEndDate
        })
      })
      if (response.ok) {
        alert('Goal setting saved successfully')
        setIsEditing(false)
      } else {
        alert('Failed to save goal setting')
      }
    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="bg-[#E9E9E9] flex flex-col items-center w-[90rem] box-sizing-border">
      <div className="bg-[#FFFFFF] relative m-[0_0_2.3rem_0] flex flex-row justify-between self-end p-[1.1rem_0_1.1rem_3.9rem] left-[11.5rem] top-[-2.5rem] w-[104rem] box-sizing-border">
        <div className="rounded-[0.6rem] bg-[#F0E8E8] relative flex flex-row p-[0.9rem_0_0.8rem_1.1rem] w-[32rem] box-sizing-border">
          <img className="m-[0_0.9rem_0_0] w-[1.6rem] h-[1.6rem]" />
          <div className="m-[0_0_0.1rem_0] flex flex-row justify-center box-sizing-border">
            <span className="break-words font-medium text-[1.3rem] text-[#B2B0B0]">
              Type something...
            </span>
          </div>
        </div>
        <img className="m-[0.6rem_0_1.1rem_0] w-[1.4rem] h-[1.6rem]" />
      </div>
      <div className="m-[0_43.2rem_0.9rem_0] ml-[-20rem] mt-[-3rem] inline-block break-words font-bold text-[3rem] text-[#000000]">
        GOAL SETTING
      </div>
      <div className="bg-[#EFAF21] m-[0_50.7rem_0.8rem_0] w-[6.4rem] h-[0.2rem] ml-[-25rem] ">
      </div>
      <div className="m-[0_2.5rem_1.9rem_2.5rem] inline-block self-end break-words font-normal text-[1.1rem] text-[#807C7C]">
        Goal setting involves defining specific objectives, outlining actionable steps, and establishing a timeframe for achievement. It provides direction and motivation <br />
        for personal or professional growth by creating clear targets to strive towards.
      </div>
      <div className="m-[0_41.8rem_0.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
        <span className="m-[0_0.3rem_0_0] ml-[-20rem] break-words font-semibold text-[1.3rem] text-[#000000]">
          Office Vision
        </span>
        <div className="m-[0.2rem_0_0.2rem_0] inline-block break-words font-semibold text-[0.9rem] text-[#DD1414]">
          *
        </div>
      </div>
      <div className="relative m-[0_23.7rem_0.7rem_0] ml-[-24rem] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
        A brief statement articulating the company&#39;s long-term goals and values.
      </div>
      <input
        type="text"
        onChange={(e) => setOfficeVision(e.target.value)}
        disabled={!isEditing} // Disable input when not editing
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[90rem] h-[8rem] p-2
        ${!isEditing ? 'bg-gray-300' : ''}`}
      />
      <div className="m-[0_38.8rem_0.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
        <span className="m-[0_0.5rem_0_0] ml-[-21.5rem] break-words font-semibold text-[1.3rem] text-[#000000]">
          Value Proposition
        </span>
        <div className="m-[0.1rem_0_0.3rem_0] inline-block break-words font-semibold text-[0.9rem] text-[#DD1414]">
          *
        </div>
      </div>
      <div className="m-[0_14.8rem_0.8rem_0] ml-[-23rem] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
        A concise statement that communicates the unique benefits and advantages of your service.
      </div>
      <input type="text"
        onChange={(e) => setValueProposition(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[90rem] h-[8rem] p-2
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </input>
      <div className="m-[0_41.1rem_0.5rem_0] ml-[-30rem] inline-block break-words font-semibold text-[1.3rem] text-[#000000]">
        Strategic Goals
      </div>
      <div className="m-[0_12.7rem_0.6rem_0] ml-[-22rem] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
        A guiding principles for decision-making, driving the organization towards its desired future state.
      </div>
      <input type="text"
        onChange={(e) => setStrategicGoals(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[90rem] h-[8rem] p-2
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </input>

      <input type="text"
        onChange={(e) => setStrategicGoals2(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[90rem] h-[8rem] p-2
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </input>

      <input type="text"
        onChange={(e) => setStrategicGoals3(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[90rem] h-[8rem] p-2
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </input>

      <div className="m-[0_10.5rem_0.4rem_0] flex flex-row justify-between w-[46.5rem] box-sizing-border">
        <span className="m-[0_0.8rem_0_0] ml-[-12rem] w-[31.4rem] break-words font-semibold text-[1.3rem] text-[#000000]">
          Start Date
        </span>
        <span className="break-words font-semibold text-[1.3rem] text-[#000000]">
          Target Completion Date
        </span>
      </div>
      <div className="m-[0_0_4.6rem_3.6rem] flex flex-row justify-between w-[61.3rem] box-sizing-border">
        <div className="rounded-[0.6rem] ml-[-12rem] border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative p-[0.9rem_1.1rem_0.8rem_1.1rem] w-[28.8rem] box-sizing-border">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="YYYY/MM/DD"
            className="break-words font-normal text-[0.9rem] text-[#807C7C] cursor-pointer w-[26.5rem]"
          />
        </div>
        <div className="rounded-[0.6rem] ml-[-12rem] border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative p-[0.9rem_1.1rem_0.8rem_1.1rem] w-[28.8rem] box-sizing-border">
          <DatePicker
            selected={selectedEndDate}
            onChange={(date: Date | null) => setSelectedEndDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="YYYY/MM/DD"
            className="break-words font-normal text-[0.9rem] text-[#807C7C] cursor-pointer w-[26.5rem]"
          />
        </div>
      </div>
      <div className="m-[0_0_0_10.3rem] ml-[5rem] mb-20 flex flex-row w-[25.8rem] box-sizing-border">
        {isEditing ? (
          <button onClick={handleSave} className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF]">
            <span className="break-words font-normal text-[1.3rem] text-[#962203]">
              Save
            </span>
          </button>
        ) : (
          <button onClick={handleEdit} className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF]">
            <span className="break-words font-normal text-[1.3rem] text-[#962203]">
              Edit
            </span>
          </button>
        )}

        <button className="rounded-[0.6rem] border-[0.1rem_solid_#FAD655] bg-[#FFFFFF] relative flex flex-row justify-center p-[0.8rem_0.5rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FAD655]">
          <span className="break-words font-normal text-[1.3rem] text-[#962203]">
            Cancel
          </span>
        </button>
      </div>
      <div className="bg-[url('/BlueGreyIllustrationBusinessGoalsFacebookPost71.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[22.5rem] top-[31rem] w-[7rem] h-[5.3rem]">
      </div>
      <div className="bg-[url('/BlueGreyIllustrationBusinessGoalsFacebookPost81.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[24.5rem] top-[18rem] w-[2.9rem] h-[3.6rem]">
      </div>
      <div className="bg-[url('/BlueGreyIllustrationBusinessGoalsFacebookPost91.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[24rem] top-[45.6rem] w-[5.3rem] h-[4.6rem]">
      </div>
    </div>
  )
}