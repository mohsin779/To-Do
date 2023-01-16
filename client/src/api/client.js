import { create } from "apisauce";
import todoApi from "./todo";

// define the api

const client = create({
  baseURL: " http://localhost:8085/",
  timeout: 10000, //10 sec req timeout
});
export default client;
