<template>
  <div>
    <header>
      <z-header></z-header>
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <z-footer></z-footer>
    </footer>
  </div>
</template>
<script>
import ZHeader from '~/components/Header.vue'
import ZFooter from '~/components/Footer.vue'

export default {
  components: {
    ZHeader,
    ZFooter,
  },
  computed: {
    currentRoute() {
      return this.$route
    },
  },
  created() {},
}
</script>

<style lang="scss">
header {
  position: fixed;
  width: 100%;
}
</style>
