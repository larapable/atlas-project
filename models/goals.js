import excuteQuery from '/lib/db.js';

const Goals = {
    async postGoals(officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate,department_id) {
        try{
            await excuteQuery({
                query: 'INSERT INTO inputgoals (vision, proposition, goals, goals2, goals3, startDate, endDate,department_id) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
                values: [officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate,department_id]
            });
            return true;
        }
        catch (error) {
            console.error("Error:",error);
            return false;
        }
    },

    async getGoalsByDepartmentId(department_id) {
        try {
            const result = await excuteQuery({
                query: 'SELECT vision, proposition, goals, goals2, goals3, startDate, endDate FROM inputgoals WHERE department_id = ?',
                values: [department_id]
            });
             
            // Check if there are any results
            if (result.length === 0) {
                return null; // No goals found for the department
            }

            // Extract the goal settings from the result
            const { vision, proposition, goals, goals2, goals3, startDate, endDate } = result[0];

            return {
                vision: vision,
                proposition: proposition,
                goals: goals,
                goals2: goals2,
                goals3: goals3,
                startDate: startDate,
                endDate: endDate
            };
        } catch (error) {
            console.error("Error fetching goal settings:", error);
            throw error;
        }
    },

    async updateGoalsDetails(department_id, vision, proposition, goals, goals2, goals3, startDate, endDate) {
        try {
            // Execute the UPDATE query to update department details
            const result = await excuteQuery({
                query: `
                    UPDATE inputgoals
                    SET vision = ?, proposition = ?, goals = ?, goals2 = ?, goals3 = ?, startDate = ?, endDate = ?
                    WHERE department_id = ?
                `,
                values: [vision, proposition, goals, goals2,goals3,startDate,endDate, department_id]
            });
    
            if (result.affectedRows > 0) {
                // Department details successfully updated
                return true;
            } else {
                // No department found with the given ID
                return false;
            }
        } catch (error) {
            console.error("Error updating goals details:", error);
            throw new Error("An error occurred while updating goals details.");
        }
    },
};

module.exports = Goals;
