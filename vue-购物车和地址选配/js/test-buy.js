var vm = new Vue({
  el:'#app',
  data:{
    totalMoney:0,
    productList:[]
  },
  mounted:function(){
    this.$nextTick(function(){
      vm.cartView();
    });
  },
  // 定义局部过滤器
  filters: {
      fomatermoney: function(value) {
          return "$" + value + ".00";
          //return "$" + value.toFixed(2);
      }
  },
  methods:{
    cartView: function(){
      // var _this = this;
      this.$http.get("../data/cartData.json",{'id':123}).then(
      //   function(res){
      //   _this.productList = res.body.result.list;
      //   _this.totalMoney = res.body.result.totalMoney;
      // }
      // es6写法
      res =>{
        this.productList = res.body.result.list;
        this.totalMoney = res.body.result.totalMoney;
      }
    );
    }
  }
});
// 定义全局过滤器
Vue.filter("money",function(value,type){
  return "$" + value.toFixed(2) + type;
});
