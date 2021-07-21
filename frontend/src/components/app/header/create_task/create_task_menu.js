import React, {useState, useEffect} from 'react'
import ReactDOM  from 'react-dom'
import ColorPalette from './color_palette'
export default function CreateTaskMenu(props) {
  const [selected, setSelected] = useState('');
  const [icon, setIcon] = useState('');
  const [recurrence, setRecurrence] = useState("Never")
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    props.fetchImages();
  }, [])

  useEffect(() => {
    if(props.open){
      document.querySelector('.create-task-menu').classList.toggle('active') //toggle active selector
    }
  }, [props.open])

  if(!props.images.data) return null;
  if(!props.open) return null

  function getRecurrenceStr(){
    let checkboxes = document.querySelector('.days > input');
    let daysOfTheWeek = ""

    checkboxes.forEach(box => {
      if(box.checked){
        daysOfTheWeek += box.value;
      }
    })
    return daysOfTheWeek
  }
  function handleSubmit(){
    let daysOfTheWeek = '' 
    if(recurrence !== "Never"){
      daysOfTheWeek = getRecurrenceStr();
    }
    let newTask = {
      title,
      description,
      recurrence,
      dueDate,
      daysOfTheWeek,
      icon,
      color: selected,
      user: props.userId
    }
    debugger
    props.createTask(newTask).then(task => {
      props.closeMenu();
    })
  }

  const icons = props.images.data.map(img => {
    return <img key={img.filename} onClick={() => setIcon(img.filename)}
      src={`/api/files/image/${img.filename}`} 
      alt="task-icon" />
  })

  let date = new Date().toISOString().slice(0, 10); //just for date input
  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={props.closeMenu}></div>
      <div className="create-task-menu">
        <div className="header">
          <span>Task Header</span>
          <span onClick={props.closeMenu}>&times;</span>
        </div>

        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title"/>
        </div>

        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" id="description"/>
        </div>

        <div className="form-field">
          <label htmlFor="recurrence">Repeat: </label>
          <select name="recurrence" onChange={(e) => setRecurrence(e.target.value)} id="recurrence" defaultValue="Never">
            <option>Never</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        
        {recurrence === "Daily" ? 
        <div className="form-field">
          <label htmlFor="">Repeat on:</label>
          <div className="days">
            <input type="checkbox" readOnly={true} name="mon" id="mon" value="M"/>
            <label htmlFor="mon">Mondays</label>

            <input type="checkbox" readOnly={true} name="tue" id="tue" value="T"/>
            <label htmlFor="tue">Tuesdays</label>

            <input type="checkbox" readOnly={true} name="wed" id="wed" value="W"/>
            <label htmlFor="wed">Wednesdays</label>

            <input type="checkbox" readOnly={true} name="thu" id="thu" value="R"/>
            <label htmlFor="thu">Thursdays</label>

            <input type="checkbox" readOnly={true} name="fri" id="fri" value="F"/>
            <label htmlFor="fri">Fridays</label>

            <input type="checkbox" readOnly={true} name="sat" id="sat" value="S"/>
            <label htmlFor="sat">Saturday</label>

            <input type="checkbox" readOnly={true} name="sun" id="sun" value="N"/>
            <label htmlFor="sun">Sundays</label>
          </div>
        </div>
         : null}
        
        <div className="form-field">
          <label htmlFor="dueDate">Deadline:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} id="deadline" min={date} />
        </div>

        <div className="form-field">
          <label htmlFor="color">Color:</label>
          <ColorPalette selected={selected} setSelected={setSelected}/>
        </div>

        <div className="form-field"> 
          <label htmlFor="icons">Icons: </label>
          <ul>
            {icons}
          </ul>
        </div>

        <div className="form-submit">
          <button onClick={props.closeMenu}>Cancel</button>
          <button onClick={handleSubmit}>Create Task</button>
        </div>
      </div>
    </>, document.getElementById('portal')
  )
}
