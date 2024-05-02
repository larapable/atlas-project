import excuteQuery from '/lib/db.js';

const STStrat = {
    async postSTStrat(apiResponse) {
        try {
            await excuteQuery({
                query: 'INSERT INTO `s-tstrat` (`s-tResponses`) VALUES (?)',
                values: [apiResponse]
            });
            return true;
        }
        catch (error) {
            console.error("Error:", error);
            return false;
        }
    },
};

module.exports = STStrat;