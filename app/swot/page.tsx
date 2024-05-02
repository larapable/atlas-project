"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UserHeader from "../components/UserHeader";
import { FaPlus } from "react-icons/fa";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";

interface SwotItem {
  id: string;
  value: string;
}

const Swot = () => {
  const [displaySwot, setDisplaySwot] = useState(true);
  const [soApiResponse, setSoApiResponse] = useState("");
  const [woApiResponse, setWoApiResponse] = useState("");
  const [stApiResponse, setStApiResponse] = useState("");
  const [wtApiResponse, setWtApiResponse] = useState("");

  const delay = (ms: number | undefined) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const generateStrategies = async () => {
    callSOAPI();
    await delay(1000); // Delay before calling the second function
    callWOAPI();
    await delay(1000); // Delay before calling the third function
    callSTAPI();
    await delay(1000); // Delay before calling the fourth function
    callWTAPI();
  }

  const callWTAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that mitigate your weaknesses (W) to avoid threats (T) and must keep your entire response within 1 sentence. No extra words.  Do not output any markdown. You should output in this format: W1T1: sentence here. ||(new line) W2T2: sentence here.";
  
      const weaknessesInput = weaknesses.items
        .map(
          (weakness, index) =>
            `${index + 1}. ${weakness.id}: ${weakness.value}`
        )
        .join("\n");
  
      const threatsInput = threats.items
        .map(
          (threats, index) =>
            `${index + 1}. ${threats.id}: ${threats.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nWeaknesses:\n${weaknessesInput}\n\nThreats:\n${threatsInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";

      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("||");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/wtStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setWtApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setWtApiResponse("An error occurred while calling the API");
    }
  }

  const callSTAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that leverage your strengths (S) to avoid threats (T) and must keep your entire response within 1 sentence. No extra words. Do not output any markdown. You should output in this format: S1T1: sentence here. ||(new line) S2T2: sentence here.";
  
      const strengthsInput = strengths.items
        .map(
          (strengths, index) =>
            `${index + 1}. ${strengths.id}: ${strengths.value}`
        )
        .join("\n");
  
      const threatsInput = threats.items
        .map(
          (threats, index) =>
            `${index + 1}. ${threats.id}: ${threats.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nStrengths:\n${strengthsInput}\n\nThreats:\n${threatsInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
  
      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("||");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/stStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setStApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setStApiResponse("An error occurred while calling the API");
    }
  }

  const callWOAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that mitigate your weaknesses (W) to capitalize on opportunities (O) and must keep your entire response within 1 sentence. No extra words.  Do not output any markdown. You should output in this format: W1O1: sentence here. ||(new line) W2O2: sentence here.";
  
      const weaknessesInput = weaknesses.items
        .map(
          (weakness, index) =>
            `${index + 1}. ${weakness.id}: ${weakness.value}`
        )
        .join("\n");
  
      const opportunitiesInput = opportunities.items
        .map(
          (opportunities, index) =>
            `${index + 1}. ${opportunities.id}: ${opportunities.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nWeaknesses:\n${weaknessesInput}\n\nOpportunities:\n${opportunitiesInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
  
      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("||");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/woStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setWoApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setWoApiResponse("An error occurred while calling the API");
    }
  }

  const callSOAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that leverage your strengths (S) to capitalize on opportunities (O) and must keep your entire response within 1 sentence. No extra words.  Do not output any markdown. You should output in this format: S1O1: sentence here. ||(new line) S2O2: sentence here.";
  
      const strengthsInput = strengths.items
        .map(
          (strength, index) =>
            `${index + 1}. ${strength.id}: ${strength.value}`
        )
        .join("\n");
  
      const opportunitiesInput = opportunities.items
        .map(
          (opportunities, index) =>
            `${index + 1}. ${opportunities.id}: ${opportunities.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nStrengths:\n${strengthsInput}\n\nOpportunities:\n${opportunitiesInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
  
      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("||");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/soStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setSoApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setSoApiResponse("An error occurred while calling the API");
    }
  };


  // Reusable SWOT function
  const useSwot = (idPrefix: string, initialItems: SwotItem[] = []) => {
    const [items, setItems] = useState<SwotItem[]>(initialItems);
    const [newItem, setNewItem] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const handleAddClick = () => {
      setIsAdding(!isAdding);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewItem(event.target.value);
    };

    const addItem = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && newItem.trim()) {
        if (items.length >= 5) {
          toast.error("Maximum limit of 5 items reached");
        } else {
          setItems((prevItems) => [
            ...prevItems,
            { id: `${idPrefix}${prevItems.length + 1}`, value: newItem.trim() },
          ]);
          setNewItem("");
          setIsAdding(false);
        }
      }
    };

    return { items, newItem, isAdding, handleAddClick, handleChange, addItem };
  };

  // Use the reusable SWOT function for each category
  const strengths = useSwot("S");
  const weaknesses = useSwot("W");
  const opportunities = useSwot("O");
  const threats = useSwot("T");

  const [showOptions, setShowOptions] = useState(false);

  // Function to toggle visibility of options
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="flex flex-row w-full bg-[#f7f6f6]">
      <Navbar />
      <div className="flex-1">
        <UserHeader />
        <div className="flex-1 flex flex-col mt-8 ml-8 ">
          <div className="flex flex-col mb-16">
            <div className="mb-5 inline-block self-start break-words font-bold text-[1.9rem] text-[#000000]">
              SWOT Analysis
            </div>
            <span className="break-words font font-normal text-[1.3rem] text-[#504C4C]">
              Assess your project's strengths, weaknesses, opportunities,
              and threats effortlessly. Our AI-powered tool generates insightful
              strategies tailored to your analysis, empowering you to make
              informed decisions and drive your project forward with confidence.
            </span>
          </div>

          {/* SWOT/STRATEGIES Toggle */}
          <div className=" flex flex-row self-start box-sizing-border mt-5 mb-5">
            <div
              className="flex flex-row box-sizing-border mr-10"
              onClick={() => setDisplaySwot(true)}
            >
              <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
                SWOT 
              </div>
            </div>
            <div
              className="flex flex-row box-sizing-border"
              onClick={() => setDisplaySwot(false)}
            > 
              <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]"> 
                STRATEGIES
              </div>
            </div>
          </div>

          {displaySwot ? (
            <div className="flex flex-col"> 
              {/* SWOT CONTAINER */}
              <div className="flex flex-row gap-4">
                {/* Strengths Card */} 
                <Card className=" flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[23.9rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Strengths
                      </span>
                      <FaPlus 
                        className="text-white w-6 h-6 cursor-pointer relative" 
                        onClick={strengths.handleAddClick}
                      />
                    </div> 
                    {/* Input field for adding strengths (appears when isAdding is true) */}
                    <div className="relative">
                      {strengths.isAdding && (
                        <TextField
                          autoFocus
                          fullWidth 
                          variant="standard" 
                          placeholder="Type strength and press Enter" 
                          value={strengths.newItem} 
                          onChange={strengths.handleChange} 
                          onKeyDown={strengths.addItem} 
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md" 
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem", 
                          }}
                        />
                      )} 
                    </div>
                    {/* List of strengths */}
                    <div className=" flex flex-col overflow-auto "> 
                      {strengths.items.map((strength) => (
                        <div 
                          key={strength.id} 
                          className="flex justify-between items-center p-2 border-b border-gray-700 break-words"
                        >
                          <span className="text-lg ml-3"> 
                            {strength.id}: {strength.value}
                          </span> 
                          {/* Options icon (assuming you want to add options later) */}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor" 
                            onClick={toggleOptions} 
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16" 
                            /> 
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div> 
                </Card>

                {/* Weaknesses Card (similar structure to Strengths Card) */}
                <Card className=" flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[23.9rem]">
                <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Weaknesses
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={weaknesses.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {weaknesses.isAdding && (
                        <TextField
                          autoFocus
                          fullWidth
                          variant="standard"
                          placeholder="Type weakness and press Enter"
                          value={weaknesses.newItem}
                          onChange={weaknesses.handleChange}
                          onKeyDown={weaknesses.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {weaknesses.items.map((weaknesses) => (
                        <div
                          key={weaknesses.id}
                          className="flex justify-between items-center p-2 border-b border-gray-700 break-words"
                        >
                          <span className="text-lg ml-3">
                            {weaknesses.id}: {weaknesses.value}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={toggleOptions}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card> 

                {/* Opportunities Card (similar structure to Strengths Card) */}
                <Card className=" flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[23.9rem]"> 
                <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Opportunities
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={opportunities.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {opportunities.isAdding && (
                        <TextField
                          autoFocus
                          fullWidth
                          variant="standard"
                          placeholder="Type strength and press Enter"
                          value={opportunities.newItem}
                          onChange={opportunities.handleChange}
                          onKeyDown={opportunities.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {opportunities.items.map((opportunities) => (
                        <div
                          key={opportunities.id}
                          className="flex justify-between items-center p-2 border-b border-gray-700 break-words"
                        >
                          <span className="text-lg ml-3">
                            {opportunities.id}: {opportunities.value}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={toggleOptions}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card> 

                {/* Threats Card (similar structure to Strengths Card) */}
                <Card className=" flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[23.9rem]"> 
                <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Threats
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={threats.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {threats.isAdding && (
                        <TextField
                          autoFocus
                          fullWidth
                          variant="standard"
                          placeholder="Type strength and press Enter"
                          value={threats.newItem}
                          onChange={threats.handleChange}
                          onKeyDown={threats.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {threats.items.map((threats) => (
                        <div
                          key={threats.id}
                          className="flex justify-between items-center p-2 border-b border-gray-700 break-words"
                        >
                          <span className="text-lg ml-3">
                            {threats.id}: {threats.value}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={toggleOptions}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card> 
              </div>

              {/* Generate Strategies Button */}
              <div className="flex justify-center ml-[-3rem]"> 
                <button 
                  onClick={generateStrategies}
                  className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border-[0.1rem_solid_#EFAF21] bg-[#FAD655] mt-10 relative flex flex-row justify-center self-center pt-3 pb-4 pl-1 w-[24.1rem] box-sizing-border" 
                >
                  <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Generate Strategies 
                  </span>
                </button>
              </div> 
            </div> 
          ) : (
            // STRATEGIES CONTAINER (similar structure to SWOT CONTAINER)
            <div className="flex flex-col">
              <div className="flex flex-row gap-[5rem]">
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        S - O Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                      <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                        {soApiResponse}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        W - O Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                      </div>
                        <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {woApiResponse}
                          </p>
                        </div>
                  </div>
                </Card>
              </div>
              <div className="flex flex-row gap-[5rem]">
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        S - T Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {stApiResponse}
                          </p>
                    </div>
                  </div>
                </Card>
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        W - T Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {wtApiResponse}
                          </p>
                      </div>
                  </div>
                </Card>
              </div>
            </div> 
          )} 
        </div>
      </div> 
    </div>
  );
};

export default Swot;