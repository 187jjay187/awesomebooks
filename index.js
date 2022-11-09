import Book from './modules/awebook.js';
import './modules/bookapp.js';
import { DateTime } from './modules/luxon.js';

const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
document.getElementById('current-date').innerHTML = currentDate;