import React from 'react';
import './App.scss';
import ContextWrapper from './appContext'
import HeaderButtons from './HeaderButtons';
import Curriculum from './Curriculum';

function App() {
  return (
    <ContextWrapper>
        <HeaderButtons  />
        <Curriculum   />
    </ContextWrapper>
  );
}

export default App;
