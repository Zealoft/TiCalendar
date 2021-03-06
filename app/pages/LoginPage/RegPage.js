import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import {
  SafeAreaView,
  NavigationActions,
  StackActions
} from 'react-navigation';

import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'; // 引入connect函数
import * as registerAction from '../../action/RegAction';// 导入action方法
import { THEME, THEME_BACKGROUND, THEME_TEXT } from '../../assets/css/color';
import { getStackOptions } from '../../common/NavigatorOpts';
import CButton from '../../common/button';

// 清空导航记录，跳转到首页
// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({routeName: 'Login'})
//     ]
// });

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' }),
    // NavigationActions.navigate({ routeName: 'settings' })
  ]
});
// navigation.dispatch(resetAction);

class RegPage extends Component {

  static navigationOptions = getStackOptions('注册');
  mobile = '';
  password = '';
  password2 = '';
  email = '';
  school = '';

  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  goBack() {
    this.props.navigation.goBack();
  }

  // 状态更新
  shouldComponentUpdate(nextProps, nextState) {
    // 注册成功,切到登录
    if (nextProps.status === '注册成功' && nextProps.isSuccess) {
      Alert.alert('提示','注册成功',[{text:"好"}]);

      this.props.navigation.dispatch(resetAction);
      return false;
    }
    return true;
  }

  updateState(key, val) {
    let state = this.state;
    state[key] = val;
    this.setState(state);
  }

  render() {
    let message = this.state && this.state.message ? this.state.message : '';
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.regPage}>
          <Input style={styles.regInput} placeholder='用户名'
            autoCapitalize={'none'} maxLength={30}
            onChangeText={(text) => this.mobile = text} />

          <Input style={styles.regInput} placeholder='密码' secureTextEntry={true}
            autoCapitalize={'none'} maxLength={30}
            onChangeText={(text) => this.password = text} />

          <Input style={styles.regInput} placeholder='确认密码' secureTextEntry={true}
            autoCapitalize={'none'} maxLength={30}
            onChangeText={(text) => this.password2 = text} />

          <Input style={styles.regInput} placeholder='电子邮箱' keyboardType={'email-address'}
            autoCapitalize={'none'} maxLength={30}
            onChangeText={(text) => this.email = text} />
          
          <Input style={styles.regInput} placeholder='学校' 
            autoCapitalize={'none'} maxLength={30}
            onChangeText={(text) => this.school = text} />

          <Button title="注册" onPress={() => this.doReg()} />
          {/* <CButton style={styles.regInput} title={'提交'} onPress={() => this.doReg()} /> */}
          <Text style={styles.message}>{message}</Text>
          <Text style={{ marginTop: 16, fontSize: 12 }}>状态: {this.props.status}</Text>
        </View>

      </SafeAreaView>
    );
  }

  doReg() {
    const { reg } = this.props;
    if (!this.mobile) {
      this.updateState('message', '请输入手机号码');
      return;
    }
    if (!this.password) {
      this.updateState('message', '请输入登录密码');
      return;
    }
    if (!this.password2) {
      this.updateState('message', '请输入确认密码');
      return;
    }
    if (!this.email) {
      this.updateState('message', '请输入电子邮箱');
      return;
    }
    if (this.password !== this.password2) {
      this.updateState('message', '前后两次密码不一致');
      return;
    }
    reg(this.mobile, this.password, this.email,this.school);
  }






}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  regPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: THEME_BACKGROUND
  },
  regInput: {
    marginBottom: 8
  },
  message: {
    marginTop: 20,
    color: THEME_TEXT,
    fontSize: 18
  }


});

export default connect(
  (state) => ({
    status: state.reg.status,
    isSuccess: state.reg.isSuccess
  }),
  (dispatch) => ({
    reg: (u, p, e, s) => dispatch(registerAction.reg(u, p, e, s)),
  })
)(RegPage)

// export default Main;
