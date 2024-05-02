import React, { useState, ChangeEvent } from 'react';

const StrategyMapping = () => {

    const [showVisionCard, setShowVisionCard] = useState(false);
    const [showValuesCard, setShowValuesCard] = useState(false);
    const [showMissionCard, setShowMissionCard] = useState(false);
    const [visionSaved, setVisionSaved] = useState(false);
    const [valuesSaved, setValuesSaved] = useState(false);
    const [missionSaved, setMissionSaved] = useState(false);
    const [visionInput, setVisionInput] = useState('');
    const [valuesInput, setValuesInput] = useState('');
    const [missionInput, setMissionInput] = useState('');
    const [showVisionDropdown, setShowVisionDropdown] = useState(false);
    const [showValuesDropdown, setShowValuesDropdown] = useState(false);
    const [showMissionDropdown, setShowMissionDropdown] = useState(false);
    const [buttonVisionLabel, setVisionButtonLabel] = useState('Add');
    const [buttonValuesLabel, setValuesButtonLabel] = useState('Add');
    const [buttonMissionLabel, setMissionButtonLabel] = useState('Add');
    const [textareaDisabled, setTextareaDisabled] = useState(false);

    const handleTextareaChange = (setStateFunction: React.Dispatch<React.SetStateAction<string>>, event: ChangeEvent<HTMLTextAreaElement>) => {
        setStateFunction(event.target.value);
    };
    const toggleDropdown = (section: string) => {
        switch (section) {
            case 'vision':
                setShowVisionDropdown(!showVisionDropdown);
                break;
            case 'values':
                setShowValuesDropdown(!showValuesDropdown);
                break;
            case 'mission':
                setShowMissionDropdown(!showMissionDropdown);
                break;
            default:
                break;
        }
    };

    const handleMoreClick = (section: string) => {
        toggleDropdown(section);
    };

    const handleAddClick = (section: string, setButtonLabel: React.Dispatch<React.SetStateAction<string>>, setTextareaDisabled: React.Dispatch<React.SetStateAction<boolean>>) => {
        toggleDropdown(section);
        switch (section) {
            case 'vision':
                setShowVisionCard(true);
                setVisionSaved(false);
                setVisionButtonLabel('Save');
                setTextareaDisabled(false);
                break;
            case 'values':
                setShowValuesCard(true);
                setValuesSaved(false);
                setValuesButtonLabel('Save');
                setTextareaDisabled(false);
                break;
            case 'mission':
                setShowMissionCard(true);
                setMissionSaved(false);
                setMissionButtonLabel('Save');
                setTextareaDisabled(false);
                break;
            default:
                break;
        }
    };
    const handleVisionSaveClick = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>, setButtonLabel: React.Dispatch<React.SetStateAction<string>>, setTextareaDisabled: React.Dispatch<React.SetStateAction<boolean>>) => {
        setStateFunction(true);
        setVisionButtonLabel('Edit');
        setTextareaDisabled(true);
    };
    const handleValuesSaveClick = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>, setButtonLabel: React.Dispatch<React.SetStateAction<string>>, setTextareaDisabled: React.Dispatch<React.SetStateAction<boolean>>) => {
        setStateFunction(true);
        setValuesButtonLabel('Edit');
        setTextareaDisabled(true);
    };
    const handleMissionSaveClick = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>, setButtonLabel: React.Dispatch<React.SetStateAction<string>>, setTextareaDisabled: React.Dispatch<React.SetStateAction<boolean>>) => {
        setStateFunction(true);
        setMissionButtonLabel('Edit');
        setTextareaDisabled(true);
    };
    const handleDeleteClick = (section: string) => {
        toggleDropdown(section);
        // Additional logic for delete if needed
    };

  return (
    <div>
        <span className="break-words font-bold text-[3rem] text-[#000000]">
            Strategy Mapping
        </span>
        <div className="mt-8 grid grid-cols-3">
            {/* main container */}
            <div className="col-span-2">

            
            <div className="bg-[#FFFFFF] absolute left-[23.5rem] bottom-[0rem] flex flex-row p-[1.3rem_1.1rem_1.4rem_1.3rem] box-sizing-border w-[72.65rem] justify-center gap-10 border border-gray-300 hidden lg:flex">
                <div className="shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-yellow-500 bg-[#FFFFFF] relative m-[0_2.1rem_0_0] flex flex-row justify-center p-[0.9rem_0.7rem_0.9rem_0] w-[15rem] h-[fit-content] box-sizing-border hover:bg-[#FAD655]">
                    <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Financial
                    </span>
                </div>
                <div className="shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-yellow-500 bg-[#FFFFFF] relative m-[0_2.1rem_0_0] flex flex-row justify-center p-[0.9rem_0.1rem_0.9rem_0] w-[15rem] h-[fit-content] box-sizing-border hover:bg-[#FAD655]">
                    <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Stakeholder
                    </span>
                </div>
                <div className="shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-yellow-500 bg-[#FFFFFF] relative m-[0_1.8rem_0_0] flex flex-row justify-center p-[0.9rem_1.1rem_0.9rem_1.2rem] w-[15rem] box-sizing-border hover:bg-[#FAD655]">
                    <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Internal Process
                    </span>                                                                         
                </div>
                <div className="shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-yellow-500 bg-[#FFFFFF] relative flex flex-row justify-center p-[0.9rem_0.4rem_0.9rem_0.5rem] w-[15rem] box-sizing-border hover:bg-[#FAD655]">
                    <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Learning &amp; Growth
                    </span>
                </div>
            </div>
            </div>

           

            {/* vision-values-mission container */}
            <div className="col-span-1 flex justify-end hidden lg:flex">
            <div className="flex flex-col gap-[3rem] mt-[-6rem] mr-2">
                <div className="bg-white rounded-lg p-4 border border-gray-300 h-60 w-[30rem]">
                <div className="rounded-t-lg bg-[#8A252C] p-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">VISION</span>
                            <div className="relative">
                                <button className="px-2 py-1 bg-white text-[#8A252C] rounded hover:bg-[#FAD655] text-xl font-bold" onClick={() => handleMoreClick('vision')}>More</button>
                                {showVisionDropdown && (
                                    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10`}>
                                        <div className="py-1">
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleAddClick('vision', setVisionButtonLabel, setTextareaDisabled)}>{buttonVisionLabel}</button>
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleDeleteClick('vision')}>Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                </div>
                
                        {showVisionCard && !visionSaved && (
                            <div className="bg-white rounded-lg p-1 h-40 w-[28rem]">
                                <textarea className="w-full h-full px-4 py-2 rounded-lg focus:outline-none resize-none" placeholder="Enter your input here" value={visionInput} onChange={(e) => handleTextareaChange(setVisionInput, e)} disabled={textareaDisabled}></textarea>
                                <button onClick={() => handleVisionSaveClick(setVisionSaved, setVisionButtonLabel, setTextareaDisabled)} className="flex mt-[-12.89rem] ml-[18rem] px-2 py-1 bg-white text-[#8A252C] rounded hover:bg-[#FAD655] text-xl font-bold">Save</button>
                            </div>
                        )}
                        {visionSaved && (
                            <div className="bg-white rounded-lg p-1 h-40 w-[28rem] overflow-auto">
                                <div className="break-words">{visionInput}</div>
                            </div>
                        )}
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-300 h-60 w-[30rem]">
                <div className="rounded-t-lg bg-[#8A252C] p-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">VALUES</span>
                        <div className="relative">
                                <button className="px-2 py-1 bg-white text-[#8A252C] rounded hover:bg-[#FAD655] text-xl font-bold" onClick={() => handleMoreClick('values')}>More</button>
                                {showValuesDropdown && (
                                    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10`}>
                                        <div className="py-1">
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleAddClick('values', setValuesButtonLabel, setTextareaDisabled)}>{buttonValuesLabel}</button>
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleDeleteClick('values')}>Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                </div>
                
                        {showValuesCard && !valuesSaved && (
                            <div className="bg-white rounded-lg p-1 h-40 w-[28rem]">
                                <textarea className="w-full h-full px-4 py-2 rounded-lg focus:outline-none resize-none" placeholder="Enter your input here" value={valuesInput} onChange={(e) => handleTextareaChange(setValuesInput, e)} disabled={textareaDisabled}></textarea>
                                <button onClick={() => handleValuesSaveClick(setValuesSaved, setValuesButtonLabel, setTextareaDisabled)} className="flex mt-[-12.89rem] ml-[18rem] px-2 py-1 bg-white text-[#8A252C] rounded hover:bg-[#FAD655] text-xl font-bold">Save</button>
                            </div>
                        )}
                        {valuesSaved && (
                            <div className="bg-white rounded-lg p-1 h-40 w-[28rem] overflow-auto">
                                <div className="break-words">{valuesInput}</div>
                            </div>
                        )}
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300 h-60 w-[30rem]">
                <div className="rounded-t-lg bg-[#8A252C] p-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">MISSION</span>
                        <div className="relative">
                                <button className="px-2 py-1 bg-white text-[#8A252C] rounded hover:bg-[#FAD655] text-xl font-bold" onClick={() => handleMoreClick('mission')}>More</button>
                                {showMissionDropdown && (
                                    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10`}>
                                        <div className="py-1">
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleAddClick('mission', setMissionButtonLabel, setTextareaDisabled)}>{buttonMissionLabel}</button>
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleDeleteClick('mission')}>Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                </div>
                
                        {showMissionCard && !missionSaved && (
                            <div className="bg-white rounded-lg p-1 h-40 w-[28rem]">
                                <textarea className="w-full h-full px-4 py-2 rounded-lg focus:outline-none resize-none" placeholder="Enter your input here" value={missionInput} onChange={(e) => handleTextareaChange(setMissionInput, e)} disabled={textareaDisabled}></textarea>
                                <button onClick={() => handleMissionSaveClick(setMissionSaved, setMissionButtonLabel, setTextareaDisabled)} className="flex mt-[-12.89rem] ml-[18rem] px-2 py-1 bg-white text-[#8A252C] rounded hover:bg-[#FAD655] text-xl font-bold">Save</button>
                            </div>
                        )}
                        {missionSaved && (
                            <div className="bg-white rounded-lg p-1 h-40 w-[28rem] overflow-auto">
                                <div className="break-words">{missionInput}</div>
                            </div>
                        )}
                </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default StrategyMapping