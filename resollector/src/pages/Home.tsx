import { useState } from 'react';
import Background from '../components/background/Background';
import Header from '../components/header/Header';

export default function Home() {
    const [mode, setMode] = useState<"light" | "dark">("light");

    function handleClickTheme() {
            if(mode === "light") {
                setMode("dark");
            } else {
                setMode("light");
            }
    }

    return(
        <Background 
            mode={mode}
            >
            <Header 
                mode={mode} 
                login={true}
                onClickTheme={handleClickTheme}
                />

        </Background>
    )
}