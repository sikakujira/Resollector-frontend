import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';
import logo from '../../logo_transparent.png';
import ThemeButton from '../button/ThemeButton';
import AccountButton from '../button/AccountButton';
import Box from '../box/Box';


const StyledHeader = styled.header<{mode: "light"| "dark"}>`
    position: fixed;
    top: 0;
    width: 100%;
    height: 5rem;
    z-index: 1;
    background-color: ${props => (
        props.mode === "light" ? `${themeColor.light.header}` : `${themeColor.dark.header}`
        )}
    `
const Logo = styled.img.attrs<{mode: "light"|"dark"}>({
        src: `${logo}`,
        alt: "logo",
        width: "150px",
        height: "70px",
    })`
        object-fit: cover;       
        position: fixed;
        left: 3%;
        top: 0.8rem;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                filter: brightness(0) 
                        saturate(100%) 
                        invert(23%) 
                        sepia(87%) 
                        saturate(1145%) 
                        hue-rotate(29deg) 
                        brightness(99%) 
                        contrast(101%);
                `
            } else {
                return css`
                filter: brightness(0) 
                        saturate(100%) 
                        invert(97%) 
                        sepia(27%) 
                        saturate(6167%) 
                        hue-rotate(311deg) 
                        brightness(108%) 
                        contrast(80%);
                `
            }
        }}
        
    `

type HeaderProps = {
        mode: "light"|"dark",
        onClickTheme?: () => void,
        login: boolean,
}

function Header(props: HeaderProps) {
        
    return(
        <StyledHeader 
            mode={props.mode}
            >
           <Logo mode={props.mode}/>
           {props.login === true ?
                <Box 
                    $right="4%"
                    width="8rem"
                    height="3rem"
                    $top="1rem"
                    >
                <ThemeButton 
                    mode={props.mode} 
                    onClick={props.onClickTheme}
                />
                <AccountButton 
                    mode={props.mode}
                />
                </Box>
            : null}
        </StyledHeader>
    )
}

export default Header;