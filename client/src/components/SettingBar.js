import React from 'react';
import toolState from '../store/toolState';

import '../styles/toolbar.scss';

export const SettingBar = () => {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Line width</label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ margin: '0 10px' }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color">Stroke Color</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        id="stroke-color"
        type="color"
        style={{ margin: '0 10px' }}
      />
      <label htmlFor="fill-color">Fill Color</label>
      <input
        onChange={(e) => toolState.setFillColor(e.target.value)}
        id="fill-color"
        type="color"
        style={{ margin: '0 10px' }}
      />
    </div>
  );
};
