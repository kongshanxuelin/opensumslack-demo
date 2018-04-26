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
  }
};

export default utilFunc;