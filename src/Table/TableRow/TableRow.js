const TableRow = props => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.age}</td>
            <td>{props.company}</td>
            <td>{props.salary}</td>
        </tr>
    )
}

export default TableRow