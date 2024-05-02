"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Card, TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { wrap } from "module";

interface SwotItem {
  id: string;
  value: string;
}

const Swot = () => {
  const [displaySwot, setDisplaySwot] = useState(true);
  const [strengthInput, setStrengthInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleStrengthInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStrengthInput(event.target.value);
  };

  const callGeminiAPI = async () => {
    try {
      const systemPrompt =
        "You are an AI assistant that provides SWOT insights and must keep your entire response within 1 sentence. No extra words.";

      const strengthsInput = strengths.items
        .map(
          (strength, index) => `${index + 1}. ${strength.id}: ${strength.value}`
        )
        .join("\n");

      const weaknessesInput = weaknesses.items
        .map(
          (weakness, index) => `${index + 1}. ${weakness.id}: ${weakness.value}`
        )
        .join("\n");

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
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
                    text: `${systemPrompt} \n\nStrengths:\n${strengthsInput}\n\nWeaknesses:\n${weaknessesInput}`,
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

      // Save the API response to the database
      const databaseResponse = await fetch("/api/swot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response: apiResponse }),
      });

      if (!databaseResponse.ok) {
        console.error("Error saving response to database", databaseResponse);
      }

      setApiResponse(apiResponse);
      console.log(apiResponse);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setApiResponse("An error occurred while calling the API");
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
  //For Strategies
  const strengthsOpportunities = useSwot("SW");
  const weaknessOpportunities = useSwot("Wo");
  const strengthsThreats = useSwot("ST");
  const weaknessThreats = useSwot("WT");

  const [showOptions, setShowOptions] = useState(null);

  const toggleOptions = (id: any) => {
    setShowOptions(showOptions === id ? null : id);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = (index: number) => {
    console.log(`Delete clicked for input ${index}`);
  };

  return (
    <div className="flex flex-row w-full h-screen bg-[#eeeeee]">
      <Navbar />
      <div className="flex-1">
        {/* <UserHeader /> */}
        <div className="flex-1 flex flex-col mt-8 ml-80 ">
          <div className="flex flex-col mb-16">
            <div className="mb-5 inline-block self-start break-words font-bold text-[3rem] text-[#000000]">
              SWOT ANALYSIS
            </div>
            <span className="break-words font font-normal text-[1.3rem] text-[#504C4C]">
              Assess your project&#39;s strengths, weaknesses, opportunities,
              and threats effortlessly. Our AI-powered tool generates insightful
              strategies tailored to your analysis, empowering you to make
              informed decisions and drive your project forward with confidence.
            </span>
          </div>
          {/* IF I HOVER OR ICLICK ANG SWOT OR STRATEGIES KAY NAAY UNDERLINE MAG STAY BELOW SA WORD, PWEDE KA MAG INSERT UG ICON BEFORE SA WORDS */}
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
              <div className="flex flex-row gap-4 ml-2">
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
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
                    <div className="relative">
                      {strengths.isAdding && (
                        <input
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
                    <div className=" flex flex-col overflow-auto ">
                      {strengths.items.map((strength) => (
                        <div
                          key={strength.id}
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {strength.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {strength.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(strength.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>

                            {showOptions === strength.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Edit")}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Delete")}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
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
                        <input
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
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {weaknesses.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {weaknesses.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(weaknesses.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>
                            {showOptions === weaknesses.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Edit")}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Delete")}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
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
                        <input
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
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {opportunities.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {opportunities.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(opportunities.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>
                            {showOptions === opportunities.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Edit")}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Delete")}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
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
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {threats.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {threats.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(threats.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>
                            {showOptions === threats.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Edit")}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => console.log("Delete")}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-center ml-[-4rem]">
                <button
                  onClick={callGeminiAPI}
                  className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border-[0.1rem_solid_#EFAF21] bg-[#FAD655] mt-10 relative flex flex-row justify-center self-center pt-3 pb-4 pl-1 w-[24.1rem] box-sizing-border"
                >
                  <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Generate Strategies
                    {/* if iclick kay maopen dapat ang strategies, ilink nalang guro ni ari */}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* STRATEGIES CONTAINER */}
              <div className="flex flex-row gap-[5rem]">
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        S - O Strategies
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={strengthsOpportunities.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {strengthsOpportunities.isAdding && (
                        <input
                          placeholder="Type strength and press Enter"
                          value={strengthsOpportunities.newItem}
                          onChange={strengthsOpportunities.handleChange}
                          onKeyDown={strengthsOpportunities.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <p>{apiResponse}</p>
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
