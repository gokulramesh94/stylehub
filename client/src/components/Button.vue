<template>
  <button @click="$emit('handleClick',$event)">{{ buttonText }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonText: {
      type: String,
      default: "Submit",
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 1px solid $theme-red;
  padding: 1rem 4rem;
  background-color: $theme-red;
  color: $theme-white;
  cursor: pointer;
  &:hover {
    background-color: #d6021b;
  }
}
</style>
