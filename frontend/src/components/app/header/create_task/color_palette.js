import React from 'react'

export default function ColorPalette(props) {
  const colors = props.colors;

  let colorBubbles = colors.map((color, i) => {
    let style = { backgroundColor: color }
    return (
      <li key={color} style={style} 
        className={props.selected === i + 1 ? "color-bubble selected" : "color-bubble"}
        onClick={() => props.setSelected(i + 1)}>
        {props.selected === (i + 1) ? <img src={process.env.PUBLIC_URL + "/checkmark.png"} alt="checkmark" /> : null}
      </li>
    )
  })

  return (
    <ul className="color-selection form-field">
      {props.errors.color ? <label id="errors"> {props.errors.color} </label> : null}
      {colorBubbles}
    </ul>
  )
}