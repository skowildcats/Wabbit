# Wabbit
[Live Link](http://wabbitask.herokuapp.com/#/)
## Description 
  Wabbit is a goals and habit tracker that allows users to design their own interfaces and track their productivity and improvement. Wabbit aggregates and quantifies data in realtime to provide realtime feedback for their accomplishments. Because sticking to a habit is particularly challenging in its nascent stages, Wabbit is designed to continuously respond to user actions. Because every user has unique goals in mind, individuals should immediately be presented with tools to customize the interface to fit their needs. Each users' page should truly belong to them. Furthermore, data and other personal performance metrics will be visualized in a separate 'analytics' or 'statistics' page for each user as they use the app for longer periods of time.

## About
  ### User Authentication
  ![User-auth](https://user-images.githubusercontent.com/67240903/131388681-868890d8-19b5-46f4-8945-9453f0dc0c7f.gif)
  * Users can login with a demo user or with their own credentials
  * Errors show on incorrect submission
  ### Design
  ![image](https://user-images.githubusercontent.com/67240903/131733673-caebda17-ffb5-4d02-b45f-c40550e632f8.png)
  * Created with customizability in mind. Each task has customizable functionality, icons, and color, making them easy to organize
  * Habits and tasks are divided visually, but every type of task and habit is easily creatable through the plus button on the top right
  ### Task Functionality
  * Users can create, edit, and delete tasks. Additionally, tasks are draggable and can be reorganized as the user sees fit
  * Users can customize and create tasks to fit their needs; Wabbit currently supports four different types of tasks
  ![image](https://user-images.githubusercontent.com/67240903/131737228-9803aaac-643e-4081-bbda-c16168560390.png)
  * Users can mark tasks as complete and incomplete if applicable
  ### Themes and User Profile
  * Users can navigate to a profile page where they can update credentials after submitting their password
  * Users can change the theme of the webpage by selecting from a list of color palettes
  ![image](https://user-images.githubusercontent.com/67240903/131734320-725aa715-380e-4f02-a6e4-661cef141c4f.png)\
  ![image](https://user-images.githubusercontent.com/67240903/131734174-d3830a09-b2da-4470-bd28-71b5304d26db.png)
  * Users can logout from this page

  ### Metrics
  * Users can see an overview of their task completions by day and week
  * Users' metrics will update as they add and complete new tasks
  * Metrics will be colored accordingly to the current user's theme
  ![image](https://user-images.githubusercontent.com/67240903/131734517-e4530683-4651-4454-8348-d8a990ba999f.png)

 ## Code Snippets
   ### Drag and Drop Tasks
   * Utilize JQuery to make drag and drop simple, intuitive, and efficient. Dragging and dropping tasks saves its new position
   ![image](https://user-images.githubusercontent.com/67240903/131734707-b305e114-98ec-4e52-bd2c-3cc7ea81d2b1.png)
   ### Task Typing and Sort by Complete
   * Sorting tasks and creating task components based on each tasks' type 
   ![image](https://user-images.githubusercontent.com/67240903/131735125-6461ad01-0784-4afe-a34a-b4f906e8eaaf.png)
   ### Dynamic Themes / Color Palette
   * Users can easily select new themes by choosing color palettes in the user settings window
   ![image](https://user-images.githubusercontent.com/67240903/131736670-9b4f1186-2e01-448a-a831-10de6d2b986a.png)
   ### User Auth Form
   * Elegant and simple auth form code with error handling
   ![image](https://user-images.githubusercontent.com/67240903/131736981-bd930fa2-c75f-469e-85c3-898a4fb547f5.png)
   ### Metrics 
   * Separate metrics page into three different components that visualize the data passed into them by their parent
   ![image](https://user-images.githubusercontent.com/67240903/131738622-4bafead9-84f4-4967-bbf5-e51581289b02.png)
   
   
 ## Members
   * [Isaac Wei](https://github.com/theonewei/) Backend Lead
   * [Joseph Yang](https://github.com/josephwyang/) Frontend Lead
   * [Jon Chen](https://github.com/skowildcats/) Flex Developer 
   * [Kyle Xu](https://github.com/webbdevv/) Project Lead/Flex Developer 
