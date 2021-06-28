<template>
  <div class="input-wrapper">
    <form @submit.prevent="saveComment" method="post">
      <div class="stars">
        <h3>Add a public review for this product</h3>
        <p>
          How many stars would you give to this product? "1" being the least
          preferable and "5" being the most.
          <!-- <br><br><img :src="require(this.userReview.userImage.name)" alt="Image not found"/> -->
        </p>
        <div class="rate">
          <star-rating :max-rating="5" v-model:rating="userReview.stars" />
        </div>
      </div>
      <div class="title">
        <p>Sum up your review in one line.</p>
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          v-model="userReview.title"
        />
      </div>
      <div class="review">
        <h3>Add a detailed review</h3>
        <p>
          You may please share an in depth review of this product based on your
          experience.
        </p>
        <textarea
          name="review"
          placeholder="How do you like the product?"
          v-model="userReview.review"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      userReview: {
        title: "",
        review: "",
        stars: 0,
        user: "swagat",
      },
    };
  },
  components: {
    StarRating,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters("cart", ["getProductFromCart"]),
  },
  methods: {
    ...mapActions("cart", ["updateCart", "updateProductInProducts"]),
    handleImage(value) {
      console.log(value);
      this.userReview.userImage = value;
    },
    saveComment() {
      if (this.userReview.title != "" && this.userReview.review != "") {
        let comments = this.product.comments;
        //console.log("before : ", comments);
        comments = [...comments, this.userReview];
        //console.log("after : ", comments);

        this.updateCart({
          product: this.product,
          key: "comments",
          value: comments,
        });
        let product = this.product;
        product.comments = comments;
        this.updateProductInProducts(product);
        alert("Thanks! Your review matters.");
        location.reload();
      } else {
        alert("The review title and details can't be empty.");
      }
    },
    fileSelected(event) {
      console.log(event.target.files[0]);
      this.userReview.userImage = event.target.files[0];
      console.log("You uploaded: " + this.userReview.userImage.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  box-shadow: 0 4px 12px 0px rgb(0 0 0 / 15%);
  border: 0;
  border-style: ridge;
  padding: 2rem;
  form {
    .stars {
      margin-bottom: 40px;
      .rate {
        height: 46px;
        padding: 0 10px;
        display: flex;
      }
    }
    .title {
      margin-bottom: 40px;
      input {
        width: 50%;
        padding: 10px;
      }
    }
    .photos {
      margin-bottom: 40px;
    }
    .review {
      margin-bottom: 20px;
      textarea {
        width: 50%;
        height: 150px;
        margin-bottom: 2rem;
      }
    }

    button {
      border: 1px solid $theme-red;
      padding: 1rem 4rem;
      background-color: $theme-red;
      color: $theme-white;
      cursor: pointer;
      &:hover {
        background-color: #d6021b;
      }
    }
  }
}
</style>
