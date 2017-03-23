var vm = new Vue({
  el:'#app',
  data:{
    totalMoney:0,
    productList:[],
    checkAllFlag:false,
    delFlag:false,
    curProduct:''
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
      axios.get("../data/cartData.json",{params:{
        id:123
      }}).then(
      //   function(res){
      //   _this.productList = res.body.result.list;
      //   _this.totalMoney = res.body.result.totalMoney;
      // }
      // es6写法
      res =>{
        this.productList = res.data.result.list;
        // this.totalMoney = res.data.result.totalMoney;
      }
    );
  },
  changeMoney:function(product,way){
    if(way>0){
      product.productQuentity++;
    }else{
      product.productQuentity--;
      if(product.productQuentity<2){
        product.productQuentity=1;
      }
    }
    this.calcTotalPrice();
  },
  selectedProduct:function(item){
    if(typeof item.checked == 'undefined'){
      // 全局注册对象变量
      // Vue.set(item,'checked',true);
      // 局部注册对象变量
      this.$set(item,'checked',true);
    }else{
      item.checked = !item.checked;
    }
    this.calcTotalPrice();
  },
  checkAll:function(flag){
    this.checkAllFlag = flag;
    var _this = this;
    this.productList.forEach(function(item,index){
      if(typeof item.checked == 'undefined'){
        _this.$set(item,'checked',_this.checkAllFlag);
      }else{
        item.checked = _this.checkAllFlag;
      }
    });
    this.calcTotalPrice();
  },
  calcTotalPrice:function(){
    var _this = this;
    this.totalMoney = 0;
    this.productList.forEach(function(item,index){
      if(item.checked){
        _this.totalMoney += item.productPrice*item.productQuentity;
      }
    });
  },
  delConfirm:function(item){
    this.delFlag = true;
    this.curProduct = item;
  },
  delProduct:function(){
    this.delFlag = false;
    var index = this.productList.indexOf(this.curProduct);
    this.productList.splice(index,1);
  }
  }
});
// 定义全局过滤器
Vue.filter("money",function(value,type){
  return "$" + value.toFixed(2) + type;
});
