import { useEffect, useState } from "react"
import { CategoryArrType, CategoryType, LvlType, QuestionsType } from "./types"

export const DIFFICULTIES = ['Any Difficulty', 'Easy', 'Medium', 'Hard']
export const TYPES = ['Any Type', 'Multiple Choice', 'True / False']

export function loopFunc(num: number = 50) {
    if(num > 50) {
        num = 50
    }
    let numbersArr = []
    for(let i = 1; i <= num; i++) {
        numbersArr.push(i)
    }
    return numbersArr
}

export function findDifficultyLvlFunc(obj: LvlType | null, type: string) {
    let lvl: string = ''
    for(const keyLvl in obj) {
        if(keyLvl === type.toLowerCase()) {
            lvl = obj[keyLvl].toString()
        }
    }
    return parseInt(lvl)
}

export function decodeQuestionsFunc(arr: QuestionsType[]) {
    const decodedArr = arr.map(question => {
        if(question.type === 'boolean') {
            const answers = [{answer: question.correct_answer,isCorrect: true}, {answer: question.incorrect_answers[0] ,isCorrect: false}]
            const shufledAnswers = answers.sort(() => 0.5 - Math.random())
            return {
                question: decodeURIComponent(question.question),
                answers: shufledAnswers,
                type: question.type
            }
        } else {
            const codedWrongAnswers = question.incorrect_answers.map(answer => {
                return {
                    answer: decodeURIComponent(answer),
                    isCorrect: false,
                }
            })
            const codedQuestions = [
                {
                    answer: decodeURIComponent(question.correct_answer),
                    isCorrect: true
                },
                ...codedWrongAnswers
            ]
            const shuffledAnswers = codedQuestions.sort(() => 0.5 - Math.random())
            return {
                question: decodeURIComponent(question.question),
                answers: shuffledAnswers,
                type: question.type
            }
        }
    })
    return decodedArr
}

export function getToken() {
    const [token,setToken] = useState<string>('')

    useEffect(() => {
        fetch('https://opentdb.com/api_token.php?command=request')
        .then(res => res.json())
        .then(data => {
            const key: string = data.token
            const tokenParam = `&token=${key}`
            setToken(tokenParam)
        })
    },[])

    return token
}


export function maxQuestionsFunc(categories: CategoryType) {
    return {
        allquestions: loopFunc(categories.total_question_count),
        easy: loopFunc(categories.total_easy_question_count),
        medium: loopFunc(categories.total_medium_question_count),
        hard: loopFunc(categories.total_hard_question_count)
    }
}

export function getQuestionsLengthFunc(fetchedTypes: CategoryArrType, difficulty: string) {
    const lowerCaseDifficulty = difficulty.toLowerCase()
    console.log(fetchedTypes[lowerCaseDifficulty])
    return fetchedTypes[lowerCaseDifficulty]
}

export function getSingleQuestionNumberFunc(fetchedTypes: CategoryArrType, difficulty: string) {
    const lowerCaseDifficulty = difficulty.toLowerCase() 
    console.log(fetchedTypes[lowerCaseDifficulty][fetchedTypes[lowerCaseDifficulty].length -1])
    return fetchedTypes[lowerCaseDifficulty][fetchedTypes[lowerCaseDifficulty].length -1]
}


export function getCategoryTypes(category: string) {
    const CATEGOTY_TYPES_URL = 'https://opentdb.com/api_count.php?category=' + category
    return fetch(CATEGOTY_TYPES_URL)
    .then(res => res.json())
    .then(data => {
        const dataCategories = maxQuestionsFunc(data.category_question_count)
        return dataCategories
    })
    .catch(err => {
        console.log(err)
    })
}

export async function settingCategoryTypes(
    category: string,
    difficulty: string,
    setQuestionsLength:React.Dispatch<React.SetStateAction<number[]>>,
    setSingleQuestionNumber: React.Dispatch<React.SetStateAction<number>>,
    setNumberOfQuestions: React.Dispatch<React.SetStateAction<string>>,
    // setloadingCategoriesAndQuestions:  React.Dispatch<React.SetStateAction<boolean>>
    ) {
    if(category === 'Any Category') {
        setNumberOfQuestions('50')
        setSingleQuestionNumber(50)
        setQuestionsLength(loopFunc(50))
        return
    }
    if(difficulty === 'Any Difficulty') {
        difficulty = 'allQuestions'
    }
    // setloadingCategoriesAndQuestions(true)
    const fetchedTypes: CategoryArrType | void = await getCategoryTypes(category)
    console.log(fetchedTypes)
    setQuestionsLength(getQuestionsLengthFunc(fetchedTypes!, difficulty))
    setSingleQuestionNumber(getSingleQuestionNumberFunc(fetchedTypes!, difficulty))
    setNumberOfQuestions(getSingleQuestionNumberFunc(fetchedTypes!, difficulty).toString())
    // setloadingCategoriesAndQuestions(false)
}

export function getFetchedQuestions(url: string) {
    return fetch(url)
    .then(res => res.json())
    .then(data =>  decodeQuestionsFunc(data.results))
}
