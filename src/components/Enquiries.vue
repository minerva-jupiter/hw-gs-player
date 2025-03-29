<template>
  <div class="page">
    <h1>{{ $t('menu.enquiries') }}</h1>
    <iframe class="enquiries" src="https://docs.google.com/forms/d/e/1FAIpQLSd8s1R7Tvz4ZuguqhmZS0cUHpLHmm1DJus-pwVr6LR0XYRJMA/viewform?embedded=true">読み込んでいます…</iframe>
  </div>
</template>

<style scoped>
.enquiries {
  width: calc(100vw - 35px);
  height: 75vh;
  border: none;
}
</style>