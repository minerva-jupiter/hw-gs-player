<script setup lang="ts">
import { ref } from "vue";
import Player from "./components/Player.vue";
const MenuButton = ref(false);
</script>

<template>
  <header>
      <div class="title_bar">
        <p><router-link to="/">GS Player</router-link></p>
      </div>
      <div class="hamburger_btn" @click.stop="MenuButton = !MenuButton">
        <span class="line line_01" :class="{ 'btn_line01': MenuButton }"></span>
        <span class="line line_02" :class="{ 'btn_line02': MenuButton }"></span>
        <span class="line line_03" :class="{ 'btn_line03': MenuButton }"></span>
      </div>
      <div class="menu" :class="{ open: MenuButton }">
        <ul>
          <!-- 将来的には多言語対応する．中，韓ではそれぞれNoto sans C，Kを用いる -->
          <li><router-link to="/" @click="MenuButton = false">Top</router-link></li>
          <li><router-link to="/" @click="MenuButton = false">My List</router-link></li>
          <hr>
          <li><router-link to="/about" @click="MenuButton = false">About</router-link></li>
          <li><router-link to="/terms" @click="MenuButton = false">利用規約</router-link></li>
          <li><router-link to="/policy" @click="MenuButton = false">プライバシーポリシー</router-link></li>
          <li><router-link to="/enquiries" @click="MenuButton = false">お問い合わせ</router-link></li>
          <li><router-link to="/info" @click="MenuButton = false">運営者情報</router-link></li>
        </ul>
      </div>
  </header>
  <router-view></router-view>
  <Player/>
</template>
