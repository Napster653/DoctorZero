var myModal = document.getElementById('exampleModal');
var myBackdrop = document.querySelector('.custom-backdrop');

myModal.addEventListener('show.bs.modal', function ()
{
    myBackdrop.style.display = 'block';
});

myModal.addEventListener('hide.bs.modal', function ()
{
    myBackdrop.style.display = 'none';
});

myModal = new bootstrap.Modal(document.getElementById('exampleModal'), null)
// Uncomment this to show modal
myModal.show()

const users = {
    'admin': 'napster653',
    'JosephWaterels': 'PrettyBeret69'
    // add more users as needed
};

const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

function checkCredentials()
{
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (users[username] && users[username] === password)
    {
        myModal.hide();
    } else
    {
        alert('Invalid credentials!');
    }
}

document.querySelector('.modal-footer > .btn').addEventListener('click', function (event)
{
    event.preventDefault(); // Prevent the button from doing a page reload
    document.getElementById('submitForm').click(); // Submit the form
});

document.querySelector('.modal-body > form').addEventListener('submit', function (event)
{
    event.preventDefault(); // Prevent the form from doing a page reload
    checkCredentials();
});

