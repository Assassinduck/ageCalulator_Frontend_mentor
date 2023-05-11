import styled from "@emotion/styled"
import React from "react"
import { useDateService } from "../../service/DateService"
import dayjs from "dayjs"

export interface DateFormProps {

}

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    gap: 25px;
    @media screen and (max-width: 600px) {
        gap: 14px;
    }
`

const DateFormInput = styled.input<{ isValidInput: boolean }>`
    min-width: 60px;
    max-width: 130px;
    height: 50px;
    border-radius: 8px;
    
    border: 1px solid ${props => props.isValidInput ? "hsl(0, 0%, 86%)" : "hsl(0, 100%, 67%)"};
    padding-left: 20px;
    font-family: 'Poppins';
    font-size: 24px;

    &:focus {
        border: 1px solid hsl(259, 100%, 65%);
    }

    &:hover { 
        border: 1px solid hsl(259, 100%, 65%);
    }

    &::placeholder {
        opacity: 0.5;
    }

    //600px or smaller screen
    @media screen and (max-width: 600px) {
        max-width: 90px;
        padding-left: 10px;
    }

`

const DateFormLabel = styled.p<{ isValidInput: boolean }>`
    font-size: 12px;
    color: ${props => props.isValidInput ? "hsl(0, 0%, 48%)" : "hsl(0, 100%, 67%)"};
    font-family: 'Poppins', sans-serif;
    letter-spacing: 4px;
    font-weight: 400;
    margin-bottom: 5px;
`
const Divider = styled.hr`
    height: 1px;
    width: 100%;
    background-color: hsl(0, 0%, 86%);
    width: 500px;
    @media screen and (max-width: 600px) {
    width: 300px;
    max-width: 300px;
    }
`

const DividerAndButtonConatiner = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
    margin-top: 70px;
    margin-bottom: 70px;
    }
`

const CalculateAgeButton = styled.button`
    background-color: hsl(259, 100%, 65%);
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
        align-items: center;
        justify-content: center;

    &:hover {
        background-color: hsl(0, 0%, 8%);
    }

    @media screen and (max-width: 600px) {
        width:60px;
        height: 60px;
        position: absolute;
        left: auto;
        right: auto;
        display: flex;
        align-items: center;
        justify-content: center;


    }
`

const ErrorText = styled.p`
    margin-top: 5px;
    color: hsl(0, 100%, 67%);
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    font-style: italic;
    row-gap: 20px;
    max-height: 18px ;
    word-wrap: break-word;
    @media screen and (max-width: 600px) {
    max-width: 100px;
    row-gap: 15px;
    }
`
const ErrorPlaceHolderDiv = styled.div`
    height: 18px;
    max-width: 178px;
    margin-top: 5px;
    @media screen and (max-width: 600px) {
    max-width: 100px;
    }
`

const ArrowIcon = styled.img`

    
 @media screen and (max-width: 600px) {
    width: 20px;
    height: 20px;
    }
    
`


const DateFormComponent = (props: DateFormProps) => {

    const { date, setDate, isYearFieldValid, isDayFieldValid, isMonthFieldValid, setIsDayFieldValid, setIsMonthFieldValid, setIsYearFieldValid, calculateAge, validateForm } = useDateService()

    const isFormValid = isDayFieldValid && isMonthFieldValid && isYearFieldValid



    const setDayField = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDayFieldValid === false) {
            setIsDayFieldValid(true)
            setIsMonthFieldValid(true)
            setIsYearFieldValid(true)
        }
        const newDate = { ...date, day: e.target.value }
        setDate(newDate)
    }

    const setMonthField = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isMonthFieldValid === false) {
            setIsDayFieldValid(true)
            setIsMonthFieldValid(true)
            setIsYearFieldValid(true)
        }
        const newDate = { ...date, month: e.target.value }
        setDate(newDate)
    }
    const setYearField = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isYearFieldValid === false) {
            setIsDayFieldValid(true)
            setIsMonthFieldValid(true)
            setIsYearFieldValid(true)
        }

        const newDate = { ...date, year: e.target.value }
        setDate(newDate)
    }


    const YearErrorMessage = () => {
        if (date.year.length <= 0 && !isYearFieldValid) {
            return <ErrorText>This field is required</ErrorText>
        }
        if (date.year.length > 0 && !isYearFieldValid) {
            return <ErrorText>The year must be in the past</ErrorText>
        }
        return <ErrorPlaceHolderDiv />
    }

    const MonthErrorMessage = () => {
        if (date.month.length <= 0 && !isMonthFieldValid) {
            return <ErrorText>This field is required</ErrorText>
        }
        if (date.month.length > 0 && !isMonthFieldValid) {
            return <ErrorText>Must be a valid month</ErrorText>
        }
        return <ErrorPlaceHolderDiv />
    }

    const DayErrorMessage = () => {
        if (date.day.length <= 0 && !isDayFieldValid) {
            return <ErrorText>This field is required</ErrorText>
        }
        if (date.day.length > 0 && !isDayFieldValid) {
            return <ErrorText>Must be a valid day</ErrorText>
        }
        return <ErrorPlaceHolderDiv />
    }

    const calculateAgeFunc = () => {
        calculateAge()
    }


    return (
        <>
            <FormContainer>
                <div>
                    <DateFormLabel isValidInput={isFormValid} >DAY</DateFormLabel>
                    <DateFormInput isValidInput={isFormValid} max={31} placeholder="DD" type="number" value={date.day} onChange={setDayField} maxLength={2} />
                    {!isFormValid && <DayErrorMessage />}

                </div>

                <div>
                    <DateFormLabel isValidInput={isFormValid} >MONTH</DateFormLabel>
                    <DateFormInput isValidInput={isFormValid} max={12} placeholder="MM" type="number" value={date.month} onChange={setMonthField} maxLength={2} />
                    {!isFormValid && <MonthErrorMessage />}

                </div>
                <div>
                    <DateFormLabel isValidInput={isFormValid}>YEAR</DateFormLabel>
                    <DateFormInput isValidInput={isFormValid} max={dayjs().year()} placeholder="YYYY" type="number" value={date.year} onChange={setYearField} maxLength={4} />
                    {!isFormValid && <YearErrorMessage />}

                </div>
            </FormContainer>



            <DividerAndButtonConatiner>
                <Divider />
                <CalculateAgeButton onClick={calculateAgeFunc} >
                    <ArrowIcon src="./../../../public/icon-arrow.svg" alt="dwda" />
                </CalculateAgeButton>
            </DividerAndButtonConatiner>
        </>
    )
}

export const DateForm = React.memo(DateFormComponent)