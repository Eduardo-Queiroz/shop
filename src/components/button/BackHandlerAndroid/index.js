import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {BackHandler} from 'react-native';

class BackHandlerAndroid extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed),
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackPressed,
        ),
    );
  }

  onBackPressed = () => {
    const {backTo} = this.props;
    if (backTo) return this.props.navigation.navigate(backTo);
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  render() {
    return this.props.children || null;
  }
}

export const AndroidBackHandler = withNavigation(BackHandlerAndroid);
