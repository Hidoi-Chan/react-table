import classes from './Pagination.module.css'
import { NavLink, withRouter } from 'react-router-dom'

const Pagination = props => {
    
    const pages = Math.ceil(props.allItems / props.onPage)

    const renderLinks = () => {

        const links = []

        for (let i = 1; i <= pages; i++) {
            links.push(
                <NavLink
                    onClick={() => props.clickHandler(i)}
                    activeClassName={classes.active}
                    className={classes.Link} 
                    key={i} 
                    to={'/' + i}
                >
                    {i}
                </NavLink>
            )         
        }
        
        return links
    }

    return (
        <div className={classes.Pagination}>
            {renderLinks()}
        </div>
    )
}

export default withRouter(Pagination)