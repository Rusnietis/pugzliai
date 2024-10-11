

console.log('---');

document.querySelector('button').addEventListener('click', _ => {
    const data = {};
    document.querySelectorAll('input').forEach(input => {
        data[input.name] = input.value;
    });
    const url = 'http://localhost:3001/form-js';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
});