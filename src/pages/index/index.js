import Taro, { Component } from '@tarojs/taro'
import { View, Map } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    location: {},
  }

  componentDidMount() {
    Taro.getLocation({
      success: ({ longitude, latitude }) => {
        this.setState({
          location: {
            longitude,
            latitude
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }

  render () {
    const {
      location: {
        longitude,
        latitude
      }
    } = this.state
    return (
      <View className='page-index'>
        <Map
          className='comp-map'
          show-location
          longitude={longitude}
          latitude={latitude}
        />
        {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View> */}
      </View>
    )
  }
}

export default Index
