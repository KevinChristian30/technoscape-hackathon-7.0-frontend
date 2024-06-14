import React from 'react'
import SidePanelMobile from './SidePanelMobile'
import ProfileButton from '../ui/ProfileButton'
import ThemeToggleButton from '../ui/ChangeThemeButton'

const Navbar = () => {
    return (
        <>
            <SidePanelMobile />
            <ThemeToggleButton />
            <ProfileButton />
        </>
    )
}

export default Navbar