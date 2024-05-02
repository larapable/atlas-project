import excuteQuery from '/lib/db.js';

const WOStrat = {
    async postWOStrat(apiResponse) {
        try {
            await excuteQuery({
                query: 'INSERT INTO `w-ostrat` (`w-oResponses`) VALUES (?)',
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

module.exports = WOStrat;