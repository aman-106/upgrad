import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { store } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// store data
const myStorage = window.localStorage;
const mockData = {
  questionList:[
    {
      question:"q1",
      id:'q1',
      type:'mcq'
    },
    {
      question:"q2",
      id:'q2',
      type:'submission'
    },
    {
        question:"q3",
        id:'q3',
        type:'passage'
    }
  ],
  studentList:[
    {
      name:'s1',
      id:'s1',
      questions:[]
    },
    {
      name:'s2',
      id:'s2',
      questions:[]
    }
  ]
};

if(myStorage){
  if(!Object.prototype.hasOwnProperty.call(myStorage,'upgrad')){
    console.log('datataodl');
    myStorage.setItem('upgrad', JSON.stringify(mockData));
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root'));
  registerServiceWorker();
