import excuteQuery from '/lib/db.js';

const WTStrat = {
    async postWTStrat(apiResponse) {
        try {
            await excuteQuery({
                query: 'INSERT INTO `w-tstrat` (`w-tResponses`) VALUES (?)',
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

module.exports = WTStrat;