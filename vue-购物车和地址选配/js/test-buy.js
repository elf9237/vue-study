var vm = new Vue({
  el:'#app',
  data:{
    totalMoney:0,
    productList:[]
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
  },
  filters:{
    formatMoney: function(value){
      return "￥ "+value.toFixed(2);
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      vm.cartView();
    });
  }
});
