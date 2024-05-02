import excuteQuery from '@/lib/db.js'

const Department = {
    async department_register(department) {
        try {
            // Execute the INSERT query to register the department
            await excuteQuery({
                query: 'INSERT INTO department (department_name) VALUES (?)',
                values: [department]
            });

            return true; // Return true if the department registration is successful
        } catch (error) {
            console.error("Error:", error);
            return false; // Return false if there's an error during department registration
        }
},


async getDepartmentIdByName(department) {
    try {
        const result = await excuteQuery({
            query: 'SELECT id FROM department WHERE department_name = ?',
            values: [department]
        });

        if (result && result.length > 0) {
            return result[0].id;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        throw new Error("An error occurred while querying the database.");
    }
},

async findById(id) {
    try {
        const result = await excuteQuery({
            query: 'SELECT department_name FROM department WHERE id = ?',
            values: [id]
        });

        if (result && result.length > 0) {
            return result[0]; // Return department details if found
        } else {
            return null; // Return null if department not found
        }
    } catch (error) {
        console.error("Error:", error);
        throw new Error("An error occurred while querying the database.");
    }
},


 async updateDepartmentDetails(id, departmentLandline, location, university, departmentDescription) {
    try {
        // Execute the UPDATE query to update department details
        const result = await excuteQuery({
            query: `
                UPDATE department
                SET departmentLandline = ?, location = ?, university = ?, description = ?
                WHERE id = ?
            `,
            values: [departmentLandline, location, university, departmentDescription, id]
        });

        if (result.affectedRows > 0) {
            // Department details successfully updated
            return true;
        } else {
            // No department found with the given ID
            return false;
        }
    } catch (error) {
        console.error("Error updating department details:", error);
        throw new Error("An error occurred while updating department details.");
    }
},


async getDepartmentDetailsById(id) {
    try {
        const result = await excuteQuery({
            query: `
                SELECT *
                FROM department
                WHERE id = ?
            `,
            values: [id]
        });

        if (result && result.length > 0) {
            return result[0]; // Return department details if found
        } else {
            return null; // Return null if department not found
        }
    } catch (error) {
        console.error("Error:", error);
        throw new Error("An error occurred while querying the database.");
    }
},


};

module.exports = Department;