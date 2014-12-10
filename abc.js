inf = {
	nextPage: -1,
	nextUrl: false,
	loading: false,
	initialize: function() {
		$('#threadnavigator_1 ul').append('<li><img src="http://i.imgur.com/kTTdW2l.gif" width="150px" height="150px" /></li>');
		var inf = this;
		$(window).bind("scroll", function(){
			inf.updateScrollInfo();
			if (inf.isNearBottom() && !inf.loading) {
				inf.appendNextPage();
			}
		});
	},
	updateScrollInfo: function() {
		this.contentHeight = $(document).height();
		this.scrollPosition = $(document).scrollTop();
	},
	isNearBottom: function() {
		return (this.contentHeight - this.scrollPosition) < 3000;
	},
	getNextUrl: function() {
		if (!this.nextUrl) {
			this.nextUrl = $("#pager .lia-paging-page-next a").attr('href').replace(/\d+$/g, '');
			this.nextPage = Number($(".lia-component-pagesnumbered .lia-link-disabled").html()) + 1;
		}
		return this.nextUrl + this.nextPage++;
	},
	getNextPage: function(url, cb) {
		var context = this;
		$.get(url, function(data) { 
				context.content = $.parseHTML(data); 
				if (cb) {
					cb(context);
				}
			} 
		);
	},
	appendNextPage: function() {
		if (!this.loading) {
			this.loading = true;
			this.getNextPage(this.getNextUrl(), function(context) {
				if (context.content) {
					$('.linear-message-list.message-list').append($('.linear-message-list.message-list', context.content).html());	
					context.updateScrollInfo();
					context.loading = false;
				}
			});
		}
	}
}
inf.initialize();
