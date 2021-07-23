import * as HabitUtil from "../util/habit_util"

export const RECEIVE_HABITS = "RECEIVE_HABITS"
export const RECEIVE_HABIT = "RECEIVE_HABIT"
export const REMOVE_HABIT = "REMOVE_HABIT"

export const receiveHabits = (habits) => ({
  type: RECEIVE_HABITS,
  habits
})

export const receiveHabit = (habit) => ({
  type: RECEIVE_HABIT,
  habit
})

export const removeHabit = (habitId) => ({
  type: REMOVE_HABIT,
  habitId
})

export const createHabit = habit => dispatch => (
  HabitUtil.createHabit(habit).then(habit => dispatch(receiveHabit(habit.data)))
)

export const fetchHabits = (userId) => dispatch => (
  HabitUtil.fetchHabits(userId).then(habits => dispatch(receiveHabits(habits.data)))
)

export const updateHabit = (habit) => dispatch => HabitUtil.updateHabit(habit).then(habit => dispatch(receiveHabit(habit)))

export const deleteHabit = (habitId) => dispatch => HabitUtil.deleteHabit(habitId).then(()=>dispatch(removeHabit(habitId)))