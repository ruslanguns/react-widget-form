import React from 'react'
import Config from '../../config';
import './Widget.scss';
import { FormScreen } from './FormScreen';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const widgetName = Config.name;

class Widget extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            message: null,
        };
    }

    render() {
      return <Provider store={ store }>
              <GoogleReCaptchaProvider
                useRecaptchaNet
                reCaptchaKey="6LeLZ7AZAAAAAB5tTLi-L5I5atxIZa6W6r0JwjSo">
                <FormScreen/>
              </GoogleReCaptchaProvider>
            </Provider>;
    }

    setMessage(message){
        this.setState({message: message});
    }
};

export default Widget;