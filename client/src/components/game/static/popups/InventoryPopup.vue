<template>
  <div class="c-inventorypopup tour-inventory-popup">
    <button @click="toggle" class="toggle">
      <span>Inventory</span>
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
    </button>
    <div class="wrapper" :style="position">
      <Inventory :isSelf="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Inventory from '@port-of-mars/client/components/game/Inventory.vue';
import { GameRequestAPI } from '@port-of-mars/client/api/game/request';
import {
  Investment,
  Resource,
  RESOURCES,
  Phase,
} from '@port-of-mars/shared/types';

library.add(faCaretUp);
library.add(faCaretDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component({
  components: {
    Inventory,
  },
})
export default class InventoryPopup extends Vue {
  @Inject()
  readonly api!: GameRequestAPI;

  get popupVisible() {
    return this.$tstore.state.userInterface.popupView.inventoryVisible;
  }

  private toggle() {
    this.api.toggleInventory(this.popupVisible);
  }

  get position() {
    return this.popupVisible
      ? { height: '48rem', padding: '0.5rem' }
      : { height: '0rem' };
  }

  get investments() {
    const p = this.$tstore.getters.player;
    const inventory = p.inventory;
    const pendingInventory = p.pendingInvestments;
    const costs = p.costs;
    return RESOURCES.map((name) => ({
      name,
      units: inventory[name as Resource],
      pendingUnits: pendingInventory[name as Resource],
      cost: costs[name as Resource],
    }));
  }

  get contributedSystemHealth() {
    const p = this.$tstore.getters.player;
    const pendingInvestment = p.pendingInvestments;
    const costs = p.costs;
    return {
      name: 'System Health',
      units: p.contributedUpkeep,
      pendingUnits: pendingInvestment.upkeep,
      cost: costs.upkeep,
    };
  }

  // 'culture',
  // 'finance',
  // 'government',
  // 'legacy',
  // 'science',
  // 'upkeep'

  private backgroundColor(resource: Investment) {
    let color;
    switch (resource) {
      case 'culture':
        color = 'var(--color-Curator)';
        break;
      case 'finance':
        color = 'var(--color-Entrepreneur)';
        break;
      case 'government':
        color = 'var(--color-Politician)';
        break;
      case 'legacy':
        color = 'var(--color-Pioneer)';
        break;
      case 'science':
        color = 'var(--color-Researcher)';
        break;
      case 'upkeep':
        color = 'var(--color-Upkeep)';
        break;
      default:
        color = 'var(--space-white-opaque-1)';
    }
    return { backgroundColor: color };
  }
}
</script>

<style lang="scss" scoped>
@import '@port-of-mars/client/stylesheets/game/static/popups/InventoryPopup.scss';
</style>
