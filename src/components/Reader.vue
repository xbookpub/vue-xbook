<template>
<div id="xbody">
    <div class="am-g am-g-fixed">

      <div class="am-u-md-12">
        <div class="am-g">
          <div class="am-u-sm-12 am-u-sm-centered">
            <div id="loading" class="am-cf">loading......</div>
            <div id='content' class="am-cf am-article" v-html="content"></div>
            <hr/>
            <ul class="am-pagination am-pagination-default" style="text-align:center; margin-bottom:0px;">
              <li class="am-pagination-prev" style="display:none;"><a id='pre' v-link="{ path: '/chapters', query: { book: book, name: name, num: pre, count: count }}">«上一章</a></li>
              <li class="am-pagination-prev"><a href="javascript:;" data-am-modal="{target: '#my-alert'}">加入书架</a></li>
              <li class=""><a v-link="{ path: '/books/'+book, query: { name: name, count: count }}">目录</a></li>
              <li class="am-pagination-next"><a id='next' v-link="{ path: '/chapters', query: { book: book, name: name, num: next, count: count }}">下一章»</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!--侧边栏-->
      <div class="am-u-md-3 am-u-md-pull-9 my-sidebar">
        <div class="am-offcanvas" id="sidebar">
          <div class="am-offcanvas-bar">
            <ul class="am-nav">
              <li><a href="#">hello, 胖胖红</a></li>
              <li class="am-nav-header"></li>
              <li><a href="#">阿里巴巴是个快乐的青年</a></li>
              <li><a href="#">预备 唱~</a></li>
              <li><a href="#">胖胖</a></li>
              <li><a href="#">胖胖胖胖</a></li>
              <li><a href="#">胖胖胖胖胖胖胖胖红</a></li>
            </ul>
            
            <div class="am-offcanvas-content" style="position:fixed; bottom:0px;">
                <div style="position:fixed; bottom:70px;">
                    <div id="decrement" style="cursor:pointer; position: relative; float:left; background-color:#FFFFFF; width:50px; height:50px; margin-left:50px; text-align:center;">A-</div>
                    <div id="increment" style="cursor:pointer; position: relative; float:left; background-color:#FFFFFF; width:50px; height:50px; margin-left:20px; text-align:center;">A+</div>
                </div>

                <br />
                
                <div>
                    <a id="style-1" href="javascript:;" style="background-color:#FFFFFF; position: relative; float:left; width:35px; height:35px; border:1px solid;">&nbsp;</a>
                    <a id="style-3" href="javascript:;" style="background-color:#FFF2E2; position: relative; float:left; width:35px; height:35px; margin-left:10px; border:1px solid;">&nbsp;</a>
                    <a id="style-2" href="javascript:;" style="background-color:#C7EDCC; position: relative; float:left; width:35px; height:35px; margin-left:10px; border:1px solid;">&nbsp;</a>
                    <div style="position: relative; float:left; width:80px; height:35px; margin-left:20px;">
                        <input name='day-night' type="checkbox" data-am-switch data-off-text="日" data-on-text="夜" data-size="sm" data-animate="false" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <!--侧边栏结束-->
    </div>

    <footer class="my-footer">
      <p><small>© 2016 xbook.pub | SOSTART Team</small></p>
    </footer>
</div>
</template>

<script>
var $ = window.$

$(function () {
  // 响应键盘翻页
  $(document).keydown(function (e) {
    if (e.keyCode === 37) {
      $('#pre')[0].click()
    } else if (e.keyCode === 39) {
      $('#next')[0].click()
    }
  })
})

// MOBILE
$(function () {
  // 响应手势翻页
  $(document).hammer().on('swiperight', function () {
    $('#pre')[0].click()
  }).on('swipeleft', function () {
    $('#next')[0].click()
  })
})

export default {
  data () {
    return {
      book: this.$route.query.book,
      name: this.$route.query.name,
      pre: '',
      next: '',
      count: this.$route.query.count,
      content: ''
    }
  },
  route: {
    data: function () {
      $(function () {
        var store = $.AMUI.store
        if (!store.enabled) {
          store = $.AMUI.utils.cookie
          store.remove = store.unset
        }

        // 侧边栏
        $('#content').on('click', function () {
          $('#sidebar').offCanvas('open')
          return false
        });

        // 字体
        (function () {
          var sizelist = ['16', '20', '26']
          var size = (store.get('fontsize') === null) ? 0 : store.get('fontsize')
          $('#content').css('font-size', sizelist[size] + 'px')

          $('#increment').click(function () {
            size = size + 1 > sizelist.length - 1 ? sizelist.length - 1 : size + 1
            store.set('fontsize', size)
            $('#content').css('font-size', sizelist[size] + 'px')
          })

          $('#decrement').click(function () {
            size = size - 1 < 0 ? 0 : size - 1
            store.set('fontsize', size)
            $('#content').css('font-size', sizelist[size] + 'px')
          })
        })();

        // 阅读模式及配色
        (function () {
          var night = (store.get('reader.night') === null) ? false : store.get('reader.night')
          var style = (store.get('reader.style') === null) ? 1 : store.get('reader.style')

          // 阅读样式选择
          $('#style-1').click(function () {
            style = 1; store.set('reader.style', 1)

            if (night) {
              $('[name="day-night"]').bootstrapSwitch('state', false)
            }

            $('#xbody').css({
              'background-color': '#FFF'
            })

            $('#content').css({
              'color': '#000'
            })
          })
          $('#style-2').click(function () {
            style = 2; store.set('reader.style', 2)

            if (night) {
              $('[name="day-night"]').bootstrapSwitch('state', false)
            }

            $('#xbody').css({
              'background-color': '#C7EDCC'
            })

            $('#content').css({
              'color': '#000000'
            })
          })
          $('#style-3').click(function () {
            style = 3; store.set('reader.style', 3)

            if (night) {
              $('[name="day-night"]').bootstrapSwitch('state', false)
            }

            $('#xbody').css({
              'background-color': '#FFF2E2'
            })
            $('#content').css({
              'color': '#000000'
            })
          })

          // 阅读模式切换
          $('[name="day-night"]').bootstrapSwitch()
          $('[name="day-night"]').on('switchChange.bootstrapSwitch', function (event, state) {
            if (state) {
              // 夜间
              night = true; store.set('reader.night', true)

              $('#xbody').css({
                'background-color': '#222'
              })

              $('#content').css({
                'color': '#778899' // #F8F8FF
              })
            } else {
              // 白天
              night = false; store.set('reader.night', false)
              $('#style-' + style).click()
            }
          })

          // 初始化
          function styleinit () {
            if (night) {
              $('[name="day-night"]').bootstrapSwitch('state', true)
            } else {
              $('#style-' + style).click()
            }
          }

          styleinit()
        })()
      })

      var self = this
      var chapters = window.$$('Chapters')

      self.pre = parseInt(this.$route.query.num) - 1
      self.next = parseInt(this.$route.query.num) + 1

      $('#loading').show()
      $('#content').hide()

      chapters.select('title', 'content').find({book_id: self.book, num: parseInt(this.$route.query.num)}, function (data) {
        document.title = data.get('title')
        self.content = data.get('content')
        $('#loading').hide()
        $('#content').show()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .am-offcanvas-bar .am-nav>li>a {
      color:#ccc;
      border-radius: 0;
      border-top: 1px solid rgba(0,0,0,.3);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.05)
    }

    .am-offcanvas-bar .am-nav>li>a:hover {
      background: #404040;
      color: #fff
    }

    .am-offcanvas-bar .am-nav>li.am-nav-header {
      color: #777;
      background: #404040;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
      text-shadow: 0 1px 0 rgba(0,0,0,.5);
      border-top: 1px solid rgba(0,0,0,.3);
      font-weight: 400;
      font-size: 75%
    }

    .am-offcanvas-bar .am-nav>li.am-active>a {
      background: #1a1a1a;
      color: #fff;
      box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
    }

    .am-offcanvas-bar .am-nav>li+li {
      margin-top: 0;
    }

    .my-sidebar {
      padding-right: 0;
      border-right: 1px solid #eeeeee;
    }
</style>