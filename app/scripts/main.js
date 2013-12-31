require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery'
    }
});

require(['./LiveNews', 'jquery'], function (LiveNews, $) {
    'use strict';
    
    var liveNews = new LiveNews();
    liveNews.start();
});
