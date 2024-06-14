/////////////////Search////////////////////

function Search() {
    let id = document.querySelector("#txt").value;

    if (id <= 20 && id != "") {
        fetch('https://fakestoreapi.com/products/' + id) // fetch faz requisições HTTP, por padrão utiliza o método GET
            .then(res => res.json()) // o .then é executado quando a promessa anterior é cumprida
            .then(json => createTodo(json)) // chama a função createTodo e passa o objeto json como argumento
    } 
	if (id > 20 || id == "" || id == 0) {
        alert("Choose an existing product to search (1-20)");
	}
}


function createTodo(todoJson){	
		
	//extrai as propriedades do obj json e os coloca nas variáveis correspondentes
	let id = document.querySelector("#txt").value; 
	let title = todoJson.title;
	let price = todoJson.price;
	let category = todoJson.category;
	let description = todoJson.description;
	let image = todoJson.image;
	
	let tbody = document.querySelector("#tbody");
	let tdId = document.createElement("td");
	let tdTitle = document.createElement("td");
	let tdPrice = document.createElement("td");
	let tdCategory = document.createElement("td");
	let tdDescription = document.createElement("td");
	let tdImage = document.createElement("td");
	let img = document.createElement("img");
	let tr = document.createElement("tr");

	tdId.innerHTML = id;
	tdTitle.innerHTML = title;
	tdPrice.innerHTML = price;
	tdCategory.innerHTML = category;
	tdDescription.innerHTML = description;
	img.src = image;

	tr.appendChild(tdId);
	tr.appendChild(tdTitle);
	tr.appendChild(tdPrice);
	tr.appendChild(tdCategory);
	tr.appendChild(tdDescription);
	tdImage.appendChild(img);
	tr.appendChild(tdImage);
	tbody.appendChild(tr);
}


	/////////////////Delete///////////////////

function Delete(){
	let id = document.querySelector("#txt").value;

	if(id <= 20){
		fetch('https://fakestoreapi.com/products/' + id,{
			method:"DELETE"
		})
		.then(res=>res.json())
		.then(json=>deletep(json))
	}
	if(id > 20 || id == "" || id == 0){
		alert("Choose an existing product to delete (1-20)")
	}
	
}

function deletep(todoJson){
	let id = todoJson.id; //pega o id do json
	let title = todoJson.title;

	let div = document.createElement("div"); // Cria uma div para manter os parágrafos lado a lado
    div.className = "flex";

	let p = document.createElement("p");
	let pid = document.createElement("p");
	let ptitle = document.createElement("p");
	p.innerHTML = "Deleted Product:"
	pid.innerHTML = 'Id: ' + id;
	ptitle.innerHTML = 'Title: ' + title;

	div.appendChild(p);
	div.appendChild(pid);
    div.appendChild(ptitle);
    document.body.appendChild(div);
}

	/////////////////Add///////////////////

	function Add() {
		let title = document.querySelector("#form").value;
		if (title) {
			fetch('https://fakestoreapi.com/products', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ // Transforma um objeto JS em uma string JSON
					title: title,
					price: 13.5,
					description: 'lorem ipsum set',
					image: 'https://i.pravatar.cc',
					category: 'electronic'
				})
			})
			.then(res=>res.json())
			.then(json=>createTodo(json))
			nextid++
		} else {
			alert("Please add a title for the new product");
		}
	}

/////////////////UPDATE///////////////////

function update() {
	let id = document.querySelector("#txt").value;

	if(id <= 20 && id != 0){
		fetch('https://fakestoreapi.com/products/' + id, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: 'product updated',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
		.then(res=>res.json())
		.then(json=>createTodo(json))
	}
	if(id >= 20 || id == 0 || id == ""){
		alert("Choose an existing product to update (1-20)")
	}
}

function main(){
	document.querySelector("#search")
		.addEventListener("click", evt => {
			Search();
		});
	document.querySelector("#delete")
		.addEventListener("click", evt => {
			Delete();
	});
	document.querySelector("#add")
		.addEventListener("click", evt => {
			Add();
	});
	document.querySelector("#update")
		.addEventListener("click", evt => {
			update();
	});
}

window.onload=main;