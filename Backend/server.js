const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
app.use(cors());

const MONGO_URI="ADD Your Own Mongo Url from MongoDB Atlas";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ Connection Error:", err));

//STEP 2: Data kaisa dikhega
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes (API) ---

// 1. Data Get karne ke liye
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// 2. Naya Data Add karne ke liye
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task
  });
  await newTodo.save();
  res.json(newTodo);
});

// 3. Task Delete karne ke liye
// Kisi specific To-do ko delete karne ke liye API
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.findByIdAndDelete(id); // MongoDB se id ke base par delete karega
        res.json({ message: "Task Deleted Successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. Task ko Update (Complete/Uncomplete) karne ke liye
app.put('/api/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

// Server Start karein
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});