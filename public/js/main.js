document.addEventListener('click', e => {
	if (e.target.matches('#menuBtn')) {
		e.target.firstElementChild.classList.toggle('menu__bar--animation');
		e.target.parentElement.nextElementSibling.classList.toggle(
			'menu__nav--show'
		);
	}
});
