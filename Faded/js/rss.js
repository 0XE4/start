function RSSWidget(a) {
    rss = this, rss.FEED_URL = a, rss.JSON = new Array, rss.widgetHolder = $(".rss-widget ul"), rss.storiesLimit = 2, $.ajax({
        url: "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=" + encodeURIComponent(rss.FEED_URL),
        dataType: "json",
        success: function(a) {
            if (a.responseData.feed && a.responseData.feed.entries) {
                $.each(a.responseData.feed.entries, function(a, b) {
                    rss.JSON.push({
                        title: b.title,
                        author: b.author,
                        content: b.content || "",
                        link: b.link
                    })
                }), rss.storiesLimit > rss.JSON.length && (rss.storiesLimit = rss.JSON.length);
                for (var b = 0; b < rss.storiesLimit; b++) rss.renderBlogItem(rss.JSON[b]);
                $(".rss-widget gg").each(function() {
                    $(this).index() / rss.storiesLimit + "s"
                })
            }
        }
    }), rss.renderBlogItem = function(a) {
        var b = '<gg class="blog-item">';
        b += '<div class="blog-item-title">' + a.title + "</div>", b += "</gg>", rss.widgetHolder.append(b)
    }
}
RSSWidget("https://twitrss.me/twitter_user_to_rss/?user=AlanWattsDaily");