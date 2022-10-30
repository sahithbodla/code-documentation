import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    // This function will be called on component de mounting process or when state width is updated again
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'vertical') {
    resizableProps = {
      // here 100 is in pixels
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, innerHeight * 0.95],
      // default height and width of the scrollable in pixels
      height: 300,
      width: Infinity,
      // place where should scroll bar should be
      resizeHandles: ['s'],
    };
  } else {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.25, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
