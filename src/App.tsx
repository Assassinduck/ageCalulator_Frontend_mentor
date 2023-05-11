import { useState } from 'react'
import styled from '@emotion/styled'
import { YearCalcView } from './Views/YearCalcView'
import { DateForm } from './Views/DateForm'

const OuterAppContainer = styled.div`
  background-color: hsl(0, 0%, 94%);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`


const AppContainer = styled.div`
  background-color: hsl(0, 0%, 100%);
  min-width: 300px;
  min-height: 450px;
  padding-left: 40px;
  padding-top: 25px;
  padding-right: 50px;
  padding-bottom: 50px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 140px;

  @media screen and (max-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
    }
`

const Divider = styled.hr`
    height: 1px;
    width: 500px;
    background-color: hsl(0, 0%, 86%);
    margin-top: 40px;

    
    
`

const DividerAndButtonConatiner = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 600px;
    width: 600px;
     @media screen and (max-width: 600px) {
    width: 300px;
    max-width: 300px;
    }
    
`

function App() {

  return (
    <OuterAppContainer >
      <AppContainer>
        <DateForm />

        <YearCalcView />
      </AppContainer>

    </OuterAppContainer>
  )
}

export default App
