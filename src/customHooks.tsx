import { useEffect, useState } from "react";
import { getFetchedQuestions, getToken, maxQuestionsFunc } from "./utilsFunc";
import { TYPES, DIFFICULTIES } from "./utilsFunc";
import { CategoriesType, CategoryArrType, QuestionType } from "./types";
import { useSearchParams } from "react-router-dom";

export function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        function windowWidthSetter() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize',windowWidthSetter)
        return () => window.removeEventListener('resize', windowWidthSetter)
    },[windowWidth])

    return {windowWidth}
}

export function useCategories() {
    const URL = "https://opentdb.com/api_category.php"
    const [CATEGORIES,setCATEGORIES] = useState<any[]>([])
    const [categoriesLoading,setCategoriesLoading] = useState(true)
    
    useEffect(() => {
        setCategoriesLoading(true)
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            const triviaCategories = data.trivia_categories
            const fullCategories = [{id: 'Any Category', name: 'Any Category'},...triviaCategories]
            setCATEGORIES(fullCategories)
            setCategoriesLoading(false)
        })
        .catch(err => {
            console.log(err)
            setCategoriesLoading(false)
        })
    },[])

    return {CATEGORIES, TYPES, DIFFICULTIES, categoriesLoading}
}

export function useCleanUrl({category, numberOfQuestions, difficulty, type}: CategoriesType) {
    const [searchParams,setSearchParams] = useSearchParams()
    const token = getToken()
    const [url,setUrl] = useState('')

    useEffect(() => {
        setSearchParams(prevParams => {
            if(numberOfQuestions) {
                prevParams.set('amount', numberOfQuestions)
            }
            if(!numberOfQuestions) {
                prevParams.delete('amount')
            }
            if(category) {
                if(category === "Any Category") {
                    prevParams.delete('category')
                } else {
                    prevParams.set('category', category)
                }
            }
            if(!category) {
                prevParams.delete('category')
            }
            if(difficulty) {
                if(difficulty === 'Any Difficulty') {
                    prevParams.delete('difficulty')
                } else {
                    prevParams.set('difficulty', difficulty.toLowerCase())
                }
            }
            if(!difficulty) {
                prevParams.delete('difficulty')
            }
            if(type) {
                if(type === "Any Type") {
                    prevParams.delete('type')
                } else {
                    if(type === 'Multiple Choice') {
                        prevParams.set('type', 'multiple')
                    }
                    if(type === "True / False") {
                        prevParams.set('type', 'boolean')
                    }
                }
            }
            if(!type) {
                prevParams.delete('type')
            }
            return prevParams
        })
        const BASE_URL = 'https://opentdb.com/api.php?'
        const URL_ENCODING = '&encode=url3986'
        const FULL_URL = `${BASE_URL}${searchParams.toString()}${URL_ENCODING}${token}`
        setUrl(FULL_URL)
    },[category, numberOfQuestions, difficulty ,type])
   
    return {url}
}

export function useCategoryTypes(category: string) {
    const [categoryTypes,setCategoryTypes] = useState<CategoryArrType | null>(null)
    const CATEGOTY_TYPES_URL = 'https://opentdb.com/api_count.php?category=' + category

    useEffect(() => {
        if(category === 'Any Category') {
            setCategoryTypes(null)
            return
        }
        fetch(CATEGOTY_TYPES_URL)
        .then(res => res.json())
        .then(data => {
            const dataCategories = maxQuestionsFunc(data.category_question_count)
            setCategoryTypes(dataCategories)
        })
        .catch(err => {
            console.log(err)
        })
    },[category])

    return {categoryTypes} 
}

export function useQuestions(url: string) {
    const [loadingQuestions,setLoadingQuestions] = useState(false)
    const [questions,setQuestions] = useState<QuestionType[]>([])
    const [noQuestions,setNoQuestions] = useState(false)

    async function getQuestions() {
        setLoadingQuestions(true)
        await getFetchedQuestions(url)
        .then(fetchedQuestions => {
            console.log(fetchedQuestions)
            if(fetchedQuestions.length == 0) {
                setNoQuestions(true)
                setLoadingQuestions(false)
                return
            }
            setQuestions(fetchedQuestions)
            setLoadingQuestions(false)
        })
    }

    return {loadingQuestions,getQuestions,questions, noQuestions, setNoQuestions}
} 