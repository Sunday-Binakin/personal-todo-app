const task = [
    { "id": 1, "name": "Write project proposal", "deadline": "2024-01-05", "status": "completed" },
    { "id": 2, "name": "Submit budget plan", "deadline": "2024-01-10", "status": "incomplete" },
    { "id": 3, "name": "Conduct team meeting", "deadline": "2024-01-15", "status": "completed" },
    { "id": 4, "name": "Prepare presentation slides", "deadline": "2024-01-20", "status": "incomplete" },
    { "id": 5, "name": "Review design mockups", "deadline": "2024-01-25", "status": "completed" },
    { "id": 6, "name": "Finalize marketing plan", "deadline": "2024-01-30", "status": "incomplete" },
    { "id": 7, "name": "Schedule client meeting", "deadline": "2024-02-05", "status": "completed" },
    { "id": 8, "name": "Submit progress report", "deadline": "2024-02-10", "status": "incomplete" },
    { "id": 9, "name": "Test software update", "deadline": "2024-02-15", "status": "completed" },
    { "id": 10, "name": "Organize training session", "deadline": "2024-02-20", "status": "incomplete" },
    { "id": 11, "name": "Publish blog article", "deadline": "2024-02-25", "status": "completed" },
    { "id": 12, "name": "Create social media posts", "deadline": "2024-03-01", "status": "incomplete" },
    { "id": 13, "name": "Update company website", "deadline": "2024-03-05", "status": "completed" },
    { "id": 14, "name": "Prepare monthly report", "deadline": "2024-03-10", "status": "incomplete" },
    { "id": 15, "name": "Host webinar session", "deadline": "2024-03-15", "status": "completed" },
    { "id": 16, "name": "Analyze customer feedback", "deadline": "2024-03-20", "status": "incomplete" },
    { "id": 17, "name": "Update inventory records", "deadline": "2024-03-25", "status": "completed" },
    { "id": 18, "name": "Plan team-building event", "deadline": "2024-03-30", "status": "incomplete" },
    { "id": 19, "name": "Audit financial statements", "deadline": "2024-04-05", "status": "completed" },
    { "id": 20, "name": "Prepare for annual review", "deadline": "2024-04-10", "status": "incomplete" }
];

// Export the tasks array
export const getAllTasks = async ({ page = 0, limit = 10, search = '' }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Filter tasks based on search query
            const filteredTasks = task.filter(task => 
                task.name.toLowerCase().includes(search.toLowerCase()) ||
                task.status.toLowerCase().includes(search.toLowerCase())
            );

            // Calculate pagination
            const startIndex = page * limit;
            const endIndex = startIndex + limit;
            
            resolve({
                tasks: filteredTasks.slice(startIndex, endIndex),
                total: filteredTasks.length
            });
        }, 100);
    });
};

// Optional: Add useful filter functions
export const getCompletedTasks = () => {
    return task.filter(task => task.status === "completed");
};

export const getIncompleteTasks = () => {
    return task.filter(task => task.status === "incomplete");
};

// Function to update a task
export const updateTask = async (id, updates) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const taskIndex = task.findIndex(task => task.id === id);
            if (taskIndex === -1) {
                reject(new Error('Task not found'));
            } else {
                task[taskIndex] = { ...task[taskIndex], ...updates };
                resolve(task[taskIndex]);
            }
        }, 100);
    });
};
