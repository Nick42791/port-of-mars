<template>
  <div class="c-marslogpopup tour-log-popup">
    <BButton @click="toggle" class="toggle">
      <span>Mars Log</span>
      <font-awesome-icon
        v-if="!popupVisible"
        :icon="['fas', 'caret-up']"
        size="lg"
      />
      <font-awesome-icon
        v-if="popupVisible"
        :icon="['fas', 'caret-down']"
        size="lg"
      />
    </BButton>
    <div class="wrapper" :style="position">
      <MarsLog />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BButton } from 'bootstrap-vue';
import MarsLog from '@port-of-mars/client/components/game/MarsLog.vue';
import { GameRequestAPI } from '@port-of-mars/client/api/game/request';
library.add(faCaretUp);
library.add(faCaretDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component({
  components: {
    BButton,
    MarsLog,
  },
})
export default class MarsLogPopup extends Vue {
  @Inject()
  readonly api!: GameRequestAPI;

  get popupVisible() {
    return this.$tstore.state.userInterface.popupView.marsLogVisible;
  }

  private toggle() {
    this.api.toggleMarsLogPopup(this.popupVisible);
  }

  get position() {
    return this.popupVisible ? { height: '48rem',padding: '0.5rem' } : { height: '0rem' };
  }

}
</script>

<style lang="scss" scoped>
@import '@port-of-mars/client/stylesheets/game/static/popups/MarsLogPopup.scss';
</style>
