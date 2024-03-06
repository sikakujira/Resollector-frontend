import { styled, css } from 'styled-components';
import Wrapper from '../wrapper/Wrapper';
import themeColor from '../../utils/themeColor';
import { useState, useId } from 'react';

type InputProps = {
    mode: "light"|"dark",
    $isError?: boolean,
    $isFocused: boolean,
}

const Input = styled.input<InputProps>`
        width: 100%;
        height: 100%;
        font-size: 20px;
        border-radius: 0.5rem;
        outline: none;
        background-color: transparent;
        padding-left: 20px;
        color: ${props => (props.mode === "light" 
            ?   `${themeColor.light.onSurfaceVariant}` 
            : `${themeColor.dark.onSurfaceVariant}`
            )};
        ${({$isFocused, value, mode}) => {
            if($isFocused || value ) {
                return css`
                    border: 2px solid ${(
                        mode === "light" 
                        ? themeColor.light.primary 
                        : themeColor.dark.primary
                        )}
                    `
            } else {
                return css`
                    border: 1px solid ${(
                        mode === "light" 
                        ? themeColor.light.primary 
                        : themeColor.dark.primary
                        )}
                    `
            }
        }}
        

`

        


type LabelProps = {
    mode: "light"|"dark",
    $isFocused: boolean,
    $value: string,
    $labelColorLight: string,
    $labelColorDark: string,
    $labelTop?: string,
}

const Label = styled.label<LabelProps>`
        position: absolute;
        top: ${props => props.$labelTop ? props.$labelTop : "1rem"};
        left: 3.5%;
        font-size: 20px;
        text-align: center;
        transition: all 0.2s ease-out;
        padding: 0 0.5rem;
        ${({$isFocused, $value}) => {
            if($isFocused || $value) {
                return css`
                    top: -0.5rem;
                    left: 2%;
                    font-size: 18px;
                    `
            }
        }}
        ${({mode, $labelColorLight, $labelColorDark}) => {
            if(mode === "light") {
                return css `
                    color: ${themeColor.light.onSurfaceVariant};
                    background-color: ${$labelColorLight};
                    `
            } else {
                return css`
                    color: ${themeColor.dark.onSurfaceVariant};
                    background-color: ${$labelColorDark};
                    `
            }
        }}
    `

const SupportingText = styled.span<{mode: "light"|"dark"}>`
        position: absolute;
        bottom: -1.5rem;
        left: 4%;
        color: ${props => (props.mode === "light" 
            ? themeColor.light.error 
            : themeColor.dark.error)};
`

type TextFieldOutlineProps = {
    mode: "light"| "dark",
    width: string,
    height: string,
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    name: string,
    value: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isError?: boolean,
    errorText?: string,
    type: string,
    labelColorLight: string,
    labelColorDark: string,
    labelTop?: string,
}

function TextFieldOutline(props: TextFieldOutlineProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const id = useId();
    

    return(
        <Wrapper
            $top={props.top}
            $left={props.left}
            $right={props.right}
            $bottom={props.bottom}
            $width={props.width}
            $height={props.height}
            >
            <Input
                mode={props.mode}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                $isError={props.isError}
                type={props.type}
                $isFocused={isFocused}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                id={id}
                />
            <Label
                mode={props.mode}
                $isFocused={isFocused}
                $value={props.value}
                $labelColorLight={props.labelColorLight}
                $labelColorDark={props.labelColorDark}
                htmlFor={id}
                $labelTop={props.labelTop}
                >
                {props.placeholder}
            </Label>
            {props.isError 
                ?   <SupportingText
                        mode={props.mode}>
                    {props.errorText}
                    </SupportingText> 
                : null
            }
        </Wrapper>
    )
}

export default TextFieldOutline;