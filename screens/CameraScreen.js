import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
// import * as handpose from '@tensorflow-models/handpose';
import * as mobilenet from "@tensorflow-models/mobilenet";

const TensorCamera = cameraWithTensors(Camera);

const styles = StyleSheet.create({
  camera : {
    width: 700/2,
    height: 800/2,
    zIndex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  cameraView: {
    display: 'flex',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    paddingTop: 10
  },
  body: {
    padding: 5,
    paddingTop: 25
  },
});

class CameraScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.name = "tf-adam";
    this.state = {
      isModelReady: false,
      useModel: {},
      model: null,
    };
  }

  init() {}

  async componentDidMount() {
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    console.log("componentDidMount: tf.ready is set");
    console.log("the MyModelLoadLocal component is mounted");
    const { status } = await Camera.requestPermissionsAsync();
    // this.setState({cameraPermission: status === 'granted'});
    console.log("start loading model");
    // const model = await handpose.load();
    const model = await mobilenet.load();
    this.setState({ isModelReady: true, model });
    console.log("model loaded");
  }

  makeHandleCameraStream() {
    return (images, updatePreview, gl) => {
      const loop = async () => {
          const nextImageTensor = images.next().value;
          // const predictions = await this.state.model.estimateHands(nextImageTensor);
          console.log(nextImageTensor)
          const predictions = await this.state.model.classify(nextImageTensor);
          this.setState({predictions})
          requestAnimationFrame(loop);
      };
      loop();
    };
  }

  render() {
   const textureDims = Platform.OS === "ios"? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };
   const tensorDims = { width: 152, height: 200 }; 
    return (
      <View style={styles.body}>
      <View style={styles.cameraView}>
        {this.state.model && (
          <TensorCamera
            // Standard Camera props
            style={styles.camera}
            type={Camera.Constants.Type.back}
            // Tensor related props
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={tensorDims.height}
            resizeWidth={tensorDims.width}
            resizeDepth={3}
            onReady={this.makeHandleCameraStream()}
            autorender={true}
          />
        )}

        {this.state.predictions && 
            <View>
            {this.state.predictions.map(p => <Text>{p.className}</Text>)}
            </View>
        }

      </View>
    </View>
    );
  }
}

export default CameraScreen;