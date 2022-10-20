document.addEventListener('click', e => {
	if (e.target.matches('#menuBtn')) {
		e.target.firstElementChild.classList.toggle('menu__bar--animation');
		e.target.parentElement.nextElementSibling.classList.toggle(
			'menu__nav--show'
		);
	}
	if (e.target.matches('.btn--copy')) {
		const url = `${window.location.origin}/tets/${e.target.dataset.shorturl}`;
		navigator.clipboard
			.writeText(url)
			.then(() => console.log('texto copiado en el portapapeleras'))
			.catch(() => console.log('error el copiar en el portapapelera'));
	}
});
