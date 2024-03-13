<!--eslint-disable-->
<template>
  <appView />
  <router-view />
</template>

<script>
/*eslint-disable*/
import appView from "./views/appView.vue";

export default {
  data() {
    return {
    }
  },
  components: {
    "appView": appView,

  }
}
</script>
