import React, { Component } from 'react'

import ScatterPlot2d from './ScatterPlot2d';
import fetch from 'isomorphic-fetch'
import { config } from '../config'

class CompareSection extends Component {

  constructor () {
    super();
    this.state = {
      error: null,
      loading: false,
      data: null,
      queryA: '',
      queryB: ''
    }
    this.queryA = React.createRef();
    this.queryB = React.createRef();
    this._onCompareSubmit = this._onCompareSubmit.bind(this);
  }

  render () {
    const result = this.state.result
    const queryA = this.state.queryA
    const queryB = this.state.queryB
    const axesLabels = this._axesLabels(queryA, queryB)
    return (
      <div className='row'>
        <div className='query-column right'>
          <div className='filters'>
            <form className='form' onSubmit={this._onCompareSubmit}>
              <div className='form-group'>
                <label htmlFor='queryAInput'>Query A:</label>
                <input id='queryAInput' ref={this.queryA} className='form-control' type='text' defaultValue={queryA} />
              </div>
              <div className='form-group'>
                <label htmlFor='queryBInput'>Query B:</label>
                <input id='queryBInput' ref={this.queryB} className='form-control' type='text' defaultValue={queryB} />
              </div>
              <div className='form-group'>
                <input type='submit' className='btn btn-outline-light btn-block' value='Compare'/>
              </div>
            </form>
          </div>
        </div>
        <div className='result comparison'>
          <div className='center-pane'>
            {result && (
              <ScatterPlot2d ref='plot' labels={result.labels} points={result.comparison} axes={axesLabels} showLabels='true' />
            )}
          </div>
        </div>
      </div>
    )
  }

  compare (queryA, queryB) {
    this.setState({loading: true, error: null, result: null})
    const params = new URLSearchParams();
    params.append("queries", queryA);
    params.append("queries", queryB);
    params.append("limit", "30");
    fetch(config.baseUrl + config.comparePath + '?' + params).then(response => {
      response.json().then(data => {
        this.setState({
          error: response.error ? new Error(response.error.message) : null,
          result: data.result,
          loading: false
        })
      });
    });
  }

  _onCompareSubmit (e) {
    e && e.preventDefault()
    var queryA = this.queryA.current.value
    var queryB = this.queryB.current.value
    this.setState({queryA, queryB})
    this.compare(queryA, queryB)
  }

  _axesLabels (queryA, queryB) {
    return [queryA.split(' AND ')[0], queryB.split(' AND ')[0]]
  }
}

export default CompareSection;
