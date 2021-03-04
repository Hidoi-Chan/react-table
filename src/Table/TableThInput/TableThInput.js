import classes from './TableThInput.module.css'

const TableThInput = props => {
    return (
        <th className={classes.TableThInput}>
            <input
                type="text" 
                data-name={props.name}
                value={props.value}
                onChange={props.changeHandler} 
            />
        </th>
    )
}

export default TableThInput