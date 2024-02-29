import Box from '../../box/Box';
//import { styled } from 'styled-components';
import Divider from '../../divider/Divider';


function AccountSettings() {
    return(
        <div
            onClick={e => e.stopPropagation()}
            >
            <Box>Setting</Box>
            <Divider
                $top="3rem"
                $width="30rem"
                $left="0.5rem"
                />
        </div>
    )
}

export default AccountSettings;