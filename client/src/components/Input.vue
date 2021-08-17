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
          <star-rating :max-rating="5" :rating="ratings" />
        </div>
      </div>
      <div class="title">
        <p>Sum up your review in one line.</p>
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          v-model="title"
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
          v-model="review"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapGetters } from "vuex";
import { productService } from "../services";

export default {
  data() {
    return {
      title: "",
      review: "",
      ratings: 1,
    };
  },
  components: {
    StarRating,
  },
  props: {
    productId: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
  },
  methods: {
    saveComment() {
      let user = this.getUser;
      if (user && user.username != null && user.username !== "") {
        let username = user.username;
        let token = user.token;

        if (this.title != "" && this.review != "") {
          user = this.getUser.username;
          productService
            .addComment(
              username,
              this.title,
              this.review,
              this.ratings,
              this.productId,
              token
            )
            .then((response) => {
              let message = response;
              if (response.errorMsg) message = response.errormsg;
              this.$emit("addComment", message);
            });
        } else {
          alert("The review title and details can't be empty.");
        }
      } else {
        alert("Please sign in to add a review about the product!");
      }
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
