import { Button, Card } from "@mui/material";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";

export default function UserEditProfile() {

  const {data: session,status, update } = useSession();

  let user;
  if(session?.user?.name) 
    user = JSON.parse(session?.user?.name as string);

  const [imageUrl, setImageUrl] = useState("");
  const [departmentLandline, setDepartmentLandline] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const [officeVision, setOfficeVision] = useState(
    "LOREM IPSUM LOREM IPSUN LOREM IPSUN LOREM IPSUN LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUN LOREM IPSUN "
  );
  const [valueProposition, setValueProposition] = useState(
    "LOREM IPSUM LOREM IPSUN LOREM IPSUN LOREM IPSUN LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUN LOREM IPSUN "
  );
  const [strategicGoals, setStrategicGoals] = useState(
    "LOREM IPSUM LOREM IPSUN LOREM IPSUN LOREM IPSUN LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUN LOREM IPSUN "
  );

  const department_id= user?.department_id;
  console.log("Department: ",department_id);

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await fetch("../api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departmentLandline: departmentLandline,
          location: location,
          university: university,
          departmentDescription: departmentDescription,
          departmentId: department_id
        }),
      });

      if (res.ok) {
        console.log("Edit successful");
       
      } else {
        console.log("User profile failed.");
      }
    } catch (error) {
      console.log("Error during saving user Profile", error);
    }
  };

  // const handleSave = () => {
  //   setHeadOfficer(headOfficer);
  //   setDepartmentLandline(departmentLandline);
  //   setEmail(email);
  //   setLocation(location);
  //   setUniversity(university);
  //   setDepartmentDescription(departmentDescription);
  // };
  return (
    <div className="flex flex-row">
      <Card className="w-[25rem] h-auto flex flex-col items-center justify-center rounded-2xl">
        <div className="border-[0.1rem] border-solid shadow-lg border-black border-opacity-60  w-48 h-48 my-4 py-4 flex items-center">
          {/* Conditionally render the image or the profile icon */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Department Image"
              className="border-[0.1rem] border-solid shadow-lg border-black border-opacity-60 w-48 h-48 my-4 py-4 object-cover rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-48 h-48"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>
        <span className="text-lg font-normal">Department</span>
        <div className="text-4xl font-bold text-center"></div>
        <Card className="flex flex-col w-[21rem] h-80 mt-10 mb-10 bg-[#E9E9E9] rounded-2xl">
          <div className=" flex flex-row items-center justify-center w-fit mx-8 mt-3">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-normal mt-2 mx-2">
                Head Officer
              </span>
  
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center w-fit mx-8">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col ">
              <span className="text-xs font-normal mt-2 mx-2">
                Department Landline
              </span>
              <input
                type="text"
                value={departmentLandline}
                className=" text-lg font-bold mx-2"
                onChange={(e) => setDepartmentLandline(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center w-fit mx-8">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </div>
            <div className="flex flex-col ">
              <span className="text-xs font-normal mt-2 mx-2">Email</span>
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center w-fit mx-8">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col ">
              <span className="text-xs font-normal mt-2 mx-2">Location</span>
              <input
                type="text"
                value={location}
                className=" text-lg font-bold mx-2"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center w-fit mx-8">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col ">
              <span className="text-xs font-normal mt-2 mx-2">University</span>
              <input
                type="text"
                value={university}
                className=" text-lg font-bold mx-2"
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </Card>
      <Card className="w-[64rem] h-auto flex flex-col rounded-2xl ml-10 mr-10">
        <div className="text-5xl font-bold text-center self-start mx-12 mt-12 mb-5">
          About Department
        </div>

        <textarea
          value={departmentDescription}
          className=" font-normal text-lg mx-12 h-32 p-5"
          onChange={(e) => setDepartmentDescription(e.target.value)}
        />

        <div className="flex flex-col max-w-[58rem] h-28 mx-12 mt-10 mb-5 bg-[#FAEAEA] rounded-2xl overflow-auto">
          <span className="text-2xl font-bold mt-2 mx-10">Office Vision</span>
          <div className="mx-10">
            <div className="text-lg font-normal mx-5 mb-2">
              <div className="whitespace-normal break-words">
                {officeVision}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[58rem] h-28 mx-12 mb-5 bg-[#FAEAEA] rounded-2xl overflow-auto">
          <span className="text-2xl font-bold mt-2 mx-10">
            Value Proposition
          </span>
          <div className="mx-10">
            <div className="text-lg font-normal mx-5 mb-2">
              <div className="whitespace-normal break-words">
                {valueProposition}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[58rem] h-28 mx-12 mb-5 bg-[#FAEAEA] rounded-2xl overflow-auto">
          <span className="text-2xl font-bold mt-2 mx-10">Strategic Goals</span>
          <div className="mx-10">
            <div className="text-lg font-normal mx-5 mb-2">
              <div className="whitespace-normal break-words">
                {strategicGoals}
              </div>
            </div>
          </div>
        </div>
        {/* Edit button */}
        <div className="text-center self-end">
          <Button
            className="flex w-40 h-10 mr-12 bg-[#8a252c] text-white font-bold text-xl px-12 py-5 border[0.1rem] border-white mb-4 hover:bg-[#eec160] hover:text-[#8a252c]"
            onClick={handleSave}
            href="/profile/[id]"
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
