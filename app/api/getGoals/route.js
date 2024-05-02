import { NextResponse } from "next/server";
import Goals from '/models/goals.js';

export async function PUT(req) {
    try {
      const{officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate,department_id} = await req.json();

      console.log("ID: ",department_id)


        // Update department details in the database
        const updated = await Goals.updateGoalsDetails(department_id, officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate);

        if (updated) {
            // Department details successfully updated
            return NextResponse.json({ message: "Goals details updated." }, { status: 200 });
        } else {
            // No department found with the given ID
            return NextResponse.json({ message: "Goals not found." }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating department details:", error);
        return NextResponse.json({ message: "An error occurred while updating department details." }, { status: 500 });
    } 


    
}
