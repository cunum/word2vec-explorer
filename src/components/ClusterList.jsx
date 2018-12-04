import React, { Component } from 'react'

class ClusterList extends Component {

  constructor () {
    super();
    this.state = {
      selected: null
    }
    this.onClick = this.onClick.bind(this);
  }

  render () {
    let data = this.props.data
    let color = this.props.color
    let itemsHtml = []
    for (let i = 0; data.cluster_centroids_closest_nodes.length > i; i++) {
      let className = 'list-group-item'
      if (this.state.selected === i) className += ' active'
      let closestNodeId = data.cluster_centroids_closest_nodes[i]
      let label = data.labels[closestNodeId]
      let numClusters = data.clusters.filter((cluster) => cluster === i).length
      let badgeStyle = {backgroundColor: color(i)}
      itemsHtml.push(<a href="/" className={className} key={i} onClick={this.onClick} data-index={i}><span className='badge' style={badgeStyle}>{numClusters}</span>{label}</a>)
    }
    return (
      <div>
        <div className='panel-heading'>{this.props.title}</div>
        <div className='cluster-list panel panel-default'>
          <div className='list-group'>
            {itemsHtml}
          </div>
        </div>
      </div>
    )
  }

  onClick (e) {
    const clusterFilter = parseInt(e.target.attributes['data-index'].value, 10);
    this.props.onSelect(clusterFilter);
  }
}

export default ClusterList;