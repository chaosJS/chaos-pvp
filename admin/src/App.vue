<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/login">login</router-link>|
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

</style>
