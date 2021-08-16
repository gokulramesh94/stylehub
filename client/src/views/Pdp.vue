<template>
  <div>
    <Header />
    <div class="product-card-wrapper">
      <div class="image-wrapper">
        <Image :src="currentProduct.image" />
      </div>
      <div class="details">
        <div>
          <div class="title">{{ currentProduct.name }}</div>
          <div class="cost">${{ currentProduct.price }}</div>
          <div class="description">
            <b>Description:</b> {{ currentProduct.description }}
          </div>
          <div class="ratings-section">
            <div class="ratings">
              <FontAwesomeIcon
                v-for="(item, index) in currentProduct.ratings"
                :key="index"
                icon="star"
              />
            </div>
            <div class="comments">
              ({{ currentProduct.comments ? currentProduct.comments.length : 0 }} reviews)
            </div>
          </div>
        </div>
        <div class="buttons">
          <div class="quantityPicker">
            <ProductCounter
              :count="currentProduct.quantity"
              @increaseCount="increaseCount"
              @decreaseCount="decreaseCount"
            />
          </div>
          <Button buttonText="Add to Cart" @click="addToCart" />
        </div>
      </div>
    </div>

    <div class="comment-section">
      <h2>Customer Reviews</h2>
      <div v-if="currentProduct.comments && currentProduct.comments.length > 0">
        <div
          class="my-review"
          v-for="(item, index) in currentProduct.comments"
          :key="index"
        >
          <div class="title">
            {{ item.title }}
          </div>
          <star-rating
            :max-rating="5"
            :rating="item.ratings"
            :read-only="true"
          />
          <div class="review">{{ item.review }}</div>
        </div>
      </div>
      <div v-else>There are no reviews for this product.</div>

      <div class="post-review" v-if="addComment">
        <Input :product="currentProduct" />
      </div>
      <Button
        class="add-review-button"
        :buttonText="addCommentButtonText"
        @handleClick="toggleAddCommentSection"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StarRating from "vue-star-rating";
import Header from "../components/Header.vue";
import Image from "../components/Image.vue";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import ProductCounter from "../components/ProductCounter.vue";
import { productService } from "../services";

export default {
  name: "Pdp",
  data() {
    return {
      isWishListed: false,
      currentProduct: {},
      count: 1,
      addComment: false,
      addCommentButtonText: "Add a Review",
    };
  },
  props: {
    productId: {
      type: String,
      default: "men-1",
    },
  },
  components: {
    Header,
    Image,
    Button,
    Input,
    ProductCounter,
    StarRating,
  },
  computed: {
    ...mapGetters("cart", ["getCartItems"]),
  },
  methods: {
    toggleAddCommentSection() {
      if (!this.addComment) this.addCommentButtonText = "Cancel";
      else this.addCommentButtonText = "Add a Review";
      this.addComment = !this.addComment;
    },
    handleWishList(flag) {
      console.log("Inside handleWishList : ", this.product);
      if (flag) {
        console.log("Added product to Wishlist : ", this.product);
        this.addProductToWishlist(this.product);
        //this.$store.dispatch("cart/addProductToWishlist", this.product);
      } else {
        this.removeProductFromWishlist(this.product);
      }
    },
    ...mapActions("cart", [
      "addProductToCart",
      "updateCart",
      "updateProducts",
      "updateProductInProducts",
    ]),
    ...mapActions("user", ["getUser"]),
    increaseCount() {
      this.count++;
      console.log("increase : ", this.count);
      this.currentProduct.quantity = this.count;
    },
    decreaseCount() {
      if (this.count > 1) {
        this.count--;
        this.currentProduct.quantity = this.count;
      }
    },
    addToCart() {
      this.updateCart({
        product: this.currentProduct,
        key: "quantity",
        value: this.count,
      });
      this.updateProductInProducts(this.currentProduct);
      this.addProductToCart(this.currentProduct);
    },
  },
  created() {
    productService
      .getProductById(this.productId)
      .then((response) => {
        if (response.errorMsg) {
          alert(response.errorMsg);
        } else {
          this.currentProduct = response;
          this.count = this.currentProduct.quantity || this.count;
          if (!this.currentProduct.quantity)
            this.currentProduct["quantity"] = this.count;
          this.$forceUpdate();
        }
      })
      .catch((error) =>
        console.error(
          "Error while fetching products from the product service : ",
          error
        )
      );
  },
};
</script>

<style lang="scss" scoped>
.product-card-wrapper {
  display: flex;
  padding: 2rem 4rem;
  background-color: $theme-silver;
  box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);

  .image-wrapper {
    height: 500px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
    .heart-wrapper {
      position: absolute;
      top: 5px;
      right: 20px;
    }
  }
  .details {
    padding: 0 30px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: $h4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cost {
      font-size: $h5;
      font-weight: 500;
      margin: 10px 0;
    }
    .ratings-section {
      display: flex;
      padding-top: 20px;
      .ratings {
        color: $theme-red;
      }
    }
    .description {
      font-size: $regular17;
      font-weight: 400;
      padding-top: 8px;
    }
    .buttons {
      .quantityPicker {
        margin-bottom: 20px;
      }
    }
  }
}

.comment-section {
  padding: 4rem;
  .my-review {
    padding: 20px 0;
    border-bottom: 1px solid $theme-light-gray;
    .title {
      font-size: $h6;
      text-transform: capitalize;
      font-weight: 500;
      padding: 5px;
    }
    .vue-star-rating {
      ::v-deep(span.vue-star-rating-star) {
        svg.vue-star-rating-star {
          height: 25px;
          width: 25px;
        }
      }
    }
    .review {
      font-size: $h6;
      padding: 5px;
    }
    .my-images {
      padding: 5px;
    }
  }
  .add-review-button {
    margin-top: 3rem;
  }
}
</style>
