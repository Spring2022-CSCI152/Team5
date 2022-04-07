import CharacterDAO from "../dao/characterDAO.js"

export default class CharacterCtrl {
    static async apiGetCharacter(req, res, next) {
        const userId = req.query.userId
        if(!userId)
        {
            res.status(400).json("Please enter userId in the query.");
            return;
        }
        const user = await CharacterDAO.getCharacter({
            userId
        })
        console.log(user.character)
        res.json(user.character)
    }

    static async apiUpdateCharacter(req, res, next) {
        try {
            const userId = req.body.user_id
            let characterInfo = {}
            if(req.body.char_name) {
                characterInfo.char_name = req.body.char_name
            }
            if(req.body.level + 1) {
                console.log("Test");
                characterInfo.level = req.body.level
            }
            if(req.body.current_xp + 1) {
                characterInfo.current_xp = req.body.current_xp
            }
            if(req.body.xp_to_next_level + 1) {
                characterInfo.xp_to_next_level = req.body.xp_to_next_level
            }
            if(req.body.max_hp + 1) {
                characterInfo.max_hp = req.body.max_hp
            }
            if(req.body.current_hp + 1) {
                characterInfo.current_hp = req.body.current_hp
            }
            if(req.body.gold + 1) {
                characterInfo.gold = req.body.gold
            }

            const characterUpdateResponse = await CharacterDAO.updateCharacter(
                userId,
                characterInfo
            )

            /*var { error } = characterUpdateResponse
            if (error) {
                res.status(400).json({ error })
            }*/

            /*if (characterUpdateResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update character - user id may be incorrect"
                )
            }*/

            res.json({ character: characterInfo, status: "success" })
        } catch (e) {
            res.status(500).json( {error: e.message })
        }
    }
}
