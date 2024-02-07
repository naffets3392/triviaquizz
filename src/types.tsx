export type LvlType = {
    [key: string]: number
    easy: number,
    medium: number,
    hard: number
}

export type CategoriesType = {
    category: string,
    numberOfQuestions: string,
    difficulty: string,
    type: string
}

export type QuestionsType = {
    [key: string]: string | string[] | boolean,
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

type SingleAnswerType = {
    answer: string,
    isCorrect: boolean
}

export type QuestionType = {
    answers: SingleAnswerType[],
    question: string,
    type: string
}

export type CategoryType = {
    [key: string]: number,
    total_question_count: number,
    total_easy_question_count: number,
    total_medium_question_count: number,
    total_hard_question_count: number
}

export type CategoryArrType = {
    [key: string]: number[],
    allquestions: number[],
    easy: number[],
    medium: number[],
    hard: number[]
}

