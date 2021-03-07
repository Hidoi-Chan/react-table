import React, { Component } from 'react'
import dataTable from '../data/table'
import classes from './Table.module.css'
import TableThTitle from './TableThTitle/TableThTitle'
import TableRow from './TableRow/TableRow'
import TableThInput from './TableThInput/TableThInput'
import Pagination from '../Pagination/Pagination'

function capitalizedString(str) {
    return str[1].toUpperCase() + str.slice(1).toLowerCase()
}

function renderTable(table) {
    return table.map(row => {
        return {
            id: row._id,
            name: row.name.first + ' ' + row.name.last,
            age: row.age,
            company: capitalizedString(row.company),
            salary: row.balance,
            shouldRender: true
        }
    })
}

export default class Table extends Component {

    state = {
        allItems: dataTable.length,
        table: renderTable(dataTable),
        header: {
            id: {
                text: '№',
                isSortedAscending: true,
                inputValue: ''
            },
            name: {
                text: 'Имя',
                isSortedAscending: null,
                inputValue: ''
            },
            age: {
                text: 'Возраст',
                isSortedAscending: null,
                inputValue: ''
            },
            company: {
                text: 'Компания',
                isSortedAscending: null,
                inputValue: ''
            },
            salary: {
                text: 'Заработная плата',
                isSortedAscending: null,
                inputValue: ''
            }
        },
        pagination: {
            currentPage: 1,
            onPage: 20,
            allItems: dataTable.length,
            startIndexAtPage: 0,
            lastIndexAtPage: 19
        }
    }

    renderThTitle() {
        return Object.keys(this.state.header).map((key, index) => {
            return (
                <TableThTitle 
                    key={index}
                    name={key}
                    isSorted={this.state.header[key].isSortedAscending}
                    clickHandler={this.sortTableClick}
                >
                    {this.state.header[key].text}
                </TableThTitle>
            )
        })
    }

    renderThInput() {
        return Object.keys(this.state.header).map((key, index) => {
            return (
                <TableThInput 
                    key={index}
                    name={key}
                    value={this.state.header[key].value}
                    changeHandler={this.filterTable}
                />
            )
        })
    }

    renderThead() {
        return (
            <React.Fragment>
                <tr>
                    {this.renderThTitle()}
                </tr>
                <tr>
                    {this.renderThInput()}
                </tr>
            </React.Fragment>
        )
    }

    renderRows() {

        return this.state.table
            .filter(row => row.shouldRender)        
            .map(row => {
                return (
                    row.shouldRender && 
                    <TableRow
                        key={row.id}
                        id={row.id + 1}
                        name={row.name}
                        age={row.age}
                        company={row.company}
                        salary={row.salary}
                    />
                )
            }).slice(this.state.pagination.startIndexAtPage, this.state.pagination.lastIndexAtPage + 1)
    }

    getNewSortedValue = (headerKey, targetKey) => {
        if (headerKey === targetKey) {
            if (this.state.header[headerKey].isSortedAscending) {
                return false
            } else {
                return true
            }
        }
        
        return null
    }

    sortTable = (key, table) => {
        if (key === 'name' || key === 'company') {
            if (this.state.header[key].isSortedAscending) {
                table.sort((a,b) => a[key] < b[key] ? 1 : -1)
            } else {                
                table.sort((a,b) => a[key] > b[key] ? 1 : -1)
            }
        } else {
            if (this.state.header[key].isSortedAscending) {
                table.sort((a,b) => b[key] - a[key])
            } else {
                table.sort((a,b) => a[key] - b[key])
            }
        }
    }

    sortTableClick = event => {

        const target = event.target.closest('th')
        const key = target.dataset.name

        const table = [...this.state.table]
        const header = {...this.state.header}

        this.sortTable(key, table)

        Object.keys(header).forEach(headerKey => header[headerKey].isSortedAscending = this.getNewSortedValue(headerKey, key))

        this.setState({
            table,
            header
        })
    }

    filterTable = event => {

        const header = {...this.state.header}
        const key = event.target.dataset.name
        header[key].inputValue = event.target.value

        const table = [...this.state.table]
        const keysForFilter = Object.keys(header)
        let countItems = this.state.allItems
        
        table.forEach(row => {
            
            for (let filterKey of keysForFilter) {

                if (!row[filterKey].toString().toLowerCase().includes(header[filterKey].inputValue.toLowerCase())) {
                    row.shouldRender = false
                    countItems--
                    break
                }

                row.shouldRender = true
            }
        })
        
        this.changePaginationPage(1, countItems)

        this.setState({
            table,
            header
        })

        this.props.history.push('/1')
    }

    renderPagination() {
        return (
            <Pagination 
                clickHandler={this.changePaginationPage}
                currentPage={this.state.pagination.currentPage}
                onPage={this.state.pagination.onPage}
                allItems={this.state.pagination.allItems}
            />
        )
    }

    changePaginationPage = (page, allItems = this.state.pagination.allItems) => {
        
        const pagination = {...this.state.pagination}
        pagination.currentPage = page
        pagination.allItems = allItems
        pagination.startIndexAtPage = pagination.onPage * (pagination.currentPage - 1)
        pagination.lastIndexAtPage = (pagination.onPage * pagination.currentPage) - 1

        if (pagination.lastIndexAtPage > allItems) {
            pagination.lastIndexAtPage = allItems
        }

        this.setState({
            pagination
        })
    }

    componentDidUpdate() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {
        return (
            <React.Fragment>
                <table className={classes.Table}>
                    <thead>
                        {this.renderThead()}
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                {this.renderPagination()}
            </React.Fragment>
        )
    }
}
