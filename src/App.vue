<script setup lang="ts">
  let MenuButton: Boolean = true;
</script>

<template>
  <header>
    <nav>
      <h2>GS Player</h2>
      <div class="hamburger_btn" v-on:click="MenuButton=!MenuButton">
        <span class="line line_01" v-bind:class="{'btn_line01':MenuButton}"></span>
        <span class="line line_02" v-bind:class="{'btn_line02':MenuButton}"></span>
        <span class="line line_03" v-bind:class="{'btn_line03':MenuButton}"></span>
      </div>
      <transition name="menu">
        <div class="menu" v-show="MenuButton">
          <ul>
            <li><router-link to="/">Album List</router-link></li>
            <li><router-link to="/about">about</router-link></li>
            <li><router-link to="/terms">利用規約</router-link></li>
            <li><router-link to="/enquiries">お問い合わせ</router-link></li>
          </ul>
        </div>
      </transition>
    </nav>
  </header>
  <router-view/>
</template>