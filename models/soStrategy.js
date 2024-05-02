import excuteQuery from '/lib/db.js';

const SWStrat = {
    async postSWStrat(apiResponse) {
        try {
            await excuteQuery({
                query: 'INSERT INTO `s-ostrat` (`s-oResponses`) VALUES (?)',
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

module.exports = SWStrat;