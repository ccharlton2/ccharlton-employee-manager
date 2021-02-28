/* 
  Fetch data from users.json
  For each object returned, append templated values
*/
fetch('/api/v1/users')
  .then(response => response.json())
  .then((data) => {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");

      const userView = `
        <aside class="card">
          <div class="card-layout">
            <strong>Username:</strong> <span class="row">${data[i].username}</span>
            <strong>Email:</strong> <span class="row">${data[i].email}</span>
            <strong>Password:</strong> <span class="row">${data[i].password}</span>
          </div>
        </aside>
        `;

      div.innerHTML = userView;
      mainContainer.appendChild(div);
    }
  }
  );
