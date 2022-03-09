<template>
  <button class="bg-white rounded-3xl py-1.5 px-4 text-blue-800" @click="removeLocalStroge">Yeni Rezarvasyon Yap</button>
</template>
<script>
export default {
  methods: {
    removeLocalStroge() {
      localStorage.clear()
      this.$router.push('/')
      window.location.href = '/'
    },
  },
}
</script>
