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
        res.json(user.character)
    }

    static async apiUpdateCharacter(req, res, next) {
        try {
            const userId = req.body.user_id
            let characterInfo = {}
            if(req.body.char_name) {
                characterInfo.char_name = req.body.char_name
            }
            if(req.body.level + 1 && !isNaN(req.body.level)) {
                characterInfo.level = req.body.level
            }
            if(req.body.current_xp + 1 && !isNaN(req.body.level)) {
                characterInfo.current_xp = req.body.current_xp
            }
            if(req.body.xp_to_next_level + 1 && !isNaN(req.body.level)) {
                characterInfo.xp_to_next_level = req.body.xp_to_next_level
            }
            if(req.body.max_hp + 1 && !isNaN(req.body.level)) {
                characterInfo.max_hp = req.body.max_hp
            }
            if(req.body.current_hp + 1 && !isNaN(req.body.level)) {
                characterInfo.current_hp = req.body.current_hp
            }
            if(req.body.gold + 1 && !isNaN(req.body.level)) {
                characterInfo.gold = req.body.gold
            }
            if(req.body.equip){
                characterInfo.name = req.body.equip.name
                characterInfo.type = req.body.equip.type
                characterInfo.equip = true
            }
            if(req.body.unequip){
                characterInfo.name = req.body.unequip.name
                characterInfo.type = req.body.unequip.type
                characterInfo.equip = false
            }
            const user = await CharacterDAO.getCharacter({
                userId
            })
            if(user.character == null){
                res.status(400).json("Wrong Id")
                return
            } else {
                const characterUpdateResponse = await CharacterDAO.updateCharacter(
                    userId,
                    characterInfo
                )
                res.json({ character: characterInfo, status: "success" })
            }
        } catch (e) {
            res.status(500).json( {error: e.message })
        }
    }
}
