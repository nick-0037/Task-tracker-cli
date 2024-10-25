const fs = require('fs')
const path = require('path')
const { addTask, updateTask, deleteTask, markTask, listTasks, readTasks} = require('./index.js')

const initialTasks = [
  {
    id: 1,
    description: "Task to update",
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    description: "Task to delete",
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    description: "Task to mark as done",
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    description: "Task to mark as in-progress",
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
]

const filePath = path.join(__dirname, 'task.json')

describe('Task Management', () => {
  beforeEach(() => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))
  })

  test('addTask should add a task', () => {
    const task = "New Task"
    const result = addTask(task)
    expect(result).toBe(result)
  })
  
  test('updateTask should update a task description', () => {
    fs.writeFileSync(filePath,JSON.stringify(initialTasks)) //  write the initial task to the file
    
    const tasksBeforeUpdate = readTasks()
    const taskId = tasksBeforeUpdate[0].id
  
    updateTask(taskId, "Updated task description")
  
    const tasksAfterUpdate = readTasks()
  
    expect(tasksAfterUpdate[0].description).toBe("Updated task description")
  })
  
  test('deleteTask should delete task by id', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const tasksBeforeDelete = readTasks()
    const taskId = tasksBeforeDelete[1].id

    deleteTask(taskId)

    const tasksAfterDelete = readTasks()
    expect(tasksAfterDelete).toHaveLength(initialTasks.length - 1)
  })
  
  test('markTask, mark task as done', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const tasksBeforeMark = readTasks()
    const taskId = tasksBeforeMark[2].id

    markTask(taskId, "done")

    const tasksAfterMark = readTasks()

    expect(tasksAfterMark[2].status).toBe("done")
  })
  
  test('markTask, mark task as in-progress', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const tasksBeforeMark = readTasks()
    const taskId = tasksBeforeMark[3].id

    markTask(taskId, "in-progress")

    const tasksAfterMark = readTasks()

    expect(tasksAfterMark[3].status).toBe("in-progress")
  })

  test('taskList should return all list of the tasks', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const allTasks = listTasks()

    expect(allTasks).toHaveLength(initialTasks.length)
    expect(allTasks).toEqual(initialTasks)
  })

  test('taskList todo, should return all of list with status todo', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const todoTasks = listTasks('todo')

    const expectedTodoTasks = initialTasks.filter(task => task.status === 'todo')

    expect(todoTasks).toEqual(expectedTodoTasks)
  })
  
  test('taskList done, should return all of list with status done', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const doneTasks = listTasks('done')

    const expectedDoneTasks = initialTasks.filter(task => task.status === 'done')

    expect(doneTasks).toEqual(expectedDoneTasks)
  })
  
  test('taskList in-progress, should return all of list with status in-progress', () => {
    fs.writeFileSync(filePath, JSON.stringify(initialTasks))

    const inProgressTasks = listTasks('in-progress')

    const expectedInProgressTasks = initialTasks.filter(task => task.status === 'in-progress')

    expect(inProgressTasks).toEqual(expectedInProgressTasks)
  })
})