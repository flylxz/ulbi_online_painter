import React from 'react';

import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/React';
import Eraser from '../tools/Eraser';
import Circle from '../tools/Circle';
import Line from '../tools/Line';

import '../styles/toolbar.scss';

export const Toolbar = () => {
  const changeColor = (e) => {
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionId + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="toolbar ">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      />
      <button
        className="toolbar__btn line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      />
      <input
        onChange={(e) => changeColor(e)}
        type="color"
        style={{ marginLeft: 10 }}
      />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
        // disabled={!!canvasState.pushToUndo.length}
        // disabled={true}
      />
      <button
        className={`toolbar__btn redo ${
          !canvasState.pushToRedo.length ? 'disable' : ''
        }`}
        onClick={() => canvasState.redo()}
        // disabled={!!canvasState.pushToRedo.length}
      />
      <button className="toolbar__btn save" onClick={download} />
    </div>
  );
};
