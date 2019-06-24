if (window.frameCacheVars !== undefined) 
{
	BX.addCustomEvent("onFrameDataReceived" , function() {
		allInit1();
		allInit2();
	});
} else {
	BX.ready(function() {
		allInit1();
		allInit2();
	});
}

function submitCommentCatalog()
{
	
	var isError = false;
	$("#form_comment .form-el").each(function(i, obj){
		if (obj.value == ""){
			$(obj).addClass("error");
			if ($(obj).parent().find("label.error").length == 0){
				$(obj).after('<label class="error">'+ errorMessage +'</label>');
			}
			if (!isError) isError = true;
		} else {
			$(obj).removeClass("error");
			$(obj).parent().find("label.error").remove();
		}
	});		

	$('#form_comment .input-mail').each(function(i, obj){
		if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(obj.value)){
			$(obj).addClass("error");
			if ($(obj).parent().find("label.error").length == 0){
				$(obj).after('<label class="error">'+ errorMailMessage +'</label>');
			}
			if (!isError) isError = true;
		} else {
			$(obj).removeClass("error");
			$(obj).parent().find("label.error").remove();
		}
	});			
	
	if (isError) return false;		
	
	var button = $("#post-button").get(0);
	button.focus();
	button.disabled = true;

	var action = $('#form_comment').get(0).action;
	$.post(action, $('#form_comment').serialize(), function(response) {
			button.disabled = false;
			if (response=="") return false;
			$("#comment-list-wrap").prepend(response);
			if ($("#comment-list-wrap .comment-list__item").length>5) $("#comment-list-wrap .comment-list__item").last().remove();
			var countPosts = $("#comment-list-wrap .new-post").eq(0).data("post-count");
			$("#posts-counter").html(countPosts);
			$("#comment-list-wrap .new-post").removeData("post-count").removeClass("new-post");
			$('#form_comment').get(0).reset();
	}, 'html');

	return false;
}


function submitComment()
{
	var isError = false;
	$("#form_comment .form-el").each(function(i, obj){
		if (obj.value == ""){
			$(obj).addClass("error");
			if ($(obj).parent().find("label.error").length == 0){
				$(obj).after('<label class="error">'+ errorMessage +'</label>');
			}
			if (!isError) isError = true;
		} else {
			$(obj).removeClass("error");
			$(obj).parent().find("label.error").remove();
		}
	});		

	$('#form_comment .input-mail').each(function(i, obj){
		if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(obj.value)){
			$(obj).addClass("error");
			if ($(obj).parent().find("label.error").length == 0){
				$(obj).after('<label class="error">'+ errorMailMessage +'</label>');
			}
			if (!isError) isError = true;
		} else {
			$(obj).removeClass("error");
			$(obj).parent().find("label.error").remove();
		}
	});			
	
	if (isError) return false;		
	
	var button = $("#post-button").get(0);
	button.focus();
	button.disabled = true;

	var action = $('#form_comment').get(0).action;
	$.post(action, $('#form_comment').serialize(), function(response) {
			button.disabled = false;
			if (response=="") return false;
 
			$("#comment-list-wrap").prepend(response);
			if ($("#comment-list-wrap .comment-list__item").length>5) $("#comment-list-wrap .comment-list__item").last().remove();
			$("#comment-list-wrap .new-post").removeData("post-count").removeClass("new-post");
			$('#form_comment').get(0).reset();
	}, 'html');

	return false;
}

function submitFeedback()
{
    var isError = false;
    $("#feedback-form .form-el").each(function(i, obj){
        if (obj.value == ""){
            $(obj).addClass("error");
            if ($(obj).parent().find("label.error").length == 0){
                $(obj).after('<label class="error">'+ errorMessage +'</label>');
            }
            if (!isError) isError = true;
        } else {
            $(obj).removeClass("error");
            $(obj).parent().find("label.error").remove();
        }
    });

    $('#feedback-form .input-mail').each(function(i, obj){
        if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(obj.value)){
            $(obj).addClass("error");
            if ($(obj).parent().find("label.error").length == 0){
                $(obj).after('<label class="error">'+ errorMailMessage +'</label>');
            }
            if (!isError) isError = true;
        } else {
            $(obj).removeClass("error");
            $(obj).parent().find("label.error").remove();
        }
    });

    if (isError) return false;

    var button = $("#feedback-button").get(0);
    button.focus();
    button.disabled = true;

    var action = $('#feedback-form').get(0).action;
    $.post(action, $('#feedback-form').serialize() + "&PROD_NAME=" + $("#product-info h4").text(), function(response){
        button.disabled = false;
        if (response=="") return false;
        $("#feedback-wrap").html(response);
    }, 'html');

    return false;
}

function FavorInit()
{
	var sessid = BX.bitrix_sessid();
	$(".favorite").unbind("click");
	$(".favorite").click(function(){
		if(typeof isFavorDir !== 'undefined' || !$(this).hasClass('favorite-active')) {
            var favorite = $(this);
            var id = $(this).data("id");
            var offer_id = $(this).data("offer_id");

            $.post(siteDir + 'include/favoriteHandler.php', {
                'action': 'check',
                'id': id,
                'offer_id': offer_id,
                'sessid': sessid,
                "siteid": siteID,
                "langid": langID
            }, function (response) {
                if (response.success == true) {
                    $("#favorites-link").html(response.count);
                    if (response.action == "unset")
                        favorite.removeClass("favorite-active");
                    if (response.action == "set") {
                        favorite.addClass("favorite-active").attr('href', siteDir + 'favorites/');
                        ;
                    }
                    responseMenu();
                }
            }, 'json');
        }
	});
}

function RecommendBasketSliderInit()
{
	$('.j-slider-wide .products-list-slider').owlCarousel({
			nav: true,
			responsive: {
					0: {
							items: 1
					},
					700: {
							items: 2
					},
					800: {
							items: 3
					}/*,
					1200: {
							items: 4
					}*/
			}
	});

}

function GetCompareList(){
	$.post(siteDir + "include/getCompareList.php", {"siteid":siteID, "langid":langID}, function(response) {
		if (response!="") $("#compare-link").html(response);
		responseMenu();
	});
}

function RecommendSliderInit(){
	$('.recomend-slider .products-list-slider').owlCarousel({
			nav: true,
			responsive: {
					0: {
							items: 1
					},
					700: {
							items: 2
					},
					990: {
							items: 3
					}/*,
					1410: {
						items: 4
					},
					1740: {
						items: 5
					}*/
			}
	});
}

function BuyOneClickInit()
{

	$('#buy1click-form-note').html("");
    $("#buy1click-form").unbind("submit");
    $('#buy1click-form').on("submit", function(){

			var isError = false;
			$("#buy1click-form .required").each(function(i, obj){
			
				if (obj.value == ""){
					$(obj).addClass("error");
					if ($(obj).parent().find("label.error").length == 0){
						$(obj).after('<label class="error">'+ errorMessage +'</label>');
					}
					if (!isError) isError = true;
				} else {
					$(obj).removeClass("error");
					$(obj).parent().find("label.error").remove();
				}
			});
			if (isError) return false;
			$.post(
				$('#buy1click-form').attr('action'),
				$('#buy1click-form').serializeArray(),
				function(response) {
					$('#buy1click-form .input-box input').removeClass('error');
					$('#buy1click-form-note').html('');
							$('#buy1click-form-note').html(response);
							$('#buy1click-input-text').val("");
							setTimeout('$(".fast-order-popup .close").click();', 2000);
			}, 'html');
			return false;
	});
}
$(document).on("click", "#buy1click-form-submit", function () {
    if($("#buy1click_quantity").val()==""){
        $("#buy1click_quantity").val($(".count-up__input").val());
	}
    if ($("#buy1click-input-offer_id").val() !== ''){
        $("#buy1click-input-id").val($("#buy1click-input-offer_id").val());
    }
});
function CallBackInit()
{
	$('#call-back-form').submit(function(){
		
			var isError = false;
			$("#call-back-form input").each(function(i, obj){
				if (obj.value == ""){
					$(obj).addClass("error");
					if ($(obj).parent().find("label.error").length == 0){
						$(obj).after('<label class="error">'+ errorMessage +'</label>');
					}
					if (!isError) isError = true;
				} else {
					$(obj).removeClass("error");
					$(obj).parent().find("label.error").remove();
				}
			});		

			if (isError) return false;
		
			$.post($('#call-back-form').attr('action'), $('#call-back-form').serializeArray(), function(response) {
					$('#call-back-form-note').html('');
					if (response.success == 'Y') {
							$('#call-back-form-note').html(response.message);
							setTimeout('$(".recall-popup .close").click();', 2000);
					}

			}, 'json');
			return false;
	});
}

function FastViewInit(){
	$('.fast-view-popup .close').click(function (e) {
			e.preventDefault();
			$(".buy-one-click").unbind("click");
	});				

	$(".fast-view").unbind("click");
	$('.fast-view').click(function (e){
		e.preventDefault();
		var id = $(this).data("id");
		if (!id) return;
		
		$('.fast-view-popup').addClass('preloader');
		$('.fast-view-popup').fadeIn();
		$('.popup-outer').fadeIn();	

		BX.ajax({
			url: siteDir + "include/getDetail.php",
			method: "POST",
			data: {id: id, "siteid":siteID, "langid":langID},
			dataType: 'html',
			processData: false,
			start: true,
			onsuccess: function (html) {
				var ob = BX.processHTML(html);
				// inject
				BX("fast-view-wrapper").innerHTML = ob.HTML;
				BX.ajax.processScripts(ob.SCRIPT);

				$(".buy-one-click").unbind( "click" );
				$('#fast-view-wrapper .buy-one-click').click(function (e) {
                var quantity=$('#fast-view-wrapper .count-up__input').val();
				$("#one-click-text").show();
				$("#fast-order-text").hide();							

						$(".fast-view-popup .close").click();
						e.preventDefault();

						$('#buy1click-input-id').val($(this).data('id'));
						$('#buy1click-input-offer_id').val($(this).data('offer_id'));
						$('#buy1click-input-price').val($(this).data('price'));
                    	$('#buy1click_quantity').val(quantity);

						BuyOneClickInit();			
						
						$('.fast-order-popup').fadeIn();
						$('.popup-outer').fadeIn();			
				});							
				CheckInBasktet();
				// Product Slider
				var $productSlider = $('#fast-view-wrapper .product-slider'),
						$productSliderThumbs = $('#fast-view-wrapper .product-slider-thumbs'),
						flag = false,
						duration = 300;

				$productSlider
						.owlCarousel({
                            items: 1
						})
						.on('changed.owl.carousel', function (e) {
								if (!flag) {
										flag = true;
										$productSliderThumbs.trigger('to.owl.carousel', [e.item.index, duration, true]);
										flag = false;
								}
						});
				$productSliderThumbs
						.owlCarousel({
								responsive: {
										0: {
												items: 3
										},
										700: {
												items: 4
										}
								},
								margin: 20,
								nav: true,
								navRewind: false
						})
						.on('click', '.owl-item', function () {
								$productSlider.trigger('to.owl.carousel', [$(this).index(), duration, true]);

						})
						.on('changed.owl.carousel', function (e) {
								if (!flag) {
										flag = true;
										$productSlider.trigger('to.owl.carousel', [e.item.index, duration, true]);
										flag = false;
								}
						});

				// добавление класса .hide всем изображениям каждого слайдера кроме первого
				$productSlider.find('.owl-item:gt(0)').addClass('hide');
				// отображение изображений активного слайдера
				showActiveSlider();
				// смена торгового предложения
				$('#fast-view-wrapper label.caser-radio').click(showActiveSlider);

				// отображение активного слайдера
				function showActiveSlider() {
					// плавное отображение слайдера
					setTimeout(function () {
						$('#fast-view-wrapper .active-carousel').css({opacity: 1});
						//$productSlider.find('.active-carousel').css({opacity: 1});
					}, 500);

					// отображение изображений с задержкой в 1 сек.
					setTimeout(function () {
						$('#fast-view-wrapper .active-carousel .owl-item').removeClass('hide');
						//$productSlider.find('.active-carousel .owl-item').removeClass('hide');
					}, 1000);
				}

				$('.fast-view-popup').removeClass('preloader');
			}
		});				
});		
}

$(document).on('click', '.caser-radio', function () {
	$('.caser-radio').unbind();
	$('.active-carousel').css('opacity', 1);
});

function ProductOptionInit(){
	$(".slider-product-options").unbind("click");
	$('.slider-product-options').click(function (e) {
        var self = this;
        if ($(this).hasClass("in-basket"))
            return true;
        e.preventDefault();
        var id = $(this).data("id");
        var parent = $(this).closest('.products-list__item');
        if (!id) return;
        if ($(this).hasClass('no-offers')) {
            BX.ajax({
                url: siteDir + "include/getPrevOpt.php?action=ADD2BASKET&id=" + id + "&ajax_basket=Y&quantity=" + parent.find('[value-measure]').attr('value-measure'),
                method: "GET",
                dataType: 'json',
                processData: false,
                start: true,
                onsuccess: function (html) {
                    var ob = BX.processHTML(html);
                    BX.ajax.processScripts(ob.SCRIPT);
                    CheckInBasktet();
                    bx_basketFKauiI.refreshCart({});
                    $(self).addClass('in-basket');
                    $(self).text($(self).attr('data-added-text'));
                }
            });
            return;
        }

        $('.slider-product-options-popup').addClass('preloader');
        $('.slider-product-options-popup').fadeIn();
        $('.popup-outer').fadeIn();
        BX.ajax({
            url: siteDir + "include/getPrevOpt.php",
            method: "POST",
            data: {id: id, "siteid":siteID, "langid":langID},
            dataType: 'html',
            processData: false,
            start: true,
            onsuccess: function (html) {
                var ob = BX.processHTML(html);
                // inject
                BX("slider-product-options-wrapper").innerHTML = ob.HTML;
                BX.ajax.processScripts(ob.SCRIPT);
                CheckInBasktet();
                $('.slider-product-options-popup').removeClass('preloader');
            }
        });
	});
}

function MoreComments(){
	$(".showmore-comments").unbind("click");
	$(".showmore-comments").click(function(){
		var button = $(this);
		BX.ajax({
			url: siteDir + "include/getAllPosts.php",
			method: "POST",
			data: {IBLOCK_ID: $(this).data("iblock"), ELEMENT_ID: $(this).data("id"), "siteid":siteID, "langid":langID},
			dataType: 'html',
			processData: false,
			start: true,
			onsuccess: function (html) {
				var ob = BX.processHTML(html);
				BX("comment-list-wrap").innerHTML = ob.HTML;
				button.hide();
			}
		});		
		
	});
	
}

function CheckInBasktet(){
	$.each(productsInBasket, function(key, id) {
		var basketBtn = $('.to-basket-btn-id-'+id);
		basketBtn.attr("href", basketBtn.data("basket-url"));
		basketBtn.text(basketBtn.data("added-text"));
		basketBtn.addClass("in-basket");
	});	
}

function CheckRegInit(){
	$("#regform").submit(function(){
		var isError = false;
		$("#regform .required").each(function(i, obj){
			if (obj.value == ""){
				$(obj).addClass("error");
				if ($(obj).parent().find("label.error").length == 0){
					$(obj).after('<label class="error">'+ errorMessage +'</label>');
				}
				if (!isError) isError = true;
			} else {
				$(obj).removeClass("error");
				$(obj).parent().find("label.error").remove();
			}
		});		
		
		$('#regform input.input-email').each(function(i, obj){
			if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(obj.value)){
				$(obj).addClass("error");
				if ($(obj).parent().find("label.error").length == 0){
					$(obj).after('<label class="error">'+errorMailMessage+'</label>');
				}
				if (!isError) isError = true;
			} else {
				$(obj).removeClass("error");
				$(obj).parent().find("label.error").remove();
			}
		});				

		if (isError) return false;
	});
}


function CheckAuthInit(){
	$("#form_auth").submit(function(){
		var isError = false;
		$("#form_auth .required").each(function(i, obj){
			if (obj.value == ""){
				$(obj).addClass("error");
				if ($(obj).parent().find("label.error").length == 0){
					$(obj).after('<label class="error">'+ errorMessage +'</label>');
				}
				if (!isError) isError = true;
			} else {
				$(obj).removeClass("error");
				$(obj).parent().find("label.error").remove();
			}
		});		

		if (isError) return false;
	});
}

function allInit1() {
    var baseTransition = 300,
        mediumBreakpoint = 700,
        largeBreakpoint = 990;

    $(document).foundation();

		
    // Main Nav background
    $('.main-nav__back').click(function (e) {
      e.preventDefault();
      $('body').foundation('toggle');
    });

    // Change view in catalog
    $('.j-catalog-set-block-view').click(function (e) {
		$.cookie('catalog-list', 'block-view', { expires: 999, path: '/' });
		$(document).foundation();
        e.preventDefault();
        $('.catalog-product-list').addClass('-block-view');
        $('.catalog-product-list').removeClass('-list-view');
        $('.catalog-product-list').removeClass('-mini-list-view');
        $('.catalog-view-set__item').removeClass('selected');
        $(this).addClass('selected');
        $(".products-list__item .align-image").css("height","auto").css("display","flex");
        cart_align_height();
        move_elements();
    });
		
    $('.j-catalog-set-list-view').click(function (e) {
		$.cookie('catalog-list', 'list-view', { expires: 999, path: '/' });
		$(document).foundation();
        e.preventDefault();
        $('.catalog-product-list').addClass('-list-view');
        $('.catalog-product-list').removeClass('-block-view');
        $('.catalog-product-list').removeClass('-mini-list-view');
        $('.catalog-view-set__item').removeClass('selected');
        $(this).addClass('selected');
        move_elements();
    });
		
    $('.j-catalog-set-mini-list-view').click(function (e) {
		$.cookie('catalog-list', 'mini-list-view', { expires: 999, path: '/' });
		$(document).foundation();
        e.preventDefault();
        $('.catalog-product-list').addClass('-mini-list-view');
        $('.catalog-product-list').removeClass('-block-view');
        $('.catalog-product-list').removeClass('-list-view');
        $('.catalog-view-set__item').removeClass('selected');
        $(this).addClass('selected');
        $(".products-list__item .align-image").css("display","block").css("height","auto");
        move_elements();
    });

		if ($.cookie('catalog-list')){
			switch($.cookie('catalog-list')){
				case 'block-view':
					$('.j-catalog-set-block-view').click();
				break;
				case 'list-view':
					$('.j-catalog-set-list-view').click();
				break;
				case 'mini-list-view':
					$('.j-catalog-set-mini-list-view').click();
				break;			
			}
		}		
				
		if ($.cookie('catalog-h4') == "close"){
			$(".catalog-h4").addClass("closed");
		}

		if ($.cookie('filter-h4') == "close"){
			$(".filter-h4").addClass("closed");
		}
		
    // Phone mask
    $('[type="tel"]').mask("+7 (999) 999-9999");

    // Main Slider
    $('.main-news-slider').owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            990: {
                items: 3
            }/*,
			1000 : {
                items: 4
			}*/
        }
    });

    // Main Slider
    if($("#slider-6 .main-slider").length){
        $('#slider-6 .main-slider').owlCarousel({
        	items: 1,
        	dots: true,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
        	nav:true,
        	stagePadding:200,
        	loop:true
    	});
    } else {
        $('.main-slider').owlCarousel({
    		items: 1,
            autoplay:true,
			animateOut: 'fadeOut',
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            loop:true,
    		dots: true
        });
    };
    // Product List Slider
    $('.j-slider-normal .products-list-slider').owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            990: {
                items: 3
            }/*,
            1260: {
                items: 4
            },
            1564: {
                items: 5
            }*/
        }
    });
    $('.j-slider-wide-viewed .products-list-slider').owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1,
				loop:true
            },
            700: {
                items: 1
            },
        }
    });

    // Product List Slider Wide
    $('.j-slider-wide .products-list-slider').owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            800: {
                items: 3
            }/*,
            1260: {
                items: 4
            },
            1564: {
                items: 5
            }*/
        }
    });

    // Main Brands Slider
    var $mainBrandsSlider = $('.main-brands-slider'),
        mainBrandsSliderOptions = {
            responsive: {
                0: {
                    items: 2
                },
                700: {
                    items: 4
                },
                990: {
                    items: 4
                }
            }
        },
        resizeTimeout;
    function mainBrandSliderInit () {
      if ($(window).width() < mediumBreakpoint) {
        $mainBrandsSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $mainBrandsSlider.find('.owl-stage-outer').children().unwrap();
      } else {
        $mainBrandsSlider.owlCarousel(mainBrandsSliderOptions).addClass('owl-carousel owl-loaded');
      }
    }
    $(window).resize( function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(mainBrandSliderInit, 500);
    });
    mainBrandSliderInit();

    // Product Slider
    var $productSlider = $('.product-slider'),
        $productSliderThumbs = $('.product-slider-thumbs'),
        flag = false,
        duration = 300;

    $productSlider
        .owlCarousel({
            items: 1,
        })
        .on('changed.owl.carousel', function (e) {
            if (!flag) {
                flag = true;
                $productSliderThumbs.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });
    $productSliderThumbs
        .owlCarousel({
            responsive: {
                0: {
                    items: 3
                },
                700: {
                    items: 4
                }
            },
            margin: 20,
            nav: true,
            navRewind: false
        })
        .on('click', '.owl-item', function () {
            $productSlider.trigger('to.owl.carousel', [$(this).index(), duration, true]);
            var zoom_id = $(this).children(".product-slider-thumbs__item").attr("data-zoom-id");
			zoom_product('#' + zoom_id);

        })
        .on('changed.owl.carousel', function (e) {
            if (!flag) {
                flag = true;
                $productSlider.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });

	// добавление класса .hide всем изображениям каждого слайдера кроме первого
	$productSlider.find('.owl-item:gt(0)').addClass('hide');
	// отображение изображений активного слайдера
	showActiveSlider();
	// смена торгового предложения
	$('#product-info-wrapper label.caser-radio').click(showActiveSlider);

	// отображение активного слайдера
	function showActiveSlider() {
		var $activeCarousel = $('.active-carousel');
		setTimeout(function () {
			$activeCarousel.css({opacity: 1});
		}, 10);
		setTimeout(function () {
			$('.active-carousel .owl-item').removeClass('hide');
		}, 20);
        var zoom_id = $('.product-slider .owl-item.active .product-slider__item').data('value');
        if(zoom_id) zoom_product('#' + zoom_id);
	}

    // Product addpack Slider
    $('.product-addpack-slider').owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 2,
                margin: 40
            },
            700: {
                items: 3,
                margin: 65
            },
            990: {
                items: 4,
                margin: 65
            }
        }
    });

    // Compare products slider
    $('.compare-slider').owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 3,
                margin: 30
            },
            990: {
                items: 4,
                margin: 30
            }
        }
    });

    // Catalog Item margin-bottom HACK on hover
    function getOptionSetsHeight ($optionSets) {
      var height = 0;

      $optionSets.find('.option-set').each(function(index, el) {
        height+= $(el).height() + parseInt($(el).css('marginBottom'));
      });

      return height;
    }

    $('.products-list__item').hover(
        function () {
            var $item = $(this);
            if (!$item.parents('.-list-view').length && !$item.parents('.-mini-list-view').length) {
                var $image = $item.find('.image'),
                    imageHeight = $image.height(),
                    $optionSets = $item.find('.option-sets'),
                    //optionSetsCount = $optionSets.find('.option-set').length,
                    optionSetHeight = getOptionSetsHeight($optionSets),
                    offset = optionSetHeight;
                if ($optionSets.length) {
                    if (!$item.parents('.products-list-slider').length) {
                      //$item.css('marginBottom', -offset)
                    }
                }
            }

        },
        function () {
            var $item = $(this);
            if (!$item.parents('-list-view').length && !$item.parents('.-mini-list-view').length) {
                var $image = $item.find('.image'),
                    imageHeight = $image.height(),
                    $optionSets = $item.find('.option-sets'),
                    optionSetsCount = $optionSets.find('.option-set').length,
                    optionSetHeight = 40, // 30 height + 10 padding
                    offset = optionSetsCount * optionSetHeight;

                if ($optionSets.length) {
                    if (!$item.parents('.products-list-slider').length) {
                      $item.css('marginBottom', 0)
                    }
                }
            }
        }
    );

    // Catalog filter slideUp on mobile
    $('.catalog-filters h4').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('closed');
    });

    // Product Tabs on mobile
    $('.tabs-mobile-links select').change(function () {
        var id = $(this).find('option:selected').val() + '-label';
        $(id).click();
    });

    // Footer accordion on mobile
    $('.pre-footer h4').click(function () {
        if ($(window).width() < mediumBreakpoint) {
            $(this).toggleClass('showed').siblings('ul').slideToggle();
        }
    });

    // Catalog categries accordon
    $('.catalog-filters__link-list .has-child>a .catalog-open').click(function (e) {
        e.preventDefault();
        $(this).parent('ul').slideToggle();
        $(this).parent().parent().toggleClass('expanded');
        //console.log($(this).parents('li')[0]);
        if ($(this).parent().parent().hasClass('expanded')){
            $(this).html("&minus;");
		}
		else{
            $(this).html('+');
		}
    });

    // $('.catalog-filters__link-list .has-child>a ').click(function (e) {
    //     e.preventDefault();
    //     $(this).siblings('ul').slideToggle();
    //     $(this).closest('.has-child').toggleClass('expanded');
    //
    // });
    // Popup works
    $('.popup .close').click(function (e) {
        e.preventDefault();
        $('.popup').fadeOut();
        $('.popup-outer').fadeOut();
    });
    $('.popup-outer').click(function (e) {
        e.preventDefault();
        $('.popup').fadeOut();
        $('.popup-outer').fadeOut();
    });
    $('.j-popup-btn').click(function (e) {
        e.preventDefault();
        var popupName = $(this).data('popup');
        $('.' + popupName + '-popup').fadeIn();
        $('.popup-outer').fadeIn();

        // Custom popups
        if (popupName == 'fast-view') {
          $('.' + popupName + '-popup').addClass('preloader');
          setTimeout(function() {
            $('.' + popupName + '-popup').removeClass('preloader');
          }, 500)
        }
    });

  // Compare page equlizer
  function customEqulizer($items) {
    var height = 0;
    $items.each(function(index, el) {
      height = ($(el).height() > height) ? $(el).height() : height;
    });
    $items.each(function(index, el) {
      $(el).height(height);
    });
  }
  customEqulizer($('.compare-slider__item .name'));
  customEqulizer($('.compare-slider__item .image'));
  customEqulizer($('.compare-slider__item .option-sets'));
  customEqulizer($('.compare-slider__item .caption'));
  set_dynamics_elements();

}

function allInit2(){
	$("#posts-counter").text($("#posts-comment-count").text());
	
	if (typeof isFavorDir != "undefined"){
		$(".favorite").attr("href","javascript:void(0);");
	}
	
 	CheckRegInit();
	CheckAuthInit();
	CheckInBasktet();
	FavorInit();
	FastViewInit();
	ProductOptionInit();
	MoreComments();
    cart_align_height();
	// Main Slider
	var mainSlider = $('.main-slider');


	mainSlider.owlCarousel({
		items: 1,
		autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        loop:true,
		dots: true,
	});
	
	$(".main-slider__item").css("visibility","visible");
	
    // Catalog filter slideUp on mobile
    $(document).on('click','.catalog-filters h4.filter-h4', function (e) {
		if ($(this).hasClass("closed")) {
            $.cookie('filter-h4', 'open', {expires: 999, path: '/'});
        } else {
            $.cookie('filter-h4', 'close', { expires: 999, path: '/' });
		}
		e.preventDefault();
        $(this).toggleClass('closed');
    });

	$('.popup .close').click(function (e) {
		e.preventDefault();
		$('.popup .pop-inner-wrapper').html("");
	});	

	
	$(".buy-one-click").unbind("click");
	$('.buy-one-click').click(function(e){
			$("#one-click-text").show();
			$("#fast-order-text").hide();		
		
			e.preventDefault();
			$('#buy1click-input-id').val($(this).attr('data-id'));
        	$('#buy1click-input-offer_id').val($(this).attr('data-offer_id'));
			$('#buy1click-input-price').val($(this).attr('data-price'));

			BuyOneClickInit();
			$('.fast-order-popup').fadeIn();
			$('.popup-outer').fadeIn();			
	});
	
	$('.fast-order').click(function (e){
			$("#one-click-text").hide();			
			$("#fast-order-text").show();
		
			e.preventDefault();

			$('#buy1click-input-cart').val('Y');
			BuyOneClickInit();			

			$('.fast-order-popup').fadeIn();
			$('.popup-outer').fadeIn();			
	});			

	$('.recall').click(function (e) {
			e.preventDefault();
			CallBackInit();
			$('.recall-popup').fadeIn();
			$('.popup-outer').fadeIn();			
	});	
	
	$("#search").submit(function(){
		if ( $("#title-search-input").val() == "" ) return false;
	});

	$(".search-form").submit(function(){
		if ( $(this).find(".search-input").val() == "" ) return false;
	});	

	$(".page-404 form").submit(function(){
		if ( $(".page-404 .search-input").val() == "" ) return false;
	});
	

	
	$('#PHONE_prop').mask("+7 (999) 999-9999");
	
	$(".rubrics-input").change(function(){
		 $('#rub-sub-button').prop("disabled", false); 
	});

	$("select[name='catalog-sort']").on('change', function(){
        location.href = $(this).val();
	})
}

$(document).on('click', '[data-collapse-btn]', function (e) {
	e.preventDefault();
	$(this).toggleClass('active')
		.next('[data-collapse-body]')
		.stop().slideToggle()
		.toggleClass('active');
});
/*$(document).ready(function () {
    var lineHeight = parseInt($(".products-list__item .name").css("line-height"))*2;
    $(".products-list__item .name-wrapper").css("height", lineHeight);
});*/
function cart_align_height(){
    var struct = [];
    var row_item = [];
    var row_itemNames = [];
    var need_recalc = false;
    if ($(".products-list__item .image, .product-addpack-slider .image").length) {
        if ($(".products-list__item .image").length) {
        var previous_item_top = $($(".products-list__item .image")[0]).offset().top;
        $i = 0;

        $(".products-list__item, .product-addpack-slider").each(function (index, value) {
            if (!$(this).parents(".viewed_product_slider").length) {
                var img = $(this).find('.image');
                img.css("height", "");
                var name = $(this).find('.name-wrapper');
                img.attr("data-idd", $i);
                if (img.offset().top > previous_item_top) {
                    $i++;
                }

                if (struct[$i] == undefined) {
                    struct[$i] = {
                        maxHeight: 0,
                        maxHeightName: 0,
                        row_item: [],
                        row_itemNames: []
                    }
                }

                struct[$i].row_item.push(img);
                struct[$i].row_itemNames.push(name);
                if (img.height() > struct[$i].maxHeight) {
                    struct[$i].maxHeight = img.height();
                }
                if (name.height() > struct[$i].maxHeightName) {
                    struct[$i].maxHeightName = name.height();
                }
                previous_item_top = img.offset().top;
            }
        });
        for (var i in struct) {
            for (var n in struct[i].row_item) {
                if (struct[i].maxHeight > 0) {
                    $(struct[i].row_item[n]).height(struct[i].maxHeight);
                    $(struct[i].row_item[n]).parents('.products-list__item').find(".bx_item_detail_scu").css("top", struct[i].maxHeight - 23 + "px");
                }
            }
            for (var n in struct[i].row_itemNames) {
                if (struct[i].maxHeightName > 0) {
                    $(struct[i].row_itemNames[n]).height(struct[i].maxHeightName);
                }
            }
        }
    }
    }
}
function scrollToTab() {
    var offset = $('.product-tabs-content').offset().top - 100;
        $("html, body").animate({scrollTop:offset},500);
        $(".tabs-title #tab5-label").click();
};
$(document).on('click', '.product-review-links a', function (e) {
    scrollToTab();
});
$(document).ready(function () {
    $("li.item.has-child.active").addClass('open');
    $("li.item.has-child").has(".active").addClass('open');
});
$(document).on('click','li.has-child a span',function (e) {
     $(this).addClass('open');
     if ($(this).hasClass('open')) {}
     else {
         e.preventDefault();
        $(this).parent().find('ul').show();
     }
});

$(document).on('click','li.has-child .container-icon',function (e) {

	if ($(".menu-wrapper").hasClass('opened')){
        $(".depth-level-1").css( 'display', "flex" );
        $(".depth-level-1").addClass('menu-block');
        $(".main-nav .main-menu > li.has-child > div.menu-wrapper").css('display','flex');
        $(".menu-wrapper").removeClass('opened');

	}
	else{
        $(".depth-level-1").css( 'display', "none" );
        $(".main-nav .main-menu > li.has-child > div.menu-wrapper").css('display','none');
        $(".menu-wrapper").addClass('opened');
	}
    });


$(window).load(function () {
	cart_align_height();


    $(document).on('click', ".category", function () {
    	if($(this).parent().find('.smart-filter-wrapper').length){
            $(this).parent().find('.smart-filter-wrapper').slideToggle(600);
        } else {
            $(this).next().slideToggle(600);
        }
        $(this).toggleClass('minus');
    });

  $('.catalog-view-set__item, #product-slider-tabs li a').click(function () {
  	setTimeout(function () {
      cart_align_height();
    })
  });

});
function responseMenu(){

    $('ul.dropdown-menu li.item').appendTo('ul.main-menu');
    var items = $('ul.main-menu li.item');
    var max_width = $('.main-nav').outerWidth() - $('.sub-menu').outerWidth() - $('ul.main-menu li.dd_menu').outerWidth();
    // var max_width = $('ul.menu').width() - $('ul.menu li.dd_menu').outerWidth();
    var width = 0;
    var hide_from = 0;
    items.css({'width':'auto'});

    items.each(function(index){
        if (width + $(this).outerWidth() > max_width)
        {
            return false;
        }
        else
        {
            hide_from = index;
            width += $(this).outerWidth();
        }
    });
    if (hide_from < items.length - 1) {
        items.eq(hide_from).nextAll('li.item').appendTo('ul.dropdown-menu');
        //items.css({'width':(max_width / (hide_from + 1)) + 'px'});
        $('ul.main-menu li.dd_menu').show().css({"display":"table-cell"});
    }
    else
    {
        $('ul.main-menu li.dd_menu').hide();
    }
}

$(document).ready(function () {
    move_elements();
    if (document.documentElement.clientWidth > 970) {
        responseMenu();
        $(".dropdown-toggle").on('click', function () {
            $('.dropdown-menu').toggle();
        });
	} else {

	}
});

function move_elements(){
    $('.products-list.catalog-product-list.-block-view .products-list__item').each(function(){
		var $this = $(this);
        var sel = $this.find(".option-sets .bx_item_detail_scu");

        if (sel.length) {
            var blockColor = $this.find(".option-sets");
            var block = $this.find(".image .align-image img");
            blockColor.insertAfter(block);
        }
    });
    $('.products-list.catalog-product-list.-mini-list-view .products-list__item').each(function(){
        var $this2 = $(this);
        var $sel = $this2.find(".option-sets .bx_item_detail_scu");

        if ($sel.length) {
            var $blockColor = $this2.find(".option-sets");
            var $block = $this2.find(".caption");
            $blockColor.insertAfter($block);
        }
    });
    //$("#source").appendTo("#destination");
    if ($(window).width() > 700) {
        if($(".page-header h4").length) {
            $("#demo-container h1").prependTo($(".page-header .site-container"));
            $(".page-header h4").prependTo($("#demo-container #product-info"));
        }
        if($(".page-header.detail + .site-container .catalog-filters h1").length) {
            $(".catalog-filters h1").prependTo(".page-header .site-container");
        }
        if(!$("#product-info-wrapper .first-row .product-share-links").length){
            $(".product-share-links").appendTo("#product-info-wrapper .first-row");
		}
        if(!$(".catalog-filters .viewed_product_slider").length) {
            $(".viewed_product_slider").insertAfter($(".catalog-filters"));
        }
        if($(".layout-left-side .catalog-view-set").length) {
			$(".catalog-sort-set").appendTo($(".catalog-sort-view-sets .column.medium-3"));
        }
        if($(".layout-left-side .catalog-sort-set").length) {
            $(".catalog-sort-set").appendTo($(".catalog-sort-view-sets .column.medium-9"));
        }
    } else {
        if($("#demo-container h4").length) {
            $(".page-header h1").insertAfter("#demo-container h4");
            $("#demo-container h4").appendTo(".page-header .site-container");
        }
        if($(".page-header.detail + .site-container .catalog-filters h4.catalog-h4").length) {
            $(".page-header h1").prependTo(".catalog-filters");
        }
        if(!$("#demo-container .product-share-links").length) {
            $(".product-share-links").appendTo("#demo-container");
        }
        if(!$(".tabs-content .viewed_product_slider").length) {
            $(".viewed_product_slider").appendTo($(".tabs-content"));
        }
        if($(".layout-left-side .catalog-view-set").length) {
            $(".catalog-view-set").insertAfter($(".filter-h4"));
        }
        if($(".layout-left-side .catalog-sort-set").length) {
            $(".catalog-sort-set").insertAfter($(".filter-h4"));
		}
    }
}

$(window).resize(function() {
	move_elements();
    if ($(window).width() > 700) {
        responseMenu();
        $(".dropdown-toggle").unbind("click");
        $(".dropdown-toggle").on('click', function () {
            $('.dropdown-menu').toggle();
        });
    }
});

function zoom_product(selector){
    if (window.matchMedia('(min-width: 61.8125em)').matches) {
        $(selector).elevateZoom({
            easing: true,
            zoomType: "inner",
            lensSize: 250,
            containLensZoom: true,
            borderSize: 1,
            scrollZoom: true
        });
    }
}
$(document).on('click', '.size-gid-link', function () {
	$('.size-gid-wrapper').fadeIn().css('display', 'flex');
});
$(document).on('click', '.size-gid-wrapper, #popup-box-1 .close', function () {
	$('.size-gid-wrapper').fadeOut();
});
$(document).on('click', '.sale-paysystem-wrapper .read-pay-more', function (e) {
	$(this).parent().find('.paym-read-more-wrap').toggleClass('visible');
	$(this).toggleClass('opened');
	if($(this).hasClass('opened')){
		$(this).html($(this).data('closed'));
	}else{
        $(this).html($(this).data('opened'));
	}
});
$(document).on('click', '#popup-box-1', function (e) {
	e.stopPropagation();
})


$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() > 0) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });
    $('.scroll-to-top').click(function() {
        $('body,html').animate({scrollTop:0},800);
        return false;
    });
});


$(document).mouseup(function (e) {
    var container = $("#configurator, .sp-container");
    if (container.has(e.target).length === 0){
        container.removeClass("active");
    }
});

$(document).ready(function(){
    $(".search-button").click(function () {
        if ($(".block-search-form").is(":hidden")) {
            $(".block-search-form").show('fast');
        } else {
            $(".block-search-form").hide('fast');
        }
        return false;
    });

	$(".product-share-links .label").click(function () {
		if ($(".container-sharing").is(":hidden")) {
			$(".container-sharing").show('fast');
		} else {
			$(".container-sharing").hide('fast');
		}
		return false;
	});
    $(".b-detail__popup-close .icon").click(function () {
        $(".b-detail__popup.active").css('display','none');
        $(".b-detail__popup-overlay.active").css('display','none');
    });
    $(".product-slider .owl-item.active img").click(function () {
        $(".b-detail__popup.active").css('display','block');
        $(".b-detail__popup-overlay.active").css('display','block');
    });
    $(".product-slider .owl-item").click(function () {
        $(".b-detail__popup.active").css('display','block');
        $(".b-detail__popup-overlay.active").css('display','block');
    });
    $(".b-detail__popup-overlay.active").click(function () {
        $(".b-detail__popup.active").css('display','none');
        $(".b-detail__popup-overlay.active").css('display','none');
    });
        $(".main-nav .main-menu > li.has-child").hover(
        function () {
            $(".main-nav .main-menu > li.has-child > div.menu-wrapper").stop();
        	$(".main-nav .main-menu > li.has-child > div.menu-wrapper").addClass('opened');
            $(".main-nav .main-menu > li.has-child > div.menu-wrapper").slideToggle(100);

        },
		function() {
            $(".main-nav .main-menu > li.has-child > div.menu-wrapper").stop();
            $(".main-nav .main-menu > li.has-child > div.menu-wrapper").removeClass('opened');
            $(".main-nav .main-menu > li.has-child > div.menu-wrapper").slideToggle(100);
		}

	);
    // $(".j-catalog-set-mini-list-view.catalog-view-set__item").click(function () {
    //     history.pushState(null, null, '/store/dlya-zhenshchin/?view=list');
    //
    //
    // });
    // $(".j-catalog-set-block-view.catalog-view-set__item").click(function () {
    //     history.pushState(null, null, '/store/dlya-zhenshchin/?view=block');
    //
    // });

});

function set_dynamics_elements() {
	if(typeof dynamics_elements !== 'undefined'){
        var btn_fav_array = $('a.favorite');
        btn_fav_array.each(function () {
            var fav_id = $(this).data('id');
            var fav_offer_id = $(this).data('offer_id');
            if(
                fav_id == fav_offer_id ||
                dynamics_elements.FAVORITES[fav_id] !== undefined ||
                dynamics_elements.FAVORITES[fav_offer_id] !== undefined
            ){
                $(this).addClass('favorite-active').attr('href', siteDir + 'favorites/');
            }
        });
        var btn_compare_array = $('a.compare');
        btn_compare_array.each(function () {
            var comp_id = $(this).data('id');
            var comp_offer_id = $(this).data('offer_id');
            if(
                comp_id == comp_offer_id ||
                dynamics_elements.COMPARES[comp_id] !== undefined ||
                dynamics_elements.COMPARES[comp_offer_id] !== undefined
            ){
                $(this).addClass('compare-active').attr('href', siteDir + 'store/compare/');
            }
        });
	}
}

BX.showWait = function(){
    $('.loader').addClass('opened');
};
BX.closeWait = function(){
    $('.loader').removeClass('opened');
};

$(document).mouseup(function (e) {
    var container = $(".subscribe-container");
    if (container.has(e.target).length === 0){
        container.removeClass("active");
        $(".subscribe-container ").hide('fast');
        $(".background-subscribe-box").hide('fast');
    }
    $(".subscribe-container .close").click(function () {
        $(".subscribe-container ").hide('fast');
        $(".background-subscribe-box").hide('fast');
    });
});

$(document).ready(function () {
    //function makeItemCatalogLine() {
    //  var colums = $('.column.NEW.small-6');
    //
    //  if (colums.length == 3) {
    //    $(colums[2]).removeClass('small-6').addClass('small-12');
    //  }
    //}

    function checkWidth() {
        var videoSource = '/upload/video1.mp4'

        var windowWidth = $('body').innerWidth();
        var video = document.getElementsByTagName('video')[0]
        var videobox = $('.videobox')
        var slider = $("[id*='main_slider_width']");
        var colums = $('.column.NEW');

		if (videobox) {
			if (windowWidth < 1025) {
				videobox.addClass('hide');
				video.setAttribute('src', '');
				slider.removeClass('hide');
			} else {
				video.setAttribute('src', videoSource);
				videobox.removeClass('hide');
				slider.addClass('hide');
			}
		}

        if (slider) {
			if (windowWidth > 1000) {
				slider.addClass('site-container');
			} else {
				slider.removeClass('site-container');
			}
		}
		
		if (colums) {
			if (windowWidth < 450) {
				colums.removeClass('small-6').addClass('small-12');
			} else {
				colums.removeClass('small-12').addClass('small-6');
			}
		}
    }

    //makeItemCatalogLine();

    checkWidth();

    $(window).resize(function () {
        checkWidth();
    });
});