import { NextResponse } from "next/server";
import Goals from '/models/goals.js';


export async function GET(req, { params }) {
  try {
    const { department_id } = params;
    console.log("Fetching goals details for ID:", department_id);

    // Fetch department details from the database
    const department = await Goals.getGoalsByDepartmentId(department_id);

    if (department) {
      // Department found, return the department details
      const {
        vision,
        proposition,
        goals,
        goals2,
        goals3,
        startDate,
        endDate,
      } = department;

      return NextResponse.json({
        vision,
        proposition,
        goals,
        goals2,
        goals3,
        startDate,
        endDate,
      });
    } else {
      // No department found with the given ID
      console.log("Department not found for ID:", department_id);
      return NextResponse.json(
        { message: "Department not found." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching department details:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching department details." },
      { status: 500 }
    );
  }
}
  
  