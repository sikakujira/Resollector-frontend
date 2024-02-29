import { styled, css }  from 'styled-components';
import themeColor from '../../utils/themeColor';
import Wrapper from '../wrapper/Wrapper';
import { useState, useId } from 'react';

//下線部のアクション用
const Underline = styled.span<{mode: "light" | "dark", $isfocused: string, $value: string}>`
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        transition: width 0.4s;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.primary};
                `
            }
        }}
        ${({$isfocused, $value}) => {
            if($isfocused === "true" || $value !== "") {
                return css`
                    width: 100%
                    `
            } else {
                return css`
                    width: 0%
                `
            }
        }}
    `

//input部分
type TextFieldProps = {
    type: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value?: string,
    name: string,
    mode: "light" | "dark",
};

const TextField = styled.input.attrs<TextFieldProps>(props => ({
        type: props.type, 
        onChange: props.onChange,
        value: props.value,
        name: props.name
    }))`
        border: none;
        outline: none;
        width: 20rem;
        height: 3.5rem;
        font-size: 18px;
        padding-bottom: 0px;
        ${({mode}) => {
                if( mode === "light") {
                    return css`
                        background-color: ${themeColor.light.surface};
                        border-bottom: 1px solid ${themeColor.light.outline};
                    `
                }
        }}
    `;

//label部分
const Label = styled.label<{$isfocused: string, $value: string}>`
        position: absolute;
        color: ${themeColor.light.outline};
        ${({$isfocused, $value}) => {
            if($isfocused === "true" || $value !== "") {
                return css`
                    top: 0;
                    font-size: 13px;
                    transition: all 0.4s;
                    `
            } else {
                return css`
                    bottom: 8px;
                    transition: all 0.4s;
                `
            }
        }}
    `

//下線部の下のテキスト
const SupportingText = styled.span`
        position: absolute;
        bottom: -1.5rem;
        left: 0;
        color: ${themeColor.light.error};
    `

//TextFieldStandard用
type Props = {
    top: string,
    left: string,
    name: string,
    type: string,
    mode: "light" | "dark",
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    error: string,
    errorText?: string,
};

    function TextFieldStandard(props: Props) {
        const [focus, setFocus] = useState<boolean>(false);
        const id = useId();

        return(
            <Wrapper 
                $top={props.top} 
                $left={props.left}
                >
                <Label  
                    $isfocused={focus.toString()} 
                    $value={props.value}
                    htmlFor={id}
                    >
                    {props.placeholder}
                </Label>
                <TextField 
                    name={props.name} 
                    id={id}
                    type={props.type} 
                    mode={props.mode} 
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    />
                <Underline 
                    mode={props.mode} 
                    $isfocused={focus.toString()}
                    $value={props.value}
                    />
                {props.error === "true" ? (
                    <SupportingText>{props.errorText}</SupportingText>
                    ): null}
            </Wrapper>
        )
    }

export default TextFieldStandard;