const Task = require("../models/Task");
const User = require("../models/User");
const excelJs = require("exceljs");

const exportTaskReport = async (req, res)=>{
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Task Report");

        worksheet.columns = [
            { header: "Task ID ", key: "_id", width:25},
            { header: "Title ", key: "title", width:30},
            { header: "Description", key: "description", width:50},
            { header: "Priority", key: "priority", width:15},
            { header: "Status", key: "status", width:20},
            { header: "Due Date", key: "dueDate", width:20},
            { header: "Assigned To", key: "assignedTo", width:30},
        ];

        tasks.forEach((task)=>{
            const assignedTo = task.assignedTo.map((user)=> `${user.name} (${user.email})`).join(", ");

            worksheet.addRow({
                _id: task._id, title: task.title, description: task.description, priority: task.priority, status: task.status, duedate: task.dueDate.toString().split("T")[0],
                assignedTo: task.assignedTo || " Unassigned",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocuments.spreadsheet.shhet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachments; filename='tasks_report.xlsx'"
        );
        return workbook.xlsx.write(res).then(()=>{
            res.end();
        })
    } catch (error) {
        res.status(500).json({message: "Error exporting tasks.", error: error.message});
    }
}

const exportUserReport = async (req, res)=>{
    try {
        const users = await User.find().select("name email _id").lean();
        const userTasks = await Task.find().populate(
            "assignedTo","name email _id"
        );

        const userTaskMap = {};
        users.forEach((user)=>{
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount : 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            }
        })

        userTasks.forEach((task)=>{
            if(task.assignedTo){
                task.assignedTo.forEach((assignedUser)=>{
                    userTaskMap[assignedUser._id].taskCount += 1;
                    if(userTaskMap[assignedUser._id]){
                        if(task.status === "pending"){
                            userTaskMap[assignedUser._id].pendingTasks += 1;
                        }
                        else if(task.status === "in progress"){
                            userTaskMap[assignedUser._id].inProgressTasks += 1;
                        }
                        else if(task.status === "completed"){
                            userTaskMap[assignedUser._id].completedTasksTasks += 1;
                        }
                    }
                })
            }
        })
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet(" User Task Report");

        worksheet.columns = [
            {header: "User name", key:"name", width:30},
            {header: "Email", key:"email", width:40},
            {header: "Total assigned tasks", key:"taskCount", width:20},
            {header: "Pending Tasks", key:"pendingTasks", width:20},
            {header: "In progress Tasks", key:"inProgressTasks", width:20},
            {header: "Completed Tasks", key:"completedTasks", width:20},
        ];

        Object.values(userTaskMap).forEach((user)=>{
            worksheet.addRow(user);
        })
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocuments.spreadsheet.shhet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachments; filename='users_report.xlsx'"
        );
        return workbook.xlsx.write(res).then(()=>{
            res.end();
        })
    } catch (error) {
        res.status(500).json({message: "Error exporting tasks.", error: error.message});
    }
}

module.exports = {exportTaskReport, exportUserReport};