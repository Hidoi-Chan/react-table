import SvgIcon from '@material-ui/core/SvgIcon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classes from './TableThTitle.module.css'

const TableThTitle = props => {
    const svgCls = [
        classes.SvgIcon,
        props.isSorted ? classes.up : '',
        props.isSorted === false ? classes.down : ''
    ]

    return (
        <th 
            data-name={props.name}
            onClick={props.clickHandler}
            className={classes.TableThTitle}
        >
            {props.children}&nbsp;
            <SvgIcon
                className={svgCls.join(' ')}
                component={ExpandMoreIcon}
            />
        </th>
    )
}

export default TableThTitle