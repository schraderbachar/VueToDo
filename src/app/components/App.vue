<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Insert a new task"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    class="form-control"
                    v-model="task.description"
                    placeholder="Insert a description"
                  ></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button @click="edit = false" class="btn btn-primary btn-block">Edit</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="editTask(task._id)" class="btn btn-secondary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      task: {
        title: "",
        description: ""
      },
      tasks: [],
      edit: false,
      taskToEdit: ""
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    sendTask() {
      if (this.edit === false) {
        fetch("/api/tasks/", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
          });
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.edit = false;
            console.log(this.edit);
          });
      }
      this.task.description = "";
      this.task.title = "";
      this.edit = false;
    },
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
    },
    editTask(id) {
      fetch("/api/tasks/" + id)
        .then(res => res.json())
        .then(data => {
          this.task.title = data.title;
          this.task.description = data.description;
          this.taskToEdit = data._id;
        });
    }
  }
};
</script>