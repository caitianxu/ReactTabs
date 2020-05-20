import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ToastAndroid,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';

import { WebView } from 'react-native-webview';

import ScanQRCode from './src/components/ScanQRCode';
import ImagePicker from './src/components/ImagePicker';
import NativeFile from './src/components/NativeFile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ScanQRCode_visible: false,
      ImagePicker_visible: false,
      NativeFile_visible: false,
    };
  }
  async changeVim() {
    if (!this.state.ScanQRCode_visible) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('获得权限');
        this.setState({
          ScanQRCode_visible: true,
        });
      } else {
        ToastAndroid.show('未获得权限!', ToastAndroid.SHORT);
      }
    } else {
      this.setState({
        ScanQRCode_visible: false,
      });
    }
  }
  changePic = () =>{
    this.setState({
      ImagePicker_visible: !this.state.ImagePicker_visible,
    });
  }
  changeFile = () =>{
    this.setState({
      NativeFile_visible: !this.state.NativeFile_visible,
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <WebView source={{ uri: 'https://reactnative.cn/' }} />
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <View style={{marginTop: 20}}>
              <Button title="开启扫码" onPress={this.changeVim.bind(this)} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="使用照片" onPress={this.changePic.bind(this)} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="文件管理" onPress={this.changeFile.bind(this)} />
            </View>
          </ScrollView>
          {/* 扫码 */}
          {this.state.ScanQRCode_visible ? (
            <ScanQRCode close={this.changeVim.bind(this)} />
          ) : null}
          {/* 照片 */}
          {this.state.ImagePicker_visible ? (
            <ImagePicker close={this.changePic.bind(this)} />
          ) : null}
          {/* 文件 */}
          {this.state.NativeFile_visible ? (
            <NativeFile close={this.changeFile.bind(this)} />
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: StatusBar.currentHeight || 20,
  },
  row: {
    padding: 20,
  },
});

export default App;
