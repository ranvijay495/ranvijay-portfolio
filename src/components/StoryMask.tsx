import React, { useRef, useEffect } from 'react';
import './styles/StoryMask.css';

interface StoryMaskProps {
  defaultHtml: string;
  maskHtml: string;
  className?: string;
  maskBgColor?: string;
  textColor?: string;
}

export default function StoryMask({ 
  defaultHtml, 
  maskHtml, 
  className = '',
  maskBgColor = 'var(--accent2)',
  textColor = '#000'
}: StoryMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0, radius: 0 });
  const current = useRef({ x: 0, y: 0, radius: 0 });

  useEffect(() => {
    let animationFrameId: number;
    
    // Intial positioning fallback
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const hw = (rect.width / 2) + 300;
      const hh = (rect.height / 2) + 300;
      mouse.current.x = hw;
      mouse.current.y = hh;
      current.current.x = hw;
      current.current.y = hh;
    }

    const render = () => {
      // Instantly track X and Y so cursor never escapes the center
      current.current.x = mouse.current.x;
      current.current.y = mouse.current.y;
      
      // Smoothly interpolate the radius
      current.current.radius += (mouse.current.radius - current.current.radius) * 0.15;

      if (maskRef.current) {
        maskRef.current.style.clipPath = `circle(${current.current.radius}px at ${current.current.x}px ${current.current.y}px)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) + 300;
      mouse.current.y = (e.clientY - rect.top) + 300;
    }
  };

  const onMouseEnter = () => mouse.current.radius = 280;
  const onMouseLeave = () => mouse.current.radius = 0;

  return (
    <div 
      className={`story-mask-container ${className}`} 
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="story-mask-default" 
        dangerouslySetInnerHTML={{ __html: defaultHtml }} 
      />
      
      <div 
        className="story-mask-hover-block" 
        ref={maskRef}
        style={{ backgroundColor: maskBgColor, color: textColor }}
      >
        {/* We use identical layout mechanics mapped by CSS padding offset to ensure it falls directly in place */}
        <div 
          className="story-mask-hover-text"
          dangerouslySetInnerHTML={{ __html: maskHtml }} 
        />
      </div>
    </div>
  );
}
