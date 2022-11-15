import axios from 'axios';
import baseURL from '../constants/urls';

const axioxSercvice = axios.create({ baseURL: baseURL })
export {axioxSercvice}
