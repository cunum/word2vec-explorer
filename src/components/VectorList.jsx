import React, { Component } from 'react'

class VectorList extends Component {

  constructor () {
    super();
    this.state = { selected: null }
    this.onClick = this.onClick.bind(this);
  }

  render () {
    let data = this.props.data
    let labels = data.labels.slice(0, this.props.limit || 200)
    let itemsHtml = []
    for (let i = 0; labels.length > i; i++) {
      let className = 'list-group-item'
      if (this.state.selected === labels[i]) className += ' active'
      let badgeHtml = ''
      if (data.distances) {
        let distance = Math.round(data.distances[i] * 100) / 100
        badgeHtml = <span className='badge badge-primary badge-pill' title={data.distances[i]}>{distance}</span>
      }
      itemsHtml.push(<a href='#' className={className} key={i} onClick={this.onClick} data-index={i} data-label={labels[i]}>{badgeHtml}{labels[i]}</a>)
    }
    return (
      <div>
        <div className='panel-heading'>{this.props.title}</div>
        <div className='vector-list panel panel-default'>
          <div className='list-group'>
            {itemsHtml}
          </div>
        </div>
      </div>
    )
  }

  onClick (e) {
    e && e.preventDefault();
    const query = e.target.attributes['data-label'].value;
    const index = parseInt(e.target.attributes['data-index'].value, 10);
    this.setState({ selected: query });
    this.props.onSelect && this.props.onSelect({query, index});
  }
}

export default VectorList;
