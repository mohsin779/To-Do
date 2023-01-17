import client from "./client";

const todoApi = {
  // READ
  getTodos: async () => {
    try {
      const response = await client.get("/api/post/get-posts");
      if (!response.ok) {
        throw new Error(response.problem);
      }
      return response.data.posts;
    } catch (error) {
      return [];
    }
  },
  getTodo: async id => {
    try {
      const response = await client.get("/api/post/get-post/" + id);

      if (!response.ok) {
        throw new Error(response.problem);
      }
      return response.data.post;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  getLabels: async () => {
    try {
      const response = await client.get("/api/label/get-labels");
      if (!response.ok) {
        throw new Error(response.problem);
      }
      return response.data.labels;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
  // CREATE
  addTodo: async todoData => {
    return await client.post("/api/post/add-post", todoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addLabel: async labelData => {
    return await client.post("/api/label/add-label", labelData);
  },
  // EDIT
  changeStatus: async (todoData, id) => {
    return await client.patch("/api/post/edit-post/" + id, todoData);
  },
  editTodo: async (todoData, id) => {
    return await client.patch("/api/post/edit-post/" + id, todoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // DELETE
  deleteTodo: async id => {
    return await client.delete("/api/post/delete-post/" + id);
  },
  // addProduct: async productData => {
  //   return client.post("/products/add", { ...productData });
  // },
};
export default todoApi;
