<template>
  <div @click="handleModal()" class="c-otherplayers container">
    <div class="wrapper row">
      <div class="picture col-4">
        <div class="indicator" :style="indicatorStyle">
          <div class="frame" :style="frameColor">
            <img :src="playerRoleImage" alt="Player Image" />
          </div>
        </div>
      </div>
      <div class="information col-8">
        <p class="role">{{ role }}</p>
        <p class="score">Score: {{ victoryPoints }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
import { Role } from '@port-of-mars/shared/types';
import { GameRequestAPI } from '@port-of-mars/client/api/game/request';

@Component({
  components: {},
})
export default class OtherPlayers extends Vue {
  @Inject() readonly api!: GameRequestAPI;

  @Prop() private role!: string;
  @Prop() private ready!: boolean;
  @Prop() private victoryPoints!: number;

  get frameColor(): object {
    return this.role
      ? { backgroundColor: `var(--color-${this.role})` }
      : { backgroundColor: `var(--color-Researcher)` };
  }

  get indicatorStyle() {
    return !this.ready
      ? { border: `0.125rem solid var(--color-${this.role})` }
      : { border: `0.125rem solid var(--status-green)` };
  }

  get playerRoleImage(): any {
    return this.role
      ? require(`@port-of-mars/client/assets/characters/${this.role}.png`)
      : require(`@port-of-mars/client/assets/characters/Researcher.png`);
  }

  private handleModal(): void {
    this.api.setModalVisible({
      type: 'PlayerModal',
      data: {
        role: this.role,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@port-of-mars/client/stylesheets/game/static/panels/OtherPlayers.scss';
</style>
