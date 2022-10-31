const sessionObj = {
  title: '',
  author: '',
};

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

titleInput.addEventListener('input', () => {
  sessionObj.title = titleInput.value;
  localStorage.setItem('data', JSON.stringify(sessionObj));
});

authorInput.addEventListener('input', () => {
  sessionObj.author = authorInput.value;
  localStorage.setItem('data', JSON.stringify(sessionObj));
});

if (localStorage.getItem('data')) {
  const formValue = localStorage.getItem('data');
  const formValueObj = JSON.parse(formValue);
  titleInput.value = formValueObj.title;
  authorInput.value = formValueObj.author;
}
