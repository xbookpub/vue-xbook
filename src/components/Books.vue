<template>
<div v-if="loaded === false" >loading......</div>
<div v-if="loaded" data-am-widget="list_news" class="am-list-news am-list-news-default">
  <div class="am-list-news-bd">
    <ul class="am-list" v-for="book in books">
      <li class="am-g am-list-item-desced">
        <div class=" am-list-main">
          <h3 class="am-list-item-hd">
            <a v-link="{ path: '/books/'+book.id, query: { name: book.name, count: book.chapters }}">{{book.name}}</a>
          </h3>
          <div class="am-list-item-text"></div>
        </div>
      </li>
    </ul>
  </div>
</div>

<footer class="my-footer">
  <p><small>© 2016 xbook.pub | SOSTART Team</small></p>
</footer>
</template>

<script>
export default {
  data () {
    return {
      books: [],
      loaded: false
    }
  },
  route: {
    data: function () {
      document.title = 'some books online'
      var books = window.$$('Books')
      var self = this

      books.findAll(function (data) {
        var books = []
        for (var i in data) {
          var tmp = {}
          tmp.id = data[i].id
          for (var j in data[i]['attributes']) {
            tmp[j] = data[i]['attributes'][j]
          }
          books[i] = tmp
        }
        self.books = books
        self.loaded = true
      })
    }
  }
}
</script>