import React from 'react'
import MarkdownData from '../../data/post.md'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <div className='profile'>
        <img src={require('../images/link.jpg')} />
        <h1>{this.props.heading}</h1>
        <div className='content' dangerouslySetInnerHTML={{ __html: MarkdownData }} />
      </div>
    )
  }
}
