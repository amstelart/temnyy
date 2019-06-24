'use strict';

function BitrixSmallCart(){}
BitrixSmallCart.prototype = {

	activate: function ()
	{
		this.cartElement = BX(this.cartId);

		this.setCartBodyClosure = this.closure('setCartBody');
		BX.addCustomEvent(window, 'OnBasketChange', this.closure('refreshCart', {}));
	},

	closure: function (fname, data)
	{
		var obj = this;
		return data
			? function(){obj[fname](data)}
			: function(arg1){obj[fname](arg1)};
	},

	refreshCart: function (data)
	{
		if (this.itemRemoved)
		{
			this.itemRemoved = false;
			return;
		}
		data.sessid = BX.bitrix_sessid();
		data.siteId = this.siteId;
		data.templateName = this.templateName;
		data.arParams = this.arParams;
		BX.ajax({
			url: this.ajaxPath,
			method: 'POST',
			dataType: 'html',
			data: data,
			onsuccess: this.setCartBodyClosure
		});
	},

	setCartBody: function (result)
	{
		if (this.cartElement){
			this.cartElement.innerHTML = result;
			basketCountInit();
		}
		$(document).foundation();

		$('.recall').click(function (e) {
				e.preventDefault();
				
				CallBackInit();
				
				$('.recall-popup').fadeIn();
				$('.popup-outer').fadeIn();			
		});			
		
		if (this.itemHasRemove){
			$(".header-basket-link").addClass("hover");
			$("#header-basket-popup").addClass("is-open");
			$("#header-basket-popup").attr("aria-hidden","false");
			this.itemHasRemove = false;
		}
	},

	removeItemFromCart: function (id, productid)
	{
		var basketBtn = $('.to-basket-btn-id-' + productid);
		basketBtn.attr("href", "javascript:void(0);");
		basketBtn.text(basketBtn.data("to-add-text"));
		basketBtn.removeClass("in-basket");
		
		this.refreshCart ({sbblRemoveItemFromCart: id});
		this.itemRemoved = true;
		this.itemHasRemove = true;
		BX.onCustomEvent('OnBasketChange');
	}
};

var countUp = (function() {
  var minValue = 0.01;
	return {
      add: function(values) {
        var $item = $(values.item[0]),
            val = parseFloat($item.val()),
            count = values.count;
        val+=count;
        $item.val(val);
				updateSmallBasket(val,$item.data("id"));
      },
      del: function(values) {
        var $item = $(values.item[0]),
            val = parseFloat($item.val()),
            count = values.count;
        if (val > minValue ) {
          val-=count;
          $item.val(val);
					updateSmallBasket(val,$item.data("id"));
				}
      }
  }
}());


function updateSmallBasket(quantity,basket_id){
	var sessid = BX.bitrix_sessid();
	if (quantity > 0) {
		$.post(siteDir + 'include/cartHandler.php',
			{'action': 'set_qt', 'basket_id': basket_id, 'qt': quantity, 'sessid': sessid, "siteid":siteID, "langid":langID},
			function(response) {
				if (response.success == true) {
					$('#quantityBasketItem_'+basket_id).html(response.full_price);
					$('#totalBasketItemsPrice1').html(response.total);
					$('#totalBasketItemsPrice2').html(response.total);
				}	else{
					console.debug(response);
				}
		},
		'json');
	}
}

function basketCountInit(){
	$('.small-basket-count_up').click(function() {
	  var input = $(this).parent().find('.count-up__input');
		var ratio = Number($(input).attr('data-ratio'));
		var $btn = $(this),
				$input = $btn.siblings('.count-up__input');
		if ($btn.hasClass('minus')) {
			countUp.del({item: $input, count: ratio || 1})
		} else {
			countUp.add({item: $input, count: ratio || 1})
		}
	});
}

$(document).ready(function() {
	basketCountInit();
});
