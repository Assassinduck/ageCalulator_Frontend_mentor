import React from "react"
import { useDateService } from "../../service/DateService"
import styled from "@emotion/styled"

export interface YearCalcViewProps {

}

const DateNumberTextStyle = styled.p`
    font-size: 90px;
    font-family: 'Poppins', sans-serif;
    font-weight: "800i";
    color: hsl(259, 100%, 65%);
    text-align: center;

    @media screen and (max-width: 600px) {
    font-size:50px;
    margin-right: 15px;

    }

`

const DateIntervalsTextStyle = styled.p`
    font-size: 90px;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-style: italic;
    color: hsl(0, 0%, 8%);
    text-align: center;

@media screen and (max-width: 600px) {
    font-size: 50px;
    }

    `

const DateTextContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 95px;
    text-align: start;
    align-items: center;

    @media screen and (max-width: 600px) {
        max-height: 60px;
        align-items: flex-end;
    }

`

const YearCalcViewComponent = (props: YearCalcViewProps) => {
    const { isYearFieldValid, date, isDayFieldValid, isMonthFieldValid, calculateAge, age } = useDateService()

    const yearField = !age?.year || !isYearFieldValid ? "--" : age.year
    const monthFieldValid = !age?.month || !isMonthFieldValid ? "--" : age.month
    const dayFieldValid = !age?.day || !isDayFieldValid ? "--" : age.day

    return (
        <div>
            <DateTextContainer>
                <DateNumberTextStyle>{yearField}</DateNumberTextStyle>
                <DateIntervalsTextStyle>years</DateIntervalsTextStyle>
            </DateTextContainer>

            <DateTextContainer>
                <DateNumberTextStyle>{monthFieldValid}</DateNumberTextStyle>
                <DateIntervalsTextStyle>months</DateIntervalsTextStyle>
            </DateTextContainer>
            <DateTextContainer>
                <DateNumberTextStyle>{dayFieldValid}</DateNumberTextStyle>
                <DateIntervalsTextStyle>days</DateIntervalsTextStyle>
            </DateTextContainer>
        </div>
    )
}

export const YearCalcView = React.memo(YearCalcViewComponent)