import axios from "axios";

const BASE_URL = "https://mulearn-internship-task-production.up.railway.app/api/"

const tokenurl = `${BASE_URL}/token`;
const refreshtokenurl = `${BASE_URL}/token/refresh/`;
const registerurl = `${BASE_URL}/register`;
const todourl = `${BASE_URL}/todo`;
const todoupdateurl = `${BASE_URL}/todo/<str:pk>/`;

export {tokenurl,refreshtokenurl,registerurl,todoupdateurl,todourl}