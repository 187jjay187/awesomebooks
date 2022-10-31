const formData = {
  title: '',
  author: '',
};

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

titleInput.addEventListener('input', () => {
  formData.title = titleInput.value;
  localStorage.setItem('formData', JSON.stringify(formData));
});

authorInput.addEventListener('input', () => {
  formData.author = authorInput.value;
  localStorage.setItem('formData', JSON.stringify(formData));
});

if (localStorage.getItem('formData')) {
  const formValue = localStorage.getItem('formData');
  const formValueObj = JSON.parse(formValue);
  titleInput.value = formValueObj.title;
  authorInput.value = formValueObj.author;
}
