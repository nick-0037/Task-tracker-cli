const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'task.json')

if(!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]))
}

function readTasks() {
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
}

function addTask(description) {
  const tasks = readTasks()
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  tasks.push(newTask)
  saveTasks(tasks)

  console.log(`Task added successfully (ID: ${newTask.id})`)
}

function updateTask(id, description) {
  const tasks = readTasks()
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id))

  if(taskIndex !== -1) {
    tasks[taskIndex].description = description
    tasks[taskIndex].updatedAt = new Date().toISOString()
    saveTasks(tasks)
    console.log(`Task updated successfully (ID: ${id})`)
  } else {
    console.log(`Task with ID: ${id} not found`)
  }
}

function deleteTask(id) {
  let tasks = readTasks()
  const originalLength = tasks.length
  tasks = tasks.filter(task => task.id !== parseInt(id))

  if(tasks.length < originalLength) {
    saveTasks(tasks)
    console.log(`Task deleted successfully (ID: ${id})`)
  } else {
    console.log(`Task with ID: ${id} not found`)
  }
}

function markTask(id, status) {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id))

  if(taskIndex !== -1) {
    tasks[taskIndex].status = status
    tasks[taskIndex].updatedAt = new Date().toISOString()
    saveTasks(tasks)
    console.log(`Task marked as ${status} (ID: ${id})`)
  } else {
    console.log(`Task with ID: ${id} not found`)
  }
}

function listTasks(status = null) {
  const tasks = readTasks();
  const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks
  
  if(filteredTasks.length) {
    filteredTasks.forEach(task => {
      console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, CreatedAt: ${task.createdAt}`)
    });
  } else {
    console.log('No task found.')
  }
  return filteredTasks
}

const [,, command, ...args] = process.argv

switch (command) {
  case 'add':
    addTask(args.join(' '))
    break
  case 'update': 
    updateTask(args[0], args.slice(1).join(' '))
    break
  case 'delete':
    deleteTask(args[0])
    break
  case 'mark-in-progress':
    markTask(args[0], 'in-progress')
    break
  case 'mark-in-done':
    markTask(args[0], 'done')
    break
  case 'list':
    listTasks(args[0])
    break
  default: 
    console.log('Invalid command')
}

module.exports = {addTask, updateTask, deleteTask, markTask, listTasks, readTasks}