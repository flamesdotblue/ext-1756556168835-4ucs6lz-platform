import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <div className="absolute inset-0">
      <Spline
        scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
