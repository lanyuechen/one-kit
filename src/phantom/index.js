var page = require('webpage').create();

page.open('http://www.baidu.com', function(status) {
  console.log('status:', status);
  if (status === 'success') {
    page.render('demo.png');
  }

  phantom.exit();
});