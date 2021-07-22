import React from 'react'

export default function ColorPalette(props) {
  let colors = [
    "#9c3838", // red
    "#c28846", // dandelion
    "#ebdf8a", // mustard yellow
    "#91b58d", // pale green
    "#62805e", // forest green
    "#6883b3", // light blue
    "#59667d", // dark blue
    "#8b6f96", // lilac
    "#b5b6bd", // blue-grey
    "#525254"  // dark-blue-grey
  ];

  let colorBubbles = colors.map(color => {
    let style = { backgroundColor: color }
    return (
      <li className="color-bubble" key={color} style={style} 
        onClick={() => props.setSelected(color)}>
        {props.selected === color ? <img src={process.env.PUBLIC_URL + "/checkmark.png"} alt="checkmark" /> : null}
      </li>
    )
  })

  return (
    <ul className="color-selection">
      {colorBubbles}
    </ul>
  )
}
