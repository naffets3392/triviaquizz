import customTheme from "./customTheme"

export const quizPageContainer = {
    minHeight: "90vh",
    backgroundColor: "#292F33",
    marginTop: "1rem",
    [customTheme.breakpoints.up('xs')]: {
        padding: "1rem"
    },
    [customTheme.breakpoints.up('sm')]: {
        padding: "1rem 3rem"
    }
}

export const selectsContainerStyle = {
    [customTheme.breakpoints.up('xs')]: {
        width:"100%"
    },
    [customTheme.breakpoints.up('sm')]: {
        width:"100%"
    },
    [customTheme.breakpoints.up('md')]: {
        width:"70%"
    },
    [customTheme.breakpoints.up('lg')]: {
        width:"60%"
    },
    [customTheme.breakpoints.up('xl')]: {
        width:"50%"
    }
}