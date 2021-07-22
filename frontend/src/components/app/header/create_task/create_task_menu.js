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
    if(props.open === true){
      let menu = document.querySelector('.create-task-menu')
      if(menu) menu.classList.toggle('active') //toggle active selector
    }
  }, [props.open])

  if(props.open === false) return null;
  console.log(props.open);

  function closeMenu(){
    document.querySelector('.create-task-menu').classList.toggle('active') //toggle active selector
    setTimeout(() => {
      props.closeMenu()
    }, 250) //timeout 250ms to correspond with css animation time
  }

  function getRecurrenceStr(){
    let checkboxes = document.querySelectorAll('.days > input');
    let daysOfTheWeek = ""
    checkboxes.forEach(box => {
      if(box.checked){
        daysOfTheWeek += box.value;
      }
    })
    return daysOfTheWeek;
  }
  function handleSubmit(){
    let daysOfTheWeek = '' 
    if(recurrence === "Weekly"){
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
    props.createTask(newTask).then(task => {
      props.closeMenu();
    })
  };

  const icons = props.images.data.map(img => {
    return (
      <li key={img.filename} onClick={() => setIcon(img.filename)}>
        <img src={`/api/files/image/${img.filename}`} alt="task-icon" />
        {icon === img.filename ? (
          <img
            id="icon-check"
            src={process.env.PUBLIC_URL + "/checkmark.png"}
            alt="checkmark"
          />
        ) : null}
      </li>
    );
  });

  let date = new Date().toISOString().slice(0, 10); //just for date input
  return ReactDOM.createPortal(
    <div id="create-task-menu-modal">
      <div className="overlay" onClick={closeMenu}></div>
      <div className="create-task-menu">
        <div className="header">
          <h1>CREATE A TASK</h1>
          <span onClick={closeMenu}>&times;</span>
        </div>
        <ColorPalette selected={selected} setSelected={setSelected}/>

        <div className="form-field">
          <label htmlFor="title">TITLE</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title"/>
        </div>

        <div className="form-field">
          <label htmlFor="description">DESCRIPTION</label>
          <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" id="description"/>
        </div>

        <div className="form-field">
          <label htmlFor="recurrence">REPEAT </label>
          <select name="recurrence" onChange={(e) => setRecurrence(e.target.value)} id="recurrence" defaultValue="Never">
            <option>Never</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          {recurrence === "Weekly" ? 
          <div className="form-field">
            {/* <label htmlFor="">REPEAT ON</label> */}
            <div className="days">
              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="mon" id="mon" value="M"/>
                <label htmlFor="mon">Mon</label>
              </div>

              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="tue" id="tue" value="T"/>
                <label htmlFor="tue">Tues</label>
              </div>

              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="wed" id="wed" value="W"/>
                <label htmlFor="wed">Wed</label>
              </div>

              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="thu" id="thu" value="R"/>
                <label htmlFor="thu">Thurs</label>
              </div>

              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="fri" id="fri" value="F"/>
                <label htmlFor="fri">Fri</label>
              </div>

              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="sat" id="sat" value="S"/>
                <label htmlFor="sat">Sat</label>
              </div>

              <div className="day-checkbox">
                <input type="checkbox" readOnly={true} name="sun" id="sun" value="N"/>
                <label htmlFor="sun">Sun</label>
              </div>
            </div>
          </div>
          : null}
        </div>
        
        
        
        <div className="form-field">
          <label htmlFor="dueDate">DEADLINE:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} id="deadline" min={date} />
        </div>

        {/* <div className="form-field">
          <label id="color-label" htmlFor="color">COLORS</label>
          <ColorPalette selected={selected} setSelected={setSelected}/>
        </div> */}

        <div id="icons-label" className="form-field"> 
          <ul id="icons">
            {icons}
          </ul>
        </div>

        <div className="form-submit">
          <button onClick={closeMenu}>Cancel</button>
          <button onClick={handleSubmit}>Create Task</button>
        </div>
      </div>
    </div>, document.getElementById('portal')
  )
}
