import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Actions} from '~/redux/reducers/global';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width} = Dimensions.get('window');

function PanelOffline() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Sem conexão com a internet!</Text>
    </View>
  );
}

class OfflineNotice extends Component {
  handleConnectivityChange = state => {
    this.props.globalChangeConnectivity(state.isConnected);
  };

  componentDidMount() {
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  render() {
    if (!this.props.hasConnectivity) {
      return <PanelOffline />;
    }
    return null;
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'relative',
  },
  offlineText: {
    color: '#fff',
  },
});

export default connect(
  ({global}) => ({
    hasConnectivity: global.hasConnectivity,
  }),
  dispatch => bindActionCreators(Actions, dispatch),
)(OfflineNotice);
