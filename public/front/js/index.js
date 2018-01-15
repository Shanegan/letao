/**
 * Created by Administrator on 2018/1/15 0015.
 */
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 2000
});
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005
})
