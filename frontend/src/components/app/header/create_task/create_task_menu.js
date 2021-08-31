import React, {useState, useEffect} from 'react'
import ReactDOM  from 'react-dom'
import ColorPalette from './color_palette'
import moment from 'moment'
export default function CreateTaskMenu(props) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState('');
  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState();
  const [recurrence, setRecurrence] = useState("Never");
  const [increment, setIncrement] = useState(1);
  const [maxProgress, setMaxProgress] = useState(1); //maxProgress
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});

  const { task } = props;
  useEffect(() => {
    setDueDate(moment().format('YYYY-MM-DD'));
    if(task){
      setSelected(task.color)
      setIcon(task.icon);
      setTitle(task.title);
      setType(task.type);
      setDescription(task.description)
      if(task.dueDate){
        setDueDate(moment(task.dueDate).format('YYYY-MM-DD'));
      }
      setIncrement(task.increment)
      setMaxProgress(task.maxProgress)
    }
  }, [props])

  useEffect(() => {
    if(props.open === true){
      let menu = document.querySelector('.create-task-menu')
      if(menu) menu.classList.toggle('active') //toggle active selector
      if(task){
        setHours(Math.floor(task.secondsLeft / 3600))
        setMinutes(Math.floor((task.secondsLeft % 3600) / 60))
      }
    }
  }, [props.open])

  //don't render if not set to open
  if(props.open === false) return null;

  function closeMenu() {
    props.closeMenu()
    props.clearError();
    setPage(1);
    let initial = ['', '', '', '', '', 'Never', 1, 1, 0, 0, '', {}];
    [setSelected, setIcon, setTitle, setDescription, setDueDate,
       setRecurrence, setIncrement, setMaxProgress, setMinutes, setHours, setType, setErrors
    ].forEach((f, idx) => {
      f(initial[idx]) //reset all state variables to clean up
    })

    document.querySelector('.create-task-menu').classList.toggle('active') //toggle active selector
  }

  function getRecurrenceStr(){
    let checkboxes = document.querySelectorAll('.day-checkbox > input');
    let daysOfTheWeek = ""
    checkboxes.forEach(box => {
      box.checked ? daysOfTheWeek += box.value : daysOfTheWeek += "_";
    })
    return daysOfTheWeek;
  }

  function handleNext() {
    const newErrors = {};

    if(!title.length) newErrors.title = true;
    if(!type.length) newErrors.type = true;

    setErrors(newErrors);
    if(!Object.keys(newErrors).length) setPage(2);
  }

  function handleSubmit(){
    let daysOfTheWeek = '';
    let secondsLeft = undefined;
    debugger
    if(recurrence === "Weekly"){
      daysOfTheWeek = getRecurrenceStr();
      console.log(daysOfTheWeek);
    }

    if(type === 'timedGoal'){
      secondsLeft = (parseInt(hours)*60+parseInt(minutes))*60
    }

    let newTodo = {
      title,
      description,
      recurrence,
      dueDate,
      daysOfTheWeek,
      user: props.userId,
      color: selected,
      icon,
      type,
      secondsLeft,
      increment,
      maxProgress
    }
    if(recurrence === 'Never'){
      if(props.taskAction === 'create'){
        props.createTask(newTodo).then(data => {
          if (data.type !== "RECEIVE_SESSION_ERRORS") {
            closeMenu();
          }
        })
      } else {
        newTodo._id = props.task._id
        props.updateTask(newTodo).then(data => {
          closeMenu();
        })
      }
    } else {
      props.createHabit(newTodo).then(data => {
        if (data.type !== "RECEIVE_SESSION_ERRORS") {
            closeMenu();
          }
      })
    }
  }

  const icons = ["general", "deadlines", "career", "studies", "personal", "health", "fitness", "errands"].map(img => {
    return (
      <li key={img} className={icon === img ? "selected" : ""} onClick={() => setIcon(img)}>
        <img src={`${process.env.PUBLIC_URL}/icons/${img}.png`} alt="task-icon" />
        {icon === img ? (
          <img id="icon-check" src={process.env.PUBLIC_URL + "/checkmark.png"} alt="checkmark" />
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
          <h1>{props.taskAction === 'create' ? "CREATE A" : "EDIT A"} TASK</h1>
          <span onClick={closeMenu}>&times;</span>
        </div>
      
        {page === 1 ? 
        <>
          <div className="form-field">
            <label htmlFor="title" className={errors.title ? "errors" : "required"}>TITLE</label>
            <input id="title" onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title"/>
          </div>
          
          <div className="form-field">
            <label htmlFor="description">DESCRIPTION</label>
            <input id="description" onChange={(e) => setDescription(e.target.value)} value={description} type="text"/>
          </div>

          {/* For creating a habit */}
          {props.taskAction === 'create' ? 
          <>
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
                    <input type="checkbox" readOnly={true} name="thu" id="thu" value="T"/>
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
                    <input type="checkbox" readOnly={true} name="sun" id="sun" value="S"/>
                    <label htmlFor="sun">Sun</label>
                  </div>
                </div>
              </div>
              : null}
            </div>
            </>
            : null} 
            <div className="form-field">
              <label htmlFor="types" className={errors.type ? "errors" : "required"}>TYPE</label>
              <ul id="task-types">
                <div className="task-option">
                  <button className={`task-type ${type === 'progress' ? 'active' : ''}`} onClick={() => setType('progress')}><img src={`${process.env.PUBLIC_URL}/tallies.png`}
                  onMouseEnter={() => {document.getElementById("progress-text").style.display = "block"}}
                  onMouseLeave={() => {document.getElementById("progress-text").style.display = "none"}} alt="tallies" /></button>
                  <div id="progress-text" className="task-text" >PROGRESS TRACKER</div>
                </div>
                <div className="task-option">
                  <button className={`task-type ${type === 'timedGoal' ? 'active' : ''}`} onClick={() => setType('timedGoal')}><img src={`${process.env.PUBLIC_URL}/stopwatch.png`} 
                  onMouseEnter={() => {document.getElementById("timed-goal-text").style.display = "block"}}
                  onMouseLeave={() => {document.getElementById("timed-goal-text").style.display = "none"}} alt="stopwatch"/></button>
                  <div id="timed-goal-text" className="task-text" >TIMED GOAL</div>
                </div>
                <div className="task-option">
                  <button className={`task-type ${type === 'task' ? 'active' : ''}`} onClick={() => setType('task')}><img src={`${process.env.PUBLIC_URL}/checked.png`} 
                  onMouseEnter={() => {document.getElementById("task-text").style.display = "block"}}
                  onMouseLeave={() => {document.getElementById("task-text").style.display = "none"}} alt="checked"/></button>
                  <div id="task-text" className="task-text" >TO-DO</div>
                </div>
                <div className="task-option">
                  <button className={`task-type ${type === 'countdown' ? 'active' : ''}`} onClick={() => setType('countdown')}><img src={`${process.env.PUBLIC_URL}/calendar.png`} 
                  onMouseEnter={() => {document.getElementById("countdown-text").style.display = "block"}}
                  onMouseLeave={() => {document.getElementById("countdown-text").style.display = "none"}} alt="calendar"/></button>
                  <div id="countdown-text" className="task-text" >COUNTDOWN</div>
                </div>
              </ul>
            </div>
        </>
        : 
        <>
        <ColorPalette selected={selected} setSelected={setSelected}/>

        {type === 'progress' ? 
        <div className="form-field">
          <label htmlFor="increment">INCREMENT BY</label>
          <input type="number" value={increment} onChange={(e) => setIncrement(e.target.value)} min="1" />

          <label htmlFor="goal">GOAL</label>
          <input type="number" value={maxProgress} onChange={(e) => setMaxProgress(e.target.value)} min="1"/>
        </div>
        : null}

        {type === 'timedGoal' ?
          <div className="form-field">
            <label htmlFor="hours" className={props.errors.secondsLeft ? "errors" : ""}>HOURS</label>
            <input id="hours" type="number" value={hours} onChange={(e) => {if(e.target.value.slice(-1)[0] !== "-") setHours(e.target.value)}} min="0"/>
            
            <label htmlFor="minutes" className={props.errors.secondsLeft ? "errors" : ""}>MINUTES</label>
            <input id="minutes" type="number" value={minutes} onChange={(e) => {if(e.target.value.slice(-1)[0] !== "-") setMinutes(e.target.value)}} min="0" max="60"/>
          </div>
        : null}

        {type !== "timedGoal" && recurrence === "Never" ? 
        (<div className="form-field">
          {props.errors.dueDate ? 
            <label id="errors"> {props.errors.dueDate} </label> :
            <label htmlFor="dueDate">{type==='countdown' ? "DATE COMPLETED" : "DEADLINE"}</label>
          }
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} id="deadline" min={date}/>
        </div>)
        : null}
        
        <div id="icons-label" className="form-field"> 
            <ul id="icons">
              {icons}
            </ul>
        </div>
        </>
        }

        <div className="form-submit">
          {page === 1 ? <button onClick={closeMenu}>Cancel</button> : <button onClick={() => setPage(1)}>Back</button>}
          {page === 1 ? <button onClick={() => handleNext()}>Next Step</button> : <button onClick={handleSubmit}>{props.taskAction === 'create' ? "Create" : "Edit"} Task</button>}
        </div>
      </div>
    </div>, document.getElementById('portal')
  )
}
