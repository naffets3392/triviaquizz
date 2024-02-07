import { AppBar, Box, Toolbar, Typography, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "../customHooks";

export default function Header() {
    const {windowWidth} = useWindowWidth()

    return (
        <Box>
            <AppBar>
                <Toolbar sx={{justifyContent: "space-around"}}>
                    <Typography
                    className="textColor"
                    variant={windowWidth > 600 ? "h3" : "h6"}
                    >
                        Quizz
                    </Typography>
                    <Stack direction="row" spacing={windowWidth > 600 ? 3 : 2}>
                        <NavLink className={({isActive}) => isActive ? 'navLink-active' : 'navLink'} to='.'>
                            <Typography>Home</Typography>
                        </NavLink>
                        <NavLink className={({isActive}) => isActive ? 'navLink-active' : 'navLink'} to='quizz'>
                            <Typography>Quizz</Typography>
                         </NavLink>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}