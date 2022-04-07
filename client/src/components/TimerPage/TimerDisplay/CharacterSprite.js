import React from "react";
import './CharacterSprite.css'
import Box from "@mui/material/Box";
const CharacterSprite = () => {
    return (
        <Box className="Character" sx={{mt: -13}}>
            {<img className="Character_shadow"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow"/>}

            <img className="Character_spritesheet pixelart"
                 src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png" alt="Character"/>
        </Box>
    )
}

export default CharacterSprite;