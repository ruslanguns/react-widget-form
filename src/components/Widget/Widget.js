import React from 'react'
import Config from '../../config';
import './Widget.scss';
import { FormScreen } from './FormScreen';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
              <FormScreen/>
            </Provider>;
    }

    setMessage(message){
        this.setState({message: message});
    }
};

export default Widget;