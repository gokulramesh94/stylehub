<template>
  <div class="product-counter-wrapper">
    <div class="action-wrapper" @click="$emit('decreaseCount')">-</div>
    <div class="count">{{ counterValue }}</div>
    <div class="action-wrapper" @click="$emit('increaseCount')">+</div>
  </div>
</template>

<script>
export default {
  name: "ProductCounter",
  data(){
    return{
      counterValue: this.count
    }
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  watch:{
    count: function(newVal,oldVal){
      if(newVal !== oldVal){
        this.counterValue = newVal;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-counter-wrapper {
  display: flex;
  align-items: center;
  .action-wrapper {
    width: 30px;
    height: 30px;
    border: 1px solid $theme-gray;
    border-radius: 50%;
    color: $theme-red;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .count {
    padding: 0 10px;
  }
}
</style>
