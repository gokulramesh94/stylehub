module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/constants/variables.scss";
          `,
      },
    },
  },
};
