import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === 'vertical') {
    resizableProps = {
      // here 100 is in pixels
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, window.innerHeight * 0.95],
      // default height and width of the scrollable in pixels
      height: 300,
      width: Infinity,
      // place where should scroll bar should be
      resizeHandles: ['s'],
    };
  } else {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.25, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
