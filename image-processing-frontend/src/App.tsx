import React from 'react';
import ImageEditor from './components/ImageEditor';
import { ImageProvider } from './context/ImageContext';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div>
        <h1>Real-Time Image Processing</h1>
        <ImageEditor />
      </div>
    </ImageProvider>
  );
};

export default App;
