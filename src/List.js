import React, { Component, Fragment } from 'react'
import './List.css'

class List extends Component {
  state = {
    orderKey: 'title',
    orderDirection: 'asc',
  }

  compareValues(key, order) {
    return function(a, b) {
      if(!a.data.hasOwnProperty(key) || !b.data.hasOwnProperty(key)) {
        return 0
      }
  
      const varA = (typeof a.data[key] === 'string') ?
        a.data[key].toUpperCase() : a.data[key]
      const varB = (typeof b.data[key] === 'string') ?
        b.data[key].toUpperCase() : b.data[key]
  
      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      )
    }
  }

  handleSetOrder(key) {
    this.setState(prevState => ({
      orderKey: key,
      orderDirection: prevState.key !== key ? (prevState.orderDirection === 'asc' ? 'desc' : 'asc') : 'asc',
    }))
  }

  render () {
    const { header, itens, loading } = this.props
    const { orderKey, orderDirection } = this.state
    
    const itensSorted = itens.sort(this.compareValues(orderKey, orderDirection))

    if (loading) {
      return (
        <div className="List_loading">
          Loading
        </div>
      )
    }

    if (itens.length === 0) {
      return (
        <div className="List_empty">
          Empty List
        </div>
      )
    }

    return (
      <div className="List">
        {header.map((( headerItem ) => {
          const classActive = headerItem.key === orderKey ? 'List_header_item_active' : ''
          const classOrder = headerItem.key === orderKey ? `List_header_item_${orderDirection}` : ''
          const classSortable = headerItem.sortable ? 'List_header_item_sortable' : ''

          return (
            <div className={`List_header_item ${classActive} ${classOrder} ${classSortable}`} key={headerItem.key} onClick={headerItem.sortable ? () => this.handleSetOrder(headerItem.key) : () => {}}>
              {headerItem.title}
            </div>
          )
        }))}

        {itensSorted.map((( item ) => {
          return (
            <Fragment key={item.data.id}>
              {header.map((( headerItem ) => {
                return (
                  <div className="List_item_value" key={`${item.data.id}-${item.data[headerItem.key]}`}>
                    {item.data[headerItem.key]}
                  </div>
                )
              }))}
            </Fragment>
          )
        }))}
      </div>
    )
  }
}

export default List
