import React from 'react'
import { Button } from './Button'

interface props {
    onclick: () => void
}

const FinishedChatButton = ({ onclick }: props) => {
    return (
        <Button onClick={() => onclick()} variant={"destructive"}>Cancel</Button>
    )
}

export default FinishedChatButton