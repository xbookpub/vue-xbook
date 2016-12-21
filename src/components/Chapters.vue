<template>
<div class="am-g am-g-fixed">
  <div class="am-u-md-12">
    <div class="am-g">
      <div class="am-u-sm-12 am-u-sm-centered">
        <div v-if="loaded === false" >loading......</div>
        <div v-if="loaded" id='content' class="am-cf am-article" v-for="chapter in chapters">
          <a v-link="{ path: '/chapters', query: { book: book, name: this.$route.query.name, num: chapter.num, count: count}}">{{chapter.title}}</a><br />
        </div>
        <hr/>
      </div>
    </div>
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
      book: '',
      chapters: [],
      count: 0,
      loaded: false
    }
  },
  route: {
    data: function () {
      document.title = this.$route.query.name

      var self = this
      var chapters = window.$$('Chapters')

      self.book = this.$route.params.id
      self.count = this.$route.query.count

      chapters.select('title', 'num').order('num', 'ASC').findAll({book_id: self.book}, function (data) {
        var chapters = []

        for (var i in data) {
          chapters[i] = {title: data[i].get('title'), num: data[i].get('num')}
        }

        self.chapters = chapters
        self.loaded = true
      })
    }
  },
  methods: {}
}
</script>