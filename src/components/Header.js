import { useLocation } from 'react-router-dom'

import Button from "./Button";

const Header = ({onAdd, showAddTask}) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            { location.pathname === '/' && <Button 
            text={showAddTask ? 'Close' : 'Add'} 
            color={showAddTask? 'red' : 'green'}
            onClick={onAdd} />}
        </header>
    )
}

export default Header
