let utilFunc = {
  initIconFont() {
    let domModule = weex.requireModule('dom');
    domModule.addRule('fontFace', {
      'fontFamily': "iconfont",
      'src': "url('http://at.alicdn.com/t/font_189187_rvh4k7zmf85jnhfr.ttf')"
    });
  },
  getUrlSearch(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.slice(url.indexOf('?') + 1).match(reg);
    if (r != null) {
      try {
        return decodeURIComponent(r[2]);
      } catch (_e) {
        return null;
      }
    }
    return null;
  },
  getColor(index){
    let colors=["#FF9200", "#CC1EFF", "#0BDD5C", "#FF5087", "#0D4FB8", "#61958D", "#FF0000", "#D52222", "#964141"];
    if(index < colors.length){
      return colors[index];
    }else{
      return colors[0];
    }
  }
};

export default utilFunc;