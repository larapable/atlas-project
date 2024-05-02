import { NextResponse } from "next/server";
import Department from '@/models/department.js';

export async function PUT(req) {
    try {
        const { departmentLandline, location, university, departmentDescription, departmentId } = await req.json();

        console.log("Department", departmentId);
        
        // Update department details in the database
        const updated = await Department.updateDepartmentDetails(departmentId, departmentLandline, location, university, departmentDescription);

        if (updated) {
            // Department details successfully updated
            return NextResponse.json({ message: "Department details updated." }, { status: 200 });
        } else {
            // No department found with the given ID
            return NextResponse.json({ message: "Department not found." }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating department details:", error);
        return NextResponse.json({ message: "An error occurred while updating department details." }, { status: 500 });
    } 


    
}
