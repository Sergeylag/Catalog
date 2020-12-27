var li = document.getElementById('categories').getElementsByTagName('li');
var	productList = document.getElementById('productList');
var catal = CATALOG;

//----Класс выводы Header
class Header {
	hendleOpenShoppingPage(){
		shopingPage.render();
	}
	render(count){
		const html = `
			<div id="testList">TestList</div>
			<div id="cart" onclick ="headerPage.hendleOpenShoppingPage();">
				<img src="img/cart.png" alt="">
			</div>
			<div id='group1'>
				<div id='text'>${count}</div>
			</div>
		`;
		ROOT_HEADER.innerHTML = html;
	}
}
const headerPage = new Header();
const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);

//----Класс вывода товаров на страницу
class Products {
	constructor(){
		this.btn = 'img/catalog/cart.png';
		this.onmouse = 'img/catalog/vector.png';
	}
	hendleSetLocationStorage(id){
		localStorageUtil.putProducts(id);
		let addStore = localStorageUtil.getProducts();
		headerPage.render(addStore.length);
	}
	render() {
		let htmlCatalog = '';
		catal.forEach(({id, name, price, img, popular})=>{
			htmlCatalog += `
				<li class="products-element">
						<img class="products-element__popular" src="${popular}" />
						<img class="products-element__img" src="${img}" />
						<img class="products-element__btn" src="${this.btn}" onmouseover="this.src='${this.onmouse}'" onmouseout="this.src='${this.btn}'" onclick="productsPage.hendleSetLocationStorage('${id}')" />
						<span class="products-element__name">${name}</span>
						<span class="products-element__price">${price.toLocaleString()} ₽</span>
				</li>
			`;
		});
		const html = `
				<ul class="products-container">
					${htmlCatalog}
				</ul>
		`;
		ROOT_PRODUCTS.innerHTML = html;
	}
}
var productsPage = new Products();
productsPage.render();

//----Цикл обработки событий Кталога
	for(var i=0;i<li.length;i++){
//---Функция отслеживания наведения курсора
		li[i].onmouseover = li[i].onmouseout = handler;
		function handler(event){
			if (event.type == 'mouseover' && this.className != "catActive") {
				this.style.color = '#59606D'
			}
			if (event.type == 'mouseout') {
				this.style.color = ''
			}
		}
//---Функция обработки клика по разделу Каталога
		li[i].onclick = function(){
			for(var j=0;j<li.length;j++) 
				li[j].className = 'cat';
				this.className = 'catActive';
				if (this.id == 'cat1') {
					catal = CATALOG;
					productsPage.render();
				} else if (this.id == 'cat2'){
					catal = CATALOG2;
					productsPage.render();
				} else if (this.id == 'cat3'){
					catal = CATALOG3;
					productsPage.render();
				}
				};
			}
	
class Shopping {
	constructor(){
		this.btn = 'img/trash1.png';
		this.onmouse = 'img/trash2.png';
		this.close ='img/close.png';
		this.ok = 'img/ok.png';
	}
	hendleClear(){
		ROOT_SHOPPING.innerHTML = '';
		let products = localStorageUtil.getProducts();
		headerPage.render(products.length);
	}
	thankPage(){
		let html = `
			<div class="shopping-fon"></div>
			<div class="shopping-container">
				<div class="shopping-element__basket">
					<span class="shopping-element__head">Корзина</span>
					<img class="shopping-element__close" src="${this.close}" onclick="shopingPage.hendleClear()"/>
					<img class="shopping-element__ok" src="${this.ok}" />
					<span class="shopping-element__str2">Заявка успешно отправлена</span>
					<span class="shopping-element__str3">Вскоре наш менеджер свяжется с Вами</span>
				</div>
			</div>
		`;
		ROOT_SHOPPING.innerHTML = html;
	}
	printShopingCart(){
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';
		let allCatalog = [].concat(CATALOG, CATALOG2, CATALOG3);
		allCatalog.forEach(({id, name, price, img, popular}) => {
			for (var i = 0; i < productsStore.length; i++) {
			if (productsStore[i] == id) {
				htmlCatalog += `
				<li class="shopping-element">
						<img class="shopping-element__img" src="${img}" />
						<span class="shopping-element__name">${name}</span>
						<img class="shopping-element__popular" src="${popular}" />
						<img class="shopping-element__btn" src="${this.btn}" onmouseover="this.src='${this.onmouse}'" onmouseout="this.src='${this.btn}'" onclick="localStorageUtil.removeElement('${id}')" />
						<span class="shopping-element__price">${price.toLocaleString()} ₽</span>
				</li>
				`;}
			}
		});
		let html = `
			<div class="shopping-fon"></div>
			<div class="shopping-container">
				<div class="shopping-element__basket">
					<span class="shopping-element__head">Корзина</span>
					<span class="shopping-element__str">Товары в корзине</span>
					<img class="shopping-element__close" src="${this.close}" onclick="shopingPage.hendleClear()"/>
				</div>
				<ul class="shopping-cart">
					${htmlCatalog}
				</ul>
				<form class="form" id="form" name="form">
					<span class="form__str">Оформить заказ</span>
					<input type="text" id="name" class="form-input form-name" name="name" placeholder="Введите ваше имя">
					<input type="phone" id="phone" class="form-input form-tel" name="phone" placeholder="Введите ваш телефон">
					<input type="text" id="address" class="form-input form-address" name="address" placeholder="Введите ваш адрес">
					<button type="button" id="sendMail" class="form-btn" onclick="shopingPage.sendMail()">Отправить</button>
					<div id="errorMess"></div>
				</form>
			</div>
		`;
		ROOT_SHOPPING.innerHTML = html;
	}
	sendMail(){
			let name = $("#name").val().trim();
			let phone = $("#phone").val().trim();
			let address = $("#address").val().trim();
			let order = localStorageUtil.getProducts();
			let message = 'Все поля обязательные. Заполните форму!'
			if (name =="") {
				$("#errorMess").text(message);
				return false;
			}else if(phone ==""){
				$("#errorMess").text(message);
				return false;
			}else if(address ==""){
				$("#errorMess").text(message);
				return false;
			}
			$("#errorMess").text("");
			$.ajax({
				url: 'ajax/mail.php',
				type: 'POST',
				cache: false,
				data: {'name': name, 'phone': phone, 'address': address, 'order': order},
				dataType: 'html',
				beforeSend: function(){
					$("#sendMail").prop("disabled", true);
				},
				success: function(data){
					$("#form").trigger("reset");
						alert("Заказ: " + order + " " + name + " " + phone + " " + address + " Сформирован и отправлен не сервер");
					$("#sendMail").prop("disabled", false);
					localStorageUtil.removeAll();
					shopingPage.thankPage();
				}
			});
	}
	printClearCart(){
		let html = `
			<div class="shopping-fon"></div>
			<div class="shopping-container">
				<div class="shopping-element__basket">
					<span class="shopping-element__head">Корзина</span>
					<span class="shopping-element__str">Пока что вы ничего не добавили в корзину</span>
					<img class="shopping-element__close" src="${this.close}" onclick="shopingPage.hendleClear()"/>
					<span class="shopping-element__btn2" onclick="shopingPage.hendleClear()">Перейти к выбору</span>
				</div>
			</div>

		`;
		ROOT_SHOPPING.innerHTML = html;
	}
	render(){
				let products = localStorageUtil.getProducts();
				if (products.length != 0) {
					shopingPage.printShopingCart();
				} else {
					shopingPage.printClearCart();
				}
	}
}
const shopingPage = new Shopping();
