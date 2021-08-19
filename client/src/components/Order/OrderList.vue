<template>
  <div class="order-list-wrapper">
    <div v-if="isEmpty" class="empty">
      You have no previous orders to display!
    </div>
    <vue-collapsible-panel-group>
      <vue-collapsible-panel v-for="item in data" :key="item.id">
        <template #title>
          {{ moment(item.orderSummary.date).format("Do MMMM YYYY") }}
        </template>
        <template #content>
          <div class="total">
            Total - ${{ item.orderSummary.total.$numberDecimal }}
          </div>
          <OrderItem
            v-for="order in item.orderSummary.order"
            :key="order.id"
            :product="order"
          />
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>
  </div>
</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@dafcoe/vue-collapsible-panel";
import moment from "moment";
import "@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css";
import OrderItem from "./OrderItem";

export default {
  name: "OrderList",
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    OrderItem,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    isEmpty: function() {
      return this.data.length === 0 ? true : false;
    },
  },
  created: function() {
    this.moment = moment;
  },
};
</script>

<style lang="scss" scoped>
.order-list-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  .order-item-wrapper {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  .vcpg {
    border: 0 !important;
    box-shadow: 0 0 9px 2px rgb(0 0 0 / 10%);
  }
  .total {
    color: $theme-red;
    margin: 10px 0;
    font-size: $h6;
  }
  .empty {
    font-size: $h4;
  }
}
</style>
