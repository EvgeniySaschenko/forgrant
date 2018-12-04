(function(){
	// Замена значений в HTML
	function setProfit(clsPrice, clsPercent, price, percent){
		let currencyList= $('.currency-list');
		if(price < 0){
			$(currencyList).find(clsPrice).parent().addClass('minus');
		} else {
			$(currencyList).find(clsPrice).parent().removeClass('minus');
		}
		$(currencyList).find(clsPrice).text(price + '$');
		$(currencyList).find(clsPercent).text(percent + '%');
	}

	// Получить данные с сервера
	function getCurrency(currency){

		$.ajax({
			type: "get",
			url: "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + currency,
			success: (data) => {
				let {price, percent}= data.changes;

				setProfit('.currency-list__price_hour', '.currency-list__percent_hour', price.hour, percent.hour);
				setProfit('.currency-list__price_day', '.currency-list__percent_day', price.day, percent.day);
				setProfit('.currency-list__price_week', '.currency-list__percent_week', price.week, percent.week);
				setProfit('.currency-list__price_month', '.currency-list__percent_month', price.month, percent.month);
			}
		});
	}

	// Переключение PRICE | PERCENT
	$('.currency-list__btn-toggle').on('click', function(){
		$(this).toggleClass('active');
		$(this).parents('.currency-list__item').find('.currency-list__row_profit').toggleClass('active-price');
	})

	// Инициализация
	getCurrency('BTCUSD');

	// выбор валюты в SELECT
	$('.cyrrency-select__select').on('change', function(){
		getCurrency($(this).val());
	})
})();