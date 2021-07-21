import React from 'react'

export default function ColorPalette(props) {
  let colors = ["#98e33d", "#9009e9", "#c9c159", "#1381f2", "#8ab3dc", "#fbff75", "#49e1c6", "#1d3a05"
, "#ea5620"]

  let colorBubbles = colors.map(color => {
    let style = {
      backgroundColor: color
    }
    return (
    <li className="color-bubble" key={color} style={style} 
        onClick={() => props.setSelected(color)}>
    </li>)
  })
  return (
    <>
    <ul>
      {colorBubbles}
    </ul>
    </>
  )
}
