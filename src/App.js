import React, { Component } from 'react'
import List from './List'

class App extends Component {
  state = {
    posts: [],
    header: [
      {
        key: 'id',
        title: 'ID',
        sortable: false,
      },
      {
        key: 'title',
        title: 'Title',
        sortable: true,
      },
      {
        key: 'author',
        title: 'Author',
        sortable: true,
      },
    ],
    loading: false,
  }

  componentDidMount() {
    const api = 'https://www.reddit.com/r/reactjs/.json'

    const headers = {
      'Accept': 'application/json',
    }

    this.setState({
      loading: true,
    })

    fetch(api, { headers })
      .then(res => res.json())
      .then(({ data }) => {
        this.setState({
          posts: data.children,
          loading: false,
        })
      })
  }

  render() {
    const { header, posts, loading } = this.state
    return (
      <div className="App">
        <List header={header} itens={posts} loading={loading} />
      </div>
    )
  }
}

export default App
