import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Webcam from 'react-webcam';
import MobileNet from './tensorflow/MobileNet';
import './_build/App.css';
import tensorflowlogo from './img/tensorflowjs.png';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            devices:null
        };
        this.mobileNet = null;
        let videoDevices = [];
        navigator.mediaDevices.enumerateDevices().then(devices => {
            for(let i = 0; i < devices.length; i++){
                if(devices[i].kind === 'videoinput'){
                    videoDevices.push(devices[i]);
                }
            }
            this.setState({devices:videoDevices});
        });
    }
    capture = async () => {
        const self = this;
        const imageSrc = this.webcam.getScreenshot();
        await this.mobileNet.predictImage(imageSrc);
        setTimeout(()=>{
            self.capture();
        }, 100);
    };


    setRef = (webcam) => {
        this.webcam = webcam;
    };

    webcamLoaded = async () =>{
        // now we can rock and roll
        this.props.store.isWebcamLoaded = true;
        console.log('webcam loaded');
        const self = this;
        this.mobileNet = new MobileNet(this.props.store);
        await this.mobileNet.init();
        console.log('Model Loaded');
        this.capture();

        //
    };


    render() {
        const {status, classes,isModelLoaded} = this.props.store;
        const videoStyle = {
            width:'100%'
        };

        let classifiers = [];
        if(classes){
            for(let i = 0; i < classes.length; i++){
                const probabilityStr = `${(classes[i].probability * 100).toFixed(2)}%`;
                const singleClass = classes[i].className.split(',')[0];
                classifiers.push(
                    <tr key={i}>
                        <td className="left">{singleClass}</td>
                        <td className="right">{probabilityStr}</td>
                    </tr>
                )
            }
        }
        if(this.state.devices){
            return (
                <div className="App">
                    <div className="top-sting">
                        <div className="title">What's That?</div>
                        <div className="powered-by"> Powered By</div>
                        <div className="images">
                            <a href="https://js.tensorflow.org/" target="_blank">
                                <img src={tensorflowlogo}/>
                            </a>
                        </div>
                    </div>
                    <div className="webcam-container">
                        <Webcam
                            audio={false}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            style={videoStyle}
                            onUserMedia={this.webcamLoaded}
                            videoSource={this.state.devices[this.state.devices.length-1].deviceId}
                        />
                    </div>
                    {classifiers.length === 0 ?
                        <div className="status">{status}</div>
                        :null}
                    <div className="classes">
                        <table>
                            <thead>
                            <tr>
                                <th className="left">Classifier</th>
                                <th className="right">Probability</th>
                            </tr>
                            </thead>
                            <tbody>
                            {classifiers}
                            </tbody>
                        </table>
                    </div>
                    <div className="ismodelloaded">{isModelLoaded}</div>
                    {/*<pre>{JSON.stringify(this.state.devices, null, 4)}</pre>*/}


                </div>
            );
        } else {
            return(<h3>We could not detect video devices</h3>)
        }
    }
}

export default observer(App);
