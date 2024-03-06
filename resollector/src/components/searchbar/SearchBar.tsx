import { styled, css } from 'styled-components';
import Box from '../box/Box';
import themeColor from '../../utils/themeColor';
import { MdOutlineSearch } from "react-icons/md";
import TextButton from '../button/TextButton';
import { useState } from 'react';


const SearchWrapper = styled.div<{mode:"light"|"dark"}>`
        position: absolute;
        height: 3rem;
        top: 8rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        border-radius: 2rem;
        ${props => {
            if(props.mode === "light") {
                return css`
                    background-color: ${themeColor.light.surfaceContainerHigh};
                `
            } else {
                return css`
                    background-color: ${themeColor.dark.surfaceContainerHigh};
                `
            }
        }};
        @media (min-width: 841px) {
            width: 70%;
        }
        @media (max-width: 840px) {
            width: 90%;
        }
`


type InputProps = {
    mode: "light"|"dark",
}

const Input = styled.input<InputProps>`
        position: absolute;
        left: 3rem;
        width: 80%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 20px;
        background-color: transparent;
        ${props => {
            if(props.mode === "light") {
                return css`
                    color: ${themeColor.light.onSurfaceVariant};
                `
            } else {
                return css`
                    color: ${themeColor.dark.onSurfaceVariant};
                `
            }
        }};
        @media (min-width: 501px) {
            width: 80%;
        }
        @media (max-width: 500px) {
            width: 65%;
        }
`

type SearchBarProps = {
    mode: "light"|"dark",
}

function SearchBar(props: SearchBarProps) {
    const [value, setValue] = useState<string>("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function deleteSearch(): void {
        setValue("");
    }

    return(
            <SearchWrapper
                mode={props.mode}
                >
                <Box
                    $zIndex="2"
                    $left="3%"
                    $top="0.7rem"
                    >
                {props.mode === "light" 
                    ?   <MdOutlineSearch
                            color={themeColor.light.onSurface}
                            size={30}
                            />
                    :    <MdOutlineSearch
                            color={themeColor.dark.onSurface}
                            size={30}
                            />
                }
                </Box>
                <Input
                    mode={props.mode}
                    value={value}
                    onChange={handleChange}
                    />
                {value          
                    ?  <TextButton
                        width="2.5rem"
                        height="2.5rem"
                        top="0.3rem"
                        right="0"
                        mode={props.mode}
                        content="X"
                        onClick={deleteSearch}
                        />
                    : null
                }  
            </SearchWrapper>
    )
}

export default SearchBar;