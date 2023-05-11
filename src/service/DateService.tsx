import React, { createContext } from "react"
import dayjs from "dayjs"
import { createContextUser } from "../util/createContextUser"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
interface DateServiceProps {
    isDayFieldValid: boolean,
    isMonthFieldValid: boolean,
    isYearFieldValid: boolean,
    validateForm: (date: DateType) => boolean,
    date: DateType,
    setDate: React.Dispatch<React.SetStateAction<DateType>>
    setIsDayFieldValid: React.Dispatch<React.SetStateAction<boolean>>
    setIsYearFieldValid: React.Dispatch<React.SetStateAction<boolean>>
    setIsMonthFieldValid: React.Dispatch<React.SetStateAction<boolean>>
    calculateAge: () => void,
    age: DateType | undefined,
}

const DateService = createContext<DateServiceProps | undefined>(undefined)
DateService.displayName = "DateService"
export const useDateService = createContextUser(DateService)

export interface ProvideDateServiceProps {
    children: React.ReactNode
}

export type DateType = {
    day: string,
    month: string,
    year: string,
}


const DateState: DateType = {
    day: "",
    month: "",
    year: "",
}

const ProvideDateServiceComponent = ({ children }: ProvideDateServiceProps) => {

    const [date, setDate] = React.useState<DateType>(DateState)

    const [isDayFieldValid, setIsDayFieldValid] = React.useState<boolean>(true)
    const [isMonthFieldValid, setIsMonthFieldValid] = React.useState<boolean>(true)
    const [isYearFieldValid, setIsYearFieldValid] = React.useState<boolean>(true)

    const [age, setAge] = React.useState<DateType>()


    const validateForm = (date: DateType) => {
        const inputDataToDate = dayjs(`${date.day}/${date.month}/${date.year}`, "DD/MM/YYYY")
        console.log(inputDataToDate);

        const isBeforetoDay = inputDataToDate.isBefore(dayjs())
        console.log(isBeforetoDay);


        const isDayValid = date.day.length === 2 && date.day.length > 0
        const isMonthValid = date.month.length === 2 && date.month.length > 0 && Number(date.month) <= 12 && Number(date.month) > 0
        const isYearValid = date.year.length === 4 && date.year.length > 0 && isBeforetoDay
        console.log(isYearValid);


        const isValidFullDate = inputDataToDate.isValid()


        if ((!isDayValid || !isMonthValid || !isYearValid)) {

            setIsDayFieldValid(isDayValid)
            setIsMonthFieldValid(isMonthValid)
            setIsYearFieldValid(isYearValid)
            return false
        }

        return true
    }

    const calculateAge = () => {

        if (!validateForm(date)) return


        const inputDataToDate = dayjs(`${date.day}/${date.month}/${date.year}`, "DD/MM/YYYY", true)


        const lastYear = dayjs().subtract(1, "year").get("year")
        const currentDay = dayjs().get("day")

        const years = dayjs().diff(inputDataToDate, "years")
        const months = dayjs().diff(dayjs(`${date.day}/${date.month}/${lastYear}`, "DD/MM/YYYY"), "months")

        const days = dayjs().diff(dayjs(`${date.day}/${date.month}/${lastYear}`, "DD/MM/YYYY"), "days")

        const age: DateType = {
            day: days.toString(),
            month: (months).toString(),
            year: years.toString(),
        }

        setAge(age)
        return
    }







    return (
        <DateService.Provider value={{ date, isDayFieldValid, isMonthFieldValid, isYearFieldValid, setDate, setIsDayFieldValid, setIsMonthFieldValid, setIsYearFieldValid, validateForm, calculateAge, age }}>{children}</DateService.Provider>
    )
}

export const ProvideDateService = React.memo(ProvideDateServiceComponent)